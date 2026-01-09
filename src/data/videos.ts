export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  tags: string[];
  youtubeId: string;
}

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Tour of the Solar System',
    description: 'Join us on an exciting journey through all the planets!',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop',
    duration: '8:45',
    category: 'Solar System',
    tags: ['Planets', 'Beginner'],
    youtubeId: 'libKVRa01L8'
  },
  {
    id: 'v2',
    title: 'What is a Nebula?',
    description: 'Discover the colorful clouds where stars are born!',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=225&fit=crop',
    duration: '6:30',
    category: 'Nebulas',
    tags: ['Nebulas', 'Stars', 'Beginner'],
    youtubeId: 'YKzxmeABbkU'
  },
  {
    id: 'v3',
    title: 'How Stars Are Born',
    description: 'Learn about the amazing life cycle of stars!',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=225&fit=crop',
    duration: '7:15',
    category: 'Stars',
    tags: ['Stars', 'Nebulas', 'Advanced'],
    youtubeId: 'PM9CQDlQI0A'
  },
  {
    id: 'v4',
    title: 'Journey to the Milky Way Center',
    description: 'Travel to the heart of our galaxy!',
    thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=225&fit=crop',
    duration: '10:00',
    category: 'Galaxies',
    tags: ['Galaxies', 'Black Holes', 'Advanced'],
    youtubeId: '5D9oqVB_6Kc'
  },
  {
    id: 'v5',
    title: 'Black Holes Explained for Kids',
    description: 'What happens when you fall into a black hole?',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=225&fit=crop',
    duration: '5:45',
    category: 'Galaxies',
    tags: ['Black Holes', 'Beginner'],
    youtubeId: 'e-P5IFTqB98'
  },
  {
    id: 'v6',
    title: 'Exploring Exoplanets',
    description: 'Could there be another Earth out there?',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    duration: '8:20',
    category: 'Galaxies',
    tags: ['Exoplanets', 'Planets', 'Advanced'],
    youtubeId: 'aiFD_LBx2nM'
  },
  {
    id: 'v7',
    title: 'The Life of the Sun',
    description: 'Learn all about our amazing star and its future!',
    thumbnail: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=225&fit=crop',
    duration: '9:30',
    category: 'Stars',
    tags: ['Stars', 'Solar System', 'Beginner'],
    youtubeId: '2HoTK_Gqi2Q'
  },
  {
    id: 'v8',
    title: 'Mars: The Red Planet',
    description: 'Discover why Mars is so fascinating and how we might live there!',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=225&fit=crop',
    duration: '7:45',
    category: 'Solar System',
    tags: ['Planets', 'Mars', 'Beginner'],
    youtubeId: 'D8pnmwOXhoY'
  },
  {
    id: 'v9',
    title: 'Supernovas: Exploding Stars',
    description: 'Watch stars explode in the most powerful events in the universe!',
    thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=225&fit=crop',
    duration: '6:15',
    category: 'Stars',
    tags: ['Stars', 'Nebulas', 'Advanced'],
    youtubeId: 'aysiMbgml5g'
  },
  {
    id: 'v10',
    title: 'Saturn and Its Rings',
    description: 'Explore the most beautiful planet and its amazing ring system!',
    thumbnail: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=225&fit=crop',
    duration: '8:00',
    category: 'Solar System',
    tags: ['Planets', 'Saturn', 'Beginner'],
    youtubeId: '8cFChyGLPqU'
  },
  {
    id: 'v11',
    title: 'The Andromeda Galaxy',
    description: 'Meet our neighbor galaxy that\'s heading straight for us!',
    thumbnail: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=225&fit=crop',
    duration: '7:30',
    category: 'Galaxies',
    tags: ['Galaxies', 'Advanced'],
    youtubeId: 'udAL48P5NJU'
  },
  {
    id: 'v12',
    title: 'Moons of the Solar System',
    description: 'Explore the fascinating moons orbiting our planets!',
    thumbnail: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=225&fit=crop',
    duration: '9:00',
    category: 'Solar System',
    tags: ['Moons', 'Planets', 'Beginner'],
    youtubeId: 'rcLnMe1ELPA'
  },
  {
    id: 'v13',
    title: 'What is a Comet?',
    description: 'Learn about these amazing icy visitors from the outer solar system!',
    thumbnail: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=400&h=225&fit=crop',
    duration: '6:00',
    category: 'Solar System',
    tags: ['Comets', 'Solar System', 'Beginner'],
    youtubeId: '4jfRxZgcLjc'
  },
  {
    id: 'v14',
    title: 'Constellations for Kids',
    description: 'Find patterns in the stars and learn their ancient stories!',
    thumbnail: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&h=225&fit=crop',
    duration: '10:15',
    category: 'Stars',
    tags: ['Constellations', 'Stars', 'Beginner'],
    youtubeId: 'F4FkBGxB0Mg'
  },
  {
    id: 'v15',
    title: 'How Big is the Universe?',
    description: 'A mind-blowing journey from Earth to the edge of the observable universe!',
    thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=225&fit=crop',
    duration: '12:30',
    category: 'Galaxies',
    tags: ['Galaxies', 'Advanced'],
    youtubeId: 'Iy7NzjCmUf0'
  },
  {
    id: 'v16',
    title: 'The Ice Giants: Uranus and Neptune',
    description: 'Explore the mysterious worlds at the edge of our solar system!',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop',
    duration: '8:45',
    category: 'Solar System',
    tags: ['Planets', 'Uranus', 'Neptune', 'Beginner'],
    youtubeId: 'mFj2EY3oLsA'
  },
  {
    id: 'v17',
    title: 'What is Dark Matter?',
    description: 'Discover the invisible stuff that holds galaxies together!',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=225&fit=crop',
    duration: '7:20',
    category: 'Galaxies',
    tags: ['Dark Matter', 'Galaxies', 'Advanced'],
    youtubeId: 'QAa2O_8wBUQ'
  },
  {
    id: 'v18',
    title: 'Dwarf Planets Explained',
    description: 'Meet Pluto, Eris, and the other tiny worlds of our solar system!',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=225&fit=crop',
    duration: '9:00',
    category: 'Solar System',
    tags: ['Dwarf Planets', 'Pluto', 'Beginner'],
    youtubeId: 'SnrVaLFpP5M'
  },
  {
    id: 'v19',
    title: 'The James Webb Space Telescope',
    description: 'See the universe like never before with the most powerful telescope ever built!',
    thumbnail: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=225&fit=crop',
    duration: '11:00',
    category: 'Space Tech',
    tags: ['Telescopes', 'Space Exploration', 'Advanced'],
    youtubeId: '4P8fKd0IVOs'
  },
  {
    id: 'v20',
    title: 'Asteroid Belt Adventure',
    description: 'Fly through the asteroid belt between Mars and Jupiter!',
    thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=225&fit=crop',
    duration: '7:30',
    category: 'Solar System',
    tags: ['Asteroids', 'Solar System', 'Beginner'],
    youtubeId: 'S_d-gs0WoUw'
  },
  {
    id: 'v21',
    title: 'Neutron Stars and Pulsars',
    description: 'Meet the universe\'s most extreme spinning objects!',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=225&fit=crop',
    duration: '8:15',
    category: 'Stars',
    tags: ['Stars', 'Neutron Stars', 'Advanced'],
    youtubeId: 'RrMvUL8HFlM'
  },
  {
    id: 'v22',
    title: 'Living in Space',
    description: 'What\'s it like to eat, sleep, and float on the ISS?',
    thumbnail: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&h=225&fit=crop',
    duration: '10:45',
    category: 'Space Tech',
    tags: ['Space Exploration', 'ISS', 'Beginner'],
    youtubeId: 'SGP6Y0Pnhe4'
  },
  {
    id: 'v23',
    title: 'The Moon: Our Cosmic Companion',
    description: 'Everything you need to know about Earth\'s best friend in space!',
    thumbnail: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=225&fit=crop',
    duration: '9:30',
    category: 'Solar System',
    tags: ['Moon', 'Solar System', 'Beginner'],
    youtubeId: '6AviDjR9mmo'
  },
  {
    id: 'v24',
    title: 'How Planets Form',
    description: 'Watch a solar system being born from dust and gas!',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    duration: '8:00',
    category: 'Solar System',
    tags: ['Planets', 'Stars', 'Advanced'],
    youtubeId: 'QdpKP2hE4Vc'
  }
];