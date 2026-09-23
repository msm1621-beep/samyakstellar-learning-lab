import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Palette, Star, Zap, Gift, Crown, Coins } from 'lucide-react';
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
  category: 'boost' | 'cosmetic' | 'utility' | 'membership';
  color: string;
  popular?: boolean;
  features?: string[];
}

// Memberships are now permanent Featured Shop bundles. Prices intentionally match
// the former subscription prices, but purchases are made with coins and never expire.
const membershipItems: ShopItem[] = [
  { id: 'membership_explorer', name: 'Space Explorer', description: 'Explorer badge, +5% coins, and 10 daily bonus coins.', price: 100, icon: '🚀', category: 'membership', color: 'from-blue-400 to-blue-600', features: ['Explorer badge on profile', '+5% bonus coins', '10 daily bonus coins'] },
  { id: 'membership_stargazer', name: 'Stargazer', description: 'Stargazer badge, +10% coins, 15 daily bonus coins, and priority support.', price: 200, icon: '⭐', category: 'membership', color: 'from-yellow-400 to-orange-500', features: ['Stargazer badge', '+10% bonus coins', '15 daily bonus coins', 'Priority support'] },
  { id: 'membership_astronaut', name: 'Junior Astronaut', description: 'Astronaut badge, +15% coins, 20 daily bonus coins, and an exclusive frame.', price: 350, icon: '👨‍🚀', category: 'membership', color: 'from-green-400 to-emerald-600', features: ['Astronaut badge', '+15% bonus coins', '20 daily bonus coins', 'Exclusive profile frame'] },
  { id: 'membership_cosmic', name: 'Cosmic Cadet', description: 'Cosmic badge, +20% coins, 25 daily bonus coins, and animated effects.', price: 500, icon: '🌌', category: 'membership', color: 'from-purple-400 to-purple-600', features: ['Cosmic badge', '+20% bonus coins', '25 daily bonus coins', 'Animated profile effects'] },
  { id: 'membership_nebula', name: 'Nebula Navigator', description: 'Navigator badge, +25% coins, 30 daily bonus coins, and custom themes.', price: 750, icon: '🌈', category: 'membership', color: 'from-pink-400 to-rose-600', features: ['Navigator badge', '+25% bonus coins', '30 daily bonus coins', 'Custom themes'] },
  { id: 'membership_lunar', name: 'VIP Lunar Elite', description: 'VIP badge, +30% coins, 50 daily bonus coins, glow effects, and early access.', price: 1000, icon: '🌙', category: 'membership', color: 'from-indigo-500 to-purple-700', popular: true, features: ['VIP Lunar badge', '+30% bonus coins', '50 daily bonus coins', 'Special glow effects', 'Early access'] },
  { id: 'membership_solar', name: 'VIP Solar Commander', description: 'Commander badge, +40% coins, 75 daily bonus coins, fire effects, and double quiz rewards.', price: 1500, icon: '☀️', category: 'membership', color: 'from-orange-500 to-red-600', features: ['VIP Commander badge', '+40% bonus coins', '75 daily bonus coins', 'Fire effects', 'Double quiz rewards'] },
  { id: 'membership_galaxy', name: 'VIP Galaxy Master', description: 'Master badge, +50% coins, 100 daily bonus coins, galaxy animations, and triple game rewards.', price: 2000, icon: '🌟', category: 'membership', color: 'from-violet-600 to-fuchsia-600', features: ['VIP Master badge', '+50% bonus coins', '100 daily bonus coins', 'Galaxy animations', 'Triple game rewards'] },
  { id: 'membership_universe', name: 'VIP Universe Admiral', description: 'Admiral badge, +75% coins, 150 daily bonus coins, rainbow effects, and advanced challenges.', price: 3000, icon: '🎖️', category: 'membership', color: 'from-amber-500 to-yellow-600', features: ['Admiral badge', '+75% bonus coins', '150 daily bonus coins', 'Rainbow effects', 'Advanced learning challenges'] },
  { id: 'membership_supreme', name: 'VIP Supreme Captain', description: 'Supreme Crown, +100% coins, 200 daily bonus coins, and every premium effect.', price: 5000, icon: '👑', category: 'membership', color: 'from-yellow-400 via-amber-500 to-orange-600', popular: true, features: ['Supreme Crown', '+100% bonus coins', '200 daily bonus coins', 'All effects unlocked', 'Personal certificate', 'Lifetime recognition'] },
];

