import { lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { FeatureKey } from './FeatureHub';

const ProgressTracker      = lazy(() => import('./ProgressTracker'));
const DailyChallenges      = lazy(() => import('./DailyChallenges'));
const FunFactsSection      = lazy(() => import('./FunFactsSection'));
const SolarSystem3D        = lazy(() => import('./SolarSystem3D'));
const DailyFactWidget      = lazy(() => import('./DailyFactWidget'));
const SpaceQnA             = lazy(() => import('./SpaceQnA'));
const CelestialExplorer    = lazy(() => import('./CelestialExplorer'));
const SpaceTimeline        = lazy(() => import('./SpaceTimeline'));
const ConstellationViewer  = lazy(() => import('./ConstellationViewer'));
const CourseSection        = lazy(() => import('./CourseSection'));
const AcademySection       = lazy(() => import('./AcademySection'));
const Leaderboard          = lazy(() => import('./Leaderboard'));
const StudyPlanner         = lazy(() => import('./StudyPlanner'));
const ManuscriptsSection   = lazy(() => import('./ManuscriptsSection'));
const LibrarySection       = lazy(() => import('./LibrarySection'));
const GamesSection         = lazy(() => import('./GamesSection'));
const PremiumGamesSection  = lazy(() => import('./PremiumGamesSection'));
const GamePassSection      = lazy(() => import('./GamePassSection'));
const SubscriptionSection  = lazy(() => import('./SubscriptionSection'));
const ExclusiveWebinars    = lazy(() => import('./ExclusiveWebinars'));
const FeaturedShop         = lazy(() => import('./FeaturedShop'));
const AlienPetsSection     = lazy(() => import('./AlienPetsSection'));
const CertificateShowcase  = lazy(() => import('./CertificateShowcase'));
const AboutSection         = lazy(() => import('./AboutSection'));

const REGISTRY: Record<FeatureKey, { title: string; Component: React.LazyExoticComponent<React.ComponentType> }> = {
  'progress-tracker': { title: 'Progress',           Component: ProgressTracker },
  'daily-challenges': { title: 'Daily Missions',     Component: DailyChallenges },
  'fun-facts':        { title: 'Fun Facts',          Component: FunFactsSection },
  'solar-system-3d':  { title: '3D Solar System',    Component: SolarSystem3D },
  'facts':            { title: 'Daily Fact',         Component: DailyFactWidget },
  'space-qna':        { title: 'Doubt Search',       Component: SpaceQnA },
  'explorer':         { title: 'Celestial Explorer', Component: CelestialExplorer },
  'timeline':         { title: 'Space Timeline',     Component: SpaceTimeline },
  'constellations':   { title: 'Constellations',     Component: ConstellationViewer },
  'courses':          { title: 'Courses',            Component: CourseSection },
  'academy':          { title: 'Premium Academy',  Component: AcademySection },
  'leaderboard':      { title: 'Leaderboard',        Component: Leaderboard },
  'study-planner':    { title: 'Study Planner',      Component: StudyPlanner },
  'manuscripts':      { title: 'Manuscripts',        Component: ManuscriptsSection },
  'library':          { title: 'Library',            Component: LibrarySection },
  'games':            { title: 'Learning Games',     Component: GamesSection },
  'premium-games':    { title: 'Premium Games',      Component: PremiumGamesSection },
  'game-passes':      { title: 'Game Passes',        Component: GamePassSection },
  'subscriptions':    { title: 'VIP',                Component: SubscriptionSection },
  'webinars':         { title: 'Webinars',           Component: ExclusiveWebinars },
  'shop':             { title: 'Shop',               Component: FeaturedShop },
  'alien-pets':       { title: 'Alien Pets',         Component: AlienPetsSection },
  'achievements':     { title: 'Trophies',           Component: CertificateShowcase },
  'about':            { title: 'About',              Component: AboutSection },
};

interface Props {
  featureKey: FeatureKey | null;
  onClose: () => void;
}

const FeatureOverlay = ({ featureKey, onClose }: Props) => {
  useEffect(() => {
    if (!featureKey) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [featureKey, onClose]);

  return (
    <AnimatePresence>
      {featureKey && (
        <motion.div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-3 bg-slate-950/80 border-b border-white/10 backdrop-blur">
            <h2 className="text-lg md:text-xl font-display font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 text-transparent bg-clip-text">
              {REGISTRY[featureKey].title}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition"
              aria-label="Close feature"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <motion.div
            key={featureKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-full"
          >
            <Suspense fallback={<div className="py-24 text-center text-white/60">Loading…</div>}>
              {(() => {
                const C = REGISTRY[featureKey].Component;
                return <C />;
              })()}
            </Suspense>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeatureOverlay;
