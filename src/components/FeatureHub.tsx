import { motion } from 'framer-motion';
import {
  Award, BarChart3, BookOpen, CalendarCheck, Clock, FlaskConical, Gamepad2,
  Globe2, Info, Lightbulb, Music, Search, Settings, ShoppingBag, Sparkle,
  Sprout, Star, Stars, Target, Telescope, Ticket, Trophy, GraduationCap,
  ScrollText, Crown, Rocket,
} from 'lucide-react';

export type FeatureKey =
  | 'favorites' | 'progress-tracker' | 'daily-challenges' | 'fun-facts'
  | 'solar-system-3d' | 'facts' | 'space-qna' | 'explorer' | 'timeline'
  | 'constellations' | 'courses' | 'leaderboard' | 'study-planner'
  | 'manuscripts' | 'library' | 'games' | 'premium-games' | 'game-passes'
  | 'shop' | 'alien-pets' | 'achievements' | 'about';

export type FeatureAction =
  | { kind: 'open'; key: FeatureKey }
  | { kind: 'route'; href: string }
  | { kind: 'toggle'; target: 'periodic' | 'music' };

type Feature = { id: string; label: string; icon: React.ElementType; gradient: string; action: FeatureAction };

const FEATURE_ROWS: Array<[FeatureKey, string, React.ElementType, string]> = [
  ['favorites', 'Favorites', Star, 'from-amber-400 to-yellow-500'],
  ['progress-tracker', 'Progress', BarChart3, 'from-emerald-500 to-teal-500'],
  ['daily-challenges', 'Daily Missions', Target, 'from-red-500 to-rose-500'],
  ['fun-facts', 'Fun Facts', Sparkle, 'from-pink-400 to-fuchsia-500'],
  ['solar-system-3d', '3D Solar System', Globe2, 'from-sky-500 to-indigo-500'],
  ['facts', 'Daily Fact', Lightbulb, 'from-amber-400 to-orange-500'],
  ['space-qna', 'Doubt Search', Search, 'from-fuchsia-500 to-purple-500'],
  ['explorer', 'Celestial Explorer', Telescope, 'from-cyan-500 to-blue-500'],
  ['timeline', 'Timeline', Clock, 'from-rose-500 to-pink-500'],
  ['constellations', 'Constellations', Stars, 'from-indigo-500 to-violet-500'],
  ['courses', 'Courses', GraduationCap, 'from-blue-500 to-cyan-500'],
  ['leaderboard', 'Leaderboard', Trophy, 'from-yellow-500 to-amber-500'],
  ['study-planner', 'Study Planner', CalendarCheck, 'from-green-500 to-emerald-500'],
  ['manuscripts', 'Manuscripts', ScrollText, 'from-amber-600 to-yellow-600'],
  ['library', 'Library', BookOpen, 'from-purple-500 to-pink-500'],
  ['games', 'Learning Games', Gamepad2, 'from-lime-500 to-green-500'],
  ['premium-games', 'Premium Games', Crown, 'from-orange-500 to-red-500'],
  ['game-passes', 'Game Passes', Ticket, 'from-cyan-500 to-teal-500'],
  ['shop', 'Featured Shop', ShoppingBag, 'from-pink-500 to-purple-500'],
  ['alien-pets', 'Alien Pets', Sprout, 'from-emerald-500 to-lime-500'],
  ['achievements', 'Trophies', Award, 'from-yellow-400 to-orange-500'],
  ['about', 'About', Info, 'from-slate-500 to-slate-700'],
];

const FEATURES: Feature[] = FEATURE_ROWS.map(([id, label, icon, gradient]) => ({
  id,
  label,
  icon,
  gradient,
  action: { kind: 'open', key: id },
}));

const FeatureHub = ({ onSelect }: { onSelect: (action: FeatureAction) => void }) => (
  <section id="feature-hub" className="py-14 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 mb-3"><Sparkle className="w-3 h-3 text-amber-300" /> Feature Hub</div>
        <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 text-transparent bg-clip-text">Every Feature, One Tap Away</h2>
        <p className="text-white/60 max-w-2xl mx-auto mt-2 text-sm">Membership perks and premium features are now available in the Featured Shop.</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
        {FEATURES.map((feature, index) => { const Icon = feature.icon; return <motion.button key={feature.id} onClick={() => onSelect(feature.action)} className="group flex flex-col items-center gap-2 focus:outline-none" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .02, .4) }} whileHover={{ y: -3 }} whileTap={{ scale: .95 }} aria-label={feature.label}><div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-black/30 ring-1 ring-white/20 group-hover:ring-4`}><Icon className="w-7 h-7 md:w-8 md:h-8 text-white" /></div><span className="text-[11px] md:text-xs font-medium text-white/80 text-center leading-tight group-hover:text-white">{feature.label}</span></motion.button>; })}
      </div>
    </div>
  </section>
);

export default FeatureHub;
