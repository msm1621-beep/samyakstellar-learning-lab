-- Continuous Information Management System for Stellar Learning Lab
-- Tracks content freshness, verification, sources, and update history

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('fact', 'article', 'quiz_question', 'mission', 'discovery', 'celestial_body', 'space_news', 'educational_content')),
  external_id text,
  title text not null,
  body text,
  category text,
  freshness_status text not null check (freshness_status in ('current', 'review_needed', 'outdated', 'updating', 'verified')) default 'current',
  verification_status text check (verification_status in ('unverified', 'pending_review', 'verified', 'disputed')),
  source_url text,
  source_name text,
  source_date timestamptz,
  last_reviewed_at timestamptz,
  last_updated_at timestamptz,
  next_review_date timestamptz,
  review_frequency_days int default 30,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  url text,
  authority_level text check (authority_level in ('primary', 'secondary', 'tertiary')) default 'secondary',
  category text,
  rate_limit_per_hour int,
  last_accessed_at timestamptz,
  is_active boolean default true,
  notes text
);

create table if not exists public.content_updates (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  change_type text check (change_type in ('created', 'updated', 'verified', 'flagged', 'rolled_back')),
  previous_value jsonb,
  new_value jsonb,
  reason text,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  is_approved boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists public.content_review_queue (
  id uuid primary key default gen_random_uuid(),
  content_id uuid references public.content_items(id) on delete cascade,
  review_type text check (review_type in ('new_content', 'update_proposal', 'freshness_check', 'verification', 'quality_check')),
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  description text,
  proposed_changes jsonb,
  sources jsonb,
  assigned_to uuid references auth.users(id),
  status text check (status in ('pending', 'in_progress', 'approved', 'rejected', 'postponed')) default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.sync_status (
  id uuid primary key default gen_random_uuid(),
  target_type text check (target_type in ('app', 'website', 'backup')),
  content_type text,
  last_synced_at timestamptz,
  sync_status text check (sync_status in ('synced', 'syncing', 'failed', 'needs_attention')) default 'needs_attention',
  error_message text,
  record_count int,
  updated_at timestamptz not null default now()
);

alter table public.content_items enable row level security;
alter table public.content_sources enable row level security;
alter table public.content_updates enable row level security;
alter table public.content_review_queue enable row level security;
alter table public.sync_status enable row level security;

-- Public can view content items (the actual facts/articles), but not review queues
create policy "Public view content items" on public.content_items for select using (true);
create policy "Authenticated update content" on public.content_items for update to authenticated using (true);

-- Only service role and designated admin can edit sources and sync status
create policy "Service role manage sources" on public.content_sources to service_role using (true);
create policy "Service role manage sync" on public.sync_status to service_role using (true);

-- Grant permissions
grant select on public.content_items to anon, authenticated;
grant select, insert, update, delete on public.content_items, public.content_sources, public.content_updates, public.content_review_queue, public.sync_status to service_role;

-- Indexes for performance
create index if not exists idx_content_type on public.content_items(content_type);
create index if not exists idx_freshness on public.content_items(freshness_status);
create index if not exists idx_next_review on public.content_items(next_review_date);
create index if not exists idx_review_queue_status on public.content_review_queue(status);

-- Function: Mark content as reviewed
create or replace function public.mark_content_reviewed(content_id uuid, freshness text default 'current') returns void language sql security invoker as $$
  update public.content_items set
    last_reviewed_at = now(),
    freshness_status = freshness,
    next_review_date = now() + (review_frequency_days || ' days')::interval
  where id = content_id;
$$;

grant execute on function public.mark_content_reviewed(uuid, text) to service_role, authenticated;
