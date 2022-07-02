-- create feeds table to public schema
drop table if exists public.feeds;

create table if not exists public.feeds (
    id uuid not null primary key,
    title text not null,
    url text unique not null,
    description text,
    updated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references public.users
);

drop trigger if exists handle_updated_at_feeds on public.feeds;

create trigger
  handle_updated_at_feeds before update
on public.feeds
for each row execute
  procedure moddatetime(updated_at);

-- alter table to use Row Level Security

alter table feeds
    enable row level security;

alter table feeds alter column id set default uuid_generate_v4();