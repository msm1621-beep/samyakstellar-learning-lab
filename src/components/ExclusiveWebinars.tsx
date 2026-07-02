import { motion } from 'framer-motion';
import { Video, Lock, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { usePerks } from '@/contexts/PerksContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface Webinar {
  id: string;
  title: string;
  host: string;
  date: string;
  duration: string;
  requiredTier: number;
  topic: string;
  emoji: string;
  url: string;
}

const WEBINARS: Webinar[] = [
  {
    id: 'mars-2026',
    title: 'Mars Colonization: 2026 Roadmap',
    host: 'Dr. Aria Patel, NASA JPL',
    date: 'Jun 15, 2026 · 7:00 PM IST',
    duration: '60 min',
    requiredTier: 6,
    topic: 'Mars',
    emoji: '🪐',
    url: 'https://www.youtube.com/results?search_query=mars+colonization+webinar',
  },
  {
    id: 'jwst-live',
    title: 'JWST Deep Field Live Decode',
    host: 'Prof. Lin Chen, STScI',
    date: 'Jun 22, 2026 · 6:30 PM IST',
    duration: '75 min',
    requiredTier: 7,
    topic: 'Telescopes',
    emoji: '🔭',
    url: 'https://www.youtube.com/results?search_query=jwst+live+webinar',
  },
  {
    id: 'black-hole',
    title: 'Inside a Black Hole: Sagittarius A*',
    host: 'Dr. Kip Marlowe, Event Horizon Team',
    date: 'Jul 4, 2026 · 8:00 PM IST',
    duration: '90 min',
    requiredTier: 8,
    topic: 'Black Holes',
    emoji: '🕳️',
    url: 'https://www.youtube.com/results?search_query=black+hole+sagittarius+webinar',
  },
  {
    id: 'exoplanets',
    title: 'Finding Earth 2.0 — Exoplanet Hunters',
    host: 'Dr. Sara Seager, MIT',
    date: 'Jul 18, 2026 · 7:30 PM IST',
    duration: '60 min',
    requiredTier: 9,
    topic: 'Exoplanets',
    emoji: '🌍',
    url: 'https://www.youtube.com/results?search_query=exoplanets+webinar+sara+seager',
  },
  {
    id: 'artemis-live',
    title: 'Artemis III: Live Astronaut Q&A',
    host: 'Cmdr. Reid Wiseman, NASA',
    date: 'Aug 1, 2026 · 9:00 PM IST',
    duration: '120 min',
    requiredTier: 10,
    topic: 'Crewed Spaceflight',
    emoji: '🚀',
    url: 'https://www.youtube.com/@NASA',
  },
  {
    id: 'iss-tour',
    title: 'Virtual ISS Tour with Sunita Williams',
    host: 'Astronaut Sunita Williams',
    date: 'Aug 12, 2026 · 6:00 PM IST',
    duration: '45 min',
    requiredTier: 10,
    topic: 'Space Station',
    emoji: '🛰️',
    url: 'https://www.youtube.com/@NASA',
  },
];

const ExclusiveWebinars = () => {
  const { webinarTier, hasWebinarAccess } = usePerks();

  return (
    <section className="py-16 px-4" id="webinars">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-8 h-8 text-fuchsia-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-amber-400 text-transparent bg-clip-text">
              Exclusive Live Webinars
            </h2>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            AI-generated live sessions with virtual astronauts and scientists — exclusive to VIP members with the Star Collector badge.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-200">
            <Sparkles className="w-3 h-3" /> AI-generated · VIP only
          </div>
          <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-slate-900/60 border border-white/10 text-white/70 ml-2">
            Your access tier: <span className="text-amber-300 font-bold">{webinarTier || '—'}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WEBINARS.map((w, idx) => {
            const unlocked = hasWebinarAccess && webinarTier >= w.requiredTier;
            return (
              <motion.div
                key={w.id}
                className={`relative rounded-2xl p-5 border overflow-hidden ${
                  unlocked
                    ? 'bg-gradient-to-br from-slate-900/90 to-fuchsia-900/30 border-fuchsia-500/40'
                    : 'bg-slate-900/70 border-white/10'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {!unlocked && (
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-slate-950/40 z-10 flex items-center justify-center">
                    <div className="text-center px-4">
                      <Lock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-white text-sm font-semibold">
                        Requires VIP tier {w.requiredTier}+
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        Unlock via Subscriptions section
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-4xl mb-2">{w.emoji}</div>
                <div className="flex items-center gap-2 text-xs text-fuchsia-300 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/20">{w.topic}</span>
                  <span>Tier {w.requiredTier}+</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{w.title}</h3>
                <p className="text-white/60 text-sm mb-3">{w.host}</p>
                <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>{w.date}</span>
                  <span>· {w.duration}</span>
                </div>
                <Button
                  onClick={() => {
                    if (!unlocked) return;
                    window.open(w.url, '_blank', 'noopener,noreferrer');
                    toast({ title: `🎟️ Joining: ${w.title}` });
                  }}
                  disabled={!unlocked}
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-amber-500 hover:opacity-90"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Live
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveWebinars;
