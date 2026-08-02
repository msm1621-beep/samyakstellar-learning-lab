import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Gamepad2, Coins, Flame, Compass, Lock } from 'lucide-react';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useCoins } from '@/contexts/CoinsContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

interface BadgeTier {
  label: string;
  need: number;
}

interface BadgeDef {
  id: string;
  title: string;
  icon: typeof BookOpen;
  value: number;
  tiers: BadgeTier[];
  accent: string;
}

const TIERS: BadgeTier[] = [
  { label: 'Bronze', need: 1 },
  { label: 'Silver', need: 5 },
  { label: 'Gold', need: 15 },
  { label: 'Cosmic', need: 30 },
];

const readStreak = (): number => {
  try {
    return JSON.parse(localStorage.getItem('spaceStreak') || '{}')?.current ?? 0;
  } catch {
    return 0;
  }
};

const readVisited = (): number => {
  try {
    const raw = JSON.parse(localStorage.getItem('visitedSections') || '[]');
    return Array.isArray(raw) ? raw.length : 0;
  } catch {
    return 0;
  }
};

const ProgressBadges = () => {
  const { achievements } = useAchievements();
  const { coins } = useCoins();
  const [streak, setStreak] = useState(readStreak);
  const [visited, setVisited] = useState(readVisited);

  useEffect(() => {
    const t = setInterval(() => {
      setStreak(readStreak());
      setVisited(readVisited());
    }, 4000);
    return () => clearInterval(t);
  }, []);

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
      {
        id: 'coins',
        title: 'Coins Collected',
        icon: Coins,
        value: coins,
        tiers: [
          { label: 'Bronze', need: 50 },
          { label: 'Silver', need: 250 },
          { label: 'Gold', need: 1000 },
          { label: 'Cosmic', need: 5000 },
        ],
        accent: 'text-star',
      },
      {
        id: 'streak',
        title: 'Daily Streak',
        icon: Flame,
        value: streak,
        tiers: [
          { label: 'Bronze', need: 2 },
          { label: 'Silver', need: 7 },
          { label: 'Gold', need: 21 },
          { label: 'Cosmic', need: 60 },
        ],
        accent: 'text-accent',
      },
      {
        id: 'explorer',
        title: 'Sections Explored',
        icon: Compass,
        value: visited,
        tiers: [
          { label: 'Bronze', need: 3 },
          { label: 'Silver', need: 8 },
          { label: 'Gold', need: 15 },
          { label: 'Cosmic', need: 25 },
        ],
        accent: 'text-primary',
      },
    ];
  }, [achievements, coins, streak, visited]);

  return (
    <section id="progress-badges" className="scroll-mt-28 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-star">
            Progress Badges
          </h2>
          <p className="text-muted-foreground mt-2">Earn Bronze, Silver, Gold and Cosmic badges as you explore</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((badge, i) => {
            const earnedTier = [...badge.tiers].reverse().find((t) => badge.value >= t.need);
            const nextTier = badge.tiers.find((t) => badge.value < t.need);
            const pct = nextTier
              ? Math.min(100, Math.round((badge.value / nextTier.need) * 100))
              : 100;
            const Icon = badge.icon;
            const locked = !earnedTier;

            return (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={`rounded-2xl border p-4 text-center backdrop-blur transition-colors ${
                      locked ? 'border-border bg-card/40 opacity-70' : 'border-primary/30 bg-primary/5'
                    }`}
                  >
                    <div className="relative inline-flex items-center justify-center mb-2">
                      <Icon className={`w-7 h-7 ${locked ? 'text-muted-foreground' : badge.accent}`} />
                      {locked && (
                        <Lock className="w-3 h-3 text-muted-foreground absolute -bottom-1 -right-2" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{badge.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {earnedTier ? earnedTier.label : 'Locked'} • {badge.value}
                    </p>
                    <Progress value={pct} className="h-1.5 mt-3" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {nextTier ? `${badge.value}/${nextTier.need} to ${nextTier.label}` : 'Max tier reached ✨'}
                    </p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  {nextTier
                    ? `${nextTier.need - badge.value} more to unlock ${nextTier.label}`
                    : `${badge.title}: Cosmic badge earned!`}
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
