import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, BookOpen, Brain, Gamepad2, Rocket, Trophy, Calendar, Sparkles, CalendarDays } from 'lucide-react';
import { useAchievements } from '@/contexts/AchievementsContext';
import { courses } from '@/data/courses';
import { celestialBodies } from '@/data/celestialBodies';

interface DayRecord {
  date: string;
  total: number;
  done: number;
}

const loadHistory = (): DayRecord[] => {
  try {
    return JSON.parse(localStorage.getItem('dailyChallenge_history') || '[]');
  } catch {
    return [];
  }
};

const STREAK_KEY = 'spaceStreak';
const todayKey = () => new Date().toISOString().slice(0, 10);
const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

interface StreakData {
  current: number;
  longest: number;
  lastDay: string;
}

const loadStreak = (): StreakData => {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current: 0, longest: 0, lastDay: '' };
};

export const useStreak = () => {
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  useEffect(() => {
    const today = todayKey();
    setStreak((prev) => {
      if (prev.lastDay === today) return prev;
      const next: StreakData = { ...prev };
      if (prev.lastDay === yesterdayKey()) next.current = prev.current + 1;
      else next.current = 1;
      next.longest = Math.max(prev.longest, next.current);
      next.lastDay = today;
      localStorage.setItem(STREAK_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return streak;
};

const CATEGORY_LABELS: Record<string, string> = {
  'solar-system': 'Solar System',
  stars: 'Stars',
  nebulas: 'Nebulas',
  galaxies: 'Galaxies',
  other: 'Deep Space',
};

const ProgressTracker = () => {
  const { achievements } = useAchievements();
  const streak = useStreak();
  const [history, setHistory] = useState<DayRecord[]>(() => loadHistory());

  // refresh history if other components updated localStorage
  useEffect(() => {
    const t = setInterval(() => setHistory(loadHistory()), 5000);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'dailyChallenge_history') setHistory(loadHistory());
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(t);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const courseAch = useMemo(() => achievements.filter((a) => a.type === 'course'), [achievements]);
  const quizAch = useMemo(() => achievements.filter((a) => a.type === 'quiz'), [achievements]);
  const gameAch = useMemo(() => achievements.filter((a) => a.type === 'game'), [achievements]);
  const bookAch = useMemo(
    () => achievements.filter((a) => a.type === 'book' || a.type === 'audiobook'),
    [achievements]
  );

  // Heatmap: last 12 weeks (84 days) of mission completion
  const heatmap = useMemo(() => {
    const byDate = new Map<string, DayRecord>();
    history.forEach((d) => byDate.set(d.date, d));
    const days: { date: string; level: 0 | 1 | 2 | 3 | 4; label: string }[] = [];
    const today = new Date();
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const rec = byDate.get(key);
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (rec && rec.total > 0) {
        const r = rec.done / rec.total;
        if (r >= 1) level = 4;
        else if (r >= 0.66) level = 3;
        else if (r >= 0.33) level = 2;
        else if (r > 0) level = 1;
      }
      days.push({
        date: key,
        level,
        label: rec ? `${rec.done}/${rec.total} on ${key}` : `No missions on ${key}`,
      });
    }
    return days;
  }, [history]);


  const totals = useMemo(() => {
    const byCat: Record<string, number> = {};
    celestialBodies.forEach((c: any) => {
      byCat[c.category] = (byCat[c.category] || 0) + 1;
    });
    return byCat;
  }, []);

  const exploredByCat = useMemo(() => {
    const byCat: Record<string, Set<string>> = {};
    achievements.forEach((a) => {
      if (a.category && a.type === 'course') {
        // not used
      }
    });
    // Use unique celestial-related course/quiz names mapped to category via name match (lightweight)
    return byCat;
  }, [achievements]);

  const totalCourses = courses.length;
  const completedCourses = courseAch.length;
  const courseRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  // overall mastery: weighted across activity types
  const totalCelestial = celestialBodies.length;
  const totalQuizzesGuess = Math.max(20, totalCourses * 2);
  const overall = Math.min(
    100,
    Math.round(
      ((completedCourses / Math.max(1, totalCourses)) * 40 +
        (Math.min(quizAch.length, totalQuizzesGuess) / totalQuizzesGuess) * 35 +
        (Math.min(bookAch.length, 10) / 10) * 15 +
        (Math.min(gameAch.length, 8) / 8) * 10)
    )
  );

  return (
    <section id="progress-tracker" className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Mission Control
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Cosmic Progress</h2>
          <p className="text-muted-foreground">
            Track your topic exploration, quiz mastery, and daily learning streak.
          </p>
        </div>

        {/* Streak + Overall */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">Current Streak</span>
            </div>
            <div className="text-4xl font-bold">{streak.current}</div>
            <div className="text-xs text-muted-foreground mt-1">
              days in a row • best {streak.longest}
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30">
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Overall Mastery</span>
            </div>
            <div className="text-4xl font-bold">{overall}%</div>
            <Progress value={overall} className="h-1.5 mt-2" />
          </Card>

          <Card className="p-5 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500">Total Achievements</span>
            </div>
            <div className="text-4xl font-bold">{achievements.length}</div>
            <div className="text-xs text-muted-foreground mt-1">trophies earned</div>
          </Card>
        </div>

        {/* Streak Heatmap */}
        <Card className="p-5 mb-6 bg-card/40 backdrop-blur border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Mission Streak — Last 12 Weeks</h3>
            <Badge variant="secondary" className="ml-auto">
              {heatmap.filter((d) => d.level > 0).length} active days
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <div
              className="grid grid-flow-col gap-1"
              style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
            >
              {heatmap.map((d) => {
                const colors = [
                  'bg-muted/30',
                  'bg-orange-500/25',
                  'bg-orange-500/50',
                  'bg-orange-500/75',
                  'bg-orange-500',
                ];
                return (
                  <div
                    key={d.date}
                    title={d.label}
                    className={`w-3.5 h-3.5 rounded-sm ${colors[d.level]} border border-border/30`}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-3 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-muted/30 border border-border/30" />
            <div className="w-3 h-3 rounded-sm bg-orange-500/25" />
            <div className="w-3 h-3 rounded-sm bg-orange-500/50" />
            <div className="w-3 h-3 rounded-sm bg-orange-500/75" />
            <div className="w-3 h-3 rounded-sm bg-orange-500" />
            <span>More</span>
          </div>
        </Card>



        {/* Topic categories */}
        <Card className="p-5 mb-6 bg-card/40 backdrop-blur border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Space Topics</h3>
            <Badge variant="secondary" className="ml-auto">
              {totalCelestial} celestial bodies
            </Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(totals).map(([cat, total]) => {
              const label = CATEGORY_LABELS[cat] || cat;
              // Bind progress to achievements roughly: scale courses/quizzes per category share
              const share = (total as number) / totalCelestial;
              const explored = Math.min(
                total as number,
                Math.round((completedCourses + quizAch.length) * share)
              );
              const pct = Math.round((explored / (total as number)) * 100);
              return (
                <div key={cat} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground">
                      {explored}/{total as number}
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Courses & Quizzes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="p-5 bg-card/40 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Courses Completed</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold">{completedCourses}</span>
              <span className="text-muted-foreground">/ {totalCourses}</span>
            </div>
            <Progress value={courseRate} className="h-2 mb-3" />
            {courseAch.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Complete a course to see it listed here.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {courseAch.slice(0, 6).map((a) => (
                  <Badge key={a.id} variant="outline" className="text-xs">
                    {a.icon} {a.name}
                  </Badge>
                ))}
                {courseAch.length > 6 && (
                  <Badge variant="secondary" className="text-xs">+{courseAch.length - 6}</Badge>
                )}
              </div>
            )}
          </Card>

          <Card className="p-5 bg-card/40 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Quizzes Finished</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold">{quizAch.length}</span>
              <span className="text-muted-foreground">passed</span>
            </div>
            {quizAch.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Pass a course quiz or play a trivia game to track scores here.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quizAch.slice(-6).reverse().map((a) => (
                  <Badge key={a.id} variant="outline" className="text-xs">
                    {a.icon} {a.name}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Games + Books mini stats */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-4 bg-card/40 backdrop-blur border-primary/20 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-2xl font-bold">{gameAch.length}</div>
              <div className="text-xs text-muted-foreground">games played</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/40 backdrop-blur border-primary/20 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-2xl font-bold">{bookAch.length}</div>
              <div className="text-xs text-muted-foreground">books & audiobooks finished</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;
