import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gamepad2, Star, Zap, Trophy, X, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { premiumGames, PremiumGame } from '@/data/premiumGames';
import { useGamePass } from '@/contexts/GamePassContext';
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

const PremiumGamesSection = () => {
  const { coinMultiplier } = useGamePass();
  const { addCoins } = useCoins();
  const { addAchievement, hasAchievement } = useAchievements();
  const [playingGame, setPlayingGame] = useState<PremiumGame | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');

  const startGame = (game: PremiumGame) => {
    setPlayingGame(game);
    setGameState('playing');
    setGameScore(0);
  };

  const finishGame = (won: boolean) => {
    if (!playingGame) return;
    
    const baseReward = playingGame.coinReward;
    const finalReward = won ? Math.floor(baseReward * coinMultiplier) : Math.floor(baseReward * 0.25 * coinMultiplier);
    
    setGameScore(finalReward);
    setGameState('finished');
    
    if (won) {
      addCoins(finalReward, `Won: ${playingGame.name}`);
      if (!hasAchievement(playingGame.name, 'game')) {
        addAchievement({
          type: 'game',
          name: playingGame.name,
          icon: playingGame.icon,
          description: `Mastered ${playingGame.name} (${playingGame.difficulty} difficulty)`
        });
      }
      toast.success(`🎉 You Won! +${finalReward} coins`, {
        description: coinMultiplier > 1 ? `${coinMultiplier}x multiplier applied!` : undefined
      });
    } else {
      addCoins(finalReward, `Played: ${playingGame.name}`);
      toast.info(`Good try! +${finalReward} coins`, { description: 'Keep practicing to earn more!' });
    }
  };

  const closeGame = () => {
    setPlayingGame(null);
    setGameState('idle');
    setGameScore(0);
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
            Play our collection of exciting space-themed games and earn coins!
          </p>
          <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
            <Gamepad2 className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">All Games Free to Play!</span>
            {coinMultiplier > 1 && (
              <span className="text-yellow-400 text-sm font-bold">({coinMultiplier}x coins!)</span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {premiumGames.map((game, index) => {
            const diffConfig = difficultyConfig[game.difficulty];
            const catConfig = categoryConfig[game.category];
            const isCompleted = hasAchievement(game.name, 'game');

            return (
              <motion.div
                key={game.id}
                className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-5 overflow-hidden border-white/10 hover:border-white/30 ${isCompleted ? 'ring-2 ring-green-500/30' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />

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
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
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
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={closeGame} className="absolute top-4 right-4 text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center">
                <motion.div className="text-7xl mb-4" animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  {playingGame.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{playingGame.name}</h3>
                <p className="text-white/60 mb-6">{playingGame.description}</p>

                {gameState === 'playing' && (
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                      <p className="text-white/70 mb-4">🎮 Game simulation in progress...</p>
                      <div className="flex justify-center gap-4">
                        <Button onClick={() => finishGame(true)} className="bg-gradient-to-r from-green-500 to-emerald-500">
                          <Trophy className="w-4 h-4 mr-2" />Win Game
                        </Button>
                        <Button onClick={() => finishGame(false)} variant="outline" className="border-white/20">
                          Try Again
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-white/40">(Demo mode - Full game coming soon!)</p>
                  </div>
                )}

                {gameState === 'finished' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl p-6 border border-amber-500/30">
                      <p className="text-amber-400 text-lg font-bold mb-2">🪙 +{gameScore} Coins Earned!</p>
                      {coinMultiplier > 1 && <p className="text-yellow-300 text-sm">{coinMultiplier}x Star Booster applied!</p>}
                    </div>
                    <Button onClick={() => { setGameState('playing'); setGameScore(0); }} className={`w-full bg-gradient-to-r ${playingGame.color}`}>
                      <Play className="w-4 h-4 mr-2" />Play Again
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumGamesSection;
