import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, BookOpen, Clock, ChevronRight, Loader2, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import LessonDoubtChat from '@/components/LessonDoubtChat';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Lesson {
  title: string;
  duration: string;
  topics: string[];
  funActivity: string;
}

interface StudyPlan {
  title: string;
  description: string;
  totalWeeks: number;
  lessons: Lesson[];
}

const INTERESTS = [
  { id: 'planets', label: 'Planets & Moons', emoji: '🪐' },
  { id: 'stars', label: 'Stars & Nebulas', emoji: '⭐' },
  { id: 'galaxies', label: 'Galaxies', emoji: '🌌' },
  { id: 'black-holes', label: 'Black Holes', emoji: '🕳️' },
  { id: 'rockets', label: 'Rockets & Missions', emoji: '🚀' },
  { id: 'astronauts', label: 'Astronauts', emoji: '👨‍🚀' },
  { id: 'exoplanets', label: 'Exoplanets', emoji: '🌍' },
  { id: 'cosmology', label: 'Big Bang & Cosmology', emoji: '💥' },
];

const DURATIONS = [
  { id: '1week', label: '1 Week Sprint', desc: '5-7 quick lessons' },
  { id: '2weeks', label: '2 Week Journey', desc: '10-14 lessons' },
  { id: '1month', label: '1 Month Adventure', desc: '20+ deep lessons' },
];

const StudyPlanner = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>('2weeks');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const planAsText = (p: StudyPlan) => {
    const header = `${p.title}\n${p.description}\n${p.totalWeeks} week plan • ${p.lessons.length} lessons\n`;
    const body = p.lessons.map((l, i) => {
      const topics = l.topics.map(t => `   • ${t}`).join('\n');
      return `\n${i + 1}. ${l.title} (${l.duration})\n${topics}\n   🎯 Fun Activity: ${l.funActivity}`;
    }).join('\n');
    return `${header}${body}`;
  };

  const copyPlan = async () => {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(planAsText(plan));
      setCopied(true);
      toast({ title: '📋 Plan copied!', description: 'Paste it into "Your Topic" on Dream Journey to find resources.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Copy failed', description: 'Try selecting and copying manually.', variant: 'destructive' });
    }
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const generatePlan = async () => {
    if (selectedInterests.length === 0) return;
    if (!user) {
      setError('Sign in to generate your personalized study plan.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('study-planner', {
        body: { interests: selectedInterests, duration },
      });

      if (fnError) throw fnError;
      if (!data?.plan || !Array.isArray(data.plan.lessons) || data.plan.lessons.length === 0) {
        throw new Error('The plan came back incomplete. Please try again.');
      }
      setPlan(data.plan);
    } catch (e: unknown) {
      console.error('Study planner error:', e);
      const context = typeof e === 'object' && e !== null && 'context' in e
        ? (e as { context?: unknown }).context
        : undefined;
      let status: number | undefined;
      if (context instanceof Response) {
        status = context.status;
      } else if (typeof e === 'object' && e !== null && 'status' in e && typeof e.status === 'number') {
        status = e.status;
      }

      if (status === 401) {
        setError('Your sign-in has expired. Sign in again, then generate your plan.');
      } else if (status === 402) {
        setError('AI plan generation is temporarily out of credits. Please try again later.');
      } else if (status === 429) {
        setError('Plan generation is busy right now. Please try again in a moment.');
      } else if (status === 400) {
        setError('Please choose a topic and try again.');
      } else if (e instanceof Error && e.message.includes('incomplete')) {
        setError(e.message);
      } else {
        setError('Could not generate your plan right now. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPlan(null);
    setSelectedInterests([]);
    setError(null);
  };

  return (
    <section id="study-planner" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
              AI Study Planner
            </h2>
            <Sparkles className="w-10 h-10 text-star" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let AI create a personalized space learning journey just for you! Pick your interests and we'll plan your adventure.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> What interests you?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedInterests.includes(interest.id)
                          ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/10'
                          : 'bg-card/30 border-border hover:border-primary/30'
                      }`}
                    >
                      <span className="text-2xl block mb-2">{interest.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> How long do you want to study?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DURATIONS.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setDuration(d.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        duration === d.id
                          ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/10'
                          : 'bg-card/30 border-border hover:border-primary/30'
                      }`}
                    >
                      <span className="font-semibold text-foreground">{d.label}</span>
                      <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-center text-destructive text-sm">{error}</div>
              )}

              {!authLoading && !user && (
                <p className="text-center text-sm text-muted-foreground">Sign in to generate and view your personalized plan.</p>
              )}

              <div className="text-center">
                <Button
                  onClick={generatePlan}
                  disabled={selectedInterests.length === 0 || loading || authLoading || !user}
                  className="px-8 py-6 text-lg font-bold rounded-xl"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      AI is crafting your plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate My Study Plan
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-2xl p-6 mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.title}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <p className="text-sm text-primary mt-2">📅 {plan.totalWeeks} week plan • {plan.lessons.length} lessons</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" onClick={copyPlan} className="border-primary/30">
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copied' : 'Copy Plan'}
                    </Button>
                    <Button variant="outline" onClick={reset} className="border-primary/30">
                      <RotateCcw className="w-4 h-4 mr-2" /> New Plan
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {plan.lessons.map((lesson, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                          <div className="flex items-center gap-2">
                            <LessonDoubtChat lessonTitle={lesson.title} lessonTopics={lesson.topics} />
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {lesson.duration}
                            </span>
                          </div>
                        </div>
                        <ul className="space-y-1 mb-3">
                          {lesson.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-primary" /> {topic}
                            </li>
                          ))}
                        </ul>
                        <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
                          <p className="text-xs text-accent-foreground">
                            🎯 <span className="font-medium">Fun Activity:</span> {lesson.funActivity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StudyPlanner;
