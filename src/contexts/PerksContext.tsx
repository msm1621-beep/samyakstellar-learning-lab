import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useGamePass } from './GamePassContext';
import { setCoinBonusPercent, setCoinMultiplier } from './CoinsContext';

const MEMBERSHIP_TIERS = [
  { id: 'membership_explorer', tier: 1, icon: '🚀', name: 'Space Explorer', bonus: 5 },
  { id: 'membership_stargazer', tier: 2, icon: '⭐', name: 'Stargazer', bonus: 10 },
  { id: 'membership_astronaut', tier: 3, icon: '👨‍🚀', name: 'Junior Astronaut', bonus: 15 },
  { id: 'membership_cosmic', tier: 4, icon: '🌌', name: 'Cosmic Cadet', bonus: 20 },
  { id: 'membership_nebula', tier: 5, icon: '🌈', name: 'Nebula Navigator', bonus: 25 },
  { id: 'membership_lunar', tier: 6, icon: '🌙', name: 'VIP Lunar Elite', bonus: 30 },
  { id: 'membership_solar', tier: 7, icon: '☀️', name: 'VIP Solar Commander', bonus: 40 },
  { id: 'membership_galaxy', tier: 8, icon: '🌟', name: 'VIP Galaxy Master', bonus: 50 },
  { id: 'membership_universe', tier: 9, icon: '🎖️', name: 'VIP Universe Admiral', bonus: 75 },
  { id: 'membership_supreme', tier: 10, icon: '👑', name: 'VIP Supreme Captain', bonus: 100 },
];

const BOOST_BONUS: Record<string, number> = { daily_double: 25, lucky_charm: 15, xp_boost: 50, solar_flare_boost: 35, hyper_drive: 30, gravity_well: 40, quantum_luck: 20, time_warp: 10 };
export type PerkTheme = 'default' | 'lunar' | 'solar' | 'galaxy' | 'rainbow' | 'supreme';
interface PerksContextType { ownedItems: string[]; isOwned: (id: string) => boolean; badges: { icon: string; label: string; glow: string }[]; frameStyle: string | null; hasAuroraTrail: boolean; hasMeteorRain: boolean; hasSupernova: boolean; hasFireEffects: boolean; hasGalaxyAnimations: boolean; hasRainbowEffects: boolean; hasSupremeCrown: boolean; theme: PerkTheme; webinarTier: number; hasWebinarAccess: boolean; totalCoinBonusPercent: number; totalCoinMultiplier: number; }
const defaultValue: PerksContextType = { ownedItems: [], isOwned: () => false, badges: [], frameStyle: null, hasAuroraTrail: false, hasMeteorRain: false, hasSupernova: false, hasFireEffects: false, hasGalaxyAnimations: false, hasRainbowEffects: false, hasSupremeCrown: false, theme: 'default', webinarTier: 0, hasWebinarAccess: false, totalCoinBonusPercent: 0, totalCoinMultiplier: 1 };
const PerksContext = createContext(defaultValue);

