import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Star, Coins, ShoppingBag, Ticket, Crown } from 'lucide-react';
import { useCoins } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoucherReward {
  type: 'coins' | 'shop_item' | 'game_pass' | 'subscription';
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  coinValue?: number;
}

const VOUCHER_REWARDS: VoucherReward[] = [
  { type: 'coins', name: '25 Coins', description: 'A small cosmic bonus!', icon: '🪙', rarity: 'common', coinValue: 25 },
  { type: 'coins', name: '50 Coins', description: 'A nice stash of coins!', icon: '💰', rarity: 'common', coinValue: 50 },
  { type: 'coins', name: '100 Coins', description: 'A stellar reward!', icon: '✨', rarity: 'uncommon', coinValue: 100 },
  { type: 'coins', name: '250 Coins', description: 'Jackpot! A massive haul!', icon: '🌟', rarity: 'rare', coinValue: 250 },
  { type: 'coins', name: '500 Coins', description: 'LEGENDARY coin shower!', icon: '💎', rarity: 'legendary', coinValue: 500 },
  { type: 'shop_item', name: 'Rocket Fuel Boost', description: 'Free boost from the shop!', icon: '🚀', rarity: 'uncommon' },
  { type: 'shop_item', name: 'Star Shield', description: 'A free shield item!', icon: '🛡️', rarity: 'uncommon' },
  { type: 'shop_item', name: 'Cosmic Pet', description: 'A free cosmic companion!', icon: '👾', rarity: 'rare' },
  { type: 'game_pass', name: 'Warp Drive (1 Day)', description: 'Free 1-day no cooldowns!', icon: '⚡', rarity: 'rare' },
  { type: 'game_pass', name: 'Star Booster (1 Day)', description: 'Free 1-day 2x coins!', icon: '⭐', rarity: 'rare' },
  { type: 'game_pass', name: 'Phoenix Pass (3 Days)', description: 'Free 3-day extra lives!', icon: '🔥', rarity: 'legendary' },
  { type: 'subscription', name: 'VIP Trial (1 Day)', description: 'A taste of VIP perks!', icon: '👑', rarity: 'legendary' },
];

const RARITY_COLORS: Record<string, string> = {
  common: 'from-gray-400 to-gray-500',
  uncommon: 'from-green-400 to-emerald-500',
  rare: 'from-blue-400 to-indigo-500',
  legendary: 'from-yellow-400 to-amber-500',
};

const RARITY_GLOW: Record<string, string> = {
  common: 'shadow-gray-500/30',
  uncommon: 'shadow-green-500/40',
  rare: 'shadow-blue-500/50',
  legendary: 'shadow-yellow-500/60',
};

const RARITY_LABELS: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  legendary: 'Legendary',
};

const getRandomReward = (): VoucherReward => {
  const roll = Math.random();
  let pool: VoucherReward[];
  if (roll < 0.45) pool = VOUCHER_REWARDS.filter(r => r.rarity === 'common');
  else if (roll < 0.75) pool = VOUCHER_REWARDS.filter(r => r.rarity === 'uncommon');
  else if (roll < 0.93) pool = VOUCHER_REWARDS.filter(r => r.rarity === 'rare');
  else pool = VOUCHER_REWARDS.filter(r => r.rarity === 'legendary');
  return pool[Math.floor(Math.random() * pool.length)];
};

const VOUCHERS_KEY = 'giftVouchersAvailable';
const SCRATCHED_KEY = 'giftVouchersScratched';

