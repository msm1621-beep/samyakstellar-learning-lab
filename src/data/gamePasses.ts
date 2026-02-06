export interface GamePass {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  duration: number; // in days
  perks: string[];
  color: string;
}

export const gamePasses: GamePass[] = [
  {
    id: 'extra-lives',
    name: 'Phoenix Pass',
    description: 'Rise again! Get 3 extra attempts when you fail a game.',
    icon: '🔥',
    price: 150,
    duration: 7,
    perks: ['+3 extra lives per game', 'Auto-retry on failure', 'No game over screen'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'score-multiplier',
    name: 'Star Booster',
    description: 'Earn double coins from all games!',
    icon: '⭐',
    price: 200,
    duration: 7,
    perks: ['2x coins from games', 'Bonus points on wins', 'Double streak rewards'],
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'premium-games',
    name: 'Galaxy Access',
    description: 'Unlock exclusive premium games!',
    icon: '🌌',
    price: 300,
    duration: 14,
    perks: ['Access 5 premium games', 'Exclusive challenges', 'Special achievements'],
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'skip-cooldowns',
    name: 'Warp Drive',
    description: 'Skip all waiting times between game attempts!',
    icon: '🚀',
    price: 100,
    duration: 7,
    perks: ['No cooldowns', 'Instant replay', 'Unlimited attempts'],
    color: 'from-cyan-500 to-blue-500'
  }
];

export const getGamePassById = (id: string): GamePass | undefined => {
  return gamePasses.find(pass => pass.id === id);
};
