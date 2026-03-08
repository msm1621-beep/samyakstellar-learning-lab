import { Rocket, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">{t('nav.cosmicClassroom')}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.explore')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('#home')} className="hover:text-primary transition-colors">{t('nav.home')}</button></li>
              <li><button onClick={() => scrollToSection('#explorer')} className="hover:text-primary transition-colors">{t('footer.universeExplorer')}</button></li>
              <li><button onClick={() => scrollToSection('#library')} className="hover:text-primary transition-colors">{t('footer.celestialLibrary')}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.learnPlay')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('#games')} className="hover:text-primary transition-colors">{t('footer.quizzes')}</button></li>
              <li><button onClick={() => scrollToSection('#facts')} className="hover:text-primary transition-colors">{t('nav.funFacts')}</button></li>
              <li><button onClick={() => scrollToSection('#about')} className="hover:text-primary transition-colors">{t('nav.about')}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.forParents')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">{t('footer.madeWith')} <Heart className="w-4 h-4 text-destructive" /> for curious young explorers</p>
          <p className="mt-2">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
