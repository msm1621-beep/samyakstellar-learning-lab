import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, targetLanguage, targetLanguageName } = await req.json();

    if (!Array.isArray(texts)) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanedTexts = texts
      .filter((text) => typeof text === 'string')
      .map((text) => text.trim())
      .filter((text) => text.length > 0)
      .slice(0, 120);

    if (cleanedTexts.length === 0 || targetLanguage === 'en') {
      return new Response(JSON.stringify({ translations: cleanedTexts }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `Translate every string into ${targetLanguageName || targetLanguage} (${targetLanguage}).\n\nRules:\n- Return ONLY a JSON array of translated strings in the exact same order.\n- Keep emojis, punctuation, and meaning.\n- Keep each line concise and natural for a website UI.\n- Do not add explanations or markdown.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        temperature: 0.2,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: JSON.stringify(cleanedTexts) },
        ],
      }),
    });

    if (!aiResponse.ok) {
      return new Response(JSON.stringify({ translations: cleanedTexts }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiResponse.json();
    const rawOutput = aiData.choices?.[0]?.message?.content ?? '[]';
    const normalizedOutput = String(rawOutput)
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    let translations: string[] = [];

    try {
      const parsed = JSON.parse(normalizedOutput);
      if (Array.isArray(parsed)) {
        translations = parsed.map((item, index) => String(item ?? cleanedTexts[index] ?? ''));
      }
    } catch {
      translations = cleanedTexts;
    }

    if (translations.length !== cleanedTexts.length) {
      translations = cleanedTexts.map((text, index) => translations[index] || text);
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('translate-text error:', error);
    return new Response(JSON.stringify({ error: 'Translation failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
