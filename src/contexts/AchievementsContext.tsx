import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Achievement {
  id: string;
  type: 'course' | 'game' | 'quiz' | 'book' | 'audiobook' | 'shop' | 'gamepass' | 'subscription';
  name: string;
  earnedAt: string;
  icon: string;
  description?: string;
  category?: string; // For shop items: 'boost', 'cosmetic', 'utility'
}

interface AchievementsContextType {
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id' | 'earnedAt'>) => void;
  removeAchievement: (id: string) => void;
  hasAchievement: (name: string, type: string) => boolean;
  getAchievementsByType: (type: Achievement['type']) => Achievement[];
  totalAchievements: number;
}

const AchievementsContext = createContext<AchievementsContextType>({
  achievements: [],
  addAchievement: () => {},
  removeAchievement: () => {},
  hasAchievement: () => false,
  getAchievementsByType: () => [],
  totalAchievements: 0,
});

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spaceAchievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('spaceAchievements', JSON.stringify(achievements));
  }, [achievements]);

  const addAchievement = (achievement: Omit<Achievement, 'id' | 'earnedAt'>) => {
    // Check if already has this achievement
    if (hasAchievement(achievement.name, achievement.type)) {
      return;
    }

    const newAchievement: Achievement = {
      ...achievement,
      id: `${achievement.type}-${Date.now()}`,
      earnedAt: new Date().toISOString()
    };

    setAchievements(prev => [...prev, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  const hasAchievement = (name: string, type: string): boolean => {
    return achievements.some(a => a.name === name && a.type === type);
  };

  const getAchievementsByType = (type: Achievement['type']): Achievement[] => {
    return achievements.filter(a => a.type === type);
  };

  return (
    <AchievementsContext.Provider value={{
      achievements,
      addAchievement,
      removeAchievement,
      hasAchievement,
      getAchievementsByType,
      totalAchievements: achievements.length
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  return useContext(AchievementsContext);
};