const shopItems: ShopItem[] = [
  ...membershipItems,
  { id: 'daily_double', name: 'Daily Double', description: 'Double your next daily coin bonus', price: 50, icon: '⚡', category: 'boost', color: 'from-yellow-500 to-amber-500' },
  { id: 'lucky_charm', name: 'Lucky Charm', description: 'Increase quiz rewards by 10%', price: 75, icon: '🍀', category: 'boost', color: 'from-green-500 to-emerald-500' },
  { id: 'xp_boost', name: 'XP Boost (24h)', description: 'Earn 50% more coins for 24 hours', price: 120, icon: '🔥', category: 'boost', color: 'from-red-500 to-orange-500' },
  { id: 'time_warp', name: 'Time Warp', description: 'Get an extra 30 seconds on timed quizzes', price: 65, icon: '⏳', category: 'boost', color: 'from-blue-400 to-cyan-400' },
  { id: 'solar_flare_boost', name: 'Solar Flare Boost', description: 'Triple coins on your next game win', price: 90, icon: '☀️', category: 'boost', color: 'from-orange-400 to-red-500' },
  { id: 'hyper_drive', name: 'Hyper Drive', description: 'Speed through lessons 2x faster', price: 110, icon: '💨', category: 'boost', color: 'from-indigo-500 to-purple-500' },
  { id: 'gravity_well', name: 'Gravity Well', description: 'Attract bonus coins from all activities', price: 140, icon: '🌀', category: 'boost', color: 'from-violet-500 to-fuchsia-500' },
  { id: 'quantum_luck', name: 'Quantum Luck', description: 'Chance to double any reward', price: 85, icon: '🎲', category: 'boost', color: 'from-teal-400 to-green-400' },
  { id: 'cosmic_avatar', name: 'Cosmic Avatar Frame', description: 'A glowing cosmic border for your profile', price: 150, icon: '🌌', category: 'cosmetic', color: 'from-purple-500 to-violet-500' },
  { id: 'rocket_badge', name: 'Rocket Pioneer Badge', description: 'Show your space exploration spirit', price: 100, icon: '🚀', category: 'cosmetic', color: 'from-cyan-500 to-blue-500' },
  { id: 'star_collector', name: 'Star Collector Badge', description: 'A prestigious badge for dedicated learners', price: 200, icon: '⭐', category: 'cosmetic', color: 'from-amber-400 to-yellow-500' },
  { id: 'nebula_skin', name: 'Nebula Skin', description: 'Wrap your profile in swirling nebula colors', price: 180, icon: '🌈', category: 'cosmetic', color: 'from-pink-500 to-purple-600' },
  { id: 'galaxy_crown', name: 'Galaxy Crown', description: 'A majestic crown made of stardust', price: 250, icon: '👑', category: 'cosmetic', color: 'from-yellow-400 to-amber-600' },
  { id: 'aurora_trail', name: 'Aurora Trail', description: 'Leave a shimmering aurora behind your cursor', price: 160, icon: '🌊', category: 'cosmetic', color: 'from-green-400 to-teal-500' },
  { id: 'meteor_glow', name: 'Meteor Glow', description: 'Your profile glows with fiery meteor energy', price: 130, icon: '☄️', category: 'cosmetic', color: 'from-red-400 to-orange-500' },
  { id: 'dark_matter_aura', name: 'Dark Matter Aura', description: 'An enigmatic dark aura surrounds your avatar', price: 220, icon: '🕳️', category: 'cosmetic', color: 'from-gray-600 to-slate-800' },
  { id: 'constellation_badge', name: 'Constellation Badge', description: 'A twinkling constellation pattern badge', price: 175, icon: '✨', category: 'cosmetic', color: 'from-blue-300 to-indigo-500' },
  { id: 'supernova_frame', name: 'Supernova Frame', description: 'An explosive frame that radiates energy', price: 300, icon: '💥', category: 'cosmetic', color: 'from-rose-500 to-red-600' },
  { id: 'hint_pack', name: 'Hint Pack (5 Hints)', description: 'Get hints for tough quiz questions', price: 60, icon: '💡', category: 'utility', color: 'from-amber-500 to-orange-500' },
  { id: 'streak_shield', name: 'Streak Shield', description: 'Protect your learning streak for 3 days', price: 80, icon: '🛡️', category: 'utility', color: 'from-blue-500 to-indigo-500' },
  { id: 'wormhole_pass', name: 'Wormhole Pass', description: 'Skip ahead to any course module', price: 100, icon: '🌀', category: 'utility', color: 'from-purple-400 to-indigo-600' },
];

const categoryConfig = {
  membership: { icon: Crown, label: 'Featured Memberships', color: 'text-amber-400' },
  boost: { icon: Zap, label: 'Boosts', color: 'text-yellow-400' },
  cosmetic: { icon: Palette, label: 'Cosmetics', color: 'text-purple-400' },
  utility: { icon: Gift, label: 'Utility', color: 'text-cyan-400' },
};

