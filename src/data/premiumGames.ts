export interface PremiumGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'puzzle' | 'adventure' | 'trivia' | 'arcade';
  color: string;
  coinReward: number;
}

export const premiumGames: PremiumGame[] = [
  {
    id: 'asteroid-defender',
    name: 'Asteroid Defender',
    description: 'Protect Earth from incoming asteroids in this fast-paced shooter!',
    icon: '☄️',
    difficulty: 'medium',
    category: 'arcade',
    color: 'from-red-500 to-orange-500',
    coinReward: 50
  },
  {
    id: 'galaxy-explorer',
    name: 'Galaxy Explorer',
    description: 'Navigate through mysterious galaxies and discover new worlds!',
    icon: '🌌',
    difficulty: 'easy',
    category: 'adventure',
    color: 'from-purple-500 to-violet-500',
    coinReward: 40
  },
  {
    id: 'mars-colony',
    name: 'Mars Colony Builder',
    description: 'Build and manage your own colony on Mars!',
    icon: '🏗️',
    difficulty: 'hard',
    category: 'puzzle',
    color: 'from-amber-500 to-red-500',
    coinReward: 75
  },
  {
    id: 'space-trivia-master',
    name: 'Space Trivia Master',
    description: 'Test your space knowledge with advanced trivia challenges!',
    icon: '🧠',
    difficulty: 'hard',
    category: 'trivia',
    color: 'from-cyan-500 to-blue-500',
    coinReward: 60
  },
  {
    id: 'nebula-painter',
    name: 'Nebula Painter',
    description: 'Create beautiful nebula art by matching cosmic patterns!',
    icon: '🎨',
    difficulty: 'easy',
    category: 'puzzle',
    color: 'from-pink-500 to-fuchsia-500',
    coinReward: 35
  },
  {
    id: 'rocket-racer',
    name: 'Rocket Racer',
    description: 'Race through asteroid fields at light speed!',
    icon: '🏎️',
    difficulty: 'medium',
    category: 'arcade',
    color: 'from-green-500 to-emerald-500',
    coinReward: 55
  },
  {
    id: 'black-hole-escape',
    name: 'Black Hole Escape',
    description: 'Navigate your ship away from the gravitational pull!',
    icon: '🕳️',
    difficulty: 'hard',
    category: 'arcade',
    color: 'from-slate-700 to-purple-900',
    coinReward: 80
  },
  {
    id: 'planet-puzzle',
    name: 'Planet Puzzle',
    description: 'Solve intricate puzzles based on planetary physics!',
    icon: '🧩',
    difficulty: 'medium',
    category: 'puzzle',
    color: 'from-blue-500 to-indigo-500',
    coinReward: 45
  },
  {
    id: 'stellar-sudoku',
    name: 'Stellar Sudoku',
    description: 'Classic sudoku with a cosmic twist using space symbols!',
    icon: '⭐',
    difficulty: 'medium',
    category: 'puzzle',
    color: 'from-yellow-500 to-amber-500',
    coinReward: 40
  },
  {
    id: 'cosmos-quest',
    name: 'Cosmos Quest',
    description: 'Embark on an epic journey through the cosmos!',
    icon: '🗺️',
    difficulty: 'easy',
    category: 'adventure',
    color: 'from-teal-500 to-cyan-500',
    coinReward: 50
  },
  {
    id: 'alien-translator',
    name: 'Alien Translator',
    description: 'Decode alien languages and communicate with extraterrestrials!',
    icon: '👽',
    difficulty: 'hard',
    category: 'trivia',
    color: 'from-lime-500 to-green-500',
    coinReward: 70
  },
  {
    id: 'moon-mining',
    name: 'Moon Mining Tycoon',
    description: 'Extract valuable resources from the lunar surface!',
    icon: '🌙',
    difficulty: 'medium',
    category: 'adventure',
    color: 'from-gray-400 to-slate-500',
    coinReward: 55
  }
];

export const getGameById = (id: string): PremiumGame | undefined => {
  return premiumGames.find(game => game.id === id);
};
