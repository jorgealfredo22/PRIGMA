-- Add grace_ends_at tracking columns for precise grace period boundaries
-- These columns store the computed end dates of grace periods, avoiding
-- recalculation and ensuring consistency across validations.

begin;

-- Add grace_ends_at: when standard grace period (grace_days) ends
-- Calculated as expires_at + grace_days at payment time
alter table public.licenses
  add column if not exists grace_ends_at timestamptz;

-- Add grace_ends_at_connection: when connection grace period ends
-- Calculated as grace_ends_at + grace_days_connection
-- Only meaningful when grace_days_connection > 0
alter table public.licenses
  add column if not exists grace_ends_at_connection timestamptz;

-- Comments for documentation
comment on column public.licenses.grace_ends_at is
  'When the standard grace period ends (expires_at + grace_days). NULL if not yet computed or not applicable.';
comment on column public.licenses.grace_ends_at_connection is
  'When the connection grace period ends (grace_ends_at + grace_days_connection). NULL if grace_days_connection=0 or not computed.';

-- Index for efficient queries on grace period status
create index if not exists idx_licenses_grace_ends_at
  on public.licenses (grace_ends_at)
  where grace_ends_at is not null;

create index if not exists idx_licenses_grace_ends_at_connection
  on public.licenses (grace_ends_at_connection)
  where grace_ends_at_connection is not null;

commit;
