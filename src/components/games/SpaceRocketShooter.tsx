import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Trophy, Coins } from 'lucide-react';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';

interface Asteroid {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
  points: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
}

const ASTEROID_EMOJIS = ['☄️', '🪨', '💎', '⭐', '🌑'];
const GAME_WIDTH = 100; // percentage
const GAME_HEIGHT = 400; // px
const GAME_DURATION = 30; // seconds

type GameState = 'start' | 'playing' | 'finished';

const SpaceRocketShooter = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [rocketX, setRocketX] = useState(50);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const animFrame = useRef<number>(0);
  const lastTime = useRef(0);
  const { addCoins } = useCoins();
  const { addAchievement } = useAchievements();

  const getId = () => ++nextId.current;

  const startGame = useCallback(() => {
    setScore(0);
    setRocketX(50);
    setAsteroids([]);
    setBullets([]);
    setExplosions([]);
    setTimeLeft(GAME_DURATION);
    setCoinsAwarded(false);
    nextId.current = 0;
    setGameState('playing');
  }, []);

  // Spawn asteroids
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      const emoji = ASTEROID_EMOJIS[Math.floor(Math.random() * ASTEROID_EMOJIS.length)];
      const isSpecial = emoji === '💎' || emoji === '⭐';
      setAsteroids(prev => [...prev, {
        id: getId(),
        x: Math.random() * 90 + 5,
        y: -5,
        speed: Math.random() * 1.5 + 0.8,
        size: isSpecial ? 24 : Math.random() * 12 + 20,
        emoji,
        points: isSpecial ? 20 : 10,
      }]);
    }, 700);
    return () => clearInterval(interval);
  }, [gameState]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = (timestamp: number) => {
      if (!lastTime.current) lastTime.current = timestamp;
      const delta = (timestamp - lastTime.current) / 16;
      lastTime.current = timestamp;

      // Move asteroids down
      setAsteroids(prev => prev
        .map(a => ({ ...a, y: a.y + a.speed * delta }))
        .filter(a => a.y < 105)
      );

      // Move bullets up
      setBullets(prev => prev
        .map(b => ({ ...b, y: b.y - 4 * delta }))
        .filter(b => b.y > -5)
      );

      // Collision detection
      setBullets(prevBullets => {
        let remainingBullets = [...prevBullets];
        setAsteroids(prevAsteroids => {
          let remainingAsteroids = [...prevAsteroids];
          const newExplosions: Explosion[] = [];
          let scoreGain = 0;

          remainingBullets = remainingBullets.filter(bullet => {
            const hitIndex = remainingAsteroids.findIndex(a => {
              const dx = Math.abs(bullet.x - a.x);
              const dy = Math.abs(bullet.y - (a.y / GAME_HEIGHT * 100));
              return dx < 6 && dy < 6;
            });
            if (hitIndex !== -1) {
              const hit = remainingAsteroids[hitIndex];
              scoreGain += hit.points;
              newExplosions.push({ id: getId(), x: hit.x, y: hit.y });
              remainingAsteroids.splice(hitIndex, 1);
              return false;
            }
            return true;
          });

          if (scoreGain > 0) setScore(prev => prev + scoreGain);
          if (newExplosions.length > 0) {
            setExplosions(prev => [...prev, ...newExplosions]);
            setTimeout(() => {
              setExplosions(prev => prev.filter(e => !newExplosions.find(ne => ne.id === e.id)));
            }, 400);
          }

          return remainingAsteroids;
        });
        return remainingBullets;
      });

      animFrame.current = requestAnimationFrame(loop);
    };

    lastTime.current = 0;
    animFrame.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame.current);
  }, [gameState]);

  // Controls
  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || gameState !== 'playing') return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setRocketX(Math.max(5, Math.min(95, x)));
  }, [gameState]);

  const shoot = useCallback(() => {
    if (gameState !== 'playing') return;
    setBullets(prev => [...prev, { id: getId(), x: rocketX, y: 90 }]);
  }, [gameState, rocketX]);

  const handlePointerMove = (e: React.PointerEvent) => handleMove(e.clientX);
  const handleClick = () => shoot();

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setRocketX(prev => Math.max(5, prev - 4));
      if (e.key === 'ArrowRight') setRocketX(prev => Math.min(95, prev + 4));
      if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); shoot(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [gameState, shoot]);

  // Award coins
  useEffect(() => {
    if (gameState === 'finished' && !coinsAwarded && score > 0) {
      addCoins(COIN_REWARDS.GAME_WIN, `Rocket Shooter: ${score} pts!`);
      if (score >= 100) {
        addAchievement({
          type: 'game',
          name: 'Space Ace',
          icon: '🚀',
          description: `Scored ${score} points in Space Rocket Shooter!`
        });
      }
      setCoinsAwarded(true);
    }
  }, [gameState, coinsAwarded, score, addCoins, addAchievement]);

  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-display font-bold mb-2">Space Rocket Shooter</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Blast asteroids before they reach the bottom!
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Move: Mouse/Touch/Arrow Keys • Shoot: Click/Tap/Space
        </p>
        <Button onClick={startGame} className="gap-2">
          <Play className="w-4 h-4" /> Launch Mission
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">{score >= 100 ? '🏆' : '🚀'}</div>
        <h3 className="text-xl font-display font-bold mb-2">
          {score >= 100 ? 'Space Ace!' : 'Mission Complete!'}
        </h3>
        <p className="text-2xl font-bold text-primary mb-2">{score} points</p>
        <p className="text-sm text-muted-foreground mb-4">
          {score >= 200 ? 'Legendary pilot!' : score >= 100 ? 'Amazing shooting!' : 'Keep practicing, cadet!'}
        </p>
        {score > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">+{COIN_REWARDS.GAME_WIN}</span>
          </div>
        )}
        <Button onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-3 border border-primary/20">
      {/* HUD */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm font-bold">🎯 {score}</span>
        <span className="text-sm font-bold">⏱️ {timeLeft}s</span>
      </div>

      {/* Game Area */}
      <div
        ref={gameRef}
        className="relative bg-background/60 rounded-xl overflow-hidden cursor-crosshair select-none"
        style={{ height: GAME_HEIGHT }}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        onTouchStart={(e) => { e.preventDefault(); shoot(); }}
      >
        {/* Stars background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white/40 animate-twinkle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Asteroids */}
        {asteroids.map(a => (
          <div
            key={a.id}
            className="absolute transition-none"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              fontSize: `${a.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {a.emoji}
          </div>
        ))}

        {/* Bullets */}
        {bullets.map(b => (
          <div
            key={b.id}
            className="absolute w-1 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/80"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: 'translateX(-50%)',
            }}
          />
        ))}

        {/* Explosions */}
        {explosions.map(e => (
          <div
            key={e.id}
            className="absolute text-2xl animate-ping"
            style={{
              left: `${e.x}%`,
              top: `${e.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            💥
          </div>
        ))}

        {/* Rocket */}
        <div
          className="absolute bottom-2 text-3xl transition-all duration-75"
          style={{ left: `${rocketX}%`, transform: 'translateX(-50%)' }}
        >
          🚀
        </div>
      </div>
    </div>
  );
};

export default SpaceRocketShooter;
