export interface CelestialSize {
  id: string;
  name: string;
  type: 'planet' | 'moon' | 'star' | 'dwarf-planet' | 'asteroid' | 'comet' | 'exoplanet' | 'nebula' | 'galaxy' | 'black-hole';
  diameter: number; // in km
  color: string;
  emoji: string;
  funFact: string;
}

export const celestialSizes: CelestialSize[] = [
  // ============ Planets (all 8) ============
  { id: 'mercury', name: 'Mercury', type: 'planet', diameter: 4879, color: '#8C7853', emoji: '☿️', funFact: 'Mercury is the fastest planet, zooming around the Sun in just 88 days!' },
  { id: 'venus', name: 'Venus', type: 'planet', diameter: 12104, color: '#E6C87A', emoji: '♀️', funFact: 'Venus spins backwards - the Sun rises in the west there!' },
  { id: 'earth', name: 'Earth', type: 'planet', diameter: 12742, color: '#4A90D9', emoji: '🌍', funFact: "Earth is the only planet not named after a god - its name means 'the ground'!" },
  { id: 'mars', name: 'Mars', type: 'planet', diameter: 6779, color: '#CD5C5C', emoji: '♂️', funFact: 'Mars has Olympus Mons - 3 times taller than Everest!' },
  { id: 'jupiter', name: 'Jupiter', type: 'planet', diameter: 139820, color: '#D4A574', emoji: '♃', funFact: 'Over 1,300 Earths could fit inside Jupiter!' },
  { id: 'saturn', name: 'Saturn', type: 'planet', diameter: 116460, color: '#F4D03F', emoji: '♄', funFact: 'Saturn would float in water - it is less dense!' },
  { id: 'uranus', name: 'Uranus', type: 'planet', diameter: 50724, color: '#7FDBFF', emoji: '⛢', funFact: 'Uranus rotates on its side like a rolling ball!' },
  { id: 'neptune', name: 'Neptune', type: 'planet', diameter: 49244, color: '#4169E1', emoji: '♆', funFact: 'Neptune has winds over 2,000 km/h - the fastest in the solar system!' },

  // ============ Dwarf Planets ============
  { id: 'pluto', name: 'Pluto', type: 'dwarf-planet', diameter: 2377, color: '#C9A86C', emoji: '💫', funFact: 'Pluto has a heart-shaped glacier of frozen nitrogen!' },
  { id: 'eris', name: 'Eris', type: 'dwarf-planet', diameter: 2326, color: '#D9D9D9', emoji: '🪐', funFact: 'Eris is almost the same size as Pluto and takes 558 years to orbit the Sun!' },
  { id: 'haumea', name: 'Haumea', type: 'dwarf-planet', diameter: 1632, color: '#E8DCC4', emoji: '🥚', funFact: 'Haumea is egg-shaped because it spins so fast - one day lasts just 4 hours!' },
  { id: 'makemake', name: 'Makemake', type: 'dwarf-planet', diameter: 1430, color: '#B87333', emoji: '🟤', funFact: 'Makemake is named after the creator god of Easter Island!' },
  { id: 'ceres', name: 'Ceres', type: 'dwarf-planet', diameter: 940, color: '#8B8B8B', emoji: '🪨', funFact: 'Ceres was the first asteroid ever discovered, in 1801!' },
  { id: 'sedna', name: 'Sedna', type: 'dwarf-planet', diameter: 1000, color: '#B22222', emoji: '🔴', funFact: 'Sedna takes 11,400 years to orbit the Sun once!' },

  // ============ Moons ============
  { id: 'moon', name: 'The Moon', type: 'moon', diameter: 3474, color: '#C4C4C4', emoji: '🌙', funFact: 'Our Moon drifts 3.8 cm away from Earth every year!' },
  { id: 'ganymede', name: 'Ganymede', type: 'moon', diameter: 5268, color: '#A89F91', emoji: '🌑', funFact: "Ganymede is the largest moon - even bigger than Mercury!" },
  { id: 'titan', name: 'Titan', type: 'moon', diameter: 5150, color: '#E8A952', emoji: '🟠', funFact: "Titan has liquid methane lakes and a thick atmosphere!" },
  { id: 'callisto', name: 'Callisto', type: 'moon', diameter: 4821, color: '#7A6C5D', emoji: '🌘', funFact: 'Callisto has the most craters of any object in the solar system!' },
  { id: 'io', name: 'Io', type: 'moon', diameter: 3643, color: '#FFCC00', emoji: '🌋', funFact: 'Io has over 400 active volcanoes - the most volcanic place we know!' },
  { id: 'europa', name: 'Europa', type: 'moon', diameter: 3122, color: '#E8DCC4', emoji: '🧊', funFact: 'Europa hides a giant ocean under its icy shell!' },
  { id: 'triton', name: 'Triton', type: 'moon', diameter: 2707, color: '#B0C4DE', emoji: '❄️', funFact: 'Triton orbits Neptune backwards - it was probably captured!' },
  { id: 'titania', name: 'Titania', type: 'moon', diameter: 1578, color: '#D2B48C', emoji: '🌚', funFact: "Titania is Uranus's largest moon, named after Shakespeare's fairy queen!" },
  { id: 'rhea', name: 'Rhea', type: 'moon', diameter: 1527, color: '#DCDCDC', emoji: '⚪', funFact: 'Rhea may have its own tiny ring system!' },
  { id: 'oberon', name: 'Oberon', type: 'moon', diameter: 1523, color: '#8B7D6B', emoji: '🌒', funFact: 'Oberon has huge canyons and red-tinted craters!' },
  { id: 'iapetus', name: 'Iapetus', type: 'moon', diameter: 1469, color: '#A0522D', emoji: '🎱', funFact: 'Iapetus has one bright side and one dark side - like a cosmic yin-yang!' },
  { id: 'charon', name: 'Charon', type: 'moon', diameter: 1212, color: '#8B8378', emoji: '🌗', funFact: "Charon is so big compared to Pluto they orbit a point in space between them!" },
  { id: 'umbriel', name: 'Umbriel', type: 'moon', diameter: 1169, color: '#4A4A4A', emoji: '🌘', funFact: 'Umbriel is the darkest large moon in the solar system!' },
  { id: 'ariel', name: 'Ariel', type: 'moon', diameter: 1158, color: '#C0C0C0', emoji: '🌕', funFact: 'Ariel has the youngest, brightest surface of any Uranian moon!' },
  { id: 'dione', name: 'Dione', type: 'moon', diameter: 1123, color: '#E5E5E5', emoji: '⚪', funFact: 'Dione has icy cliffs hundreds of meters tall!' },
  { id: 'tethys', name: 'Tethys', type: 'moon', diameter: 1062, color: '#F0F0F0', emoji: '❄️', funFact: 'Tethys has a giant crater almost 2/5 the size of the moon itself!' },
  { id: 'enceladus', name: 'Enceladus', type: 'moon', diameter: 504, color: '#F5F5F5', emoji: '💧', funFact: 'Enceladus shoots geysers of water from its south pole!' },
  { id: 'mimas', name: 'Mimas', type: 'moon', diameter: 396, color: '#D3D3D3', emoji: '🎯', funFact: 'Mimas looks just like the Death Star from Star Wars!' },
  { id: 'phobos', name: 'Phobos', type: 'moon', diameter: 22, color: '#8B4513', emoji: '🥔', funFact: 'Phobos will crash into Mars in about 50 million years!' },
  { id: 'deimos', name: 'Deimos', type: 'moon', diameter: 12, color: '#A0522D', emoji: '🪨', funFact: "Deimos is one of the smallest moons - only 12 km across!" },

  // ============ Asteroids & Comets ============
  { id: 'vesta', name: 'Vesta', type: 'asteroid', diameter: 525, color: '#A9A9A9', emoji: '☄️', funFact: 'Vesta is so bright it can sometimes be seen with the naked eye!' },
  { id: 'pallas', name: 'Pallas', type: 'asteroid', diameter: 512, color: '#696969', emoji: '🪨', funFact: 'Pallas has a strangely tilted orbit compared to other asteroids!' },
  { id: 'hygiea', name: 'Hygiea', type: 'asteroid', diameter: 434, color: '#556B2F', emoji: '🌑', funFact: 'Hygiea is nearly perfectly round - almost a dwarf planet!' },
  { id: 'bennu', name: 'Bennu', type: 'asteroid', diameter: 0.49, color: '#4B4B4B', emoji: '💠', funFact: 'NASA brought samples of Bennu back to Earth in 2023!' },
  { id: 'halley', name: "Halley's Comet", type: 'comet', diameter: 11, color: '#B0E0E6', emoji: '☄️', funFact: 'Halley visits Earth every 76 years - next in 2061!' },
  { id: 'hale-bopp', name: 'Hale-Bopp', type: 'comet', diameter: 60, color: '#E0FFFF', emoji: '☄️', funFact: 'Hale-Bopp was visible to the naked eye for 18 months!' },

  // ============ Exoplanets ============
  { id: 'kepler-22b', name: 'Kepler-22b', type: 'exoplanet', diameter: 30500, color: '#4682B4', emoji: '🌐', funFact: 'Kepler-22b is in its star\'s habitable zone - could have water!' },
  { id: 'proxima-b', name: 'Proxima Centauri b', type: 'exoplanet', diameter: 14000, color: '#8B0000', emoji: '🔴', funFact: 'Proxima b is the closest known exoplanet - only 4.24 light-years away!' },
  { id: 'trappist-1e', name: 'TRAPPIST-1e', type: 'exoplanet', diameter: 11600, color: '#DEB887', emoji: '🌍', funFact: 'TRAPPIST-1e is one of 7 Earth-sized planets around one tiny star!' },
  { id: 'hd189733b', name: 'HD 189733 b', type: 'exoplanet', diameter: 160000, color: '#0000FF', emoji: '💙', funFact: 'HD 189733 b rains molten glass sideways at 8,700 km/h!' },
  { id: 'wasp-12b', name: 'WASP-12b', type: 'exoplanet', diameter: 250000, color: '#2F0000', emoji: '⚫', funFact: 'WASP-12b is being eaten by its own star!' },

  // ============ Stars ============
  { id: 'proxima-c', name: 'Proxima Centauri', type: 'star', diameter: 200000, color: '#FF4500', emoji: '🔴', funFact: 'Proxima Centauri is our nearest neighbor star!' },
  { id: 'sun', name: 'The Sun', type: 'star', diameter: 1392700, color: '#FFD93D', emoji: '☀️', funFact: 'The Sun holds 99.86% of all mass in our solar system!' },
  { id: 'sirius', name: 'Sirius A', type: 'star', diameter: 2380000, color: '#B4C7E7', emoji: '✨', funFact: 'Sirius is the brightest star in our night sky!' },
  { id: 'alpha-centauri', name: 'Alpha Centauri A', type: 'star', diameter: 1700000, color: '#FFD700', emoji: '⭐', funFact: 'Alpha Centauri is a triple star system 4.37 light-years away!' },
  { id: 'polaris', name: 'Polaris', type: 'star', diameter: 63000000, color: '#FFFFE0', emoji: '🌟', funFact: 'Polaris - the North Star - is 46 times bigger than the Sun!' },
  { id: 'vega', name: 'Vega', type: 'star', diameter: 3300000, color: '#F0F8FF', emoji: '💫', funFact: "Vega will be Earth's North Star in about 12,000 years!" },
  { id: 'arcturus', name: 'Arcturus', type: 'star', diameter: 35700000, color: '#FFA500', emoji: '🟠', funFact: 'Arcturus zips through space at 122 km per second!' },
  { id: 'aldebaran', name: 'Aldebaran', type: 'star', diameter: 61000000, color: '#FF6347', emoji: '🔶', funFact: 'Aldebaran is the fiery eye of the constellation Taurus!' },
  { id: 'rigel', name: 'Rigel', type: 'star', diameter: 109000000, color: '#87CEEB', emoji: '🔷', funFact: 'Rigel shines 120,000 times brighter than our Sun!' },
  { id: 'antares', name: 'Antares', type: 'star', diameter: 946000000, color: '#DC143C', emoji: '🔴', funFact: 'Antares could swallow Mars if placed at the Sun\'s location!' },
  { id: 'betelgeuse', name: 'Betelgeuse', type: 'star', diameter: 1234000000, color: '#FF6B6B', emoji: '🔴', funFact: 'Betelgeuse could go supernova any day - or in 100,000 years!' },
  { id: 'vy-canis', name: 'VY Canis Majoris', type: 'star', diameter: 1975000000, color: '#FF4500', emoji: '🌞', funFact: 'VY Canis Majoris is one of the largest known stars - a hypergiant!' },
  { id: 'uy-scuti', name: 'UY Scuti', type: 'star', diameter: 2380000000, color: '#B22222', emoji: '☄️', funFact: 'UY Scuti is about 1,700 times the radius of our Sun!' },
  { id: 'stephenson', name: 'Stephenson 2-18', type: 'star', diameter: 2990000000, color: '#8B0000', emoji: '🌟', funFact: 'Stephenson 2-18 may be the largest known star in the universe!' },

  // ============ Black Holes (event horizon diameter) ============
  { id: 'sgr-a', name: 'Sagittarius A*', type: 'black-hole', diameter: 24000000, color: '#000000', emoji: '🕳️', funFact: 'Sgr A* is the supermassive black hole at the center of our galaxy!' },
  { id: 'm87', name: 'M87*', type: 'black-hole', diameter: 38000000000, color: '#0A0A0A', emoji: '⚫', funFact: 'M87* was the first black hole ever photographed, in 2019!' },
  { id: 'ton-618', name: 'TON 618', type: 'black-hole', diameter: 390000000000, color: '#050505', emoji: '⬛', funFact: 'TON 618 is one of the most massive black holes ever discovered!' },

  // ============ Nebulae (approx diameter in km, converted from light-years) ============
  { id: 'orion-nebula', name: 'Orion Nebula', type: 'nebula', diameter: 227000000000000, color: '#FF69B4', emoji: '🌸', funFact: 'The Orion Nebula is a stellar nursery birthing new stars!' },
  { id: 'crab-nebula', name: 'Crab Nebula', type: 'nebula', diameter: 104000000000000, color: '#FF1493', emoji: '🦀', funFact: 'The Crab Nebula came from a supernova seen from Earth in 1054!' },
  { id: 'helix', name: 'Helix Nebula', type: 'nebula', diameter: 26000000000000, color: '#00CED1', emoji: '👁️', funFact: "The Helix is nicknamed the 'Eye of God' nebula!" },
  { id: 'eagle-nebula', name: 'Eagle Nebula', type: 'nebula', diameter: 660000000000000, color: '#DA70D6', emoji: '🦅', funFact: "The Eagle Nebula contains the famous 'Pillars of Creation'!" },
  { id: 'carina', name: 'Carina Nebula', type: 'nebula', diameter: 2600000000000000, color: '#BA55D3', emoji: '🌌', funFact: 'The Carina Nebula is 4 times bigger than the Orion Nebula!' },

  // ============ Galaxies ============
  { id: 'milky-way', name: 'Milky Way', type: 'galaxy', diameter: 946000000000000000, color: '#F5F5DC', emoji: '🌌', funFact: 'Our Milky Way contains 100-400 billion stars!' },
  { id: 'andromeda', name: 'Andromeda', type: 'galaxy', diameter: 2200000000000000000, color: '#FFE4E1', emoji: '🌠', funFact: 'Andromeda will collide with the Milky Way in 4.5 billion years!' },
  { id: 'triangulum', name: 'Triangulum', type: 'galaxy', diameter: 570000000000000000, color: '#E6E6FA', emoji: '🔺', funFact: 'Triangulum is the third-largest galaxy in our Local Group!' },
  { id: 'lmc', name: 'Large Magellanic Cloud', type: 'galaxy', diameter: 132000000000000000, color: '#FFDAB9', emoji: '☁️', funFact: 'The LMC is a satellite galaxy visible from the Southern Hemisphere!' },
  { id: 'ic-1101', name: 'IC 1101', type: 'galaxy', diameter: 56800000000000000000, color: '#FFF8DC', emoji: '🌀', funFact: 'IC 1101 is one of the largest known galaxies - 60x wider than the Milky Way!' },
];

export const typeColors = {
  'planet':       { bg: 'bg-blue-500/20',   text: 'text-blue-400',   border: 'border-blue-500/50' },
  'moon':         { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  'star':         { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  'dwarf-planet': { bg: 'bg-pink-500/20',   text: 'text-pink-400',   border: 'border-pink-500/50' },
  'asteroid':     { bg: 'bg-stone-500/20',  text: 'text-stone-400',  border: 'border-stone-500/50' },
  'comet':        { bg: 'bg-cyan-500/20',   text: 'text-cyan-400',   border: 'border-cyan-500/50' },
  'exoplanet':    { bg: 'bg-teal-500/20',   text: 'text-teal-400',   border: 'border-teal-500/50' },
  'nebula':       { bg: 'bg-fuchsia-500/20',text: 'text-fuchsia-400',border: 'border-fuchsia-500/50' },
  'galaxy':       { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
  'black-hole':   { bg: 'bg-zinc-700/40',   text: 'text-zinc-300',   border: 'border-zinc-500/50' },
};
