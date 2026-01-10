export interface CelestialSize {
  id: string;
  name: string;
  type: 'planet' | 'moon' | 'star' | 'dwarf-planet';
  diameter: number; // in km
  color: string;
  emoji: string;
  funFact: string;
}

export const celestialSizes: CelestialSize[] = [
  // Moons
  {
    id: 'moon',
    name: 'The Moon',
    type: 'moon',
    diameter: 3474,
    color: '#C4C4C4',
    emoji: '🌙',
    funFact: 'Our Moon is slowly drifting away from Earth - about 3.8 cm each year!'
  },
  {
    id: 'europa',
    name: 'Europa',
    type: 'moon',
    diameter: 3122,
    color: '#E8DCC4',
    emoji: '🧊',
    funFact: 'Europa has a hidden ocean under its icy surface that might contain life!'
  },
  {
    id: 'titan',
    name: 'Titan',
    type: 'moon',
    diameter: 5150,
    color: '#E8A952',
    emoji: '🟠',
    funFact: 'Titan is the only moon with a thick atmosphere and liquid lakes - but they\'re made of methane!'
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    type: 'moon',
    diameter: 5268,
    color: '#A89F91',
    emoji: '🌑',
    funFact: 'Ganymede is the largest moon in our solar system - even bigger than Mercury!'
  },
  {
    id: 'io',
    name: 'Io',
    type: 'moon',
    diameter: 3643,
    color: '#FFCC00',
    emoji: '🌋',
    funFact: 'Io has over 400 active volcanoes - the most volcanic place in our solar system!'
  },
  
  // Dwarf Planets
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf-planet',
    diameter: 2377,
    color: '#C9A86C',
    emoji: '💫',
    funFact: 'Pluto has a giant heart-shaped glacier made of frozen nitrogen!'
  },
  {
    id: 'ceres',
    name: 'Ceres',
    type: 'dwarf-planet',
    diameter: 940,
    color: '#8B8B8B',
    emoji: '🪨',
    funFact: 'Ceres is the largest object in the asteroid belt and was the first asteroid discovered!'
  },
  
  // Planets
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    diameter: 4879,
    color: '#8C7853',
    emoji: '☿️',
    funFact: 'Mercury is the fastest planet, zooming around the Sun in just 88 days!'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    diameter: 12104,
    color: '#E6C87A',
    emoji: '♀️',
    funFact: 'Venus spins backwards compared to most planets - the Sun rises in the west there!'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    diameter: 12742,
    color: '#4A90D9',
    emoji: '🌍',
    funFact: 'Earth is the only planet not named after a god - its name means "the ground"!'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    diameter: 6779,
    color: '#CD5C5C',
    emoji: '♂️',
    funFact: 'Mars has the tallest volcano in the solar system - Olympus Mons is 3 times taller than Everest!'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    diameter: 139820,
    color: '#D4A574',
    emoji: '♃',
    funFact: 'Jupiter is so massive that over 1,300 Earths could fit inside it!'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    diameter: 116460,
    color: '#F4D03F',
    emoji: '♄',
    funFact: 'Saturn would float if you had a bathtub big enough - it\'s less dense than water!'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    diameter: 50724,
    color: '#7FDBFF',
    emoji: '⛢',
    funFact: 'Uranus rotates on its side like a rolling ball - probably from a giant collision long ago!'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    diameter: 49244,
    color: '#4169E1',
    emoji: '♆',
    funFact: 'Neptune has the strongest winds in the solar system - over 2,000 km/h!'
  },
  
  // Stars
  {
    id: 'sun',
    name: 'The Sun',
    type: 'star',
    diameter: 1392700,
    color: '#FFD93D',
    emoji: '☀️',
    funFact: 'The Sun contains 99.86% of all the mass in our solar system!'
  },
  {
    id: 'sirius',
    name: 'Sirius',
    type: 'star',
    diameter: 2380000,
    color: '#B4C7E7',
    emoji: '✨',
    funFact: 'Sirius is the brightest star in our night sky and is nicknamed the "Dog Star"!'
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    type: 'star',
    diameter: 1234000000,
    color: '#FF6B6B',
    emoji: '🔴',
    funFact: 'Betelgeuse is so huge that if it replaced our Sun, it would swallow up Mars!'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    type: 'star',
    diameter: 35700000,
    color: '#FFA500',
    emoji: '🟠',
    funFact: 'Arcturus is an orange giant moving through space at 122 km per second!'
  },
];

export const typeColors = {
  'planet': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  'moon': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  'star': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  'dwarf-planet': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/50' },
};
