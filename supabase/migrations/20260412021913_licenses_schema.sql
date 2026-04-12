
-- License system schema (clients / licenses / payments)
-- Notes:
-- - DB stores timestamptz in UTC; app logic should interpret license "days" in America/Bogota.
-- - RLS is enabled but no policies are created here (default deny). service_role bypasses RLS.
-- - Payments support drafts: `is_draft=true` implies `paid_at is null` (not counted until posted).

begin;

-- 1) Extensions (UUID generation)
create extension if not exists "pgcrypto";

-- 2) Enums
do $$ begin
  create type public.plan_type as enum ('monthly', 'annual', 'lifetime');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.payment_type as enum ('normal', 'promo', 'adjustment', 'credit');
exception
  when duplicate_object then null;
end $$;

-- 3) Tables

-- clients
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company_name text,
  contact_name text,
  contact_email text,
  contact_phone text,
  extra_info text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- licenses
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,

  -- Shared secret for HMAC and also the lookup key; must be unique & non-empty
  license_key text not null,

  plan public.plan_type not null,

  -- Billing config
  billing_day smallint,
  price_cop bigint not null default 0,

  -- Grace behavior
  grace_days integer not null default 0,
  grace_days_connection integer not null default 0,

  -- Manual trial window (admin set).
  trial_started_at timestamptz,
  trial_ends_at timestamptz,

  -- Operational
  active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint licenses_license_key_nonempty check (length(btrim(license_key)) > 0),
  constraint licenses_license_key_unique unique (license_key),

  constraint licenses_billing_day_range check (billing_day is null or (billing_day between 1 and 31)),
  constraint licenses_billing_day_lifetime_only_null check (
    (plan = 'lifetime' and billing_day is null) or
    (plan <> 'lifetime' and billing_day is not null)
  ),

  constraint licenses_price_cop_nonneg check (price_cop >= 0),
  constraint licenses_grace_days_nonneg check (grace_days >= 0),
  constraint licenses_grace_days_connection_nonneg check (grace_days_connection >= 0),

  constraint licenses_trial_both_null_or_set check (
    (trial_started_at is null and trial_ends_at is null) or
    (trial_started_at is not null and trial_ends_at is not null)
  ),
  constraint licenses_trial_order check (
    trial_started_at is null or trial_ends_at > trial_started_at
  )
);

-- payments
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  license_id uuid not null references public.licenses(id) on delete restrict,

  type public.payment_type not null,

  amount_cop bigint not null default 0,
  months_covered integer,

  -- Draft support
  is_draft boolean not null default false,
  paid_at timestamptz,

  -- Void support
  voided_at timestamptz,
  void_reason text,

  -- Optional metadata
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint payments_amount_cop_nonneg check (amount_cop >= 0),

  -- months_covered rules:
  -- - normal/promo/adjustment: required and must be >= 1
  -- - credit: nullable or 0
  constraint payments_months_covered_by_type check (
    (type = 'credit' and coalesce(months_covered, 0) = 0)
    or
    (type <> 'credit' and months_covered is not null and months_covered >= 1)
  ),

  -- Drafts: draft => no paid_at; posted => paid_at present
  constraint payments_draft_paid_at_consistency check (
    (is_draft = true and paid_at is null)
    or
    (is_draft = false and paid_at is not null)
  ),

  -- Voids can't be drafts, and require a non-empty reason
  constraint payments_void_not_draft check (voided_at is null or is_draft = false),
  constraint payments_void_reason_required check (
    voided_at is null or length(btrim(coalesce(void_reason, ''))) > 0
  )
);

-- 4) Indexes
create index if not exists idx_licenses_license_key on public.licenses (license_key);
create index if not exists idx_licenses_client_id on public.licenses (client_id);
create index if not exists idx_payments_license_id_paid_at on public.payments (license_id, paid_at);
create index if not exists idx_payments_is_draft on public.payments (is_draft);

-- 5) RLS (enable; no policies => deny by default)
alter table public.clients enable row level security;
alter table public.licenses enable row level security;
alter table public.payments enable row level security;

commit;
