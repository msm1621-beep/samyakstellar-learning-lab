import { motion } from 'framer-motion';
import {
  Rocket, Globe2, Sparkles, Telescope, Clock, Stars, GraduationCap, Trophy,
  CalendarCheck, ScrollText, BookOpen, Gamepad2, Crown, Ticket,
  ShoppingBag, Sprout, Award, Lightbulb, Info, BarChart3, Search,
  FlaskConical, Music, Target, Sparkle, School, Star, Settings as SettingsIcon,
} from 'lucide-react';

export type FeatureKey =
  | 'progress-tracker' | 'daily-challenges' | 'fun-facts' | 'solar-system-3d'
  | 'facts' | 'space-qna' | 'explorer' | 'timeline' | 'constellations'
  | 'courses' | 'leaderboard' | 'study-planner' | 'manuscripts' | 'library'
   | 'games' | 'premium-games' | 'game-passes' | 'subscriptions'
  | 'academy' | 'shop' | 'alien-pets' | 'achievements' | 'about' | 'favorites';

export type FeatureAction =
  | { kind: 'open'; key: FeatureKey }
  | { kind: 'route'; href: string }
  | { kind: 'toggle'; target: 'periodic' | 'music' };

interface Feature {
  id: string;
  label: string;
  icon: React.ElementType;
  gradient: string;
  ring: string;
  action: FeatureAction;
}

