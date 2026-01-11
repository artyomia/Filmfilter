-- B2B SEO Studio schema and RLS policies

create extension if not exists "uuid-ossp";

create type industry_enum as enum ('industrial', 'logistics', 'industrial_real_estate');
create type tone_enum as enum ('professional', 'technical', 'consultative');
create type intent_enum as enum ('informational', 'commercial', 'transactional', 'navigational');
create type task_status_enum as enum (
  'OUTLINE_PENDING',
  'OUTLINE_GENERATED',
  'OUTLINE_APPROVED',
  'DRAFT_GENERATED',
  'CONTENT_APPROVED',
  'IMAGES_READY',
  'WP_DRAFTED'
);
create type image_type_enum as enum ('hero', 'supporting');
create type image_source_enum as enum ('ai', 'unsplash', 'pexels', 'upload');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text check (role in ('admin', 'editor', 'reviewer', 'viewer')) not null default 'viewer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  website_url text not null,
  industry industry_enum not null,
  tone tone_enum not null,
  language_default text not null default 'en',
  wp_base_url text not null,
  wp_username text not null,
  wp_app_password text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table projects_public (
  id uuid primary key,
  name text not null,
  website_url text not null,
  industry industry_enum not null,
  tone tone_enum not null,
  language_default text not null default 'en',
  wp_base_url text not null,
  wp_username text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function sync_projects_public() returns trigger as $$
begin
  if (tg_op = 'DELETE') then
    delete from projects_public where id = old.id;
    return old;
  end if;

  insert into projects_public (
    id,
    name,
    website_url,
    industry,
    tone,
    language_default,
    wp_base_url,
    wp_username,
    created_at,
    updated_at
  ) values (
    new.id,
    new.name,
    new.website_url,
    new.industry,
    new.tone,
    new.language_default,
    new.wp_base_url,
    new.wp_username,
    new.created_at,
    new.updated_at
  )
  on conflict (id) do update set
    name = excluded.name,
    website_url = excluded.website_url,
    industry = excluded.industry,
    tone = excluded.tone,
    language_default = excluded.language_default,
    wp_base_url = excluded.wp_base_url,
    wp_username = excluded.wp_username,
    updated_at = excluded.updated_at;

  return new;
end;
$$ language plpgsql security definer;

create trigger projects_public_sync
after insert or update or delete on projects
for each row execute function sync_projects_public();

create table content_tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  primary_keyword text not null,
  secondary_keywords text[] default '{}',
  intent intent_enum not null,
  target_min_words int default 1200,
  target_max_words int default 1800,
  language text not null default 'en',
  notes text,
  status task_status_enum not null default 'OUTLINE_PENDING',
  outline_json jsonb,
  article_markdown text,
  article_html text,
  meta_title text,
  meta_description text,
  faq_schema_jsonld jsonb,
  created_by uuid references auth.users(id),
  assigned_to uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table images (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid references content_tasks(id) on delete cascade,
  type image_type_enum not null,
  source image_source_enum not null,
  original_url text,
  storage_path text not null,
  filename text not null,
  alt_text text not null,
  title_text text not null,
  width int,
  height int,
  created_at timestamptz default now()
);

create table internal_links (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid references content_tasks(id) on delete cascade,
  url text not null,
  anchor_text text not null,
  approved boolean default false
);

create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  meta jsonb default '{}',
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table projects_public enable row level security;
alter table content_tasks enable row level security;
alter table images enable row level security;
alter table internal_links enable row level security;
alter table audit_logs enable row level security;

create policy "Profiles are viewable by authenticated users"
  on profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Admins can manage projects"
  on projects for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

grant select on projects_public to authenticated;

create policy "Projects public viewable by authenticated users"
  on projects_public for select
  using (auth.role() = 'authenticated');

create policy "Tasks are readable by authenticated users"
  on content_tasks for select
  using (auth.role() = 'authenticated');

create policy "Editors can create tasks"
  on content_tasks for insert
  with check (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

create policy "Editors can update tasks"
  on content_tasks for update
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor', 'reviewer')));

create policy "Images are readable by authenticated users"
  on images for select
  using (auth.role() = 'authenticated');

create policy "Editors can manage images"
  on images for insert
  with check (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

create policy "Internal links are readable by authenticated users"
  on internal_links for select
  using (auth.role() = 'authenticated');

create policy "Editors can manage internal links"
  on internal_links for insert
  with check (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

create policy "Audit logs are readable by authenticated users"
  on audit_logs for select
  using (auth.role() = 'authenticated');

create policy "Audit logs are insertable by authenticated users"
  on audit_logs for insert
  with check (auth.role() = 'authenticated');
