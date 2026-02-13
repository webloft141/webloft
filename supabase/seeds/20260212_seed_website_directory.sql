-- Seed data generated from src/lib/website-categories.ts
-- Run after migrations/20260212_initial_webloft_schema.sql

begin;

truncate table public.website_trending restart identity cascade;
truncate table public.websites cascade;
truncate table public.subcategories cascade;
truncate table public.categories cascade;

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Development Tools', 'development-tools', 'Core platforms and references for modern software development.', true, 0)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'development-tools'), 'Code Platforms', 'code-platforms', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'code-platforms'
  ),
  'GitHub',
  'github',
  'https://github.com',
  'github.com',
  'GitHub in Code Platforms under Development Tools',
  true,
  true,
  1,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://github.com'),
  'global',
  null,
  null,
  1,
  999
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'code-platforms'
  ),
  'GitLab',
  'gitlab',
  'https://gitlab.com',
  'gitlab.com',
  'GitLab in Code Platforms under Development Tools',
  true,
  true,
  2,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://gitlab.com'),
  'global',
  null,
  null,
  2,
  998
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'code-platforms'
  ),
  'Stack Overflow',
  'stack-overflow',
  'https://stackoverflow.com',
  'stackoverflow.com',
  'Stack Overflow in Code Platforms under Development Tools',
  true,
  true,
  3,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://stackoverflow.com'),
  'global',
  null,
  null,
  3,
  997
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'code-platforms'
  ),
  'CodePen',
  'codepen',
  'https://codepen.io',
  'codepen.io',
  'CodePen in Code Platforms under Development Tools',
  true,
  true,
  4,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://codepen.io'),
  'global',
  null,
  null,
  4,
  996
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'code-platforms'
  ),
  'Replit',
  'replit',
  'https://replit.com',
  'replit.com',
  'Replit in Code Platforms under Development Tools',
  true,
  true,
  5,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://replit.com'),
  'global',
  null,
  null,
  5,
  995
);

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'development-tools'), 'Build & Deploy', 'build-and-deploy', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'build-and-deploy'
  ),
  'MDN Web Docs',
  'mdn-web-docs',
  'https://developer.mozilla.org',
  'developer.mozilla.org',
  'MDN Web Docs in Build & Deploy under Development Tools',
  true,
  true,
  6,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://developer.mozilla.org'),
  'global',
  null,
  null,
  6,
  994
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'build-and-deploy'
  ),
  'npm',
  'npm',
  'https://www.npmjs.com',
  'npmjs.com',
  'npm in Build & Deploy under Development Tools',
  true,
  true,
  7,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.npmjs.com'),
  'global',
  null,
  null,
  7,
  993
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'build-and-deploy'
  ),
  'Docker',
  'docker',
  'https://www.docker.com',
  'docker.com',
  'Docker in Build & Deploy under Development Tools',
  true,
  true,
  8,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.docker.com'),
  'global',
  null,
  null,
  8,
  992
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'build-and-deploy'
  ),
  'Vercel',
  'vercel',
  'https://vercel.com',
  'vercel.com',
  'Vercel in Build & Deploy under Development Tools',
  true,
  true,
  9,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://vercel.com'),
  'global',
  null,
  null,
  9,
  991
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'development-tools' and s.slug = 'build-and-deploy'
  ),
  'Netlify',
  'netlify',
  'https://www.netlify.com',
  'netlify.com',
  'Netlify in Build & Deploy under Development Tools',
  true,
  true,
  10,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.netlify.com'),
  'global',
  null,
  null,
  10,
  990
);

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('AI & Automation', 'ai-and-automation', 'AI assistants, model platforms, and no-code automation tools.', true, 1)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'ai-and-automation'), 'AI Platforms', 'ai-platforms', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'ai-platforms'
  ),
  'OpenAI',
  'openai',
  'https://openai.com',
  'openai.com',
  'OpenAI in AI Platforms under AI & Automation',
  true,
  true,
  11,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://openai.com'),
  'global',
  null,
  null,
  11,
  989
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'ai-platforms'
  ),
  'Anthropic',
  'anthropic',
  'https://www.anthropic.com',
  'anthropic.com',
  'Anthropic in AI Platforms under AI & Automation',
  true,
  true,
  12,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.anthropic.com'),
  'global',
  null,
  null,
  12,
  988
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'ai-platforms'
  ),
  'Google AI Studio',
  'google-ai-studio',
  'https://aistudio.google.com',
  'aistudio.google.com',
  'Google AI Studio in AI Platforms under AI & Automation',
  true,
  true,
  13,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://aistudio.google.com'),
  'global',
  null,
  null,
  13,
  987
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'ai-platforms'
  ),
  'Hugging Face',
  'hugging-face',
  'https://huggingface.co',
  'huggingface.co',
  'Hugging Face in AI Platforms under AI & Automation',
  true,
  true,
  14,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://huggingface.co'),
  'global',
  null,
  null,
  14,
  986
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'ai-platforms'
  ),
  'Perplexity',
  'perplexity',
  'https://www.perplexity.ai',
  'perplexity.ai',
  'Perplexity in AI Platforms under AI & Automation',
  true,
  true,
  15,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.perplexity.ai'),
  'global',
  null,
  null,
  15,
  985
);

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'ai-and-automation'), 'Automation Stack', 'automation-stack', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'automation-stack'
  ),
  'Zapier',
  'zapier',
  'https://zapier.com',
  'zapier.com',
  'Zapier in Automation Stack under AI & Automation',
  true,
  true,
  16,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://zapier.com'),
  'global',
  null,
  null,
  16,
  984
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'automation-stack'
  ),
  'Make',
  'make',
  'https://www.make.com',
  'make.com',
  'Make in Automation Stack under AI & Automation',
  true,
  true,
  17,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.make.com'),
  'global',
  null,
  null,
  17,
  983
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'automation-stack'
  ),
  'LangChain',
  'langchain',
  'https://www.langchain.com',
  'langchain.com',
  'LangChain in Automation Stack under AI & Automation',
  true,
  true,
  18,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.langchain.com'),
  'global',
  null,
  null,
  18,
  982
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'automation-stack'
  ),
  'Replicate',
  'replicate',
  'https://replicate.com',
  'replicate.com',
  'Replicate in Automation Stack under AI & Automation',
  true,
  true,
  19,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://replicate.com'),
  'global',
  null,
  null,
  19,
  981
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'ai-and-automation' and s.slug = 'automation-stack'
  ),
  'Poe',
  'poe',
  'https://poe.com',
  'poe.com',
  'Poe in Automation Stack under AI & Automation',
  true,
  true,
  20,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://poe.com'),
  'global',
  null,
  null,
  20,
  980
);

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Learning & Courses', 'learning-and-courses', 'Trusted websites for structured learning and online education.', true, 2)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'learning-and-courses'), 'Course Platforms', 'course-platforms', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'course-platforms'
  ),
  'Coursera',
  'coursera',
  'https://www.coursera.org',
  'coursera.org',
  'Coursera in Course Platforms under Learning & Courses',
  true,
  true,
  21,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.coursera.org'),
  'global',
  null,
  null,
  21,
  979
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'course-platforms'
  ),
  'edX',
  'edx',
  'https://www.edx.org',
  'edx.org',
  'edX in Course Platforms under Learning & Courses',
  true,
  true,
  22,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.edx.org'),
  'global',
  null,
  null,
  22,
  978
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'course-platforms'
  ),
  'Udemy',
  'udemy',
  'https://www.udemy.com',
  'udemy.com',
  'Udemy in Course Platforms under Learning & Courses',
  true,
  true,
  23,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.udemy.com'),
  'global',
  null,
  null,
  23,
  977
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'course-platforms'
  ),
  'FutureLearn',
  'futurelearn',
  'https://www.futurelearn.com',
  'futurelearn.com',
  'FutureLearn in Course Platforms under Learning & Courses',
  false,
  true,
  24,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.futurelearn.com'),
  'global',
  null,
  null,
  24,
  976
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'course-platforms'
  ),
  'Skillshare',
  'skillshare',
  'https://www.skillshare.com',
  'skillshare.com',
  'Skillshare in Course Platforms under Learning & Courses',
  false,
  true,
  25,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.skillshare.com'),
  'global',
  null,
  null,
  25,
  975
);

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'learning-and-courses'), 'Learning Resources', 'learning-resources', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'learning-resources'
  ),
  'Khan Academy',
  'khan-academy',
  'https://www.khanacademy.org',
  'khanacademy.org',
  'Khan Academy in Learning Resources under Learning & Courses',
  false,
  true,
  26,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.khanacademy.org'),
  'global',
  null,
  null,
  26,
  974
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'learning-resources'
  ),
  'freeCodeCamp',
  'freecodecamp',
  'https://www.freecodecamp.org',
  'freecodecamp.org',
  'freeCodeCamp in Learning Resources under Learning & Courses',
  false,
  true,
  27,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.freecodecamp.org'),
  'global',
  null,
  null,
  27,
  973
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'learning-resources'
  ),
  'MIT OpenCourseWare',
  'mit-opencourseware',
  'https://ocw.mit.edu',
  'ocw.mit.edu',
  'MIT OpenCourseWare in Learning Resources under Learning & Courses',
  false,
  true,
  28,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://ocw.mit.edu'),
  'global',
  null,
  null,
  28,
  972
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'learning-resources'
  ),
  'Codecademy',
  'codecademy',
  'https://www.codecademy.com',
  'codecademy.com',
  'Codecademy in Learning Resources under Learning & Courses',
  false,
  true,
  29,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.codecademy.com'),
  'global',
  null,
  null,
  29,
  971
);

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'learning-and-courses' and s.slug = 'learning-resources'
  ),
  'Pluralsight',
  'pluralsight',
  'https://www.pluralsight.com',
  'pluralsight.com',
  'Pluralsight in Learning Resources under Learning & Courses',
  false,
  true,
  30,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.website_trending (website_id, scope, category_id, subcategory_id, rank_position, rank_score)
