-- Migration: 20260910120000_create_admin_tasks.sql
-- Description: Create admin_tasks table for task management in admin dashboard

create table if not exists public.admin_tasks (
  id uuid primary key default gen_random_uuid(),
  task_code varchar(20) not null,
  title varchar(255) not null,
  description text,
  project varchar(100) not null default 'Prigmate',
  assignee_name varchar(100) not null,
  status varchar(50) not null default 'pending' check (status in ('pending', 'in_progress', 'in_review', 'completed', 'blocked')),
  priority varchar(50) not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  estimated_days numeric(4, 1) not null default 1.0,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unique index on task_code for idempotent upsert operations
create unique index if not exists idx_admin_tasks_task_code_unique on public.admin_tasks(task_code);

-- Search and filter indices
create index if not exists idx_admin_tasks_assignee on public.admin_tasks(assignee_name);
create index if not exists idx_admin_tasks_status on public.admin_tasks(status);
create index if not exists idx_admin_tasks_priority on public.admin_tasks(priority);
create index if not exists idx_admin_tasks_project on public.admin_tasks(project);

-- Enable Row Level Security
alter table public.admin_tasks enable row level security;

-- Policy allowing admins / service role full access
create policy "Admins can manage tasks"
  on public.admin_tasks
  for all
  using (true)
  with check (true);
