drop table if exists public.subscriptions;

create table if not exists public.subscriptions (
    id uuid primary key default uuid_generate_v4() not null,
    feed uuid references public.feeds on delete cascade not null,
    user_id uuid references public.users on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone,
    unique (feed, user_id)
);

drop trigger if exists handle_updated_at_subscriptions on public.subscriptions;

create trigger
  handle_updated_at_subscriptions before update
on public.subscriptions
for each row execute
  procedure moddatetime(updated_at);

alter table subscriptions
    enable row level security;

drop policy if exists "Allow individual access" on public.subscriptions;

create policy "Allow individual access" on public.subscriptions 
  for all using (auth.uid() = public.subscriptions.user_id)