-- Run this in the Supabase SQL editor to set up the Kreva AI database schema.

create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id            uuid references auth.users(id) on delete cascade primary key,
  email         text        not null,
  full_name     text        not null default '',
  business_name text,
  plan          text        not null default 'free' check (plan in ('free', 'starter', 'pro')),
  created_at    timestamptz not null default now()
);

-- Subscriptions
create table public.subscriptions (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        not null references public.users(id) on delete cascade,
  plan         text        not null check (plan in ('free', 'starter', 'pro')),
  paystack_ref text,
  status       text        not null default 'active' check (status in ('active', 'cancelled', 'expired')),
  renews_at    timestamptz,
  created_at   timestamptz not null default now(),
  unique (user_id)
);

-- Usage tracking (one row per AI request)
create table public.usage (
  id          uuid        primary key default uuid_generate_v4(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  tool        text        not null,
  tokens_used integer     not null default 0,
  created_at  timestamptz not null default now()
);

-- Tool history
create table public.tool_history (
  id         uuid        primary key default uuid_generate_v4(),
  user_id    uuid        not null references public.users(id) on delete cascade,
  tool       text        not null,
  input      jsonb       not null,
  output     text        not null,
  created_at timestamptz not null default now()
);

-- Indexes for common query patterns
create index usage_user_created on public.usage (user_id, created_at desc);
create index history_user_created on public.tool_history (user_id, created_at desc);

-- Row Level Security
alter table public.users        enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage        enable row level security;
alter table public.tool_history enable row level security;

-- RLS Policies
create policy "users_select_own"   on public.users        for select using (auth.uid() = id);
create policy "users_update_own"   on public.users        for update using (auth.uid() = id);
create policy "subs_select_own"    on public.subscriptions for select using (auth.uid() = user_id);
create policy "usage_select_own"   on public.usage        for select using (auth.uid() = user_id);
create policy "history_select_own" on public.tool_history  for select using (auth.uid() = user_id);
create policy "history_delete_own" on public.tool_history  for delete using (auth.uid() = user_id);

-- Auto-create user profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name, business_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'business_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
