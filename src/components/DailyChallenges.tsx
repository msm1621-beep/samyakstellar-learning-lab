import { useEffect, useMemo, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Sparkles, Target, Trash2, RefreshCw, Trophy, Flame, TrendingUp, Lightbulb, Save, Cloud, Loader2 } from 'lucide-react';
import { useCoins } from '@/contexts/CoinsContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SYNC_ID_KEY = 'dailyChallenge_syncId';
const getSyncId = (): string => {
  try {
    const acc = localStorage.getItem('spaceAccount');
    if (acc) {
      const parsed = JSON.parse(acc);
      if (parsed?.id) return parsed.id as string;
    }
  } catch {}
  let id = localStorage.getItem(SYNC_ID_KEY);
  if (!id) {
    id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SYNC_ID_KEY, id);
  }
  return id;
};

interface Goal {
  id: string;
  text: string;
  createdAt: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  goalId: string;
  done: boolean;
}

// History: per-day record of completions per goal
interface DayRecord {
  date: string; // YYYY-MM-DD
  total: number;
  done: number;
  perGoal: Record<string, { total: number; done: number }>;
}

const CHALLENGE_TEMPLATES = [
  { t: 'Watch a video about {goal}', d: 'Head to the Celestial Library and watch one video related to your goal.', r: 30 },
  { t: 'Read 1 chapter on {goal}', d: 'Open a book in the Library and read at least one chapter today.', r: 40 },
  { t: 'Ask Cosmo 3 questions about {goal}', d: 'Use the Cosmo assistant to deepen your understanding.', r: 25 },
  { t: 'Explore 2 celestial bodies tied to {goal}', d: 'Use the Celestial Explorer to view 2 cards related to {goal}.', r: 35 },
  { t: 'Complete a quiz on {goal}', d: 'Take any quiz in Games or Courses related to {goal}.', r: 50 },
  { t: 'Listen to an audiobook about {goal}', d: 'Play at least 5 minutes of an audiobook in the Library.', r: 30 },
  { t: 'Earn a study note on {goal}', d: 'Open the Study Planner and generate notes for {goal}.', r: 45 },
];

const STORAGE_KEYS = {
  goals: 'dailyChallenge_goals_v2',
  day: 'dailyChallenge_day',
  done: 'dailyChallenge_done',
  history: 'dailyChallenge_history',
} as const;

const todayKey = () => new Date().toISOString().slice(0, 10);

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
};

const generateChallenges = (goals: Goal[]): Challenge[] => {
  if (goals.length === 0) return [];
  const seed = todayKey();
  const out: Challenge[] = [];
  goals.forEach((g) => {
    [0, 1].forEach((i) => {
      const idx = Math.abs(hash(seed + g.id + i)) % CHALLENGE_TEMPLATES.length;
      const p = CHALLENGE_TEMPLATES[idx];
      out.push({
        id: `${g.id}-${i}-${seed}`,
        title: p.t.split('{goal}').join(g.text),
        description: p.d.split('{goal}').join(g.text),
        reward: p.r,
        goalId: g.id,
        done: false,
      });
    });
  });
  return out;
};

// migrate old goal storage shape
const loadGoals = (): Goal[] => {
  const v2 = localStorage.getItem(STORAGE_KEYS.goals);
  if (v2) {
    try { return JSON.parse(v2); } catch { return []; }
  }
  const old = localStorage.getItem('dailyChallenge_goals');
  if (old) {
    try {
      const parsed = JSON.parse(old) as Array<{ id: string; text: string }>;
      const upgraded = parsed.map((g) => ({ ...g, createdAt: Date.now() }));
      localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(upgraded));
      return upgraded;
    } catch { return []; }
  }
  return [];
};

const loadHistory = (): DayRecord[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]'); } catch { return []; }
};

