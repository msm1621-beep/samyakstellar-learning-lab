import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useSubscription } from './SubscriptionContext';
import { useGamePass } from './GamePassContext';
import { setCoinBonusPercent, setCoinMultiplier } from './CoinsContext';

/**
 * Central aggregator for every premium perk in the app:
 * - Subscription tier (Space Explorer ... Supreme Captain)
 * - Active game passes (Star Booster, Phoenix, Warp Drive, Galaxy Access)
 * - Owned Featured Shop items (cosmetics, boosts, utilities)
 *
 * Exposes a single set of booleans + numbers that the FX layer,
 * AccountBar, Webinars section, and game logic all read from.
 */

const COSMETIC_TIER_ORDER = [
  'cosmic_avatar',
  'nebula_skin',
  'meteor_glow',
  'aurora_trail',
  'constellation_badge',
  'dark_matter_aura',
  'galaxy_crown',
  'supernova_frame',
  'rocket_badge',
  'star_collector',
];

// Boost item id -> coin-bonus percent it adds while owned
const BOOST_BONUS: Record<string, number> = {
  daily_double: 25,
  lucky_charm: 15,
  xp_boost: 50,
  solar_flare_boost: 35,
  hyper_drive: 30,
  gravity_well: 40,
  quantum_luck: 20,
  time_warp: 10,
};

export type PerkTheme =
  | 'default'
  | 'lunar'
  | 'solar'
  | 'galaxy'
  | 'rainbow'
  | 'supreme';

interface PerksContextType {
  ownedItems: string[];
  isOwned: (id: string) => boolean;
  badges: { icon: string; label: string; glow: string }[];
  frameStyle: string | null; // tailwind gradient classes for profile ring
  hasAuroraTrail: boolean;
  hasMeteorRain: boolean;
  hasSupernova: boolean;
  hasFireEffects: boolean;
  hasGalaxyAnimations: boolean;
  hasRainbowEffects: boolean;
  hasSupremeCrown: boolean;
  theme: PerkTheme;
  webinarTier: number; // 0..10
  hasWebinarAccess: boolean;
  totalCoinBonusPercent: number;
  totalCoinMultiplier: number;
}

const PerksContext = createContext<PerksContextType>({
  ownedItems: [],
  isOwned: () => false,
  badges: [],
  frameStyle: null,
  hasAuroraTrail: false,
  hasMeteorRain: false,
  hasSupernova: false,
  hasFireEffects: false,
  hasGalaxyAnimations: false,
  hasRainbowEffects: false,
  hasSupremeCrown: false,
  theme: 'default',
  webinarTier: 0,
  hasWebinarAccess: false,
  totalCoinBonusPercent: 0,
  totalCoinMultiplier: 1,
});

