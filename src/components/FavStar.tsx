import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { isFavorite, toggleFavorite, type FavoriteItem } from '@/lib/favorites';

interface FavStarProps {
  item: FavoriteItem;
  className?: string;
}

/** Reusable star toggle for saving any study material to Favorites. */
const FavStar = ({ item, className = '' }: FavStarProps) => {
  const [on, setOn] = useState(() => isFavorite(item.id));

  useEffect(() => {
    const sync = () => setOn(isFavorite(item.id));
    window.addEventListener('favorites-changed', sync);
    return () => window.removeEventListener('favorites-changed', sync);
  }, [item.id]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setOn(toggleFavorite(item));
      }}
      aria-label={on ? `Remove ${item.title} from favorites` : `Save ${item.title} to favorites`}
      title={on ? 'Saved to favorites' : 'Save to favorites'}
      className={`p-2 rounded-full bg-background/70 backdrop-blur border border-border/50 hover:bg-background transition-colors ${className}`}
    >
      <Star className={`w-4 h-4 ${on ? 'fill-amber-300 text-amber-300' : 'text-muted-foreground'}`} />
    </button>
  );
};

export default FavStar;
