// Lightweight cookie helpers + localStorage mirroring so account/progress
// survives even when localStorage is cleared (e.g., in-app browsers, PWAs).
// Cookies are limited to ~4KB each, so we only mirror small, critical keys.

const ONE_YEAR = 60 * 60 * 24 * 365;

export const setCookie = (name: string, value: string, maxAgeSec: number = ONE_YEAR) => {
  try {
    const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAgeSec}; Path=/; SameSite=Lax${secure}`;
  } catch {}
};

export const getCookie = (name: string): string | null => {
  try {
    const target = encodeURIComponent(name) + '=';
    const parts = document.cookie.split('; ');
    for (const p of parts) {
      if (p.startsWith(target)) return decodeURIComponent(p.slice(target.length));
    }
  } catch {}
  return null;
};

export const deleteCookie = (name: string) => {
  try {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {}
};

// Keys we keep mirrored between localStorage and cookies.
// Keep this list small — cookies are sent on every request and capped at ~4KB.
const MIRRORED_KEYS = [
  // account & identity
  'spaceAccount',
  'dailyChallenge_syncId',
  // streaks & daily challenges
  'spaceStreak',
  'dailyChallenge_day',
  'dailyChallenge_goals',
  'dailyChallenge_goals_v2',
  'dailyChallenge_history',
  // progress
  'completedCourses',
  'completedBooks',
  'courseProgress',
  'visitedSections',
  'spaceAchievements',
  // economy
  'spaceCoins',
  'spaceTotalEarned',
  'spaceExtraLives',
  'spaceGamePasses',
  'purchasedShopItems',
  'spaceSubscription',
  // preferences
  'theme',
  'spaceMelody',
];

// One-shot: pull cookies into localStorage on app start if localStorage is missing them.
export const hydrateFromCookies = () => {
  if (typeof window === 'undefined') return;
  MIRRORED_KEYS.forEach((k) => {
    if (!localStorage.getItem(k)) {
      const v = getCookie(k);
      if (v) {
        try {
          localStorage.setItem(k, v);
        } catch {}
      }
    }
  });
};

// Mirror writes to a key into the cookie jar too.
export const mirrorToCookie = (key: string, value: string | null) => {
  if (!MIRRORED_KEYS.includes(key)) return;
  if (value === null) deleteCookie(key);
  else if (value.length < 3500) setCookie(key, value);
};

// Patch localStorage so any setItem/removeItem on mirrored keys also updates the cookie.
let patched = false;
export const installLocalStorageCookieMirror = () => {
  if (patched || typeof window === 'undefined') return;
  patched = true;
  const ls = window.localStorage;
  const origSet = ls.setItem.bind(ls);
  const origRemove = ls.removeItem.bind(ls);
  ls.setItem = (k: string, v: string) => {
    origSet(k, v);
    mirrorToCookie(k, v);
  };
  ls.removeItem = (k: string) => {
    origRemove(k);
    mirrorToCookie(k, null);
  };
  // Also push current localStorage values into cookies so first install seeds them.
  MIRRORED_KEYS.forEach((k) => {
    const v = ls.getItem(k);
    if (v) mirrorToCookie(k, v);
  });
};
