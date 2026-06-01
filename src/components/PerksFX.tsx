import { useEffect, useRef } from 'react';
import { usePerks } from '@/contexts/PerksContext';

/**
 * Global premium visual layer:
 *  - Cursor aurora trail (canvas) when aurora_trail / lunar+ tier
 *  - Drifting meteor sprites when meteor_glow / solar+ tier
 *  - Rainbow body pulse on Admiral+ subscription
 *  - Supernova radial halo on Supreme Captain / supernova_frame
 *  - Theme attribute is already set on <html> by PerksContext
 */
const PerksFX = () => {
  const {
    hasAuroraTrail,
    hasMeteorRain,
    hasSupernova,
    hasFireEffects,
    hasGalaxyAnimations,
    hasRainbowEffects,
    theme,
  } = usePerks();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cursor aurora trail
  useEffect(() => {
    if (!hasAuroraTrail) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const trail: { x: number; y: number; life: number; hue: number }[] = [];
    let raf = 0;
    let hue = 180;

    const onMove = (e: PointerEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, life: 1, hue });
      hue = (hue + 6) % 360;
      if (trail.length > 60) trail.shift();
    };
    window.addEventListener('pointermove', onMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      trail.forEach((p, i) => {
        p.life *= 0.94;
        const r = 18 + i * 0.3;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${p.life * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [hasAuroraTrail]);

  return (
    <>
      {/* Cursor aurora canvas */}
      {hasAuroraTrail && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[45] mix-blend-screen"
          aria-hidden
        />
      )}

      {/* Meteor rain */}
      {hasMeteorRain && (
        <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute block w-[2px] h-24 bg-gradient-to-b from-transparent via-orange-300 to-orange-500 opacity-70 animate-meteor"
              style={{
                left: `${(i * 9 + 5) % 100}%`,
                top: `-${20 + Math.random() * 40}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 5)}s`,
                transform: 'rotate(20deg)',
              }}
            />
          ))}
        </div>
      )}

      {/* Supernova halo */}
      {hasSupernova && (
        <div
          className="pointer-events-none fixed inset-0 z-[6] animate-pulse"
          aria-hidden
          style={{
            background:
              'radial-gradient(circle at 50% 30%, hsla(15, 90%, 55%, 0.18), transparent 60%)',
          }}
        />
      )}

      {/* Fire shimmer at bottom */}
      {hasFireEffects && (
        <div
          className="pointer-events-none fixed bottom-0 left-0 right-0 h-32 z-[7]"
          aria-hidden
          style={{
            background:
              'linear-gradient(to top, hsla(20, 100%, 55%, 0.25), transparent)',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Rainbow body pulse */}
      {hasRainbowEffects && (
        <div
          className="pointer-events-none fixed inset-0 z-[5] animate-rainbow-shift opacity-20"
          aria-hidden
          style={{
            background:
              'linear-gradient(135deg, #ff006e, #ffbe0b, #8338ec, #3a86ff, #06ffa5)',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Galaxy swirl (top corner) */}
      {hasGalaxyAnimations && (
        <div
          className="pointer-events-none fixed -top-32 -right-32 w-96 h-96 z-[6] rounded-full animate-spin-slow"
          aria-hidden
          style={{
            background:
              'conic-gradient(from 0deg, transparent, hsla(280, 80%, 60%, 0.3), transparent, hsla(200, 80%, 60%, 0.3), transparent)',
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Theme overlay tint */}
      {theme === 'supreme' && (
        <div
          className="pointer-events-none fixed inset-0 z-[4]"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at top, hsla(45, 90%, 50%, 0.12), transparent 60%)',
          }}
        />
      )}
    </>
  );
};

export default PerksFX;
