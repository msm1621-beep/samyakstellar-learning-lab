import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const parseTranslationPayload = (payload: unknown): string[] | null => {
  if (Array.isArray(payload)) {
    return payload.map((item) => String(item ?? ''));
  }

  if (payload && typeof payload === 'object') {
    const objectPayload = payload as Record<string, unknown>;
    const candidates = [
      objectPayload.translations,
      objectPayload.translation,
      objectPayload.items,
      objectPayload.result,
      objectPayload.data,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate.map((item) => String(item ?? ''));
      }
    }
  }

  return null;
};

const parseModelOutput = (rawOutput: unknown): string[] | null => {
  const normalizedOutput = String(rawOutput ?? '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const directParse = (() => {
    try {
      return parseTranslationPayload(JSON.parse(normalizedOutput));
    } catch {
      return null;
    }
  })();

  if (directParse) return directParse;

  const objectMatch = normalizedOutput.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    try {
      const parsed = JSON.parse(objectMatch[0]);
      const objectParsed = parseTranslationPayload(parsed);
      if (objectParsed) return objectParsed;
    } catch {
      // fall through
    }
  }

  const arrayMatch = normalizedOutput.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      const parsed = JSON.parse(arrayMatch[0]);
      const arrayParsed = parseTranslationPayload(parsed);
      if (arrayParsed) return arrayParsed;
    } catch {
      // fall through
    }
  }

  return null;
};

const appearsUntranslated = (source: string[], translated: string[]): boolean => {
  if (source.length === 0 || source.length !== translated.length) return true;

  const hasLetters = (text: string) => /\p{L}/u.test(text);
  const sourceWithLetters = source.filter(hasLetters);
  if (sourceWithLetters.length === 0) return false;

  const unchanged = source.reduce((count, src, index) => {
    const dst = translated[index] ?? '';
    const normalizedSrc = src.trim().toLowerCase();
    const normalizedDst = dst.trim().toLowerCase();
    return count + (normalizedSrc === normalizedDst ? 1 : 0);
  }, 0);

  return unchanged / source.length >= 0.75;
};

const requestTranslation = async ({
  key,
  cleanedTexts,
  targetLanguage,
  targetLanguageName,
  retryHint,
}: {
  key: string;
  cleanedTexts: string[];
  targetLanguage: string;
  targetLanguageName?: string;
  retryHint: boolean;
}): Promise<string[] | null> => {
  const prompt = retryHint
    ? `You failed the previous translation attempt. Translate EVERY item into ${targetLanguageName || targetLanguage} (${targetLanguage}) now. Return EXACTLY this JSON object schema: {"translations":["..."]}. Keep order and length identical.`
    : `You are a UI localization translator. Translate EVERY string into ${targetLanguageName || targetLanguage} (${targetLanguage}). Return EXACTLY this JSON object schema: {"translations":["..."]}. Keep order and length identical.`;

  const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-5-mini',
      temperature: 0,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: JSON.stringify(cleanedTexts) },
      ],
    }),
  });

  if (!aiResponse.ok) return null;

  const aiData = await aiResponse.json();
  const parsed = parseModelOutput(aiData.choices?.[0]?.message?.content);
  if (!parsed) return null;

  if (parsed.length !== cleanedTexts.length) {
    return cleanedTexts.map((text, index) => parsed[index] || text);
  }

  return parsed;
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

    const firstPass = await requestTranslation({
      key: LOVABLE_API_KEY,
      cleanedTexts,
      targetLanguage,
      targetLanguageName,
      retryHint: false,
    });

    if (firstPass && !appearsUntranslated(cleanedTexts, firstPass)) {
      return new Response(JSON.stringify({ translations: firstPass }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const secondPass = await requestTranslation({
      key: LOVABLE_API_KEY,
      cleanedTexts,
      targetLanguage,
      targetLanguageName,
      retryHint: true,
    });

    const finalTranslations = secondPass && !appearsUntranslated(cleanedTexts, secondPass)
      ? secondPass
      : firstPass && firstPass.length === cleanedTexts.length
        ? firstPass
        : cleanedTexts;

    return new Response(JSON.stringify({ translations: finalTranslations }), {
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
