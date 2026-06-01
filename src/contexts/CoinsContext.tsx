import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CoinsContextType {
  coins: number;
  addCoins: (amount: number, reason: string) => void;
  removeCoins: (amount: number) => boolean;
  totalEarned: number;
  recentReward: { amount: number; reason: string } | null;
  clearRecentReward: () => void;
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

const COIN_REWARDS = {
  GAME_WIN: 50,
  COURSE_COMPLETE: 100,
  BOOK_COMPLETE: 30,
  AUDIOBOOK_COMPLETE: 40,
  QUIZ_PERFECT: 75,
  QUIZ_GOOD: 25,
};

export { COIN_REWARDS };

// We store a coin bonus ref that SubscriptionContext / PerksContext can update
let _coinBonusPercent = 0;
let _coinMultiplier = 1;
export const setCoinBonusPercent = (percent: number) => { _coinBonusPercent = percent; };
export const setCoinMultiplier = (mult: number) => { _coinMultiplier = Math.max(1, mult); };

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [recentReward, setRecentReward] = useState<{ amount: number; reason: string } | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedCoins = localStorage.getItem('spaceCoins');
    const savedTotal = localStorage.getItem('spaceTotalEarned');
    if (savedCoins) setCoins(parseInt(savedCoins, 10));
    if (savedTotal) setTotalEarned(parseInt(savedTotal, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('spaceCoins', coins.toString());
    localStorage.setItem('spaceTotalEarned', totalEarned.toString());
  }, [coins, totalEarned]);

  const addCoins = (amount: number, reason: string) => {
    // Apply subscription/perk coin bonus + game-pass multiplier for positive earnings (not purchases)
    let finalAmount = amount;
    let bonusLabel = '';
    if (amount > 0) {
      if (_coinBonusPercent > 0) {
        const bonus = Math.floor(amount * _coinBonusPercent / 100);
        finalAmount = amount + bonus;
        bonusLabel = ` (+${_coinBonusPercent}% perk bonus!)`;
      }
      if (_coinMultiplier > 1) {
        finalAmount = finalAmount * _coinMultiplier;
        bonusLabel += ` (x${_coinMultiplier} pass!)`;
      }
    }
    setCoins(prev => prev + finalAmount);
    if (finalAmount > 0) setTotalEarned(prev => prev + finalAmount);
    setRecentReward({ amount: finalAmount, reason: bonusLabel ? `${reason}${bonusLabel}` : reason });
    
    // Auto-clear reward notification after 3 seconds
    setTimeout(() => {
      setRecentReward(null);
    }, 3000);
  };

  const removeCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  const clearRecentReward = () => {
    setRecentReward(null);
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, removeCoins, totalEarned, recentReward, clearRecentReward }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};
