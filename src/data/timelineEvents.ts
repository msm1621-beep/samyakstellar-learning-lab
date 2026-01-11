export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  category: 'universe' | 'solar-system' | 'earth' | 'exploration';
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'big-bang',
    year: '13.8 Billion Years Ago',
    title: 'The Big Bang',
    description: 'The universe began as an incredibly hot, dense point that suddenly expanded. Everything we see today came from this moment!',
    icon: '💥',
    category: 'universe'
  },
  {
    id: 'first-stars',
    year: '13.5 Billion Years Ago',
    title: 'First Stars Are Born',
    description: 'The first stars lit up the dark universe. These giant stars were much bigger than our Sun!',
    icon: '⭐',
    category: 'universe'
  },
  {
    id: 'milky-way',
    year: '13.2 Billion Years Ago',
    title: 'Milky Way Forms',
    description: 'Our home galaxy, the Milky Way, started forming from clouds of gas and dust.',
    icon: '🌌',
    category: 'universe'
  },
  {
    id: 'solar-system',
    year: '4.6 Billion Years Ago',
    title: 'Solar System Forms',
    description: 'Our Sun and all the planets formed from a spinning cloud of gas and dust called a nebula.',
    icon: '☀️',
    category: 'solar-system'
  },
  {
    id: 'earth-forms',
    year: '4.5 Billion Years Ago',
    title: 'Earth Is Born',
    description: 'Our planet Earth formed and was very hot with lots of volcanoes. No oceans yet!',
    icon: '🌍',
    category: 'earth'
  },
  {
    id: 'moon-forms',
    year: '4.5 Billion Years Ago',
    title: 'The Moon Forms',
    description: 'A Mars-sized object crashed into Earth, and the debris became our Moon!',
    icon: '🌙',
    category: 'solar-system'
  },
  {
    id: 'first-oceans',
    year: '4 Billion Years Ago',
    title: 'First Oceans Appear',
    description: 'Water from comets and asteroids helped create Earth\'s first oceans.',
    icon: '🌊',
    category: 'earth'
  },
  {
    id: 'first-life',
    year: '3.8 Billion Years Ago',
    title: 'First Life on Earth',
    description: 'Tiny microscopic life forms appeared in the oceans. The beginning of all life!',
    icon: '🦠',
    category: 'earth'
  },
  {
    id: 'dinosaurs',
    year: '230 Million Years Ago',
    title: 'Dinosaurs Rule Earth',
    description: 'Dinosaurs appeared and dominated Earth for over 160 million years!',
    icon: '🦕',
    category: 'earth'
  },
  {
    id: 'asteroid-impact',
    year: '66 Million Years Ago',
    title: 'Asteroid Ends Dinosaurs',
    description: 'A huge asteroid hit Earth near Mexico, causing the extinction of the dinosaurs.',
    icon: '☄️',
    category: 'earth'
  },
  {
    id: 'first-telescope',
    year: '1609',
    title: 'Galileo\'s Telescope',
    description: 'Galileo used a telescope to see Jupiter\'s moons and craters on our Moon for the first time!',
    icon: '🔭',
    category: 'exploration'
  },
  {
    id: 'first-satellite',
    year: '1957',
    title: 'Sputnik 1 Launches',
    description: 'The Soviet Union launched Sputnik 1, the first artificial satellite to orbit Earth!',
    icon: '📡',
    category: 'exploration'
  },
  {
    id: 'first-human-space',
    year: '1961',
    title: 'First Human in Space',
    description: 'Yuri Gagarin became the first person to travel to space and orbit Earth!',
    icon: '👨‍🚀',
    category: 'exploration'
  },
  {
    id: 'moon-landing',
    year: '1969',
    title: 'First Moon Landing',
    description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon!',
    icon: '🚀',
    category: 'exploration'
  },
  {
    id: 'voyager',
    year: '1977',
    title: 'Voyager Missions Launch',
    description: 'Voyager 1 and 2 launched to explore the outer planets. They\'re still traveling in space today!',
    icon: '🛸',
    category: 'exploration'
  },
  {
    id: 'hubble',
    year: '1990',
    title: 'Hubble Space Telescope',
    description: 'The Hubble telescope was launched, giving us amazing pictures of distant galaxies!',
    icon: '🔭',
    category: 'exploration'
  },
  {
    id: 'iss',
    year: '1998',
    title: 'International Space Station',
    description: 'Construction began on the ISS, where astronauts from many countries live and work in space!',
    icon: '🛰️',
    category: 'exploration'
  },
  {
    id: 'mars-rovers',
    year: '2004',
    title: 'Mars Rovers Land',
    description: 'Spirit and Opportunity rovers landed on Mars to explore the Red Planet\'s surface!',
    icon: '🤖',
    category: 'exploration'
  },
  {
    id: 'jwst',
    year: '2021',
    title: 'James Webb Telescope',
    description: 'The most powerful space telescope ever launched, showing us the earliest galaxies!',
    icon: '✨',
    category: 'exploration'
  },
  {
    id: 'artemis',
    year: '2025+',
    title: 'Return to the Moon',
    description: 'NASA\'s Artemis program plans to send astronauts back to the Moon, including the first woman!',
    icon: '🌕',
    category: 'exploration'
  }
];

export const categoryColors = {
  universe: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-300' },
  'solar-system': { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-300' },
  earth: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-300' },
  exploration: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-300' }
};

export const categoryLabels = {
  universe: 'Universe',
  'solar-system': 'Solar System',
  earth: 'Earth',
  exploration: 'Space Exploration'
};
