export interface FavoriteItem {
  id: string;
  kind: 'course' | 'video' | 'book' | 'audiobook' | 'topic' | 'celestial' | 'game';
  title: string;
  meta?: string;
  url?: string;
  addedAt?: number;
}

const KEY = 'stellar_favorites';

export const getFavorites = (): FavoriteItem[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

const save = (items: FavoriteItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('favorites-changed'));
};

export const isFavorite = (id: string): boolean => getFavorites().some(f => f.id === id);

export const toggleFavorite = (item: FavoriteItem): boolean => {
  const items = getFavorites();
  const exists = items.some(f => f.id === item.id);
  save(exists ? items.filter(f => f.id !== item.id) : [{ ...item, addedAt: Date.now() }, ...items]);
  return !exists;
};

export const removeFavorite = (id: string) => save(getFavorites().filter(f => f.id !== id));