const FeaturedShop = () => {
  const { coins, removeCoins, addCoins } = useCoins();
  const { addAchievement, hasAchievement } = useAchievements();
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('purchasedShopItems') || '[]'); } catch { return []; }
  });
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryConfig | 'all'>('all');

  useEffect(() => {
    purchasedItems.forEach(id => {
      const item = shopItems.find(i => i.id === id);
      if (item && !hasAchievement(item.name, 'shop')) addAchievement({ type: 'shop', name: item.name, icon: item.icon, description: item.description, category: item.category });
    });
  }, [purchasedItems, addAchievement, hasAchievement]);

  const owned = (id: string) => purchasedItems.includes(id);
  const filteredItems = useMemo(() => activeCategory === 'all' ? shopItems : shopItems.filter(i => i.category === activeCategory), [activeCategory]);
  const highestMembership = [...membershipItems].reverse().find(item => owned(item.id));
  const dailyBonus = highestMembership ? [10, 15, 20, 25, 30, 50, 75, 100, 150, 200][membershipItems.findIndex(i => i.id === highestMembership.id)] : 0;

  const claimDailyBonus = () => {
    if (!highestMembership || dailyBonus === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem('lastShopDailyBonus') === today) { toast.info('Daily bonus already claimed. Come back tomorrow!'); return; }
    localStorage.setItem('lastShopDailyBonus', today);
    addCoins(dailyBonus, `${highestMembership.name} daily bonus`);
    toast.success(`+${dailyBonus} coins claimed!`);
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins < item.price) { toast.error(`Not enough coins! Need ${item.price - coins} more 🪙`); return; }
    if (!removeCoins(item.price, `Purchased: ${item.name}`)) return;
    const next = [...purchasedItems, item.id];
    setPurchasedItems(next);
    localStorage.setItem('purchasedShopItems', JSON.stringify(next));
    if (!hasAchievement(item.name, 'shop')) addAchievement({ type: 'shop', name: item.name, icon: item.icon, description: item.description, category: item.category });
    toast.success(`${item.name} added to your collection!`, { description: item.description });
  };

  return <section className="py-16 px-4" id="shop"><div className="max-w-6xl mx-auto">
    <div className="text-center mb-12"><div className="flex items-center justify-center gap-3 mb-4"><ShoppingBag className="w-8 h-8 text-pink-400" /><h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">Featured Space Shop</h2><Sparkles className="w-8 h-8 text-purple-400" /></div>
      <p className="text-white/60 max-w-2xl mx-auto mb-4">Subscriptions are gone. Buy permanent membership perks and shop items directly with coins.</p>
      {highestMembership && <Button onClick={claimDailyBonus} className="mb-5 bg-gradient-to-r from-amber-500 to-orange-500"><Coins className="w-4 h-4 mr-2" />Claim {dailyBonus} daily coins</Button>}
      <div className="flex justify-center gap-2 flex-wrap"><Button variant={activeCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setActiveCategory('all')}>All ({shopItems.length})</Button>{Object.entries(categoryConfig).map(([key, config]) => { const Icon = config.icon; return <Button key={key} variant={activeCategory === key ? 'default' : 'outline'} size="sm" onClick={() => setActiveCategory(key as keyof typeof categoryConfig)}><Icon className={`w-4 h-4 mr-1 ${config.color}`} />{config.label}</Button>; })}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{filteredItems.map((item, index) => { const isOwned = owned(item.id); const canAfford = coins >= item.price; const config = categoryConfig[item.category]; const Icon = config.icon; return <motion.div key={item.id} className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl p-5 overflow-hidden ${isOwned ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .02 }}><div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />{item.popular && !isOwned && <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full"><Star className="w-3 h-3 inline mr-1" />Popular</div>}{isOwned && <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Owned</div>}<div className="relative z-10"><div className="text-5xl mb-3">{item.icon}</div><div className="flex items-center gap-2 mb-2"><Icon className={`w-4 h-4 ${config.color}`} /><span className={`text-xs ${config.color}`}>{config.label}</span></div><h3 className="text-lg font-bold text-white mb-1">{item.name}</h3><p className="text-white/60 text-sm mb-3">{item.description}</p>{item.features && <ul className="text-xs text-white/50 space-y-1 mb-3">{item.features.map(feature => <li key={feature}>✓ {feature}</li>)}</ul>}<div className="flex items-center justify-between mb-4"><span className="text-amber-400 font-bold text-lg">{item.price} 🪙</span></div><Button onClick={() => handlePurchase(item)} disabled={isOwned || !canAfford} className={`w-full bg-gradient-to-r ${item.color}`}>{isOwned ? 'Owned' : canAfford ? 'Buy' : `Need ${item.price - coins} more`}</Button></div></motion.div>; })}</div>
  </div></section>;
};

export default FeaturedShop;
