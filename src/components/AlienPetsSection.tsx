import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PackageOpen, Swords, Trophy, X, Star, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCoins } from '@/contexts/CoinsContext';
import { toast } from 'sonner';
import {
  ALL_PETS,
  PETS_BY_ID,
  PACKS,
  RARITY_META,
  RARITY_ORDER,
  TRAIT_META,
  TOTAL_PETS,
  MAX_LEVEL,
  openPack,
  levelUpRequirement,
  levelPowerMultiplier,
  effectivePower,
  traitBonus,
  type AlienPet,
  type PetRarity,
  type PetPack,
} from '@/data/alienPets';

const STORAGE_KEY = 'alienPetsCollection';

interface PetOwned { count: number; level: number }
type Collection = Record<string, PetOwned>;

const loadCollection = (): Collection => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // migrate legacy shape {id: number}
    const out: Collection = {};
    Object.entries(parsed).forEach(([id, v]) => {
      if (typeof v === 'number') out[id] = { count: v, level: 1 };
      else if (v && typeof v === 'object') out[id] = { count: (v as any).count ?? 1, level: (v as any).level ?? 1 };
    });
    return out;
  } catch { return {}; }
};

const saveCollection = (c: Collection) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch {}
};

const PetCard: React.FC<{
  pet: AlienPet;
  count?: number;
  level?: number;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}> = ({ pet, count, level = 1, selected, onClick, size = 'md' }) => {
  const meta = RARITY_META[pet.rarity];
  const traitMeta = TRAIT_META[pet.trait];
  const sizes = {
    sm: { card: 'p-2', emoji: 'text-3xl', name: 'text-xs' },
    md: { card: 'p-3', emoji: 'text-5xl', name: 'text-sm' },
    lg: { card: 'p-4', emoji: 'text-7xl', name: 'text-base' },
  }[size];
  const shownPower = effectivePower(pet, level);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full rounded-xl border-2 ${meta.border} ${sizes.card} bg-gradient-to-br ${meta.gradient} ${meta.glow} shadow-lg overflow-hidden text-left ${selected ? 'ring-2 ring-white' : ''}`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`${sizes.emoji} mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}>{pet.emoji}</div>
        <div className={`${sizes.name} font-bold text-white truncate w-full`}>{pet.name}</div>
        <div className={`text-[10px] uppercase tracking-wider font-semibold bg-gradient-to-r ${meta.textGradient} text-transparent bg-clip-text`}>
          {meta.label}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/85 mt-1">
          <span className="flex items-center gap-0.5"><Swords className="w-3 h-3" /> {shownPower}</span>
          <span className={traitMeta.color}>{traitMeta.emoji}</span>
        </div>
        <div className="text-[10px] text-amber-200 mt-0.5">Lv. {level}{level >= MAX_LEVEL ? ' MAX' : ''}</div>
        {count && count > 1 && (
          <div className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full px-1.5 py-0.5">x{count}</div>
        )}
      </div>
    </motion.button>
  );
};

