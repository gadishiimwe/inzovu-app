-- Create user_roles table for role-based access
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  created_at timestamp with time zone not null default now(),
  primary key (user_id, role)
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Policies: Users can read/insert their own roles
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'user_roles' and policyname = 'Users can view their roles'
  ) then
    create policy "Users can view their roles"
    on public.user_roles
    for select
    using (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'user_roles' and policyname = 'Users can add their roles'
  ) then
    create policy "Users can add their roles"
    on public.user_roles
    for insert
    with check (auth.uid() = user_id);
  end if;
end $$;