export const PerksProvider = ({ children }: { children: ReactNode }) => {
  const { coinMultiplier, hasPass } = useGamePass();
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  useEffect(() => { const load = () => { try { setOwnedItems(JSON.parse(localStorage.getItem('purchasedShopItems') || '[]')); } catch { setOwnedItems([]); } }; load(); window.addEventListener('storage', load); const timer = setInterval(load, 1500); return () => { window.removeEventListener('storage', load); clearInterval(timer); }; }, []);
  const value = useMemo<PerksContextType>(() => {
    const unique = [...new Set(ownedItems)];
    const ownedMemberships = MEMBERSHIP_TIERS.filter(t => unique.includes(t.id));
    const membership = ownedMemberships.at(-1);
    const tier = membership?.tier || 0;
    const boostBonus = unique.reduce((sum, id) => sum + (BOOST_BONUS[id] || 0), 0);
    const bonus = (membership?.bonus || 0) + boostBonus;
    const has = (id: string) => unique.includes(id);
    let frameStyle: string | null = null;
    if (has('supernova_frame')) frameStyle = 'from-rose-500 via-red-500 to-orange-500'; else if (has('galaxy_crown')) frameStyle = 'from-yellow-400 via-amber-500 to-orange-500'; else if (has('dark_matter_aura')) frameStyle = 'from-slate-700 via-purple-900 to-black'; else if (has('nebula_skin')) frameStyle = 'from-pink-500 via-purple-500 to-indigo-500'; else if (has('cosmic_avatar')) frameStyle = 'from-purple-500 via-violet-500 to-fuchsia-500'; else if (tier >= 10) frameStyle = 'from-yellow-400 via-amber-500 to-orange-600'; else if (tier >= 8) frameStyle = 'from-violet-500 to-fuchsia-500'; else if (tier >= 6) frameStyle = 'from-indigo-500 to-purple-600';
    let theme: PerkTheme = 'default'; if (tier >= 10) theme = 'supreme'; else if (tier >= 9) theme = 'rainbow'; else if (tier >= 8) theme = 'galaxy'; else if (tier >= 7) theme = 'solar'; else if (tier >= 6) theme = 'lunar'; else if (has('nebula_skin')) theme = 'galaxy'; else if (has('supernova_frame')) theme = 'solar';
    const badgeMap: Record<string, { icon: string; glow: string }> = { rocket_badge: { icon: '🚀', glow: 'shadow-cyan-500/50' }, star_collector: { icon: '⭐', glow: 'shadow-amber-500/50' }, constellation_badge: { icon: '✨', glow: 'shadow-blue-500/50' }, galaxy_crown: { icon: '👑', glow: 'shadow-yellow-500/60' }, supernova_frame: { icon: '💥', glow: 'shadow-rose-500/60' }, meteor_glow: { icon: '☄️', glow: 'shadow-orange-500/50' }, nebula_skin: { icon: '🌈', glow: 'shadow-pink-500/50' }, cosmic_avatar: { icon: '🌌', glow: 'shadow-purple-500/50' }, dark_matter_aura: { icon: '🕳️', glow: 'shadow-slate-500/50' }, aurora_trail: { icon: '🌊', glow: 'shadow-teal-500/50' } };
    const badges = unique.filter(id => badgeMap[id]).map(id => ({ icon: badgeMap[id].icon, label: id.replace(/_/g, ' '), glow: badgeMap[id].glow }));
    if (membership) badges.unshift({ icon: membership.icon, label: membership.name, glow: 'shadow-purple-500/60' });
    return { ownedItems, isOwned: has, badges, frameStyle, hasAuroraTrail: has('aurora_trail') || tier >= 6, hasMeteorRain: has('meteor_glow') || tier >= 7, hasSupernova: has('supernova_frame') || tier >= 10, hasFireEffects: tier >= 7 || has('solar_flare_boost'), hasGalaxyAnimations: tier >= 8 || has('cosmic_avatar'), hasRainbowEffects: tier >= 9, hasSupremeCrown: tier >= 10 || has('galaxy_crown'), theme, webinarTier: tier, hasWebinarAccess: tier >= 9 || has('star_collector'), totalCoinBonusPercent: bonus, totalCoinMultiplier: coinMultiplier };
  }, [ownedItems, coinMultiplier]);
  useEffect(() => { setCoinBonusPercent(value.totalCoinBonusPercent); setCoinMultiplier(value.totalCoinMultiplier); }, [value.totalCoinBonusPercent, value.totalCoinMultiplier]);
  useEffect(() => { document.documentElement.setAttribute('data-perk-theme', value.theme); return () => document.documentElement.setAttribute('data-perk-theme', 'default'); }, [value.theme]);
  return <PerksContext.Provider value={value}>{children}</PerksContext.Provider>;
};
export const usePerks = () => useContext(PerksContext);
