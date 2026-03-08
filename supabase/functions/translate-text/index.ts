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

const normalizeForCompare = (text: string) => text.trim().toLowerCase().replace(/\s+/g, ' ');
const hasLetters = (text: string) => /\p{L}/u.test(text);

const unchangedIndices = (source: string[], translated: string[]) => {
  const indexes: number[] = [];

  for (let i = 0; i < source.length; i++) {
    const src = source[i] ?? '';
    const dst = translated[i] ?? '';
    if (!src || !hasLetters(src)) continue;

    if (normalizeForCompare(src) === normalizeForCompare(dst)) {
      indexes.push(i);
    }
  }

  return indexes;
};

const alignToSource = (source: string[], candidate: string[] | null): string[] => {
  if (!candidate) return [...source];
  return source.map((src, index) => {
    const dst = candidate[index];
    return typeof dst === 'string' && dst.trim().length > 0 ? dst : src;
  });
};

const requestTranslation = async ({
  key,
  texts,
  targetLanguage,
  targetLanguageName,
  mode,
}: {
  key: string;
  texts: string[];
  targetLanguage: string;
  targetLanguageName?: string;
  mode: 'base' | 'rescue';
}): Promise<string[] | null> => {
  const prompt = mode === 'rescue'
    ? `You are a strict UI localization engine. Previous translation left source-language text unchanged. Translate each input item into ${targetLanguageName || targetLanguage} (${targetLanguage}). Rules: (1) Keep exact order and array length. (2) Keep emoji, punctuation and numbers. (3) Keep only true proper nouns/astronomical names unchanged when needed, but translate all normal UI words and sentences. (4) Return ONLY JSON: {"translations":["..."]}`
    : `You are a UI localization translator. Translate each input item into ${targetLanguageName || targetLanguage} (${targetLanguage}). Keep exact order and array length. Keep emoji, punctuation and numbers. Return ONLY JSON: {"translations":["..."]}`;

  const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      temperature: 0,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: JSON.stringify(texts) },
      ],
    }),
  });

  if (!aiResponse.ok) return null;

  const aiData = await aiResponse.json();
  return parseModelOutput(aiData.choices?.[0]?.message?.content);
};

const chunk = <T>(items: T[], size: number): T[][] => {
  const output: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    output.push(items.slice(i, i + size));
  }
  return output;
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
      .map((text) => (typeof text === 'string' ? text.trim() : ''))
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

    const translated: string[] = [];
    const groups = chunk(cleanedTexts, 30);

    for (const group of groups) {
      if (group.every((item) => item.length === 0)) {
        translated.push(...group);
        continue;
      }

      const firstPass = alignToSource(group, await requestTranslation({
        key: LOVABLE_API_KEY,
        texts: group,
        targetLanguage,
        targetLanguageName,
        mode: 'base',
      }));

      let merged = [...firstPass];
      const firstUnchanged = unchangedIndices(group, merged);

      if (firstUnchanged.length > 0) {
        const rescueSource = firstUnchanged.map((index) => group[index]);
        const rescuePass = alignToSource(rescueSource, await requestTranslation({
          key: LOVABLE_API_KEY,
          texts: rescueSource,
          targetLanguage,
          targetLanguageName,
          mode: 'rescue',
        }));

        firstUnchanged.forEach((index, i) => {
          merged[index] = rescuePass[i] ?? merged[index];
        });
      }

      translated.push(...merged);
    }

    return new Response(JSON.stringify({ translations: translated }), {
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
