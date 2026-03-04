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
import QuickAccessToolbar from '@/components/QuickAccessToolbar';
import GiftVoucherSection from '@/components/GiftVoucherSection';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <EnhancedStarField />
      <Navigation />
      <CoinDisplay />
      <AccountBar />
      <QuickAccessToolbar />
      
      <main className="relative z-10">
        <HeroSection />
        <SolarSystem3D />
        <DailyFactWidget />
        <SpaceQnA />
        <CelestialExplorer />
        <SpaceTimeline />
        <ConstellationViewer />
        <CourseSection />
        <GiftVoucherSection />
        <LibrarySection />
        <GamesSection />
        <PremiumGamesSection />
        <GamePassSection />
        <FeaturedShop />
        <CertificateShowcase />
        <SubscriptionSection />
        <FunFactsSection />
        <AboutSection />
      </main>
      
      <Footer />
      <CosmoAssistant />
      <AlienDoom />
      <SpaceAmbience />
    </div>
  );
};

export default Index;
