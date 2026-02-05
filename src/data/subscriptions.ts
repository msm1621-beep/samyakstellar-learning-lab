export interface Subscription {
   id: string;
   name: string;
   tier: number;
   price: number; // in coins
   icon: string;
   color: string;
  features: string[]; // VIP perks and benefits
   isVIP: boolean;
  badge: string; // Special badge for subscriber
  coinBonus: number; // Percentage bonus on earned coins
  dailyBonus: number; // Daily login bonus coins
 }
 
 export const subscriptions: Subscription[] = [
   {
     id: 'explorer',
     name: 'Space Explorer',
     tier: 1,
     price: 100,
     icon: '🚀',
     color: 'from-blue-400 to-blue-600',
    features: ['Explorer badge on profile', '5% bonus coins', '10 daily login coins'],
    isVIP: false,
    badge: '🚀',
    coinBonus: 5,
    dailyBonus: 10
   },
   {
     id: 'stargazer',
     name: 'Stargazer',
     tier: 2,
     price: 200,
     icon: '⭐',
     color: 'from-yellow-400 to-orange-500',
    features: ['Stargazer badge', '10% bonus coins', '15 daily login coins', 'Priority support'],
    isVIP: false,
    badge: '⭐',
    coinBonus: 10,
    dailyBonus: 15
   },
   {
     id: 'astronaut',
     name: 'Junior Astronaut',
     tier: 3,
     price: 350,
     icon: '👨‍🚀',
     color: 'from-green-400 to-emerald-600',
    features: ['Astronaut badge', '15% bonus coins', '20 daily login coins', 'Exclusive profile frame'],
    isVIP: false,
    badge: '👨‍🚀',
    coinBonus: 15,
    dailyBonus: 20
   },
   {
     id: 'cosmic',
     name: 'Cosmic Cadet',
     tier: 4,
     price: 500,
     icon: '🌌',
     color: 'from-purple-400 to-purple-600',
    features: ['Cosmic badge', '20% bonus coins', '25 daily login coins', 'Animated profile effects'],
    isVIP: false,
    badge: '🌌',
    coinBonus: 20,
    dailyBonus: 25
   },
   {
     id: 'nebula',
     name: 'Nebula Navigator',
     tier: 5,
     price: 750,
     icon: '🌈',
     color: 'from-pink-400 to-rose-600',
    features: ['Navigator badge', '25% bonus coins', '30 daily login coins', 'Custom themes'],
    isVIP: false,
    badge: '🌈',
    coinBonus: 25,
    dailyBonus: 30
   },
   {
     id: 'vip-lunar',
     name: 'VIP Lunar Elite',
     tier: 6,
     price: 1000,
     icon: '🌙',
     color: 'from-indigo-500 to-purple-700',
    features: ['VIP Lunar badge ✨', '30% bonus coins', '50 daily coins', 'Special glow effects', 'Early access'],
    isVIP: true,
    badge: '🌙✨',
    coinBonus: 30,
    dailyBonus: 50
   },
   {
     id: 'vip-solar',
     name: 'VIP Solar Commander',
     tier: 7,
     price: 1500,
     icon: '☀️',
     color: 'from-orange-500 to-red-600',
    features: ['VIP Commander badge 🔥', '40% bonus coins', '75 daily coins', 'Fire effects', 'Double quiz rewards'],
    isVIP: true,
    badge: '☀️🔥',
    coinBonus: 40,
    dailyBonus: 75
   },
   {
     id: 'vip-galaxy',
     name: 'VIP Galaxy Master',
     tier: 8,
     price: 2000,
     icon: '🌟',
     color: 'from-violet-600 to-fuchsia-600',
    features: ['VIP Master badge 💫', '50% bonus coins', '100 daily coins', 'Galaxy animations', 'Triple game rewards'],
    isVIP: true,
    badge: '🌟💫',
    coinBonus: 50,
    dailyBonus: 100
   },
   {
     id: 'vip-universe',
     name: 'VIP Universe Admiral',
     tier: 9,
     price: 3000,
     icon: '🎖️',
     color: 'from-amber-500 to-yellow-600',
    features: ['Admiral badge 🏆', '75% bonus coins', '150 daily coins', 'Rainbow effects', 'Exclusive webinars'],
    isVIP: true,
    badge: '🎖️🏆',
    coinBonus: 75,
    dailyBonus: 150
   },
   {
     id: 'vip-supreme',
     name: 'VIP Supreme Captain',
     tier: 10,
     price: 5000,
     icon: '👑',
     color: 'from-yellow-400 via-amber-500 to-orange-600',
    features: ['Supreme Crown 👑✨', '100% DOUBLE coins!', '200 daily coins', 'All effects unlocked', 'Personal certificate', 'Lifetime recognition'],
    isVIP: true,
    badge: '👑✨',
    coinBonus: 100,
    dailyBonus: 200
   }
 ];
 
 export const getSubscriptionById = (id: string): Subscription | undefined => {
   return subscriptions.find(sub => sub.id === id);
 };