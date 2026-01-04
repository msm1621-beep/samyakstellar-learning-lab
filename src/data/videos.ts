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
];
