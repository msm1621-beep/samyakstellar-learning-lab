import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Palette, Rocket, Star, Zap, Gift, Crown, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCoins } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'boost' | 'cosmetic' | 'utility';
  color: string;
  popular?: boolean;
}

const shopItems: ShopItem[] = [
  // BOOSTS
  { id: 'daily_double', name: 'Daily Double', description: 'Double your next daily coin bonus', price: 50, icon: '⚡', category: 'boost', color: 'from-yellow-500 to-amber-500', popular: true },
  { id: 'lucky_charm', name: 'Lucky Charm', description: 'Increase quiz correct answers by 10%', price: 75, icon: '🍀', category: 'boost', color: 'from-green-500 to-emerald-500' },
  { id: 'xp_boost', name: 'XP Boost (24h)', description: 'Earn 50% more coins for 24 hours', price: 120, icon: '🔥', category: 'boost', color: 'from-red-500 to-orange-500', popular: true },
  { id: 'time_warp', name: 'Time Warp', description: 'Get an extra 30s on timed quizzes', price: 65, icon: '⏳', category: 'boost', color: 'from-blue-400 to-cyan-400' },
  { id: 'solar_flare_boost', name: 'Solar Flare Boost', description: 'Triple coins on your next game win', price: 90, icon: '☀️', category: 'boost', color: 'from-orange-400 to-red-500' },
  { id: 'hyper_drive', name: 'Hyper Drive', description: 'Speed through lessons 2x faster', price: 110, icon: '💨', category: 'boost', color: 'from-indigo-500 to-purple-500' },
  { id: 'gravity_well', name: 'Gravity Well', description: 'Attract bonus coins from all activities', price: 140, icon: '🌀', category: 'boost', color: 'from-violet-500 to-fuchsia-500' },
  { id: 'quantum_luck', name: 'Quantum Luck', description: 'Random chance to double any reward', price: 85, icon: '🎲', category: 'boost', color: 'from-teal-400 to-green-400' },

  // COSMETICS
  { id: 'cosmic_avatar', name: 'Cosmic Avatar Frame', description: 'A glowing cosmic border for your profile', price: 150, icon: '🌌', category: 'cosmetic', color: 'from-purple-500 to-violet-500' },
  { id: 'rocket_badge', name: 'Rocket Pioneer Badge', description: 'Show off your space exploration spirit', price: 100, icon: '🚀', category: 'cosmetic', color: 'from-cyan-500 to-blue-500', popular: true },
  { id: 'star_collector', name: 'Star Collector Badge', description: 'A prestigious badge for dedicated learners', price: 200, icon: '⭐', category: 'cosmetic', color: 'from-amber-400 to-yellow-500' },
  { id: 'nebula_skin', name: 'Nebula Skin', description: 'Wrap your profile in swirling nebula colors', price: 180, icon: '🌈', category: 'cosmetic', color: 'from-pink-500 to-purple-600' },
  { id: 'galaxy_crown', name: 'Galaxy Crown', description: 'A majestic crown made of stardust', price: 250, icon: '👑', category: 'cosmetic', color: 'from-yellow-400 to-amber-600', popular: true },
  { id: 'aurora_trail', name: 'Aurora Trail', description: 'Leave a shimmering aurora behind your cursor', price: 160, icon: '🌊', category: 'cosmetic', color: 'from-green-400 to-teal-500' },
  { id: 'meteor_glow', name: 'Meteor Glow', description: 'Your profile glows with fiery meteor energy', price: 130, icon: '☄️', category: 'cosmetic', color: 'from-red-400 to-orange-500' },
  { id: 'dark_matter_aura', name: 'Dark Matter Aura', description: 'An enigmatic dark aura surrounds your avatar', price: 220, icon: '🕳️', category: 'cosmetic', color: 'from-gray-600 to-slate-800' },
  { id: 'constellation_badge', name: 'Constellation Badge', description: 'A twinkling constellation pattern badge', price: 175, icon: '✨', category: 'cosmetic', color: 'from-blue-300 to-indigo-500' },
  { id: 'supernova_frame', name: 'Supernova Frame', description: 'An explosive frame that radiates energy', price: 300, icon: '💥', category: 'cosmetic', color: 'from-rose-500 to-red-600' },

  // UTILITIES
  { id: 'hint_pack', name: 'Hint Pack (5 Hints)', description: 'Get hints for tough quiz questions', price: 60, icon: '💡', category: 'utility', color: 'from-amber-500 to-orange-500' },
  { id: 'streak_shield', name: 'Streak Shield', description: 'Protect your learning streak for 3 days', price: 80, icon: '🛡️', category: 'utility', color: 'from-blue-500 to-indigo-500' },
  { id: 'gravity_boots', name: 'Gravity Boots', description: 'Skip one failed quiz without losing coins', price: 70, icon: '🥾', category: 'utility', color: 'from-stone-500 to-amber-700' },
  { id: 'meteor_shield', name: 'Meteor Shield', description: 'Block one wrong answer in a quiz', price: 55, icon: '🪨', category: 'utility', color: 'from-slate-500 to-gray-600' },
  { id: 'wormhole_pass', name: 'Wormhole Pass', description: 'Skip ahead to any course module', price: 100, icon: '🌀', category: 'utility', color: 'from-purple-400 to-indigo-600' },
  { id: 'asteroid_cruncher', name: 'Asteroid Cruncher', description: 'Destroy obstacles in learning paths', price: 45, icon: '💎', category: 'utility', color: 'from-cyan-400 to-sky-500' },
  { id: 'telescope_upgrade', name: 'Telescope Upgrade', description: 'Preview answers before committing', price: 95, icon: '🔭', category: 'utility', color: 'from-emerald-400 to-green-600' },
  { id: 'cosmic_compass', name: 'Cosmic Compass', description: 'Navigate to the best study material', price: 75, icon: '🧭', category: 'utility', color: 'from-sky-400 to-blue-600' },
];

