import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, BookOpen, Video, Headphones, FileText, Send, Sparkles, Loader2, Volume2, VolumeX, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import EnhancedStarField from '@/components/EnhancedStarField';
import { astronautTopics, topicCategories, type AstronautTopic, type Resource } from '@/data/astronautTopics';
import { useToast } from '@/hooks/use-toast';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cosmo-chat`;

const resourceIcon = (type: Resource['type']) => {
  switch (type) {
    case 'video': return <Video className="w-4 h-4" />;
    case 'book': return <BookOpen className="w-4 h-4" />;
    case 'audiobook': return <Headphones className="w-4 h-4" />;
    case 'article': return <FileText className="w-4 h-4" />;
  }
};

interface ChatMessage {
  role: 'user' | 'cosmo';
  content: string;
}

const DreamJourney = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<typeof topicCategories[number]>('All');
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<AstronautTopic>(astronautTopics[0]);
  const [speakingTitle, setSpeakingTitle] = useState<string | null>(null);

  // Cosmo chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'cosmo', content: `Hi future astronaut! 🚀 I'm Cosmo. Ask me anything about **${astronautTopics[0].title}** or any other training topic on this page!` },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredTopics = useMemo(() => {
    return astronautTopics.filter(t => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.keyConcepts.some(k => k.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  const speak = (title: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({ title: 'Audio unavailable', description: 'Your browser does not support speech.' });
      return;
    }
    if (speakingTitle === title) {
      window.speechSynthesis.cancel();
      setSpeakingTitle(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onend = () => setSpeakingTitle(null);
    utter.onerror = () => setSpeakingTitle(null);
    window.speechSynthesis.speak(utter);
    setSpeakingTitle(title);
  };

  const askCosmo = async (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || isStreaming) return;
    setInput('');
    const userMsg: ChatMessage = { role: 'user', content: text };
    const contextMsg = `Context (for reference only — the user may ask about ANY topic): they are currently exploring the astronaut training topic "${activeTopic.title}" (${activeTopic.category}). Topic summary: ${activeTopic.summary}. Key concepts: ${activeTopic.keyConcepts.join(', ')}. IMPORTANT: Answer ANY question the user asks — space, science, history, math, daily life, anything at all. Do NOT restrict yourself to this topic. Use it only as background if the question is unrelated.`;

    setMessages(prev => [...prev, userMsg, { role: 'cosmo', content: '' }]);
    setIsStreaming(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: contextMsg },
            ...messages.filter(m => m.content).map(m => ({ role: m.role === 'cosmo' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: text },
          ],
          language: 'en',
          targetLanguageName: 'English',
        }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error('Too many questions! Try again in a moment.');
        if (resp.status === 402) throw new Error('Cosmo needs a recharge. Try again later.');
        throw new Error('Cosmo could not respond.');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let assistantText = '';
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const j = line.slice(6).trim();
          if (j === '[DONE]') { done = true; break; }
          try {
            const parsed = JSON.parse(j);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) {
              assistantText += c;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'cosmo', content: assistantText };
                return copy;
              });
            }
          } catch {
            buf = line + '\n' + buf;
            break;
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.';
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'cosmo', content: `⚠️ ${msg}` };
        return copy;
      });
      toast({ title: 'Cosmo error', description: msg, variant: 'destructive' });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <EnhancedStarField />

      <header className="relative z-10 border-b border-border/30 bg-background/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 text-foreground">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">Your Dream Journey to Space</span>
          </div>
          <div className="w-24 hidden sm:block" />
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero */}
        <section className="text-center mb-10 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-3"><Sparkles className="w-3 h-3 mr-1" /> Astronaut Training Hub</Badge>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Become an Astronaut, One Topic at a Time
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Pick any topic an astronaut studies — from orbital mechanics to survival training. Watch videos, read books, listen to audiobooks, and ask Cosmo anything along the way.
          </p>
        </section>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search topics, concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {topicCategories.map(cat => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr_360px] gap-6">
          {/* Topic list */}
          <aside>
            <h2 className="font-display font-semibold text-foreground mb-3">Topics ({filteredTopics.length})</h2>
            <ScrollArea className="h-[600px] pr-2">
              <div className="flex flex-col gap-2">
                {filteredTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      activeTopic.id === topic.id
                        ? 'border-primary bg-primary/10 cosmic-glow'
                        : 'border-border/40 bg-card/40 hover:border-primary/50 hover:bg-card/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{topic.icon}</span>
                      <span className="font-medium text-foreground text-sm">{topic.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{topic.category}</Badge>
                  </button>
                ))}
                {filteredTopics.length === 0 && (
                  <p className="text-sm text-muted-foreground p-4">No topics match your search.</p>
                )}
              </div>
            </ScrollArea>
          </aside>

          {/* Topic detail */}
          <section>
            <Card className="p-6 bg-card/60 backdrop-blur-md border-border/40">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{activeTopic.icon}</span>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">{activeTopic.category}</Badge>
                  <h2 className="text-2xl font-display font-bold text-foreground">{activeTopic.title}</h2>
                  <p className="text-muted-foreground mt-2">{activeTopic.summary}</p>
                </div>
              </div>

              <div className="mb-5 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-foreground text-sm mb-1">Why it matters</h3>
                <p className="text-sm text-muted-foreground">{activeTopic.whyItMatters}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-foreground text-sm mb-2">Key concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {activeTopic.keyConcepts.map(k => (
                    <Badge key={k} variant="secondary">{k}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Learning resources</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeTopic.resources.map((r, i) => {
                    const isLong = r.type === 'book' || r.type === 'audiobook';
                    return (
                    <Card key={i} className={`p-5 bg-background/40 border-border/40 hover:border-primary/50 transition-colors ${isLong ? 'sm:col-span-2' : ''}`}>
                      <div className="flex items-center gap-2 mb-3 text-primary">
                        {resourceIcon(r.type)}
                        <span className="text-xs uppercase tracking-wide font-medium">{r.type}</span>
                        {r.duration && <span className="text-xs text-muted-foreground ml-auto">{r.duration}</span>}
                      </div>
                      <h4 className={`font-semibold text-foreground mb-2 ${isLong ? 'text-base' : 'text-sm'}`}>{r.title}</h4>
                      <p className={`text-muted-foreground mb-3 leading-relaxed ${isLong ? 'text-sm' : 'text-xs'}`}>{r.description}</p>
                      <div className="flex gap-2">
                        {r.url && (
                          <Button asChild size="sm" variant="outline" className="text-xs">
                            <a href={r.url} target="_blank" rel="noopener noreferrer">Open</a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => speak(r.title, `${r.title}. ${r.description}`)}
                        >
                          {speakingTitle === r.title ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
                          {speakingTitle === r.title ? 'Stop' : 'Listen'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs ml-auto"
                          onClick={() => askCosmo(`Explain "${r.title}" for the ${activeTopic.title} topic.`)}
                        >
                          Ask Cosmo
                        </Button>
                      </div>
                    </Card>
                  );})}
                </div>
              </div>
            </Card>
          </section>

          {/* Cosmo chat */}
          <aside>
            <Card className="p-4 bg-card/60 backdrop-blur-md border-border/40 flex flex-col h-[600px]">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">🌟</div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">Cosmo</h3>
                  <p className="text-xs text-muted-foreground">Your astronaut tutor</p>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-2 mb-3">
                <div className="flex flex-col gap-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm ${
                        m.role === 'user'
                          ? 'bg-primary/15 text-foreground ml-4'
                          : 'bg-muted/40 text-foreground mr-4'
                      }`}
                    >
                      {m.content || <Loader2 className="w-4 h-4 animate-spin" />}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>

              <div className="flex flex-wrap gap-1 mb-2">
                {['Summarize this topic', 'Quiz me on it', 'Real-life example?'].map(s => (
                  <Button key={s} size="sm" variant="outline" className="text-xs h-7" onClick={() => askCosmo(s)} disabled={isStreaming}>
                    {s}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={`Ask about ${activeTopic.title}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') askCosmo(); }}
                  disabled={isStreaming}
                />
                <Button size="icon" onClick={() => askCosmo()} disabled={isStreaming || !input.trim()}>
                  {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DreamJourney;
