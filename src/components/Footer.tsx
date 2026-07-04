import { Rocket, Heart, Phone } from 'lucide-react';

const Footer = () => {
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
              <span className="font-display font-bold text-lg">Stellar Learning Lab</span>
            </div>
            <p className="text-sm text-muted-foreground">Making space exploration fun for young minds! 🚀</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('#home')} className="hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('#explorer')} className="hover:text-primary transition-colors">Universe Explorer</button></li>
              <li><button onClick={() => scrollToSection('#library')} className="hover:text-primary transition-colors">Celestial Library</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Learn & Play</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('#games')} className="hover:text-primary transition-colors">Quizzes</button></li>
              <li><button onClick={() => scrollToSection('#facts')} className="hover:text-primary transition-colors">Fun Facts</button></li>
              <li><button onClick={() => scrollToSection('#about')} className="hover:text-primary transition-colors">About</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+919951140499" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" /> +91 99511 40499
                </a>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">For Parents & Teachers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">Made with <Heart className="w-4 h-4 text-destructive" /> for curious young explorers</p>
          <p className="mt-2">© 2024 Stellar Learning Lab. Keep exploring the stars! ✨</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
