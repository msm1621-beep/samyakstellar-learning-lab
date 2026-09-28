-- Reliable server-side notification scheduling and delivery.
-- Apply this migration, then store `notification_cron_secret`, `vapid_public_key`,
-- `vapid_private_key`, and `vapid_subject` in Supabase Vault. See docs/notifications.md.

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  enabled boolean not null default false,
  lectures boolean not null default true,
  missions boolean not null default true,
  lecture_time time not null default '18:00',
  mission_time time not null default '09:00',
  timezone text not null default 'Asia/Kolkata',
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('lectures', 'missions', 'system')),
  local_date date not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  dismissed_at timestamptz,
  unique (user_id, kind, local_date)
);

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  subscription jsonb not null,
  created_at timestamptz not null default now(),
  last_success_at timestamptz,
  last_failure_at timestamptz,
  last_error text
);

create table if not exists public.notification_delivery_logs (
  id bigint generated always as identity primary key,
  notification_id uuid references public.notifications(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  channel text not null,
  status text not null check (status in ('created', 'sent', 'failed')),
  error text,
  attempted_at timestamptz not null default now()
);

alter table public.notification_preferences enable row level security;
alter table public.notifications enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.notification_delivery_logs enable row level security;

drop policy if exists "Users manage notification preferences" on public.notification_preferences;
create policy "Users manage notification preferences" on public.notification_preferences for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Users read notifications" on public.notifications;
create policy "Users read notifications" on public.notifications for select to authenticated using (user_id = auth.uid());
drop policy if exists "Users update notifications" on public.notifications;
create policy "Users update notifications" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Users manage push subscriptions" on public.push_subscriptions;
create policy "Users manage push subscriptions" on public.push_subscriptions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update, delete on public.notification_preferences, public.notifications, public.push_subscriptions to authenticated;
grant all on public.notification_preferences, public.notifications, public.push_subscriptions, public.notification_delivery_logs to service_role;

drop function if exists public.mark_notification_read(uuid);
create function public.mark_notification_read(notification_id uuid) returns void language sql security invoker set search_path = public as $$
  update public.notifications set read_at = now() where id = notification_id and user_id = auth.uid();
$$;
grant execute on function public.mark_notification_read(uuid) to authenticated;

-- Run every five minutes. The function is idempotent, so retries cannot create duplicates.
select cron.unschedule(jobid) from cron.job where jobname = 'process-daily-notifications';
select cron.schedule('process-daily-notifications', '*/5 * * * *', $$
  select net.http_post(
    url := current_setting('app.settings.supabase_url', true) || '/functions/v1/process-daily-notifications',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'notification_cron_secret' limit 1)),
    body := '{}'::jsonb
  );
$$);
