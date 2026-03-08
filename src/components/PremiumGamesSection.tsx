import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gamepad2, Star, Zap, Trophy, X, Play, Sparkles, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { premiumGames, PremiumGame } from '@/data/premiumGames';
import { useGamePass } from '@/contexts/GamePassContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useCoins } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { toast } from 'sonner';


const difficultyConfig = {
  easy: { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Easy' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Medium' },
  hard: { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Hard' }
};

const categoryConfig = {
  puzzle: { icon: '🧩', label: 'Puzzle' },
  adventure: { icon: '🗺️', label: 'Adventure' },
  trivia: { icon: '❓', label: 'Trivia' },
  arcade: { icon: '🕹️', label: 'Arcade' }
};

// ─── TRIVIA DATA ───
const triviaQuestions = [
  { q: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: 1 },
  { q: "How many moons does Mars have?", options: ["0", "1", "2", "4"], answer: 2 },
  { q: "What is the closest star to Earth?", options: ["Proxima Centauri", "The Sun", "Sirius", "Betelgeuse"], answer: 1 },
  { q: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: 1 },
  { q: "What galaxy do we live in?", options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"], answer: 1 },
  { q: "What is a light-year?", options: ["A unit of time", "A unit of distance", "A unit of speed", "A unit of brightness"], answer: 1 },
  { q: "Which planet has the most rings?", options: ["Jupiter", "Neptune", "Saturn", "Uranus"], answer: 2 },
  { q: "How long does light take to reach Earth from the Sun?", options: ["1 min", "8 min", "1 hour", "24 hours"], answer: 1 },
  { q: "What causes a solar eclipse?", options: ["Earth blocks Sun", "Moon blocks Sun", "Sun dims", "Clouds"], answer: 1 },
  { q: "What planet rotates on its side?", options: ["Neptune", "Uranus", "Pluto", "Venus"], answer: 1 },
  { q: "What is a nebula?", options: ["A star", "A cloud of gas/dust", "A planet", "A comet"], answer: 1 },
  { q: "Which is the hottest planet?", options: ["Mercury", "Venus", "Mars", "Jupiter"], answer: 1 },
  { q: "What is an asteroid belt?", options: ["Ring of Saturn", "Region between Mars & Jupiter", "Near Pluto", "Edge of solar system"], answer: 1 },
  { q: "How old is the Sun approximately?", options: ["1 billion years", "4.6 billion years", "10 billion years", "100 million years"], answer: 1 },
  { q: "What is a black hole?", options: ["An empty space", "A collapsed massive star", "A dark planet", "A type of comet"], answer: 1 },
];

// ─── ADVENTURE SCENARIOS ───
const adventureScenarios = [
  {
    text: "Your ship detects a mysterious signal from a nearby asteroid. What do you do?",
    choices: [
      { text: "Investigate the signal", next: 1 },
      { text: "Ignore and continue course", next: 2 }
    ]
  },
  {
    text: "The asteroid contains rare minerals! But a space pirate ship approaches. What now?",
    choices: [
      { text: "Mine quickly and flee", next: 3 },
      { text: "Prepare for battle", next: 4 }
    ]
  },
  {
    text: "You pass by safely but miss potential treasure. A wormhole appears ahead!",
    choices: [
      { text: "Enter the wormhole", next: 5 },
      { text: "Go around it", next: 6 }
    ]
  },
  {
    text: "You grab valuable crystals! The pirates fire warning shots. Quick decision!",
    choices: [
      { text: "Use crystals as decoy", next: 5 },
      { text: "Activate hyperdrive", next: 7 }
    ]
  },
  {
    text: "Your shields hold! The pirates retreat. You find a treasure chest floating in space!",
    choices: [
      { text: "Open it", next: 7 },
      { text: "Scan it first", next: 7 }
    ]
  },
  {
    text: "The wormhole transports you to a beautiful nebula! You discover a new planet!",
    choices: [
      { text: "Land and explore", next: 7 },
      { text: "Document from orbit", next: 7 }
    ]
  },
  {
    text: "You arrive at your destination safely. Mission complete but no big discoveries.",
    choices: []
  },
  {
    text: "🎉 Amazing! You've completed an incredible space adventure and found legendary treasures!",
    choices: []
  }
];

// ─── ARCADE GAME: Click targets ───
const ArcadeMinigame = ({ difficulty, onFinish }: { difficulty: string; onFinish: (score: number) => void }) => {
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficulty === 'easy' ? 15 : difficulty === 'medium' ? 12 : 10);
  const [started, setStarted] = useState(false);
  const nextId = useRef(0);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (timeLeft === 0 && started) {
      onFinish(score);
    }
  }, [timeLeft, started, score, onFinish]);

  useEffect(() => {
    if (!started) return;
    const spawnRate = difficulty === 'easy' ? 1200 : difficulty === 'medium' ? 900 : 600;
    const interval = setInterval(() => {
      const id = nextId.current++;
      const size = difficulty === 'hard' ? 30 : difficulty === 'medium' ? 40 : 50;
      setTargets(prev => [...prev, { id, x: Math.random() * 80 + 5, y: Math.random() * 70 + 5, size }]);
      setTimeout(() => {
        setTargets(prev => prev.filter(t => t.id !== id));
      }, difficulty === 'easy' ? 2000 : difficulty === 'medium' ? 1500 : 1000);
    }, spawnRate);
    return () => clearInterval(interval);
  }, [started, difficulty]);

  const hitTarget = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(prev => prev + 10);
  };

  if (!started) {
    return (
      <div className="text-center space-y-4">
        <p className="text-white/70">Tap the asteroids before they disappear!</p>
        <Button onClick={() => setStarted(true)} className="bg-gradient-to-r from-red-500 to-orange-500">
          <Zap className="w-4 h-4 mr-2" /> Start!
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-amber-400 font-bold">Score: {score}</span>
        <span className={`font-bold ${timeLeft <= 3 ? 'text-red-400 animate-pulse' : 'text-white/70'}`}>⏱ {timeLeft}s</span>
      </div>
      <div ref={areaRef} className="relative w-full h-48 bg-slate-800/60 rounded-xl border border-white/10 overflow-hidden">
        {targets.map(t => (
          <motion.button
            key={t.id}
            className="absolute text-2xl cursor-pointer select-none"
            style={{ left: `${t.x}%`, top: `${t.y}%`, width: t.size, height: t.size }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => hitTarget(t.id)}
            whileTap={{ scale: 1.3 }}
          >
            ☄️
          </motion.button>
        ))}
        {targets.length === 0 && <p className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">Targets incoming...</p>}
      </div>
    </div>
  );
};

// ─── PUZZLE GAME: Pattern memory ───
const PuzzleMinigame = ({ difficulty, onFinish }: { difficulty: string; onFinish: (score: number) => void }) => {
  const gridSize = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const patternLen = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
  const [pattern, setPattern] = useState<number[]>([]);
  const [playerPattern, setPlayerPattern] = useState<number[]>([]);
  const [phase, setPhase] = useState<'show' | 'input' | 'idle'>('idle');
  const [showIndex, setShowIndex] = useState(-1);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const startRound = useCallback(() => {
    const newPattern: number[] = [];
    const total = gridSize * gridSize;
    while (newPattern.length < patternLen) {
      const n = Math.floor(Math.random() * total);
      if (!newPattern.includes(n)) newPattern.push(n);
    }
    setPattern(newPattern);
    setPlayerPattern([]);
    setPhase('show');
    setShowIndex(0);
  }, [gridSize, patternLen]);

  useEffect(() => {
    if (phase !== 'show') return;
    if (showIndex >= pattern.length) {
      setPhase('input');
      setShowIndex(-1);
      return;
    }
    const timer = setTimeout(() => setShowIndex(prev => prev + 1), 600);
    return () => clearTimeout(timer);
  }, [phase, showIndex, pattern]);

  const handleCellClick = (idx: number) => {
    if (phase !== 'input') return;
    const nextIdx = playerPattern.length;
    if (pattern[nextIdx] === idx) {
      const newPlayer = [...playerPattern, idx];
      setPlayerPattern(newPlayer);
      if (newPlayer.length === pattern.length) {
        setScore(prev => prev + patternLen * 10);
        setRound(prev => prev + 1);
        if (round >= 2) {
          onFinish(score + patternLen * 10);
        } else {
          setTimeout(startRound, 500);
        }
      }
    } else {
      onFinish(score);
    }
  };

  if (phase === 'idle') {
    return (
      <div className="text-center space-y-4">
        <p className="text-white/70">Memorize the pattern, then repeat it!</p>
        <Button onClick={startRound} className="bg-gradient-to-r from-blue-500 to-indigo-500">
          <Sparkles className="w-4 h-4 mr-2" /> Start Puzzle
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-amber-400 font-bold">Score: {score}</span>
        <span className="text-white/70">Round {round + 1}/3</span>
      </div>
      <p className="text-center text-xs text-white/50">{phase === 'show' ? '👀 Watch the pattern...' : '👆 Repeat the pattern!'}</p>
      <div className="grid gap-1.5 mx-auto" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, maxWidth: gridSize * 52 }}>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const isShowing = phase === 'show' && pattern.slice(0, showIndex + 1).includes(i);
          const isClicked = phase === 'input' && playerPattern.includes(i);
          return (
            <motion.button
              key={i}
              className={`w-12 h-12 rounded-lg border transition-all ${
                isShowing ? 'bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-400/40' :
                isClicked ? 'bg-green-400 border-green-300' :
                'bg-slate-700 border-white/10 hover:bg-slate-600'
              }`}
              onClick={() => handleCellClick(i)}
              whileTap={{ scale: 0.9 }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── TRIVIA GAME ───
const TriviaMinigame = ({ difficulty, onFinish }: { difficulty: string; onFinish: (score: number) => void }) => {
  const numQ = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
  const [questions] = useState(() => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numQ);
  });
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].answer;
    if (correct) setScore(prev => prev + 20);

    setTimeout(() => {
      setSelected(null);
      if (current + 1 >= questions.length) {
        onFinish(score + (correct ? 20 : 0));
      } else {
        setCurrent(prev => prev + 1);
      }
    }, 1000);
  };

  const q = questions[current];
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-amber-400 font-bold">Score: {score}</span>
        <span className="text-white/70">{current + 1}/{questions.length}</span>
      </div>
      <p className="text-white font-medium text-center">{q.q}</p>
      <div className="grid grid-cols-2 gap-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const bg = selected !== null
            ? isCorrect ? 'bg-green-500/30 border-green-400' : i === selected ? 'bg-red-500/30 border-red-400' : 'bg-slate-700 border-white/10'
            : 'bg-slate-700 border-white/10 hover:bg-slate-600';
          return (
            <button key={i} onClick={() => handleSelect(i)} className={`p-3 rounded-lg border text-sm text-white transition-all ${bg}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── ADVENTURE GAME ───
const AdventureMinigame = ({ onFinish }: { onFinish: (score: number) => void }) => {
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState(0);
  const scenario = adventureScenarios[step];

  useEffect(() => {
    if (scenario.choices.length === 0) {
      const finalScore = step === 7 ? 60 : 20;
      setTimeout(() => onFinish(finalScore + decisions * 5), 1500);
    }
  }, [step, scenario, onFinish, decisions]);

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 rounded-xl p-4 border border-white/10">
        <p className="text-white text-sm leading-relaxed">{scenario.text}</p>
      </div>
      <div className="space-y-2">
        {scenario.choices.map((c, i) => (
          <Button
            key={i}
            variant="outline"
            className="w-full justify-start border-white/20 text-white hover:bg-white/10"
            onClick={() => { setStep(c.next); setDecisions(prev => prev + 1); }}
          >
            {c.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN SECTION ───
const PremiumGamesSection = () => {
  const { t } = useLanguage();
  const { coinMultiplier, hasPremiumGames } = useGamePass();
  const { currentSubscription, isExpired } = useSubscription();
  const { addCoins } = useCoins();
  const { addAchievement, hasAchievement } = useAchievements();
  const [playingGame, setPlayingGame] = useState<PremiumGame | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [finalScore, setFinalScore] = useState(0);

  // Access: Galaxy Access pass OR any active subscription
  const hasAccess = hasPremiumGames || (currentSubscription && !isExpired);

  const startGame = (game: PremiumGame) => {
    if (!hasAccess) {
      toast.error('🔒 Premium Access Required', {
        description: 'Purchase a Galaxy Access pass or any subscription to play premium games!'
      });
      return;
    }
    setPlayingGame(game);
    setGameState('playing');
    setFinalScore(0);
  };

  const handleGameFinish = useCallback((rawScore: number) => {
    if (!playingGame) return;
    const reward = Math.floor(rawScore * coinMultiplier);
    setFinalScore(reward);
    setGameState('finished');

    if (reward > 0) {
      addCoins(reward, `Played: ${playingGame.name}`);
    }

    const won = rawScore >= playingGame.coinReward * 0.5;
    if (won && !hasAchievement(playingGame.name, 'game')) {
      addAchievement({
        type: 'game',
        name: playingGame.name,
        icon: playingGame.icon,
        description: `Mastered ${playingGame.name} (${playingGame.difficulty} difficulty)`
      });
    }

    if (won) {
      toast.success(`🎉 Great job! +${reward} coins`);
    } else {
      toast.info(`Good try! +${reward} coins. Keep practicing!`);
    }
  }, [playingGame, coinMultiplier, addCoins, addAchievement, hasAchievement]);

  const closeGame = () => {
    setPlayingGame(null);
    setGameState('idle');
    setFinalScore(0);
  };

  const renderMinigame = () => {
    if (!playingGame) return null;
    const d = playingGame.difficulty;
    switch (playingGame.category) {
      case 'arcade':
        return <ArcadeMinigame difficulty={d} onFinish={handleGameFinish} />;
      case 'puzzle':
        return <PuzzleMinigame difficulty={d} onFinish={handleGameFinish} />;
      case 'trivia':
        return <TriviaMinigame difficulty={d} onFinish={handleGameFinish} />;
      case 'adventure':
        return <AdventureMinigame onFinish={handleGameFinish} />;
      default:
        return <ArcadeMinigame difficulty={d} onFinish={handleGameFinish} />;
    }
  };

  return (
    <section className="py-16 px-4" id="premium-games">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 text-transparent bg-clip-text">
              Premium Games
            </h2>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-white/60 max-w-2xl mx-auto mb-4">
            Exclusive space-themed mini-games! Earn coins by playing.
          </p>
          {hasAccess ? (
            <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm">Access Unlocked!</span>
              {coinMultiplier > 1 && <span className="text-yellow-400 text-sm font-bold">({coinMultiplier}x coins!)</span>}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm">Requires Galaxy Access Pass or Subscription</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {premiumGames.map((game, index) => {
            const diffConfig = difficultyConfig[game.difficulty];
            const catConfig = categoryConfig[game.category];
            const isCompleted = hasAchievement(game.name, 'game');

            return (
              <motion.div
                key={game.id}
                className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-5 overflow-hidden ${
                  hasAccess ? 'border-white/10 hover:border-white/30' : 'border-white/5 opacity-80'
                } ${isCompleted ? 'ring-2 ring-green-500/30' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />

                {!hasAccess && (
                  <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center rounded-2xl">
                    <Lock className="w-8 h-8 text-white/40" />
                  </div>
                )}

                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 z-20">
                    <Trophy className="w-3 h-3" />
                    Mastered
                  </div>
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {game.icon}
                  </motion.div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{catConfig.icon}</span>
                    <span className="text-xs text-white/50">{catConfig.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${diffConfig.bg} ${diffConfig.color}`}>
                      {diffConfig.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{game.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-400 font-bold text-sm flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {game.coinReward} coins
                    </span>
                  </div>

                  <Button
                    onClick={() => startGame(game)}
                    className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90`}
                    disabled={!hasAccess}
                  >
                    {hasAccess ? (
                      <><Play className="w-4 h-4 mr-2" />Play Now</>
                    ) : (
                      <><Lock className="w-4 h-4 mr-2" />Locked</>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {playingGame && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeGame} />
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeGame} className="absolute top-4 right-4 text-white/60 hover:text-white z-30">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-4">
                <motion.div className="text-6xl mb-2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  {playingGame.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white">{playingGame.name}</h3>
              </div>

              {gameState === 'playing' && renderMinigame()}

              {gameState === 'finished' && (
                <div className="space-y-4 text-center">
                  <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl p-6 border border-amber-500/30">
                    <p className="text-amber-400 text-lg font-bold mb-2">🪙 +{finalScore} Coins Earned!</p>
                    {coinMultiplier > 1 && <p className="text-yellow-300 text-sm">{coinMultiplier}x multiplier applied!</p>}
                  </div>
                  <Button
                    onClick={() => { setGameState('playing'); setFinalScore(0); }}
                    className={`w-full bg-gradient-to-r ${playingGame.color}`}
                  >
                    <Play className="w-4 h-4 mr-2" />Play Again
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumGamesSection;
