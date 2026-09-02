import { useEffect, useMemo, useState } from 'react';
import { Star, Trash2, Bell, BellRing, BarChart3, Flame, Coins, BookOpen, Trophy, Compass } from 'lucide-react';
import { getFavorites, removeFavorite, type FavoriteItem } from '@/lib/favorites';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useCoins } from '@/contexts/CoinsContext';
import { enableNotifications as requestNotifications, getNotifSettings, saveNotifSettings, showNotification } from '@/lib/notifications';


const NOTIF_KEY = 'stellar_notifications_enabled';

const readNum = (key: string, path?: (v: unknown) => number): number => {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    if (raw == null) return 0;
    return path ? path(raw) : Number(raw) || 0;
  } catch {
    return 0;
  }
};

const FavoritesDashboard = () => {
  const { achievements } = useAchievements();
  const { coins } = useCoins();
  const [favs, setFavs] = useState<FavoriteItem[]>(getFavorites);
  const [notifOn, setNotifOn] = useState(() => getNotifSettings().enabled);
  const [notifMsg, setNotifMsg] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setFavs(getFavorites());
    window.addEventListener('favorites-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('favorites-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const stats = useMemo(() => {
    const count = (types: string[]) => achievements.filter(a => types.includes(a.type)).length;
    return {
      courses: count(['course']),
      quizzes: count(['quiz']),
      games: count(['game']),
      library: count(['book', 'audiobook']),
      streak: readNum('spaceStreak', (v) => (v as { current?: number })?.current ?? 0),
      sections: readNum('visitedSections', (v) => (Array.isArray(v) ? v.length : 0)),
    };
  }, [achievements, favs]);

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      setNotifMsg('This device does not support notifications.');
      return;
    }
    if (notifOn) {
      setNotifOn(false);
      saveNotifSettings({ ...getNotifSettings(), enabled: false });
      setNotifMsg('Daily reminders turned off.');
      return;
    }
    const result = await requestNotifications();
    if (result.ok) {
      setNotifOn(true);
      saveNotifSettings({ ...getNotifSettings(), enabled: true });
      setNotifMsg('Reminders on — we will nudge you to keep your streak alive.');
      await showNotification('Stellar Learning Lab', 'Notifications enabled! Aaj ka mission complete karna mat bhoolna 🚀');
    } else {
      setNotifMsg(result.reason || 'Permission denied. Enable notifications in your browser settings.');
    }
  };

  const cards = [
    { label: 'Courses done', value: stats.courses, icon: BookOpen, color: 'text-primary' },
    { label: 'Quizzes aced', value: stats.quizzes, icon: Trophy, color: 'text-accent' },
    { label: 'Library items', value: stats.library, icon: BarChart3, color: 'text-emerald-400' },
    { label: 'Day streak', value: stats.streak, icon: Flame, color: 'text-orange-400' },
    { label: 'Coins', value: coins, icon: Coins, color: 'text-star' },
    { label: 'Sections explored', value: stats.sections, icon: Compass, color: 'text-cyan-400' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section>
        <h3 className="text-xl font-display font-bold text-foreground mb-3">Your progress dashboard</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cards.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-4">
                <Icon className={`w-5 h-5 mb-2 ${c.color}`} />
                <p className="text-2xl font-bold text-foreground">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {notifOn ? <BellRing className="w-5 h-5 text-emerald-400" /> : <Bell className="w-5 h-5 text-muted-foreground" />}
            <div>
              <p className="text-sm font-semibold text-foreground">Daily learning reminders</p>
              <p className="text-xs text-muted-foreground">Get a nudge for missions, streaks and new lectures.</p>
            </div>
          </div>
          <button
            onClick={enableNotifications}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              notifOn ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200' : 'border-primary/40 bg-primary/10 text-primary'
            }`}
          >
            {notifOn ? 'Turn off' : 'Enable notifications'}
          </button>
        </div>
        {notifMsg && <p className="text-xs text-muted-foreground mt-3">{notifMsg}</p>}
      </section>

      <section>
        <h3 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-300" /> Favorites ({favs.length})
        </h3>
        {favs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing saved yet. Tap the star on any course, video, book or audiobook to keep it here.
          </p>
        ) : (
          <div className="space-y-2">
            {favs.map(f => (
              <div key={f.id} className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 p-3">
                <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-primary/15 text-primary">{f.kind}</span>
                <div className="min-w-0 flex-1">
                  {f.url ? (
                    <a href={f.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground hover:text-primary truncate block">{f.title}</a>
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{f.title}</p>
                  )}
                  {f.meta && <p className="text-xs text-muted-foreground truncate">{f.meta}</p>}
                </div>
                <button onClick={() => removeFavorite(f.id)} aria-label={`Remove ${f.title}`} className="p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavoritesDashboard;
