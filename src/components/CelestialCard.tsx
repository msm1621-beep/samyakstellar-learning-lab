import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, MessageCircle, X, ChevronDown, ChevronUp, Sparkles, Send, Loader2, BookmarkPlus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/contexts/CoinsContext';
import { useAuth } from '@/contexts/AuthContext';
import type { CelestialBody } from '@/data/celestialBodies';
import { NOTE_REWARD, isSaveNoteRequest, saveStudyNote } from '@/lib/studyNotes';

interface CelestialCardProps {
  body: CelestialBody;
  onSelect: () => void;
}

// Tailwind cannot generate classes from interpolated strings, so map the token
// names used in the data file to real, statically-analysable utility classes.
const colorClasses: Record<string, string> = {
  primary: 'bg-primary/20 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  accent: 'bg-accent/20 text-accent',
  destructive: 'bg-destructive/20 text-destructive',
  foreground: 'bg-foreground/10 text-foreground',
  planet: 'bg-planet/20 text-planet',
  nebula: 'bg-nebula/20 text-nebula',
  galaxy: 'bg-galaxy/20 text-galaxy',
};

// Cosmo's knowledge base for celestial bodies
const getCosmoResponse = (bodyName: string): string => {
  const responses: Record<string, string> = {
    sun: "Hello, young explorer! ☀️ The Sun is absolutely magnificent! Did you know it's so big that about 1.3 million Earths could fit inside it? And it takes 8 minutes for sunlight to reach us here on Earth. The Sun is about 4.6 billion years old - that's older than dinosaurs by a LOT!",
    mercury: "Oh Mercury! 🪨 The smallest planet zooms around the Sun faster than any other - a year there is only 88 Earth days! But watch out for the temperature swings - it goes from super hot to freezing cold because Mercury has almost no atmosphere to keep it warm at night.",
    venus: "Venus is fascinating! 🌕 It's called Earth's twin because it's almost the same size, but it's SO different! It spins backwards, it's the hottest planet (even hotter than Mercury!), and a day there is longer than a year. Imagine that - celebrating your birthday before lunchtime!",
    earth: "Our beautiful home! 🌍 Earth is the only planet we know of with liquid water on its surface and the only one with known life. We're in the perfect 'Goldilocks zone' - not too hot, not too cold, just right! And fun fact: Earth is NOT perfectly round - it's a bit squished at the poles!",
    moon: "Our lovely Moon! 🌙 Did you know 12 humans have walked on the Moon? The footprints they left will stay there for millions of years because there's no wind! The Moon is slowly moving away from Earth - about 3.8 centimeters every year. It controls our ocean tides and lights up our night sky!",
    mars: "The Red Planet! 🔴 Mars has the biggest volcano in the whole solar system - Olympus Mons is about 3 times taller than Mount Everest! Scientists think Mars once had rivers and oceans. Right now, robots like Perseverance are exploring Mars and looking for signs of ancient life!",
    jupiter: "Mighty Jupiter! 🟠 It's SO big that all the other planets could fit inside it! The Great Red Spot is a storm bigger than Earth that's been raging for hundreds of years. Jupiter has at least 95 moons, and one of them - Europa - might have an ocean under its ice where aliens could live!",
    saturn: "Spectacular Saturn! 💫 Those gorgeous rings are made of billions of pieces of ice and rock! Some pieces are tiny like grains of sand, others are as big as houses. Saturn is so light that if you had a big enough bathtub, it would float! It also has an amazing moon called Titan with lakes of liquid methane.",
    uranus: "Silly Uranus! 🔵 This planet rolls around the Sun on its side like a bowling ball! Scientists think something HUGE crashed into it long ago and knocked it over. Uranus has 27 moons, all named after characters from Shakespeare plays. It's an ice giant with a beautiful blue-green color!",
    neptune: "Windy Neptune! 🔷 It has the strongest winds in the solar system - over 1,200 miles per hour! That's faster than the speed of sound! Neptune is so far away that it takes 165 Earth years to go around the Sun once. Its big moon Triton orbits backwards and might have geysers!",
    pluto: "Dear little Pluto! ❤️ Even though it's now called a dwarf planet, Pluto is still special! It has a heart-shaped glacier on its surface called Tombaugh Regio. Pluto is smaller than our Moon and takes 248 years to orbit the Sun. The New Horizons spacecraft showed us its amazing surface in 2015!",
  };
  
  const lowerName = bodyName.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerName.includes(key)) {
      return response;
    }
  }
  
  return `What an interesting celestial object! ${bodyName} is truly amazing. The universe is full of wonders waiting to be discovered. Did you know that when you look at stars, you're actually looking back in time? The light takes years to reach us! Keep exploring, young astronomer! 🚀✨`;
};

