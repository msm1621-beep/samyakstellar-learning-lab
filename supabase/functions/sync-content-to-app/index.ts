import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(url, serviceKey);
const cors = { 'Content-Type': 'application/json' };

serve(async (req) => {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== Deno.env.get('SYNC_AGENT_SECRET')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });
  }

  let synced = 0, failed = 0;
  const sync_targets = ['app', 'website', 'backup'];

  for (const target of sync_targets) {
    try {
      // Get verified content that hasn't been synced
      const { data: content, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('freshness_status', 'verified')
        .is('metadata->last_synced_to_' + target, null)
        .limit(100);

      if (error) throw error;

      if (content && content.length > 0) {
        // Update sync status
        await supabase.from('sync_status').upsert({
          target_type: target,
          sync_status: 'syncing',
          record_count: content.length,
        });

        // Mark as synced in metadata
        for (const item of content) {
          const updated_metadata = item.metadata || {};
          updated_metadata['last_synced_to_' + target] = new Date().toISOString();
          await supabase
            .from('content_items')
            .update({ metadata: updated_metadata })
            .eq('id', item.id);
          synced++;
        }

        await supabase.from('sync_status').upsert({
          target_type: target,
          sync_status: 'synced',
          record_count: content.length,
          last_synced_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      failed++;
      const error_msg = e instanceof Error ? e.message : String(e);
      await supabase.from('sync_status').upsert({
        target_type: target,
        sync_status: 'failed',
        error_message: error_msg,
      });
      console.error(`Sync to ${target} failed:`, error_msg);
    }
  }

  return new Response(JSON.stringify({ ok: true, synced, failed }), { headers: cors });
});
