import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Palette, Rocket, Star, Zap, Gift, Crown, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCoins } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';
import { toast } from 'sonner';

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
  {
    id: 'daily_double',
    name: 'Daily Double',
    description: 'Double your next daily coin bonus',
    price: 50,
    icon: '⚡',
    category: 'boost',
    color: 'from-yellow-500 to-amber-500',
    popular: true,
  },
  {
    id: 'lucky_charm',
    name: 'Lucky Charm',
    description: 'Increase quiz correct answers by 10%',
    price: 75,
    icon: '🍀',
    category: 'boost',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'cosmic_avatar',
    name: 'Cosmic Avatar Frame',
    description: 'A glowing cosmic border for your profile',
    price: 150,
    icon: '🌌',
    category: 'cosmetic',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'rocket_badge',
    name: 'Rocket Pioneer Badge',
    description: 'Show off your space exploration spirit',
    price: 100,
    icon: '🚀',
    category: 'cosmetic',
    color: 'from-cyan-500 to-blue-500',
    popular: true,
  },
  {
    id: 'hint_pack',
    name: 'Hint Pack (5 Hints)',
    description: 'Get hints for tough quiz questions',
    price: 60,
    icon: '💡',
    category: 'utility',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'streak_shield',
    name: 'Streak Shield',
    description: 'Protect your learning streak for 3 days',
    price: 80,
    icon: '🛡️',
    category: 'utility',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'star_collector',
    name: 'Star Collector Badge',
    description: 'A prestigious badge for dedicated learners',
    price: 200,
    icon: '⭐',
    category: 'cosmetic',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'xp_boost',
    name: 'XP Boost (24h)',
    description: 'Earn 50% more coins for 24 hours',
    price: 120,
    icon: '🔥',
    category: 'boost',
    color: 'from-red-500 to-orange-500',
    popular: true,
  },
];

const categoryConfig = {
  boost: { icon: Zap, label: 'Boosts', color: 'text-yellow-400' },
  cosmetic: { icon: Palette, label: 'Cosmetics', color: 'text-purple-400' },
  utility: { icon: Gift, label: 'Utility', color: 'text-cyan-400' },
};

const FeaturedShop = () => {
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

  const handlePurchase = (item: ShopItem) => {
    if (coins < item.price) {
      toast.error(`Not enough coins! Need ${item.price - coins} more 🪙`);
      return;
    }

    removeCoins(item.price);
    const newPurchased = [...purchasedItems, item.id];
    setPurchasedItems(newPurchased);
    localStorage.setItem('purchasedShopItems', JSON.stringify(newPurchased));
    
    // Add achievement for shop purchase
    addAchievement({
      type: 'shop',
      name: item.name,
      icon: item.icon,
      description: item.description,
      category: item.category
    });
    
    toast.success(`${item.name} purchased! ${item.icon}`, {
      description: item.description,
    });
  };

  const isPurchased = (id: string) => purchasedItems.includes(id);

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
              Featured Shop
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Spend your hard-earned coins on boosts, cosmetics, and special items to enhance your learning journey!
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-white/50">{config.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopItems.map((item, index) => {
            const owned = isPurchased(item.id);
            const canAfford = coins >= item.price;
            const config = categoryConfig[item.category];
            const CategoryIcon = config.icon;

            return (
              <motion.div
                key={item.id}
                className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-5 overflow-hidden ${
                  owned ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />

                {/* Popular badge */}
                {item.popular && !owned && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                )}

                {/* Owned badge */}
                {owned && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    OWNED
                  </div>
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
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

                  {owned ? (
                    <div className="text-center py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" />
                        Owned
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={!canAfford}
                      className={`w-full bg-gradient-to-r ${item.color} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      {canAfford ? 'Purchase' : `Need ${item.price - coins} more`}
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

export default FeaturedShop;
