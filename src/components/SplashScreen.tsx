import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onComplete, 300);
      }
    }, 30);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-in fade-in">
      {/* twinkling stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-foreground/70 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" />
          <Rocket className="w-16 h-16 text-primary relative animate-bounce" style={{ animationDuration: '1.6s' }} />
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground text-center">
          Cosmic Classroom
        </h1>
        <p className="text-sm text-muted-foreground text-center -mt-3">Preparing your launch sequence...</p>

        <div className="w-full">
          <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden border border-border/40">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 ease-linear"
              style={{ width: `${progress}%`, boxShadow: '0 0 12px hsl(var(--primary))' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center font-mono">{Math.floor(progress)}%</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
