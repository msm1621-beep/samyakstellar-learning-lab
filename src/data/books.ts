export interface Book {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  description: string;
  cover: string;
  tags: string[];
  type: 'book' | 'guide';
}

export const books: Book[] = [
  {
    id: 'b1',
    title: 'My First Book of Planets',
    author: 'Bruce Betts',
    ageRange: '4-8',
    description: 'A colorful introduction to all the planets in our solar system with fun facts and beautiful illustrations.',
    cover: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=300&h=400&fit=crop',
    tags: ['Planets', 'Beginner', 'Solar System'],
    type: 'book'
  },
  {
    id: 'b2',
    title: 'The Stars: A New Way to See Them',
    author: 'H.A. Rey',
    ageRange: '8-12',
    description: 'Learn to find constellations and understand the night sky with easy-to-follow star maps.',
    cover: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=300&h=400&fit=crop',
    tags: ['Stars', 'Constellations', 'Beginner'],
    type: 'book'
  },
  {
    id: 'b3',
    title: 'Space Guide: Nebulas',
    author: 'Cosmic Classroom',
    ageRange: '7-13',
    description: 'Explore the most beautiful nebulas in the universe with stunning images and kid-friendly explanations.',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=400&fit=crop',
    tags: ['Nebulas', 'Beginner', 'Stars'],
    type: 'guide'
  },
  {
    id: 'b4',
    title: 'Galaxy Explorer',
    author: 'Dr. Stuart Clark',
    ageRange: '10-14',
    description: 'Journey through different types of galaxies and learn what makes each one unique.',
    cover: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=300&h=400&fit=crop',
    tags: ['Galaxies', 'Advanced'],
    type: 'book'
  },
  {
    id: 'b5',
    title: 'Black Holes for Beginners',
    author: 'Space Academy',
    ageRange: '9-13',
    description: 'Discover the mysteries of black holes in this easy-to-understand guide with cool illustrations.',
    cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=400&fit=crop',
    tags: ['Black Holes', 'Galaxies', 'Advanced'],
    type: 'guide'
  },
  {
    id: 'b6',
    title: 'The Search for Other Worlds',
    author: 'NASA Kids',
    ageRange: '8-12',
    description: 'How scientists find planets around other stars and what we know about them so far.',
    cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop',
    tags: ['Exoplanets', 'Planets', 'Advanced'],
    type: 'guide'
  },
];
