import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(url, serviceKey);
const cors = { 'Content-Type': 'application/json' };

type ContentType = 'fact' | 'article' | 'quiz_question' | 'mission' | 'discovery' | 'celestial_body' | 'space_news' | 'educational_content';

interface ContentDiscovery {
  title: string;
  type: ContentType;
  body: string;
  category: string;
  source_url: string;
  source_name: string;
  source_date: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  suggested_action: string;
  verification_notes: string;
}

const authoritative_sources = [
  { name: 'NASA', url: 'https://nasa.gov', authority: 'primary', category: 'space_missions,discoveries' },
  { name: 'ISRO', url: 'https://isro.gov.in', authority: 'primary', category: 'space_missions,india' },
  { name: 'ESA', url: 'https://esa.int', authority: 'primary', category: 'space_missions,discoveries' },
  { name: 'JAXA', url: 'https://jaxa.jp', authority: 'primary', category: 'space_missions' },
  { name: 'arXiv', url: 'https://arxiv.org', authority: 'secondary', category: 'scientific_research' },
];

const discovery_hints = [
  { topic: 'Recent NASA Missions', check_frequency_days: 7 },
  { topic: 'ISRO Updates', check_frequency_days: 7 },
  { topic: 'Exoplanet Discoveries', check_frequency_days: 14 },
  { topic: 'Space Launches', check_frequency_days: 7 },
  { topic: 'Astronomy Events', check_frequency_days: 30 },
  { topic: 'Black Hole Observations', check_frequency_days: 30 },
  { topic: 'Space Telescope Data', check_frequency_days: 14 },
];

serve(async (req) => {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== Deno.env.get('CONTENT_AGENT_SECRET')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });
  }

  const discoveries: ContentDiscovery[] = [];
  let reviewed = 0, flagged_outdated = 0, verification_requests = 0;

  // 1. Check content that needs freshness review
  const { data: review_due } = await supabase
    .from('content_items')
    .select('*')
    .lt('next_review_date', new Date().toISOString())
    .limit(100);

  if (review_due) {
    for (const item of review_due) {
      reviewed++;
      // Create review queue item
      await supabase.from('content_review_queue').insert({
        content_id: item.id,
        review_type: 'freshness_check',
        priority: item.freshness_status === 'outdated' ? 'high' : 'medium',
        description: `Routine freshness check: ${item.title}`,
        status: 'pending',
      });
    }
  }

  // 2. Detect potentially outdated content
  const { data: potentially_outdated } = await supabase
    .from('content_items')
    .select('*')
    .eq('freshness_status', 'current')
    .lt('last_reviewed_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
    .limit(50);

  if (potentially_outdated) {
    for (const item of potentially_outdated) {
      flagged_outdated++;
      await supabase.from('content_items').update({ freshness_status: 'review_needed' }).eq('id', item.id);
    }
  }

  // 3. Queue verification checks for important high-frequency topics
  for (const hint of discovery_hints) {
    const { data: related } = await supabase
      .from('content_items')
      .select('*')
      .ilike('title', `%${hint.topic.split(' ')[0]}%`)
      .eq('verification_status', 'unverified')
      .limit(10);

    if (related) {
      for (const item of related) {
        verification_requests++;
        await supabase.from('content_review_queue').insert({
          content_id: item.id,
          review_type: 'verification',
          priority: 'medium',
          description: `Verification required for: ${item.title}`,
          status: 'pending',
        });
      }
    }
  }

  // 4. Log agent activity
  console.log(`Content Discovery Agent: reviewed=${reviewed}, flagged_outdated=${flagged_outdated}, verification_requests=${verification_requests}`);

  return new Response(JSON.stringify({ ok: true, reviewed, flagged_outdated, verification_requests }), { headers: cors });
});
