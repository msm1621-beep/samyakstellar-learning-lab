import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GamePass, getGamePassById } from '@/data/gamePasses';
import { useCoins } from './CoinsContext';
import { toast } from '@/hooks/use-toast';

interface ActiveGamePass {
  passId: string;
  purchasedAt: string;
  expiresAt: string;
}

interface GamePassContextType {
  activePasses: ActiveGamePass[];
  hasPass: (passId: string) => boolean;
  purchasePass: (passId: string) => boolean;
  getPassExpiry: (passId: string) => Date | null;
  extraLives: number;
  useExtraLife: () => boolean;
  coinMultiplier: number;
  hasPremiumGames: boolean;
  hasNoCooldowns: boolean;
}

const GamePassContext = createContext<GamePassContextType>({
  activePasses: [],
  hasPass: () => false,
  purchasePass: () => false,
  getPassExpiry: () => null,
  extraLives: 0,
  useExtraLife: () => false,
  coinMultiplier: 1,
  hasPremiumGames: false,
  hasNoCooldowns: false,
});

export const GamePassProvider = ({ children }: { children: ReactNode }) => {
  const [activePasses, setActivePasses] = useState<ActiveGamePass[]>([]);
  const [extraLives, setExtraLives] = useState(0);
  const { coins, addCoins } = useCoins();

  // Load from localStorage and filter expired passes
  useEffect(() => {
    const saved = localStorage.getItem('spaceGamePasses');
    if (saved) {
      const passes: ActiveGamePass[] = JSON.parse(saved);
      const now = new Date();
      const validPasses = passes.filter(p => new Date(p.expiresAt) > now);
      setActivePasses(validPasses);
      localStorage.setItem('spaceGamePasses', JSON.stringify(validPasses));
    }

    const savedLives = localStorage.getItem('spaceExtraLives');
    if (savedLives) {
      setExtraLives(parseInt(savedLives, 10));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('spaceGamePasses', JSON.stringify(activePasses));
  }, [activePasses]);

  useEffect(() => {
    localStorage.setItem('spaceExtraLives', extraLives.toString());
  }, [extraLives]);

  const hasPass = (passId: string): boolean => {
    const pass = activePasses.find(p => p.passId === passId);
    if (!pass) return false;
    return new Date(pass.expiresAt) > new Date();
  };

  const getPassExpiry = (passId: string): Date | null => {
    const pass = activePasses.find(p => p.passId === passId);
    return pass ? new Date(pass.expiresAt) : null;
  };

  const purchasePass = (passId: string): boolean => {
    const gamePass = getGamePassById(passId);
    if (!gamePass) {
      toast({
        title: "Error",
        description: "Game pass not found!",
        variant: "destructive"
      });
      return false;
    }

    if (coins < gamePass.price) {
      toast({
        title: "Not enough coins! 🪙",
        description: `You need ${gamePass.price - coins} more coins.`,
        variant: "destructive"
      });
      return false;
    }

    // Check if already has this pass
    if (hasPass(passId)) {
      toast({
        title: "Already Active!",
        description: `Your ${gamePass.name} is still active.`,
        variant: "destructive"
      });
      return false;
    }

    // Deduct coins
    addCoins(-gamePass.price, `Purchased: ${gamePass.name}`);

    // Create new pass
    const now = new Date();
    const expiresAt = new Date(now.getTime() + gamePass.duration * 24 * 60 * 60 * 1000);
    
    const newPass: ActiveGamePass = {
      passId,
      purchasedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    setActivePasses(prev => [...prev.filter(p => p.passId !== passId), newPass]);

    // Grant extra lives if Phoenix Pass
    if (passId === 'extra-lives') {
      setExtraLives(prev => prev + 3);
    }

    toast({
      title: `🎮 ${gamePass.icon} ${gamePass.name} Activated!`,
      description: `Enjoy your perks for ${gamePass.duration} days!`,
    });

    return true;
  };

  const useExtraLife = (): boolean => {
    if (extraLives > 0) {
      setExtraLives(prev => prev - 1);
      toast({
        title: "🔥 Extra Life Used!",
        description: `${extraLives - 1} lives remaining.`,
      });
      return true;
    }
    return false;
  };

  const coinMultiplier = hasPass('score-multiplier') ? 2 : 1;
  const hasPremiumGames = hasPass('premium-games');
  const hasNoCooldowns = hasPass('skip-cooldowns');

  return (
    <GamePassContext.Provider value={{
      activePasses,
      hasPass,
      purchasePass,
      getPassExpiry,
      extraLives,
      useExtraLife,
      coinMultiplier,
      hasPremiumGames,
      hasNoCooldowns
    }}>
      {children}
    </GamePassContext.Provider>
  );
};

export const useGamePass = () => {
  return useContext(GamePassContext);
};
