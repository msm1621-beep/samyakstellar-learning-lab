import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CelestialExplorer from '@/components/CelestialExplorer';
import SpaceTimeline from '@/components/SpaceTimeline';
import DailyFactWidget from '@/components/DailyFactWidget';
import ConstellationViewer from '@/components/ConstellationViewer';
import LibrarySection from '@/components/LibrarySection';
import GamesSection from '@/components/GamesSection';
import FunFactsSection from '@/components/FunFactsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <DailyFactWidget />
        <CelestialExplorer />
        <SpaceTimeline />
        <ConstellationViewer />
        <LibrarySection />
        <GamesSection />
        <FunFactsSection />
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
