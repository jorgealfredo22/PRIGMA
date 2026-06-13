alter table public.clients add column if not exists metadata jsonb not null default '{}'::jsonb;