// ============ Pack opening modal ============
const PackOpenModal: React.FC<{ pulls: AlienPet[] | null; onClose: () => void }> = ({ pulls, onClose }) => {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { setRevealed(0); }, [pulls]);
  if (!pulls) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl p-6"
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text mb-4">
            Pack Opened!
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pulls.map((pet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={i <= revealed ? { opacity: 1, rotateY: 0 } : { opacity: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                onAnimationComplete={() => i === revealed && setRevealed((r) => r + 1)}
              >
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button onClick={onClose} className="bg-gradient-to-r from-pink-500 to-purple-500">Awesome!</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============ Level Up Modal ============
const LevelUpModal: React.FC<{
  pet: AlienPet | null;
  owned: PetOwned | undefined;
  coins: number;
  onClose: () => void;
  onLevelUp: () => void;
}> = ({ pet, owned, coins, onClose, onLevelUp }) => {
  if (!pet || !owned) return null;
  const meta = RARITY_META[pet.rarity];
  const isMax = owned.level >= MAX_LEVEL;
  const req = levelUpRequirement(owned.level);
  const canLevel = !isMax && owned.count >= req.duplicates && coins >= req.coins;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className={`relative max-w-md w-full bg-gradient-to-br ${meta.gradient} border border-white/20 rounded-2xl p-6`}
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
          <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white z-10"><X className="w-5 h-5" /></button>
          <div className="relative z-10 text-center text-white space-y-3">
            <div className="text-6xl">{pet.emoji}</div>
            <div className="text-xl font-bold">{pet.name}</div>
            <div className="text-sm text-white/80">{meta.label} · {TRAIT_META[pet.trait].emoji} {TRAIT_META[pet.trait].label}</div>
            <div className="bg-black/40 rounded-lg p-3 text-sm">
              <div>Current Level: <span className="font-bold text-amber-300">{owned.level}</span></div>
              <div>Power: {effectivePower(pet, owned.level)} <span className="text-white/60">(base {pet.power} · x{levelPowerMultiplier(owned.level).toFixed(2)})</span></div>
              <div>Copies owned: {owned.count}</div>
            </div>
            {isMax ? (
              <div className="text-amber-300 font-bold">MAX LEVEL reached!</div>
            ) : (
              <>
                <div className="bg-black/30 rounded-lg p-3 text-sm space-y-1">
                  <div className="font-semibold text-amber-200">To reach Level {owned.level + 1}:</div>
                  <div className={owned.count >= req.duplicates ? 'text-emerald-300' : 'text-rose-300'}>
                    · {req.duplicates} duplicate cards (have {owned.count})
                  </div>
                  <div className={coins >= req.coins ? 'text-emerald-300' : 'text-rose-300'}>
                    · {req.coins} 🪙 (have {coins})
                  </div>
                  <div className="text-white/70 text-xs mt-1">New power: {effectivePower(pet, owned.level + 1)}</div>
                </div>
                <Button disabled={!canLevel} onClick={onLevelUp}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50">
                  <ArrowUp className="w-4 h-4 mr-2" /> Level Up
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============ Cosmic Arena Battle Game ============
interface BattleState {
  myTeam: { pet: AlienPet; level: number }[];
  enemyTeam: { pet: AlienPet; level: number }[];
  log: string[];
  result: 'win' | 'lose' | 'draw' | null;
  reward: number;
}

const ArenaGame: React.FC<{ collection: Collection; onReward: (n: number) => void }> = ({ collection, onReward }) => {
  const ownedPets = useMemo(
    () => Object.keys(collection).map((id) => PETS_BY_ID[id]).filter(Boolean),
    [collection],
  );
  const [picks, setPicks] = useState<string[]>([]);
  const [battle, setBattle] = useState<BattleState | null>(null);

  const togglePick = (id: string) => {
    setPicks((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const startBattle = () => {
    if (picks.length !== 3) { toast.error('Pick 3 pets to fight!'); return; }
    const myTeam = picks.map((id) => ({ pet: PETS_BY_ID[id], level: collection[id]?.level ?? 1 }));
    const avgPower = myTeam.reduce((a, x) => a + effectivePower(x.pet, x.level), 0) / 3;
    const enemyTeam = Array.from({ length: 3 }, () => {
      const pet = ALL_PETS[Math.floor(Math.random() * ALL_PETS.length)];
      // scale enemy base power so their effective ~ avg ± 25%
      const target = avgPower * (0.75 + Math.random() * 0.5);
      const scaled: AlienPet = { ...pet, power: Math.max(5, Math.round(target)) };
      return { pet: scaled, level: 1 };
    });

    const log: string[] = [];
    let myHp = myTeam.reduce((a, x) => a + effectivePower(x.pet, x.level), 0);
    let enHp = enemyTeam.reduce((a, x) => a + effectivePower(x.pet, x.level), 0);
    for (let round = 0; round < 3; round++) {
      const me = myTeam[round];
      const en = enemyTeam[round];
      const myBase = effectivePower(me.pet, me.level);
      const enBase = effectivePower(en.pet, en.level);
      const myBonus = traitBonus(me.pet.trait, en.pet.trait);
      const enBonus = traitBonus(en.pet.trait, me.pet.trait);
      const myRoll = myBase * (0.8 + Math.random() * 0.4) * myBonus;
      const enRoll = enBase * (0.8 + Math.random() * 0.4) * enBonus;
      enHp -= myRoll;
      myHp -= enRoll;
      const tag = (b: number) => b > 1 ? ' (advantage!)' : b < 1 ? ' (weak)' : '';
      log.push(`R${round + 1}: ${me.pet.emoji} Lv${me.level} ${me.pet.name} → ${Math.round(myRoll)}${tag(myBonus)} · ${en.pet.emoji} ${en.pet.name} → ${Math.round(enRoll)}${tag(enBonus)}`);
    }
    let result: BattleState['result'] = 'draw';
    let reward = 10;
    if (enHp < myHp) { result = 'win'; reward = 40 + Math.floor(avgPower / 3); }
    else if (myHp < enHp) { result = 'lose'; reward = 5; }
    setBattle({ myTeam, enemyTeam, log, result, reward });
    onReward(reward);
    toast.success(result === 'win' ? `Victory! +${reward} 🪙` : result === 'draw' ? `Draw. +${reward} 🪙` : `Defeat. +${reward} 🪙`);
  };

  const reset = () => { setBattle(null); setPicks([]); };

  if (ownedPets.length === 0) {
    return <div className="text-center text-white/60 py-10">Open a pack first to collect pets, then battle!</div>;
  }

  if (battle) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <Badge className={`text-base px-4 py-1 ${battle.result === 'win' ? 'bg-emerald-500' : battle.result === 'draw' ? 'bg-amber-500' : 'bg-rose-500'}`}>
            {battle.result === 'win' ? '🏆 Victory' : battle.result === 'draw' ? '⚖️ Draw' : '💀 Defeat'} — +{battle.reward} 🪙
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-white/80 font-semibold mb-2 text-center">Your Team</div>
            <div className="grid grid-cols-3 gap-2">{battle.myTeam.map((x, i) => <PetCard key={i} pet={x.pet} level={x.level} size="sm" />)}</div>
          </div>
          <div>
            <div className="text-white/80 font-semibold mb-2 text-center">Enemy Team</div>
            <div className="grid grid-cols-3 gap-2">{battle.enemyTeam.map((x, i) => <PetCard key={i} pet={x.pet} level={x.level} size="sm" />)}</div>
          </div>
        </div>
        <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white/80 space-y-1">
          {battle.log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
        <div className="text-center">
          <Button onClick={reset} className="bg-gradient-to-r from-cyan-500 to-purple-500">Battle Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-white/70 text-sm">
        Pick 3 pets ({picks.length}/3). Higher level = stronger. Trait advantage: 🔥&gt;❄️&gt;🌿&gt;🌑&gt;✨&gt;🌌&gt;🔥
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-1">
        {ownedPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} level={collection[pet.id]?.level ?? 1} selected={picks.includes(pet.id)} onClick={() => togglePick(pet.id)} size="sm" />
        ))}
      </div>
      <div className="text-center">
        <Button onClick={startBattle} disabled={picks.length !== 3} className="bg-gradient-to-r from-rose-500 to-orange-500">
          <Swords className="w-4 h-4 mr-2" /> Start Battle
        </Button>
      </div>
    </div>
  );
};

// ============ Main Section ============
const AlienPetsSection: React.FC = () => {
  const { coins, removeCoins, addCoins } = useCoins();
  const [collection, setCollection] = useState<Collection>(loadCollection);
  const [pulls, setPulls] = useState<AlienPet[] | null>(null);
  const [tab, setTab] = useState<'packs' | 'collection' | 'arena'>('packs');
  const [filterRarity, setFilterRarity] = useState<PetRarity | 'all'>('all');
  const [levelUpPet, setLevelUpPet] = useState<AlienPet | null>(null);

  useEffect(() => { saveCollection(collection); }, [collection]);

  const handleOpenPack = (pack: PetPack) => {
    if (coins < pack.price) { toast.error(`Need ${pack.price - coins} more 🪙`); return; }
    removeCoins(pack.price);
    const newPulls = openPack(pack);
    setPulls(newPulls);
    setCollection((prev) => {
      const next = { ...prev };
      newPulls.forEach((p) => {
        const cur = next[p.id] ?? { count: 0, level: 1 };
        next[p.id] = { count: cur.count + 1, level: cur.level };
      });
      return next;
    });
  };

  const handleLevelUp = () => {
    if (!levelUpPet) return;
    const owned = collection[levelUpPet.id];
    if (!owned || owned.level >= MAX_LEVEL) return;
    const req = levelUpRequirement(owned.level);
    if (owned.count < req.duplicates) { toast.error(`Need ${req.duplicates} duplicates`); return; }
    if (coins < req.coins) { toast.error(`Need ${req.coins - coins} more 🪙`); return; }
    removeCoins(req.coins);
    setCollection((prev) => {
      const next = { ...prev };
      const cur = next[levelUpPet.id];
      next[levelUpPet.id] = { count: cur.count - req.duplicates, level: cur.level + 1 };
      return next;
    });
    toast.success(`${levelUpPet.name} → Lv. ${owned.level + 1}!`);
  };

  const ownedIds = Object.keys(collection);
  const totalOwned = ownedIds.length;
  const totalPower = ownedIds.reduce((a, id) => {
    const pet = PETS_BY_ID[id]; if (!pet) return a;
    return a + effectivePower(pet, collection[id].level);
  }, 0);

  const filteredOwned = useMemo(() => {
    const list = ownedIds.map((id) => PETS_BY_ID[id]).filter(Boolean);
    const f = filterRarity === 'all' ? list : list.filter((p) => p.rarity === filterRarity);
    return f.sort((a, b) => RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity) || b.power - a.power);
  }, [collection, filterRarity, ownedIds]);

  return (
    <section className="py-16 px-4" id="alien-pets">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-fuchsia-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 text-transparent bg-clip-text">
              Cosmic Alien Pets
            </h2>
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Collect {TOTAL_PETS} alien companions across 10 rarities & 6 elemental traits. Open {PACKS.length} pack types, level up your favorites, and battle in the Cosmic Arena!
          </p>
          <div className="flex justify-center gap-3 mt-4 text-sm text-white/70 flex-wrap">
            <Badge variant="outline" className="border-white/20"><Trophy className="w-3 h-3 mr-1" /> {totalOwned}/{TOTAL_PETS} owned</Badge>
            <Badge variant="outline" className="border-white/20"><Star className="w-3 h-3 mr-1" /> {totalPower} total power</Badge>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {(['packs', 'collection', 'arena'] as const).map((t) => (
            <Button key={t} size="sm" variant={tab === t ? 'default' : 'outline'} onClick={() => setTab(t)}
              className={tab === t ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500' : 'border-white/20 text-white/70'}>
              {t === 'packs' && <><PackageOpen className="w-4 h-4 mr-1" /> Packs</>}
              {t === 'collection' && <><Star className="w-4 h-4 mr-1" /> Collection</>}
              {t === 'arena' && <><Swords className="w-4 h-4 mr-1" /> Arena</>}
            </Button>
          ))}
        </div>

        {tab === 'packs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKS.map((pack, i) => {
              const canAfford = coins >= pack.price;
              return (
                <motion.div key={pack.id}
                  className={`relative rounded-2xl p-5 bg-gradient-to-br ${pack.gradient} border border-white/20 shadow-xl overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }} whileHover={{ y: -5 }}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-2">{pack.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{pack.name}</h3>
                    <p className="text-white/80 text-sm mb-3 min-h-[40px]">{pack.description}</p>
                    <div className="text-amber-300 font-bold text-lg mb-3">{pack.price} 🪙 · {pack.pulls} pulls</div>
                    <Button onClick={() => handleOpenPack(pack)} disabled={!canAfford}
                      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30">
                      {canAfford ? 'Open Pack' : `Need ${pack.price - coins} more`}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {tab === 'collection' && (
          <div>
            <div className="text-center text-white/70 text-xs mb-3">Tap any pet to view level-up options.</div>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <Button size="sm" variant={filterRarity === 'all' ? 'default' : 'outline'} onClick={() => setFilterRarity('all')} className={filterRarity === 'all' ? '' : 'border-white/20 text-white/70'}>All</Button>
              {RARITY_ORDER.map((r) => (
                <Button key={r} size="sm" variant={filterRarity === r ? 'default' : 'outline'} onClick={() => setFilterRarity(r)}
                  className={filterRarity === r ? `bg-gradient-to-r ${RARITY_META[r].gradient}` : 'border-white/20 text-white/70'}>
                  {RARITY_META[r].label}
                </Button>
              ))}
            </div>
            {filteredOwned.length === 0 ? (
              <div className="text-center text-white/60 py-10">No pets here yet — open some packs!</div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {filteredOwned.map((pet) => (
                  <PetCard key={pet.id} pet={pet} count={collection[pet.id].count} level={collection[pet.id].level}
                    onClick={() => setLevelUpPet(pet)} size="sm" />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'arena' && (
          <ArenaGame collection={collection} onReward={(n) => addCoins(n, 'Cosmic Arena')} />
        )}
      </div>

      <PackOpenModal pulls={pulls} onClose={() => setPulls(null)} />
      <LevelUpModal
        pet={levelUpPet}
        owned={levelUpPet ? collection[levelUpPet.id] : undefined}
        coins={coins}
        onClose={() => setLevelUpPet(null)}
        onLevelUp={handleLevelUp}
      />
    </section>
  );
};

export default AlienPetsSection;
