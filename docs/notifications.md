# Reliable notifications setup

The frontend previously used only a browser `setInterval`, localStorage, and the Notification API. That cannot run with the site closed, cannot share history between devices, and silently lost failures.

This change adds:

- `notification_preferences` with an explicit IANA timezone (default `Asia/Kolkata`)
- durable `notifications` history and read state
- `push_subscriptions` and delivery/failure logs
- a unique `(user_id, kind, local_date)` constraint for duplicate prevention
- `process-daily-notifications` Supabase Edge Function
- a five-minute `pg_cron` job; the function itself is idempotent and safely retryable

## Deployment

1. Apply the migration with `supabase db push`.
2. Set Edge Function secrets: `NOTIFICATION_CRON_SECRET`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` (usually `mailto:you@example.com`). Generate a VAPID pair with `npx web-push generate-vapid-keys`.
3. Store `notification_cron_secret` in Supabase Vault and configure `app.settings.supabase_url` to the project URL, or replace the URL expression in the cron job with the project URL.
4. Deploy: `supabase functions deploy process-daily-notifications`.
5. Add the public VAPID key as `VITE_VAPID_PUBLIC_KEY` and rebuild the web app.
6. Verify `cron.job`, invoke the function manually with the secret, then check `notifications` and `notification_delivery_logs`.

The server creates one durable notification per enabled type/day even when the site is closed or the user is logged out. OS delivery requires the user to have previously granted permission and registered a push subscription; the in-app history remains available after the next login.
