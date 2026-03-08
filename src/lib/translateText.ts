import translations, { languages, type LanguageCode, type TranslationKey } from '@/data/translations';
import { getExtendedTranslation } from '@/data/extendedTranslations';

const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-text`;

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

const KEY_OVERRIDES: Record<string, TranslationKey> = {
  // Navigation
  'All': 'common.all',
  '🌟 All': 'common.all',
  'Home': 'nav.home',
  'Solar System': 'nav.solarSystem',
  'Timeline': 'nav.timeline',
  'Constellations': 'nav.constellations',
  'Library': 'nav.library',
  'Games': 'nav.games',
  'Subscriptions': 'nav.subscriptions',
  'Fun Facts': 'nav.funFacts',
  'About': 'nav.about',
  'Start Your Journey': 'nav.startJourney',
  'Cosmic Classroom': 'nav.cosmicClassroom',

  // Hero
  'Start Your Space Journey': 'hero.startJourney',
  'Take a Quiz': 'hero.takeQuiz',

  // Sections
  'Daily Space Fact': 'section.dailyFact',
  'Space Q&A': 'section.spaceQnA',
  'Questions & Answers': 'section.spaceQnA',
  'Daily Fact': 'section.dailyFact',
  'Space Courses': 'section.courses',
  'Gift Vouchers': 'section.giftVouchers',
  'Space Manuscripts': 'section.manuscripts',
  'Premium Games': 'section.premiumGames',
  'Game Pass': 'section.gamePass',
  'Trophy Cabinet': 'section.trophyCabinet',
  'Space Shop': 'section.shop',

  // Common
  'Learn': 'common.learn',
  'Play': 'common.play',
  'Explore': 'common.explore',
  'Videos': 'common.videos',
  'Books': 'common.books',
  'Audiobooks': 'common.audiobooks',
  'Locked': 'common.locked',
  'Buy': 'common.buy',
  'Purchased': 'common.purchased',
  'Close': 'common.close',
  'Back': 'common.back',
  'Next': 'common.next',
  'Previous': 'common.previous',
  'Read Now': 'common.readNow',
  'Watch Now': 'common.watchNow',
  'Listen Now': 'common.listenNow',
  'Coins': 'common.coins',

  // Explorer
  '📍 Any Distance': 'explorer.anyDistance',
  '🏠 Near': 'explorer.near',
  '🚀 Far': 'explorer.far',

  // Q&A
  'Suggested Questions': 'qna.suggested',
  'Ask': 'qna.ask',

  // Daily Fact
  'New Fact': 'dailyFact.newFact',
  'Share': 'dailyFact.share',

  // Shop
  '⚡ Boosts': 'shop.boosts',
  'Boosts': 'shop.boosts',
  '🎨 Cosmetics': 'shop.cosmetics',
  'Cosmetics': 'shop.cosmetics',
  '🔧 Utilities': 'shop.utilities',
  'Popular': 'shop.popular',

  // Subscription
  'Purchase': 'subscription.purchase',
  'Daily Bonus': 'subscription.dailyBonus',
  'Claim Bonus': 'subscription.claimBonus',
  'Expired': 'subscription.expired',
  'Active': 'gamePass.active',

  // Courses
  '← Back to Courses': 'courses.backToCourses',
  'Claim Certificate': 'courses.claimCertificate',
  'Take Quiz': 'courses.takeQuiz',
  'Restart Course': 'courses.restartCourse',
  'Progress': 'courses.progress',
  'Learning Goals': 'courses.learningGoals',
  'Course Plan': 'courses.coursePlan',

  // Games
  'Quiz': 'games.quiz',
  'Size Compare': 'games.sizeCompare',
  'Rocket Shooter': 'games.rocketShooter',
  'Memory Match': 'games.memoryMatch',
  'Word Scramble': 'games.wordScramble',
  'Rocket Math': 'games.rocketMath',

  // Account
  'Create Account': 'account.createAccount',
  'Guest': 'account.guest',
  'Profile': 'account.profile',

  // TTS
  'Read Aloud': 'tts.readAloud',
  'Stop Reading': 'tts.stopReading',

  // Footer
  'For Parents & Teachers': 'footer.forParents',
  'Contact': 'footer.contact',
  'Privacy Policy': 'footer.privacy',

  // About
  'Planets & Moons': 'about.planetsMoons',
  'Stars & Nebulas': 'about.starsNebulas',
  'Galaxies': 'about.galaxies',
  'Books & Videos': 'about.booksVideos',
};

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export const getDictionaryOverride = (text: string, language: string): string | null => {
  if (!text || language === 'en') return null;

  const value = normalize(text);

  // 1. Check KEY_OVERRIDES (maps to translation keys)
  const key = KEY_OVERRIDES[value];
  if (key) {
    const localized = translations[language as LanguageCode]?.[key];
    if (localized) {
      if (value.startsWith('🌟 ')) return `🌟 ${localized}`;
      return localized;
    }
  }

  // 2. Check extended dictionary (direct text → translation map)
  const extended = getExtendedTranslation(value, language);
  if (extended) return extended;

  // 3. Handle "All (N)" pattern
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
