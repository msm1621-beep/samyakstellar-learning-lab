import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPaste, Sparkles, Video, BookOpen, Headphones, GraduationCap, Rocket, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { videos } from '@/data/videos';
import { books } from '@/data/books';
import { courses } from '@/data/courses';
import { astronautTopics } from '@/data/astronautTopics';

interface Match<T> { item: T; score: number; }

const STOP = new Set([
  'the','a','an','and','or','to','of','in','on','for','with','at','by','from','is','are','it','this','that','your','you','our','we','as','be','will','can','about','into','plan','week','lesson','day','study','topic','topics','space','learn','learning','fun','activity','adventure','journey','quick','deep','sprint'
]);

const tokenize = (s: string) => Array.from(new Set(
  s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w))
));

function score(haystack: string[], tokens: string[]): number {
  const hay = haystack.join(' ').toLowerCase();
  let s = 0;
  for (const t of tokens) if (hay.includes(t)) s += 1;
  return s;
}

const YourTopicMatcher = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const tokens = useMemo(() => tokenize(text), [text]);

  const results = useMemo(() => {
    if (tokens.length === 0) return null;
    const top = <T,>(arr: Match<T>[], n: number) => arr.filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, n).map(r => r.item);

    const vMatches: Match<typeof videos[0]>[] = videos.map(v => ({ item: v, score: score([v.title, v.description, v.category, ...v.tags], tokens) }));
    const allBooks = books;
    const bMatches: Match<typeof books[0]>[] = allBooks.filter(b => b.type !== 'audiobook').map(b => ({ item: b, score: score([b.title, b.author, b.description, ...b.tags], tokens) }));
    const aMatches: Match<typeof books[0]>[] = allBooks.filter(b => b.type === 'audiobook').map(b => ({ item: b, score: score([b.title, b.author, b.description, ...b.tags], tokens) }));
    const cMatches: Match<typeof courses[0]>[] = courses.map(c => ({ item: c, score: score([c.title, c.description, ...c.learningGoals, ...c.plan.map(p => p.topic)], tokens) }));
    const tMatches: Match<typeof astronautTopics[0]>[] = astronautTopics.map(t => ({ item: t, score: score([t.title, t.summary, t.whyItMatters, t.category, ...t.keyConcepts], tokens) }));

    return {
      videos: top(vMatches, 6),
      books: top(bMatches, 6),
      audiobooks: top(aMatches, 6),
      courses: top(cMatches, 6),
      topics: top(tMatches, 6),
    };
  }, [tokens]);

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (!t.trim()) {
        toast({ title: 'Clipboard is empty', description: 'Copy your study plan first.', variant: 'destructive' });
        return;
      }
      setText(t);
      setOpen(true);
      toast({ title: '📋 Pasted!', description: 'Finding the best resources for you...' });
    } catch {
      toast({ title: 'Paste blocked', description: 'Paste manually into the box below.', variant: 'destructive' });
      setOpen(true);
    }
  };

  return (
    <section className="mb-8">
      <Card className="p-5 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 border-primary/30 backdrop-blur-md">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div>
            <Badge variant="outline" className="mb-2"><Sparkles className="w-3 h-3 mr-1" /> Your Topic</Badge>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Bring Your Study Plan Here</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Paste any AI study plan, lesson, or topic. We'll instantly match videos, books, audiobooks, courses, and astronaut topics from the website.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePaste} size="sm">
              <ClipboardPaste className="w-4 h-4 mr-2" /> Paste from clipboard
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpen(o => !o)}>
              {open ? <><X className="w-4 h-4 mr-2" /> Close</> : 'Type instead'}
            </Button>
          </div>
        </div>

        {open && (
          <div className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your AI study plan, a topic, or anything you want to learn..."
              className="min-h-[120px] bg-background/40"
            />

            {tokens.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Detected keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {tokens.slice(0, 18).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
              </div>
            )}

            {results && (
              <div className="space-y-5">
                <ResourceGroup
                  title="Videos"
                  icon={<Video className="w-4 h-4" />}
                  items={results.videos.map(v => ({
                    key: v.id,
                    title: v.title,
                    desc: v.description,
                    meta: `${v.duration} • ${v.category}`,
                    href: `https://www.youtube.com/watch?v=${v.youtubeId}`,
                  }))}
                />
                <ResourceGroup
                  title="Books"
                  icon={<BookOpen className="w-4 h-4" />}
                  items={results.books.map(b => ({
                    key: b.id,
                    title: b.title,
                    desc: b.description,
                    meta: `${b.author} • Ages ${b.ageRange}`,
                  }))}
                />
                <ResourceGroup
                  title="Audiobooks"
                  icon={<Headphones className="w-4 h-4" />}
                  items={results.audiobooks.map(b => ({
                    key: b.id,
                    title: b.title,
                    desc: b.description,
                    meta: `${b.narrator || b.author}${b.duration ? ' • ' + b.duration : ''}`,
                  }))}
                />
                <ResourceGroup
                  title="Courses"
                  icon={<GraduationCap className="w-4 h-4" />}
                  items={results.courses.map(c => ({
                    key: c.id,
                    title: c.title,
                    desc: c.description,
                    meta: `${c.difficulty} • ${c.estimatedDuration}`,
                  }))}
                />
                <ResourceGroup
                  title="Astronaut Training Topics"
                  icon={<Rocket className="w-4 h-4" />}
                  items={results.topics.map(t => ({
                    key: t.id,
                    title: `${t.icon} ${t.title}`,
                    desc: t.summary,
                    meta: t.category,
                  }))}
                />
                {results.videos.length + results.books.length + results.audiobooks.length + results.courses.length + results.topics.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No matches yet — try pasting more text or different keywords.</p>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
};

interface RGItem { key: string; title: string; desc: string; meta?: string; href?: string; }
const ResourceGroup = ({ title, icon, items }: { title: string; icon: React.ReactNode; items: RGItem[] }) => {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <h3 className="font-semibold text-sm uppercase tracking-wide">{title} ({items.length})</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {items.map(it => (
          <Card key={it.key} className="p-3 bg-background/40 border-border/40 hover:border-primary/40 transition-colors">
            <h4 className="font-semibold text-sm text-foreground mb-1">{it.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{it.desc}</p>
            {it.meta && <p className="text-[10px] text-muted-foreground mt-1">{it.meta}</p>}
            {it.href && (
              <Button asChild size="sm" variant="outline" className="text-xs mt-2 h-7">
                <a href={it.href} target="_blank" rel="noopener noreferrer">Open</a>
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YourTopicMatcher;
