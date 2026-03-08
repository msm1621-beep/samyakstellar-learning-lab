import translations, { languages, type LanguageCode, type TranslationKey } from '@/data/translations';

const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-text`;

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

const KEY_OVERRIDES: Record<string, TranslationKey> = {
  'All': 'common.all',
  '🌟 All': 'common.all',
  'Solar System': 'nav.solarSystem',
  'Timeline': 'nav.timeline',
  'Constellations': 'nav.constellations',
  'Library': 'nav.library',
  'Games': 'nav.games',
  'Subscriptions': 'nav.subscriptions',
  'Fun Facts': 'nav.funFacts',
  'About': 'nav.about',
  'Start Your Journey': 'nav.startJourney',
  'Questions & Answers': 'section.spaceQnA',
  'Daily Fact': 'section.dailyFact',
  'Suggested Questions': 'qna.suggested',
  'Ask': 'qna.ask',
  'New Fact': 'dailyFact.newFact',
  'Share': 'dailyFact.share',
  'Boosts': 'shop.boosts',
  'Cosmetics': 'shop.cosmetics',
  'Popular': 'shop.popular',
  'Premium Games': 'section.premiumGames',
  'Game Pass': 'section.gamePass',
  'Trophy Cabinet': 'section.trophyCabinet',
  'Space Shop': 'section.shop',
  'Locked': 'common.locked',
  'Buy': 'common.buy',
  'Purchased': 'common.purchased',
  'Close': 'common.close',
  'Back': 'common.back',
  'Next': 'common.next',
  'Previous': 'common.previous',
  'Active': 'gamePass.active',
  'Create Account': 'account.createAccount',
  'Guest': 'account.guest',
  'Profile': 'account.profile',
  'Read Aloud': 'tts.readAloud',
  'Stop Reading': 'tts.stopReading',
};

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export const getDictionaryOverride = (text: string, language: string): string | null => {
  if (!text || language === 'en') return null;

  const value = normalize(text);
  const key = KEY_OVERRIDES[value];

  if (key) {
    const localized = translations[language as LanguageCode]?.[key];
    if (localized) {
      if (value.startsWith('🌟 ')) return `🌟 ${localized}`;
      return localized;
    }
  }

  const allWithCount = value.match(/^All\s*\((\d+)\)$/i);
  if (allWithCount) {
    const localizedAll = translations[language as LanguageCode]?.['common.all'];
    return localizedAll ? `${localizedAll} (${allWithCount[1]})` : null;
  }

  return null;
};

export const translateTexts = async (texts: string[], language: string): Promise<string[]> => {
  if (language === 'en' || texts.length === 0) return texts;

  const seeded = texts.map((text) => getDictionaryOverride(text, language));
  const pendingIndexes = seeded
    .map((override, index) => (override === null ? index : -1))
    .filter((index) => index >= 0);

  if (pendingIndexes.length === 0) {
    return seeded.map((override, index) => override ?? texts[index]);
  }

  const pendingTexts = pendingIndexes.map((index) => texts[index]);

  try {
    const response = await fetch(TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        texts: pendingTexts,
        targetLanguage: language,
        targetLanguageName: getLanguageName(language),
      }),
    });

    if (!response.ok) {
      return texts.map((source, index) => seeded[index] ?? source);
    }

    const data = await response.json();
    if (!Array.isArray(data.translations)) {
      return texts.map((source, index) => seeded[index] ?? source);
    }

    const merged = [...seeded];
    pendingIndexes.forEach((index, pendingIndex) => {
      merged[index] = data.translations[pendingIndex] ?? texts[index];
    });

    return merged.map((value, index) => value ?? texts[index]);
  } catch {
    return texts.map((source, index) => seeded[index] ?? source);
  }
};
