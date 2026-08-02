import { lazy, Suspense, useState } from 'react';
import EnhancedStarField from '@/components/EnhancedStarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CoinDisplay from '@/components/CoinDisplay';
import AccountBar from '@/components/AccountBar';
import BackToTop from '@/components/BackToTop';
import AnimatedSection from '@/components/AnimatedSection';
import ExplorationProgress from '@/components/ExplorationProgress';
import PerksFX from '@/components/PerksFX';
import PerkBadgeRow from '@/components/PerkBadgeRow';
import Footer from '@/components/Footer';
import FeatureHub, { type FeatureAction, type FeatureKey } from '@/components/FeatureHub';
import FeatureOverlay from '@/components/FeatureOverlay';

const CosmoAssistant = lazy(() => import('@/components/CosmoAssistant'));
const AlienDoom = lazy(() => import('@/components/AlienDoom'));
const SpaceAmbience = lazy(() => import('@/components/SpaceAmbience'));
const PeriodicTableSidebar = lazy(() => import('@/components/PeriodicTableSidebar'));
const StudyNotesViewer = lazy(() => import('@/components/StudyNotesViewer'));
const ProgressBadges = lazy(() => import('@/components/ProgressBadges'));

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey | null>(null);

  const handleSelect = (action: FeatureAction) => {
    if (action.kind === 'open') {
      setActiveFeature(action.key);
    } else if (action.kind === 'route') {
      window.location.href = action.href;
    } else if (action.kind === 'toggle') {
      window.dispatchEvent(new CustomEvent(action.target === 'periodic' ? 'open-periodic' : 'open-music'));
    }
  };

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
          <FeatureHub onSelect={handleSelect} />
        </AnimatedSection>
      </main>

      <Footer />
      <Suspense fallback={null}><CosmoAssistant /></Suspense>
      <Suspense fallback={null}><AlienDoom /></Suspense>
      <Suspense fallback={null}><SpaceAmbience /></Suspense>
      <BackToTop />
      <Suspense fallback={null}><PeriodicTableSidebar /></Suspense>

      <FeatureOverlay featureKey={activeFeature} onClose={() => setActiveFeature(null)} />
    </div>
  );
};

export default Index;
