import { lazy, Suspense } from 'react';
import EnhancedStarField from '@/components/EnhancedStarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DailyFactWidget from '@/components/DailyFactWidget';
import CoinDisplay from '@/components/CoinDisplay';
import AccountBar from '@/components/AccountBar';
import BackToTop from '@/components/BackToTop';
import AnimatedSection from '@/components/AnimatedSection';
import ExplorationProgress from '@/components/ExplorationProgress';
import PerksFX from '@/components/PerksFX';
import PerkBadgeRow from '@/components/PerkBadgeRow';
import ProgressTracker from '@/components/ProgressTracker';
import DailyChallenges from '@/components/DailyChallenges';
import Footer from '@/components/Footer';

// Lazy-load heavy below-the-fold sections to keep initial load snappy
const SolarSystem3D = lazy(() => import('@/components/SolarSystem3D'));
const CelestialExplorer = lazy(() => import('@/components/CelestialExplorer'));
const SpaceTimeline = lazy(() => import('@/components/SpaceTimeline'));
const SpaceQnA = lazy(() => import('@/components/SpaceQnA'));
const ConstellationViewer = lazy(() => import('@/components/ConstellationViewer'));
const CourseSection = lazy(() => import('@/components/CourseSection'));
const LibrarySection = lazy(() => import('@/components/LibrarySection'));
const GamesSection = lazy(() => import('@/components/GamesSection'));
const PremiumGamesSection = lazy(() => import('@/components/PremiumGamesSection'));
const FunFactsSection = lazy(() => import('@/components/FunFactsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const CosmoAssistant = lazy(() => import('@/components/CosmoAssistant'));
const AlienDoom = lazy(() => import('@/components/AlienDoom'));
const SpaceAmbience = lazy(() => import('@/components/SpaceAmbience'));
const GamePassSection = lazy(() => import('@/components/GamePassSection'));
const SubscriptionSection = lazy(() => import('@/components/SubscriptionSection'));
const CertificateShowcase = lazy(() => import('@/components/CertificateShowcase'));
const FeaturedShop = lazy(() => import('@/components/FeaturedShop'));
const ManuscriptsSection = lazy(() => import('@/components/ManuscriptsSection'));
const PeriodicTableSidebar = lazy(() => import('@/components/PeriodicTableSidebar'));
const StudyPlanner = lazy(() => import('@/components/StudyPlanner'));
const Leaderboard = lazy(() => import('@/components/Leaderboard'));
const StudyNotesViewer = lazy(() => import('@/components/StudyNotesViewer'));
const ExclusiveWebinars = lazy(() => import('@/components/ExclusiveWebinars'));

const SectionFallback = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="h-40 rounded-xl bg-card/20 animate-pulse" />
  </div>
);

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionFallback />}>{children}</Suspense>
);

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <EnhancedStarField />
      <PerksFX />
      <Navigation />
      <CoinDisplay />
      <AccountBar />
      <PerkBadgeRow />
      <ExplorationProgress />
      <Suspense fallback={null}><StudyNotesViewer /></Suspense>

      <main className="relative z-10">
        <HeroSection />
        <AnimatedSection>
          <ProgressTracker />
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><SolarSystem3D /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <DailyFactWidget />
        </AnimatedSection>
        <AnimatedSection>
          <DailyChallenges />
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><SpaceQnA /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><CelestialExplorer /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><SpaceTimeline /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><ConstellationViewer /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><CourseSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><Leaderboard /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><StudyPlanner /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><ManuscriptsSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><LibrarySection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><GamesSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><PremiumGamesSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><GamePassSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><SubscriptionSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><ExclusiveWebinars /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><FeaturedShop /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><CertificateShowcase /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><FunFactsSection /></Lazy>
        </AnimatedSection>
        <AnimatedSection>
          <Lazy><AboutSection /></Lazy>
        </AnimatedSection>
      </main>

      <Footer />
      <Suspense fallback={null}><CosmoAssistant /></Suspense>
      <Suspense fallback={null}><AlienDoom /></Suspense>
      <Suspense fallback={null}><SpaceAmbience /></Suspense>
      <BackToTop />
      <Suspense fallback={null}><PeriodicTableSidebar /></Suspense>
    </div>
  );
};

export default Index;