values (
  (select id from public.websites where url = 'https://www.pluralsight.com'),
  'global',
  null,
  null,
  30,
  970
);

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Design & Creativity', 'design-and-creativity', 'Inspiration and design resources for UI, graphics, and media.', true, 3)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'design-and-creativity'), 'Design Tools', 'design-tools', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'design-tools'
  ),
  'Figma',
  'figma',
  'https://www.figma.com',
  'figma.com',
  'Figma in Design Tools under Design & Creativity',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'design-tools'
  ),
  'Canva',
  'canva',
  'https://www.canva.com',
  'canva.com',
  'Canva in Design Tools under Design & Creativity',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'design-tools'
  ),
  'Adobe Color',
  'adobe-color',
  'https://color.adobe.com',
  'color.adobe.com',
  'Adobe Color in Design Tools under Design & Creativity',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'design-tools'
  ),
  'Coolors',
  'coolors',
  'https://coolors.co',
  'coolors.co',
  'Coolors in Design Tools under Design & Creativity',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'design-tools'
  ),
  'Pinterest',
  'pinterest',
  'https://www.pinterest.com',
  'pinterest.com',
  'Pinterest in Design Tools under Design & Creativity',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'design-and-creativity'), 'Inspiration & Assets', 'inspiration-and-assets', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'inspiration-and-assets'
  ),
  'Dribbble',
  'dribbble',
  'https://dribbble.com',
  'dribbble.com',
  'Dribbble in Inspiration & Assets under Design & Creativity',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'inspiration-and-assets'
  ),
  'Behance',
  'behance',
  'https://www.behance.net',
  'behance.net',
  'Behance in Inspiration & Assets under Design & Creativity',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'inspiration-and-assets'
  ),
  'Unsplash',
  'unsplash',
  'https://unsplash.com',
  'unsplash.com',
  'Unsplash in Inspiration & Assets under Design & Creativity',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'inspiration-and-assets'
  ),
  'Pexels',
  'pexels',
  'https://www.pexels.com',
  'pexels.com',
  'Pexels in Inspiration & Assets under Design & Creativity',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'design-and-creativity' and s.slug = 'inspiration-and-assets'
  ),
  'Awwwards',
  'awwwards',
  'https://www.awwwards.com',
  'awwwards.com',
  'Awwwards in Inspiration & Assets under Design & Creativity',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Productivity & Collaboration', 'productivity-and-collaboration', 'Plan work, manage projects, and collaborate better with teams.', true, 4)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'productivity-and-collaboration'), 'Project Management', 'project-management', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'project-management'
  ),
  'Notion',
  'notion',
  'https://www.notion.so',
  'notion.so',
  'Notion in Project Management under Productivity & Collaboration',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'project-management'
  ),
  'Trello',
  'trello',
  'https://trello.com',
  'trello.com',
  'Trello in Project Management under Productivity & Collaboration',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'project-management'
  ),
  'Asana',
  'asana',
  'https://asana.com',
  'asana.com',
  'Asana in Project Management under Productivity & Collaboration',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'project-management'
  ),
  'ClickUp',
  'clickup',
  'https://clickup.com',
  'clickup.com',
  'ClickUp in Project Management under Productivity & Collaboration',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'project-management'
  ),
  'Monday.com',
  'monday-com',
  'https://monday.com',
  'monday.com',
  'Monday.com in Project Management under Productivity & Collaboration',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'productivity-and-collaboration'), 'Team Workflow', 'team-workflow', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'team-workflow'
  ),
  'Evernote',
  'evernote',
  'https://evernote.com',
  'evernote.com',
  'Evernote in Team Workflow under Productivity & Collaboration',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'team-workflow'
  ),
  'Todoist',
  'todoist',
  'https://todoist.com',
  'todoist.com',
  'Todoist in Team Workflow under Productivity & Collaboration',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'team-workflow'
  ),
  'Airtable',
  'airtable',
  'https://www.airtable.com',
  'airtable.com',
  'Airtable in Team Workflow under Productivity & Collaboration',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'team-workflow'
  ),
  'Miro',
  'miro',
  'https://miro.com',
  'miro.com',
  'Miro in Team Workflow under Productivity & Collaboration',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'productivity-and-collaboration' and s.slug = 'team-workflow'
  ),
  'Calendly',
  'calendly',
  'https://calendly.com',
  'calendly.com',
  'Calendly in Team Workflow under Productivity & Collaboration',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Business & Marketing', 'business-and-marketing', 'Marketing, CRM, and social growth tools for online businesses.', true, 5)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'business-and-marketing'), 'Marketing Suite', 'marketing-suite', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'marketing-suite'
  ),
  'HubSpot',
  'hubspot',
  'https://www.hubspot.com',
  'hubspot.com',
  'HubSpot in Marketing Suite under Business & Marketing',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'marketing-suite'
  ),
  'Mailchimp',
  'mailchimp',
  'https://mailchimp.com',
  'mailchimp.com',
  'Mailchimp in Marketing Suite under Business & Marketing',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'marketing-suite'
  ),
  'Semrush',
  'semrush',
  'https://www.semrush.com',
  'semrush.com',
  'Semrush in Marketing Suite under Business & Marketing',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'marketing-suite'
  ),
  'Ahrefs',
  'ahrefs',
  'https://ahrefs.com',
  'ahrefs.com',
  'Ahrefs in Marketing Suite under Business & Marketing',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'marketing-suite'
  ),
  'Google Ads',
  'google-ads',
  'https://ads.google.com',
  'ads.google.com',
  'Google Ads in Marketing Suite under Business & Marketing',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'business-and-marketing'), 'Growth & CRM', 'growth-and-crm', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'growth-and-crm'
  ),
  'Meta Business Suite',
  'meta-business-suite',
  'https://business.facebook.com',
  'business.facebook.com',
  'Meta Business Suite in Growth & CRM under Business & Marketing',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'growth-and-crm'
  ),
  'Buffer',
  'buffer',
  'https://buffer.com',
  'buffer.com',
  'Buffer in Growth & CRM under Business & Marketing',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'growth-and-crm'
  ),
  'Hootsuite',
  'hootsuite',
  'https://www.hootsuite.com',
  'hootsuite.com',
  'Hootsuite in Growth & CRM under Business & Marketing',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'growth-and-crm'
  ),
  'ConvertKit',
  'convertkit',
  'https://convertkit.com',
  'convertkit.com',
  'ConvertKit in Growth & CRM under Business & Marketing',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'business-and-marketing' and s.slug = 'growth-and-crm'
  ),
  'Zoho CRM',
  'zoho-crm',
  'https://www.zoho.com/crm',
  'zoho.com',
  'Zoho CRM in Growth & CRM under Business & Marketing',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('News & Research', 'news-and-research', 'News, insights, and research repositories for informed decisions.', true, 6)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'news-and-research'), 'News Channels', 'news-channels', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'news-channels'
  ),
  'Google News',
  'google-news',
  'https://news.google.com',
  'news.google.com',
  'Google News in News Channels under News & Research',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'news-channels'
  ),
  'Reuters',
  'reuters',
  'https://www.reuters.com',
  'reuters.com',
  'Reuters in News Channels under News & Research',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'news-channels'
  ),
  'BBC',
  'bbc',
  'https://www.bbc.com',
  'bbc.com',
  'BBC in News Channels under News & Research',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'news-channels'
  ),
  'The Verge',
  'the-verge',
  'https://www.theverge.com',
  'theverge.com',
  'The Verge in News Channels under News & Research',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'news-channels'
  ),
  'TechCrunch',
  'techcrunch',
  'https://techcrunch.com',
  'techcrunch.com',
  'TechCrunch in News Channels under News & Research',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'news-and-research'), 'Knowledge Sources', 'knowledge-sources', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'knowledge-sources'
  ),
  'Hacker News',
  'hacker-news',
  'https://news.ycombinator.com',
  'news.ycombinator.com',
  'Hacker News in Knowledge Sources under News & Research',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'knowledge-sources'
  ),
  'Medium',
  'medium',
  'https://medium.com',
  'medium.com',
  'Medium in Knowledge Sources under News & Research',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'knowledge-sources'
  ),
  'Quora',
  'quora',
  'https://www.quora.com',
  'quora.com',
  'Quora in Knowledge Sources under News & Research',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'knowledge-sources'
  ),
  'JSTOR',
  'jstor',
  'https://www.jstor.org',
  'jstor.org',
  'JSTOR in Knowledge Sources under News & Research',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'news-and-research' and s.slug = 'knowledge-sources'
  ),
  'arXiv',
  'arxiv',
  'https://arxiv.org',
  'arxiv.org',
  'arXiv in Knowledge Sources under News & Research',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Finance & Careers', 'finance-and-careers', 'Career platforms, payment tools, and financial intelligence hubs.', true, 7)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'finance-and-careers'), 'Careers', 'careers', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'careers'
  ),
  'LinkedIn',
  'linkedin',
  'https://www.linkedin.com',
  'linkedin.com',
  'LinkedIn in Careers under Finance & Careers',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'careers'
  ),
  'Indeed',
  'indeed',
  'https://www.indeed.com',
  'indeed.com',
  'Indeed in Careers under Finance & Careers',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'careers'
  ),
  'Glassdoor',
  'glassdoor',
  'https://www.glassdoor.com',
  'glassdoor.com',
  'Glassdoor in Careers under Finance & Careers',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'careers'
  ),
  'Wellfound',
  'wellfound',
  'https://wellfound.com',
  'wellfound.com',
  'Wellfound in Careers under Finance & Careers',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'careers'
  ),
  'Upwork',
  'upwork',
  'https://www.upwork.com',
  'upwork.com',
  'Upwork in Careers under Finance & Careers',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'finance-and-careers'), 'Finance Tools', 'finance-tools', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'finance-tools'
  ),
  'Stripe',
  'stripe',
  'https://stripe.com',
  'stripe.com',
  'Stripe in Finance Tools under Finance & Careers',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'finance-tools'
  ),
  'PayPal',
  'paypal',
  'https://www.paypal.com',
  'paypal.com',
  'PayPal in Finance Tools under Finance & Careers',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'finance-tools'
  ),
  'Investopedia',
  'investopedia',
  'https://www.investopedia.com',
  'investopedia.com',
  'Investopedia in Finance Tools under Finance & Careers',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'finance-tools'
  ),
  'Yahoo Finance',
  'yahoo-finance',
  'https://finance.yahoo.com',
  'finance.yahoo.com',
  'Yahoo Finance in Finance Tools under Finance & Careers',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'finance-and-careers' and s.slug = 'finance-tools'
  ),
  'TradingView',
  'tradingview',
  'https://www.tradingview.com',
  'tradingview.com',
  'TradingView in Finance Tools under Finance & Careers',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Shopping & Deals', 'shopping-and-deals', 'Global online marketplaces and trusted shopping destinations.', false, 8)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'shopping-and-deals'), 'Marketplaces', 'marketplaces', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'marketplaces'
  ),
  'Amazon',
  'amazon',
  'https://www.amazon.com',
  'amazon.com',
  'Amazon in Marketplaces under Shopping & Deals',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'marketplaces'
  ),
  'Flipkart',
  'flipkart',
  'https://www.flipkart.com',
  'flipkart.com',
  'Flipkart in Marketplaces under Shopping & Deals',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'marketplaces'
  ),
  'eBay',
  'ebay',
  'https://www.ebay.com',
  'ebay.com',
  'eBay in Marketplaces under Shopping & Deals',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'marketplaces'
  ),
  'Etsy',
  'etsy',
  'https://www.etsy.com',
  'etsy.com',
  'Etsy in Marketplaces under Shopping & Deals',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'marketplaces'
  ),
  'AliExpress',
  'aliexpress',
  'https://www.aliexpress.com',
  'aliexpress.com',
  'AliExpress in Marketplaces under Shopping & Deals',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'shopping-and-deals'), 'Retail Stores', 'retail-stores', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'retail-stores'
  ),
  'Walmart',
  'walmart',
  'https://www.walmart.com',
  'walmart.com',
  'Walmart in Retail Stores under Shopping & Deals',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'retail-stores'
  ),
  'Myntra',
  'myntra',
  'https://www.myntra.com',
  'myntra.com',
  'Myntra in Retail Stores under Shopping & Deals',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'retail-stores'
  ),
  'Best Buy',
  'best-buy',
  'https://www.bestbuy.com',
  'bestbuy.com',
  'Best Buy in Retail Stores under Shopping & Deals',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'retail-stores'
  ),
  'Target',
  'target',
  'https://www.target.com',
  'target.com',
  'Target in Retail Stores under Shopping & Deals',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'shopping-and-deals' and s.slug = 'retail-stores'
  ),
  'Newegg',
  'newegg',
  'https://www.newegg.com',
  'newegg.com',
  'Newegg in Retail Stores under Shopping & Deals',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.categories (title, slug, description, is_popular, sort_order)
