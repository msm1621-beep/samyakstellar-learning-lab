import { useEffect, useState } from 'react';
import { Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const DURATION = 20000;

const messages = [
  'Igniting boosters...',
  'Calibrating star maps...',
  'Charging the cosmic core...',
  'Aligning constellations...',
  'Warming up Cosmo...',
  'Polishing the moons...',
  'Fueling the rockets...',
  'Almost ready for launch!',
];

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / DURATION) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onComplete, 250);
      }
    }, 100);
    return () => clearInterval(id);
  }, [onComplete]);

  const msg = messages[Math.min(messages.length - 1, Math.floor((progress / 100) * messages.length))];
  const secondsLeft = Math.max(0, Math.ceil((100 - progress) * DURATION / 100000));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">
      {/* twinkling stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/70 animate-pulse"
            style={{
              width: Math.random() < 0.2 ? 2 : 1,
              height: Math.random() < 0.2 ? 2 : 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-md text-center">
        <Sparkles className="w-5 h-5 text-accent animate-pulse" />

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-pulse" />
          <Rocket
            className="w-20 h-20 text-primary relative animate-bounce"
            style={{ animationDuration: '1.6s' }}
          />
        </div>

        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Stellar Learning Lab
          </h1>
          <p className="text-sm text-muted-foreground">Your launch sequence is starting</p>
        </div>

        <div className="w-full">
          <div className="h-3 w-full rounded-full bg-muted/40 overflow-hidden border border-border/40 backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 16px hsl(var(--primary))',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground font-mono">
            <span>{msg}</span>
            <span>{Math.floor(progress)}% • {secondsLeft}s</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-xs text-muted-foreground hover:text-primary"
          onClick={onComplete}
        >
          Skip intro →
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
