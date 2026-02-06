import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Clock, Zap, Crown, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gamePasses } from '@/data/gamePasses';
import { useGamePass } from '@/contexts/GamePassContext';
import { useCoins } from '@/contexts/CoinsContext';

const GamePassSection = () => {
  const { hasPass, purchasePass, getPassExpiry, extraLives } = useGamePass();
  const { coins } = useCoins();

  const formatTimeRemaining = (expiry: Date | null) => {
    if (!expiry) return null;
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  return (
    <section className="py-16 px-4" id="game-passes">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
              Game Passes
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Power up your gaming experience with special passes! Get extra lives, bonus coins, and exclusive access.
          </p>
          {extraLives > 0 && (
            <motion.div
              className="mt-4 inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-semibold">{extraLives} Extra Lives Available</span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gamePasses.map((pass, index) => {
            const isActive = hasPass(pass.id);
            const expiry = getPassExpiry(pass.id);
            const canAfford = coins >= pass.price;

            return (
              <motion.div
                key={pass.id}
                className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-6 overflow-hidden ${
                  isActive ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pass.color} opacity-10`} />
                
                {isActive && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    ACTIVE
                  </div>
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {pass.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{pass.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{pass.description}</p>

                  <div className="space-y-2 mb-6">
                    {pass.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-white/50">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {pass.duration} days
                    </span>
                    <span className="text-amber-400 font-bold">
                      {pass.price} 🪙
                    </span>
                  </div>

                  {isActive ? (
                    <div className="text-center py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span className="text-green-400 text-sm font-medium">
                        {formatTimeRemaining(expiry)}
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => purchasePass(pass.id)}
                      disabled={!canAfford}
                      className={`w-full bg-gradient-to-r ${pass.color} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      {canAfford ? 'Purchase Pass' : `Need ${pass.price - coins} more`}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GamePassSection;