values ('Entertainment & Lifestyle', 'entertainment-and-lifestyle', 'Streaming, travel, food, books, and everyday lifestyle services.', false, 9)
on conflict (slug) do update
set title = excluded.title, description = excluded.description, is_popular = excluded.is_popular, sort_order = excluded.sort_order;

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'entertainment-and-lifestyle'), 'Streaming & Media', 'streaming-and-media', null, 0)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'streaming-and-media'
  ),
  'YouTube',
  'youtube',
  'https://www.youtube.com',
  'youtube.com',
  'YouTube in Streaming & Media under Entertainment & Lifestyle',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'streaming-and-media'
  ),
  'Spotify',
  'spotify',
  'https://www.spotify.com',
  'spotify.com',
  'Spotify in Streaming & Media under Entertainment & Lifestyle',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'streaming-and-media'
  ),
  'Netflix',
  'netflix',
  'https://www.netflix.com',
  'netflix.com',
  'Netflix in Streaming & Media under Entertainment & Lifestyle',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'streaming-and-media'
  ),
  'Disney+',
  'disney',
  'https://www.disneyplus.com',
  'disneyplus.com',
  'Disney+ in Streaming & Media under Entertainment & Lifestyle',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'streaming-and-media'
  ),
  'Prime Video',
  'prime-video',
  'https://www.primevideo.com',
  'primevideo.com',
  'Prime Video in Streaming & Media under Entertainment & Lifestyle',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.subcategories (category_id, title, slug, description, sort_order)