const categoryConfig = {
  boost: { icon: Zap, label: 'Boosts', color: 'text-yellow-400' },
  cosmetic: { icon: Palette, label: 'Cosmetics', color: 'text-purple-400' },
  utility: { icon: Gift, label: 'Utility', color: 'text-cyan-400' },
};

const FeaturedShop = () => {
  const { t } = useLanguage();
  const { coins, removeCoins } = useCoins();
  const { addAchievement, hasAchievement } = useAchievements();
  const [purchasedItems, setPurchasedItems] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('purchasedShopItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Add achievements for previously purchased items on mount
  useEffect(() => {
    purchasedItems.forEach(itemId => {
      const item = shopItems.find(i => i.id === itemId);
      if (item && !hasAchievement(item.name, 'shop')) {
        addAchievement({
          type: 'shop',
          name: item.name,
          icon: item.icon,
          description: item.description,
          category: item.category
        });
      }
    });
  }, []); // Only run on mount

  const getOwnerCount = (id: string) => purchasedItems.filter(i => i === id).length;

  const handlePurchase = (item: ShopItem) => {
    if (coins < item.price) {
      toast.error(`Not enough coins! Need ${item.price - coins} more 🪙`);
      return;
    }

    removeCoins(item.price);
    const newPurchased = [...purchasedItems, item.id];
    setPurchasedItems(newPurchased);
    localStorage.setItem('purchasedShopItems', JSON.stringify(newPurchased));
    
    // Add achievement only on first purchase
    if (!hasAchievement(item.name, 'shop')) {
      addAchievement({
        type: 'shop',
        name: item.name,
        icon: item.icon,
        description: item.description,
        category: item.category
      });
    }
    
    const count = newPurchased.filter(i => i === item.id).length;
    toast.success(`${item.name} purchased! ${item.icon}`, {
      description: count > 1 ? `You now own ${count} of these!` : item.description,
    });
  };

  const [activeCategory, setActiveCategory] = React.useState<'all' | 'boost' | 'cosmetic' | 'utility'>('all');
  const filteredItems = activeCategory === 'all' ? shopItems : shopItems.filter(i => i.category === activeCategory);

  return (
    <section className="py-16 px-4" id="shop">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-pink-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              {t('section.shop')}
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/60 max-w-2xl mx-auto mb-4">
            {t('shop.desc')}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
              className={activeCategory === 'all' ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'border-white/20 text-white/60'}
            >
              All ({shopItems.length})
            </Button>
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              const count = shopItems.filter(i => i.category === key).length;
              return (
                <Button
                  key={key}
                  variant={activeCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(key as any)}
                  className={activeCategory === key ? `bg-gradient-to-r from-pink-500 to-purple-500` : 'border-white/20 text-white/60'}
                >
                  <Icon className={`w-4 h-4 mr-1 ${config.color}`} />
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const ownCount = getOwnerCount(item.id);
            const canAfford = coins >= item.price;
            const config = categoryConfig[item.category];
            const CategoryIcon = config.icon;

            return (
              <motion.div
                key={item.id}
                className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-5 overflow-hidden ${
                  ownCount > 0 ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />

                {item.popular && ownCount === 0 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                )}

                {ownCount > 0 && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Owned x{ownCount}
                  </div>
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon className={`w-4 h-4 ${config.color}`} />
                    <span className={`text-xs ${config.color}`}>{config.label}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-400 font-bold text-lg">{item.price} 🪙</span>
                  </div>

                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford}
                    className={`w-full bg-gradient-to-r ${item.color} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {canAfford ? (ownCount > 0 ? t('common.buy') : t('common.buy')) : `Need ${item.price - coins} more`}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShop;
