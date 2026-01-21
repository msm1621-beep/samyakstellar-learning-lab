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
import FunFactsSection from '@/components/FunFactsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import CosmoAssistant from '@/components/CosmoAssistant';
import AlienDoom from '@/components/AlienDoom';
import SpaceAmbience from '@/components/SpaceAmbience';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <EnhancedStarField />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <SolarSystem3D />
        <DailyFactWidget />
        <SpaceQnA />
        <CelestialExplorer />
        <SpaceTimeline />
        <ConstellationViewer />
        <CourseSection />
        <LibrarySection />
        <GamesSection />
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
