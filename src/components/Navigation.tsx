import { useState, useEffect } from 'react';
import { Rocket, Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Solar System', href: '#explorer' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Constellations', href: '#constellations' },
    { name: 'Library', href: '#library' },
    { name: 'Games', href: '#games' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Fun Facts', href: '#facts' },
    { name: 'About', href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const accountLabel = profile?.display_name || user?.email?.split('@')[0] || 'Explorer';
  const accountEmoji = profile?.avatar_emoji || '🚀';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollToSection('#home')} className="flex items-center gap-2 text-xl font-display font-bold text-foreground hover:text-primary transition-colors">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="hidden sm:inline">Cosmic Classroom</span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SearchBar />
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {accountEmoji} {accountLabel}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowAuth(true)} className="gap-1">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Join / Sign In</span>
              </Button>
            )}

            <Button onClick={() => scrollToSection('#explorer')} className="hidden md:flex cosmic-glow">
              Start Your Journey
            </Button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden glass-card mt-2 mx-4 rounded-lg p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-left py-2 px-4 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">
                  {item.name}
                </button>
              ))}
              {!user && (
                <Button onClick={() => { setShowAuth(true); setIsMenuOpen(false); }} className="mt-2" variant="outline">
                  <LogIn className="w-4 h-4 mr-2" /> Join / Sign In
                </Button>
              )}
              <Button onClick={() => scrollToSection('#explorer')} className="mt-2 cosmic-glow">Start Your Journey</Button>
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navigation;
