// Live space news for Stellar Learning Lab.
// Source: Spaceflight News API (free, no key). Cached locally so the app
// always shows the latest headlines without hammering the network.

import { addInboxItem, getNotifSettings, showNotification } from './notifications';

export interface SpaceNewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  source: string;
  publishedAt: string;
}

interface NewsCache {
  items: SpaceNewsItem[];
  fetchedAt: number;
}

const CACHE_KEY = 'stellar_space_news';
const SEEN_KEY = 'stellar_space_news_seen';
const TTL = 3 * 60 * 60 * 1000; // refresh every 3 hours
const API = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=15&ordering=-published_at';
export const NEWS_EVENT = 'space-news-changed';

export const readCache = (): NewsCache | null => {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (raw && Array.isArray(raw.items)) return raw as NewsCache;
  } catch {}
  return null;
};

const writeCache = (cache: NewsCache) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
  window.dispatchEvent(new CustomEvent(NEWS_EVENT));
};

const readSeen = (): string[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
    return Array.isArray(raw) ? (raw as string[]) : [];
  } catch {
    return [];
  }
};

const writeSeen = (ids: string[]) => {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids.slice(-400)));
  } catch {}
};

export const isStale = (): boolean => {
  const cache = readCache();
  return !cache || Date.now() - cache.fetchedAt > TTL;
};

const strip = (s: string) => (s || '').replace(/\s+/g, ' ').trim();

const mapArticle = (a: any): SpaceNewsItem => ({
  id: String(a.id),
  title: strip(a.title),
  summary: strip(a.summary).slice(0, 320),
  url: a.url,
  image: a.image_url || '',
  source: a.news_site || 'Space',
  publishedAt: a.published_at,
});

// Announce freshly fetched headlines in the inbox + as system notifications
// when the "Latest space news" alert type is enabled.
const announceNew = (items: SpaceNewsItem[]) => {
  const s = getNotifSettings();
  if (!s.enabled || !s.news) return;
  const seen = readSeen();
  const firstRun = seen.length === 0;
  const fresh = items.filter((i) => !seen.includes(i.id));
  // First ever load seeds the seen list silently — no wall of old headlines.
  if (firstRun) return;
  const toAnnounce = fresh.slice(0, 3);
  if (!toAnnounce.length) return;
  for (const item of toAnnounce) {
    const body = item.summary.length > 140 ? `${item.summary.slice(0, 140)}…` : item.summary;
    addInboxItem(`🛰️ Space news — ${item.source}`, `${item.title}\n\n${body}`, false, 'news');
    void showNotification(`🛰️ Space news — ${item.source}`, `${item.title}\n\n${body}`, 'news');
  }
};

export const fetchSpaceNews = async (force = false): Promise<SpaceNewsItem[]> => {
  if (!force && !isStale()) {
    const cache = readCache();
    if (cache) return cache.items;
  }
  try {
    const res = await fetch(API, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Space news request failed (${res.status})`);
    const data = await res.json();
    const items: SpaceNewsItem[] = (data.results || []).map(mapArticle).filter((i: SpaceNewsItem) => i.title);
    if (!items.length) throw new Error('No headlines in response');
    announceNew(items);
    writeSeen([...readSeen(), ...items.map((i) => i.id)]);
    writeCache({ items, fetchedAt: Date.now() });
    return items;
  } catch {
    // Keep serving whatever cache we have; a failed refresh stays silent.
    const cache = readCache();
    return cache ? cache.items : [];
  }
};

// Background refresher: checks on app start, every 30 minutes while the app
// is open, and whenever the tab/app becomes visible again.
let refreshTimer: number | null = null;
let visibilityBound = false;

export const startNewsRefresh = () => {
  if (typeof window === 'undefined') return;
  if (refreshTimer === null) {
    void fetchSpaceNews();
    refreshTimer = window.setInterval(() => void fetchSpaceNews(), 30 * 60 * 1000);
  }
  if (!visibilityBound) {
    visibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && isStale()) void fetchSpaceNews();
    });
  }
};

export const timeAgoShort = (iso: string): string => {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const h = Math.floor(diff / 3600000);
  if (h < 1) return `${Math.max(1, Math.floor(diff / 60000))} min ago`;
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'yesterday' : `${d}d ago`;
};
