 import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 import { Subscription, subscriptions, getSubscriptionById } from '@/data/subscriptions';
 import { useCoins } from './CoinsContext';
 import { useToast } from '@/hooks/use-toast';
 
 interface ActiveSubscription {
   subscriptionId: string;
   purchasedAt: string;
   expiresAt: string;
 }
 
 interface SubscriptionContextType {
   activeSubscription: ActiveSubscription | null;
   currentSubscription: Subscription | null;
   purchaseSubscription: (subscriptionId: string) => boolean;
   hasVideoAccess: (videoId: string) => boolean;
   getAccessibleVideoIds: () => string[];
   daysRemaining: number;
   isExpired: boolean;
 }
 
 const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);
 
 const SUBSCRIPTION_DURATION_DAYS = 30;
 
 export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
   const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
   const { coins, addCoins } = useCoins();
   const { toast } = useToast();
 
   // Load from localStorage
   useEffect(() => {
     const saved = localStorage.getItem('spaceSubscription');
     if (saved) {
       const parsed = JSON.parse(saved) as ActiveSubscription;
       // Check if expired
       const expiresAt = new Date(parsed.expiresAt);
       if (expiresAt > new Date()) {
         setActiveSubscription(parsed);
       } else {
         localStorage.removeItem('spaceSubscription');
       }
     }
   }, []);
 
   // Save to localStorage
   useEffect(() => {
     if (activeSubscription) {
       localStorage.setItem('spaceSubscription', JSON.stringify(activeSubscription));
     }
   }, [activeSubscription]);
 
   const currentSubscription = activeSubscription 
     ? getSubscriptionById(activeSubscription.subscriptionId) || null
     : null;
 
   const daysRemaining = activeSubscription
     ? Math.max(0, Math.ceil((new Date(activeSubscription.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
     : 0;
 
   const isExpired = activeSubscription 
     ? new Date(activeSubscription.expiresAt) <= new Date()
     : true;
 
   const purchaseSubscription = (subscriptionId: string): boolean => {
     const subscription = getSubscriptionById(subscriptionId);
     if (!subscription) {
       toast({
         title: "Error",
         description: "Subscription not found!",
         variant: "destructive"
       });
       return false;
     }
 
     if (coins < subscription.price) {
       toast({
         title: "Not enough coins! 🪙",
         description: `You need ${subscription.price - coins} more coins to buy this subscription.`,
         variant: "destructive"
       });
       return false;
     }
 
     // Deduct coins (using negative amount)
     addCoins(-subscription.price, `Purchased: ${subscription.name}`);
 
     // Set subscription
     const now = new Date();
     const expiresAt = new Date(now.getTime() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000);
     
     const newSubscription: ActiveSubscription = {
       subscriptionId,
       purchasedAt: now.toISOString(),
       expiresAt: expiresAt.toISOString()
     };
 
     setActiveSubscription(newSubscription);
     localStorage.setItem('spaceSubscription', JSON.stringify(newSubscription));
 
     toast({
       title: `🎉 ${subscription.icon} Subscription Activated!`,
       description: `Welcome to ${subscription.name}! Enjoy for 30 days.`,
     });
 
     return true;
   };
 
   const hasVideoAccess = (videoId: string): boolean => {
     if (!currentSubscription || isExpired) return false;
     return currentSubscription.videoAccess.includes(videoId);
   };
 
   const getAccessibleVideoIds = (): string[] => {
     if (!currentSubscription || isExpired) return [];
     return currentSubscription.videoAccess;
   };
 
   return (
     <SubscriptionContext.Provider value={{
       activeSubscription,
       currentSubscription,
       purchaseSubscription,
       hasVideoAccess,
       getAccessibleVideoIds,
       daysRemaining,
       isExpired
     }}>
       {children}
     </SubscriptionContext.Provider>
   );
 };
 
 export const useSubscription = () => {
   const context = useContext(SubscriptionContext);
   if (context === undefined) {
     throw new Error('useSubscription must be used within a SubscriptionProvider');
   }
   return context;
 };