interface ReadMoreModalProps {
  body: CelestialBody;
  onClose: () => void;
}

const ReadMoreModal = ({ body, onClose }: ReadMoreModalProps) => {
  const [showExtendedFacts, setShowExtendedFacts] = useState(false);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="glass-card max-w-2xl w-full rounded-2xl p-6 my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{body.icon}</div>
          <h3 className="text-2xl font-display font-bold">{body.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/20 text-primary mt-2">
            {body.type}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">What is it?</h4>
            <p className="text-foreground">{body.longDescription}</p>
          </div>

          <div className="glass-card p-4 rounded-xl bg-accent/10 border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-semibold text-accent">Cool Fact!</h4>
            </div>
            <p className="text-foreground">{body.coolFact}</p>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <button
              onClick={() => setShowExtendedFacts(!showExtendedFacts)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <h4 className="text-sm font-semibold text-foreground">More Amazing Facts</h4>
              </div>
              {showExtendedFacts ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {showExtendedFacts && (
              <ul className="mt-3 space-y-2">
                {body.extendedFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center glass-card p-4 rounded-xl">
            <span className="text-sm text-muted-foreground">{body.metricLabel}</span>
            <span className="font-display font-bold text-primary">{body.metric}</span>
          </div>

          <div className="glass-card p-4 rounded-xl bg-secondary/10 border-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-secondary" />
              <h4 className="text-sm font-semibold text-secondary">Deep Dive</h4>
            </div>
            <p className="text-foreground leading-relaxed">{body.readMoreContent}</p>
          </div>
        </div>

        <Button onClick={onClose} className="w-full mt-6">
          Keep Exploring! 🚀
        </Button>
      </div>
    </div>
  );
};

interface CosmoModalProps {
  body: CelestialBody;
  onClose: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cosmo-chat`;

type ChatMsg = { role: 'user' | 'cosmo'; content: string };

const CosmoModal = ({ body, onClose }: CosmoModalProps) => {
  const { toast } = useToast();
  const { addCoins } = useCoins();
  const { user, profile, addCoinsServer } = useAuth();
  const initialIntro = getCosmoResponse(body.name);
  const initialFact = `${initialIntro}\n\n**Quick facts about ${body.name}:** ${body.longDescription} ${body.coolFact}`;
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'cosmo', content: initialFact },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedIdx, setSavedIdx] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const recordStudyNote = (question: string, answer: string) => {
    try {
      saveStudyNote({ bodyName: body.name, bodyIcon: body.icon, question, answer, source: 'Cosmo' });
    } catch (e) {
      console.error('Failed to save study note', e);
      toast({ title: 'Could not save note', description: 'Please try again.', variant: 'destructive' });
      return false;
    }

    addCoins(NOTE_REWARD, `Saved a study note about ${body.name}`);
    if (user && profile) {
      try { void addCoinsServer(NOTE_REWARD); } catch {}
    }
    toast({ title: '📚 Study note saved!', description: `+${NOTE_REWARD} coins earned!` });
    return true;
  };

  const saveAsNote = (idx: number) => {
    if (savedIdx.has(idx) || isStreaming) return;
    const answer = messages[idx]?.content?.trim();
    if (!answer) return;
    let question = `About ${body.name}`;
    for (let i = idx - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { question = messages[i].content; break; }
    }
    if (!recordStudyNote(question, answer)) return;
    setSavedIdx(prev => new Set(prev).add(idx));
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ''));
    u.rate = 0.95;
    u.pitch = 1.1;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const ask = async (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || isStreaming) return;
    setInput('');
    if (isSaveNoteRequest(text)) {
      const conversation = messages
        .filter(m => m.content.trim())
        .map(m => `${m.role === 'user' ? 'You' : 'Cosmo'}: ${m.content}`)
        .join('\n\n');
      if (conversation && recordStudyNote(`Saved Cosmo conversation about ${body.name}`, conversation)) {
        setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'cosmo', content: `Saved this ${body.name} conversation in My Notes! 📚` }]);
      }
      return;
    }
    const ctx = `The user is asking about the celestial body "${body.name}" (${body.type}). Background: ${body.longDescription} Cool fact: ${body.coolFact} Extended: ${body.extendedFacts.join(' ')}. Answer ANY question they have — about ${body.name} specifically, related space topics, or anything else they wonder. Be warm, kid-friendly, and clear.`;
    const history = messages.filter(m => m.content).map(m => ({ role: m.role === 'cosmo' ? 'assistant' : 'user', content: m.content }));
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'cosmo', content: '' }]);
    setIsStreaming(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'system', content: ctx }, ...history, { role: 'user', content: text }],
          language: 'en',
          targetLanguageName: 'English',
        }),
      });
      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error('Too many questions! Try again in a moment.');
        if (resp.status === 402) throw new Error('Cosmo needs a recharge.');
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
      if (assistantText.trim()) {
        recordStudyNote(text, assistantText.trim());
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card max-w-lg w-full rounded-2xl p-5 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl animate-pulse">
              🤖
            </div>
            <div>
              <h3 className="font-display font-bold">Cosmo • {body.name}</h3>
              <p className="text-xs text-muted-foreground">Ask any doubt about {body.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 min-h-[200px]">
          {messages.map((m, i) => {
            const isCosmo = m.role === 'cosmo';
            const hasContent = !!m.content?.trim();
            const isLastStreaming = isStreaming && i === messages.length - 1;
            const canSave = isCosmo && hasContent && !isLastStreaming;
            const isSaved = savedIdx.has(i);
            return (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-foreground'
                  }`}
                >
                  {m.content || (isLastStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : null)}
                </div>
                {canSave && (
                  <Button
                    size="sm"
                    variant={isSaved ? 'secondary' : 'outline'}
                    onClick={() => saveAsNote(i)}
                    disabled={isSaved}
                    className="mt-1 h-7 text-[11px] gap-1"
                  >
                    {isSaved ? (
                      <><Check className="w-3 h-3" /> Saved as note</>
                    ) : (
                      <><BookmarkPlus className="w-3 h-3" /> Save as study note (+{NOTE_REWARD} 🪙)</>
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {[`Tell me more about ${body.name}`, `Fun facts about ${body.name}`, `How big is ${body.name}?`].map(s => (
            <Button key={s} size="sm" variant="outline" className="text-xs h-7" disabled={isStreaming} onClick={() => ask(s)}>
              {s}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder={`Ask any doubt about ${body.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
            disabled={isStreaming}
          />
          <Button size="icon" onClick={() => ask()} disabled={isStreaming || !input.trim()}>
            {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            variant={isSpeaking ? 'destructive' : 'outline'}
            onClick={() => isSpeaking ? stopSpeaking() : speak(messages[messages.length - 1]?.content || '')}
            title="Listen to last reply"
          >
            <MessageCircle className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const CelestialCard = ({ body, onSelect }: CelestialCardProps) => {
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [showCosmoModal, setShowCosmoModal] = useState(false);
  
  return (
    <>
      <div className="glass-card p-4 rounded-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:border-primary/50">
        <div className="text-center mb-3">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
            {body.icon}
          </div>
          <h3 className="font-display font-bold text-sm mb-1 group-hover:text-primary transition-colors">
            {body.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {body.description}
          </p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${colorClasses[body.color] ?? colorClasses.primary}`}>
            {body.type}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-muted">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setShowReadMoreModal(true)}
            className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 text-xs hover:bg-secondary/10"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Read</span>
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setShowCosmoModal(true)}
            className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 text-xs hover:bg-accent/10"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px]">Cosmo</span>
          </Button>
        </div>
      </div>
      
      {showReadMoreModal && (
        <ReadMoreModal body={body} onClose={() => setShowReadMoreModal(false)} />
      )}
      {showCosmoModal && (
        <CosmoModal body={body} onClose={() => setShowCosmoModal(false)} />
      )}
    </>
  );
};

export default CelestialCard;
