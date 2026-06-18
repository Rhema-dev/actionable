-- Actionable — correct schema matching the app code
-- Run this in your Supabase SQL Editor (replace the old schema first)

-- Drop everything (safe to re-run at any time)
drop table if exists follow_ups cascade;
drop table if exists dm_templates cascade;
drop table if exists daily_checklist cascade;
drop table if exists content_posts cascade;
drop table if exists goals cascade;
drop table if exists savings_goals cascade;
drop table if exists expenses cascade;
drop table if exists income cascade;
drop table if exists projects cascade;
drop table if exists leads cascade;
drop table if exists profiles cascade;
drop table if exists business_metrics cascade;
drop table if exists financing_sources cascade;
drop table if exists transactions cascade;
drop table if exists budget_categories cascade;
drop table if exists goal_updates cascade;
drop table if exists activities cascade;
drop table if exists tasks cascade;
drop table if exists opportunities cascade;
drop table if exists contacts cascade;
drop table if exists social_channels cascade;
drop view if exists dashboard_summary cascade;

-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  business_name text,
  x_handle text,
  youtube_channel text,
  hourly_rate numeric,
  monthly_revenue_goal numeric default 3000,
  pc_goal_target numeric default 3000,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can manage own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- ─────────────────────────────────────────────
-- LEADS
-- ─────────────────────────────────────────────
create table leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date_found date default current_date,
  x_handle text not null,
  company text,
  follower_count integer,
  source text default 'X',
  engaged boolean default false,
  dm_sent boolean default false,
  dm_sent_date date,
  response text default 'No Reply' check (response in ('No Reply','Interested','Not Interested','Meeting Booked','Converted')),
  next_step text,
  status text default 'New' check (status in ('New','Contacted','Engaged','Proposal Sent','Negotiating','Closed Won','Closed Lost')),
  estimated_value numeric,
  mockup_sent boolean default false,
  follow_up_date date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table leads enable row level security;
create policy "Users can manage own leads" on leads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- PROJECTS
-- ─────────────────────────────────────────────
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lead_id uuid references leads(id) on delete set null,
  client_name text not null,
  client_x_handle text,
  project_type text default 'Explainer' check (project_type in ('Launch Video','Explainer','Onboarding Series','VSL','Demo','Custom')),
  price numeric default 0,
  deposit_amount numeric default 0,
  deposit_paid boolean default false,
  deposit_paid_date date,
  final_paid boolean default false,
  final_paid_date date,
  status text default 'Scoping' check (status in ('Scoping','In Progress','Client Review','Revisions','Completed','Cancelled')),
  start_date date,
  deadline date,
  completed_date date,
  video_length_seconds integer,
  revision_count integer default 0,
  max_revisions integer default 3,
  deliverables text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table projects enable row level security;
create policy "Users can manage own projects" on projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- INCOME
-- ─────────────────────────────────────────────
create table income (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  project_id uuid references projects(id) on delete set null,
  amount numeric not null,
  date date default current_date,
  payment_type text default 'Bank Transfer',
  description text,
  created_at timestamptz default now()
);
alter table income enable row level security;
create policy "Users can manage own income" on income
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- EXPENSES
-- ─────────────────────────────────────────────
create table expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  amount numeric not null,
  category text default 'Other',
  description text not null,
  date date default current_date,
  is_pc_fund_contribution boolean default false,
  recurring boolean default false,
  created_at timestamptz default now()
);
alter table expenses enable row level security;
create policy "Users can manage own expenses" on expenses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- SAVINGS GOALS (PC Fund)
-- ─────────────────────────────────────────────
create table savings_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  goal_name text not null,
  description text,
  target_amount numeric default 3000,
  current_amount numeric default 0,
  deadline date,
  status text default 'Active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table savings_goals enable row level security;
create policy "Users can manage own savings goals" on savings_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- GOALS
-- ─────────────────────────────────────────────
create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  goal_type text default 'Custom' check (goal_type in ('Revenue','Leads','Posts','Projects','DMs Sent','Replies','Custom')),
  target_value numeric default 0,
  current_value numeric default 0,
  period text default 'Monthly' check (period in ('Daily','Weekly','Monthly','Quarterly','Custom')),
  start_date date default current_date,
  end_date date,
  status text default 'Active' check (status in ('Active','Completed','Failed','Paused')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table goals enable row level security;
create policy "Users can manage own goals" on goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- CONTENT POSTS
-- ─────────────────────────────────────────────
create table content_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text default 'X' check (platform in ('X','YouTube','LinkedIn')),
  content_type text default 'Value/Tips' check (content_type in ('Showcase','Value/Tips','Behind-Scenes','Poll','Question','Repurposed','Short','Long Video')),
  title text,
  hook text,
  content text,
  call_to_action text,
  scheduled_date date,
  scheduled_time time,
  status text default 'Draft' check (status in ('Draft','Scheduled','Published','Skipped')),
  published_at timestamptz,
  likes integer default 0,
  replies integer default 0,
  reposts integer default 0,
  bookmarks integer default 0,
  impressions integer default 0,
  profile_visits integer default 0,
  views integer default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table content_posts enable row level security;
create policy "Users can manage own content" on content_posts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- DAILY CHECKLIST
-- ─────────────────────────────────────────────
create table daily_checklist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date default current_date,
  task_key text not null,
  task_label text not null,
  target_count integer default 1,
  completed_count integer default 0,
  is_done boolean default false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz default now()
);
alter table daily_checklist enable row level security;
create policy "Users can manage own checklist" on daily_checklist
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- DM TEMPLATES
-- ─────────────────────────────────────────────
create table dm_templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  template_type text default 'Initial Outreach' check (template_type in ('Initial Outreach','Mockup Offer','Value-First','Follow-Up','Meeting Request')),
  content text not null,
  use_case text,
  times_used integer default 0,
  is_favorite boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table dm_templates enable row level security;
create policy "Users can manage own templates" on dm_templates
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- FOLLOW UPS
-- ─────────────────────────────────────────────
create table follow_ups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lead_id uuid references leads(id) on delete cascade not null,
  due_date date not null,
  message_template text,
  is_completed boolean default false,
  completed_at timestamptz,
  outcome text,
  created_at timestamptz default now()
);
alter table follow_ups enable row level security;
create policy "Users can manage own follow ups" on follow_ups
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
