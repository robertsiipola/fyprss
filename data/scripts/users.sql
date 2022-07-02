-- create user table to public schema
create table if not exists public.users (
    id uuid references auth.users not null,
    username text unique,
    updated_at timestamp with time zone,
    created_at timestamp with time zone,
    primary key (id),
    unique(username)
);

alter table users
    enable row level security;

drop function if exists public.handle_new_user;

-- inserts a row into public.users
create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.users (id, username)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- trigger to update the updated_at time when a user is updated
drop trigger if exists handle_updated_at_users on public.users;

create trigger 
  handle_updated_at_users before update 
on public.users
for each row execute 
  procedure moddatetime(updated_at);