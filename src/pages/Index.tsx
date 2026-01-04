import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CelestialExplorer from '@/components/CelestialExplorer';
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
        <CelestialExplorer />
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
