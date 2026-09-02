import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Brain, Gamepad2, Coins, Flame, Compass, Lock, Star, NotebookPen,
  Sprout, Rocket, Telescope, Trophy, Sparkles, Ticket, ScrollText, Clock,
  Stars as StarsIcon, Crown, Globe2, Award, Zap, Target, Search, Heart,
} from 'lucide-react';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useCoins } from '@/contexts/CoinsContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeTier { label: string; need: number }

interface BadgeDef {
  id: string;
  title: string;
  icon: typeof BookOpen;
  value: number;
  tiers: BadgeTier[];
  accent: string;
}

/** 6-tier ladder — every badge can keep climbing. */
const tiersFrom = (a: number, b: number, c: number, d: number, e: number, f: number): BadgeTier[] => [
  { label: 'Bronze', need: a },
  { label: 'Silver', need: b },
  { label: 'Gold', need: c },
  { label: 'Platinum', need: d },
  { label: 'Cosmic', need: e },
  { label: 'Infinity', need: f },
];

const TIERS = tiersFrom(1, 5, 15, 30, 60, 120);

const TIER_STYLE: Record<string, string> = {
  Bronze: 'from-amber-700 to-amber-500',
  Silver: 'from-slate-400 to-slate-200',
  Gold: 'from-yellow-500 to-amber-300',
  Platinum: 'from-cyan-300 to-sky-500',
  Cosmic: 'from-fuchsia-500 to-violet-500',
  Infinity: 'from-emerald-400 via-cyan-400 to-fuchsia-500',
};

const TIER_XP: Record<string, number> = {
  Bronze: 10, Silver: 25, Gold: 60, Platinum: 140, Cosmic: 320, Infinity: 800,
};

const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

const readJSON = (key: string): unknown => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};

const readLen = (key: string): number => {
  const raw = readJSON(key);
  if (Array.isArray(raw)) return raw.length;
  if (raw && typeof raw === 'object') return Object.keys(raw as object).length;
  return 0;
};

interface LocalStats {
  streak: number;
  bestStreak: number;
  visited: number;
  notes: number;
  favorites: number;
  pets: number;
  missions: number;
  packs: number;
  battles: number;
  passes: number;
  shopItems: number;
  searches: number;
  plans: number;
}

const readStats = (): LocalStats => {
  const streakRaw = readJSON('spaceStreak') as { current?: number; best?: number } | null;
  return {
    streak: num(streakRaw?.current),
    bestStreak: num(streakRaw?.best) || num(streakRaw?.current),
    visited: readLen('visitedSections'),
    notes: readLen('studyNotes'),
    favorites: readLen('stellar_favorites'),
    pets: readLen('alienPetCollection'),
    missions: readLen('dailyChallenge_history'),
    packs: readLen('alienPackHistory'),
    battles: readLen('alienBattleHistory'),
    passes: readLen('activeGamePasses'),
    shopItems: readLen('purchasedShopItems'),
    searches: readLen('qnaHistory'),
    plans: readLen('studyPlans'),
  };
};

const sameStats = (a: LocalStats, b: LocalStats) =>
  (Object.keys(a) as (keyof LocalStats)[]).every((k) => a[k] === b[k]);

