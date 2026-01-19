export interface Book {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  description: string;
  cover: string;
  tags: string[];
  type: 'book' | 'guide' | 'audiobook';
  fullContent: string;
  chapters: { title: string; content: string }[];
  narrator?: string;
  duration?: string;
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
  },
  {
    id: 'b9',
    title: 'The Wonders of Jupiter',
    author: 'Dr. Space Giant',
    ageRange: '7-11',
    description: 'Explore the king of planets with its amazing moons, storms, and mysteries!',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=300&h=400&fit=crop',
    tags: ['Planets', 'Jupiter', 'Moons', 'Beginner'],
    type: 'book',
    fullContent: 'Jupiter is the biggest planet in our solar system - so big that all the other planets could fit inside it! Let\'s explore this giant world and its amazing family of moons.',
    chapters: [
      { title: 'The King of Planets', content: 'Jupiter is more than 11 times wider than Earth and has a mass greater than all other planets combined! It\'s made mostly of hydrogen and helium gas, with no solid surface to stand on. If you tried to land on Jupiter, you\'d just sink deeper and deeper into its thick atmosphere.' },
      { title: 'The Great Red Spot', content: 'Jupiter\'s most famous feature is the Great Red Spot - a massive storm bigger than Earth that has been raging for at least 400 years! The spot is actually shrinking slowly, but it\'s still the biggest storm in the solar system. Winds inside can reach over 400 miles per hour!' },
      { title: 'Jupiter\'s Galilean Moons', content: 'In 1610, Galileo discovered four large moons orbiting Jupiter: Io, Europa, Ganymede, and Callisto. Ganymede is the largest moon in the solar system - even bigger than Mercury! Europa might have an ocean under its icy surface that could contain life.' },
      { title: 'Io - The Volcanic Moon', content: 'Io is the most volcanically active world in the solar system! It has hundreds of volcanoes that shoot lava and sulfur hundreds of miles into space. Jupiter\'s strong gravity constantly squeezes Io, heating its interior and creating all this volcanic activity.' },
      { title: 'Jupiter\'s Rings', content: 'Did you know Jupiter has rings? They\'re very faint and made of dust, unlike Saturn\'s bright icy rings. Jupiter\'s rings were discovered in 1979 by the Voyager 1 spacecraft. They\'re so thin that you can\'t see them from Earth with regular telescopes.' },
      { title: 'Exploring Jupiter', content: 'NASA\'s Juno spacecraft has been orbiting Jupiter since 2016, sending back amazing pictures and data. Juno has discovered that Jupiter\'s colorful bands and storms go deep into the planet. Future missions might explore the icy moons to search for signs of life!' }
    ]
  },
  {
    id: 'b10',
    title: 'Star Types Explained',
    author: 'Professor Stellar',
    ageRange: '9-13',
    description: 'Learn about the different types of stars in the universe, from red dwarfs to supergiants!',
    cover: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop',
    tags: ['Stars', 'Advanced'],
    type: 'guide',
    fullContent: 'Not all stars are the same! They come in many different colors, sizes, and temperatures. Let\'s explore the amazing variety of stars in our universe.',
    chapters: [
      { title: 'Star Colors and Temperature', content: 'Stars come in different colors based on their temperature. Blue and white stars are the hottest, yellow stars like our Sun are medium temperature, and red stars are the coolest. You can see this yourself - look at the sky and compare the colors of different stars!' },
      { title: 'Red Dwarf Stars', content: 'Red dwarfs are the smallest and coolest type of normal star. They\'re also the most common - about 70% of all stars are red dwarfs! They burn their fuel so slowly that they can live for trillions of years. Proxima Centauri, the closest star to our Sun, is a red dwarf.' },
      { title: 'Yellow Dwarf Stars', content: 'Our Sun is a yellow dwarf star (also called a G-type star). These medium-sized stars are perfect for life - not too hot, not too cold, and stable for billions of years. Yellow dwarfs eventually become red giants before ending their lives as white dwarfs.' },
      { title: 'Giant Stars', content: 'Giant stars are what medium-sized stars become when they start running out of hydrogen fuel. They swell up to many times their original size and become cooler and redder. Aldebaran, the "eye" of Taurus the Bull, is a red giant about 44 times wider than our Sun!' },
      { title: 'Supergiant Stars', content: 'The biggest stars of all are supergiants! Betelgeuse in Orion is a red supergiant about 700 times wider than our Sun. If Betelgeuse were in the center of our solar system, it would extend past the orbit of Mars! Supergiants live fast and die young in spectacular supernova explosions.' },
      { title: 'Weird Stars', content: 'Some stars are really strange! Neutron stars are incredibly dense collapsed stars - a teaspoon would weigh billions of tons. Pulsars are spinning neutron stars that beam radiation like cosmic lighthouses. White dwarfs are the dense cores left behind when stars like our Sun die.' }
    ]
  },
  {
    id: 'b11',
    title: 'The Big Bang and Beyond',
    author: 'Cosmic Origins Team',
    ageRange: '10-14',
    description: 'Journey back to the beginning of the universe and learn how everything began!',
    cover: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=400&fit=crop',
    tags: ['Cosmology', 'Advanced', 'Galaxies'],
    type: 'book',
    fullContent: 'How did the universe begin? Where did all the stars and galaxies come from? Scientists have discovered amazing answers to these big questions!',
    chapters: [
      { title: 'The Beginning of Everything', content: 'About 13.8 billion years ago, the universe began with the Big Bang! It wasn\'t an explosion in space - it was the beginning of space itself. Everything was incredibly hot and dense, then it started expanding and cooling. The expansion continues today!' },
      { title: 'The First Light', content: 'For the first 380,000 years, the universe was so hot that light couldn\'t travel freely - everything was a glowing fog. When it finally cooled enough, light was released in a cosmic flash. We can still see this "afterglow" today as the Cosmic Microwave Background!' },
      { title: 'The First Stars', content: 'The first stars formed about 100-200 million years after the Big Bang. They were giants - some were hundreds of times more massive than our Sun! These early stars created the first heavy elements and exploded as supernovas, spreading those elements through space.' },
      { title: 'Galaxy Formation', content: 'Gravity pulled matter together into the first galaxies about 1 billion years after the Big Bang. These early galaxies were smaller and more chaotic than modern ones. Over billions of years, they merged and grew into the beautiful spirals and ellipticals we see today.' },
      { title: 'The Expanding Universe', content: 'The universe has been expanding since the Big Bang, and it\'s still expanding today! In 1998, scientists discovered something shocking - the expansion is speeding up! A mysterious force called "dark energy" is pushing galaxies apart faster and faster.' },
      { title: 'The Future of the Universe', content: 'What will happen to the universe in the far future? If dark energy keeps pushing, galaxies will eventually move so far apart that we won\'t be able to see any others. Stars will burn out, and the universe will become cold and dark. But don\'t worry - this is trillions of years away!' }
    ]
  },
  {
    id: 'b12',
    title: 'Rocket Science for Kids',
    author: 'Launch Pad Academy',
    ageRange: '7-12',
    description: 'Discover how rockets work and the amazing vehicles that take us to space!',
    cover: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=300&h=400&fit=crop',
    tags: ['Space Exploration', 'Rockets', 'Beginner'],
    type: 'guide',
    fullContent: 'Rockets are incredible machines that let us escape Earth\'s gravity and explore space! From tiny model rockets to massive launch vehicles, let\'s learn how they work.',
    chapters: [
      { title: 'How Rockets Work', content: 'Rockets work using Newton\'s Third Law - for every action, there\'s an equal and opposite reaction. When hot gases shoot out the bottom of a rocket, the rocket is pushed upward! Unlike airplanes, rockets carry their own oxygen, so they can work in the vacuum of space.' },
      { title: 'Rocket Fuel', content: 'Rockets need special fuels to produce enough thrust to reach space. Some use liquid fuels like hydrogen and oxygen, stored in giant tanks. Others use solid fuel that burns like a powerful firework. SpaceX\'s rockets use kerosene and liquid oxygen!' },
      { title: 'Escaping Earth', content: 'To leave Earth, a rocket must reach "escape velocity" - about 25,000 miles per hour! That\'s fast enough to overcome Earth\'s gravity. Getting to orbit is a bit easier - you need to go about 17,500 mph sideways to continuously "fall around" Earth.' },
      { title: 'Famous Rockets', content: 'The Saturn V rocket that took astronauts to the Moon was 363 feet tall - taller than the Statue of Liberty! Today\'s rockets include SpaceX\'s Falcon 9 and Falcon Heavy, NASA\'s SLS, and Blue Origin\'s New Glenn. Each is designed for different missions.' },
      { title: 'Reusable Rockets', content: 'SpaceX made history by landing rocket boosters back on Earth so they can be used again! This makes space travel much cheaper. Watching a booster land on its legs after launching a spacecraft is like seeing science fiction become real!' },
      { title: 'The Future of Rockets', content: 'Engineers are developing new rocket technologies. SpaceX\'s Starship is designed to carry 100 people to Mars! NASA is working on nuclear rockets that could reach Mars faster. One day, rockets might be as common as airplanes!' }
    ]
  },
  {
    id: 'b13',
    title: 'Moons of the Solar System',
    author: 'Luna Explorers',
    ageRange: '8-12',
    description: 'Meet the fascinating moons orbiting the planets of our solar system!',
    cover: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=300&h=400&fit=crop',
    tags: ['Moons', 'Solar System', 'Beginner'],
    type: 'book',
    fullContent: 'Our solar system has over 200 known moons! Some are tiny rocks, while others are larger than planets. Let\'s explore these amazing worlds.',
    chapters: [
      { title: 'What is a Moon?', content: 'A moon is a natural satellite that orbits a planet. Earth has one Moon, but Jupiter and Saturn have over 80 each! Moons come in all shapes and sizes. Some are round like mini-planets, while others are lumpy like potatoes.' },
      { title: 'Our Moon', content: 'Earth\'s Moon is the fifth largest in the solar system. It controls our ocean tides and stabilizes Earth\'s tilt. The Moon is the only place beyond Earth where humans have walked. Its craters and "seas" (actually ancient lava plains) are visible even without a telescope!' },
      { title: 'Europa - Ocean Moon', content: 'Jupiter\'s moon Europa is covered in a shell of ice. But underneath that ice is probably a vast ocean of liquid water - more water than all of Earth\'s oceans combined! Scientists think Europa could be one of the best places to look for alien life.' },
      { title: 'Titan - Moon with Weather', content: 'Saturn\'s largest moon, Titan, has a thick atmosphere and liquid lakes - but they\'re not water! Titan\'s lakes are made of liquid methane and ethane. It\'s the only moon with a substantial atmosphere and the only place besides Earth with surface liquids.' },
      { title: 'Enceladus - Ice Geysers', content: 'Enceladus is a small icy moon of Saturn that shoots giant geysers of water vapor into space! These plumes come from a subsurface ocean heated by Saturn\'s gravity. Spacecraft have even flown through the plumes to sample what\'s inside!' },
      { title: 'Strange Moons', content: 'Some moons are really weird! Io has hundreds of active volcanoes. Miranda has cliffs 12 miles high. Triton orbits Neptune backwards and was probably captured from the Kuiper Belt. Phobos and Deimos, Mars\'s moons, might be captured asteroids!' }
    ]
  },
  {
    id: 'b14',
    title: 'Stargazing for Beginners',
    author: 'Night Sky Academy',
    ageRange: '6-10',
    description: 'Your guide to exploring the night sky with just your eyes!',
    cover: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=300&h=400&fit=crop',
    tags: ['Stargazing', 'Constellations', 'Beginner'],
    type: 'guide',
    fullContent: 'You don\'t need a telescope to explore the night sky! With just your eyes, you can see amazing things. Let\'s learn how to become a stargazer!',
    chapters: [
      { title: 'Getting Started', content: 'The best stargazing happens away from city lights on clear, moonless nights. Give your eyes 20-30 minutes to adjust to the dark - you\'ll be amazed how many more stars appear! Dress warmly and bring a blanket to lie on.' },
      { title: 'Finding Your Way', content: 'Learn to find the North Star (Polaris) using the Big Dipper. The two stars at the end of the Dipper\'s cup point right to it! Once you know where north is, you can find other constellations. Star maps and phone apps can help guide you.' },
      { title: 'Easy Constellations', content: 'Start with easy-to-find patterns. Orion\'s three belt stars are unmistakable in winter. The Big Dipper is visible year-round in the northern hemisphere. Cassiopeia looks like a big "W" in the sky. Once you learn these, finding others becomes easier!' },
      { title: 'Planets vs Stars', content: 'How can you tell a planet from a star? Planets don\'t twinkle like stars do! They also wander among the constellations over weeks and months. Venus, Mars, Jupiter, and Saturn are all bright enough to see easily with your eyes.' },
      { title: 'Meteor Showers', content: 'Several times a year, Earth passes through streams of comet dust, creating meteor showers! The Perseids in August and Geminids in December are especially good. Find a dark spot, lie back, and watch for "shooting stars" streaking across the sky.' },
      { title: 'The Milky Way', content: 'From a truly dark location, you can see the Milky Way - a glowing band of light arching across the sky. You\'re looking into the disk of our galaxy, seeing the combined light of billions of distant stars. It\'s one of the most beautiful sights in nature!' }
    ]
  },
  // NEW BOOKS - Rockets, Astronauts, Space Missions
  {
    id: 'b15',
    title: 'Heroes of Space: Famous Astronauts',
    author: 'Mission Control Academy',
    ageRange: '7-12',
    description: 'Meet the brave men and women who ventured into the unknown and made history!',
    cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop',
    tags: ['Astronauts', 'Space Exploration', 'History', 'Beginner'],
    type: 'book',
    fullContent: 'Space exploration wouldn\'t be possible without the brave astronauts who risked their lives to explore the unknown. Let\'s meet some of the most famous space heroes!',
    chapters: [
      { title: 'Yuri Gagarin - First Human in Space', content: 'On April 12, 1961, Yuri Gagarin became the first human ever to travel to space! The Soviet cosmonaut orbited Earth once in his Vostok 1 spacecraft, a journey of 108 minutes that changed history forever. Gagarin became an instant hero and proved that humans could survive in space. His famous words were "Poyekhali!" meaning "Let\'s go!"' },
      { title: 'Neil Armstrong - First on the Moon', content: 'Neil Armstrong made history on July 20, 1969, when he became the first human to walk on the Moon. As commander of Apollo 11, he spoke the famous words: "That\'s one small step for man, one giant leap for mankind." Armstrong was a test pilot before becoming an astronaut and later became a professor after retiring from NASA.' },
      { title: 'Valentina Tereshkova - First Woman in Space', content: 'Valentina Tereshkova became the first woman in space on June 16, 1963, aboard Vostok 6. She orbited Earth 48 times over nearly three days! Tereshkova was a textile factory worker and amateur parachutist before being selected for the cosmonaut program. She remains an inspiration to women in science worldwide.' },
      { title: 'Mae Jemison - Breaking Barriers', content: 'Dr. Mae Jemison became the first African American woman in space in 1992 aboard Space Shuttle Endeavour. She was a doctor before becoming an astronaut and conducted experiments on weightlessness and motion sickness in space. Jemison said she was inspired by Lt. Uhura from Star Trek!' },
      { title: 'Chris Hadfield - The Singing Astronaut', content: 'Canadian astronaut Chris Hadfield became famous for sharing the wonders of space with millions through social media. He recorded a cover of David Bowie\'s "Space Oddity" aboard the ISS that went viral! Hadfield served as commander of the International Space Station and helped inspire a new generation of space explorers.' },
      { title: 'Modern Space Heroes', content: 'Today\'s astronauts continue to inspire us! Peggy Whitson holds the record for most time in space by an American. Christina Koch and Jessica Meir performed the first all-female spacewalk. Scott Kelly spent a year in space while his twin brother stayed on Earth to help scientists study the effects of long-term space travel!' }
    ]
  },
  {
    id: 'b16',
    title: 'The History of Rockets',
    author: 'Rocket Science Academy',
    ageRange: '8-13',
    description: 'From ancient fireworks to SpaceX - discover the amazing evolution of rockets!',
    cover: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=300&h=400&fit=crop',
    tags: ['Rockets', 'History', 'Space Exploration', 'Intermediate'],
    type: 'book',
    fullContent: 'Rockets have taken us from simple fireworks to landing humans on the Moon and beyond. Let\'s explore their incredible journey through history!',
    chapters: [
      { title: 'Ancient Rockets', content: 'The first rockets were invented in China over 1,000 years ago! They were powered by gunpowder and used for fireworks and weapons. These early rockets were simple tubes filled with explosive powder. Legend says the Chinese inventor Wan Hu tried to fly to the Moon using rockets attached to a chair - though this probably didn\'t end well!' },
      { title: 'Robert Goddard - Father of Rocketry', content: 'American scientist Robert Goddard launched the first liquid-fueled rocket on March 16, 1926. It flew for just 2.5 seconds and reached 41 feet high - but it proved rockets could work! Many laughed at Goddard\'s ideas, but he was right. Today he\'s called the "Father of Modern Rocketry."' },
      { title: 'The V-2 and Space Race', content: 'Germany\'s V-2 rocket, designed by Wernher von Braun, was the first to reach space in 1944. After World War II, both the US and Soviet Union recruited German rocket scientists. This led to the Space Race - a competition to be first in space. The Soviets won by launching Sputnik in 1957 and putting Yuri Gagarin in orbit in 1961.' },
      { title: 'Saturn V - The Moon Rocket', content: 'The Saturn V remains the most powerful rocket ever successfully flown! Standing 363 feet tall (taller than the Statue of Liberty), it could lift 130 tons to orbit. The Saturn V launched all the Apollo Moon missions. The sound of its five F-1 engines was so loud it could be heard 100 miles away!' },
      { title: 'Space Shuttle Era', content: 'The Space Shuttle (1981-2011) was the first reusable spacecraft. It launched like a rocket, orbited like a spacecraft, and landed like a glider. Five shuttles flew 135 missions, building the ISS and launching the Hubble telescope. Sadly, we lost Challenger in 1986 and Columbia in 2003, reminding us how dangerous space travel can be.' },
      { title: 'SpaceX and the Future', content: 'SpaceX, founded by Elon Musk, revolutionized rockets by making them reusable! Watching a Falcon 9 booster land on a drone ship is like seeing science fiction become real. SpaceX\'s Starship is designed to carry 100 people to Mars! Other companies like Blue Origin and Rocket Lab are also innovating, making space more accessible than ever.' }
    ]
  },
  {
    id: 'b17',
    title: 'Famous Space Missions',
    author: 'Space History Team',
    ageRange: '9-14',
    description: 'Relive the most incredible missions that pushed the boundaries of human exploration!',
    cover: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=300&h=400&fit=crop',
    tags: ['Space Missions', 'History', 'Advanced'],
    type: 'guide',
    fullContent: 'From the first satellites to rovers on Mars, space missions have revealed the wonders of our universe. Let\'s explore the missions that changed everything!',
    chapters: [
      { title: 'Sputnik - The Space Age Begins', content: 'On October 4, 1957, the Soviet Union launched Sputnik 1 - the first artificial satellite! This beach ball-sized spacecraft orbited Earth every 96 minutes, beeping a radio signal that could be heard worldwide. Sputnik shocked the world and started the Space Age. The US responded by creating NASA and launching Explorer 1 in 1958.' },
      { title: 'Apollo 11 - Moon Landing', content: 'Apollo 11 achieved President Kennedy\'s goal of landing humans on the Moon before 1970. On July 20, 1969, Neil Armstrong and Buzz Aldrin landed the lunar module Eagle while Michael Collins orbited above. They spent 2.5 hours walking on the Moon, collecting samples and planting the American flag. Over 600 million people watched on TV!' },
      { title: 'Apollo 13 - Successful Failure', content: 'Apollo 13 is called a "successful failure." An oxygen tank exploded on the way to the Moon, and the crew had to use the lunar module as a lifeboat. With limited power, water, and oxygen, Mission Control worked with the astronauts to solve problems and get them home safely. It was an incredible story of teamwork and ingenuity!' },
      { title: 'Voyager - The Grand Tour', content: 'Launched in 1977, Voyagers 1 and 2 explored Jupiter, Saturn, Uranus, and Neptune. They sent back stunning images and discoveries - active volcanoes on Io, geysers on Triton, rings around Jupiter! Both Voyagers are still operating, now in interstellar space. They carry Golden Records with sounds and images from Earth, just in case aliens find them!' },
      { title: 'Hubble Space Telescope', content: 'Launched in 1990, the Hubble Space Telescope has transformed our understanding of the universe. From its orbit above Earth\'s atmosphere, Hubble has captured breathtaking images of nebulas, galaxies, and distant stars. It discovered that the universe\'s expansion is accelerating and helped determine the age of the universe!' },
      { title: 'Mars Rovers', content: 'NASA has sent several rovers to explore Mars! Spirit and Opportunity (2004) found evidence of ancient water. Curiosity (2012) discovered Mars once had conditions suitable for life. Perseverance (2021) is collecting samples to eventually return to Earth and looking for signs of ancient life. Its helicopter, Ingenuity, made the first powered flight on another planet!' }
    ]
  },
  {
    id: 'b18',
    title: 'Life on the Space Station',
    author: 'ISS Crew',
    ageRange: '6-11',
    description: 'Discover what daily life is like for astronauts living and working in space!',
    cover: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=300&h=400&fit=crop',
    tags: ['ISS', 'Astronauts', 'Daily Life', 'Beginner'],
    type: 'book',
    fullContent: 'The International Space Station is a home in space where astronauts live for months at a time. Let\'s see what a day in space is really like!',
    chapters: [
      { title: 'Waking Up in Space', content: 'Astronauts sleep in small cabins, zipped into sleeping bags attached to the wall so they don\'t float away! They wake up at 6 AM to an alarm. There\'s no shower - astronauts use wet wipes and rinse-free shampoo. Brushing teeth is tricky too - you can\'t spit, so you swallow the toothpaste!' },
      { title: 'Space Food', content: 'Space food comes in special packages that won\'t crumble or spill. Astronauts add water to rehydrate freeze-dried meals and use tortillas instead of bread (no crumbs floating around!). Hot sauce is popular because taste is dulled in microgravity. Astronauts get treats like cookies and space coffee, and occasionally fresh fruit from supply ships!' },
      { title: 'Working in Space', content: 'Astronauts work about 10 hours a day doing science experiments, maintaining the station, and communicating with Earth. They might study how plants grow in microgravity, test new medicines, or observe Earth and space. Sometimes they go on spacewalks to make repairs - floating outside with Earth below is an incredible experience!' },
      { title: 'Exercising Every Day', content: 'In zero gravity, muscles and bones get weaker, so astronauts MUST exercise 2 hours every day! They use special equipment: a treadmill with bungee cords to hold them down, a bike with no seat (you don\'t need one when floating!), and a resistance machine for strength training. Exercise is crucial for staying healthy in space.' },
      { title: 'Having Fun in Space', content: 'Astronauts have free time too! They love looking out the Cupola window at Earth - watching storms, city lights at night, and auroras. They play music, watch movies, read books, and call their families. Some astronauts have played soccer with floating objects and even made zero-G somersaults! They also share photos and videos on social media.' },
      { title: 'Coming Home', content: 'After months in space, astronauts return to Earth in a Soyuz or Crew Dragon capsule. Reentry is intense - they experience 4-5 times normal gravity after months of weightlessness! Once back on Earth, it takes time to readjust. Walking feels strange, and they might drop things expecting them to float. But they bring back amazing science and unforgettable memories!' }
    ]
  },
  {
    id: 'b19',
    title: 'Building Rockets: An Engineer\'s Guide',
    author: 'Junior Aerospace Team',
    ageRange: '10-14',
    description: 'Learn how engineers design and build the incredible machines that take us to space!',
    cover: 'https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=300&h=400&fit=crop',
    tags: ['Rockets', 'Engineering', 'Advanced'],
    type: 'guide',
    fullContent: 'Ever wondered how rockets are actually built? Engineers use incredible science and technology to create these amazing machines!',
    chapters: [
      { title: 'Rocket Parts', content: 'A rocket has several main parts: the payload (what it\'s carrying - a satellite, spacecraft, or cargo), the guidance system (the rocket\'s "brain"), fuel tanks (huge containers for propellant), engines (where the magic happens!), and sometimes boosters for extra power. Each part must work perfectly or the mission fails!' },
      { title: 'Rocket Engines', content: 'Rocket engines are marvels of engineering! Liquid engines mix fuel (like kerosene or hydrogen) with an oxidizer (liquid oxygen) and ignite them. The Raptor engine on SpaceX\'s Starship uses methane and oxygen. Solid rocket boosters use a pre-mixed solid fuel. Both create thrust by shooting hot gases out at incredible speeds!' },
      { title: 'Materials Science', content: 'Rockets must be light but incredibly strong. Engineers use aluminum alloys, titanium, and carbon fiber composites. The engine bells must withstand 3,500°C while the fuel tanks store liquids at -253°C (colder than Neptune!). Special heat shields protect spacecraft during reentry when temperatures can exceed 1,650°C!' },
      { title: 'Testing, Testing, Testing', content: 'Engineers test everything multiple times! Engines are fired on test stands. Fuel tanks are pressurized until they burst (on purpose!) to find their limits. Computers run millions of simulations. Every bolt and wire is inspected. When you\'re sending astronauts to space, failure is not an option!' },
      { title: 'Launch Day', content: 'Launching a rocket is an incredibly complex operation! Days before launch, teams check weather, load fuel, and run final tests. On launch day, hundreds of engineers monitor thousands of systems. The countdown includes multiple "holds" - checkpoints where they verify everything is perfect. When the countdown reaches zero... LIFTOFF!' },
      { title: 'Reusability Revolution', content: 'The biggest innovation in rocket engineering is reusability! SpaceX lands their boosters on drone ships and launches them again, reducing costs by millions. Engineers had to solve huge challenges: precisely controlling descent, surviving the heat of reentry, and landing with pinpoint accuracy. This technology is making space more accessible!' }
    ]
  },
  {
    id: 'b20',
    title: 'Women in Space',
    author: 'Space Pioneers Foundation',
    ageRange: '8-12',
    description: 'Celebrate the incredible women who broke barriers and reached for the stars!',
    cover: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=400&fit=crop',
    tags: ['Astronauts', 'Women', 'History', 'Beginner'],
    type: 'book',
    fullContent: 'Women have been making history in space since the very beginning of the Space Age. Let\'s celebrate these amazing pioneers!',
    chapters: [
      { title: 'The Mercury 13', content: 'In 1960, 13 American women passed the same tests as the Mercury astronauts - some scoring even better! Called the "Mercury 13," they proved women could handle spaceflight. Sadly, NASA didn\'t accept women then. These pioneers, including Jerrie Cobb and Wally Funk, kept advocating for women in space. Wally Funk finally flew to space in 2021 at age 82 with Blue Origin!' },
      { title: 'Valentina Tereshkova', content: 'Soviet cosmonaut Valentina Tereshkova became the first woman in space on June 16, 1963, beating American women by 20 years! She orbited Earth 48 times aboard Vostok 6. Tereshkova was a textile worker and parachutist before becoming a cosmonaut. She proved women could handle the rigors of spaceflight.' },
      { title: 'Sally Ride - America\'s First', content: 'On June 18, 1983, Sally Ride became the first American woman in space. She was a physicist who joined NASA in 1978. Ride flew on the Space Shuttle twice and later dedicated her life to encouraging kids, especially girls, to study science. The Sally Ride Science program continues her legacy today!' },
      { title: 'Pioneering Missions', content: 'Women have achieved many space firsts! Kathryn Sullivan became the first American woman to spacewalk (1984). Eileen Collins was the first female shuttle pilot (1995) and commander (1999). Peggy Whitson commanded the ISS twice and holds the record for most spacewalks by a woman. In 2019, Christina Koch and Jessica Meir performed the first all-female spacewalk!' },
      { title: 'International Space Women', content: 'Women from around the world have explored space! Svetlana Savitskaya (USSR) was the first woman to spacewalk. Chiaki Mukai (Japan), Roberta Bondar (Canada), and Samantha Cristoforetti (Italy) made their nations proud. Yi So-yeon became South Korea\'s first astronaut. These women prove space exploration is for everyone!' },
      { title: 'The Future is Female', content: 'NASA\'s Artemis program will land the first woman on the Moon! The astronaut corps is more diverse than ever. Companies like SpaceX are training more female astronauts. Young women today can dream of commanding missions to Mars! The barriers are breaking down, and the sky is no longer the limit.' }
    ]
  },
  // AUDIOBOOKS - Space Theories
  {
    id: 'ab1',
    title: 'The Big Bang: How Everything Began',
    author: 'Dr. Cosmos Academy',
    narrator: 'Professor Stellar',
    duration: '25 min',
    ageRange: '8-13',
    description: 'Listen to the incredible story of how the entire universe started from a single tiny point 13.8 billion years ago!',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=400&fit=crop',
    tags: ['Big Bang', 'Cosmology', 'Theory'],
    type: 'audiobook',
    fullContent: 'Close your eyes and imagine... nothing. No stars, no planets, no space, no time. Then suddenly - BOOM! The Big Bang happened, and everything began!',
    chapters: [
      { title: 'Chapter 1: Before the Beginning', content: 'Imagine a time before time itself existed. There was no space, no matter, no energy - nothing at all. Then, about 13.8 billion years ago, something incredible happened. A point smaller than an atom, containing everything that would become our universe, suddenly began to expand. This wasn\'t an explosion in space - it was the beginning of space itself!' },
      { title: 'Chapter 2: The First Second', content: 'In just the first second after the Big Bang, the universe changed more than it would in the next billion years! It went from smaller than an atom to bigger than a galaxy. It was unimaginably hot - trillions of degrees! During this time, the basic building blocks of matter formed: quarks combined to make protons and neutrons.' },
      { title: 'Chapter 3: Let There Be Light', content: 'For 380,000 years after the Big Bang, the universe was so hot that light couldn\'t travel freely. Everything was a glowing fog of particles. Then, as the universe cooled, atoms formed and light was released in a cosmic flash! We can still see this ancient light today - scientists call it the Cosmic Microwave Background.' },
      { title: 'Chapter 4: The First Stars', content: 'After millions of years of darkness, gravity pulled clouds of hydrogen gas together. These clouds got denser and hotter until - whoosh! - the first stars ignited! These early stars were giants, hundreds of times more massive than our Sun. When they exploded, they created heavier elements like carbon, oxygen, and iron.' },
      { title: 'Chapter 5: Evidence for the Big Bang', content: 'How do we know the Big Bang really happened? Scientists have found three main pieces of evidence: the universe is still expanding (galaxies are moving apart), we can detect the cosmic microwave background radiation, and we can see the right amounts of hydrogen and helium in space. It\'s like a cosmic detective story!' }
    ]
  },
  {
    id: 'ab2',
    title: 'Einstein\'s Theory of Relativity for Kids',
    author: 'Professor Brainy',
    narrator: 'Dr. Time Warp',
    duration: '30 min',
    ageRange: '9-14',
    description: 'Discover how Albert Einstein changed our understanding of space, time, and gravity forever!',
    cover: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=300&h=400&fit=crop',
    tags: ['Relativity', 'Einstein', 'Theory', 'Physics'],
    type: 'audiobook',
    fullContent: 'Albert Einstein was one of the greatest scientists ever! His ideas about space and time seem like magic, but they\'re real science that scientists use every day.',
    chapters: [
      { title: 'Chapter 1: Who Was Einstein?', content: 'Albert Einstein was born in Germany in 1879. As a child, he was curious about everything! He wondered what it would be like to ride on a beam of light. This simple question led him to discoveries that changed the world. Einstein showed us that space and time are connected, and that nothing can travel faster than light.' },
      { title: 'Chapter 2: Special Relativity', content: 'Imagine you\'re on a super-fast spaceship traveling near the speed of light. Something strange happens - time slows down for you! A year on your ship might be ten years on Earth. This is called time dilation, and it\'s real! Einstein proved that the faster you move, the slower time passes for you.' },
      { title: 'Chapter 3: E = mc²', content: 'Einstein\'s most famous equation says that energy (E) equals mass (m) times the speed of light (c) squared. What does this mean? A tiny bit of matter contains an enormous amount of energy! This is how the Sun produces energy and why nuclear power works. The "c squared" part makes the number huge!' },
      { title: 'Chapter 4: General Relativity', content: 'Einstein had an even bigger idea: gravity isn\'t really a force - it\'s the bending of space itself! Imagine putting a bowling ball on a trampoline. It creates a dip, and smaller balls roll toward it. Massive objects like the Sun bend space around them, and that\'s why planets orbit!' },
      { title: 'Chapter 5: Proving Einstein Right', content: 'Scientists have tested Einstein\'s theories many times. GPS satellites have to account for time dilation or they\'d be wrong by kilometers! We\'ve seen light bend around the Sun during eclipses. In 2015, we detected gravitational waves - ripples in space itself - just as Einstein predicted 100 years earlier!' }
    ]
  },
  {
    id: 'ab3',
    title: 'Black Holes: Cosmic Monsters',
    author: 'Space Mysteries Team',
    narrator: 'Captain Void',
    duration: '22 min',
    ageRange: '8-13',
    description: 'Journey into the strangest objects in the universe - places where even light cannot escape!',
    cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=400&fit=crop',
    tags: ['Black Holes', 'Theory', 'Gravity'],
    type: 'audiobook',
    fullContent: 'Black holes are the universe\'s ultimate mystery! They\'re places where gravity is so incredibly strong that nothing - not even light - can escape. Let\'s explore these cosmic monsters!',
    chapters: [
      { title: 'Chapter 1: What Makes a Black Hole?', content: 'A black hole forms when a massive star - at least 20 times heavier than our Sun - runs out of fuel and collapses. All that mass gets squished into an incredibly tiny space. The gravity becomes so strong that not even light can escape! The boundary around a black hole is called the event horizon - cross it, and there\'s no coming back.' },
      { title: 'Chapter 2: The Singularity', content: 'At the very center of a black hole is something called a singularity - a point where all the mass is concentrated. Here, the laws of physics as we know them break down! Space and time get so warped that scientists aren\'t sure what really happens. It\'s one of the biggest mysteries in the universe.' },
      { title: 'Chapter 3: Spaghettification', content: 'If you fell into a black hole, something really weird would happen. The gravity pulling on your feet would be much stronger than the gravity on your head, stretching you like spaghetti! Scientists actually call this "spaghettification." Don\'t worry - you\'d never want to test this in real life!' },
      { title: 'Chapter 4: Supermassive Black Holes', content: 'At the center of most galaxies, including our Milky Way, lurk supermassive black holes. These monsters can be millions or even billions of times heavier than our Sun! The one in our galaxy is called Sagittarius A* (A-star), and it\'s 4 million times more massive than the Sun.' },
      { title: 'Chapter 5: Seeing the Invisible', content: 'How can we see something that doesn\'t emit light? We can\'t see black holes directly, but we can see how they affect things around them. Gas falling into a black hole heats up and glows brightly. In 2019, scientists took the first actual photo of a black hole - a dark shadow surrounded by glowing hot gas!' }
    ]
  },
  {
    id: 'ab4',
    title: 'Dark Matter & Dark Energy',
    author: 'Cosmic Mysteries Lab',
    narrator: 'Dr. Shadow',
    duration: '28 min',
    ageRange: '10-14',
    description: 'Explore the invisible forces that make up 95% of our universe - the greatest mystery in modern science!',
    cover: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=300&h=400&fit=crop',
    tags: ['Dark Matter', 'Dark Energy', 'Theory', 'Cosmology'],
    type: 'audiobook',
    fullContent: 'Everything you can see - stars, planets, galaxies, even yourself - makes up only 5% of the universe! The rest is made of mysterious things called dark matter and dark energy.',
    chapters: [
      { title: 'Chapter 1: The Missing Universe', content: 'Scientists noticed something strange: galaxies were spinning too fast! Based on the stars we could see, they should fly apart. But they didn\'t. Something invisible was holding them together with extra gravity. Scientists call this mysterious stuff "dark matter" - dark because we can\'t see it, not because it\'s evil!' },
      { title: 'Chapter 2: What Is Dark Matter?', content: 'Dark matter doesn\'t emit, reflect, or block light - it\'s completely invisible! But it has mass and creates gravity. About 27% of the universe is dark matter. What is it made of? Scientists don\'t know yet! It might be undiscovered particles. Solving this mystery could win a Nobel Prize!' },
      { title: 'Chapter 3: Discovering Dark Energy', content: 'In 1998, scientists made a shocking discovery. They expected the universe\'s expansion to be slowing down due to gravity. Instead, it was speeding up! Something was pushing galaxies apart faster and faster. Scientists named this mysterious force "dark energy."' },
      { title: 'Chapter 4: The Biggest Mystery', content: 'Dark energy makes up about 68% of the universe - more than everything else combined! But we have almost no idea what it is. It might be energy built into space itself, or a new force we don\'t understand. Some scientists think solving this mystery will completely change physics!' },
      { title: 'Chapter 5: The Hunt Continues', content: 'Scientists around the world are searching for answers. Deep underground, detectors wait for dark matter particles to pass through. Telescopes map how dark energy affects the universe. One day, perhaps you could help solve one of the greatest mysteries in science!' }
    ]
  },
  {
    id: 'ab5',
    title: 'The Multiverse Theory',
    author: 'Infinite Possibilities Team',
    narrator: 'Professor Parallel',
    duration: '24 min',
    ageRange: '9-14',
    description: 'What if our universe is just one of infinite universes? Explore the mind-bending theory of the multiverse!',
    cover: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=400&fit=crop',
    tags: ['Multiverse', 'Theory', 'Cosmology'],
    type: 'audiobook',
    fullContent: 'What if there are other universes beyond our own? What if there are infinite versions of you living different lives? Welcome to the wild theory of the multiverse!',
    chapters: [
      { title: 'Chapter 1: Beyond Our Universe', content: 'We call everything we can see "the observable universe." But what lies beyond that? Some scientists think our universe might be just one bubble in an infinite ocean of universes! This collection of all universes is called the multiverse. It sounds like science fiction, but serious scientists study this idea.' },
      { title: 'Chapter 2: Infinite Possibilities', content: 'If space is truly infinite, math tells us something wild: every possible combination of matter must exist somewhere! That means there could be another Earth out there, with another version of you. Some versions might be nearly identical; others might be completely different. Mind-blowing, right?' },
      { title: 'Chapter 3: Many Worlds', content: 'Quantum physics - the science of tiny particles - suggests something strange. Every time a particle could do multiple things, maybe it does ALL of them in different universes! When you make a choice, perhaps the universe splits: one version where you chose one thing, another where you chose differently.' },
      { title: 'Chapter 4: Bubble Universes', content: 'During cosmic inflation, space expanded incredibly fast. Some scientists think different regions stopped inflating at different times, creating separate "bubble universes." Each bubble could have different laws of physics! Some might not even have atoms as we know them.' },
      { title: 'Chapter 5: Can We Prove It?', content: 'The tricky thing about the multiverse is that we might never be able to prove it exists. If other universes are beyond our observable universe, we can\'t see them directly. But scientists look for indirect clues, like unusual patterns in the cosmic microwave background. The search continues!' }
    ]
  },
  {
    id: 'ab6',
    title: 'How Stars Are Born and Die',
    author: 'Stellar Life Cycle Lab',
    narrator: 'Nova Bright',
    duration: '26 min',
    ageRange: '8-13',
    description: 'Follow the incredible life journey of stars - from their birth in cosmic clouds to their spectacular deaths!',
    cover: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop',
    tags: ['Stars', 'Theory', 'Nebulas', 'Supernovas'],
    type: 'audiobook',
    fullContent: 'Stars are born, they live for millions or billions of years, and then they die - sometimes spectacularly! Let\'s follow the amazing life story of stars.',
    chapters: [
      { title: 'Chapter 1: Stellar Nurseries', content: 'Stars are born in giant clouds of gas and dust called nebulae. Gravity pulls the gas together into clumps. As each clump gets denser, it heats up. When the center reaches 10 million degrees, nuclear fusion begins - hydrogen atoms smash together to make helium, releasing enormous energy. A star is born!' },
      { title: 'Chapter 2: Main Sequence Life', content: 'For most of its life, a star fuses hydrogen into helium in its core. This stage is called the "main sequence." Our Sun has been doing this for 4.6 billion years and will continue for another 5 billion! Bigger stars burn through their fuel faster and live shorter lives - some only a few million years.' },
      { title: 'Chapter 3: Red Giants', content: 'When a star like our Sun runs low on hydrogen in its core, it swells up into a red giant - hundreds of times bigger! The outer layers cool down and turn red. When our Sun becomes a red giant in about 5 billion years, it might swallow Mercury and Venus!' },
      { title: 'Chapter 4: Planetary Nebulae', content: 'Medium-sized stars like our Sun end their lives gently. They puff off their outer layers into space, creating beautiful glowing shells called planetary nebulae. The leftover core becomes a white dwarf - a super-dense star about the size of Earth that slowly cools over billions of years.' },
      { title: 'Chapter 5: Supernovas!', content: 'Massive stars die dramatically! When they run out of fuel, their cores collapse in less than a second, then explode in a supernova - one of the most powerful events in the universe! For a few weeks, a single supernova can outshine an entire galaxy. What\'s left behind might be a neutron star or even a black hole!' }
    ]
  },
  {
    id: 'ab7',
    title: 'Wormholes: Tunnels Through Space',
    author: 'Dr. Space-Time',
    narrator: 'Warp Speed Walker',
    duration: '20 min',
    ageRange: '9-14',
    description: 'Could there be shortcuts through space? Learn about the fascinating theory of wormholes!',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop',
    tags: ['Wormholes', 'Theory', 'Space Travel'],
    type: 'audiobook',
    fullContent: 'Imagine folding a piece of paper and poking a hole through it - that\'s the basic idea of a wormhole! These theoretical tunnels could connect distant parts of space.',
    chapters: [
      { title: 'Chapter 1: Bending Space', content: 'Einstein showed us that massive objects bend space. Now imagine bending space so much that two distant points touch! A wormhole would be like a tunnel connecting these points. Instead of traveling millions of light-years through normal space, you could take a shortcut!' },
      { title: 'Chapter 2: Einstein-Rosen Bridges', content: 'In 1935, Einstein and physicist Nathan Rosen discovered that the math of general relativity allowed for these space tunnels. They called them "Einstein-Rosen bridges." The equations showed that wormholes were theoretically possible - but could they actually exist in real life?' },
      { title: 'Chapter 3: The Problem with Wormholes', content: 'Here\'s the catch: any natural wormhole would collapse instantly! To keep one open, you\'d need something with "negative energy" - and we don\'t know if that even exists. Some scientists think exotic matter might work, but we\'ve never found any.' },
      { title: 'Chapter 4: Wormholes and Time Travel', content: 'Here\'s where it gets really wild. Some scientists think wormholes could connect not just different places, but different times! By moving one end of a wormhole very fast, time would pass differently. You might enter the wormhole and exit in the past! Most scientists think this is probably impossible, though.' },
      { title: 'Chapter 5: Science Fiction vs Reality', content: 'Wormholes are popular in movies and books for good reason - they\'re amazing! But in real life, we\'ve never found one. They might exist, they might not. What we do know is that studying wormholes helps us understand the universe better, even if we never actually find one.' }
    ]
  },
  {
    id: 'ab8',
    title: 'The Fate of the Universe',
    author: 'Future Cosmos Lab',
    narrator: 'Dr. Destiny',
    duration: '27 min',
    ageRange: '10-14',
    description: 'What will happen to the universe in the far, far future? Explore the possible endings of everything!',
    cover: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=300&h=400&fit=crop',
    tags: ['Cosmology', 'Theory', 'Future'],
    type: 'audiobook',
    fullContent: 'The universe is 13.8 billion years old, but what comes next? Scientists have theories about how everything might end - don\'t worry, it\'s trillions of years away!',
    chapters: [
      { title: 'Chapter 1: The Expanding Universe', content: 'Right now, the universe is expanding - galaxies are moving apart from each other. But what happens next depends on how this expansion continues. Will it slow down? Speed up? Or stay the same? Scientists have three main theories about the ultimate fate of everything.' },
      { title: 'Chapter 2: The Big Freeze', content: 'The most likely ending is called the "Big Freeze" or "Heat Death." If dark energy keeps pushing, galaxies will move so far apart that we won\'t see any others. Stars will burn out, and the universe will become cold, dark, and empty. This would take trillions and trillions of years!' },
      { title: 'Chapter 3: The Big Rip', content: 'What if dark energy gets stronger over time? Then the expansion would accelerate until it tears everything apart - first galaxies, then stars, then planets, then atoms themselves! This is called the "Big Rip." Scientists don\'t think this will happen, but it\'s possible!' },
      { title: 'Chapter 4: The Big Crunch', content: 'Another possibility: what if gravity eventually wins and pulls everything back together? The universe would collapse into a super-hot, super-dense point - like the Big Bang in reverse! This is called the "Big Crunch." Maybe it would trigger a new Big Bang and the cycle would repeat!' },
      { title: 'Chapter 5: Don\'t Worry!', content: 'Whatever happens to the universe, it\'s so far in the future that we can\'t even imagine it. Our Sun has 5 billion years left, and humans have plenty of time to explore, discover, and maybe even find ways to survive anything! The universe\'s story is just beginning.' }
    ]
  },
  {
    id: 'ab9',
    title: 'Gravity: The Force That Shapes Everything',
    author: 'Newton & Einstein Academy',
    narrator: 'Professor G-Force',
    duration: '23 min',
    ageRange: '8-13',
    description: 'Discover how gravity works, from falling apples to orbiting planets to bending light!',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=300&h=400&fit=crop',
    tags: ['Gravity', 'Theory', 'Physics'],
    type: 'audiobook',
    fullContent: 'Gravity is the force that keeps your feet on the ground, makes the Moon orbit Earth, and holds galaxies together. But what IS gravity? Let\'s find out!',
    chapters: [
      { title: 'Chapter 1: Newton\'s Apple', content: 'Legend says Isaac Newton was sitting under an apple tree when an apple fell on his head. This made him wonder: what pulls the apple down? Newton realized the same force that pulls apples also keeps the Moon orbiting Earth! He called this force "gravity" and created equations to describe it.' },
      { title: 'Chapter 2: Universal Gravitation', content: 'Newton discovered that every object with mass attracts every other object with mass. The bigger the mass, the stronger the pull. The farther apart the objects, the weaker the pull. This is why the Sun\'s gravity is strong enough to hold the planets in orbit even across millions of miles!' },
      { title: 'Chapter 3: Einstein\'s Revolution', content: 'Einstein had a different way of thinking about gravity. He said gravity isn\'t really a force - it\'s the bending of space itself! Massive objects like the Sun create dips in the fabric of space. Planets roll around these dips like marbles around a bowl. This explained things Newton\'s equations couldn\'t!' },
      { title: 'Chapter 4: Gravitational Waves', content: 'When massive objects accelerate - like two black holes spiraling together - they create ripples in space-time called gravitational waves. Einstein predicted these in 1916, but we didn\'t detect them until 2015! These waves stretch and squeeze space as they pass, but the effect is tinier than an atom.' },
      { title: 'Chapter 5: Gravity\'s Greatest Hits', content: 'Gravity does amazing things! It bends light around massive objects, letting us see galaxies behind other galaxies. It slows down time near massive objects. It creates black holes and shapes the entire universe. Without gravity, there would be no stars, no planets, and no us!' }
    ]
  },
  {
    id: 'ab10',
    title: 'Are We Alone? The Search for Alien Life',
    author: 'SETI Kids Team',
    narrator: 'Dr. First Contact',
    duration: '29 min',
    ageRange: '8-14',
    description: 'Could there be life on other planets? Explore how scientists search for alien life!',
    cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop',
    tags: ['Aliens', 'Exoplanets', 'Theory', 'SETI'],
    type: 'audiobook',
    fullContent: 'Is Earth the only planet with life? With billions of galaxies and trillions of stars, surely there must be life somewhere else! Let\'s explore how scientists search for our cosmic neighbors.',
    chapters: [
      { title: 'Chapter 1: The Big Question', content: 'Are we alone in the universe? Humans have wondered this for thousands of years. Today, scientists are actually searching for the answer! With billions of stars in our galaxy alone, and billions of galaxies in the universe, the odds seem good that life exists somewhere else.' },
      { title: 'Chapter 2: Where to Look', content: 'Scientists look for life in the "habitable zone" - the area around a star where temperatures allow liquid water. Too close, and water boils; too far, and it freezes. We\'ve found thousands of planets in habitable zones around other stars! Some might have conditions similar to Earth.' },
      { title: 'Chapter 3: Signs of Life', content: 'How would we know if a planet has life? The James Webb Space Telescope can analyze light passing through distant planets\' atmospheres. Certain gases like oxygen and methane together could be a sign of life! These are called "biosignatures." Finding them would be one of the biggest discoveries ever.' },
      { title: 'Chapter 4: Listening for Signals', content: 'What if intelligent aliens are out there? SETI (Search for Extraterrestrial Intelligence) uses radio telescopes to listen for signals from space. So far, we haven\'t heard anything definite, but we\'ve only listened to a tiny fraction of the sky. The search continues 24/7!' },
      { title: 'Chapter 5: The Fermi Paradox', content: 'Here\'s a puzzle: if life is common, why haven\'t we found any evidence yet? This is called the Fermi Paradox. Maybe intelligent life is very rare. Maybe civilizations don\'t last long. Maybe aliens exist but haven\'t noticed us yet. Or maybe we\'ll make contact tomorrow! What do you think?' }
    ]
  }
];