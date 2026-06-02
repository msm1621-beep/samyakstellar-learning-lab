import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles, Target, Trash2, RefreshCw, Trophy } from 'lucide-react';
import { useCoins } from '@/contexts/CoinsContext';
import { toast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  text: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  goalId: string;
  done: boolean;
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

const todayKey = () => new Date().toISOString().slice(0, 10);

const generateChallenges = (goals: Goal[]): Challenge[] => {
  if (goals.length === 0) return [];
  const seed = todayKey();
  const out: Challenge[] = [];
  goals.forEach((g, gi) => {
    // 2 challenges per goal, deterministic per day
    const picks = [0, 1].map(i => {
      const idx = Math.abs(hash(seed + g.id + i)) % CHALLENGE_TEMPLATES.length;
      return CHALLENGE_TEMPLATES[idx];
    });
    picks.forEach((p, i) => {
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

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
};

const DailyChallenges = () => {
  const { addCoins } = useCoins();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [adding, setAdding] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [askingFirst, setAskingFirst] = useState(false);

  useEffect(() => {
    const g = localStorage.getItem('dailyChallenge_goals');
    if (g) {
      const parsed = JSON.parse(g) as Goal[];
      setGoals(parsed);
      if (parsed.length === 0) setAskingFirst(true);
    } else {
      setAskingFirst(true);
    }
    const day = localStorage.getItem('dailyChallenge_day');
    const done = localStorage.getItem('dailyChallenge_done');
    if (day === todayKey() && done) setCompleted(JSON.parse(done));
    else {
      localStorage.setItem('dailyChallenge_day', todayKey());
      localStorage.setItem('dailyChallenge_done', '{}');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyChallenge_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('dailyChallenge_done', JSON.stringify(completed));
  }, [completed]);

  const challenges = useMemo(() => generateChallenges(goals), [goals]);

  const addGoal = () => {
    const text = newGoal.trim();
    if (!text) return;
    setGoals(prev => [...prev, { id: `g_${Date.now()}`, text }]);
    setNewGoal('');
    setAdding(false);
    setAskingFirst(false);
    toast({ title: 'Goal added!', description: `New challenges unlocked for "${text}"` });
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const toggle = (c: Challenge) => {
    if (completed[c.id]) return;
    setCompleted(prev => ({ ...prev, [c.id]: true }));
    addCoins(c.reward, `Daily challenge: ${c.title}`);
  };

  const completedCount = challenges.filter(c => completed[c.id]).length;
  const allDone = challenges.length > 0 && completedCount === challenges.length;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Daily Mission</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Daily Space Learning Challenges</h2>
          <p className="text-muted-foreground">Set your goals, get fresh challenges every day, and earn coins.</p>
        </div>

        {/* Goals panel */}
        <Card className="p-5 mb-6 bg-card/40 backdrop-blur border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Your Learning Goals</h3>
              {goals.length > 0 && <Badge variant="secondary">{goals.length}</Badge>}
            </div>
            <Button size="sm" onClick={() => setAdding(v => !v)} className="gap-1">
              <Plus className="w-4 h-4" /> New Goal
            </Button>
          </div>

          {(adding || askingFirst) && (
            <div className="flex flex-col sm:flex-row gap-2 mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Input
                autoFocus
                placeholder={askingFirst ? "What do you want to learn? e.g. 'Black holes', 'Mars exploration'" : 'Add another goal...'}
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addGoal()}
              />
              <Button onClick={addGoal} disabled={!newGoal.trim()}>Add Goal</Button>
            </div>
          )}

          {goals.length === 0 && !askingFirst && !adding && (
            <p className="text-sm text-muted-foreground">No goals yet. Tap "New Goal" to start your daily mission.</p>
          )}

          {goals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {goals.map(g => (
                <div key={g.id} className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm">
                  <span>{g.text}</span>
                  <button onClick={() => removeGoal(g.id)} className="opacity-50 hover:opacity-100 ml-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Progress */}
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
          {challenges.map(c => {
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
    </section>
  );
};

export default DailyChallenges;