values ((select id from public.categories where slug = 'entertainment-and-lifestyle'), 'Lifestyle & Leisure', 'lifestyle-and-leisure', null, 1)
on conflict (category_id, slug) do update
set title = excluded.title, sort_order = excluded.sort_order;

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'lifestyle-and-leisure'
  ),
  'Twitch',
  'twitch',
  'https://www.twitch.tv',
  'twitch.tv',
  'Twitch in Lifestyle & Leisure under Entertainment & Lifestyle',
  false,
  true,
  null,
  0,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'lifestyle-and-leisure'
  ),
  'IMDb',
  'imdb',
  'https://www.imdb.com',
  'imdb.com',
  'IMDb in Lifestyle & Leisure under Entertainment & Lifestyle',
  false,
  true,
  null,
  1,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'lifestyle-and-leisure'
  ),
  'Goodreads',
  'goodreads',
  'https://www.goodreads.com',
  'goodreads.com',
  'Goodreads in Lifestyle & Leisure under Entertainment & Lifestyle',
  false,
  true,
  null,
  2,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'lifestyle-and-leisure'
  ),
  'Tripadvisor',
  'tripadvisor',
  'https://www.tripadvisor.com',
  'tripadvisor.com',
  'Tripadvisor in Lifestyle & Leisure under Entertainment & Lifestyle',
  false,
  true,
  null,
  3,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.websites (subcategory_id, name, slug, url, domain, short_description, is_featured, is_active, global_trending_rank, sort_order, metadata)
values (
  (
    select s.id
    from public.subcategories s
    join public.categories c on c.id = s.category_id
    where c.slug = 'entertainment-and-lifestyle' and s.slug = 'lifestyle-and-leisure'
  ),
  'Zomato',
  'zomato',
  'https://www.zomato.com',
  'zomato.com',
  'Zomato in Lifestyle & Leisure under Entertainment & Lifestyle',
  false,
  true,
  null,
  4,
  '{}'::jsonb
)
on conflict (url) do update
set
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  short_description = excluded.short_description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  global_trending_rank = excluded.global_trending_rank,
  sort_order = excluded.sort_order,
  updated_at = now();

commit;
