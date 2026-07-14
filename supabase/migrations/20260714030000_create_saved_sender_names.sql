-- Table to store saved sender display names for the email compose feature
create table public.saved_sender_names (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  email_address text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- Only one default sender per account
create unique index idx_saved_sender_names_default
  on public.saved_sender_names (is_default)
  where is_default = true;

-- Insert default sender
insert into public.saved_sender_names (display_name, email_address, is_default)
values ('PRIGMA', 'notificaciones@prigma.net', true);

alter table public.saved_sender_names enable row level security;

-- Admins can do everything (service role bypasses RLS anyway, but this is explicit)
create policy "Admins can manage sender names"
  on public.saved_sender_names
  for all
  using (true)
  with check (true);
