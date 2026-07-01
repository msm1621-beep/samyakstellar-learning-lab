// Cosmic Alien Pets — 10 rarities × 50 pets = 500 unique pets.
// Every pet has a rarity, base power, and elemental trait used by the arena.

export type PetRarity =
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic'
  | 'gold'
  | 'godly'
  | 'secret'
  | 'cosmic'
  | 'infinity';

export type PetTrait = 'fire' | 'ice' | 'void' | 'light' | 'cosmic' | 'nature';

export interface AlienPet {
  id: string;
  name: string;
  emoji: string;
  rarity: PetRarity;
  power: number; // base battle power
  trait: PetTrait;
  description: string;
}

export interface RarityMeta {
  label: string;
  weight: number;
  basePower: [number, number];
  gradient: string;
  glow: string;
  border: string;
  textGradient: string;
}

export const RARITY_META: Record<PetRarity, RarityMeta> = {
  common:    { label: 'Common',    weight: 5000, basePower: [10, 25],   gradient: 'from-slate-500 to-slate-700',     glow: 'shadow-slate-500/30',   border: 'border-slate-400/40',  textGradient: 'from-slate-200 to-slate-400' },
  rare:      { label: 'Rare',      weight: 2500, basePower: [25, 45],   gradient: 'from-sky-500 to-blue-700',        glow: 'shadow-sky-500/40',     border: 'border-sky-400/50',    textGradient: 'from-sky-300 to-blue-400' },
  epic:      { label: 'Epic',      weight: 1200, basePower: [45, 70],   gradient: 'from-purple-500 to-fuchsia-700',  glow: 'shadow-purple-500/40',  border: 'border-purple-400/50', textGradient: 'from-purple-300 to-fuchsia-400' },
  legendary: { label: 'Legendary', weight: 600,  basePower: [70, 100],  gradient: 'from-amber-500 to-orange-600',    glow: 'shadow-amber-500/50',   border: 'border-amber-400/60',  textGradient: 'from-amber-300 to-orange-400' },
  mythic:    { label: 'Mythic',    weight: 300,  basePower: [100, 140], gradient: 'from-rose-500 to-red-700',        glow: 'shadow-rose-500/50',    border: 'border-rose-400/60',   textGradient: 'from-rose-300 to-red-400' },
  gold:      { label: 'Gold',      weight: 180,  basePower: [140, 180], gradient: 'from-yellow-400 to-amber-600',    glow: 'shadow-yellow-400/60',  border: 'border-yellow-300/70', textGradient: 'from-yellow-200 to-amber-400' },
  godly:     { label: 'Godly',     weight: 90,   basePower: [180, 230], gradient: 'from-emerald-400 to-teal-600',    glow: 'shadow-emerald-400/60', border: 'border-emerald-300/70', textGradient: 'from-emerald-200 to-teal-300' },
  secret:    { label: 'Secret',    weight: 40,   basePower: [230, 290], gradient: 'from-zinc-700 to-black',          glow: 'shadow-zinc-300/40',    border: 'border-zinc-300/60',   textGradient: 'from-zinc-200 to-zinc-400' },
  cosmic:    { label: 'Cosmic',    weight: 20,   basePower: [290, 360], gradient: 'from-indigo-500 via-purple-500 to-pink-500', glow: 'shadow-pink-500/60', border: 'border-pink-300/70', textGradient: 'from-indigo-300 via-purple-300 to-pink-300' },
  infinity:  { label: 'Infinity',  weight: 8,    basePower: [360, 500], gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400', glow: 'shadow-fuchsia-400/70', border: 'border-cyan-200/80', textGradient: 'from-cyan-200 via-fuchsia-200 to-yellow-200' },
};

export const TRAIT_META: Record<PetTrait, { label: string; emoji: string; color: string }> = {
  fire:   { label: 'Fire',   emoji: '🔥', color: 'text-orange-300' },
  ice:    { label: 'Ice',    emoji: '❄️', color: 'text-cyan-300' },
  void:   { label: 'Void',   emoji: '🌑', color: 'text-zinc-300' },
  light:  { label: 'Light',  emoji: '✨', color: 'text-yellow-200' },
  cosmic: { label: 'Cosmic', emoji: '🌌', color: 'text-fuchsia-300' },
  nature: { label: 'Nature', emoji: '🌿', color: 'text-emerald-300' },
};

const TRAITS: PetTrait[] = ['fire', 'ice', 'void', 'light', 'cosmic', 'nature'];

// Rock-paper-scissors advantage chain: A beats B => +20% damage
const TRAIT_ADVANTAGE: Record<PetTrait, PetTrait> = {
  fire: 'ice',
  ice: 'nature',
  nature: 'void',
  void: 'light',
  light: 'cosmic',
  cosmic: 'fire',
};

export const traitBonus = (attacker: PetTrait, defender: PetTrait) => {
  if (TRAIT_ADVANTAGE[attacker] === defender) return 1.2;
  if (TRAIT_ADVANTAGE[defender] === attacker) return 0.85;
  return 1;
};

const BASE_NAMES: Record<PetRarity, string[]> = {
  common: ['Zixel','Bloop','Glarn','Pebbi','Nubbi','Squix','Tinx','Mooshu','Glip','Drooz','Wobbi','Pipsy','Floof','Nibz','Crumb','Tato','Bibo','Snorl','Pluk','Wisp'],
  rare: ['Astro Otter','Lumi Slug','Quark Cub','Nova Chick','Vapor Fox','Tide Newt','Spark Pup','Mossling','Glow Bat','Echo Frog','Mist Crab','Pulse Joey','Dewdrop','Sunbun','Halo Mole','Drift Tadpole','Static Imp','Aether Mouse','Petal Pip','Crystal Snail'],
  epic: ['Nebula Cat','Plasma Hare','Ion Wolf','Quasar Lynx','Stardust Fawn','Pixel Dragonet','Aurora Crow','Voidling','Photon Squid','Riftling','Lunar Vixen','Solar Hawk','Magma Toad','Frostbloom','Mirror Stag','Shimmer Eel','Glacial Imp','Storm Mantis','Prism Bat','Astral Mink'],
  legendary: ['Comet Tiger','Galaxy Phoenix','Black Hole Pup','Supernova Stag','Eclipse Wyrm','Solar Lion','Lunar Kraken','Quantum Falcon','Time Tortoise','Gravity Bear','Nebular Drake','Stellar Mantis','Polar Phoenix','Inferno Lynx','Aurora Serpent','Meteor Ram','Pulsar Owl','Void Panther','Crystal Wyrm','Astral Whale'],
  mythic: ['Chronos Hydra','Dreamweaver','Star Forger','Eon Basilisk','Mythic Pegasus','Sun Devourer','Moon Wraith','Galaxy Sphinx','Cosmic Kitsune','Aurora Leviathan','Phoenix Lord','Storm Titan','Crystal Empress','Astral Behemoth','Void Reaper','Echoing Wyrm','Sky Harbinger','Plasma Roc','Solar Sovereign','Lunar Monarch'],
  gold: ['Goldwing Drake','Auric Phoenix','Sunforged Lion','Bullion Beetle','Midas Serpent','Goldhoof Stag','Aureus Stallion','Helio Sphinx','Solar Ram','Goldmane Hydra','Crown Cub','Gilded Owl','Auric Whale','Golden Yeti','Sungod Fox','Auric Kraken','Goldfin Shark','Auric Behemoth','Sunshard Mantis','Goldspark Wisp'],
  godly: ['Helios Avatar','Selene Avatar','Aether Saint','Astra Oracle','Solis Guardian','Lunara Sage','Stelar Cherub','Pyrios Knight','Voltus Seraph','Nereus Tide','Boreas Storm','Notus Breeze','Vesta Flame','Janus Watcher','Aurora Saint','Eclipse Saint','Zenith Spirit','Nadir Spirit','Verdant Saint','Frostborn Saint'],
  secret: ['??? Glitch','Null Walker','Shadow Cipher','The Hidden','Whisper','Unknown One','Erased','Forgotten King','The Anomaly','Phantom Zero','Hex','Sigil','Cipher','Rift Echo','Voidkin','Static','Mirage','Specter','Nullbeast','The Watcher'],
  cosmic: ['Cosmic Devourer','Galactic Empress','Universal Drake','Andromeda','Milky Way','Pulsar Lord','Quasar Empress','Cosmic Phoenix','Stellar Architect','Nebular Sovereign','Cosmic Leviathan','Astral Titan','Singularity','Cosmic Wyrm','Galactic Heart','Star Forger','Cosmic Oracle','Universe Walker','Cosmic Hydra','Eclipse Sovereign'],
  infinity: ['Infinity','Eternal Flame','Omega','Alpha','The Beyond','Boundless','Forever','The All','Endless','True Infinity','Recursion','Limitless','Paradox','Genesis','Apex','The Source','Continuum','Eternity','Ouroboros','The One'],
};

const BASE_EMOJIS: Record<PetRarity, string[]> = {
  common:    ['🐛','🦗','🐌','🐞','🦠','🪱','🐜','🪰','🦟','🐚','🥚','🍄','🌱','🪺','🪳','🐀','🐁','🐇','🐿️','🦔'],
  rare:      ['🦦','🦊','🐸','🐺','🐱','🐰','🐨','🐼','🦝','🦡','🦫','🦥','🦨','🐢','🦎','🦂','🐠','🐡','🦭','🪶'],
  epic:      ['🦄','🐉','🦖','🦕','🦏','🦛','🐅','🦘','🦒','🐘','🐊','🦂','🦉','🦅','🦜','🦚','🦩','🐲','🦓','🦬'],
  legendary: ['🔥','🌟','⚡','✨','🦁','🐯','🐆','🐻‍❄️','🐳','🦈','🦏','🐊','🐍','🦅','🦉','🦚','🦩','🐲','💫','🌠'],
  mythic:    ['🌌','🌀','💎','👁️','🐉','🦅','🦁','🌪️','🔱','⚜️','💠','🎴','🐲','🧿','🪐','☄️','🌋','🌊','🗿','⛩️'],
  gold:      ['🥇','👑','💰','🪙','🏆','🌟','⭐','✨','🔆','☀️','🌞','🌕','🥮','🍯','🟡','🟨','🔶','🔸','🎖️','🏵️'],
  godly:     ['😇','👼','🪬','🕊️','🌅','🌄','🌠','💫','🔮','🪄','🧚','🧞','🧜','🧝','🦸','🌈','☮️','♾️','🛐','⚛️'],
  secret:    ['❓','❔','🕳️','🌑','🖤','🔲','◾','▪️','🟪','🟫','🟥','🟧','🟨','🟩','🟦','🔯','♾️','🔻','🔺','💢'],
  cosmic:    ['🌌','🌠','☄️','🪐','🌟','💫','🛸','👾','🪩','🌈','🔮','💥','✨','🎆','🎇','🌀','🌊','🌋','⚛️','🧬'],
  infinity:  ['♾️','🌌','🛸','👁️‍🗨️','💠','🔮','✨','🌠','💫','⚛️','🧬','🪩','🎆','🌈','🌀','💥','🔆','⚜️','🔱','🧿'],
};

// Expand each rarity from 20 → 50 pets via variant suffixes
const VARIANT_SUFFIXES = ['', ' II', ' Prime', ' Zero', ' Ultra', ' Nova', ' Rex', ' Omen', ' Rift', ' Void'];
export const PETS_PER_RARITY = 50;

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const buildPets = (): AlienPet[] => {
  const pets: AlienPet[] = [];
  (Object.keys(BASE_NAMES) as PetRarity[]).forEach((rarity, rIdx) => {
    const names = BASE_NAMES[rarity];
    const emojis = BASE_EMOJIS[rarity];
    const meta = RARITY_META[rarity];
    const rand = seededRandom(rIdx * 999 + 1);
    for (let i = 0; i < PETS_PER_RARITY; i++) {
      const nameBase = names[i % names.length];
      const suffix = VARIANT_SUFFIXES[Math.floor(i / names.length) % VARIANT_SUFFIXES.length];
      const [lo, hi] = meta.basePower;
      const power = Math.round(lo + rand() * (hi - lo));
      const trait = TRAITS[Math.floor(rand() * TRAITS.length)];
      pets.push({
        id: `${rarity}-${i}`,
        name: (nameBase + suffix).trim(),
        emoji: emojis[i % emojis.length],
        rarity,
        power,
        trait,
        description: `A ${meta.label.toLowerCase()} ${TRAIT_META[trait].label.toLowerCase()}-attuned cosmic companion.`,
      });
    }
  });
  return pets;
};

export const ALL_PETS: AlienPet[] = buildPets();
export const PETS_BY_ID: Record<string, AlienPet> = Object.fromEntries(ALL_PETS.map((p) => [p.id, p]));

// ============ Leveling ============
export const MAX_LEVEL = 10;
// Duplicates and coin cost required to reach next level
export const levelUpRequirement = (currentLevel: number) => ({
  duplicates: currentLevel + 1,          // lvl 1→2 needs 2 dups, lvl 2→3 needs 3, ...
  coins: 100 * (currentLevel + 1) * (currentLevel + 1), // 100, 400, 900, 1600...
});
// Power multiplier from level (level 1 = 1.0x, level 10 = 2.35x)
export const levelPowerMultiplier = (level: number) => 1 + (level - 1) * 0.15;
export const effectivePower = (pet: AlienPet, level: number) =>
  Math.round(pet.power * levelPowerMultiplier(level));

// ============ Packs ============
export interface PetPack {
  id: string;
  name: string;
  emoji: string;
  price: number;
  pulls: number;
  rarityBoost?: Partial<Record<PetRarity, number>>;
  guaranteedMin?: PetRarity;
  description: string;
  gradient: string;
}

export const PACKS: PetPack[] = [
  { id: 'basic',     name: 'Basic Pack',     emoji: '📦', price: 80,    pulls: 3, description: '3 cosmic pets. Mostly Common, slim chance of Rare+.', gradient: 'from-slate-600 to-slate-800' },
  { id: 'starlight', name: 'Starlight Pack', emoji: '✨', price: 250,   pulls: 4, rarityBoost: { rare: 3, epic: 2 }, description: '4 pets with boosted Rare & Epic odds.', gradient: 'from-sky-500 to-indigo-700' },
  { id: 'nebula',    name: 'Nebula Pack',    emoji: '🌌', price: 600,   pulls: 5, rarityBoost: { epic: 4, legendary: 3, mythic: 2 }, description: '5 pets, big bump to Epic, Legendary & Mythic.', gradient: 'from-purple-600 to-fuchsia-700' },
  { id: 'golden',    name: 'Golden Pack',    emoji: '🥇', price: 1500,  pulls: 5, guaranteedMin: 'rare', rarityBoost: { legendary: 4, mythic: 3, gold: 5 }, description: '5 pets, all Rare+, strong Gold odds.', gradient: 'from-yellow-400 to-amber-600' },
  { id: 'godly',     name: 'Godly Pack',     emoji: '😇', price: 4000,  pulls: 6, guaranteedMin: 'epic', rarityBoost: { mythic: 4, gold: 4, godly: 5, secret: 2 }, description: '6 pets, all Epic+, real shot at Godly & Secret.', gradient: 'from-emerald-400 to-teal-700' },
  { id: 'cosmic',    name: 'Cosmic Pack',    emoji: '🪩', price: 10000, pulls: 7, guaranteedMin: 'legendary', rarityBoost: { mythic: 5, gold: 4, godly: 4, secret: 4, cosmic: 6, infinity: 2 }, description: '7 pets, all Legendary+, dripping Cosmic energy.', gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
  { id: 'infinity',  name: 'Infinity Pack',  emoji: '♾️', price: 25000, pulls: 8, guaranteedMin: 'mythic', rarityBoost: { gold: 4, godly: 5, secret: 5, cosmic: 6, infinity: 8 }, description: '8 pets, all Mythic+, best shot at Infinity.', gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400' },
  // ===== 20 new packs =====
  { id: 'comet',      name: 'Comet Pack',      emoji: '☄️', price: 150,  pulls: 3, rarityBoost: { rare: 4 }, description: '3 pets with a Rare boost.', gradient: 'from-orange-500 to-red-600' },
  { id: 'meteor',     name: 'Meteor Pack',     emoji: '🌠', price: 400,  pulls: 5, rarityBoost: { rare: 2, epic: 3 }, description: '5 pets, Rare & Epic focused.', gradient: 'from-amber-500 to-rose-600' },
  { id: 'aurora',     name: 'Aurora Pack',     emoji: '🌈', price: 900,  pulls: 6, rarityBoost: { epic: 3, legendary: 3 }, description: '6 pets, shimmering Epic/Legendary odds.', gradient: 'from-teal-400 to-purple-500' },
  { id: 'quasar',     name: 'Quasar Pack',     emoji: '💫', price: 2200, pulls: 6, guaranteedMin: 'rare', rarityBoost: { legendary: 3, mythic: 3 }, description: '6 pets, all Rare+ with mythic pulls.', gradient: 'from-fuchsia-500 to-indigo-700' },
  { id: 'pulsar',     name: 'Pulsar Pack',     emoji: '⚡', price: 3200, pulls: 6, guaranteedMin: 'epic', rarityBoost: { mythic: 3, gold: 3 }, description: '6 pets, all Epic+ with Gold energy.', gradient: 'from-cyan-500 to-blue-700' },
  { id: 'blackhole',  name: 'Black Hole Pack', emoji: '🕳️', price: 6000, pulls: 7, guaranteedMin: 'epic', rarityBoost: { secret: 6, cosmic: 3 }, description: '7 pets, all Epic+, Secret-heavy.', gradient: 'from-slate-900 to-black' },
  { id: 'supernova',  name: 'Supernova Pack',  emoji: '💥', price: 8500, pulls: 7, guaranteedMin: 'legendary', rarityBoost: { mythic: 4, gold: 4, godly: 3 }, description: '7 pets, all Legendary+, godly odds.', gradient: 'from-rose-500 to-orange-500' },
  { id: 'galaxy',     name: 'Galaxy Pack',     emoji: '🌀', price: 12000, pulls: 8, guaranteedMin: 'legendary', rarityBoost: { cosmic: 7, mythic: 3 }, description: '8 pets, all Legendary+, Cosmic focus.', gradient: 'from-violet-600 to-pink-600' },
  { id: 'astral',     name: 'Astral Pack',     emoji: '🪐', price: 15000, pulls: 8, guaranteedMin: 'mythic', rarityBoost: { godly: 4, secret: 3, cosmic: 4 }, description: '8 pets, all Mythic+, Godly & Secret focus.', gradient: 'from-emerald-500 to-cyan-600' },
  { id: 'stardust',   name: 'Stardust Pack',   emoji: '✨', price: 500,  pulls: 4, rarityBoost: { epic: 3 }, description: '4 pets, Epic-boosted.', gradient: 'from-yellow-300 to-purple-500' },
  { id: 'rift',       name: 'Rift Pack',       emoji: '🌀', price: 3500, pulls: 6, guaranteedMin: 'rare', rarityBoost: { secret: 5 }, description: '6 pets, all Rare+, extra Secret rolls.', gradient: 'from-zinc-700 to-purple-900' },
  { id: 'eclipse',    name: 'Eclipse Pack',    emoji: '🌑', price: 5000, pulls: 6, guaranteedMin: 'epic', rarityBoost: { void: 0, godly: 4, secret: 4 } as any, description: '6 pets, all Epic+, dark energy.', gradient: 'from-slate-800 to-indigo-900' },
  { id: 'solar',      name: 'Solar Pack',      emoji: '☀️', price: 1800, pulls: 5, guaranteedMin: 'rare', rarityBoost: { legendary: 4, gold: 5 }, description: '5 pets, all Rare+, blazing Gold odds.', gradient: 'from-yellow-500 to-orange-600' },
  { id: 'lunar',      name: 'Lunar Pack',      emoji: '🌙', price: 1800, pulls: 5, guaranteedMin: 'rare', rarityBoost: { legendary: 4, mythic: 4 }, description: '5 pets, all Rare+, mythic surge.', gradient: 'from-slate-300 to-indigo-600' },
  { id: 'frost',      name: 'Frost Pack',      emoji: '❄️', price: 700,  pulls: 5, rarityBoost: { rare: 2, epic: 3 }, description: '5 pets, icy Rare/Epic odds.', gradient: 'from-cyan-300 to-blue-600' },
  { id: 'inferno',    name: 'Inferno Pack',    emoji: '🔥', price: 700,  pulls: 5, rarityBoost: { rare: 2, epic: 3 }, description: '5 pets, blazing Rare/Epic odds.', gradient: 'from-red-500 to-orange-600' },
  { id: 'crystal',    name: 'Crystal Pack',    emoji: '💎', price: 2500, pulls: 5, guaranteedMin: 'rare', rarityBoost: { mythic: 4 }, description: '5 pets, all Rare+, mythic sparkle.', gradient: 'from-teal-400 to-cyan-600' },
  { id: 'phoenix',    name: 'Phoenix Pack',    emoji: '🐦‍🔥', price: 7000, pulls: 6, guaranteedMin: 'epic', rarityBoost: { legendary: 5, mythic: 4, gold: 3 }, description: '6 pets, all Epic+, legendary bump.', gradient: 'from-orange-500 to-rose-700' },
  { id: 'dragon',     name: 'Dragon Pack',     emoji: '🐉', price: 9000, pulls: 6, guaranteedMin: 'epic', rarityBoost: { mythic: 5, gold: 4 }, description: '6 pets, all Epic+, dragon-forged.', gradient: 'from-emerald-600 to-red-700' },
  { id: 'omega',      name: 'Omega Pack',      emoji: 'Ω', price: 50000, pulls: 10, guaranteedMin: 'mythic', rarityBoost: { gold: 3, godly: 5, secret: 5, cosmic: 7, infinity: 12 }, description: '10 pets, all Mythic+, ultimate Infinity odds.', gradient: 'from-fuchsia-600 via-yellow-400 to-cyan-400' },
];

export const RARITY_ORDER: PetRarity[] = ['common','rare','epic','legendary','mythic','gold','godly','secret','cosmic','infinity'];

export const drawPet = (pack: PetPack): AlienPet => {
  const minIdx = pack.guaranteedMin ? RARITY_ORDER.indexOf(pack.guaranteedMin) : 0;
  const eligible = RARITY_ORDER.slice(minIdx);
  const weights = eligible.map((r) => {
    const base = RARITY_META[r].weight;
    const boost = pack.rarityBoost?.[r] ?? 1;
    return base * boost;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  let chosenRarity: PetRarity = eligible[0];
  for (let i = 0; i < eligible.length; i++) {
    roll -= weights[i];
    if (roll <= 0) { chosenRarity = eligible[i]; break; }
  }
  const pool = ALL_PETS.filter((p) => p.rarity === chosenRarity);
  return pool[Math.floor(Math.random() * pool.length)];
};

export const openPack = (pack: PetPack): AlienPet[] => {
  return Array.from({ length: pack.pulls }, () => drawPet(pack));
};

export const TOTAL_PETS = ALL_PETS.length;
