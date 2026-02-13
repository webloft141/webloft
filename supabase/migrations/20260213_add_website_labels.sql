-- Add editable label fields for admin website management.

alter table public.websites
  add column if not exists tags text[] not null default '{}'::text[],
  add column if not exists badges text[] not null default '{}'::text[],
  add column if not exists is_new boolean not null default false;

create index if not exists idx_websites_tags_gin on public.websites using gin (tags);
create index if not exists idx_websites_badges_gin on public.websites using gin (badges);
create index if not exists idx_websites_is_new on public.websites(is_new);
