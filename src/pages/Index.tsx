import EnhancedStarField from '@/components/EnhancedStarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SolarSystem3D from '@/components/SolarSystem3D';
import CelestialExplorer from '@/components/CelestialExplorer';
import SpaceTimeline from '@/components/SpaceTimeline';
import DailyFactWidget from '@/components/DailyFactWidget';
import SpaceQnA from '@/components/SpaceQnA';
import ConstellationViewer from '@/components/ConstellationViewer';
import CourseSection from '@/components/CourseSection';
import LibrarySection from '@/components/LibrarySection';
import GamesSection from '@/components/GamesSection';
import PremiumGamesSection from '@/components/PremiumGamesSection';
import FunFactsSection from '@/components/FunFactsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import CosmoAssistant from '@/components/CosmoAssistant';
import AlienDoom from '@/components/AlienDoom';
import SpaceAmbience from '@/components/SpaceAmbience';
import CoinDisplay from '@/components/CoinDisplay';
import SubscriptionSection from '@/components/SubscriptionSection';
import AccountBar from '@/components/AccountBar';
import GamePassSection from '@/components/GamePassSection';
import CertificateShowcase from '@/components/CertificateShowcase';
import FeaturedShop from '@/components/FeaturedShop';
import GiftVoucherSection from '@/components/GiftVoucherSection';
import ManuscriptsSection from '@/components/ManuscriptsSection';
import BackToTop from '@/components/BackToTop';
import AnimatedSection from '@/components/AnimatedSection';
import ExplorationProgress from '@/components/ExplorationProgress';
import PeriodicTableSidebar from '@/components/PeriodicTableSidebar';
import StudyPlanner from '@/components/StudyPlanner';
import Leaderboard from '@/components/Leaderboard';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <EnhancedStarField />
      <Navigation />
      <CoinDisplay />
      <AccountBar />
      <ExplorationProgress />

      <main className="relative z-10">
        <HeroSection />
        <AnimatedSection>
          <SolarSystem3D />
        </AnimatedSection>
        <AnimatedSection>
          <DailyFactWidget />
        </AnimatedSection>
        <AnimatedSection>
          <SpaceQnA />
        </AnimatedSection>
        <AnimatedSection>
          <CelestialExplorer />
        </AnimatedSection>
        <AnimatedSection>
          <SpaceTimeline />
        </AnimatedSection>
        <AnimatedSection>
          <ConstellationViewer />
        </AnimatedSection>
        <AnimatedSection>
          <CourseSection />
        </AnimatedSection>
        <AnimatedSection>
          <Leaderboard />
        </AnimatedSection>
        <AnimatedSection>
          <GiftVoucherSection />
        </AnimatedSection>
        <AnimatedSection>
          <StudyPlanner />
        </AnimatedSection>
        <AnimatedSection>
          <ManuscriptsSection />
        </AnimatedSection>
        <AnimatedSection>
          <LibrarySection />
        </AnimatedSection>
        <AnimatedSection>
          <GamesSection />
        </AnimatedSection>
        <AnimatedSection>
          <PremiumGamesSection />
        </AnimatedSection>
        <AnimatedSection>
          <GamePassSection />
        </AnimatedSection>
        <AnimatedSection>
          <FeaturedShop />
        </AnimatedSection>
        <AnimatedSection>
          <CertificateShowcase />
        </AnimatedSection>
        <AnimatedSection>
          <SubscriptionSection />
        </AnimatedSection>
        <AnimatedSection>
          <FunFactsSection />
        </AnimatedSection>
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>
      </main>

      <Footer />
      <CosmoAssistant />
      <AlienDoom />
      <SpaceAmbience />
      <BackToTop />
      <PeriodicTableSidebar />
    </div>
  );
};

export default Index;
