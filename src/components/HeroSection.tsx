import { Rocket, Sparkles, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollToExplorer = () => {
    document.querySelector('#explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-nebula/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-[15%] text-6xl animate-float" style={{ animationDelay: '0.5s' }}>🪐</div>
        <div className="absolute top-1/3 left-[10%] text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🌍</div>
        <div className="absolute bottom-1/4 right-[10%] text-4xl animate-float" style={{ animationDelay: '2.5s' }}>🌙</div>
        <div className="absolute bottom-1/3 left-[20%] text-5xl animate-float" style={{ animationDelay: '0s' }}>☄️</div>
        <div className="absolute top-[60%] right-[25%] text-4xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">{t('hero.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
          {t('hero.welcome')}{' '}
          <span className="gradient-text">{t('hero.cosmicClassroom')}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" onClick={scrollToExplorer} className="cosmic-glow text-lg px-8 py-6 font-semibold">
            <Rocket className="w-5 h-5 mr-2" />
            {t('hero.startJourney')}
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.querySelector('#games')?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-8 py-6 font-semibold border-primary/50 hover:bg-primary/10">
            <Stars className="w-5 h-5 mr-2" />
            {t('hero.takeQuiz')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: t('hero.solarSystem'), emoji: '🌞', desc: t('hero.solarSystemDesc'), href: '#explorer' },
            { title: t('hero.starsNebulas'), emoji: '✨', desc: t('hero.starsNebulasDesc'), href: '#explorer' },
            { title: t('hero.galaxiesBeyond'), emoji: '🌌', desc: t('hero.galaxiesBeyondDesc'), href: '#explorer' },
          ].map((category) => (
            <button key={category.title} onClick={() => document.querySelector(category.href)?.scrollIntoView({ behavior: 'smooth' })} className="glass-card p-6 rounded-2xl text-left hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
