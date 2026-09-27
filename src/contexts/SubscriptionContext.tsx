import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Subscription, getSubscriptionById } from '@/data/subscriptions';
import { useCoins } from './CoinsContext';
import { useToast } from '@/hooks/use-toast';

interface ActiveSubscription {
  subscriptionId: string;
  purchasedAt: string;
  expiresAt: string;
  lastDailyBonusClaimed: string | null;
  cancelAtPeriodEnd?: boolean;
}

interface SubscriptionContextType {
  activeSubscription: ActiveSubscription | null;
  currentSubscription: Subscription | null;
  purchaseSubscription: (subscriptionId: string) => boolean;
  cancelSubscription: () => boolean;
  keepSubscription: () => boolean;
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
  cancelSubscription: () => false,
  keepSubscription: () => false,
  daysRemaining: 0,
  isExpired: true,
  coinBonus: 0,
  dailyBonus: 0,
  badge: null,
  claimDailyBonus: () => false,
  canClaimDailyBonus: false,
});

const SUBSCRIPTION_DURATION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { coins, addCoins, removeCoins } = useCoins();
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('spaceSubscription');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ActiveSubscription;
        if (getSubscriptionById(parsed.subscriptionId) && Number.isFinite(new Date(parsed.expiresAt).getTime())) {
          setActiveSubscription(parsed);
        }
      } catch (error) {
        console.error('Failed to parse subscription:', error);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (activeSubscription) localStorage.setItem('spaceSubscription', JSON.stringify(activeSubscription));
    else localStorage.removeItem('spaceSubscription');
  }, [activeSubscription, loaded]);

  const currentSubscription = activeSubscription
    ? getSubscriptionById(activeSubscription.subscriptionId) ?? null
    : null;
  const isExpired = activeSubscription ? new Date(activeSubscription.expiresAt) <= new Date() : true;
  const daysRemaining = activeSubscription
    ? Math.max(0, Math.ceil((new Date(activeSubscription.expiresAt).getTime() - Date.now()) / DAY_MS))
    : 0;
  const coinBonus = currentSubscription && !isExpired ? currentSubscription.coinBonus : 0;
  const dailyBonus = currentSubscription && !isExpired ? currentSubscription.dailyBonus : 0;
  const badge = currentSubscription && !isExpired ? currentSubscription.badge : null;
  const canClaimDailyBonus = Boolean(
    activeSubscription && !isExpired && currentSubscription &&
    (!activeSubscription.lastDailyBonusClaimed ||
      new Date(activeSubscription.lastDailyBonusClaimed).toDateString() !== new Date().toDateString()),
  );

  const claimDailyBonus = (): boolean => {
    if (!canClaimDailyBonus || !currentSubscription || !activeSubscription) {
      toast({ title: 'Daily bonus unavailable', description: 'Your bonus has already been claimed today or your plan has ended.' });
      return false;
    }
    addCoins(currentSubscription.dailyBonus, `Daily ${currentSubscription.name} bonus`);
    setActiveSubscription({ ...activeSubscription, lastDailyBonusClaimed: new Date().toISOString() });
    toast({ title: 'Daily Bonus Claimed!', description: `+${currentSubscription.dailyBonus} coins from ${currentSubscription.name}.` });
    return true;
  };

  const purchaseSubscription = (subscriptionId: string): boolean => {
    const subscription = getSubscriptionById(subscriptionId);
    if (!subscription) {
      toast({ title: 'Plan unavailable', description: 'This subscription plan could not be found.', variant: 'destructive' });
      return false;
    }
    if (coins < subscription.price) {
      toast({ title: 'Not enough coins', description: `You need ${subscription.price - coins} more coins.`, variant: 'destructive' });
      return false;
    }
    if (!removeCoins(subscription.price, `${activeSubscription?.subscriptionId === subscriptionId ? 'Renewed' : 'Purchased'}: ${subscription.name}`)) {
      toast({ title: 'Not enough coins', description: 'Your balance changed. Please try again.', variant: 'destructive' });
      return false;
    }

    const now = new Date();
    const sameActivePlan = activeSubscription?.subscriptionId === subscriptionId && !isExpired;
    const expiryBase = sameActivePlan ? Math.max(now.getTime(), new Date(activeSubscription.expiresAt).getTime()) : now.getTime();
    const expiresAt = new Date(expiryBase + SUBSCRIPTION_DURATION_DAYS * DAY_MS);
    setActiveSubscription({
      subscriptionId,
      purchasedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lastDailyBonusClaimed: sameActivePlan ? activeSubscription.lastDailyBonusClaimed : null,
      cancelAtPeriodEnd: false,
    });
    toast({ title: `${subscription.icon} ${sameActivePlan ? 'Plan Renewed' : 'Plan Activated'}!`, description: `${subscription.name} is active for 30 days.` });
    return true;
  };

  const cancelSubscription = (): boolean => {
    if (!activeSubscription || isExpired || activeSubscription.cancelAtPeriodEnd) return false;
    setActiveSubscription({ ...activeSubscription, cancelAtPeriodEnd: true });
    toast({ title: 'Cancellation scheduled', description: 'Your plan benefits remain active until the current expiry date.' });
    return true;
  };

  const keepSubscription = (): boolean => {
    if (!activeSubscription?.cancelAtPeriodEnd || isExpired) return false;
    setActiveSubscription({ ...activeSubscription, cancelAtPeriodEnd: false });
    toast({ title: 'Plan kept', description: 'Your current plan will remain active.' });
    return true;
  };

  return (
    <SubscriptionContext.Provider value={{
      activeSubscription, currentSubscription, purchaseSubscription, cancelSubscription, keepSubscription,
      daysRemaining, isExpired, coinBonus, dailyBonus, badge, claimDailyBonus, canClaimDailyBonus,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);