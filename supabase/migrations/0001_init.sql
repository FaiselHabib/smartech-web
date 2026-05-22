-- =============================================================================
--  Smartech Group — initial Supabase schema
--  Run once on a fresh Supabase project (SQL editor).  Idempotent: safe to re-run.
--  Creates: profiles, projects, blog_posts, contact_requests + RLS + storage.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp" with schema public;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.project_category as enum
    ('systems','media','website','app','dashboard','drone','branding');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('draft','published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.request_type as enum
    ('general','quote','software','media','both','consultation');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.request_status as enum
    ('new','in_progress','replied','closed');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- profiles  (mirrors auth.users with an `is_admin` flag)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth user is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- helper: is_admin(uuid) — readable from policies w/o recursion
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title_ar          text not null,
  title_en          text,
  category          public.project_category not null default 'systems',
  client_name       text,
  short_description text,
  full_description  text,
  problem           text,
  solution          text,
  impact            text,
  services          text[] not null default '{}',
  technologies      text[] not null default '{}',
  cover_image       text,
  gallery           text[] not null default '{}',
  status            public.content_status not null default 'draft',
  featured          boolean not null default false,
  project_date      date,
  seo_title         text,
  seo_description   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_projects_status      on public.projects (status);
create index if not exists idx_projects_featured    on public.projects (featured);
create index if not exists idx_projects_category    on public.projects (category);
create index if not exists idx_projects_created_at  on public.projects (created_at desc);

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title_ar          text not null,
  title_en          text,
  excerpt           text,
  content           text,
  cover_image       text,
  category          text,
  tags              text[] not null default '{}',
  author            text,
  reading_time      int,
  status            public.content_status not null default 'draft',
  published_at      timestamptz,
  seo_title         text,
  seo_description   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_blog_status        on public.blog_posts (status);
create index if not exists idx_blog_published_at  on public.blog_posts (published_at desc);
create index if not exists idx_blog_category      on public.blog_posts (category);

drop trigger if exists trg_blog_updated_at on public.blog_posts;
create trigger trg_blog_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contact_requests  (covers both contact and quote forms)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_requests (
  id              uuid primary key default uuid_generate_v4(),
  full_name       text not null,
  phone           text not null,
  email           text,
  company         text,
  project_type    public.request_type not null default 'general',
  budget          text,
  timeline        text,
  message         text,
  source_page     text,
  status          public.request_status not null default 'new',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_requests_status     on public.contact_requests (status);
create index if not exists idx_requests_created_at on public.contact_requests (created_at desc);
create index if not exists idx_requests_type       on public.contact_requests (project_type);

drop trigger if exists trg_requests_updated_at on public.contact_requests;
create trigger trg_requests_updated_at
before update on public.contact_requests
for each row execute function public.set_updated_at();

-- =============================================================================
--  Row-Level Security
-- =============================================================================
alter table public.profiles         enable row level security;
alter table public.projects         enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.contact_requests enable row level security;

-- ---------------- profiles -----------------
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Admin manages profiles" on public.profiles;
create policy "Admin manages profiles"
  on public.profiles for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ---------------- projects -----------------
drop policy if exists "Public reads published projects" on public.projects;
create policy "Public reads published projects"
  on public.projects for select
  using (status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admin manages projects" on public.projects;
create policy "Admin manages projects"
  on public.projects for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ---------------- blog_posts ---------------
drop policy if exists "Public reads published posts" on public.blog_posts;
create policy "Public reads published posts"
  on public.blog_posts for select
  using (status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admin manages posts" on public.blog_posts;
create policy "Admin manages posts"
  on public.blog_posts for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ---------------- contact_requests ---------
drop policy if exists "Anyone inserts a request" on public.contact_requests;
create policy "Anyone inserts a request"
  on public.contact_requests for insert
  with check (true);

drop policy if exists "Admin manages requests" on public.contact_requests;
create policy "Admin manages requests"
  on public.contact_requests for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- =============================================================================
--  Storage buckets
-- =============================================================================
-- Public read-only bucket for project covers / blog covers / gallery
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

-- Storage policies: public read, admin write
drop policy if exists "Public reads media" on storage.objects;
create policy "Public reads media"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "Admin uploads media" on storage.objects;
create policy "Admin uploads media"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin(auth.uid()));

drop policy if exists "Admin updates media" on storage.objects;
create policy "Admin updates media"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin(auth.uid()));

drop policy if exists "Admin deletes media" on storage.objects;
create policy "Admin deletes media"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin(auth.uid()));