const FEATURES: Feature[] = [
  { id: 'favorites',        label: 'Favorites',          icon: Star,          gradient: 'from-amber-400 to-yellow-500',   ring: 'ring-amber-400/40',   action: { kind: 'open', key: 'favorites' } },
  { id: 'progress-tracker', label: 'Progress',           icon: BarChart3,     gradient: 'from-emerald-500 to-teal-500',   ring: 'ring-emerald-400/40', action: { kind: 'open', key: 'progress-tracker' } },
  { id: 'daily-challenges', label: 'Daily Missions',     icon: Target,        gradient: 'from-red-500 to-rose-500',       ring: 'ring-red-400/40',     action: { kind: 'open', key: 'daily-challenges' } },
  { id: 'fun-facts',        label: 'Fun Facts',          icon: Sparkle,       gradient: 'from-pink-400 to-fuchsia-500',   ring: 'ring-pink-400/40',    action: { kind: 'open', key: 'fun-facts' } },
  { id: 'solar-system-3d',  label: '3D Solar System',    icon: Globe2,        gradient: 'from-sky-500 to-indigo-500',     ring: 'ring-sky-400/40',     action: { kind: 'open', key: 'solar-system-3d' } },
  { id: 'facts',            label: 'Daily Fact',         icon: Lightbulb,     gradient: 'from-amber-400 to-orange-500',   ring: 'ring-amber-400/40',   action: { kind: 'open', key: 'facts' } },
  { id: 'space-qna',        label: 'Doubt Search',       icon: Search,        gradient: 'from-fuchsia-500 to-purple-500', ring: 'ring-fuchsia-400/40', action: { kind: 'open', key: 'space-qna' } },
  { id: 'explorer',         label: 'Celestial Explorer', icon: Telescope,     gradient: 'from-cyan-500 to-blue-500',      ring: 'ring-cyan-400/40',    action: { kind: 'open', key: 'explorer' } },
  { id: 'timeline',         label: 'Timeline',           icon: Clock,         gradient: 'from-rose-500 to-pink-500',      ring: 'ring-rose-400/40',    action: { kind: 'open', key: 'timeline' } },
  { id: 'constellations',   label: 'Constellations',     icon: Stars,         gradient: 'from-indigo-500 to-violet-500',  ring: 'ring-indigo-400/40',  action: { kind: 'open', key: 'constellations' } },
  { id: 'courses',          label: 'Courses',            icon: GraduationCap, gradient: 'from-blue-500 to-cyan-500',      ring: 'ring-blue-400/40',    action: { kind: 'open', key: 'courses' } },
  { id: 'academy',          label: 'Premium Academy',   icon: School,        gradient: 'from-emerald-500 to-cyan-500',   ring: 'ring-emerald-400/40', action: { kind: 'open', key: 'academy' } },
  { id: 'leaderboard',      label: 'Leaderboard',        icon: Trophy,        gradient: 'from-yellow-500 to-amber-500',   ring: 'ring-yellow-400/40',  action: { kind: 'open', key: 'leaderboard' } },
  { id: 'study-planner',    label: 'Study Planner',      icon: CalendarCheck, gradient: 'from-green-500 to-emerald-500',  ring: 'ring-green-400/40',   action: { kind: 'open', key: 'study-planner' } },
  { id: 'manuscripts',      label: 'Manuscripts',        icon: ScrollText,    gradient: 'from-amber-600 to-yellow-600',   ring: 'ring-amber-500/40',   action: { kind: 'open', key: 'manuscripts' } },
  { id: 'library',          label: 'Library',            icon: BookOpen,      gradient: 'from-purple-500 to-pink-500',    ring: 'ring-purple-400/40',  action: { kind: 'open', key: 'library' } },
  { id: 'games',            label: 'Learning Games',     icon: Gamepad2,      gradient: 'from-lime-500 to-green-500',     ring: 'ring-lime-400/40',    action: { kind: 'open', key: 'games' } },
  { id: 'premium-games',    label: 'Premium Games',      icon: Crown,         gradient: 'from-orange-500 to-red-500',     ring: 'ring-orange-400/40',  action: { kind: 'open', key: 'premium-games' } },
  { id: 'game-passes',      label: 'Game Passes',        icon: Ticket,        gradient: 'from-cyan-500 to-teal-500',      ring: 'ring-cyan-400/40',    action: { kind: 'open', key: 'game-passes' } },
  { id: 'subscriptions',    label: 'VIP',                icon: Sparkles,      gradient: 'from-amber-500 to-fuchsia-500',  ring: 'ring-amber-400/40',   action: { kind: 'open', key: 'subscriptions' } },
  { id: 'shop',             label: 'Shop',               icon: ShoppingBag,   gradient: 'from-pink-500 to-purple-500',    ring: 'ring-pink-400/40',    action: { kind: 'open', key: 'shop' } },
  { id: 'alien-pets',       label: 'Alien Pets',         icon: Sprout,        gradient: 'from-emerald-500 to-lime-500',   ring: 'ring-emerald-400/40', action: { kind: 'open', key: 'alien-pets' } },
  { id: 'achievements',     label: 'Trophies',           icon: Award,         gradient: 'from-yellow-400 to-orange-500',  ring: 'ring-yellow-400/40',  action: { kind: 'open', key: 'achievements' } },
  { id: 'about',            label: 'About',              icon: Info,          gradient: 'from-slate-500 to-slate-700',    ring: 'ring-slate-400/40',   action: { kind: 'open', key: 'about' } },
  { id: 'periodic',         label: 'Periodic Table',     icon: FlaskConical,  gradient: 'from-teal-500 to-cyan-500',      ring: 'ring-teal-400/40',    action: { kind: 'toggle', target: 'periodic' } },
  { id: 'music',            label: 'Music',              icon: Music,         gradient: 'from-purple-500 to-pink-500',    ring: 'ring-purple-400/40',  action: { kind: 'toggle', target: 'music' } },
  { id: 'dream',            label: 'Dream Journey',      icon: Rocket,        gradient: 'from-violet-500 to-fuchsia-500', ring: 'ring-violet-400/40',  action: { kind: 'route', href: '/dream-journey' } },
  { id: 'settings',         label: 'Settings',           icon: SettingsIcon,  gradient: 'from-slate-500 to-zinc-600',     ring: 'ring-slate-400/40',   action: { kind: 'route', href: '/settings' } },
];

interface Props {
  onSelect: (action: FeatureAction) => void;
}

const FeatureHub = ({ onSelect }: Props) => {
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
            Tap a logo to open that feature. Nothing else clutters your view.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.button
                key={f.id}
                onClick={() => onSelect(f.action)}
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
