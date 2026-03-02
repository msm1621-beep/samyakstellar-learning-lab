

## Plan: Expand Shop, Add Music Selection, and Open Premium Games

### 1. Add 20 More Shop Items (Allow Repeat Purchases)

**File: `src/components/FeaturedShop.tsx`**
- Add 20 new items across all 3 categories (boost, cosmetic, utility) -- examples: Time Warp, Gravity Boots, Nebula Skin, Meteor Shield, Wormhole Pass, Asteroid Cruncher, Solar Flare Boost, etc.
- Remove the "one-time only" purchase restriction. Currently `isPurchased` blocks re-buying. Change the logic so items can be bought unlimited times -- track purchase count instead of boolean owned state.
- Show purchase count on owned items (e.g., "Owned x3") instead of disabling the button.
- Keep awarding achievements only on first purchase (existing logic stays).

### 2. Add 15 Selectable Space Music Melodies

**File: `src/components/SpaceAmbience.tsx`**
- Define 15 distinct melody presets using different Web Audio API configurations. Each melody will use unique frequency sets, oscillator types (sine, triangle, sawtooth), LFO speeds, filter settings, and noise textures. Examples:
  - Deep Space Drone, Cosmic Waltz, Stellar Lullaby, Nebula Pulse, Aurora Waves, Galactic Harp, Lunar Drift, Solar Wind, Quantum Whisper, Astral Choir, Void Echo, Supernova Glow, Orbital Bells, Comet Trail, Starfield Shimmer
- Add a melody selector dropdown/list that appears in the expanded controls panel. Users can click a melody name to switch.
- When switching melodies: stop the current audio, apply new frequency/oscillator config, restart.
- Store selected melody preference in `localStorage`.

### 3. Make Premium Games Open for All (Free to Play)

**File: `src/components/PremiumGamesSection.tsx`**
- Remove the access gate (`hasAccess` check). All 12 premium games will be playable by anyone.
- Remove the lock overlay and "Premium Access Required" toast.
- Update the header text to remove the "exclusive" language; keep the premium branding as aspirational.
- Keep coin rewards and achievement tracking as-is.

### Technical Notes
- All changes are frontend-only, using existing `localStorage` persistence and context providers.
- The shop's `purchasedShopItems` localStorage will store item IDs with duplicates (array with repeated entries) to track quantity.
- Music melodies are generated procedurally via Web Audio API -- no audio files needed.

