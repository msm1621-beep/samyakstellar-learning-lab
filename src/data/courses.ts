export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  learningGoals: string[];
  videoIds: string[];
  bookIds: string[];
  audiobookIds: string[];
  plan: { week: number; topic: string; activities: string[] }[];
}

export const courses: Course[] = [
  {
    id: 'course1',
    title: 'Our Solar System Adventure',
    description: 'Explore all the planets, moons, and fascinating objects in our cosmic neighborhood!',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2-3 weeks',
    learningGoals: [
      'Name all 8 planets in order from the Sun',
      'Understand what makes each planet unique',
      'Learn about moons and how they orbit planets',
      'Discover asteroids, comets, and dwarf planets'
    ],
    videoIds: ['v1', 'v8', 'v10'],
    bookIds: ['b1', 'b9', 'b13'],
    audiobookIds: ['ab5', 'ab6', 'ab7'],
    plan: [
      { week: 1, topic: 'The Inner Planets', activities: ['Watch solar system tour video', 'Read about planets', 'Take notes on Mercury, Venus, Earth, Mars'] },
      { week: 2, topic: 'The Outer Giants', activities: ['Watch Mars and Saturn videos', 'Read about Jupiter', 'Listen to audiobook on space exploration'] },
      { week: 3, topic: 'Moons & More', activities: ['Read about moons', 'Complete all audiobooks', 'Take the final quiz'] }
    ]
  },
  {
    id: 'course2',
    title: 'Stars and Constellations',
    description: 'Learn about the stars that light up our night sky and the stories behind constellation patterns!',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand what stars are made of',
      'Learn about different types of stars',
      'Identify major constellations',
      'Know how to find the North Star'
    ],
    videoIds: ['v3', 'v7', 'v14'],
    bookIds: ['b2', 'b10', 'b14'],
    audiobookIds: ['ab1', 'ab2', 'ab3'],
    plan: [
      { week: 1, topic: 'What Are Stars?', activities: ['Watch how stars are born', 'Read about star types', 'Listen to Big Bang audiobook'] },
      { week: 2, topic: 'Finding Constellations', activities: ['Watch constellation video', 'Read stargazing guide', 'Practice identifying stars at night'] }
    ]
  },
  {
    id: 'course3',
    title: 'Galaxies: Islands in Space',
    description: 'Journey beyond our solar system to explore galaxies, black holes, and the structure of the universe!',
    thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '3 weeks',
    learningGoals: [
      'Understand what galaxies are and their types',
      'Learn about the Milky Way galaxy',
      'Discover how black holes form and work',
      'Explore galaxy collisions and evolution'
    ],
    videoIds: ['v4', 'v5', 'v11'],
    bookIds: ['b4', 'b5', 'b11'],
    audiobookIds: ['ab1', 'ab4', 'ab8'],
    plan: [
      { week: 1, topic: 'Our Galaxy', activities: ['Watch Milky Way video', 'Read Galaxy Explorer', 'Take notes on spiral galaxies'] },
      { week: 2, topic: 'Black Holes', activities: ['Watch black holes video', 'Read Black Holes for Beginners', 'Listen to gravity audiobook'] },
      { week: 3, topic: 'The Universe', activities: ['Watch Andromeda video', 'Read Big Bang book', 'Complete all audiobooks'] }
    ]
  },
  {
    id: 'course4',
    title: 'Space Exploration Heroes',
    description: 'Meet the brave astronauts and amazing spacecraft that have explored our solar system and beyond!',
    thumbnail: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Learn about the history of space exploration',
      'Know about the Moon landings',
      'Understand how rockets work',
      'Discover future space missions'
    ],
    videoIds: ['v19', 'v22', 'v23'],
    bookIds: ['b7', 'b12', 'b6'],
    audiobookIds: ['ab5', 'ab2', 'ab8'],
    plan: [
      { week: 1, topic: 'Space Pioneers', activities: ['Read about astronauts', 'Watch ISS video', 'Listen to space exploration audiobook'] },
      { week: 2, topic: 'Rockets & Future', activities: ['Read rocket science guide', 'Watch telescope video', 'Complete course quiz'] }
    ]
  },
  {
    id: 'course5',
    title: 'Nebulas and Star Nurseries',
    description: 'Discover the most colorful and beautiful objects in space where new stars are born!',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand what nebulas are',
      'Learn about different types of nebulas',
      'Discover how stars form in nebulas',
      'Know about famous nebulas like the Pillars of Creation'
    ],
    videoIds: ['v2', 'v9', 'v3'],
    bookIds: ['b3', 'b10', 'b11'],
    audiobookIds: ['ab1', 'ab3', 'ab4'],
    plan: [
      { week: 1, topic: 'What Are Nebulas?', activities: ['Watch nebula video', 'Read Space Guide: Nebulas', 'Listen to Big Bang audiobook'] },
      { week: 2, topic: 'Star Life Cycle', activities: ['Watch supernova video', 'Read about star types', 'Complete course project'] }
    ]
  },
  {
    id: 'course6',
    title: 'Mysteries of the Universe',
    description: 'Explore the biggest mysteries in space including dark matter, exoplanets, and the edge of the universe!',
    thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=225&fit=crop',
    difficulty: 'advanced',
    estimatedDuration: '3 weeks',
    learningGoals: [
      'Learn about dark matter and dark energy',
      'Understand how scientists find exoplanets',
      'Explore the size and age of the universe',
      'Discover what we still don\'t know about space'
    ],
    videoIds: ['v6', 'v15', 'v17'],
    bookIds: ['b6', 'b5', 'b11'],
    audiobookIds: ['ab2', 'ab3', 'ab4'],
    plan: [
      { week: 1, topic: 'Finding Other Worlds', activities: ['Watch exoplanet video', 'Read about exoplanet search', 'Take notes on detection methods'] },
      { week: 2, topic: 'Dark Universe', activities: ['Watch dark matter video', 'Read about black holes', 'Listen to relativity audiobook'] },
      { week: 3, topic: 'Big Questions', activities: ['Watch universe size video', 'Read Big Bang book', 'Complete final project'] }
    ]
  },
  {
    id: 'course7',
    title: 'Cosmic Collisions',
    description: 'Learn about asteroids, comets, meteors, and the amazing impacts that shaped our solar system!',
    thumbnail: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand the difference between asteroids, comets, and meteors',
      'Learn about meteor showers and how to watch them',
      'Discover how scientists protect Earth from impacts',
      'Know about famous impacts in history'
    ],
    videoIds: ['v13', 'v20', 'v12'],
    bookIds: ['b8', 'b13', 'b1'],
    audiobookIds: ['ab5', 'ab6', 'ab7'],
    plan: [
      { week: 1, topic: 'Space Rocks', activities: ['Watch comet video', 'Read about asteroids and meteors', 'Track upcoming meteor showers'] },
      { week: 2, topic: 'Protecting Earth', activities: ['Watch asteroid belt video', 'Read about moons', 'Complete safety quiz'] }
    ]
  },
  {
    id: 'course8',
    title: 'Journey to the Ice Giants',
    description: 'Explore the mysterious outer planets Uranus and Neptune and their amazing moon systems!',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Learn what makes ice giants different from gas giants',
      'Understand Uranus\'s unique sideways rotation',
      'Discover Neptune\'s supersonic winds',
      'Meet the moons of the outer solar system'
    ],
    videoIds: ['v16', 'v18', 'v12'],
    bookIds: ['b1', 'b13', 'b8'],
    audiobookIds: ['ab6', 'ab7', 'ab8'],
    plan: [
      { week: 1, topic: 'Ice Giants', activities: ['Watch ice giants video', 'Read about outer planets', 'Compare to gas giants'] },
      { week: 2, topic: 'Outer Moons', activities: ['Watch moons video', 'Read about Triton and Miranda', 'Complete exploration journal'] }
    ]
  },
  // NEW COURSES
  {
    id: 'course9',
    title: 'The Sun: Our Life-Giving Star',
    description: 'Study our nearest star in detail - solar flares, sunspots, and how the Sun affects life on Earth!',
    thumbnail: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand how the Sun produces energy',
      'Learn about sunspots and solar cycles',
      'Discover solar flares and their effects',
      'Know how the Sun will evolve over time'
    ],
    videoIds: ['v7', 'v3', 'v9'],
    bookIds: ['b2', 'b10', 'b11'],
    audiobookIds: ['ab1', 'ab3', 'ab4'],
    plan: [
      { week: 1, topic: 'Sun Basics', activities: ['Watch Sun documentary', 'Read about nuclear fusion', 'Take notes on Sun structure'] },
      { week: 2, topic: 'Solar Activity', activities: ['Learn about sunspots', 'Study solar flares', 'Understand auroras'] }
    ]
  },
  {
    id: 'course10',
    title: 'Moons of the Gas Giants',
    description: 'Discover the fascinating moons of Jupiter and Saturn - from volcanic Io to ocean-world Europa!',
    thumbnail: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '3 weeks',
    learningGoals: [
      'Learn about the Galilean moons of Jupiter',
      'Discover Titan\'s unique atmosphere and lakes',
      'Explore Enceladus and its ice geysers',
      'Understand why some moons may harbor life'
    ],
    videoIds: ['v12', 'v10', 'v1'],
    bookIds: ['b9', 'b13', 'b1'],
    audiobookIds: ['ab5', 'ab6', 'ab7'],
    plan: [
      { week: 1, topic: 'Jupiter\'s Moons', activities: ['Study Io, Europa, Ganymede, Callisto', 'Watch moons video', 'Research potential for life'] },
      { week: 2, topic: 'Saturn\'s Moons', activities: ['Explore Titan and Enceladus', 'Read about ring moons', 'Compare to Jupiter\'s moons'] },
      { week: 3, topic: 'Ocean Worlds', activities: ['Focus on subsurface oceans', 'Learn about astrobiology', 'Complete moon project'] }
    ]
  },
  {
    id: 'course11',
    title: 'Exoplanets: Worlds Beyond',
    description: 'Journey to planets orbiting distant stars and learn how scientists discover new worlds!',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    difficulty: 'advanced',
    estimatedDuration: '3 weeks',
    learningGoals: [
      'Master exoplanet detection methods',
      'Understand the habitable zone concept',
      'Learn about strange exoplanet types',
      'Explore the search for Earth-like worlds'
    ],
    videoIds: ['v6', 'v15', 'v17'],
    bookIds: ['b6', 'b11', 'b5'],
    audiobookIds: ['ab2', 'ab4', 'ab8'],
    plan: [
      { week: 1, topic: 'Finding Exoplanets', activities: ['Learn transit and wobble methods', 'Study Kepler mission', 'Watch exoplanet video'] },
      { week: 2, topic: 'Strange New Worlds', activities: ['Explore hot Jupiters', 'Learn about rogue planets', 'Study binary star planets'] },
      { week: 3, topic: 'Search for Life', activities: ['Understand habitability', 'Study TRAPPIST-1 system', 'Complete final presentation'] }
    ]
  },
  {
    id: 'course12',
    title: 'Space Telescopes',
    description: 'Learn about the incredible telescopes that help us see the universe - from Hubble to James Webb!',
    thumbnail: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand how space telescopes work',
      'Learn about Hubble\'s discoveries',
      'Explore James Webb\'s capabilities',
      'Discover future telescope missions'
    ],
    videoIds: ['v19', 'v15', 'v11'],
    bookIds: ['b6', 'b4', 'b11'],
    audiobookIds: ['ab1', 'ab4', 'ab8'],
    plan: [
      { week: 1, topic: 'Space Observatories', activities: ['Learn about Hubble', 'Understand infrared astronomy', 'Watch JWST video'] },
      { week: 2, topic: 'Discoveries', activities: ['Study famous images', 'Learn about deep field photos', 'Explore future missions'] }
    ]
  },
  {
    id: 'course13',
    title: 'Gravity and Orbits',
    description: 'Understand the invisible force that shapes the universe - from falling apples to orbiting planets!',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=225&fit=crop',
    difficulty: 'intermediate',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand Newton\'s law of gravity',
      'Learn how orbits work',
      'Discover gravitational waves',
      'Explore Einstein\'s general relativity'
    ],
    videoIds: ['v5', 'v4', 'v15'],
    bookIds: ['b5', 'b11', 'b4'],
    audiobookIds: ['ab2', 'ab3', 'ab4'],
    plan: [
      { week: 1, topic: 'Gravity Basics', activities: ['Learn Newton\'s laws', 'Understand orbital mechanics', 'Watch black hole video'] },
      { week: 2, topic: 'Einstein\'s Universe', activities: ['Study space-time', 'Learn about gravitational lensing', 'Explore gravitational waves'] }
    ]
  },
  {
    id: 'course14',
    title: 'Mars: The Next Frontier',
    description: 'Everything about the Red Planet - its history, exploration, and plans for human colonization!',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '3 weeks',
    learningGoals: [
      'Learn about Mars\' geography and climate',
      'Understand past and current Mars missions',
      'Discover evidence for ancient water',
      'Explore plans for human missions to Mars'
    ],
    videoIds: ['v8', 'v1', 'v22'],
    bookIds: ['b1', 'b7', 'b12'],
    audiobookIds: ['ab5', 'ab6', 'ab8'],
    plan: [
      { week: 1, topic: 'Mars Basics', activities: ['Study Mars geography', 'Learn about atmosphere', 'Compare to Earth'] },
      { week: 2, topic: 'Exploring Mars', activities: ['Learn about rovers', 'Study helicopter missions', 'Watch Mars video'] },
      { week: 3, topic: 'Future Missions', activities: ['Explore colonization plans', 'Design a Mars base', 'Complete final project'] }
    ]
  },
  {
    id: 'course15',
    title: 'The Night Sky Observer',
    description: 'Become a stargazer! Learn to identify constellations, planets, and celestial events!',
    thumbnail: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=225&fit=crop',
    difficulty: 'beginner',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Identify major constellations by season',
      'Spot planets in the night sky',
      'Understand celestial coordinates',
      'Plan for meteor showers and eclipses'
    ],
    videoIds: ['v14', 'v7', 'v23'],
    bookIds: ['b2', 'b14', 'b10'],
    audiobookIds: ['ab3', 'ab1', 'ab7'],
    plan: [
      { week: 1, topic: 'Sky Basics', activities: ['Learn to find Polaris', 'Identify Big and Little Dipper', 'Track the Moon phases'] },
      { week: 2, topic: 'Advanced Observing', activities: ['Find planets by eye', 'Learn seasonal constellations', 'Plan meteor shower viewing'] }
    ]
  },
  {
    id: 'course16',
    title: 'Supernovas and Stellar Deaths',
    description: 'Witness the most spectacular explosions in the universe and learn what happens when stars die!',
    thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=225&fit=crop',
    difficulty: 'advanced',
    estimatedDuration: '2 weeks',
    learningGoals: [
      'Understand different types of supernovas',
      'Learn about neutron stars and pulsars',
      'Explore supernova remnants',
      'Discover how heavy elements are created'
    ],
    videoIds: ['v9', 'v21', 'v3'],
    bookIds: ['b10', 'b3', 'b11'],
    audiobookIds: ['ab1', 'ab3', 'ab4'],
    plan: [
      { week: 1, topic: 'Stellar Explosions', activities: ['Study types of supernovas', 'Learn about core collapse', 'Watch supernova video'] },
      { week: 2, topic: 'Stellar Remnants', activities: ['Explore neutron stars', 'Study pulsars', 'Learn about element creation'] }
    ]
  }
];