export const PerksProvider = ({ children }: { children: ReactNode }) => {
  const { currentSubscription, coinBonus, isExpired } = useSubscription();
  const { coinMultiplier, hasPass } = useGamePass();
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  // Watch localStorage (shop writes to 'purchasedShopItems')
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('purchasedShopItems');
        setOwnedItems(raw ? JSON.parse(raw) : []);
      } catch {
        setOwnedItems([]);
      }
    };
    load();
    window.addEventListener('storage', load);
    // Poll lightly — shop writes are same-tab
    const interval = setInterval(load, 1500);
    return () => {
      window.removeEventListener('storage', load);
      clearInterval(interval);
    };
  }, []);

  const isOwned = (id: string) => ownedItems.includes(id);

  // Compute everything memoized
  const value = useMemo<PerksContextType>(() => {
    const tier = currentSubscription && !isExpired ? currentSubscription.tier : 0;
    const subBonus = coinBonus || 0;

    // Stack all owned boost bonuses (unique only — owning duplicates does not stack)
    const uniqueOwned = Array.from(new Set(ownedItems));
    const boostBonus = uniqueOwned.reduce(
      (sum, id) => sum + (BOOST_BONUS[id] || 0),
      0,
    );

    // Game pass extra bonus
    const passBonus = hasPass('score-multiplier') ? 0 : 0; // multiplier handled below

    const totalCoinBonusPercent = subBonus + boostBonus + passBonus;
    const totalCoinMultiplier = coinMultiplier; // already 1 or 2 from game pass

    // Pick highest tier cosmetic the user owns to drive the profile frame
    let frameStyle: string | null = null;
    if (uniqueOwned.includes('supernova_frame'))
      frameStyle = 'from-rose-500 via-red-500 to-orange-500';
    else if (uniqueOwned.includes('galaxy_crown'))
      frameStyle = 'from-yellow-400 via-amber-500 to-orange-500';
    else if (uniqueOwned.includes('dark_matter_aura'))
      frameStyle = 'from-slate-700 via-purple-900 to-black';
    else if (uniqueOwned.includes('nebula_skin'))
      frameStyle = 'from-pink-500 via-purple-500 to-indigo-500';
    else if (uniqueOwned.includes('cosmic_avatar'))
      frameStyle = 'from-purple-500 via-violet-500 to-fuchsia-500';
    else if (tier >= 10) frameStyle = 'from-yellow-400 via-amber-500 to-orange-600';
    else if (tier >= 8) frameStyle = 'from-violet-500 to-fuchsia-500';
    else if (tier >= 6) frameStyle = 'from-indigo-500 to-purple-600';

    // Theme selection — subscription tier first, then cosmetics
    let theme: PerkTheme = 'default';
    if (tier >= 10) theme = 'supreme';
    else if (tier >= 9) theme = 'rainbow';
    else if (tier >= 8) theme = 'galaxy';
    else if (tier >= 7) theme = 'solar';
    else if (tier >= 6) theme = 'lunar';
    else if (uniqueOwned.includes('nebula_skin')) theme = 'galaxy';
    else if (uniqueOwned.includes('supernova_frame')) theme = 'solar';

    // Visual flags
    const hasAuroraTrail =
      uniqueOwned.includes('aurora_trail') || tier >= 6;
    const hasMeteorRain =
      uniqueOwned.includes('meteor_glow') || tier >= 7;
    const hasSupernova =
      uniqueOwned.includes('supernova_frame') || tier >= 10;
    const hasFireEffects = tier >= 7 || uniqueOwned.includes('solar_flare_boost');
    const hasGalaxyAnimations = tier >= 8 || uniqueOwned.includes('cosmic_avatar');
    const hasRainbowEffects = tier >= 9;
    const hasSupremeCrown = tier >= 10 || uniqueOwned.includes('galaxy_crown');

    // Badges from owned cosmetics + subscription
    const badgeMap: Record<string, { icon: string; glow: string }> = {
      rocket_badge: { icon: '🚀', glow: 'shadow-cyan-500/50' },
      star_collector: { icon: '⭐', glow: 'shadow-amber-500/50' },
      constellation_badge: { icon: '✨', glow: 'shadow-blue-500/50' },
      galaxy_crown: { icon: '👑', glow: 'shadow-yellow-500/60' },
      supernova_frame: { icon: '💥', glow: 'shadow-rose-500/60' },
      meteor_glow: { icon: '☄️', glow: 'shadow-orange-500/50' },
      nebula_skin: { icon: '🌈', glow: 'shadow-pink-500/50' },
      cosmic_avatar: { icon: '🌌', glow: 'shadow-purple-500/50' },
      dark_matter_aura: { icon: '🕳️', glow: 'shadow-slate-500/50' },
      aurora_trail: { icon: '🌊', glow: 'shadow-teal-500/50' },
    };

    const badges = uniqueOwned
      .filter((id) => badgeMap[id])
      .map((id) => ({
        icon: badgeMap[id].icon,
        label: id.replace(/_/g, ' '),
        glow: badgeMap[id].glow,
      }));

    if (currentSubscription && !isExpired) {
      badges.unshift({
        icon: currentSubscription.badge,
        label: currentSubscription.name,
        glow: 'shadow-purple-500/60',
      });
    }

    return {
      ownedItems,
      isOwned,
      badges,
      frameStyle,
      hasAuroraTrail,
      hasMeteorRain,
      hasSupernova,
      hasFireEffects,
      hasGalaxyAnimations,
      hasRainbowEffects,
      hasSupremeCrown,
      theme,
      webinarTier: tier,
      hasWebinarAccess: tier >= 9 || uniqueOwned.includes('star_collector'),
      totalCoinBonusPercent,
      totalCoinMultiplier,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownedItems, currentSubscription, isExpired, coinBonus, coinMultiplier, hasPass]);

  // Push aggregated rewards into CoinsContext
  useEffect(() => {
    setCoinBonusPercent(value.totalCoinBonusPercent);
    setCoinMultiplier(value.totalCoinMultiplier);
  }, [value.totalCoinBonusPercent, value.totalCoinMultiplier]);

  // Apply theme attribute to <html> so CSS variables can react
  useEffect(() => {
    document.documentElement.setAttribute('data-perk-theme', value.theme);
    return () => {
      document.documentElement.setAttribute('data-perk-theme', 'default');
    };
  }, [value.theme]);

  return <PerksContext.Provider value={value}>{children}</PerksContext.Provider>;
};

export const usePerks = () => useContext(PerksContext);
