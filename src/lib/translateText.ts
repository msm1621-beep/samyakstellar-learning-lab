import { languages } from '@/data/translations';

const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-text`;

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

export const translateTexts = async (texts: string[], language: string): Promise<string[]> => {
  if (language === 'en' || texts.length === 0) return texts;

  try {
    const response = await fetch(TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        texts,
        targetLanguage: language,
        targetLanguageName: getLanguageName(language),
      }),
    });

    if (!response.ok) return texts;

    const data = await response.json();
    if (!Array.isArray(data.translations)) return texts;

    return texts.map((source, index) => data.translations[index] ?? source);
  } catch {
    return texts;
  }
};
