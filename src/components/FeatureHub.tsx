import { motion } from 'framer-motion';
import {
  Rocket, Globe2, Sparkles, Telescope, Clock, Stars, GraduationCap, Trophy,
  CalendarCheck, ScrollText, BookOpen, Gamepad2, Crown, Ticket, Video,
  ShoppingBag, Sprout, Award, Lightbulb, Info, BarChart3, MessageCircle,
  FlaskConical, Music,
} from 'lucide-react';

interface Feature {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  gradient: string; // tailwind gradient stops
  ring: string; // ring color
}

const FEATURES: Feature[] = [
  { id: 'progress-tracker', label: 'Progress',       href: '#progress-tracker', icon: BarChart3,      gradient: 'from-emerald-500 to-teal-500',   ring: 'ring-emerald-400/40' },
  { id: 'solar-system-3d',  label: '3D Solar System',href: '#solar-system-3d',  icon: Globe2,         gradient: 'from-sky-500 to-indigo-500',     ring: 'ring-sky-400/40' },
  { id: 'facts',            label: 'Daily Fact',     href: '#facts',            icon: Lightbulb,      gradient: 'from-amber-400 to-orange-500',   ring: 'ring-amber-400/40' },
  { id: 'space-qna',        label: 'Ask Cosmo',      href: '#space-qna',        icon: MessageCircle,  gradient: 'from-fuchsia-500 to-purple-500', ring: 'ring-fuchsia-400/40' },
  { id: 'explorer',         label: 'Celestial Explorer', href: '#explorer',     icon: Telescope,      gradient: 'from-cyan-500 to-blue-500',      ring: 'ring-cyan-400/40' },
  { id: 'timeline',         label: 'Timeline',       href: '#timeline',         icon: Clock,          gradient: 'from-rose-500 to-pink-500',      ring: 'ring-rose-400/40' },
  { id: 'constellations',   label: 'Constellations', href: '#constellations',   icon: Stars,          gradient: 'from-indigo-500 to-violet-500',  ring: 'ring-indigo-400/40' },
  { id: 'courses',          label: 'Courses',        href: '#courses',          icon: GraduationCap,  gradient: 'from-blue-500 to-cyan-500',      ring: 'ring-blue-400/40' },
  { id: 'leaderboard',      label: 'Leaderboard',    href: '#leaderboard',      icon: Trophy,         gradient: 'from-yellow-500 to-amber-500',   ring: 'ring-yellow-400/40' },
  { id: 'study-planner',    label: 'Study Planner',  href: '#study-planner',    icon: CalendarCheck,  gradient: 'from-green-500 to-emerald-500',  ring: 'ring-green-400/40' },
  { id: 'manuscripts',      label: 'Manuscripts',    href: '#manuscripts',      icon: ScrollText,     gradient: 'from-amber-600 to-yellow-600',   ring: 'ring-amber-500/40' },
  { id: 'library',          label: 'Library',        href: '#library',          icon: BookOpen,       gradient: 'from-purple-500 to-pink-500',    ring: 'ring-purple-400/40' },
  { id: 'games',            label: 'Learning Games', href: '#games',            icon: Gamepad2,       gradient: 'from-lime-500 to-green-500',     ring: 'ring-lime-400/40' },
  { id: 'premium-games',    label: 'Premium Games',  href: '#premium-games',    icon: Crown,          gradient: 'from-orange-500 to-red-500',     ring: 'ring-orange-400/40' },
  { id: 'game-passes',      label: 'Game Passes',    href: '#game-passes',      icon: Ticket,         gradient: 'from-cyan-500 to-teal-500',      ring: 'ring-cyan-400/40' },
  { id: 'subscriptions',    label: 'VIP',            href: '#subscriptions',    icon: Sparkles,       gradient: 'from-amber-500 to-fuchsia-500',  ring: 'ring-amber-400/40' },
  { id: 'webinars',         label: 'Webinars',       href: '#webinars',         icon: Video,          gradient: 'from-fuchsia-500 to-amber-500',  ring: 'ring-fuchsia-400/40' },
  { id: 'shop',             label: 'Shop',           href: '#shop',             icon: ShoppingBag,    gradient: 'from-pink-500 to-purple-500',    ring: 'ring-pink-400/40' },
  { id: 'alien-pets',       label: 'Alien Pets',     href: '#alien-pets',       icon: Sprout,         gradient: 'from-emerald-500 to-lime-500',   ring: 'ring-emerald-400/40' },
  { id: 'achievements',     label: 'Trophies',       href: '#achievements',     icon: Award,          gradient: 'from-yellow-400 to-orange-500',  ring: 'ring-yellow-400/40' },
  { id: 'about',            label: 'About',          href: '#about',            icon: Info,           gradient: 'from-slate-500 to-slate-700',    ring: 'ring-slate-400/40' },
  { id: 'periodic',         label: 'Periodic Table', href: '#periodic-toggle',  icon: FlaskConical,   gradient: 'from-teal-500 to-cyan-500',      ring: 'ring-teal-400/40' },
  { id: 'music',            label: 'Music',          href: '#music-toggle',     icon: Music,          gradient: 'from-purple-500 to-pink-500',    ring: 'ring-purple-400/40' },
  { id: 'dream',            label: 'Dream Journey',  href: '/dream-journey',    icon: Rocket,         gradient: 'from-violet-500 to-fuchsia-500', ring: 'ring-violet-400/40' },
];

const FeatureHub = () => {
  const go = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="feature-hub" className="py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 mb-3">
            <Sparkles className="w-3 h-3 text-amber-300" /> Feature Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 text-transparent bg-clip-text">
            Every Feature, One Tap Away
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm">
            Jump straight to any part of Cosmic Classroom — courses, games, webinars, pets, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.button
                key={f.id}
                onClick={() => go(f.href)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02, 0.4) }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={f.label}
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg shadow-black/30 ring-1 ${f.ring} group-hover:ring-4 transition-all`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow" />
                </div>
                <span className="text-[11px] md:text-xs font-medium text-white/80 text-center leading-tight group-hover:text-white">
                  {f.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureHub;
