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
  }
];