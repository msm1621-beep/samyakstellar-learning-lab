import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const url = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const cronSecret = Deno.env.get('NOTIFICATION_CRON_SECRET');
const supabase = createClient(url, serviceKey);
const cors = { 'Content-Type': 'application/json' };
const messages = {
  missions: ['Daily Missions ready 🚀', 'Aaj ke space missions complete karo aur streak bachao!'],
  lectures: ['Study reminder 📚', 'Time to explore a new space topic in Stellar Learning Lab.'],
};

const dayParts = (date: Date, timezone: string) => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value || '00';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

serve(async (req) => {
  if (req.headers.get('x-cron-secret') !== cronSecret) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });
  const now = new Date();
  const { data: prefs, error } = await supabase.from('notification_preferences').select('*').eq('enabled', true);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: cors });
  let created = 0, sent = 0, failed = 0;
  for (const p of prefs || []) {
    const local = dayParts(now, p.timezone || 'Asia/Kolkata');
    const candidates = [
      ...(p.missions && local.minutes >= Number(String(p.mission_time).slice(0, 2)) * 60 + Number(String(p.mission_time).slice(3, 5)) ? ['missions'] : []),
      ...(p.lectures && local.minutes >= Number(String(p.lecture_time).slice(0, 2)) * 60 + Number(String(p.lecture_time).slice(3, 5)) ? ['lectures'] : []),
    ];
    for (const kind of candidates) {
      const [title, body] = messages[kind as keyof typeof messages];
      const { data: notification, error: insertError } = await supabase.from('notifications').insert({ user_id: p.user_id, kind, local_date: local.date, title, body }).select().maybeSingle();
      if (insertError?.code === '23505') continue;
      if (insertError || !notification) { failed++; await supabase.from('notification_delivery_logs').insert({ user_id: p.user_id, channel: 'database', status: 'failed', error: insertError?.message || 'insert failed' }); continue; }
      created++;
      await supabase.from('notification_delivery_logs').insert({ notification_id: notification.id, user_id: p.user_id, channel: 'database', status: 'created' });
      const { data: subscriptions } = await supabase.from('push_subscriptions').select('id, subscription').eq('user_id', p.user_id);
      for (const sub of subscriptions || []) {
        try {
          const publicKey = Deno.env.get('VAPID_PUBLIC_KEY'); const privateKey = Deno.env.get('VAPID_PRIVATE_KEY'); const subject = Deno.env.get('VAPID_SUBJECT');
          if (!publicKey || !privateKey || !subject) throw new Error('Web Push VAPID secrets are not configured');
          webpush.setVapidDetails(subject, publicKey, privateKey);
          await webpush.sendNotification(sub.subscription, JSON.stringify({ title, body, notificationId: notification.id, url: '/' }));
          sent++; await supabase.from('push_subscriptions').update({ last_success_at: new Date().toISOString(), last_error: null }).eq('id', sub.id);
          await supabase.from('notification_delivery_logs').insert({ notification_id: notification.id, user_id: p.user_id, channel: 'push', status: 'sent' });
        } catch (e) {
          failed++; const message = e instanceof Error ? e.message : String(e);
          await supabase.from('push_subscriptions').update({ last_failure_at: new Date().toISOString(), last_error: message }).eq('id', sub.id);
          await supabase.from('notification_delivery_logs').insert({ notification_id: notification.id, user_id: p.user_id, channel: 'push', status: 'failed', error: message });
        }
      }
    }
  }
  return new Response(JSON.stringify({ ok: true, created, sent, failed }), { headers: cors });
});