const ScratchCard = ({ onRevealed, reward }: { onRevealed: () => void; reward: VoucherReward }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const scratchedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4a1d96');
    gradient.addColorStop(0.5, '#1e1b4b');
    gradient.addColorStop(1, '#312e81');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here! ✨', canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    scratchedRef.current += 1;
    if (scratchedRef.current > 40 && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onRevealed();
    }
  }, [revealed, onRevealed]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  return (
    <div className="relative w-[260px] h-[160px] rounded-xl overflow-hidden shadow-lg mx-auto">
      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${RARITY_COLORS[reward.rarity]} p-4`}>
        <span className="text-4xl mb-1">{reward.icon}</span>
        <p className="text-white font-bold text-base">{reward.name}</p>
        <span className="text-xs px-2 py-0.5 rounded-full mt-1 bg-white/20 text-white font-medium">
          {RARITY_LABELS[reward.rarity]}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={260}
        height={160}
        className="absolute inset-0 cursor-pointer touch-none"
        onMouseDown={(e) => { setIsScratching(true); const { x, y } = getPos(e); scratch(x, y); }}
        onMouseMove={handleMove}
        onMouseUp={() => setIsScratching(false)}
        onMouseLeave={() => setIsScratching(false)}
        onTouchStart={(e) => { setIsScratching(true); const { x, y } = getPos(e); scratch(x, y); }}
        onTouchMove={handleMove}
        onTouchEnd={() => setIsScratching(false)}
      />
    </div>
  );
};

const GiftVoucherSection = () => {
  const { t } = useLanguage();
  const { addCoins } = useCoins();
  const { addAchievement } = useAchievements();
  const [availableVouchers, setAvailableVouchers] = useState(0);
  const [totalScratched, setTotalScratched] = useState(0);
  const [currentReward, setCurrentReward] = useState<VoucherReward | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  // Sync voucher count from localStorage (set by CourseSection on completion)
  useEffect(() => {
    const syncVouchers = () => {
      const count = parseInt(localStorage.getItem(VOUCHERS_KEY) || '0', 10);
      const scratched = parseInt(localStorage.getItem(SCRATCHED_KEY) || '0', 10);
      setAvailableVouchers(count);
      setTotalScratched(scratched);
    };
    syncVouchers();

    // Listen for storage changes (from CourseSection)
    window.addEventListener('storage', syncVouchers);
    // Also poll since same-tab storage events don't fire
    const interval = setInterval(syncVouchers, 1000);
    return () => {
      window.removeEventListener('storage', syncVouchers);
      clearInterval(interval);
    };
  }, []);

  const startScratch = () => {
    if (availableVouchers <= 0) return;
    setCurrentReward(getRandomReward());
    setIsRevealed(false);
    setIsClaimed(false);
  };

  const handleRevealed = () => {
    setIsRevealed(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const claimReward = () => {
    if (!currentReward || isClaimed) return;
    setIsClaimed(true);

    // Consume one voucher
    const newCount = Math.max(0, availableVouchers - 1);
    const newScratched = totalScratched + 1;
    localStorage.setItem(VOUCHERS_KEY, newCount.toString());
    localStorage.setItem(SCRATCHED_KEY, newScratched.toString());
    setAvailableVouchers(newCount);
    setTotalScratched(newScratched);

    // Apply reward
    if (currentReward.type === 'coins' && currentReward.coinValue) {
      addCoins(currentReward.coinValue, `Gift Voucher: ${currentReward.name}`);
    } else if (currentReward.type === 'shop_item') {
      const owned = JSON.parse(localStorage.getItem('ownedItems') || '{}');
      const itemKey = currentReward.name.toLowerCase().replace(/\s+/g, '-');
      owned[itemKey] = (owned[itemKey] || 0) + 1;
      localStorage.setItem('ownedItems', JSON.stringify(owned));
      addCoins(0, `Free item: ${currentReward.name}`);
    } else if (currentReward.type === 'game_pass') {
      const saved = JSON.parse(localStorage.getItem('spaceGamePasses') || '[]');
      const passMap: Record<string, string> = {
        'Warp Drive (1 Day)': 'skip-cooldowns',
        'Star Booster (1 Day)': 'score-multiplier',
        'Phoenix Pass (3 Days)': 'extra-lives',
      };
      const passId = passMap[currentReward.name];
      if (passId) {
        const now = new Date();
        const days = currentReward.name.includes('3 Days') ? 3 : 1;
        const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        const existing = saved.filter((p: any) => p.passId !== passId);
        existing.push({ passId, purchasedAt: now.toISOString(), expiresAt: expiresAt.toISOString() });
        localStorage.setItem('spaceGamePasses', JSON.stringify(existing));
      }
    } else if (currentReward.type === 'subscription') {
      const now = new Date();
      const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      localStorage.setItem('subscriptionTier', JSON.stringify({
        tier: 'vip',
        purchasedAt: now.toISOString(),
        expiresAt: expires.toISOString()
      }));
    }

    if (newScratched === 1) {
      addAchievement({
        type: 'shop',
        name: 'Lucky Scratcher',
        description: 'Scratched your first gift voucher!',
        icon: '🎁',
      });
    }

    toast({
      title: `🎁 ${currentReward.icon} Reward Claimed!`,
      description: currentReward.description,
    });

    // Reset card after short delay so user can scratch another
    setTimeout(() => {
      setCurrentReward(null);
      setIsRevealed(false);
      setIsClaimed(false);
    }, 2500);
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Gift Vouchers
            </h2>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Complete free courses to earn scratch vouchers! Each course rewards you a voucher with surprise prizes.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          {/* Voucher count */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span className="text-white font-bold text-lg">{availableVouchers}</span>
              <span className="text-white/50 text-sm">voucher{availableVouchers !== 1 ? 's' : ''} available</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400/60" />
              <span className="text-white/40 text-sm">{totalScratched} scratched</span>
            </div>
          </div>

          {/* Scratch area */}
          {!currentReward ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-[260px] h-[160px] rounded-xl border-2 border-dashed border-amber-500/40 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Gift className="w-12 h-12 text-amber-400/60" />
                <p className="text-white/40 text-sm">
                  {availableVouchers > 0 ? 'Ready to scratch!' : 'Complete a course to earn one!'}
                </p>
              </div>

              {availableVouchers > 0 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScratch}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Scratch a Voucher
                </motion.button>
              ) : (
                <p className="text-white/30 text-sm italic">🎓 Complete courses above to earn vouchers</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <ScratchCard reward={currentReward} onRevealed={handleRevealed} />

              <AnimatePresence>
                {isRevealed && !isClaimed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <p className="text-white/70 text-sm">{currentReward.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={claimReward}
                      className={`px-6 py-3 bg-gradient-to-r ${RARITY_COLORS[currentReward.rarity]} text-white font-bold rounded-xl shadow-lg ${RARITY_GLOW[currentReward.rarity]} flex items-center gap-2`}
                    >
                      <Star className="w-5 h-5" />
                      Claim Reward!
                    </motion.button>
                  </motion.div>
                )}

                {isClaimed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <p className="text-green-400 font-bold text-lg">✅ Claimed!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Reward tiers info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 w-full max-w-lg">
            {[
              { label: 'Coins', icon: <Coins className="w-4 h-4" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { label: 'Shop Items', icon: <ShoppingBag className="w-4 h-4" />, color: 'text-green-400', bg: 'bg-green-500/10' },
              { label: 'Game Passes', icon: <Ticket className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'VIP Access', icon: <Crown className="w-4 h-4" />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} rounded-lg p-3 flex flex-col items-center gap-1 border border-white/5`}>
                <span className={item.color}>{item.icon}</span>
                <span className="text-white/70 text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftVoucherSection;
