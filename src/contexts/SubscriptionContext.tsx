import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Subscription, getSubscriptionById } from '@/data/subscriptions';
import { useCoins } from './CoinsContext';
import { useToast } from '@/hooks/use-toast';
 
 interface ActiveSubscription {
   subscriptionId: string;
   purchasedAt: string;
   expiresAt: string;
  lastDailyBonusClaimed: string | null;
 }
 
 interface SubscriptionContextType {
   activeSubscription: ActiveSubscription | null;
   currentSubscription: Subscription | null;
   purchaseSubscription: (subscriptionId: string) => boolean;
   daysRemaining: number;
   isExpired: boolean;
  coinBonus: number;
  dailyBonus: number;
  badge: string | null;
  claimDailyBonus: () => boolean;
  canClaimDailyBonus: boolean;
 }
 
  const SubscriptionContext = createContext<SubscriptionContextType>({
    activeSubscription: null,
    currentSubscription: null,
    purchaseSubscription: () => false,
    daysRemaining: 0,
    isExpired: true,
    coinBonus: 0,
    dailyBonus: 0,
    badge: null,
    claimDailyBonus: () => false,
    canClaimDailyBonus: false,
  });
 
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
 
   const coinBonus = currentSubscription && !isExpired ? currentSubscription.coinBonus : 0;
   const dailyBonus = currentSubscription && !isExpired ? currentSubscription.dailyBonus : 0;
   const badge = currentSubscription && !isExpired ? currentSubscription.badge : null;

    // Coin bonus is now applied by PerksContext (which aggregates subscription + shop boosts).

  // Check if daily bonus can be claimed
  const canClaimDailyBonus = useCallback(() => {
    if (!activeSubscription || isExpired || !currentSubscription) return false;
    
    if (!activeSubscription.lastDailyBonusClaimed) return true;
    
    const lastClaimed = new Date(activeSubscription.lastDailyBonusClaimed);
    const today = new Date();
    return lastClaimed.toDateString() !== today.toDateString();
  }, [activeSubscription, isExpired, currentSubscription]);

  const claimDailyBonus = (): boolean => {
    if (!canClaimDailyBonus() || !currentSubscription) {
      toast({
        title: "Already Claimed!",
        description: "Come back tomorrow for your next daily bonus! 🌟",
        variant: "destructive"
      });
      return false;
    }

    addCoins(currentSubscription.dailyBonus, `Daily ${currentSubscription.name} bonus`);
    
    const updated = {
      ...activeSubscription!,
      lastDailyBonusClaimed: new Date().toISOString()
    };
    setActiveSubscription(updated);
    localStorage.setItem('spaceSubscription', JSON.stringify(updated));

    toast({
      title: `🎁 Daily Bonus Claimed!`,
      description: `+${currentSubscription.dailyBonus} coins from your ${currentSubscription.name} subscription!`,
    });

    return true;
  };

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
      expiresAt: expiresAt.toISOString(),
      lastDailyBonusClaimed: null
     };
 
     setActiveSubscription(newSubscription);
     localStorage.setItem('spaceSubscription', JSON.stringify(newSubscription));
 
     toast({
       title: `🎉 ${subscription.icon} Subscription Activated!`,
      description: `Welcome to ${subscription.name}! Enjoy ${subscription.coinBonus}% bonus coins for 30 days!`,
     });
 
     return true;
   };
 
   return (
     <SubscriptionContext.Provider value={{
       activeSubscription,
       currentSubscription,
       purchaseSubscription,
       daysRemaining,
      isExpired,
      coinBonus,
      dailyBonus,
      badge,
      claimDailyBonus,
      canClaimDailyBonus: canClaimDailyBonus()
     }}>
       {children}
     </SubscriptionContext.Provider>
   );
 };
 
 export const useSubscription = () => {
    return useContext(SubscriptionContext);
 };