const DailyChallenges = () => {
  const { addCoins } = useCoins();
  const [syncId] = useState<string>(() => getSyncId());
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [adding, setAdding] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [askingFirst, setAskingFirst] = useState(false);
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const hydratedRef = useRef(false);
  const remoteLoadedRef = useRef(false);

  // Initial local load + daily rollover (always runs)
  useEffect(() => {
    const g = loadGoals();
    setGoals(g);
    if (g.length === 0) setAskingFirst(true);

    const day = localStorage.getItem(STORAGE_KEYS.day);
    const done = localStorage.getItem(STORAGE_KEYS.done);
    if (day === todayKey() && done) {
      try { setCompleted(JSON.parse(done)); } catch {}
    } else {
      if (day && done) {
        try {
          const prevDone: Record<string, boolean> = JSON.parse(done);
          const prevChallenges = generateChallenges(g);
          if (prevChallenges.length > 0 && day !== todayKey()) {
            const perGoal: Record<string, { total: number; done: number }> = {};
            prevChallenges.forEach((c) => {
              if (!perGoal[c.goalId]) perGoal[c.goalId] = { total: 0, done: 0 };
              perGoal[c.goalId].total += 1;
              if (prevDone[c.id]) perGoal[c.goalId].done += 1;
            });
            const rec: DayRecord = {
              date: day,
              total: prevChallenges.length,
              done: Object.values(prevDone).filter(Boolean).length,
              perGoal,
            };
            const hist = loadHistory().filter((h) => h.date !== day);
            hist.push(rec);
            hist.sort((a, b) => a.date.localeCompare(b.date));
            const trimmed = hist.slice(-60);
            localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(trimmed));
          }
        } catch {}
      }
      localStorage.setItem(STORAGE_KEYS.day, todayKey());
      localStorage.setItem(STORAGE_KEYS.done, '{}');
      setCompleted({});
    }
    setHistory(loadHistory());
    hydratedRef.current = true;
  }, []);

  // Cloud sync: when user signs in, pull remote and merge with local
  useEffect(() => {
    if (!user) {
      remoteLoadedRef.current = false;
      return;
    }
    let cancelled = false;
    (async () => {
      setSyncing(true);
      const { data, error } = await supabase
        .from('user_challenge_data')
        .select('goals, history, completed, last_day')
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setSyncing(false);
        toast({ title: 'Sync error', description: error.message, variant: 'destructive' });
        return;
      }
      if (data) {
        // Merge strategy: union goals by id+text; merge history by date (prefer higher done count); completed only if same day
        const remoteGoals: Goal[] = Array.isArray(data.goals) ? (data.goals as any) : [];
        const remoteHistory: DayRecord[] = Array.isArray(data.history) ? (data.history as any) : [];
        const remoteCompleted: Record<string, boolean> = (data.completed as any) || {};

        setGoals((local) => {
          const byKey = new Map<string, Goal>();
          [...remoteGoals, ...local].forEach((g) => {
            const k = g.text.trim().toLowerCase();
            if (!byKey.has(k)) byKey.set(k, g);
          });
          const merged = Array.from(byKey.values());
          if (merged.length > 0) setAskingFirst(false);
          return merged;
        });

        setHistory((local) => {
          const byDate = new Map<string, DayRecord>();
          [...local, ...remoteHistory].forEach((d) => {
            const existing = byDate.get(d.date);
            if (!existing || d.done > existing.done) byDate.set(d.date, d);
          });
          const merged = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date)).slice(-60);
          localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(merged));
          return merged;
        });

        if (data.last_day === todayKey()) {
          setCompleted((local) => ({ ...remoteCompleted, ...local }));
        }
      }
      remoteLoadedRef.current = true;
      setLastSyncedAt(Date.now());
      setSyncing(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  // Persist locally
  useEffect(() => {
    if (!hydratedRef.current) return;
    localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(completed));
  }, [completed]);

  // Push to cloud (debounced) when signed in
  useEffect(() => {
    if (!user || !hydratedRef.current || !remoteLoadedRef.current) return;
    const t = setTimeout(async () => {
      setSyncing(true);
      const { error } = await supabase.from('user_challenge_data').upsert({
        user_id: user.id,
        goals: goals as any,
        history: history as any,
        completed: completed as any,
        last_day: todayKey(),
        updated_at: new Date().toISOString(),
      });
      setSyncing(false);
      if (!error) setLastSyncedAt(Date.now());
    }, 800);
    return () => clearTimeout(t);
  }, [user, goals, history, completed]);


  const challenges = useMemo(() => generateChallenges(goals), [goals]);

  const addGoal = () => {
    const text = newGoal.trim();
    if (!text) return;
    if (goals.some((g) => g.text.toLowerCase() === text.toLowerCase())) {
      toast({ title: 'Goal already exists', description: 'Try a different topic.' });
      return;
    }
    setGoals((prev) => [...prev, { id: `g_${Date.now()}`, text, createdAt: Date.now() }]);
    setNewGoal('');
    setAdding(false);
    setAskingFirst(false);
    toast({ title: 'Goal saved!', description: `Saved "${text}" — challenges unlocked.` });
  };

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const toggle = (c: Challenge) => {
    if (completed[c.id]) return;
    setCompleted((prev) => ({ ...prev, [c.id]: true }));
    addCoins(c.reward, `Daily challenge: ${c.title}`);
  };

  const completedCount = challenges.filter((c) => completed[c.id]).length;
  const allDone = challenges.length > 0 && completedCount === challenges.length;

  // ---------- Performance tracker ----------
  const stats = useMemo(() => {
    const last7 = history.slice(-7);
    const totalDone = last7.reduce((s, d) => s + d.done, 0);
    const totalAll = last7.reduce((s, d) => s + d.total, 0);
    const weekRate = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

    // streak: count consecutive days (ending yesterday) where done === total
    const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let cursor = new Date();
    cursor.setDate(cursor.getDate() - 1);
    for (const day of sorted) {
      const expected = cursor.toISOString().slice(0, 10);
      if (day.date !== expected) break;
      if (day.total > 0 && day.done === day.total) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }
    if (allDone) streak += 1;

    // per-goal rates over history
    const goalRates: Record<string, { done: number; total: number }> = {};
    last7.forEach((d) => {
      Object.entries(d.perGoal).forEach(([gid, v]) => {
        if (!goalRates[gid]) goalRates[gid] = { done: 0, total: 0 };
        goalRates[gid].done += v.done;
        goalRates[gid].total += v.total;
      });
    });

    return { weekRate, streak, goalRates, daysTracked: last7.length };
  }, [history, allDone]);

  const suggestions = useMemo(() => {
    const tips: string[] = [];
    if (goals.length === 0) {
      tips.push('Save your first goal to begin tracking progress.');
      return tips;
    }
    if (stats.daysTracked < 2) {
      tips.push('Check in tomorrow — a few days of data unlocks personalized insights.');
    }
    if (stats.weekRate < 40 && stats.daysTracked >= 2) {
      tips.push('Try completing just 1 challenge per goal each day to build momentum.');
    }
    if (stats.weekRate >= 80) {
      tips.push('Excellent consistency! Add a tougher goal to keep growing.');
    }
    if (stats.streak >= 3) {
      tips.push(`🔥 ${stats.streak}-day streak! Don't break the chain tomorrow.`);
    }
    // weakest goal
    let weakest: { id: string; rate: number } | null = null;
    Object.entries(stats.goalRates).forEach(([gid, v]) => {
      if (v.total < 2) return;
      const r = v.done / v.total;
      if (!weakest || r < weakest.rate) weakest = { id: gid, rate: r };
    });
    if (weakest && weakest.rate < 0.5) {
      const g = goals.find((x) => x.id === weakest!.id);
      if (g) tips.push(`Focus on "${g.text}" — it's your lowest completion area. Start with the easiest challenge first.`);
    }
    if (goals.length > 4) {
      tips.push('You have many goals. Consider narrowing to 3 for deeper learning.');
    }
    if (completedCount === 0 && challenges.length > 0) {
      tips.push('Tap any challenge below to mark it done and earn coins.');
    }
    return tips.slice(0, 4);
  }, [stats, goals, completedCount, challenges.length]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Daily Mission</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Daily Space Learning Challenges</h2>
          <p className="text-muted-foreground">Save your goals, get fresh challenges daily, and track your progress.</p>
        </div>
        {/* Sync banner */}
        <Card className={`p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${user ? 'bg-primary/5 border-primary/30' : 'bg-yellow-500/5 border-yellow-500/30'}`}>
          <div className="flex items-center gap-2 text-sm">
            {syncing ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : user ? (
              <Cloud className="w-4 h-4 text-primary" />
            ) : (
              <CloudOff className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-muted-foreground">
              {user
                ? syncing
                  ? 'Syncing with your account…'
                  : `Synced across devices${lastSyncedAt ? ` • ${new Date(lastSyncedAt).toLocaleTimeString()}` : ''}`
                : 'Sign in to sync your goals and progress across devices.'}
            </span>
          </div>
          {!user && (
            <Button size="sm" onClick={() => setAuthOpen(true)} className="gap-1">
              <LogIn className="w-4 h-4" /> Sign in to sync
            </Button>
          )}
        </Card>


        <Card className="p-5 mb-6 bg-card/40 backdrop-blur border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Your Learning Goals</h3>
              {goals.length > 0 && <Badge variant="secondary">{goals.length}</Badge>}
              <Badge variant="outline" className="gap-1 text-xs">
                <Save className="w-3 h-3" /> Saved
              </Badge>
            </div>
            <Button size="sm" onClick={() => setAdding((v) => !v)} className="gap-1">
              <Plus className="w-4 h-4" /> New Goal
            </Button>
          </div>

          {(adding || askingFirst) && (
            <div className="flex flex-col sm:flex-row gap-2 mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Input
                autoFocus
                placeholder={askingFirst ? "What do you want to learn? e.g. 'Black holes', 'Mars exploration'" : 'Add another goal...'}
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGoal()}
              />
              <Button onClick={addGoal} disabled={!newGoal.trim()} className="gap-1">
                <Save className="w-4 h-4" /> Save Goal
              </Button>
            </div>
          )}

          {goals.length === 0 && !askingFirst && !adding && (
            <p className="text-sm text-muted-foreground">No goals yet. Tap "New Goal" to start your daily mission.</p>
          )}

          {goals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <div key={g.id} className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm">
                  <span>{g.text}</span>
                  <button onClick={() => removeGoal(g.id)} className="opacity-50 hover:opacity-100 ml-1" aria-label="Remove goal">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Performance tracker */}
        {goals.length > 0 && (
          <Card className="p-5 mb-6 bg-card/40 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Your Progress</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                  <Flame className="w-5 h-5" /> {stats.streak}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Day streak</div>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{stats.weekRate}%</div>
                <div className="text-xs text-muted-foreground mt-1">7-day completion</div>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{completedCount}/{challenges.length || 0}</div>
                <div className="text-xs text-muted-foreground mt-1">Today</div>
              </div>
            </div>

            {/* per-goal bars */}
            {Object.keys(stats.goalRates).length > 0 && (
              <div className="space-y-2 mb-4">
                {goals.map((g) => {
                  const v = stats.goalRates[g.id];
                  if (!v || v.total === 0) return null;
                  const pct = Math.round((v.done / v.total) * 100);
                  return (
                    <div key={g.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{g.text}</span>
                        <span className="text-primary font-medium">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <h4 className="text-sm font-semibold text-yellow-500">Suggested improvements</h4>
                </div>
                <ul className="space-y-1.5">
                  {suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {/* Today's progress */}
        {challenges.length > 0 && (
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Refreshes daily • {completedCount}/{challenges.length} complete</span>
            </div>
            {allDone && (
              <Badge className="gap-1 bg-yellow-500/20 text-yellow-500 border-yellow-500/40">
                <Trophy className="w-3.5 h-3.5" /> All Done!
              </Badge>
            )}
          </div>
        )}

        {/* Challenges grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map((c) => {
            const done = !!completed[c.id];
            return (
              <Card
                key={c.id}
                className={`p-4 transition-all cursor-pointer border ${
                  done
                    ? 'bg-primary/5 border-primary/40 opacity-70'
                    : 'bg-card/40 backdrop-blur border-border hover:border-primary/40 hover:scale-[1.01]'
                }`}
                onClick={() => toggle(c)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={done} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`font-semibold ${done ? 'line-through' : ''}`}>{c.title}</h4>
                      <Badge variant="outline" className="shrink-0 text-yellow-500 border-yellow-500/40">
                        +{c.reward}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {challenges.length === 0 && goals.length === 0 && !askingFirst && (
          <Card className="p-8 text-center bg-card/40 backdrop-blur">
            <p className="text-muted-foreground">Add a goal above to generate your first daily challenges!</p>
          </Card>
        )}
      </div>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
};

export default DailyChallenges;
