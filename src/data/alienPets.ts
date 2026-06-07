// Cosmic Alien Pets — 10 rarities × 20 pets = 200 unique pets.
// Pets are procedurally listed (curated names + emojis) and each has a "power"
// stat used by the Cosmic Arena mini-game.

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

export interface AlienPet {
  id: string;
  name: string;
  emoji: string;
  rarity: PetRarity;
  power: number; // base battle power
  description: string;
}

export interface RarityMeta {
  label: string;
  weight: number; // pack draw weight
  basePower: [number, number];
  gradient: string; // tailwind classes
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

const PET_NAMES: Record<PetRarity, string[]> = {
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

const PET_EMOJIS: Record<PetRarity, string[]> = {
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

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const buildPets = (): AlienPet[] => {
  const pets: AlienPet[] = [];
  (Object.keys(PET_NAMES) as PetRarity[]).forEach((rarity, rIdx) => {
    const names = PET_NAMES[rarity];
    const emojis = PET_EMOJIS[rarity];
    const meta = RARITY_META[rarity];
    const rand = seededRandom(rIdx * 999 + 1);
    names.forEach((name, i) => {
      const [lo, hi] = meta.basePower;
      const power = Math.round(lo + rand() * (hi - lo));
      pets.push({
        id: `${rarity}-${i}`,
        name,
        emoji: emojis[i % emojis.length],
        rarity,
        power,
        description: `A ${meta.label.toLowerCase()} cosmic companion radiating ${rarity} energy.`,
      });
    });
  });
  return pets;
};

export const ALL_PETS: AlienPet[] = buildPets();
export const PETS_BY_ID: Record<string, AlienPet> = Object.fromEntries(ALL_PETS.map((p) => [p.id, p]));

export interface PetPack {
  id: string;
  name: string;
  emoji: string;
  price: number;
  pulls: number;
  // multiplier on rarity weights (positive = boost rare); applied per-rarity below.
  rarityBoost?: Partial<Record<PetRarity, number>>;
  guaranteedMin?: PetRarity; // every pull is at least this rarity
  description: string;
  gradient: string;
}

export const PACKS: PetPack[] = [
  {
    id: 'basic',
    name: 'Basic Pack',
    emoji: '📦',
    price: 80,
    pulls: 3,
    description: '3 cosmic pets. Mostly Common, slim chance of Rare+.',
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 'starlight',
    name: 'Starlight Pack',
    emoji: '✨',
    price: 250,
    pulls: 4,
    rarityBoost: { rare: 3, epic: 2 },
    description: '4 pets with boosted Rare & Epic odds.',
    gradient: 'from-sky-500 to-indigo-700',
  },
  {
    id: 'nebula',
    name: 'Nebula Pack',
    emoji: '🌌',
    price: 600,
    pulls: 5,
    rarityBoost: { epic: 4, legendary: 3, mythic: 2 },
    description: '5 pets, big bump to Epic, Legendary & Mythic.',
    gradient: 'from-purple-600 to-fuchsia-700',
  },
  {
    id: 'golden',
    name: 'Golden Pack',
    emoji: '🥇',
    price: 1500,
    pulls: 5,
    guaranteedMin: 'rare',
    rarityBoost: { legendary: 4, mythic: 3, gold: 5 },
    description: '5 pets, all Rare+, with strong Gold odds.',
    gradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'godly',
    name: 'Godly Pack',
    emoji: '😇',
    price: 4000,
    pulls: 6,
    guaranteedMin: 'epic',
    rarityBoost: { mythic: 4, gold: 4, godly: 5, secret: 2 },
    description: '6 pets, all Epic+, real shot at Godly & Secret.',
    gradient: 'from-emerald-400 to-teal-700',
  },
  {
    id: 'cosmic',
    name: 'Cosmic Pack',
    emoji: '🪩',
    price: 10000,
    pulls: 7,
    guaranteedMin: 'legendary',
    rarityBoost: { mythic: 5, gold: 4, godly: 4, secret: 4, cosmic: 6, infinity: 2 },
    description: '7 pets, all Legendary+, dripping with Cosmic energy.',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    id: 'infinity',
    name: 'Infinity Pack',
    emoji: '♾️',
    price: 25000,
    pulls: 8,
    guaranteedMin: 'mythic',
    rarityBoost: { gold: 4, godly: 5, secret: 5, cosmic: 6, infinity: 8 },
    description: '8 pets, all Mythic+, your best shot at Infinity.',
    gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400',
  },
];

export const RARITY_ORDER: PetRarity[] = ['common','rare','epic','legendary','mythic','gold','godly','secret','cosmic','infinity'];

export const drawPet = (pack: PetPack): AlienPet => {
  // Build weighted pool respecting guaranteedMin + boosts.
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
