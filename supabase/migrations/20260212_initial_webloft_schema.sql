-- Webloft initial database schema
-- Run in Supabase SQL editor (or via Supabase CLI migration flow).

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  is_popular boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create table if not exists public.websites (
  id uuid primary key default gen_random_uuid(),
  subcategory_id uuid not null references public.subcategories(id) on delete cascade,
  name text not null,
  slug text not null,
  url text not null,
  domain text not null,
  short_description text,
  long_description text,
  logo_url text,
  accent_color text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  global_trending_rank int,
  sort_order int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (subcategory_id, slug),
  unique (url)
);

create table if not exists public.website_trending (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade,
  scope text not null check (scope in ('global', 'category', 'subcategory')),
  category_id uuid references public.categories(id) on delete cascade,
  subcategory_id uuid references public.subcategories(id) on delete cascade,
  rank_position int not null,
  rank_score numeric(10, 3) not null default 0,
  measured_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.user_favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  website_id uuid not null references public.websites(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, website_id)
);

create table if not exists public.user_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  website_id uuid references public.websites(id) on delete set null,
  event_type text not null check (
    event_type in ('search', 'view', 'click', 'favourite_add', 'favourite_remove')
  ),
  query text,
  context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_subcategories_category_id on public.subcategories(category_id);
create index if not exists idx_websites_subcategory_id on public.websites(subcategory_id);
create index if not exists idx_websites_domain on public.websites(domain);
create index if not exists idx_websites_global_trending_rank on public.websites(global_trending_rank);
create index if not exists idx_trending_scope_measured_at on public.website_trending(scope, measured_at desc);
create index if not exists idx_user_events_user_created_at on public.user_events(user_id, created_at desc);
create index if not exists idx_user_events_website_created_at on public.user_events(website_id, created_at desc);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_categories_updated_at on public.categories;
create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists trg_subcategories_updated_at on public.subcategories;
create trigger trg_subcategories_updated_at
before update on public.subcategories
for each row execute function public.set_updated_at();

drop trigger if exists trg_websites_updated_at on public.websites;
create trigger trg_websites_updated_at
before update on public.websites
for each row execute function public.set_updated_at();

create or replace view public.website_directory as
select
  w.id,
  w.name,
  w.slug,
  w.url,
  w.domain,
  w.short_description,
  w.logo_url,
  w.accent_color,
  w.is_featured,
  w.global_trending_rank,
  w.is_active,
  w.sort_order,
  c.id as category_id,
  c.title as category_title,
  c.slug as category_slug,
  s.id as subcategory_id,
  s.title as subcategory_title,
  s.slug as subcategory_slug
from public.websites w
join public.subcategories s on s.id = w.subcategory_id
join public.categories c on c.id = s.category_id;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.websites enable row level security;
alter table public.website_trending enable row level security;
alter table public.user_favourites enable row level security;
alter table public.user_events enable row level security;

-- Public read access for directory content
drop policy if exists "categories_read_public" on public.categories;
create policy "categories_read_public"
on public.categories for select
to anon, authenticated
using (true);

drop policy if exists "subcategories_read_public" on public.subcategories;
create policy "subcategories_read_public"
on public.subcategories for select
to anon, authenticated
using (true);

drop policy if exists "websites_read_public" on public.websites;
create policy "websites_read_public"
on public.websites for select
to anon, authenticated
using (is_active = true);

drop policy if exists "trending_read_public" on public.website_trending;
create policy "trending_read_public"
on public.website_trending for select
to anon, authenticated
using (true);

-- Profiles: users can read/update their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Favourites: users can manage their own favourites
drop policy if exists "favourites_select_own" on public.user_favourites;
create policy "favourites_select_own"
on public.user_favourites for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "favourites_insert_own" on public.user_favourites;
create policy "favourites_insert_own"
on public.user_favourites for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "favourites_delete_own" on public.user_favourites;
create policy "favourites_delete_own"
on public.user_favourites for delete
to authenticated
using (user_id = auth.uid());

-- Events: allow anonymous and logged-in tracking writes, restrict reads
drop policy if exists "events_insert_public" on public.user_events;
create policy "events_insert_public"
on public.user_events for insert
to anon, authenticated
with check (
  (auth.uid() is null and user_id is null)
  or (auth.uid() is not null and (user_id is null or user_id = auth.uid()))
);

drop policy if exists "events_select_own" on public.user_events;
create policy "events_select_own"
on public.user_events for select
to authenticated
using (user_id = auth.uid());

