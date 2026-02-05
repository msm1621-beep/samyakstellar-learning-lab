 import { Video } from './videos';
 
 export interface Subscription {
   id: string;
   name: string;
   tier: number;
   price: number; // in coins
   icon: string;
   color: string;
   features: string[];
   videoAccess: string[]; // video IDs accessible with this subscription
   isVIP: boolean;
 }
 
 export const subscriptions: Subscription[] = [
   {
     id: 'explorer',
     name: 'Space Explorer',
     tier: 1,
     price: 100,
     icon: '🚀',
     color: 'from-blue-400 to-blue-600',
     features: ['Access to 3 basic videos', 'Solar System content'],
     videoAccess: ['v1', 'v8', 'v10'],
     isVIP: false
   },
   {
     id: 'stargazer',
     name: 'Stargazer',
     tier: 2,
     price: 200,
     icon: '⭐',
     color: 'from-yellow-400 to-orange-500',
     features: ['Access to 5 videos', 'Stars & Nebulas content', 'Beginner level'],
     videoAccess: ['v1', 'v2', 'v7', 'v8', 'v14'],
     isVIP: false
   },
   {
     id: 'astronaut',
     name: 'Junior Astronaut',
     tier: 3,
     price: 350,
     icon: '👨‍🚀',
     color: 'from-green-400 to-emerald-600',
     features: ['Access to 8 videos', 'Space exploration content', 'ISS access'],
     videoAccess: ['v1', 'v8', 'v10', 'v12', 'v13', 'v22', 'v23', 'v24'],
     isVIP: false
   },
   {
     id: 'cosmic',
     name: 'Cosmic Cadet',
     tier: 4,
     price: 500,
     icon: '🌌',
     color: 'from-purple-400 to-purple-600',
     features: ['Access to 10 videos', 'Galaxy content', 'Black holes access'],
     videoAccess: ['v1', 'v4', 'v5', 'v6', 'v8', 'v10', 'v11', 'v15', 'v17', 'v22'],
     isVIP: false
   },
   {
     id: 'nebula',
     name: 'Nebula Navigator',
     tier: 5,
     price: 750,
     icon: '🌈',
     color: 'from-pink-400 to-rose-600',
     features: ['Access to 12 videos', 'Star lifecycle content', 'Advanced topics'],
     videoAccess: ['v1', 'v2', 'v3', 'v7', 'v8', 'v9', 'v10', 'v14', 'v21', 'v22', 'v23', 'v24'],
     isVIP: false
   },
   {
     id: 'vip-lunar',
     name: 'VIP Lunar Elite',
     tier: 6,
     price: 1000,
     icon: '🌙',
     color: 'from-indigo-500 to-purple-700',
     features: ['Access to 15 videos', 'VIP badge', 'All beginner content', 'Priority support'],
     videoAccess: ['v1', 'v2', 'v5', 'v7', 'v8', 'v10', 'v12', 'v13', 'v14', 'v18', 'v20', 'v22', 'v23', 'v24', 'v16'],
     isVIP: true
   },
   {
     id: 'vip-solar',
     name: 'VIP Solar Commander',
     tier: 7,
     price: 1500,
     icon: '☀️',
     color: 'from-orange-500 to-red-600',
     features: ['Access to 18 videos', 'VIP badge', 'Solar System mastery', 'Exclusive content'],
     videoAccess: ['v1', 'v2', 'v3', 'v5', 'v7', 'v8', 'v9', 'v10', 'v12', 'v13', 'v14', 'v16', 'v18', 'v20', 'v21', 'v22', 'v23', 'v24'],
     isVIP: true
   },
   {
     id: 'vip-galaxy',
     name: 'VIP Galaxy Master',
     tier: 8,
     price: 2000,
     icon: '🌟',
     color: 'from-violet-600 to-fuchsia-600',
     features: ['Access to 20 videos', 'VIP badge', 'All advanced content', 'Special animations'],
     videoAccess: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16', 'v17', 'v18', 'v20', 'v21'],
     isVIP: true
   },
   {
     id: 'vip-universe',
     name: 'VIP Universe Admiral',
     tier: 9,
     price: 3000,
     icon: '🎖️',
     color: 'from-amber-500 to-yellow-600',
     features: ['Access to 22 videos', 'Admiral badge', 'All content unlocked', 'Exclusive webinars'],
     videoAccess: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16', 'v17', 'v18', 'v19', 'v20', 'v21', 'v22'],
     isVIP: true
   },
   {
     id: 'vip-supreme',
     name: 'VIP Supreme Captain',
     tier: 10,
     price: 5000,
     icon: '👑',
     color: 'from-yellow-400 via-amber-500 to-orange-600',
     features: ['ALL 24 videos unlocked!', 'Supreme badge', 'Lifetime perks', 'Early access to new content', 'Personalized certificate'],
     videoAccess: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16', 'v17', 'v18', 'v19', 'v20', 'v21', 'v22', 'v23', 'v24'],
     isVIP: true
   }
 ];
 
 export const getSubscriptionById = (id: string): Subscription | undefined => {
   return subscriptions.find(sub => sub.id === id);
 };
 
 export const getAccessibleVideos = (subscriptionId: string | null): string[] => {
   if (!subscriptionId) return [];
   const subscription = getSubscriptionById(subscriptionId);
   return subscription?.videoAccess || [];
 };