const ProgressBadges = () => {
  const { achievements } = useAchievements();
  const { coins } = useCoins();
  const [stats, setStats] = useState<LocalStats>(readStats);
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [flash, setFlash] = useState<string | null>(null);
  const seenTiers = useRef<Record<string, string> | null>(null);

  /** Near-instant refresh: local writes, cross-tab writes, focus, and a fast poll. */
  const refresh = useCallback(() => {
    setStats((prev) => {
      const next = readStats();
      return sameStats(prev, next) ? prev : next;
    });
  }, []);

  useEffect(() => {
    refresh();
    const events = [
      'storage', 'focus', 'favorites-changed', 'notes-changed',
      'coins-changed', 'achievement-earned', 'challenge-completed', 'pets-changed',
    ];
    events.forEach((e) => window.addEventListener(e, refresh));
    document.addEventListener('visibilitychange', refresh);
    const t = window.setInterval(refresh, 800);
    return () => {
      events.forEach((e) => window.removeEventListener(e, refresh));
      document.removeEventListener('visibilitychange', refresh);
      window.clearInterval(t);
    };
  }, [refresh]);

  const badges: BadgeDef[] = useMemo(() => {
    const count = (type: string | string[]) => {
      const types = Array.isArray(type) ? type : [type];
      return achievements.filter((a) => types.includes(a.type)).length;
    };
    return [
      { id: 'courses', title: 'Courses Completed', icon: BookOpen, value: count('course'), tiers: TIERS, accent: 'text-primary' },
      { id: 'quizzes', title: 'Quizzes Aced', icon: Brain, value: count('quiz'), tiers: TIERS, accent: 'text-accent' },
      { id: 'games', title: 'Games Played', icon: Gamepad2, value: count('game'), tiers: TIERS, accent: 'text-star' },
      { id: 'library', title: 'Books & Audiobooks', icon: BookOpen, value: count(['book', 'audiobook']), tiers: TIERS, accent: 'text-primary' },
      { id: 'videos', title: 'Videos Watched', icon: Globe2, value: count(['video']), tiers: TIERS, accent: 'text-sky-400' },
      { id: 'coins', title: 'Coins Collected', icon: Coins, value: coins, tiers: tiersFrom(50, 250, 1000, 5000, 20000, 100000), accent: 'text-star' },
      { id: 'streak', title: 'Daily Streak', icon: Flame, value: stats.streak, tiers: tiersFrom(2, 7, 21, 45, 90, 200), accent: 'text-orange-400' },
      { id: 'best-streak', title: 'Best Streak Ever', icon: Zap, value: stats.bestStreak, tiers: tiersFrom(3, 10, 30, 60, 120, 250), accent: 'text-amber-400' },
      { id: 'explorer', title: 'Sections Explored', icon: Compass, value: stats.visited, tiers: tiersFrom(3, 8, 15, 22, 28, 34), accent: 'text-primary' },
      { id: 'notes', title: 'Study Notes Saved', icon: NotebookPen, value: stats.notes, tiers: TIERS, accent: 'text-accent' },
      { id: 'favorites', title: 'Favorites Saved', icon: Star, value: stats.favorites, tiers: tiersFrom(1, 5, 12, 25, 50, 100), accent: 'text-star' },
      { id: 'pets', title: 'Alien Pets Collected', icon: Sprout, value: stats.pets, tiers: tiersFrom(1, 10, 50, 150, 300, 500), accent: 'text-emerald-400' },
      { id: 'packs', title: 'Packs Opened', icon: Ticket, value: stats.packs, tiers: tiersFrom(1, 5, 20, 50, 120, 300), accent: 'text-cyan-400' },
      { id: 'battles', title: 'Arena Battles', icon: Crown, value: stats.battles, tiers: tiersFrom(1, 5, 20, 50, 120, 300), accent: 'text-fuchsia-400' },
      { id: 'missions', title: 'Daily Missions Done', icon: Rocket, value: stats.missions, tiers: tiersFrom(1, 7, 20, 50, 120, 365), accent: 'text-primary' },
      { id: 'searches', title: 'Doubts Solved', icon: Search, value: stats.searches, tiers: TIERS, accent: 'text-violet-400' },
      { id: 'plans', title: 'Study Plans Made', icon: Target, value: stats.plans, tiers: tiersFrom(1, 3, 8, 15, 30, 60), accent: 'text-green-400' },
      { id: 'passes', title: 'Game Passes Used', icon: Ticket, value: stats.passes, tiers: tiersFrom(1, 3, 6, 10, 20, 40), accent: 'text-teal-400' },
      { id: 'shop', title: 'Shop Unlocks', icon: Sparkles, value: stats.shopItems, tiers: tiersFrom(1, 5, 12, 25, 50, 100), accent: 'text-pink-400' },
      { id: 'manuscripts', title: 'Manuscripts Read', icon: ScrollText, value: count(['manuscript']), tiers: TIERS, accent: 'text-amber-500' },
      { id: 'timeline', title: 'Timeline Events', icon: Clock, value: count(['timeline']), tiers: TIERS, accent: 'text-rose-400' },
      { id: 'constellations', title: 'Constellations Found', icon: StarsIcon, value: count(['constellation']), tiers: TIERS, accent: 'text-indigo-400' },
      { id: 'discoveries', title: 'Celestial Discoveries', icon: Telescope, value: count(['celestial', 'discovery']), tiers: TIERS, accent: 'text-cyan-400' },
      { id: 'certificates', title: 'Certificates Earned', icon: Award, value: count(['certificate']), tiers: tiersFrom(1, 3, 8, 15, 30, 60), accent: 'text-yellow-400' },
      { id: 'loyalty', title: 'Loyal Explorer', icon: Heart, value: stats.visited + stats.missions, tiers: tiersFrom(5, 20, 60, 150, 350, 800), accent: 'text-red-400' },
      { id: 'trophies', title: 'Total Trophies', icon: Trophy, value: achievements.length, tiers: tiersFrom(3, 12, 30, 60, 120, 250), accent: 'text-star' },
    ];
  }, [achievements, coins, stats]);

  const computed = useMemo(
    () =>
      badges.map((b) => {
        const earnedTier = [...b.tiers].reverse().find((t) => b.value >= t.need);
        const nextTier = b.tiers.find((t) => b.value < t.need);
        const prevNeed = earnedTier ? earnedTier.need : 0;
        const pct = nextTier
          ? Math.min(100, Math.max(0, Math.round(((b.value - prevNeed) / (nextTier.need - prevNeed)) * 100)))
          : 100;
        return { ...b, earnedTier, nextTier, pct };
      }),
    [badges],
  );

  const totals = useMemo(() => {
    const earned = computed.filter((b) => b.earnedTier).length;
    const xp = computed.reduce((sum, b) => {
      if (!b.earnedTier) return sum;
      const idx = b.tiers.findIndex((t) => t.label === b.earnedTier!.label);
      return sum + b.tiers.slice(0, idx + 1).reduce((s, t) => s + (TIER_XP[t.label] ?? 0), 0);
    }, 0);
    const level = Math.max(1, Math.floor(Math.sqrt(xp / 40)) + 1);
    const xpForNext = Math.pow(level, 2) * 40;
    const xpForCurrent = Math.pow(level - 1, 2) * 40;
    const levelPct = Math.min(100, Math.round(((xp - xpForCurrent) / Math.max(1, xpForNext - xpForCurrent)) * 100));
    return { earned, total: computed.length, xp, level, levelPct, xpForNext };
  }, [computed]);

  /** Celebrate the moment a new tier lands. */
  useEffect(() => {
    const snapshot: Record<string, string> = {};
    computed.forEach((b) => { snapshot[b.id] = b.earnedTier?.label ?? ''; });
    if (seenTiers.current === null) { seenTiers.current = snapshot; return; }
    const changed = computed.find(
      (b) => (b.earnedTier?.label ?? '') !== (seenTiers.current?.[b.id] ?? '') && b.earnedTier,
    );
    seenTiers.current = snapshot;
    if (changed) {
      setFlash(`${changed.earnedTier!.label} unlocked — ${changed.title}!`);
      const t = window.setTimeout(() => setFlash(null), 3500);
      return () => window.clearTimeout(t);
    }
  }, [computed]);

  const visible = computed.filter((b) =>
    filter === 'all' ? true : filter === 'earned' ? !!b.earnedTier : !b.earnedTier,
  );

  return (
    <section id="progress-badges" className="scroll-mt-28 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-star">
            Progress Badges
          </h2>
          <p className="text-muted-foreground mt-2">
            Six tiers per badge — Bronze, Silver, Gold, Platinum, Cosmic and Infinity
          </p>
        </div>

        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-foreground">Explorer Level {totals.level}</p>
              <p className="text-xs text-muted-foreground">
                {totals.xp} XP • {totals.earned}/{totals.total} badges unlocked
              </p>
            </div>
            <div className="flex gap-1.5">
              {(['all', 'earned', 'locked'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs capitalize border transition-colors ${
                    filter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="h-2 mt-3 w-full rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-star"
              animate={{ width: `${totals.levelPct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 text-center text-sm font-semibold text-star"
            >
              ✨ {flash}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {visible.map((badge, i) => {
            const Icon = badge.icon;
            const locked = !badge.earnedTier;
            return (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.03, 0.4) }}
                    className={`rounded-2xl border p-4 text-center backdrop-blur transition-colors ${
                      locked ? 'border-border bg-card/40 opacity-70' : 'border-primary/30 bg-primary/5'
                    }`}
                  >
                    <div className="relative inline-flex items-center justify-center mb-2">
                      {!locked && (
                        <span
                          className={`absolute -inset-2 rounded-full bg-gradient-to-br opacity-25 blur-md ${
                            TIER_STYLE[badge.earnedTier!.label]
                          }`}
                        />
                      )}
                      <Icon className={`relative w-7 h-7 ${locked ? 'text-muted-foreground' : badge.accent}`} />
                      {locked && <Lock className="w-3 h-3 text-muted-foreground absolute -bottom-1 -right-2" />}
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{badge.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {badge.earnedTier ? badge.earnedTier.label : 'Locked'} • {badge.value}
                    </p>
                    <div className="h-1.5 mt-3 w-full rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          badge.earnedTier ? TIER_STYLE[badge.earnedTier.label] : 'from-primary to-accent'
                        }`}
                        animate={{ width: `${badge.pct}%` }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {badge.nextTier
                        ? `${badge.value}/${badge.nextTier.need} to ${badge.nextTier.label}`
                        : 'Infinity tier reached ✨'}
                    </p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  {badge.nextTier
                    ? `${badge.nextTier.need - badge.value} more to unlock ${badge.nextTier.label}`
                    : `${badge.title}: Infinity badge earned!`}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgressBadges;
