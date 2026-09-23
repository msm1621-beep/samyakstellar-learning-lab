import { lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { FeatureKey } from './FeatureHub';

const components: Record<FeatureKey, React.LazyExoticComponent<React.ComponentType>> = {
  favorites: lazy(() => import('./FavoritesDashboard')),
  'progress-tracker': lazy(() => import('./ProgressTracker')),
  'daily-challenges': lazy(() => import('./DailyChallenges')),
  'fun-facts': lazy(() => import('./FunFactsSection')),
  'solar-system-3d': lazy(() => import('./SolarSystem3D')),
  facts: lazy(() => import('./DailyFactWidget')),
  'space-qna': lazy(() => import('./SpaceQnA')),
  explorer: lazy(() => import('./CelestialExplorer')),
  timeline: lazy(() => import('./SpaceTimeline')),
  constellations: lazy(() => import('./ConstellationViewer')),
  courses: lazy(() => import('./CourseSection')),
  leaderboard: lazy(() => import('./Leaderboard')),
  'study-planner': lazy(() => import('./StudyPlanner')),
  manuscripts: lazy(() => import('./ManuscriptsSection')),
  library: lazy(() => import('./LibrarySection')),
  games: lazy(() => import('./GamesSection')),
  'premium-games': lazy(() => import('./PremiumGamesSection')),
  'game-passes': lazy(() => import('./GamePassSection')),
  shop: lazy(() => import('./FeaturedShop')),
  'alien-pets': lazy(() => import('./AlienPetsSection')),
  achievements: lazy(() => import('./CertificateShowcase')),
  about: lazy(() => import('./AboutSection')),
};

const titles: Record<FeatureKey, string> = {
  favorites: 'Favorites & Dashboard', 'progress-tracker': 'Progress', 'daily-challenges': 'Daily Missions', 'fun-facts': 'Fun Facts', 'solar-system-3d': '3D Solar System', facts: 'Daily Fact', 'space-qna': 'Doubt Search', explorer: 'Celestial Explorer', timeline: 'Space Timeline', constellations: 'Constellations', courses: 'Courses', leaderboard: 'Leaderboard', 'study-planner': 'Study Planner', manuscripts: 'Manuscripts', library: 'Library', games: 'Learning Games', 'premium-games': 'Premium Games', 'game-passes': 'Game Passes', shop: 'Featured Shop', 'alien-pets': 'Alien Pets', achievements: 'Trophies', about: 'About',
};

const FeatureOverlay = ({ featureKey, onClose }: { featureKey: FeatureKey | null; onClose: () => void }) => {
  useEffect(() => {
    if (!featureKey) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [featureKey, onClose]);
  return <AnimatePresence>{featureKey && <motion.div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-3 bg-slate-950/80 border-b border-white/10 backdrop-blur"><h2 className="text-lg md:text-xl font-display font-bold text-white">{titles[featureKey]}</h2><button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80" aria-label="Close feature"><X className="w-5 h-5" /></button></div><Suspense fallback={<div className="py-24 text-center text-white/60">Loading…</div>}><div className="min-h-full">{(() => { const Component = components[featureKey]; return <Component />; })()}</div></Suspense></motion.div>}</AnimatePresence>;
};
export default FeatureOverlay;
