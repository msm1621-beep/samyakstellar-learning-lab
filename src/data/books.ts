export interface Book {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  description: string;
  cover: string;
  tags: string[];
  type: 'book' | 'guide';
  fullContent: string;
  chapters: { title: string; content: string }[];
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
    type: 'book',
    fullContent: 'Welcome to the amazing world of planets! Our solar system has eight wonderful planets, each with its own special features. From tiny Mercury racing around the Sun to distant Neptune with its supersonic winds, every planet has a story to tell.',
    chapters: [
      { title: 'The Sun - Our Star', content: 'The Sun is a giant ball of hot, glowing gas at the center of our solar system. It\'s so big that over 1 million Earths could fit inside! The Sun gives us light and warmth, making life on Earth possible. Without the Sun, our planet would be a frozen, dark world.' },
      { title: 'Mercury - The Speedy Planet', content: 'Mercury is the smallest planet and the closest to the Sun. It zooms around the Sun faster than any other planet - a year on Mercury is only 88 Earth days! Mercury has no moons and almost no atmosphere, so it gets very hot during the day and very cold at night.' },
      { title: 'Venus - Earth\'s Twin', content: 'Venus is almost the same size as Earth, but it\'s very different! It\'s covered in thick, toxic clouds and is the hottest planet - even hotter than Mercury. Venus spins backwards, so the Sun rises in the west and sets in the east there!' },
      { title: 'Earth - Our Home', content: 'Earth is the only planet we know that has life. It\'s covered in oceans of liquid water and wrapped in a protective atmosphere. Earth has one Moon that controls our ocean tides and lights up our nights. We should take good care of our beautiful blue planet!' },
      { title: 'Mars - The Red Planet', content: 'Mars is called the Red Planet because of its rusty red color. It has the tallest volcano and the deepest canyon in the solar system! Scientists have sent robots to explore Mars, and one day humans might live there. Mars has two tiny moons named Phobos and Deimos.' },
      { title: 'Jupiter - The Giant', content: 'Jupiter is the biggest planet - you could fit over 1,300 Earths inside it! This gas giant has a famous storm called the Great Red Spot that has been raging for hundreds of years. Jupiter has at least 95 moons, including four large ones discovered by Galileo.' },
      { title: 'Saturn - The Ringed Beauty', content: 'Saturn is famous for its beautiful rings made of ice and rock. It\'s so light that it would float in water if you had a big enough bathtub! Saturn has many moons, including Titan, which has lakes and an atmosphere like Earth.' },
      { title: 'Uranus & Neptune - The Ice Giants', content: 'Uranus spins on its side like a rolling ball, probably because something huge crashed into it long ago. Neptune is the windiest planet, with storms faster than the speed of sound! Both are called "ice giants" because they\'re made mostly of icy materials.' }
    ]
  },
  {
    id: 'b2',
    title: 'The Stars: A New Way to See Them',
    author: 'H.A. Rey',
    ageRange: '8-12',
    description: 'Learn to find constellations and understand the night sky with easy-to-follow star maps.',
    cover: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=300&h=400&fit=crop',
    tags: ['Stars', 'Constellations', 'Beginner'],
    type: 'book',
    fullContent: 'Have you ever looked up at the night sky and wondered about the stars? For thousands of years, people have seen pictures in the stars - these are called constellations. Let\'s learn how to find them!',
    chapters: [
      { title: 'What Are Stars?', content: 'Stars are giant balls of hot, glowing gas, just like our Sun! They look tiny because they\'re incredibly far away. Some stars are bigger than our Sun, some are smaller. They come in different colors too - red stars are cooler, blue stars are hotter.' },
      { title: 'Finding the North Star', content: 'The North Star, also called Polaris, is special because it barely moves in the sky. For thousands of years, sailors and travelers have used it to find their way. You can find it by locating the Big Dipper and following the two "pointer stars" at the end of the cup.' },
      { title: 'The Big Dipper and Little Dipper', content: 'The Big Dipper looks like a giant ladle or cooking pot in the sky. It\'s part of a bigger constellation called Ursa Major (the Great Bear). The Little Dipper is smaller and includes the North Star at the end of its handle.' },
      { title: 'Orion the Hunter', content: 'Orion is one of the easiest constellations to spot! Look for three stars in a row - that\'s Orion\'s belt. Above the belt are his shoulders (including the red star Betelgeuse), and below are his feet (including bright blue Rigel). Hanging from his belt is a sword, which contains the Orion Nebula!' },
      { title: 'The Summer Triangle', content: 'In summer, look for three bright stars that form a big triangle: Vega, Deneb, and Altair. These stars are part of three different constellations but together make a pattern called the Summer Triangle.' },
      { title: 'Seasonal Constellations', content: 'Different constellations are visible at different times of year because Earth is moving around the Sun. Summer skies show different stars than winter skies. That\'s why astronomers have favorite constellations for each season!' }
    ]
  },
  {
    id: 'b3',
    title: 'Space Guide: Nebulas',
    author: 'Cosmic Classroom',
    ageRange: '7-13',
    description: 'Explore the most beautiful nebulas in the universe with stunning images and kid-friendly explanations.',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=400&fit=crop',
    tags: ['Nebulas', 'Beginner', 'Stars'],
    type: 'guide',
    fullContent: 'Nebulas are some of the most beautiful objects in the universe - giant clouds of gas and dust that glow with amazing colors. Some are stellar nurseries where new stars are born, while others are the remains of exploded stars.',
    chapters: [
      { title: 'What is a Nebula?', content: 'A nebula is a huge cloud of gas and dust in space. The word "nebula" comes from Latin meaning "cloud." Nebulas can be enormous - some are hundreds of light-years across! They glow because nearby stars make the gas light up, kind of like how a neon sign works.' },
      { title: 'Star Nurseries', content: 'Some nebulas are called "stellar nurseries" because new stars are being born inside them! Gravity pulls the gas and dust together, and when it gets dense and hot enough, a new star ignites. The Orion Nebula and Eagle Nebula are famous star nurseries.' },
      { title: 'The Pillars of Creation', content: 'The Eagle Nebula contains the famous "Pillars of Creation" - tall columns of gas and dust where stars are forming. These pillars are about 5 light-years tall! The Hubble Space Telescope took an iconic picture of them that\'s one of the most famous space images ever.' },
      { title: 'Planetary Nebulas', content: 'When a star like our Sun gets old, it puffs out its outer layers into space, creating a planetary nebula. Despite the name, they have nothing to do with planets! The Ring Nebula and Cat\'s Eye Nebula are beautiful examples of what our Sun will create someday.' },
      { title: 'Supernova Remnants', content: 'When a massive star explodes as a supernova, the debris spreads out into space, creating a special type of nebula. The Crab Nebula is a famous supernova remnant - Chinese astronomers saw the explosion in the year 1054!' },
      { title: 'Dark Nebulas', content: 'Not all nebulas glow - some are dark! Dark nebulas are so thick with dust that they block light from stars behind them. The Horsehead Nebula is shaped like a horse\'s head and appears as a dark silhouette against a glowing background.' }
    ]
  },
  {
    id: 'b4',
    title: 'Galaxy Explorer',
    author: 'Dr. Stuart Clark',
    ageRange: '10-14',
    description: 'Journey through different types of galaxies and learn what makes each one unique.',
    cover: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=300&h=400&fit=crop',
    tags: ['Galaxies', 'Advanced'],
    type: 'book',
    fullContent: 'Galaxies are massive collections of stars, gas, dust, and mysterious dark matter, all held together by gravity. Our Milky Way is just one of over 200 billion galaxies in the observable universe!',
    chapters: [
      { title: 'What is a Galaxy?', content: 'A galaxy is a huge collection of stars - from millions to trillions of them! Galaxies also contain gas, dust, and something mysterious called dark matter. Everything in a galaxy is held together by gravity. Our Sun is just one of about 200-400 billion stars in the Milky Way galaxy.' },
      { title: 'The Milky Way - Our Home', content: 'We live in a spiral galaxy called the Milky Way. It\'s shaped like a giant pinwheel with curving arms of stars. Our solar system is located in one of the spiral arms, about 26,000 light-years from the center. At the very center lurks a supermassive black hole!' },
      { title: 'Spiral Galaxies', content: 'Spiral galaxies are some of the most beautiful in the universe. They have a bright center (the bulge) and sweeping spiral arms filled with young, blue stars and glowing nebulas. The Whirlpool Galaxy and Andromeda Galaxy are famous spirals.' },
      { title: 'Elliptical Galaxies', content: 'Elliptical galaxies are shaped like eggs or footballs. They contain mostly old, red stars and don\'t have the dramatic spiral arms. The largest galaxies in the universe are giant ellipticals - some contain over 100 trillion stars!' },
      { title: 'Irregular Galaxies', content: 'Some galaxies don\'t fit neatly into categories - they\'re irregular! The Large and Small Magellanic Clouds are irregular galaxies that orbit our Milky Way. You can see them from the Southern Hemisphere as fuzzy patches in the night sky.' },
      { title: 'Galaxy Collisions', content: 'Galaxies can collide with each other! When they do, it takes hundreds of millions of years. Stars rarely hit each other (there\'s too much empty space between them), but the galaxies\' shapes get distorted. Our Milky Way will collide with Andromeda in about 4.5 billion years!' }
    ]
  },
  {
    id: 'b5',
    title: 'Black Holes for Beginners',
    author: 'Space Academy',
    ageRange: '9-13',
    description: 'Discover the mysteries of black holes in this easy-to-understand guide with cool illustrations.',
    cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=400&fit=crop',
    tags: ['Black Holes', 'Galaxies', 'Advanced'],
    type: 'guide',
    fullContent: 'Black holes are some of the most mysterious and fascinating objects in the universe. They\'re places where gravity is so strong that nothing - not even light - can escape!',
    chapters: [
      { title: 'What is a Black Hole?', content: 'A black hole is a region of space where gravity is incredibly strong - so strong that nothing can escape, not even light! That\'s why they\'re called "black" - they don\'t give off any light we can see. The boundary around a black hole is called the "event horizon."' },
      { title: 'How Black Holes Form', content: 'Most black holes form when massive stars die. When a star much bigger than our Sun runs out of fuel, it can collapse under its own gravity. The star\'s core gets crushed smaller and smaller until it becomes a point of infinite density called a singularity.' },
      { title: 'Supermassive Black Holes', content: 'At the center of most galaxies, including our Milky Way, lurk supermassive black holes. These monsters can be millions or billions of times the mass of our Sun! Scientists aren\'t sure exactly how they formed, but they play an important role in how galaxies grow and evolve.' },
      { title: 'What Happens Near a Black Hole?', content: 'Near a black hole, weird things happen! Time passes slower - if you watched a clock falling into a black hole, it would seem to slow down. Objects get stretched into long, thin shapes (scientists call this "spaghettification"). And light bends around black holes, distorting the view of stars behind them.' },
      { title: 'Can We See Black Holes?', content: 'We can\'t see black holes directly because they don\'t emit light. But we can see the effects they have on nearby matter! Gas falling into a black hole heats up and glows brightly. In 2019, scientists captured the first image of a black hole - a dark shadow surrounded by glowing gas.' },
      { title: 'Black Hole Myths', content: 'Don\'t worry - black holes aren\'t cosmic vacuum cleaners that will suck up the universe! They only affect things that get very close. If the Sun suddenly became a black hole (which it can\'t), Earth would keep orbiting normally - we\'d just be very cold and in the dark!' }
    ]
  },
  {
    id: 'b6',
    title: 'The Search for Other Worlds',
    author: 'NASA Kids',
    ageRange: '8-12',
    description: 'How scientists find planets around other stars and what we know about them so far.',
    cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop',
    tags: ['Exoplanets', 'Planets', 'Advanced'],
    type: 'guide',
    fullContent: 'Are we alone in the universe? Scientists are discovering planets around other stars - called exoplanets - at an amazing rate. Some of these distant worlds might even be similar to Earth!',
    chapters: [
      { title: 'What is an Exoplanet?', content: 'An exoplanet is a planet that orbits a star other than our Sun. For a long time, scientists wondered if other stars had planets like our Sun does. Now we know the answer is yes! We\'ve discovered over 5,000 exoplanets, and there are probably billions more in our galaxy alone.' },
      { title: 'How We Find Exoplanets', content: 'Exoplanets are very hard to see directly because they\'re so far away and don\'t produce their own light. Scientists use clever tricks to find them. The "transit method" detects the tiny dimming of a star when a planet crosses in front of it. The "wobble method" detects the slight tug a planet has on its star.' },
      { title: 'The Kepler Mission', content: 'NASA\'s Kepler space telescope was a champion exoplanet hunter. From 2009 to 2018, it discovered over 2,600 confirmed exoplanets! Kepler stared at one patch of sky, watching for the tiny dips in starlight caused by planets passing in front of their stars.' },
      { title: 'Strange New Worlds', content: 'Exoplanets come in all sorts of varieties! "Hot Jupiters" are giant planets that orbit extremely close to their stars. Some planets orbit two stars at once (like Tatooine in Star Wars!). There are even "rogue planets" that wander through space without any star at all.' },
      { title: 'The Habitable Zone', content: 'The "habitable zone" is the area around a star where temperatures might be just right for liquid water. Too close to the star, and water boils away. Too far, and it freezes solid. Planets in the habitable zone are sometimes called "Goldilocks planets" because they\'re not too hot, not too cold - just right!' },
      { title: 'Could There Be Life?', content: 'Scientists are especially interested in rocky planets in the habitable zone. The James Webb Space Telescope can study the atmospheres of exoplanets, looking for gases that might indicate life. Finding signs of life on another world would be one of the biggest discoveries in history!' }
    ]
  },
  {
    id: 'b7',
    title: 'Astronauts and Space Exploration',
    author: 'Mission Control',
    ageRange: '6-10',
    description: 'Learn about brave space explorers and the amazing journeys humans have made into space.',
    cover: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=300&h=400&fit=crop',
    tags: ['Space Exploration', 'Beginner'],
    type: 'book',
    fullContent: 'From the first person in space to astronauts living on the International Space Station, humans have been exploring space for over 60 years. Let\'s learn about these amazing adventurers!',
    chapters: [
      { title: 'The First Space Explorers', content: 'In 1961, Yuri Gagarin from Russia became the first human in space! His flight lasted only 108 minutes, but it changed history forever. Later that year, Alan Shepard became the first American in space. The Space Race between the USA and Soviet Union had begun!' },
      { title: 'Walking on the Moon', content: 'On July 20, 1969, Neil Armstrong became the first person to walk on the Moon. His famous words were "That\'s one small step for man, one giant leap for mankind." Twelve astronauts walked on the Moon between 1969 and 1972 during NASA\'s Apollo program.' },
      { title: 'Life on the Space Station', content: 'The International Space Station (ISS) is a home in space where astronauts live and work. It orbits Earth about 16 times every day! Astronauts from many countries work together, doing science experiments and learning how to live in space for long periods.' },
      { title: 'Becoming an Astronaut', content: 'Do you dream of being an astronaut? You\'ll need to study hard - especially math, science, and engineering. Astronauts must be healthy and fit, and they train for years before going to space. They practice spacewalks underwater and learn to fly special jets!' },
      { title: 'The Future of Space Exploration', content: 'Exciting missions are planned for the future! NASA\'s Artemis program will send astronauts back to the Moon, including the first woman and first person of color to walk on the lunar surface. And one day, humans will travel to Mars!' }
    ]
  },
  {
    id: 'b8',
    title: 'Comets, Asteroids, and Meteors',
    author: 'Dr. Asteroid Hunter',
    ageRange: '8-12',
    description: 'Explore the small but mighty objects that zoom through our solar system!',
    cover: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=300&h=400&fit=crop',
    tags: ['Solar System', 'Asteroids', 'Advanced'],
    type: 'guide',
    fullContent: 'Not everything in our solar system is a planet or moon! Comets, asteroids, and meteors are smaller objects that have fascinating stories to tell about the history of our cosmic neighborhood.',
    chapters: [
      { title: 'Asteroids - Space Rocks', content: 'Asteroids are rocky leftovers from when our solar system formed 4.6 billion years ago. Most orbit the Sun in the asteroid belt between Mars and Jupiter. They range from tiny pebbles to dwarf planets like Ceres. Some asteroids come close to Earth, and scientists track them carefully!' },
      { title: 'Comets - Cosmic Snowballs', content: 'Comets are like dirty snowballs made of ice, rock, and dust. They come from the outer solar system. When a comet gets close to the Sun, the ice turns to gas and creates a beautiful glowing tail that always points away from the Sun. Famous comets include Halley\'s Comet, which visits every 76 years!' },
      { title: 'Meteors - Shooting Stars', content: 'When bits of space rock enter Earth\'s atmosphere, they burn up and create streaks of light called meteors or "shooting stars." They\'re not really stars at all! If a rock survives and lands on Earth, it\'s called a meteorite. Scientists study meteorites to learn about the early solar system.' },
      { title: 'Meteor Showers', content: 'Several times a year, Earth passes through trails of debris left by comets. This creates meteor showers where you might see dozens of shooting stars in an hour! The Perseids in August and Geminids in December are two of the best meteor showers to watch.' },
      { title: 'Protecting Earth', content: 'Could an asteroid hit Earth? It\'s happened before! Scientists believe an asteroid impact killed the dinosaurs 66 million years ago. Today, NASA and other agencies track potentially hazardous asteroids. The DART mission even tested whether we could deflect an asteroid by crashing a spacecraft into it!' }
    ]
  }
];