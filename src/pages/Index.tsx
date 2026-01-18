import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
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

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
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
    </div>
  );
};

export default Index;
