import { expandedCelestialCatalog } from './expandedCelestialCatalog';

export type CelestialCategory = 'solar-system' | 'stars' | 'nebulas' | 'galaxies' | 'other';
export type DistanceFilter = 'near' | 'far' | 'all';

export interface CelestialBody {
  id: string;
  name: string;
  category: CelestialCategory;
  type: string;
  description: string;
  longDescription: string;
  coolFact: string;
  extendedFacts: string[];
  metric: string;
  metricLabel: string;
  icon: string;
  color: string;
  distance: 'near' | 'far';
  readMoreContent: string;
}

const rawCelestialBodies: CelestialBody[] = [
  // Solar System
  {
    id: 'sun',
    name: 'The Sun',
    category: 'solar-system',
    type: 'Star',
    description: 'Our very own star that lights up our days!',
    longDescription: 'The Sun is a giant ball of hot, glowing gas at the center of our solar system. It gives us light, warmth, and makes life on Earth possible!',
    coolFact: 'About 1.3 million Earths could fit inside the Sun!',
    extendedFacts: [
      'The Sun is about 4.6 billion years old',
      'Light from the Sun takes 8 minutes to reach Earth',
      'The Sun\'s surface temperature is about 5,500°C',
      'The Sun produces energy through nuclear fusion'
    ],
    metric: 'Very Hot',
    metricLabel: 'Temperature',
    icon: '☀️',
    color: 'star',
    distance: 'near',
    readMoreContent: 'The Sun is a yellow dwarf star at the heart of our solar system. Every second, it converts about 600 million tons of hydrogen into helium through nuclear fusion, releasing enormous amounts of energy. This energy travels through space and reaches Earth, providing the light and heat that makes life possible. The Sun has different layers including the core, radiative zone, convective zone, photosphere, chromosphere, and corona. Solar flares and sunspots are fascinating phenomena that occur on the Sun\'s surface.'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    category: 'solar-system',
    type: 'Planet',
    description: 'The smallest and fastest planet in our solar system.',
    longDescription: 'Mercury is the closest planet to the Sun and the smallest in our solar system. It zooms around the Sun faster than any other planet!',
    coolFact: 'A year on Mercury is only 88 Earth days!',
    extendedFacts: [
      'Mercury has no moons or rings',
      'Temperatures range from -180°C to 430°C',
      'Mercury has a very thin atmosphere called an exosphere',
      'The planet is covered in craters from asteroid impacts'
    ],
    metric: 'Very Fast',
    metricLabel: 'Speed',
    icon: '🪨',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Mercury is a small, rocky world that races around the Sun at nearly 50 kilometers per second. Despite being closest to the Sun, it\'s not the hottest planet because it has almost no atmosphere to trap heat. Mercury\'s surface looks similar to our Moon, covered with craters from billions of years of asteroid impacts. The planet has extreme temperature swings - scorching hot during the day and freezing cold at night.'
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'solar-system',
    type: 'Planet',
    description: 'The hottest planet and Earth\'s "twin sister".',
    longDescription: 'Venus is similar in size to Earth but covered in thick, toxic clouds. It\'s the hottest planet in our solar system - even hotter than Mercury!',
    coolFact: 'Venus spins backwards compared to most planets!',
    extendedFacts: [
      'Venus is the brightest natural object in the night sky after the Moon',
      'A day on Venus is longer than its year',
      'Venus has no moons',
      'The atmosphere is 96% carbon dioxide'
    ],
    metric: 'Super Hot',
    metricLabel: 'Temperature',
    icon: '🌕',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Venus is often called Earth\'s twin because of its similar size and mass, but the similarities end there. Venus has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid. This creates a runaway greenhouse effect, making Venus the hottest planet at about 465°C. Interestingly, Venus rotates in the opposite direction to most planets, so on Venus, the Sun rises in the west and sets in the east!'
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'solar-system',
    type: 'Planet',
    description: 'Our beautiful blue home - the only planet with known life!',
    longDescription: 'Earth is the third planet from the Sun and the only known planet with liquid water on its surface. It\'s home to millions of species, including us!',
    coolFact: 'Earth is the only planet not named after a god or goddess!',
    extendedFacts: [
      'Earth is about 4.5 billion years old',
      '71% of Earth\'s surface is covered by water',
      'Earth has one natural satellite - the Moon',
      'Earth\'s atmosphere protects us from harmful radiation'
    ],
    metric: 'Just Right',
    metricLabel: 'Temperature',
    icon: '🌍',
    color: 'planet',
    distance: 'near',
    readMoreContent: 'Earth is unique in our solar system as the only planet known to harbor life. Located in the "Goldilocks zone" - not too hot, not too cold - Earth has liquid water, a protective atmosphere, and a magnetic field that shields us from harmful solar radiation. Our planet has diverse ecosystems ranging from deep ocean trenches to tall mountain peaks, supporting millions of species. Earth\'s Moon stabilizes our planet\'s tilt, giving us regular seasons.'
  },
  {
    id: 'moon',
    name: 'The Moon',
    category: 'solar-system',
    type: 'Moon',
    description: 'Earth\'s faithful companion in space.',
    longDescription: 'The Moon is Earth\'s only natural satellite. It controls our ocean tides and lights up our nights. Humans have even walked on it!',
    coolFact: '12 people have walked on the Moon!',
    extendedFacts: [
      'The Moon is slowly moving away from Earth',
      'The same side of the Moon always faces Earth',
      'The Moon has no atmosphere',
      'Moonquakes happen due to Earth\'s gravitational pull'
    ],
    metric: 'Close',
    metricLabel: 'Distance',
    icon: '🌙',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'The Moon formed about 4.5 billion years ago when a Mars-sized object collided with early Earth. It\'s the fifth largest moon in our solar system and the only celestial body besides Earth that humans have visited. The Moon\'s gravitational pull creates ocean tides on Earth and stabilizes our planet\'s wobble. Between 1969 and 1972, twelve astronauts walked on the lunar surface during NASA\'s Apollo missions.'
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'solar-system',
    type: 'Planet',
    description: 'The Red Planet - our next destination for exploration!',
    longDescription: 'Mars is called the Red Planet because of its rusty red color. It has the tallest volcano in the solar system and robots are exploring it right now!',
    coolFact: 'Mars has the largest volcano in the solar system - Olympus Mons!',
    extendedFacts: [
      'Mars has two small moons: Phobos and Deimos',
      'A day on Mars is about 24 hours and 37 minutes',
      'Mars has seasons like Earth',
      'There\'s evidence of ancient water on Mars'
    ],
    metric: 'Cold',
    metricLabel: 'Temperature',
    icon: '🔴',
    color: 'destructive',
    distance: 'near',
    readMoreContent: 'Mars, the fourth planet from the Sun, has captivated human imagination for centuries. Its red color comes from iron oxide (rust) on its surface. Mars has the largest volcano (Olympus Mons) and the longest canyon (Valles Marineris) in the solar system. Evidence suggests that Mars once had liquid water on its surface billions of years ago. Today, multiple rovers and orbiters are exploring Mars, searching for signs of past life and preparing for future human missions.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'solar-system',
    type: 'Planet',
    description: 'The king of planets - biggest in our solar system!',
    longDescription: 'Jupiter is a giant gas planet with a famous Great Red Spot - a storm bigger than Earth that has been raging for hundreds of years!',
    coolFact: 'Jupiter has at least 95 moons!',
    extendedFacts: [
      'Jupiter\'s Great Red Spot is shrinking',
      'Jupiter has faint rings made of dust',
      'Jupiter\'s moon Europa might have a liquid ocean',
      'Jupiter rotates faster than any other planet'
    ],
    metric: 'Giant',
    metricLabel: 'Size',
    icon: '🟠',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Jupiter is the largest planet in our solar system - so big that all other planets could fit inside it! This gas giant is made mostly of hydrogen and helium and has no solid surface. The Great Red Spot is a massive storm that has raged for at least 400 years. Jupiter acts as a cosmic vacuum cleaner, its strong gravity attracting asteroids and comets that might otherwise hit Earth. Its moon Europa is one of the most promising places to search for extraterrestrial life.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'solar-system',
    type: 'Planet',
    description: 'The beautiful ringed planet everyone loves!',
    longDescription: 'Saturn is famous for its stunning rings made of ice and rock. It\'s so light it would float in water if you had a big enough bathtub!',
    coolFact: 'Saturn\'s rings could stretch almost from Earth to the Moon!',
    extendedFacts: [
      'Saturn has 146 known moons',
      'Saturn\'s rings are mostly made of ice',
      'Saturn\'s moon Titan has lakes of liquid methane',
      'Saturn could fit 764 Earths inside it'
    ],
    metric: 'Light',
    metricLabel: 'Density',
    icon: '💫',
    color: 'star',
    distance: 'near',
    readMoreContent: 'Saturn is the second-largest planet and famous for its spectacular ring system. The rings are made of billions of pieces of ice, rock, and dust, ranging from tiny grains to house-sized chunks. Saturn has the lowest density of any planet - it would actually float in water! Its largest moon, Titan, is the only moon with a thick atmosphere and has lakes and seas of liquid methane and ethane on its surface.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    category: 'solar-system',
    type: 'Planet',
    description: 'The sideways planet that rolls around the Sun!',
    longDescription: 'Uranus is an ice giant that spins on its side. Scientists think something huge crashed into it long ago, knocking it over!',
    coolFact: 'Uranus rotates on its side like a rolling ball!',
    extendedFacts: [
      'Uranus has 27 known moons',
      'Uranus has faint rings',
      'Uranus was the first planet discovered with a telescope',
      'Uranus takes 84 Earth years to orbit the Sun'
    ],
    metric: 'Tilted',
    metricLabel: 'Rotation',
    icon: '🔵',
    color: 'planet',
    distance: 'near',
    readMoreContent: 'Uranus is unique among planets because it rotates on its side, with its axis tilted at about 98 degrees. This means its poles experience 42 years of continuous sunlight followed by 42 years of darkness! Uranus is an ice giant made mostly of water, methane, and ammonia ices surrounding a small rocky core. Its blue-green color comes from methane in its atmosphere, which absorbs red light.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    category: 'solar-system',
    type: 'Planet',
    description: 'The windiest planet with supersonic storms!',
    longDescription: 'Neptune is the farthest planet from the Sun. It has the strongest winds in the solar system - faster than the speed of sound!',
    coolFact: 'Neptune has winds up to 1,200 mph - the fastest in the solar system!',
    extendedFacts: [
      'Neptune has 16 known moons',
      'Neptune was discovered through mathematical predictions',
      'Neptune has a Great Dark Spot similar to Jupiter',
      'Neptune takes 165 years to orbit the Sun'
    ],
    metric: 'Windy',
    metricLabel: 'Weather',
    icon: '🔷',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Neptune is the eighth and farthest known planet from the Sun. It\'s so far away that it takes 165 Earth years to complete one orbit! Neptune is an ice giant with a vivid blue color caused by methane in its atmosphere. Despite being the coldest planet, Neptune generates more heat than it receives from the Sun, driving powerful weather systems including the fastest winds in the solar system.'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'The famous dwarf planet with a heart-shaped feature!',
    longDescription: 'Pluto was once called the ninth planet but is now a dwarf planet. It has a giant heart-shaped glacier on its surface!',
    coolFact: 'Pluto is smaller than Earth\'s Moon!',
    extendedFacts: [
      'Pluto has 5 known moons',
      'Pluto\'s largest moon Charon is half its size',
      'A day on Pluto is 6.4 Earth days',
      'Pluto was visited by New Horizons in 2015'
    ],
    metric: 'Tiny',
    metricLabel: 'Size',
    icon: '❤️',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'Pluto was discovered in 1930 and was considered the ninth planet until 2006, when it was reclassified as a dwarf planet. In 2015, NASA\'s New Horizons spacecraft flew past Pluto, revealing a surprisingly complex world with mountains of water ice, glaciers of nitrogen ice, and a thin atmosphere. The heart-shaped region on Pluto is called Tombaugh Regio, named after Pluto\'s discoverer.'
  },
  {
    id: 'ceres',
    name: 'Ceres',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'The largest object in the asteroid belt!',
    longDescription: 'Ceres is the largest object in the asteroid belt between Mars and Jupiter. It was the first dwarf planet to be visited by a spacecraft!',
    coolFact: 'Ceres might have a subsurface ocean of liquid water!',
    extendedFacts: [
      'Ceres was discovered in 1801',
      'Ceres has mysterious bright spots on its surface',
      'Ceres contains about 1/3 of the asteroid belt\'s mass',
      'NASA\'s Dawn spacecraft orbited Ceres from 2015-2018'
    ],
    metric: 'Large',
    metricLabel: 'Size',
    icon: '🌑',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Ceres is the largest object in the asteroid belt and the only dwarf planet located in the inner solar system. NASA\'s Dawn mission revealed that Ceres has bright spots made of sodium carbonate, likely from a subsurface ocean that occasionally reaches the surface. Ceres makes up about a third of the asteroid belt\'s total mass and may have once had conditions suitable for life.'
  },
  {
    id: 'eris',
    name: 'Eris',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'A distant dwarf planet that caused Pluto\'s demotion!',
    longDescription: 'Eris is one of the largest known dwarf planets, orbiting far beyond Pluto. Its discovery led to the reclassification of Pluto!',
    coolFact: 'Eris is named after the Greek goddess of strife and discord!',
    extendedFacts: [
      'Eris is 27% more massive than Pluto',
      'Eris has one moon called Dysnomia',
      'Eris takes 558 years to orbit the Sun',
      'Eris was discovered in 2005'
    ],
    metric: 'Distant',
    metricLabel: 'Location',
    icon: '⚫',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'Eris was discovered in 2005 and is one of the largest known dwarf planets. It\'s slightly smaller than Pluto but more massive. Eris orbits in a region called the scattered disc, far beyond Neptune, taking 558 years to complete one orbit. The discovery of Eris, which appeared larger than Pluto at the time, sparked the debate that led to Pluto being reclassified as a dwarf planet in 2006.'
  },
  {
    id: 'haumea',
    name: 'Haumea',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'An egg-shaped dwarf planet with rings!',
    longDescription: 'Haumea is one of the fastest rotating large objects in our solar system, spinning so fast it has stretched into an egg shape!',
    coolFact: 'Haumea rotates once every 4 hours - the fastest of any known large body!',
    extendedFacts: [
      'Haumea has two moons: Hi\'iaka and Namaka',
      'Haumea is covered in crystalline water ice',
      'Haumea is the only known dwarf planet with rings',
      'Haumea is named after the Hawaiian goddess of fertility'
    ],
    metric: 'Fast Spin',
    metricLabel: 'Rotation',
    icon: '🥚',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'Haumea is one of the strangest objects in our solar system. It spins so rapidly - once every 4 hours - that it has been stretched into an elongated, egg-like shape. Haumea is also the only known dwarf planet to have rings, which were discovered in 2017. Located in the Kuiper Belt beyond Neptune, Haumea is covered in crystalline water ice and has two small moons named after the Hawaiian goddess\'s daughters.'
  },
  {
    id: 'makemake',
    name: 'Makemake',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'A reddish dwarf planet in the Kuiper Belt!',
    longDescription: 'Makemake is one of the largest objects in the Kuiper Belt. Its surface is covered in frozen methane and ethane that give it a reddish-brown color.',
    coolFact: 'Makemake was discovered around Easter, so was almost named "Easterbunny"!',
    extendedFacts: [
      'Makemake has one known moon',
      'Makemake takes 305 years to orbit the Sun',
      'Makemake has no known atmosphere',
      'Makemake is named after the Rapa Nui god of fertility'
    ],
    metric: 'Reddish',
    metricLabel: 'Color',
    icon: '🔴',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Makemake is the third-largest known dwarf planet and was discovered in 2005. It orbits in the Kuiper Belt, a region of icy bodies beyond Neptune. Makemake\'s surface is extremely cold and covered in frozen methane, ethane, and nitrogen, which give it a reddish-brown appearance. The dwarf planet was discovered just after Easter 2005, so the discovery team nicknamed it "Easterbunny" before it received its official name.'
  },
  {
    id: 'asteroid',
    name: 'Asteroids',
    category: 'solar-system',
    type: 'Space Rock',
    description: 'Rocky leftovers from when the solar system formed!',
    longDescription: 'Asteroids are space rocks that orbit the Sun. Most live in the asteroid belt between Mars and Jupiter. Some are tiny pebbles, others are huge!',
    coolFact: 'The asteroid belt contains millions of asteroids!',
    extendedFacts: [
      'The largest asteroid is Vesta, about 525 km across',
      'Some asteroids have their own tiny moons',
      'Asteroids are leftovers from the solar system\'s formation',
      'Some asteroids come close to Earth - we track them carefully!'
    ],
    metric: 'Varied',
    metricLabel: 'Size',
    icon: '🪨',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Asteroids are rocky remnants from the early solar system, about 4.6 billion years old. Most orbit in the asteroid belt between Mars and Jupiter, but some cross Earth\'s orbit. Scientists study asteroids because they contain clues about the early solar system. Some asteroids are solid rock, while others are "rubble piles" - loose collections of rock held together by gravity. NASA and other agencies track potentially hazardous asteroids to protect Earth.'
  },
  {
    id: 'comet',
    name: 'Comets',
    category: 'solar-system',
    type: 'Icy Body',
    description: 'Icy visitors with beautiful, glowing tails!',
    longDescription: 'Comets are like dirty snowballs from the outer solar system. When they get close to the Sun, they grow amazing glowing tails!',
    coolFact: 'Comet tails always point away from the Sun!',
    extendedFacts: [
      'Comets have two tails: dust and gas',
      'Halley\'s Comet visits every 75-76 years',
      'Comets may have brought water to early Earth',
      'The Rosetta mission landed on a comet in 2014'
    ],
    metric: 'Fast',
    metricLabel: 'Speed',
    icon: '☄️',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Comets are icy bodies that originate from the outer solar system - either the Kuiper Belt or the distant Oort Cloud. When a comet approaches the Sun, solar heat causes its ice to turn directly into gas (sublimation), creating a glowing atmosphere called a coma and two tails: a dust tail and an ion tail. Comets have fascinated humans throughout history and may have delivered water and organic molecules to early Earth, potentially helping life begin.'
  },
  {
    id: 'io',
    name: 'Io',
    category: 'solar-system',
    type: 'Moon',
    description: 'Jupiter\'s volcanic moon - the most volcanically active world!',
    longDescription: 'Io is Jupiter\'s innermost large moon and the most volcanically active body in our solar system, with hundreds of active volcanoes!',
    coolFact: 'Io has over 400 active volcanoes!',
    extendedFacts: [
      'Io is slightly larger than Earth\'s Moon',
      'Io\'s volcanoes shoot plumes up to 500 km high',
      'Io\'s surface is constantly being renewed by lava flows',
      'Jupiter\'s gravity causes the volcanism through tidal heating'
    ],
    metric: 'Very Active',
    metricLabel: 'Volcanism',
    icon: '🌋',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Io is one of the most extreme places in our solar system. Jupiter\'s immense gravity, combined with the gravitational pull of Europa and Ganymede, constantly squeezes and stretches Io, generating enormous internal heat that powers hundreds of active volcanoes. These volcanoes erupt sulfur and silicate lava, painting Io\'s surface in vibrant yellows, reds, and oranges. No other body in our solar system has such intense volcanic activity.'
  },
  {
    id: 'europa',
    name: 'Europa',
    category: 'solar-system',
    type: 'Moon',
    description: 'Jupiter\'s icy moon with a hidden ocean!',
    longDescription: 'Europa has a thick layer of ice covering what scientists believe is a vast ocean of liquid water - one of the best places to search for alien life!',
    coolFact: 'Europa\'s ocean may contain twice as much water as all of Earth\'s oceans combined!',
    extendedFacts: [
      'Europa\'s ice shell is about 15-25 km thick',
      'The ocean underneath may be 60-150 km deep',
      'Europa has a very thin oxygen atmosphere',
      'NASA is planning the Europa Clipper mission to explore it'
    ],
    metric: 'Icy',
    metricLabel: 'Surface',
    icon: '🧊',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Europa is one of the most intriguing worlds in our solar system. Beneath its cracked, icy surface lies a global ocean that may contain more than twice the water of all Earth\'s oceans combined. Scientists believe this ocean might have the right conditions for life, including liquid water, energy sources, and possibly the right chemistry. NASA\'s upcoming Europa Clipper mission will study this moon in detail, searching for signs of habitability.'
  },
  {
    id: 'titan',
    name: 'Titan',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s giant moon with lakes and a thick atmosphere!',
    longDescription: 'Titan is the only moon with a thick atmosphere and the only place besides Earth with stable liquid on its surface - but it\'s liquid methane!',
    coolFact: 'You could fly on Titan by strapping on wings and flapping your arms!',
    extendedFacts: [
      'Titan is larger than the planet Mercury',
      'Titan has methane rain and rivers',
      'Titan\'s atmosphere is mostly nitrogen, like Earth\'s',
      'The Huygens probe landed on Titan in 2005'
    ],
    metric: 'Earth-like',
    metricLabel: 'Features',
    icon: '🌫️',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Titan is Saturn\'s largest moon and the second-largest moon in our solar system. It\'s the only moon with a substantial atmosphere - even thicker than Earth\'s - and the only place besides Earth with stable surface liquids. But instead of water, Titan\'s lakes and seas are filled with liquid methane and ethane. The dense atmosphere and low gravity would make human flight possible! NASA\'s Dragonfly mission will send a drone to explore Titan in the 2030s.'
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s icy moon with spectacular water geysers!',
    longDescription: 'Enceladus shoots huge plumes of water ice into space from its south pole, revealing a hidden ocean that might harbor life!',
    coolFact: 'Enceladus creates one of Saturn\'s rings from its water geysers!',
    extendedFacts: [
      'Enceladus is only about 500 km across',
      'The geysers contain water, salt, and organic molecules',
      'Enceladus has hydrothermal vents on its ocean floor',
      'Cassini flew through the plumes multiple times'
    ],
    metric: 'Active',
    metricLabel: 'Geysers',
    icon: '💨',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Enceladus is a small, icy moon of Saturn that punches well above its weight in scientific importance. Despite being only 500 km across, Enceladus has dramatic geysers at its south pole that spray water ice, salts, and organic molecules into space. NASA\'s Cassini spacecraft flew through these plumes and detected hydrogen, suggesting hydrothermal activity on the ocean floor - similar to environments on Earth where life thrives without sunlight.'
  },
  {
    id: 'triton',
    name: 'Triton',
    category: 'solar-system',
    type: 'Moon',
    description: 'Neptune\'s largest moon that orbits backwards!',
    longDescription: 'Triton is Neptune\'s largest moon and one of the coldest places in the solar system. It orbits Neptune in the opposite direction of the planet\'s rotation!',
    coolFact: 'Triton is slowly spiraling toward Neptune and will eventually be torn apart!',
    extendedFacts: [
      'Triton was probably captured from the Kuiper Belt',
      'Triton has active nitrogen geysers',
      'Surface temperature is about -235°C',
      'Triton is the only large moon that orbits retrograde'
    ],
    metric: 'Freezing',
    metricLabel: 'Temperature',
    icon: '❄️',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Triton is Neptune\'s largest moon and one of the most unusual in the solar system. It orbits Neptune "backwards" (retrograde), suggesting it was captured from the Kuiper Belt billions of years ago. Triton is extremely cold, with surface temperatures around -235°C, making it one of the coldest known objects in the solar system. Despite this, Voyager 2 discovered active geysers shooting nitrogen gas miles into the thin atmosphere.'
  },
  // Stars
  {
    id: 'red-giant',
    name: 'Red Giant',
    category: 'stars',
    type: 'Star Type',
    description: 'Giant old stars that have puffed up and cooled down.',
    longDescription: 'Red giants are stars that have run low on fuel and expanded to huge sizes. Our Sun will become a red giant in about 5 billion years!',
    coolFact: 'A red giant can be 100 times bigger than our Sun!',
    extendedFacts: [
      'Red giants are cooler than our Sun despite being bigger',
      'Betelgeuse is a famous red supergiant',
      'Red giants can swallow planets in their orbits',
      'Red giants eventually become white dwarfs or supernovas'
    ],
    metric: 'Huge',
    metricLabel: 'Size',
    icon: '🔴',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Red giants represent a late stage in a star\'s life cycle. When a star like our Sun runs low on hydrogen fuel in its core, it begins fusing heavier elements and expands dramatically, becoming a red giant. The outer layers cool as they expand, giving the star its reddish color. In about 5 billion years, our Sun will become a red giant large enough to engulf Mercury and Venus, and possibly Earth. Eventually, red giants shed their outer layers and become white dwarfs.'
  },
  {
    id: 'white-dwarf',
    name: 'White Dwarf',
    category: 'stars',
    type: 'Star Type',
    description: 'Tiny, super-dense stars at the end of their lives.',
    longDescription: 'White dwarfs are what\'s left after a star like our Sun runs out of fuel. They\'re tiny but incredibly heavy - a teaspoon would weigh tons!',
    coolFact: 'A white dwarf is about the size of Earth but as heavy as the Sun!',
    extendedFacts: [
      'White dwarfs slowly cool over billions of years',
      'A teaspoon of white dwarf material would weigh about 5 tons',
      'White dwarfs no longer produce energy through fusion',
      'Sirius B is the closest white dwarf to Earth'
    ],
    metric: 'Dense',
    metricLabel: 'Weight',
    icon: '⚪',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'White dwarfs are the remnant cores of stars that have exhausted their nuclear fuel. They\'re incredibly dense - about the mass of the Sun packed into an object the size of Earth! A teaspoon of white dwarf material would weigh about 5 tons on Earth. White dwarfs no longer generate energy through fusion; they simply cool down over billions of years, eventually becoming cold, dark "black dwarfs" (though the universe isn\'t old enough for any to exist yet).'
  },
  {
    id: 'neutron-star',
    name: 'Neutron Star',
    category: 'stars',
    type: 'Star Type',
    description: 'Super-dense spinning stars that flash like lighthouses!',
    longDescription: 'Neutron stars form when massive stars explode. They spin incredibly fast and can flash beams of light like cosmic lighthouses!',
    coolFact: 'A sugar cube of neutron star would weigh as much as a mountain!',
    extendedFacts: [
      'Neutron stars can spin hundreds of times per second',
      'Pulsars are neutron stars that beam radiation toward Earth',
      'Neutron stars have the strongest magnetic fields in the universe',
      'Neutron stars are only about 20 km across'
    ],
    metric: 'Super Dense',
    metricLabel: 'Density',
    icon: '💫',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Neutron stars are the collapsed cores of massive stars that exploded as supernovas. They\'re so dense that the protons and electrons have been crushed together to form neutrons. A typical neutron star is only about 20 kilometers across but contains more mass than the Sun! They spin incredibly fast - some rotate hundreds of times per second - and have magnetic fields trillions of times stronger than Earth\'s. Pulsars are neutron stars that beam radiation toward Earth as they spin, appearing to pulse like cosmic lighthouses.'
  },
  {
    id: 'supernova',
    name: 'Supernova',
    category: 'stars',
    type: 'Stellar Explosion',
    description: 'The biggest explosions in the universe!',
    longDescription: 'A supernova happens when a massive star explodes at the end of its life. For a few weeks, it can outshine an entire galaxy!',
    coolFact: 'Supernovas create elements like gold and silver!',
    extendedFacts: [
      'A supernova can release as much energy as the Sun produces in 10 billion years',
      'Heavy elements like gold, platinum, and uranium are made in supernovas',
      'Supernova remnants spread these elements across the galaxy',
      'The Crab Nebula is the remnant of a supernova seen in 1054 AD'
    ],
    metric: 'Explosive',
    metricLabel: 'Power',
    icon: '💥',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'A supernova is one of the most powerful events in the universe - the explosive death of a massive star. For a brief time, a supernova can outshine an entire galaxy of billions of stars! These explosions are cosmic factories, creating and spreading heavy elements like gold, silver, and uranium throughout the galaxy. The atoms in your body heavier than iron were likely created in a supernova billions of years ago. We truly are made of star stuff!'
  },
  {
    id: 'binary-star',
    name: 'Binary Stars',
    category: 'stars',
    type: 'Star System',
    description: 'Two stars dancing together in space!',
    longDescription: 'Binary stars are two stars that orbit around each other. More than half of all stars in the universe have a dance partner!',
    coolFact: 'Some planets have two suns, just like in Star Wars!',
    extendedFacts: [
      'The nearest star system, Alpha Centauri, is a binary (actually triple) system',
      'Binary stars help scientists measure stellar masses',
      'Some binaries are so close they share material',
      'Eclipsing binaries dim when one star passes in front of the other'
    ],
    metric: 'Paired',
    metricLabel: 'Type',
    icon: '✨',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Binary star systems consist of two stars orbiting around their common center of mass. They\'re surprisingly common - more than half of all Sun-like stars have at least one companion star. Binary stars come in many types: some orbit each other for millions of years, while others are so close they actually share material. Astronomers study binary stars to determine stellar masses and properties. Some exoplanets orbit binary stars, experiencing double sunsets like Tatooine in Star Wars!'
  },
  {
    id: 'blue-giant',
    name: 'Blue Giant',
    category: 'stars',
    type: 'Star Type',
    description: 'Hot, massive stars that burn bright and fast!',
    longDescription: 'Blue giants are among the hottest and most luminous stars in the universe. They live fast and die young, often ending as supernovas!',
    coolFact: 'Blue giants can be 10,000 times brighter than our Sun!',
    extendedFacts: [
      'Blue giants are at least 10 times more massive than the Sun',
      'They burn through their fuel in just millions of years',
      'Rigel in Orion is a famous blue supergiant',
      'Blue giants emit mostly ultraviolet light'
    ],
    metric: 'Very Hot',
    metricLabel: 'Temperature',
    icon: '🔵',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Blue giants and supergiants are among the most impressive stars in the universe. Their extreme temperatures - up to 50,000°C - give them their characteristic blue-white color. These massive stars are cosmic furnaces, burning through their nuclear fuel thousands of times faster than the Sun. A star like our Sun will shine for about 10 billion years, but a blue supergiant may last only a few million years before exploding as a supernova.'
  },
  {
    id: 'variable-star',
    name: 'Variable Stars',
    category: 'stars',
    type: 'Star Type',
    description: 'Stars that change brightness over time!',
    longDescription: 'Variable stars pulsate, brighten, or dim over periods ranging from minutes to years. They help scientists measure cosmic distances!',
    coolFact: 'Cepheid variable stars helped prove the universe is expanding!',
    extendedFacts: [
      'Some variable stars pulsate in and out like heartbeats',
      'Eclipsing binaries are a type of variable star',
      'The North Star (Polaris) is a Cepheid variable',
      'Mira variables can change brightness by 1000 times'
    ],
    metric: 'Changing',
    metricLabel: 'Brightness',
    icon: '⭐',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Variable stars are stars whose brightness changes over time. Some pulsate, expanding and contracting like a beating heart. Others vary because they\'re in binary systems where one star periodically blocks the other. Cepheid variables are especially important - their pulsation period is directly related to their true brightness, making them "standard candles" for measuring cosmic distances. Edwin Hubble used Cepheid variables to prove that galaxies exist beyond the Milky Way.'
  },
  {
    id: 'brown-dwarf',
    name: 'Brown Dwarf',
    category: 'stars',
    type: 'Failed Star',
    description: 'Objects too big to be planets but too small to be stars!',
    longDescription: 'Brown dwarfs are cosmic "in-betweens" - too massive to be planets but not massive enough to sustain hydrogen fusion like true stars.',
    coolFact: 'Some brown dwarfs are cooler than a campfire!',
    extendedFacts: [
      'Brown dwarfs are between 13 and 80 times Jupiter\'s mass',
      'They glow from the heat of their formation',
      'The closest brown dwarfs are about 6 light-years away',
      'Brown dwarfs can have weather patterns like planets'
    ],
    metric: 'Warm',
    metricLabel: 'Temperature',
    icon: '🟤',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'Brown dwarfs occupy the fuzzy boundary between stars and planets. They form like stars, from collapsing gas clouds, but don\'t have enough mass to sustain hydrogen fusion in their cores like true stars. They do fuse deuterium (heavy hydrogen) briefly, but eventually just cool down over billions of years. Some brown dwarfs are so cool they have weather - clouds of iron droplets and silicate dust swirling in their atmospheres!'
  },
  // Nebulas
  {
    id: 'orion-nebula',
    name: 'Orion Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'A colorful star nursery you can see without a telescope!',
    longDescription: 'The Orion Nebula is a giant cloud of gas where new stars are being born. It\'s one of the brightest nebulas and you can spot it in the night sky!',
    coolFact: 'The Orion Nebula is 1,344 light-years away!',
    extendedFacts: [
      'The nebula is about 24 light-years across',
      'It contains thousands of young stars',
      'The nebula appears as a fuzzy star in Orion\'s sword',
      'The Hubble Space Telescope has taken stunning images of it'
    ],
    metric: 'Bright',
    metricLabel: 'Visibility',
    icon: '🌌',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Orion Nebula (M42) is one of the most studied and photographed objects in the night sky. Located about 1,344 light-years away, it\'s the nearest star-forming region to Earth and is visible to the naked eye as a fuzzy patch in Orion\'s sword. Inside this cosmic cloud, young stars are being born from collapsing pockets of gas and dust. The nebula glows because intense ultraviolet light from newborn stars causes the hydrogen gas to fluoresce.'
  },
  {
    id: 'eagle-nebula',
    name: 'Eagle Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'Home to the famous "Pillars of Creation"!',
    longDescription: 'The Eagle Nebula contains tall columns of gas and dust where new stars are forming. The Hubble Space Telescope took a famous photo of its "Pillars of Creation"!',
    coolFact: 'The pillars are 5 light-years tall!',
    extendedFacts: [
      'The Eagle Nebula is about 7,000 light-years away',
      'New stars are being born inside the pillars',
      'The nebula is about 70 light-years across',
      'The pillars may already be destroyed by a nearby supernova'
    ],
    metric: 'Massive',
    metricLabel: 'Size',
    icon: '🦅',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The Eagle Nebula is famous for containing the "Pillars of Creation" - towering columns of gas and dust photographed by the Hubble Space Telescope in 1995. These pillars, up to 5 light-years tall, are stellar nurseries where new stars are actively forming. Intense radiation from nearby young stars is slowly eroding the pillars, sculpting them into their iconic shapes. Evidence suggests a supernova explosion may have already destroyed the pillars, but we won\'t see this for another 1,000 years due to the light travel time.'
  },
  {
    id: 'crab-nebula',
    name: 'Crab Nebula',
    category: 'nebulas',
    type: 'Supernova Remnant',
    description: 'The glowing remains of an exploded star!',
    longDescription: 'The Crab Nebula is what\'s left after a star exploded as a supernova in 1054 AD. People on Earth could see it during the day!',
    coolFact: 'Ancient Chinese astronomers recorded this supernova!',
    extendedFacts: [
      'The nebula is about 11 light-years across',
      'A pulsar spins 30 times per second at its center',
      'The nebula is still expanding at 1,500 km/s',
      'Native Americans may have recorded the supernova in rock art'
    ],
    metric: 'Historic',
    metricLabel: 'Age',
    icon: '🦀',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Crab Nebula is the expanding remnant of a supernova that exploded in 1054 AD - an event witnessed and recorded by Chinese astronomers and possibly others around the world. For weeks, the explosion was visible during the day. At the heart of the nebula lies a pulsar - a rapidly spinning neutron star rotating 30 times per second. This pulsar acts like a cosmic dynamo, energizing the nebula and keeping it glowing nearly a thousand years after the explosion.'
  },
  {
    id: 'ring-nebula',
    name: 'Ring Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'A beautiful cosmic donut in space!',
    longDescription: 'The Ring Nebula looks like a colorful donut or ring in space. It\'s a shell of gas puffed out by a dying star at its center.',
    coolFact: 'The Ring Nebula is expanding at 43,000 miles per hour!',
    extendedFacts: [
      'The nebula is about 2,300 light-years away',
      'The central star is a white dwarf',
      'The "ring" is actually a barrel shape seen end-on',
      'The nebula formed about 4,000 years ago'
    ],
    metric: 'Ring-shaped',
    metricLabel: 'Shape',
    icon: '🍩',
    color: 'galaxy',
    distance: 'far',
    readMoreContent: 'The Ring Nebula (M57) is one of the best-known planetary nebulas - shells of gas expelled by Sun-like stars in their final stages of life. Despite its name, it\'s actually shaped more like a barrel or cylinder that we\'re looking at from one end. The dying star at its center has shrunk to become a white dwarf. About 4,000 years ago, this star shed its outer layers, creating the colorful ring we see today. In a few billion years, our Sun will create a similar nebula.'
  },
  {
    id: 'horsehead-nebula',
    name: 'Horsehead Nebula',
    category: 'nebulas',
    type: 'Dark Nebula',
    description: 'A dark cloud shaped like a horse\'s head!',
    longDescription: 'The Horsehead Nebula is a dark cloud of dust shaped exactly like a horse\'s head. It blocks light from the bright nebula behind it.',
    coolFact: 'It takes light 1,500 years to reach us from the Horsehead Nebula!',
    extendedFacts: [
      'The Horsehead is about 3.5 light-years tall',
      'It\'s located in the constellation Orion',
      'The shape will eventually change as the dust disperses',
      'Infrared telescopes can see through the dust to stars inside'
    ],
    metric: 'Dark',
    metricLabel: 'Brightness',
    icon: '🐴',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'The Horsehead Nebula is one of the most recognizable objects in astronomy, appearing as a dark silhouette against a glowing background of hydrogen gas. This dark nebula is a dense cloud of gas and dust that blocks light from the emission nebula behind it. The distinctive horse-head shape is sculpted by radiation from nearby stars. Deep within this dark cloud, new stars are forming, hidden from view but detectable by infrared telescopes that can peer through the dust.'
  },
  {
    id: 'helix-nebula',
    name: 'Helix Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'The "Eye of God" - a giant cosmic eye watching the universe!',
    longDescription: 'The Helix Nebula looks like a giant eye staring at us from space. It\'s one of the closest planetary nebulas to Earth.',
    coolFact: 'The Helix Nebula is sometimes called the "Eye of God"!',
    extendedFacts: [
      'It\'s only about 700 light-years away - very close for a nebula',
      'The nebula is about 5 light-years across',
      'A hot white dwarf sits at the center',
      'It shows what our Sun might look like in 5 billion years'
    ],
    metric: 'Close',
    metricLabel: 'Distance',
    icon: '👁️',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Helix Nebula is one of the closest and brightest planetary nebulas, located about 700 light-years away. Its appearance has earned it the nickname "Eye of God." This nebula shows us a preview of our own Sun\'s fate - in about 5 billion years, the Sun will shed its outer layers to create a similar structure. At the center is an incredibly hot white dwarf star, the exposed core of what was once a Sun-like star.'
  },
  {
    id: 'cat-eye-nebula',
    name: 'Cat\'s Eye Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'A complex, beautiful nebula with intricate structures!',
    longDescription: 'The Cat\'s Eye Nebula is one of the most complex planetary nebulas known, with intricate rings, jets, and shells of gas.',
    coolFact: 'The Cat\'s Eye has 11 or more concentric shells of gas!',
    extendedFacts: [
      'The nebula is about 3,000 light-years away',
      'Jets of gas shoot out at over 1 million mph',
      'The central star may be a binary system',
      'The complex structure is still not fully understood'
    ],
    metric: 'Complex',
    metricLabel: 'Structure',
    icon: '🐱',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Cat\'s Eye Nebula (NGC 6543) is one of the most structurally complex nebulas known. Unlike the simple spherical shells expected from a dying star, it shows intricate patterns of rings, jets, and knots of gas that have puzzled astronomers for decades. The leading theory is that the central star has an unseen companion, and their orbital dance shapes the ejected gas into these complex patterns. Hubble images reveal at least 11 concentric shells of gas.'
  },
  {
    id: 'tarantula-nebula',
    name: 'Tarantula Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'The largest, brightest star-forming region in our cosmic neighborhood!',
    longDescription: 'The Tarantula Nebula is in a nearby galaxy and is so bright that if it were as close as the Orion Nebula, it would cast shadows on Earth!',
    coolFact: 'The Tarantula Nebula contains some of the most massive stars known!',
    extendedFacts: [
      'It\'s located in the Large Magellanic Cloud galaxy',
      'The nebula is about 600 light-years across',
      'It contains stars over 100 times the Sun\'s mass',
      'If it were 1,500 light-years away, it would cover half the sky'
    ],
    metric: 'Enormous',
    metricLabel: 'Size',
    icon: '🕷️',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Tarantula Nebula (30 Doradus) is the most active star-forming region in the Local Group of galaxies. Located in the Large Magellanic Cloud, a satellite galaxy of the Milky Way, it contains some of the most massive and luminous stars known. The nebula is so bright that if it were as close as the Orion Nebula, it would cast visible shadows on Earth and cover nearly half the sky! It provides a spectacular example of starburst activity.'
  },
  {
    id: 'butterfly-nebula',
    name: 'Butterfly Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'A stunning nebula shaped like a butterfly\'s wings!',
    longDescription: 'The Butterfly Nebula has two beautiful "wings" of gas spreading from a dying star. The star at its center is one of the hottest known!',
    coolFact: 'The central star is about 200,000°C - one of the hottest known!',
    extendedFacts: [
      'The nebula is about 3,800 light-years away',
      'The wings span about 3 light-years',
      'Gas in the wings travels at over 600,000 mph',
      'A dense disk of dust hides the central star'
    ],
    metric: 'Elegant',
    metricLabel: 'Shape',
    icon: '🦋',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The Butterfly Nebula (NGC 6302) is one of the most beautiful and complex planetary nebulas. Its distinctive butterfly shape comes from a dense disk of dust around the dying star\'s equator, which channels the ejected gas into two lobes or "wings." The central star is one of the hottest known, with a temperature around 200,000°C - but it\'s hidden behind the dusty disk. The wings contain gas expanding at over 600,000 mph, sculpted into intricate structures.'
  },
  // Galaxies
  {
    id: 'milky-way',
    name: 'Milky Way',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'Our home galaxy with hundreds of billions of stars!',
    longDescription: 'The Milky Way is our home galaxy - a giant spiral of stars, planets, and cosmic dust. Our solar system is located in one of its spiral arms!',
    coolFact: 'It takes 230 million years for our solar system to orbit the galaxy once!',
    extendedFacts: [
      'The Milky Way contains 100-400 billion stars',
      'Our galaxy is about 100,000 light-years across',
      'A supermassive black hole sits at the center',
      'We\'re in the Orion Arm, about 26,000 light-years from the center'
    ],
    metric: 'Home',
    metricLabel: 'Location',
    icon: '🌌',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'The Milky Way is our cosmic home - a barred spiral galaxy containing between 100 and 400 billion stars. Our solar system sits in one of the spiral arms, about 26,000 light-years from the galactic center, where a supermassive black hole called Sagittarius A* lurks. The galaxy is about 100,000 light-years across, and it takes our solar system about 230 million years to complete one orbit around the center - a period sometimes called a "galactic year."'
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'Our nearest big neighbor - and it\'s heading our way!',
    longDescription: 'Andromeda is the closest large galaxy to the Milky Way. In about 4.5 billion years, it will collide and merge with our galaxy!',
    coolFact: 'You can see Andromeda with your naked eye on a dark night!',
    extendedFacts: [
      'Andromeda contains about 1 trillion stars',
      'It\'s about 2.5 million light-years away',
      'Andromeda is approaching us at about 110 km/s',
      'The collision will create a new galaxy nicknamed "Milkdromeda"'
    ],
    metric: 'Approaching',
    metricLabel: 'Movement',
    icon: '🔭',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The Andromeda Galaxy (M31) is the nearest large galaxy to the Milky Way and the most distant object visible to the naked eye. It\'s a spiral galaxy similar to our own but somewhat larger, containing about 1 trillion stars. Andromeda is approaching us at about 110 kilometers per second, and in about 4.5 billion years, it will collide with the Milky Way. The collision will be gradual and will eventually merge both galaxies into a larger elliptical galaxy.'
  },
  {
    id: 'sombrero-galaxy',
    name: 'Sombrero Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'A galaxy that looks like a Mexican hat!',
    longDescription: 'The Sombrero Galaxy has a bright core and a dark dust lane that makes it look just like a sombrero hat floating in space.',
    coolFact: 'The Sombrero Galaxy has 800 billion stars!',
    extendedFacts: [
      'It\'s about 28 million light-years away',
      'The dark dust lane is a ring of dust and gas',
      'A supermassive black hole at the center is 1 billion solar masses',
      'It was discovered in 1781'
    ],
    metric: 'Unique',
    metricLabel: 'Shape',
    icon: '🎩',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'The Sombrero Galaxy (M104) gets its name from its resemblance to a wide-brimmed Mexican hat. The bright central bulge is surrounded by a dark dust lane that makes the hat\'s "brim." This galaxy is home to a supermassive black hole with a mass of about 1 billion suns - one of the largest known. The Sombrero Galaxy contains about 2,000 globular clusters, far more than our Milky Way\'s 150-200.'
  },
  {
    id: 'whirlpool-galaxy',
    name: 'Whirlpool Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'A spinning spiral galaxy with a smaller friend!',
    longDescription: 'The Whirlpool Galaxy has beautiful spiral arms and is connected to a smaller galaxy. It was the first galaxy where spiral structure was discovered!',
    coolFact: 'The Whirlpool Galaxy is merging with its smaller companion!',
    extendedFacts: [
      'It\'s about 23 million light-years away',
      'The companion galaxy is called NGC 5195',
      'Lord Rosse discovered its spiral structure in 1845',
      'Gravitational interaction is triggering new star formation'
    ],
    metric: 'Spiraling',
    metricLabel: 'Motion',
    icon: '🌀',
    color: 'galaxy',
    distance: 'far',
    readMoreContent: 'The Whirlpool Galaxy (M51) is one of the most photogenic galaxies in the sky, with well-defined spiral arms and a small companion galaxy (NGC 5195) at the end of one arm. In 1845, Irish astronomer Lord Rosse was the first to recognize spiral structure in any galaxy when he observed the Whirlpool through his giant telescope. The gravitational interaction between the two galaxies is triggering waves of star formation, creating bright pink regions of new stars along the spiral arms.'
  },
  {
    id: 'triangulum-galaxy',
    name: 'Triangulum Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'The third-largest galaxy in our Local Group!',
    longDescription: 'The Triangulum Galaxy is a beautiful spiral galaxy and the third major member of our Local Group of galaxies, after Andromeda and the Milky Way.',
    coolFact: 'Triangulum might be a satellite of the Andromeda Galaxy!',
    extendedFacts: [
      'It\'s about 2.7 million light-years away',
      'Contains about 40 billion stars',
      'It has no central supermassive black hole detected',
      'One of the most distant objects visible to the naked eye'
    ],
    metric: 'Nearby',
    metricLabel: 'Distance',
    icon: '🔺',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Triangulum Galaxy (M33) is the third-largest galaxy in our Local Group, after Andromeda and the Milky Way. Unlike most spiral galaxies, Triangulum doesn\'t appear to have a supermassive black hole at its center. The galaxy is home to NGC 604, one of the largest known nebulas - a star-forming region about 40 times larger than the Orion Nebula. Triangulum may be gravitationally bound to Andromeda, making it a satellite galaxy.'
  },
  {
    id: 'large-magellanic-cloud',
    name: 'Large Magellanic Cloud',
    category: 'galaxies',
    type: 'Irregular Galaxy',
    description: 'A small galaxy orbiting the Milky Way!',
    longDescription: 'The Large Magellanic Cloud is a small irregular galaxy that orbits our Milky Way. It\'s visible to the naked eye from the Southern Hemisphere!',
    coolFact: 'A supernova visible to the naked eye occurred here in 1987!',
    extendedFacts: [
      'It\'s about 160,000 light-years away',
      'Contains about 30 billion stars',
      'Named after explorer Ferdinand Magellan',
      'The Tarantula Nebula is located here'
    ],
    metric: 'Satellite',
    metricLabel: 'Type',
    icon: '☁️',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'The Large Magellanic Cloud (LMC) is a satellite galaxy of the Milky Way, visible as a faint cloud in the Southern Hemisphere sky. In 1987, a supernova (SN 1987A) exploded in the LMC - the closest observed supernova since the invention of the telescope. The LMC contains the Tarantula Nebula, the most active star-forming region in the Local Group. The galaxy is being slowly torn apart by the Milky Way\'s gravity and will eventually merge with our galaxy.'
  },
  {
    id: 'black-hole',
    name: 'Black Holes',
    category: 'galaxies',
    type: 'Space Phenomenon',
    description: 'Invisible giants with gravity so strong nothing escapes!',
    longDescription: 'Black holes are regions where gravity is so incredibly strong that not even light can escape. Many galaxies have supermassive black holes at their centers!',
    coolFact: 'Time moves slower near a black hole!',
    extendedFacts: [
      'Black holes form when massive stars collapse',
      'The boundary is called the event horizon',
      'Supermassive black holes can be billions of solar masses',
      'We got the first image of a black hole in 2019'
    ],
    metric: 'Invisible',
    metricLabel: 'Light',
    icon: '🕳️',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'Black holes are among the most mysterious objects in the universe. They form when massive stars collapse at the end of their lives, crushing matter into an infinitely small point called a singularity. The boundary around a black hole is called the event horizon - cross it, and nothing can escape, not even light. Supermassive black holes, millions to billions of times the mass of the Sun, lurk at the centers of most galaxies, including our own. In 2019, the Event Horizon Telescope captured the first direct image of a black hole.'
  },
  {
    id: 'quasar',
    name: 'Quasars',
    category: 'galaxies',
    type: 'Active Galactic Nucleus',
    description: 'The brightest objects in the universe powered by giant black holes!',
    longDescription: 'Quasars are incredibly bright objects powered by supermassive black holes gobbling up enormous amounts of matter. They outshine entire galaxies!',
    coolFact: 'Some quasars are brighter than 100 trillion suns!',
    extendedFacts: [
      'Quasars are some of the most distant objects we can see',
      'They were more common in the early universe',
      'The name comes from "quasi-stellar radio source"',
      'Material falling into the black hole heats up and glows'
    ],
    metric: 'Brightest',
    metricLabel: 'Luminosity',
    icon: '💡',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Quasars are the most luminous objects in the universe, powered by supermassive black holes actively consuming enormous amounts of matter. As material spirals into the black hole, it forms an accretion disk that heats up to extreme temperatures and radiates tremendous energy - sometimes outshining entire galaxies of hundreds of billions of stars! Quasars are mostly found in the distant universe, meaning we\'re seeing them as they were billions of years ago, when galaxies were young and their central black holes were more actively feeding.'
  },
  {
    id: 'exoplanet',
    name: 'Exoplanets',
    category: 'galaxies',
    type: 'Planet Type',
    description: 'Planets orbiting stars far beyond our solar system!',
    longDescription: 'Exoplanets are planets that orbit stars other than our Sun. Scientists have discovered thousands of them, and some might even have life!',
    coolFact: 'We\'ve discovered over 5,000 exoplanets so far!',
    extendedFacts: [
      'The first confirmed exoplanet was discovered in 1992',
      'Some exoplanets orbit in their star\'s habitable zone',
      'Hot Jupiters are giant planets orbiting very close to their stars',
      'The James Webb Space Telescope is studying exoplanet atmospheres'
    ],
    metric: 'Countless',
    metricLabel: 'Number',
    icon: '🪐',
    color: 'planet',
    distance: 'far',
    readMoreContent: 'Exoplanets are planets that orbit stars other than our Sun. The first confirmed exoplanet around a Sun-like star was discovered in 1995, and since then, over 5,000 exoplanets have been confirmed. Some orbit in the "habitable zone" where liquid water could exist on their surfaces. The James Webb Space Telescope is now studying exoplanet atmospheres, searching for signs of water, methane, and other molecules that could indicate habitability or even life.'
  },
  {
    id: 'elliptical-galaxy',
    name: 'Elliptical Galaxies',
    category: 'galaxies',
    type: 'Galaxy Type',
    description: 'Football-shaped galaxies made of old, red stars!',
    longDescription: 'Elliptical galaxies are shaped like stretched spheres and contain mostly old stars. The largest galaxies in the universe are giant ellipticals!',
    coolFact: 'The largest known galaxy is an elliptical with 100 trillion stars!',
    extendedFacts: [
      'Elliptical galaxies have little gas and dust',
      'They form from galaxy mergers over billions of years',
      'They range from nearly spherical to very elongated',
      'Giant ellipticals sit at the centers of galaxy clusters'
    ],
    metric: 'Smooth',
    metricLabel: 'Shape',
    icon: '🥚',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Elliptical galaxies are named for their elliptical (football-like) shapes. Unlike spiral galaxies with their organized arms, elliptical galaxies appear smooth and featureless, containing mostly old, red stars with little gas and dust for new star formation. They\'re thought to form when spiral galaxies collide and merge over billions of years. The largest known galaxies are giant ellipticals that can contain over 100 trillion stars and sit at the centers of massive galaxy clusters.'
  },
  {
    id: 'galaxy-cluster',
    name: 'Galaxy Clusters',
    category: 'galaxies',
    type: 'Large Structure',
    description: 'Massive groups of hundreds to thousands of galaxies!',
    longDescription: 'Galaxy clusters are enormous collections of galaxies held together by gravity. They are the largest structures in the universe bound by gravity!',
    coolFact: 'Galaxy clusters can contain enough mass to bend light!',
    extendedFacts: [
      'Clusters contain hundreds to thousands of galaxies',
      'Hot gas between galaxies emits X-rays',
      'Dark matter makes up most of a cluster\'s mass',
      'The Virgo Cluster is the nearest large galaxy cluster to us'
    ],
    metric: 'Enormous',
    metricLabel: 'Scale',
    icon: '🌐',
    color: 'galaxy',
    distance: 'far',
    readMoreContent: 'Galaxy clusters are the largest gravitationally bound structures in the universe, containing hundreds to thousands of galaxies spanning millions of light-years. The galaxies themselves make up only about 2% of a cluster\'s mass - hot gas between galaxies accounts for about 13%, and mysterious dark matter makes up the remaining 85%. Clusters are so massive that they bend light from more distant objects behind them, acting as cosmic magnifying glasses called gravitational lenses.'
  },
  {
    id: 'pulsar',
    name: 'Pulsars',
    category: 'stars',
    type: 'Neutron Star',
    description: 'Rapidly spinning neutron stars that pulse like cosmic lighthouses!',
    longDescription: 'Pulsars are neutron stars that emit beams of radiation from their magnetic poles. As they spin, these beams sweep across space like lighthouse beams!',
    coolFact: 'Some pulsars spin hundreds of times per second!',
    extendedFacts: [
      'The first pulsar was discovered in 1967',
      'Initially nicknamed "LGM" for "Little Green Men"',
      'Pulsars are incredibly precise timekeepers',
      'GPS-like systems could use pulsars for deep space navigation'
    ],
    metric: 'Precise',
    metricLabel: 'Timing',
    icon: '📡',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Pulsars are rapidly rotating neutron stars with extremely strong magnetic fields. They emit beams of electromagnetic radiation from their magnetic poles, which may not align with their rotational axis. As the star spins, these beams sweep across space like lighthouse beams. When a beam points toward Earth, we detect a pulse - hence the name "pulsar." Pulsars are incredibly precise cosmic clocks, keeping time as accurately as atomic clocks on Earth.'
  },
  // Additional Moons
  {
    id: 'io',
    name: 'Io',
    category: 'solar-system',
    type: 'Moon',
    description: 'Jupiter\'s volcanic moon with over 400 active volcanoes!',
    longDescription: 'Io is the most volcanically active body in our solar system. Its surface is constantly being reshaped by hundreds of erupting volcanoes!',
    coolFact: 'Io\'s volcanoes can shoot lava 300 miles into space!',
    extendedFacts: [
      'Io has over 400 active volcanoes',
      'The surface is covered in sulfur, giving it yellow and orange colors',
      'Io orbits Jupiter in just 1.77 Earth days',
      'Tidal heating from Jupiter\'s gravity powers the volcanoes'
    ],
    metric: 'Explosive',
    metricLabel: 'Activity',
    icon: '🌋',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Io is one of Jupiter\'s four largest moons and the most volcanically active body in our solar system. Its volcanism is caused by tidal heating - Jupiter\'s immense gravity stretches and squeezes Io as it orbits, generating tremendous internal heat. The surface is covered in colorful sulfur compounds from volcanic eruptions, creating a pizza-like appearance. Some of Io\'s volcanic plumes reach heights of 300 miles!'
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    category: 'solar-system',
    type: 'Moon',
    description: 'The largest moon in the solar system - bigger than Mercury!',
    longDescription: 'Ganymede is Jupiter\'s largest moon and the only moon known to have its own magnetic field. It\'s even bigger than the planet Mercury!',
    coolFact: 'Ganymede is the only moon with its own magnetic field!',
    extendedFacts: [
      'Ganymede is larger than Mercury',
      'It may have a subsurface ocean 100 miles deep',
      'Ganymede has both icy and rocky terrain',
      'The moon has a thin oxygen atmosphere'
    ],
    metric: 'Huge',
    metricLabel: 'Size',
    icon: '🔵',
    color: 'planet',
    distance: 'near',
    readMoreContent: 'Ganymede is the largest moon in our solar system, bigger than the planet Mercury and 3/4 the size of Mars. It\'s the only moon known to generate its own magnetic field, likely from a liquid iron core. Scientists believe Ganymede has a vast underground ocean sandwiched between layers of ice, potentially containing more water than all of Earth\'s oceans combined. The ESA\'s JUICE mission will study Ganymede closely in the 2030s.'
  },
  {
    id: 'callisto',
    name: 'Callisto',
    category: 'solar-system',
    type: 'Moon',
    description: 'The most heavily cratered object in the solar system!',
    longDescription: 'Callisto is Jupiter\'s second-largest moon and one of the oldest surfaces we know of, covered in ancient craters from billions of years of impacts.',
    coolFact: 'Callisto\'s surface is about 4 billion years old - unchanged since the early solar system!',
    extendedFacts: [
      'Callisto is made of roughly equal parts rock and ice',
      'It may have a subsurface ocean',
      'Callisto has no tectonic or volcanic activity',
      'It\'s considered a good candidate for a future space base'
    ],
    metric: 'Ancient',
    metricLabel: 'Age',
    icon: '🌑',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Callisto is Jupiter\'s second-largest moon and has the most cratered surface in the solar system. Unlike its neighbor Io, Callisto is geologically dead, with no volcanic or tectonic activity. Its ancient surface has remained virtually unchanged for 4 billion years, making it a time capsule from the early solar system. Scientists have proposed Callisto as a potential base for future human exploration of Jupiter\'s moons because it\'s outside Jupiter\'s harmful radiation belts.'
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s icy moon that shoots water into space!',
    longDescription: 'Enceladus is one of the most exciting places in our solar system - it has geysers that spray water ice from a hidden ocean into space!',
    coolFact: 'Enceladus sprays water and organic molecules from geysers at its south pole!',
    extendedFacts: [
      'Enceladus has over 100 geysers at its south pole',
      'The moon has a global subsurface ocean',
      'Its sprayed material forms Saturn\'s E ring',
      'Scientists found organic molecules in the plumes'
    ],
    metric: 'Active',
    metricLabel: 'Geysers',
    icon: '💦',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Enceladus is a small, ice-covered moon of Saturn that has become one of the most promising places to search for extraterrestrial life. Dramatic geysers at its south pole spray water ice, salt, and organic molecules into space from a global subsurface ocean. This ocean is kept liquid by tidal heating and may have hydrothermal vents on its sea floor - similar to environments on Earth where life thrives without sunlight.'
  },
  {
    id: 'triton',
    name: 'Triton',
    category: 'solar-system',
    type: 'Moon',
    description: 'Neptune\'s largest moon that orbits backwards!',
    longDescription: 'Triton is Neptune\'s largest moon and is the only large moon that orbits in the opposite direction to its planet\'s rotation - it was likely captured from the Kuiper Belt!',
    coolFact: 'Triton is slowly spiraling toward Neptune and will eventually be torn apart!',
    extendedFacts: [
      'Triton orbits backwards (retrograde) around Neptune',
      'It has active nitrogen geysers',
      'Triton is the coldest known object in the solar system',
      'The moon was likely captured from the Kuiper Belt'
    ],
    metric: 'Freezing',
    metricLabel: 'Temperature',
    icon: '❄️',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Triton is Neptune\'s largest moon and one of the most unusual in our solar system. It orbits in the opposite direction to Neptune\'s rotation, suggesting it was captured from the Kuiper Belt. Triton is the coldest known object in the solar system at -235°C, yet it\'s geologically active with nitrogen geysers. Unfortunately, Triton is slowly spiraling inward and will be torn apart by Neptune\'s gravity in about 3.6 billion years.'
  },
  {
    id: 'charon',
    name: 'Charon',
    category: 'solar-system',
    type: 'Moon',
    description: 'Pluto\'s giant moon - almost a double dwarf planet system!',
    longDescription: 'Charon is so large compared to Pluto that they orbit around a point in space between them, making them almost like a double planet!',
    coolFact: 'Pluto and Charon always show the same face to each other!',
    extendedFacts: [
      'Charon is half the diameter of Pluto',
      'The pair are tidally locked to each other',
      'Charon has a reddish north pole from Pluto\'s atmosphere',
      'Charon has canyons, mountains, and evidence of past geological activity'
    ],
    metric: 'Binary',
    metricLabel: 'System',
    icon: '⚫',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'Charon is Pluto\'s largest moon and is so large relative to Pluto that the two are sometimes called a double dwarf planet system. They both orbit around a point in space between them called the barycenter. Charon\'s reddish polar cap comes from gases escaping Pluto\'s atmosphere that freeze onto Charon\'s cold north pole. NASA\'s New Horizons revealed a complex world with canyons, mountains, and evidence of past cryovolcanic activity.'
  },
  // Additional Asteroids and Comets
  {
    id: 'vesta',
    name: 'Vesta',
    category: 'solar-system',
    type: 'Asteroid',
    description: 'One of the largest asteroids with a giant mountain!',
    longDescription: 'Vesta is the second-largest asteroid in the asteroid belt and has a mountain nearly three times the height of Mount Everest!',
    coolFact: 'Vesta\'s south pole mountain is one of the tallest mountains in the solar system!',
    extendedFacts: [
      'Vesta was visited by NASA\'s Dawn spacecraft',
      'Pieces of Vesta have fallen to Earth as meteorites',
      'Vesta has layers like a planet (core, mantle, crust)',
      'The asteroid is about 525 km in diameter'
    ],
    metric: 'Tall',
    metricLabel: 'Mountain',
    icon: '⛰️',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Vesta is one of the largest objects in the asteroid belt and is sometimes called a protoplanet because it has a differentiated interior with a core, mantle, and crust like Earth. Its most dramatic feature is Rheasilvia, a massive impact crater with a central mountain nearly 22 km tall - almost three times the height of Mount Everest. Vesta\'s unique composition means we can identify meteorites that came from it.'
  },
  {
    id: 'bennu',
    name: 'Bennu',
    category: 'solar-system',
    type: 'Asteroid',
    description: 'A near-Earth asteroid that NASA collected samples from!',
    longDescription: 'Bennu is a small asteroid that passes close to Earth. NASA\'s OSIRIS-REx spacecraft collected samples from its surface and brought them back to Earth!',
    coolFact: 'Bennu has a small chance of hitting Earth in 2182!',
    extendedFacts: [
      'Bennu is only about 500 meters wide',
      'OSIRIS-REx collected samples in 2020',
      'The samples returned to Earth in 2023',
      'Bennu is made of carbon-rich material from the early solar system'
    ],
    metric: 'Sampled',
    metricLabel: 'Status',
    icon: '🪨',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Bennu is a carbon-rich asteroid that crosses Earth\'s orbit, making it a potentially hazardous object. NASA\'s OSIRIS-REx mission studied Bennu and collected a sample from its surface, which returned to Earth in September 2023. The sample contains pristine material from the early solar system that could help us understand how planets formed and how water and organic molecules arrived on Earth.'
  },
  {
    id: 'halley',
    name: 'Halley\'s Comet',
    category: 'solar-system',
    type: 'Comet',
    description: 'The most famous comet that returns every 76 years!',
    longDescription: 'Halley\'s Comet is the most famous comet in history. It has been observed for over 2,000 years and returns to pass by Earth about every 76 years!',
    coolFact: 'Halley\'s Comet will next be visible from Earth in 2061!',
    extendedFacts: [
      'Records of Halley\'s Comet go back to 240 BCE',
      'It was named after astronomer Edmond Halley',
      'The comet\'s nucleus is about 15 km long',
      'Multiple spacecraft visited it in 1986'
    ],
    metric: 'Historic',
    metricLabel: 'Fame',
    icon: '☄️',
    color: 'star',
    distance: 'near',
    readMoreContent: 'Halley\'s Comet is the most famous comet in human history, with recorded sightings going back over 2,000 years. Astronomer Edmond Halley realized in 1705 that sightings from 1531, 1607, and 1682 were all the same comet and predicted its return in 1758. The comet last visited in 1986, when several spacecraft flew past it, and will return in 2061. Its nucleus is shaped like a peanut and is about 15 km long.'
  },
  {
    id: 'neowise',
    name: 'Comet NEOWISE',
    category: 'solar-system',
    type: 'Comet',
    description: 'A spectacular comet visible to the naked eye in 2020!',
    longDescription: 'Comet NEOWISE was discovered in March 2020 and became the brightest comet visible from the Northern Hemisphere in over 20 years!',
    coolFact: 'NEOWISE won\'t return for another 6,800 years!',
    extendedFacts: [
      'NEOWISE was discovered by the NEOWISE space telescope',
      'Its nucleus is about 5 km across',
      'The comet was visible to the naked eye in July 2020',
      'NEOWISE has a very long orbital period'
    ],
    metric: 'Bright',
    metricLabel: 'Visibility',
    icon: '🌠',
    color: 'star',
    distance: 'near',
    readMoreContent: 'Comet NEOWISE (C/2020 F3) was discovered on March 27, 2020, by NASA\'s NEOWISE space telescope. It became the brightest comet visible from the Northern Hemisphere since Comet Hale-Bopp in 1997. During July 2020, it was visible to the naked eye, delighting millions of people who photographed it. The comet has an extremely long orbital period and won\'t return to the inner solar system for about 6,800 years.'
  },
  // Additional Stars
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    category: 'stars',
    type: 'Red Dwarf',
    description: 'The closest star to our solar system!',
    longDescription: 'Proxima Centauri is the closest star to our Sun, located about 4.24 light-years away. It has at least one planet in its habitable zone!',
    coolFact: 'Proxima Centauri has an Earth-sized planet in its habitable zone!',
    extendedFacts: [
      'It\'s about 4.24 light-years from Earth',
      'Proxima b orbits in the habitable zone',
      'The star is part of the Alpha Centauri system',
      'It\'s a red dwarf, much smaller and cooler than our Sun'
    ],
    metric: 'Nearest',
    metricLabel: 'Distance',
    icon: '⭐',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Proxima Centauri is the closest star to our solar system at about 4.24 light-years away. It\'s a small, cool red dwarf star, part of the Alpha Centauri triple star system. In 2016, astronomers discovered Proxima b, an Earth-sized planet orbiting in the star\'s habitable zone where liquid water could exist. However, Proxima Centauri is a flare star that produces powerful bursts of radiation that might make the planet inhospitable.'
  },
  {
    id: 'polaris',
    name: 'Polaris (North Star)',
    category: 'stars',
    type: 'Supergiant',
    description: 'The famous North Star used for navigation for centuries!',
    longDescription: 'Polaris, the North Star, appears to stay fixed in the sky as Earth rotates. Sailors and travelers have used it to find north for thousands of years!',
    coolFact: 'Polaris is actually a system of three stars!',
    extendedFacts: [
      'Polaris is about 433 light-years from Earth',
      'It\'s a Cepheid variable star that pulsates',
      'Polaris wasn\'t always the North Star due to Earth\'s wobble',
      'In about 12,000 years, Vega will be the North Star'
    ],
    metric: 'Guiding',
    metricLabel: 'Purpose',
    icon: '⭐',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Polaris, the North Star, has guided navigators for centuries because it appears almost stationary in the northern sky while other stars rotate around it. This is because it\'s located nearly directly above Earth\'s north pole. Polaris is actually a triple star system, with the main star being a yellow supergiant about 45 times larger than our Sun. Due to Earth\'s axial precession, different stars take turns being the "North Star" over a 26,000-year cycle.'
  },
  {
    id: 'rigel',
    name: 'Rigel',
    category: 'stars',
    type: 'Blue Supergiant',
    description: 'A brilliant blue star in the constellation Orion!',
    longDescription: 'Rigel is a blue supergiant star and the brightest star in the constellation Orion. It shines with the light of over 120,000 Suns!',
    coolFact: 'Rigel is so luminous it would outshine our Sun by 120,000 times!',
    extendedFacts: [
      'Rigel is about 860 light-years from Earth',
      'It\'s the seventh brightest star in the night sky',
      'Rigel is actually a multiple star system',
      'The star will likely end its life as a supernova'
    ],
    metric: 'Brilliant',
    metricLabel: 'Brightness',
    icon: '💎',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Rigel is a blue supergiant star marking the "foot" of the constellation Orion. Despite being about 860 light-years away, it\'s the seventh brightest star in our night sky because it\'s incredibly luminous - about 120,000 times brighter than our Sun. Rigel is a massive star, about 21 times the mass of our Sun, and is destined to explode as a supernova within the next few million years.'
  },
  {
    id: 'vega',
    name: 'Vega',
    category: 'stars',
    type: 'Main Sequence',
    description: 'One of the brightest stars and a future North Star!',
    longDescription: 'Vega is one of the brightest stars in our night sky and spins so fast it bulges at its equator. In about 12,000 years, it will become our North Star!',
    coolFact: 'Vega spins so fast it completes a rotation in just 12.5 hours!',
    extendedFacts: [
      'Vega is about 25 light-years from Earth',
      'It was the first star photographed (other than the Sun)',
      'Vega has a disk of debris around it',
      'It\'s part of the Summer Triangle asterism'
    ],
    metric: 'Spinning',
    metricLabel: 'Rotation',
    icon: '✨',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Vega is a brilliant blue-white star about 25 light-years away, making it one of the closest bright stars to Earth. It rotates extremely rapidly - once every 12.5 hours - which causes it to bulge at its equator. Vega was historically used as the standard star for calibrating brightness measurements. Due to Earth\'s axial precession, Vega was the North Star about 12,000 years ago and will be again in about 12,000 years.'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    category: 'stars',
    type: 'Red Giant',
    description: 'A bright orange giant racing through our galaxy!',
    longDescription: 'Arcturus is a red giant star and the brightest star in the northern celestial hemisphere. It\'s moving through space faster than most stars!',
    coolFact: 'Arcturus is zooming through space at 122 km per second!',
    extendedFacts: [
      'Arcturus is about 37 light-years from Earth',
      'It\'s 25 times the diameter of our Sun',
      'The star is about 7 billion years old',
      'Arcturus belongs to a different stellar population than our Sun'
    ],
    metric: 'Fast',
    metricLabel: 'Movement',
    icon: '🔶',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Arcturus is a red giant star about 37 light-years from Earth and the brightest star in the northern celestial hemisphere. It\'s particularly interesting because it\'s moving through space at 122 km per second relative to our solar system - much faster than typical stars. Arcturus is an older star from a different galactic population, passing through our region of the Milky Way. In about 4,000 years, its motion will make it significantly dimmer as it moves away from us.'
  },
  // Additional Nebulas
  {
    id: 'ring-nebula',
    name: 'Ring Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'A beautiful ring-shaped nebula from a dying star!',
    longDescription: 'The Ring Nebula is a famous planetary nebula that looks like a cosmic donut. It formed when a Sun-like star shed its outer layers at the end of its life.',
    coolFact: 'The Ring Nebula is expanding at 43,000 miles per hour!',
    extendedFacts: [
      'The Ring Nebula is about 2,300 light-years away',
      'It was discovered in 1779',
      'The nebula is about 1 light-year across',
      'The central star is becoming a white dwarf'
    ],
    metric: 'Expanding',
    metricLabel: 'Motion',
    icon: '⭕',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Ring Nebula (M57) is one of the most famous planetary nebulae, located in the constellation Lyra. It was formed when a Sun-like star exhausted its nuclear fuel and shed its outer layers into space, leaving behind a hot white dwarf at the center. The nebula\'s ring-like appearance is actually a barrel-shaped structure that we happen to be viewing end-on. Recent observations show the structure is much more complex than a simple ring.'
  },
  {
    id: 'cat-eye-nebula',
    name: 'Cat\'s Eye Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'One of the most complex nebulae ever seen!',
    longDescription: 'The Cat\'s Eye Nebula has an incredibly intricate structure with shells, jets, and knots that have puzzled astronomers for years.',
    coolFact: 'The Cat\'s Eye Nebula has at least 11 concentric shells!',
    extendedFacts: [
      'The nebula is about 3,000 light-years away',
      'It was one of the first planetary nebulae discovered',
      'The central star may be a binary system',
      'Complex jets and halos surround the main structure'
    ],
    metric: 'Complex',
    metricLabel: 'Structure',
    icon: '👁️',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Cat\'s Eye Nebula (NGC 6543) is one of the most structurally complex nebulae known. Its intricate pattern of concentric gas shells, high-speed jets, and unusual shock-induced knots have fascinated astronomers since the Hubble Space Telescope revealed its details. The central star is extremely hot and may actually be a binary star system, which could explain the nebula\'s unusual complexity.'
  },
  {
    id: 'lagoon-nebula',
    name: 'Lagoon Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'A giant stellar nursery visible to the naked eye!',
    longDescription: 'The Lagoon Nebula is one of the brightest and most beautiful star-forming regions in our galaxy. It\'s so bright you can see it without a telescope!',
    coolFact: 'The Lagoon Nebula contains a giant tornado-like structure 0.5 light-years long!',
    extendedFacts: [
      'The nebula is about 4,400 light-years away',
      'It spans about 110 by 50 light-years',
      'New stars are actively forming in the nebula',
      'The Lagoon was catalogued by Charles Messier in 1764'
    ],
    metric: 'Visible',
    metricLabel: 'Brightness',
    icon: '🌅',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Lagoon Nebula (M8) is one of the largest and brightest nebulae in the night sky, visible to the naked eye in the constellation Sagittarius. It\'s a stellar nursery where new stars are being born from clouds of hydrogen gas. The nebula gets its name from the dark lane of dust that crosses its center, giving it a lagoon-like appearance. At its core is the Hourglass Nebula, with a twisted funnel structure caused by stellar winds.'
  },
  {
    id: 'tarantula-nebula',
    name: 'Tarantula Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'The largest and most active star-forming region known!',
    longDescription: 'The Tarantula Nebula is the most active star-forming region in our local group of galaxies. It contains some of the most massive and luminous stars ever discovered!',
    coolFact: 'If the Tarantula Nebula were as close as Orion Nebula, it would cast shadows!',
    extendedFacts: [
      'Located in the Large Magellanic Cloud',
      'It\'s about 160,000 light-years away',
      'Contains the star cluster R136 with super-massive stars',
      'The nebula is about 1,000 light-years across'
    ],
    metric: 'Massive',
    metricLabel: 'Scale',
    icon: '🕷️',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Tarantula Nebula (30 Doradus) is the largest and most active star-forming region in our local group of galaxies. Located in the Large Magellanic Cloud, it\'s so luminous that if it were as close as the Orion Nebula, it would cast shadows on Earth! At its heart is the super star cluster R136, containing some of the most massive stars ever discovered - up to 200 times the mass of our Sun.'
  },
  // Additional Galaxies
  {
    id: 'triangulum',
    name: 'Triangulum Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'The third-largest galaxy in our Local Group!',
    longDescription: 'The Triangulum Galaxy is a beautiful spiral galaxy and the third-largest member of our Local Group, after Andromeda and the Milky Way.',
    coolFact: 'The Triangulum Galaxy is one of the most distant objects visible to the naked eye!',
    extendedFacts: [
      'Located about 2.7 million light-years away',
      'Contains about 40 billion stars',
      'It\'s approaching the Milky Way',
      'The galaxy hosts a giant star-forming region called NGC 604'
    ],
    metric: 'Distant',
    metricLabel: 'Location',
    icon: '🌀',
    color: 'galaxy',
    distance: 'far',
    readMoreContent: 'The Triangulum Galaxy (M33) is the third-largest galaxy in our Local Group and one of the most distant objects visible to the naked eye under dark skies. Located about 2.7 million light-years away, it\'s a face-on spiral galaxy that appears about twice the angular size of the full Moon in our sky. The Triangulum Galaxy hosts NGC 604, one of the largest known star-forming regions, about 40 times the size of the Orion Nebula.'
  },
  {
    id: 'sombrero',
    name: 'Sombrero Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'A galaxy that looks like a Mexican hat!',
    longDescription: 'The Sombrero Galaxy has a brilliant white core surrounded by a dark dust lane, giving it the appearance of a sombrero hat.',
    coolFact: 'The Sombrero Galaxy has an unusually large central bulge with billions of old stars!',
    extendedFacts: [
      'Located about 29 million light-years away',
      'Contains a supermassive black hole at its center',
      'The galaxy has about 2,000 globular clusters',
      'Its dark dust lane is a ring of dust and gas'
    ],
    metric: 'Iconic',
    metricLabel: 'Appearance',
    icon: '🎩',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'The Sombrero Galaxy (M104) is one of the most photogenic galaxies in the universe. Its brilliant white core, surrounded by a thick dark dust lane, creates the distinctive sombrero shape. The galaxy has an unusually large central bulge containing hundreds of billions of old stars and a supermassive black hole with a mass of a billion Suns. Unlike most spirals, the Sombrero also has an extensive system of about 2,000 globular clusters.'
  },
  {
    id: 'cartwheel',
    name: 'Cartwheel Galaxy',
    category: 'galaxies',
    type: 'Ring Galaxy',
    description: 'A galaxy shaped like a wagon wheel after a cosmic collision!',
    longDescription: 'The Cartwheel Galaxy got its unusual shape when a smaller galaxy crashed through its center, creating ripples like a stone dropped in water!',
    coolFact: 'The Cartwheel\'s ring is expanding outward at 200,000 miles per hour!',
    extendedFacts: [
      'Located about 500 million light-years away',
      'The collision happened about 200 million years ago',
      'The outer ring is full of newly formed stars',
      'Two smaller companion galaxies are nearby'
    ],
    metric: 'Collision',
    metricLabel: 'Origin',
    icon: '🎡',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Cartwheel Galaxy is a spectacular ring galaxy formed when a smaller galaxy punched through the center of a larger spiral galaxy about 200 million years ago. The collision sent shockwaves outward like ripples from a stone in a pond, triggering a ring of intense star formation. The James Webb Space Telescope revealed new details of this unusual galaxy, showing spokes of dust connecting the bright outer ring to the central core.'
  },
  {
    id: 'cigar-galaxy',
    name: 'Cigar Galaxy',
    category: 'galaxies',
    type: 'Starburst Galaxy',
    description: 'A galaxy exploding with new star formation!',
    longDescription: 'The Cigar Galaxy is undergoing a dramatic burst of star formation, creating new stars 10 times faster than normal galaxies!',
    coolFact: 'The Cigar Galaxy creates new stars 10 times faster than the Milky Way!',
    extendedFacts: [
      'Located about 12 million light-years away',
      'The starburst was triggered by its neighbor, M81',
      'Superwinds blow gas out of the galaxy',
      'It\'s one of the brightest infrared galaxies in the sky'
    ],
    metric: 'Explosive',
    metricLabel: 'Star Formation',
    icon: '💥',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Cigar Galaxy (M82) is a starburst galaxy undergoing an explosive burst of star formation, triggered by a close encounter with its neighbor, the larger spiral galaxy M81. New stars are forming 10 times faster than in the Milky Way, and powerful galactic superwinds are blowing gas and dust out of the galaxy\'s center. This intense activity makes the Cigar Galaxy one of the brightest galaxies at infrared wavelengths.'
  },
  // Other cosmic phenomena
  {
    id: 'magnetar',
    name: 'Magnetars',
    category: 'stars',
    type: 'Neutron Star',
    description: 'The strongest magnets in the universe!',
    longDescription: 'Magnetars are neutron stars with incredibly powerful magnetic fields - strong enough to erase a credit card from halfway across the solar system!',
    coolFact: 'A magnetar\'s magnetic field is a quadrillion times stronger than Earth\'s!',
    extendedFacts: [
      'Magnetars can release more energy in 0.1 seconds than the Sun does in 100,000 years',
      'Only about 30 magnetars are known',
      'Their crusts can crack, releasing massive bursts of energy',
      'Magnetars eventually become regular pulsars as their fields decay'
    ],
    metric: 'Extreme',
    metricLabel: 'Magnetism',
    icon: '🧲',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Magnetars are a type of neutron star with the most powerful magnetic fields in the universe - about a quadrillion times stronger than Earth\'s. These incredible magnetic fields can cause "starquakes" as the neutron star\'s crust shifts, releasing tremendous bursts of X-rays and gamma rays. A magnetar located halfway to the Moon would be strong enough to erase your credit card! Only about 30 magnetars are known, making them rare cosmic objects.'
  },
  {
    id: 'dark-matter',
    name: 'Dark Matter',
    category: 'other',
    type: 'Mysterious Matter',
    description: 'The invisible stuff that makes up most of the universe!',
    longDescription: 'Dark matter is a mysterious substance that doesn\'t emit light or energy. We can\'t see it, but we know it\'s there because of its gravitational effects on galaxies!',
    coolFact: 'Dark matter makes up about 27% of the universe, but we\'ve never directly detected it!',
    extendedFacts: [
      'Dark matter doesn\'t interact with light',
      'Galaxies wouldn\'t hold together without dark matter',
      'Scientists are trying to detect dark matter particles',
      'Dark matter forms a cosmic web connecting galaxies'
    ],
    metric: 'Invisible',
    metricLabel: 'Nature',
    icon: '👻',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'Dark matter is one of the greatest mysteries in astronomy. We know it exists because galaxies rotate too fast - they should fly apart without extra invisible mass holding them together. Dark matter makes up about 27% of the universe but has never been directly detected because it doesn\'t emit, absorb, or reflect light. Scientists believe dark matter particles pass through us constantly without interacting. Understanding dark matter is one of the biggest challenges in modern physics.'
  },
  {
    id: 'dark-energy',
    name: 'Dark Energy',
    category: 'other',
    type: 'Mysterious Force',
    description: 'The mysterious force accelerating the universe\'s expansion!',
    longDescription: 'Dark energy is a mysterious force causing the universe to expand faster and faster. It makes up about 68% of all the energy in the universe!',
    coolFact: 'Dark energy is pushing galaxies apart faster every second!',
    extendedFacts: [
      'Dark energy was discovered in 1998',
      'It makes up about 68% of the universe',
      'Dark energy causes the universe to accelerate its expansion',
      'Its true nature remains completely unknown'
    ],
    metric: 'Accelerating',
    metricLabel: 'Effect',
    icon: '🌌',
    color: 'galaxy',
    distance: 'far',
    readMoreContent: 'Dark energy is perhaps the biggest mystery in all of science. Discovered in 1998 when astronomers found that the universe\'s expansion is accelerating, dark energy makes up about 68% of all the energy in the universe. Unlike gravity, which pulls things together, dark energy acts as a repulsive force pushing space itself apart. As the universe ages, dark energy becomes more dominant, meaning distant galaxies are racing away from us faster and faster.'
  },
  {
    id: 'cosmic-web',
    name: 'Cosmic Web',
    category: 'other',
    type: 'Large Scale Structure',
    description: 'The giant web connecting all galaxies in the universe!',
    longDescription: 'The cosmic web is the largest structure in the universe - a network of galaxy clusters connected by filaments of gas and dark matter, surrounding vast empty voids.',
    coolFact: 'The cosmic web spans billions of light-years across the universe!',
    extendedFacts: [
      'Galaxy clusters form at the intersections of filaments',
      'Filaments can be hundreds of millions of light-years long',
      'Voids between filaments can be 100+ million light-years across',
      'The web structure is shaped primarily by dark matter'
    ],
    metric: 'Universal',
    metricLabel: 'Scale',
    icon: '🕸️',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The cosmic web is the largest known structure in the universe, a vast network of galaxy clusters and filaments separated by enormous voids. Galaxies are not randomly distributed but arranged along sheets and filaments of dark matter, like beads on strings. Where filaments intersect, massive galaxy clusters form. The largest voids between filaments can be over 100 million light-years across, nearly empty of galaxies. This structure emerged from tiny density variations in the early universe.'
  },
  // Additional Moons
  {
    id: 'miranda',
    name: 'Miranda',
    category: 'solar-system',
    type: 'Moon',
    description: 'Uranus\'s bizarre moon with the tallest cliff in the solar system!',
    longDescription: 'Miranda is a small moon of Uranus with one of the most jumbled surfaces ever seen - including Verona Rupes, a cliff over 20 km tall!',
    coolFact: 'A fall from Miranda\'s giant cliff would take 12 minutes!',
    extendedFacts: [
      'Miranda is only 470 km across',
      'Its surface looks like it was reassembled from pieces',
      'Miranda may have been shattered and reformed',
      'Voyager 2 is the only spacecraft to have visited'
    ],
    metric: 'Extreme',
    metricLabel: 'Terrain',
    icon: '🗻',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Miranda is the smallest and innermost of Uranus\'s five major moons. Its surface is a chaotic jumble of different terrain types that don\'t seem to fit together - including coronae (oval-shaped features), canyons, and the towering Verona Rupes cliff. Scientists think Miranda may have been shattered by a giant impact and then re-formed, explaining its patchwork appearance. Due to the low gravity, an object falling from Verona Rupes would take about 12 minutes to hit the ground!'
  },
  {
    id: 'mimas',
    name: 'Mimas',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s "Death Star" moon with a giant crater!',
    longDescription: 'Mimas is famous for its giant Herschel crater that makes it look like the Death Star from Star Wars!',
    coolFact: 'The Herschel crater is almost one-third of Mimas\'s diameter!',
    extendedFacts: [
      'Mimas is only about 400 km across',
      'The impact that made Herschel nearly destroyed Mimas',
      'Mimas creates a gap in Saturn\'s rings',
      'Mimas may have a hidden ocean under its surface'
    ],
    metric: 'Iconic',
    metricLabel: 'Appearance',
    icon: '💀',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Mimas is one of Saturn\'s innermost moons and is famous for its resemblance to the Death Star from Star Wars. The giant Herschel crater dominates its surface - spanning 130 km across and 10 km deep. The impact that created this crater nearly shattered Mimas entirely! Recent data suggests Mimas might have a subsurface ocean, which would be surprising given its cold, cratered appearance.'
  },
  {
    id: 'dione',
    name: 'Dione',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s moon with mysterious bright ice cliffs!',
    longDescription: 'Dione is a medium-sized moon of Saturn with brilliant white ice cliffs and a possible hidden ocean beneath its frozen surface.',
    coolFact: 'Dione has ice cliffs hundreds of meters tall!',
    extendedFacts: [
      'Dione is about 1,120 km across',
      'Bright ice cliffs called "chasmata" cross its surface',
      'Dione may have weak geological activity',
      'It has a thin oxygen atmosphere'
    ],
    metric: 'Icy',
    metricLabel: 'Surface',
    icon: '🧊',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Dione is Saturn\'s fourth-largest moon, featuring a heavily cratered surface crisscrossed by bright ice cliffs called chasmata. These bright streaks are fractures in the crust where fresh ice has been exposed. Scientists believe Dione may have a subsurface liquid ocean similar to Enceladus, though less active. The moon also has an extremely thin oxygen atmosphere created by solar radiation hitting the ice.'
  },
  {
    id: 'tethys',
    name: 'Tethys',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s icy moon with a giant canyon!',
    longDescription: 'Tethys is made almost entirely of water ice and has a massive canyon called Ithaca Chasma that stretches 2,000 km across its surface!',
    coolFact: 'Ithaca Chasma is up to 100 km wide and several km deep!',
    extendedFacts: [
      'Tethys is about 1,060 km across',
      'It has one of the lowest densities of any moon',
      'Tethys is almost pure water ice',
      'The Odysseus crater spans 400 km'
    ],
    metric: 'Frozen',
    metricLabel: 'Composition',
    icon: '❄️',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Tethys is one of Saturn\'s larger moons and is composed almost entirely of water ice. Its most prominent feature is Ithaca Chasma, a massive canyon system stretching 2,000 km across the moon - about three-quarters of Tethys\'s circumference. The canyon may have formed when the moon\'s interior froze and expanded, cracking the surface. Tethys also has a giant impact crater called Odysseus that spans 400 km.'
  },
  {
    id: 'oberon',
    name: 'Oberon',
    category: 'solar-system',
    type: 'Moon',
    description: 'Uranus\'s outermost major moon with dark crater floors!',
    longDescription: 'Oberon is the outermost of Uranus\'s five major moons, covered in craters with mysteriously dark material on their floors.',
    coolFact: 'Some of Oberon\'s craters have dark floors from ancient cryovolcanism!',
    extendedFacts: [
      'Oberon is about 1,520 km across',
      'Named after the King of Fairies in Shakespeare',
      'Dark material may be carbon-rich compounds',
      'Mountains up to 6 km tall have been spotted'
    ],
    metric: 'Ancient',
    metricLabel: 'Surface',
    icon: '🌑',
    color: 'muted',
    distance: 'near',
    readMoreContent: 'Oberon is the outermost of Uranus\'s five major moons and the second-largest. Its surface is heavily cratered, with some craters having unusually dark floors that may contain carbon-rich material or evidence of past cryovolcanism. Voyager 2 spotted a mountain about 6 km tall on Oberon\'s limb. Like all of Uranus\'s moons, Oberon is named after a character from Shakespeare - the King of the Fairies from A Midsummer Night\'s Dream.'
  },
  {
    id: 'rhea',
    name: 'Rhea',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s second-largest moon that might have rings!',
    longDescription: 'Rhea is Saturn\'s second-largest moon and may be the only moon in the solar system with its own ring system!',
    coolFact: 'Rhea might be the only moon with its own rings!',
    extendedFacts: [
      'Rhea is about 1,530 km across',
      'Evidence suggests a possible debris ring around Rhea',
      'Rhea is mostly water ice',
      'Has a very thin atmosphere of oxygen and carbon dioxide'
    ],
    metric: 'Ringed',
    metricLabel: 'Feature',
    icon: '💍',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Rhea is Saturn\'s second-largest moon after Titan. In 2008, the Cassini spacecraft detected possible evidence of a debris ring around Rhea, which would make it the only moon known to have rings. Rhea is made mostly of water ice with a small rocky core and has a very thin atmosphere containing oxygen and carbon dioxide produced by radiation hitting the surface ice.'
  },
  // Additional Star Types
  {
    id: 'wolf-rayet',
    name: 'Wolf-Rayet Stars',
    category: 'stars',
    type: 'Massive Star',
    description: 'Super-hot massive stars with powerful stellar winds!',
    longDescription: 'Wolf-Rayet stars are among the hottest and most massive stars, with temperatures over 100,000°C and winds that strip away their outer layers!',
    coolFact: 'Wolf-Rayet winds can travel at 2,000 km per second!',
    extendedFacts: [
      'Surface temperatures exceed 100,000°C',
      'They lose mass equivalent to Earth every year',
      'Wolf-Rayet stars are destined to explode as supernovae',
      'Only about 500 are known in our galaxy'
    ],
    metric: 'Extreme',
    metricLabel: 'Temperature',
    icon: '🔥',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Wolf-Rayet stars are extremely hot, massive stars in a brief but spectacular phase of stellar evolution. With surface temperatures exceeding 100,000°C, they are among the hottest stars known. Powerful stellar winds blow material off these stars at speeds up to 2,000 km per second, creating beautiful surrounding nebulae. These stars are doomed to explode as powerful supernovae, possibly producing gamma-ray bursts.'
  },
  {
    id: 't-tauri',
    name: 'T Tauri Stars',
    category: 'stars',
    type: 'Young Star',
    description: 'Baby stars still forming from clouds of gas!',
    longDescription: 'T Tauri stars are young stars less than 10 million years old that haven\'t yet started fusing hydrogen. They\'re surrounded by disks where planets may be forming!',
    coolFact: 'T Tauri stars are still contracting and will eventually become stars like our Sun!',
    extendedFacts: [
      'T Tauri stars are less than 10 million years old',
      'They vary in brightness as material falls onto them',
      'Surrounded by protoplanetary disks',
      'Our Sun was once a T Tauri star'
    ],
    metric: 'Young',
    metricLabel: 'Age',
    icon: '👶',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'T Tauri stars are very young stars in the process of forming. They haven\'t yet reached the temperature and pressure needed to fuse hydrogen in their cores. These baby stars are typically surrounded by disks of gas and dust where planets are forming. T Tauri stars vary in brightness as clumps of material fall onto their surfaces. Our own Sun went through a T Tauri phase about 4.6 billion years ago before settling into stable hydrogen fusion.'
  },
  {
    id: 'hypergiant',
    name: 'Hypergiants',
    category: 'stars',
    type: 'Extreme Star',
    description: 'The largest and most luminous stars in the universe!',
    longDescription: 'Hypergiants are the most massive and luminous stars known, so large that if placed in our solar system, they would engulf Jupiter\'s orbit!',
    coolFact: 'Some hypergiants are over 1,500 times the size of our Sun!',
    extendedFacts: [
      'UY Scuti and Stephenson 2-18 are among the largest known',
      'Hypergiants can be millions of times brighter than the Sun',
      'They live only a few million years',
      'Hypergiants are extremely unstable and variable'
    ],
    metric: 'Colossal',
    metricLabel: 'Size',
    icon: '🌟',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Hypergiants are the largest and most luminous stars in the universe. Stars like UY Scuti and Stephenson 2-18 are over 1,500 times the diameter of our Sun - so large that light takes hours to travel around them! Despite their enormous size, hypergiants have short, unstable lives lasting only a few million years before exploding as supernovae. Their extreme luminosity makes them visible across vast cosmic distances.'
  },
  // Additional Cosmic Objects
  {
    id: 'bootes-void',
    name: 'Boötes Void',
    category: 'other',
    type: 'Cosmic Void',
    description: 'A mysterious region of space with almost no galaxies!',
    longDescription: 'The Boötes Void is a nearly spherical region of space about 330 million light-years across that contains almost no galaxies - one of the emptiest places known!',
    coolFact: 'The Boötes Void contains only about 60 galaxies when it should have 2,000!',
    extendedFacts: [
      'Also called the Great Void',
      'It\'s about 700 million light-years away',
      'Scientists still don\'t fully understand why it\'s so empty',
      'If we lived in the center, we wouldn\'t have known about other galaxies until the 1960s'
    ],
    metric: 'Empty',
    metricLabel: 'Density',
    icon: '⚫',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'The Boötes Void is one of the largest known voids in the universe - a roughly spherical region about 330 million light-years across that is nearly empty of galaxies. While it contains about 60 known galaxies, a region this size should contain around 2,000. If Earth were located in the center of the Boötes Void, we would have had no idea other galaxies existed until the 1960s when advanced telescopes were developed!'
  },
  {
    id: 'great-attractor',
    name: 'Great Attractor',
    category: 'other',
    type: 'Gravitational Anomaly',
    description: 'A mysterious gravity source pulling thousands of galaxies!',
    longDescription: 'The Great Attractor is a gravitational anomaly pulling the Milky Way and thousands of other galaxies toward it at millions of miles per hour!',
    coolFact: 'The Milky Way is being pulled toward the Great Attractor at 1.4 million mph!',
    extendedFacts: [
      'Located about 250 million light-years away',
      'Hidden behind the Zone of Avoidance (Milky Way\'s disk)',
      'It\'s pulling on thousands of galaxies',
      'May be part of an even larger structure called Laniakea'
    ],
    metric: 'Powerful',
    metricLabel: 'Gravity',
    icon: '🌀',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Great Attractor is a gravitational anomaly located about 250 million light-years away that\'s pulling the Milky Way and thousands of other galaxies toward it. It\'s difficult to observe because it lies behind the densest part of the Milky Way (the "Zone of Avoidance"). Recent studies show the Great Attractor is part of a much larger cosmic structure called Laniakea, a supercluster containing 100,000 galaxies spanning 520 million light-years.'
  },
  {
    id: 'pillars-creation',
    name: 'Pillars of Creation',
    category: 'nebulas',
    type: 'Stellar Nursery',
    description: 'Famous towers of gas and dust where stars are born!',
    longDescription: 'The Pillars of Creation are towering columns of cosmic gas and dust in the Eagle Nebula, made famous by one of the most iconic Hubble images ever taken!',
    coolFact: 'The tallest pillar is about 4 light-years tall!',
    extendedFacts: [
      'Located in the Eagle Nebula, 6,500 light-years away',
      'First photographed by Hubble in 1995',
      'New stars are forming inside the pillars',
      'The pillars may have already been destroyed by a supernova'
    ],
    metric: 'Iconic',
    metricLabel: 'Fame',
    icon: '🏛️',
    color: 'nebula',
    distance: 'far',
    readMoreContent: 'The Pillars of Creation are elephant trunk-like columns of interstellar gas and dust in the Eagle Nebula, about 6,500 light-years from Earth. The iconic 1995 Hubble image made them one of the most famous astronomical objects. These pillars are stellar nurseries where new stars are being born. Interestingly, infrared observations suggest a supernova may have already destroyed the pillars, but because of the distance, we won\'t see the destruction for another 1,000 years!'
  },
  {
    id: 'horsehead-nebula',
    name: 'Horsehead Nebula',
    category: 'nebulas',
    type: 'Dark Nebula',
    description: 'A famous dark nebula shaped like a horse\'s head!',
    longDescription: 'The Horsehead Nebula is one of the most recognizable objects in the sky - a dark cloud of gas and dust silhouetted against a bright emission nebula!',
    coolFact: 'The Horsehead Nebula is slowly being eroded by nearby hot stars!',
    extendedFacts: [
      'Located about 1,375 light-years away in Orion',
      'The "head" is about 3.5 light-years tall',
      'First recorded in 1888',
      'Will eventually be destroyed by radiation in about 5 million years'
    ],
    metric: 'Striking',
    metricLabel: 'Appearance',
    icon: '🐴',
    color: 'foreground',
    distance: 'far',
    readMoreContent: 'The Horsehead Nebula is one of the most photographed objects in the night sky. It\'s a dark nebula - a cloud of cold gas and dust so dense that it blocks light from behind. Silhouetted against the bright emission nebula IC 434, it creates the distinctive horse-head shape. The nebula is being slowly eroded by intense ultraviolet radiation from the nearby star Sigma Orionis and will eventually disappear in about 5 million years.'
  },
  {
    id: 'stellar-stream',
    name: 'Stellar Streams',
    category: 'other',
    type: 'Galactic Structure',
    description: 'Rivers of stars torn from dwarf galaxies!',
    longDescription: 'Stellar streams are elongated groups of stars that were once part of dwarf galaxies or star clusters, stretched out by our galaxy\'s gravity!',
    coolFact: 'The Milky Way has consumed over 50 smaller galaxies, leaving stellar streams behind!',
    extendedFacts: [
      'Stellar streams can stretch across thousands of light-years',
      'They reveal the Milky Way\'s gravitational history',
      'The Sagittarius Stream wraps around our galaxy',
      'Gaia spacecraft has discovered many new stellar streams'
    ],
    metric: 'Stretched',
    metricLabel: 'Shape',
    icon: '🌊',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Stellar streams are elongated structures of stars that were once part of dwarf galaxies or globular clusters, stretched out like taffy by the Milky Way\'s gravitational tidal forces. These cosmic fossils reveal our galaxy\'s violent history of consuming smaller galaxies. The Sagittarius Stream, left behind by a dwarf galaxy being devoured by the Milky Way, wraps completely around our galaxy. The ESA\'s Gaia mission has discovered dozens of previously unknown stellar streams.'
  },
  {
    id: 'rogue-planet',
    name: 'Rogue Planets',
    category: 'other',
    type: 'Orphan World',
    description: 'Lonely planets wandering through space without a star!',
    longDescription: 'Rogue planets are planetary bodies that drift through interstellar space without orbiting any star. They were either ejected from their solar systems or formed alone!',
    coolFact: 'There may be billions of rogue planets wandering our galaxy!',
    extendedFacts: [
      'Rogue planets are extremely difficult to detect',
      'They can be ejected from solar systems by gravitational interactions',
      'Some may have been born in interstellar space',
      'A few might have subsurface oceans heated by radioactive decay'
    ],
    metric: 'Nomadic',
    metricLabel: 'Status',
    icon: '🌑',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'Rogue planets are worlds without stars - planetary bodies drifting through the darkness of interstellar space. They can form this way or be ejected from young solar systems through gravitational interactions with other planets. Recent surveys suggest there may be billions of rogue planets in our galaxy alone - possibly more rogue planets than stars! Some large rogue planets might even maintain subsurface liquid oceans through heat generated by radioactive decay.'
  },
  {
    id: 'cosmic-void',
    name: 'Cosmic Voids',
    category: 'other',
    type: 'Large Scale Structure',
    description: 'Giant empty bubbles between galaxy filaments!',
    longDescription: 'Cosmic voids are enormous regions of space containing very few galaxies, separated by the filaments and walls of the cosmic web.',
    coolFact: 'Voids make up about 80% of the volume of the universe!',
    extendedFacts: [
      'Typical voids are 30-300 million light-years across',
      'Voids are not completely empty but have very low galaxy density',
      'They expand faster than the rest of the universe',
      'The KBC Void may surround our local universe'
    ],
    metric: 'Vast',
    metricLabel: 'Size',
    icon: '⭕',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'Cosmic voids are immense regions of space that contain far fewer galaxies than average. These bubble-like structures are separated by the filaments and walls of galaxies that make up the cosmic web. Voids typically range from 30 to 300 million light-years across and make up about 80% of the universe\'s volume. Despite their name, voids aren\'t completely empty - they just have much lower galaxy density than other regions.'
  },
  // Star Clusters
  {
    id: 'pleiades',
    name: 'Pleiades (Seven Sisters)',
    category: 'stars',
    type: 'Open Star Cluster',
    description: 'A beautiful cluster of young, hot blue stars!',
    longDescription: 'The Pleiades, also known as the Seven Sisters, is one of the most famous star clusters in the sky. You can see it with your naked eyes on a clear night!',
    coolFact: 'The Pleiades are only about 100 million years old - baby stars in cosmic terms!',
    extendedFacts: [
      'The cluster contains over 1,000 stars',
      'Located about 444 light-years from Earth',
      'Named after the seven daughters of Atlas in Greek mythology',
      'Surrounded by a beautiful blue reflection nebula'
    ],
    metric: 'Young',
    metricLabel: 'Age',
    icon: '✨',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Pleiades is one of the nearest star clusters to Earth and among the most visible to the naked eye. Also called the Seven Sisters after Greek mythology, this cluster actually contains over 1,000 stars. The bright blue stars are surrounded by a stunning reflection nebula - clouds of dust that reflect the starlight. The Pleiades are important in many cultures around the world, from Native American to Japanese traditions.'
  },
  {
    id: 'hyades',
    name: 'Hyades',
    category: 'stars',
    type: 'Open Star Cluster',
    description: 'The nearest star cluster to our solar system!',
    longDescription: 'The Hyades is the closest star cluster to Earth. It forms the face of Taurus the Bull constellation and has been known since ancient times.',
    coolFact: 'The Hyades are about 625 million years old - much older than the Pleiades!',
    extendedFacts: [
      'Located only 153 light-years from Earth',
      'Contains several hundred stars',
      'Aldebaran appears in the cluster but is not actually part of it',
      'Named after the rain nymphs in Greek mythology'
    ],
    metric: 'Nearby',
    metricLabel: 'Distance',
    icon: '⭐',
    color: 'star',
    distance: 'far',
    readMoreContent: 'The Hyades is the nearest open star cluster to the Sun, located about 153 light-years away in the constellation Taurus. The cluster forms a distinctive V-shape that represents the bull\'s face. Although the bright orange star Aldebaran appears to be part of the group, it\'s actually much closer to us and just happens to lie in the same direction. The Hyades was crucial in early astronomy for measuring stellar distances.'
  },
  {
    id: 'messier-3',
    name: 'Messier 3 (M3)',
    category: 'stars',
    type: 'Globular Cluster',
    description: 'A spectacular ball of half a million ancient stars!',
    longDescription: 'Messier 3 is one of the brightest and most beautiful globular clusters, containing about 500,000 stars packed into a spherical shape.',
    coolFact: 'M3 is about 8 billion years old - nearly twice as old as our Sun!',
    extendedFacts: [
      'Contains about 500,000 stars',
      'Located 33,900 light-years from Earth',
      'One of the brightest globular clusters visible from Earth',
      'Contains more variable stars than almost any other cluster'
    ],
    metric: 'Ancient',
    metricLabel: 'Age',
    icon: '🔮',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Messier 3 is a stunning globular cluster discovered by Charles Messier in 1764. It contains roughly 500,000 stars gravitationally bound together in a sphere about 180 light-years across. M3 is famous for containing a huge number of variable stars - stars that change brightness over time - which astronomers use to measure cosmic distances. This ancient cluster formed when the universe was young, making its stars some of the oldest known.'
  },
  // Blazars and Explosive Events
  {
    id: 'blazar',
    name: 'Blazars',
    category: 'galaxies',
    type: 'Active Galactic Nucleus',
    description: 'Supermassive black holes shooting beams right at us!',
    longDescription: 'Blazars are supermassive black holes at galaxy centers that shoot powerful jets of energy and particles directly toward Earth. They are the brightest objects in the universe!',
    coolFact: 'Blazar jets travel at nearly the speed of light!',
    extendedFacts: [
      'Blazars are a type of quasar with jets pointed at Earth',
      'They can vary in brightness dramatically over hours or days',
      'Blazars emit energy across the entire electromagnetic spectrum',
      'The nearest known blazar is Markarian 421'
    ],
    metric: 'Extreme',
    metricLabel: 'Power',
    icon: '💥',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Blazars are among the most energetic phenomena in the universe. They are a special type of active galactic nucleus - a supermassive black hole actively consuming material - with relativistic jets pointed directly at Earth. This alignment makes them appear incredibly bright and highly variable. Blazars emit radiation across all wavelengths, from radio waves to gamma rays, and can outshine entire galaxies. They help scientists study extreme physics and the early universe.'
  },
  {
    id: 'kilonova',
    name: 'Kilonova',
    category: 'other',
    type: 'Stellar Explosion',
    description: 'The spectacular collision of two neutron stars!',
    longDescription: 'A kilonova occurs when two neutron stars smash together, creating a massive explosion that produces heavy elements like gold and platinum!',
    coolFact: 'All the gold in the universe was likely created in kilonovae!',
    extendedFacts: [
      'First directly observed in 2017',
      'Creates gravitational waves detectable on Earth',
      'Produces elements heavier than iron',
      'About 1,000 times brighter than a regular nova'
    ],
    metric: 'Brilliant',
    metricLabel: 'Brightness',
    icon: '💫',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Kilonovae are cosmic events that occur when two neutron stars or a neutron star and black hole merge. The first kilonova was directly observed in August 2017, detected through both gravitational waves and light. These mergers create the heaviest elements in the universe, including gold, platinum, and uranium. The explosion is about 1,000 times brighter than a nova but less bright than a supernova, hence the name "kilonova."'
  },
  {
    id: 'hypernova',
    name: 'Hypernova',
    category: 'other',
    type: 'Stellar Explosion',
    description: 'The most powerful explosions since the Big Bang!',
    longDescription: 'Hypernovae are supernovae on steroids - explosions 10 to 100 times more powerful than regular supernovae, caused by the collapse of the most massive stars!',
    coolFact: 'A hypernova releases more energy in seconds than the Sun will produce in its entire lifetime!',
    extendedFacts: [
      'Also called collapsar or superluminous supernovae',
      'Can produce gamma-ray bursts',
      'Only the most massive stars (over 30 solar masses) can create them',
      'They can briefly outshine their entire host galaxy'
    ],
    metric: 'Colossal',
    metricLabel: 'Energy',
    icon: '🌟',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Hypernovae are the most energetic stellar explosions known, releasing 10 to 100 times more energy than typical supernovae. They occur when extremely massive stars - at least 30 times the mass of our Sun - collapse at the end of their lives. Some hypernovae produce long gamma-ray bursts, the most luminous events in the universe. These explosions can briefly outshine billions of stars and spread heavy elements across vast regions of space.'
  },
  // Cosmic Expansion
  {
    id: 'cosmic-expansion',
    name: 'Cosmic Expansion',
    category: 'other',
    type: 'Cosmological Phenomenon',
    description: 'The universe is getting bigger every second!',
    longDescription: 'Space itself is stretching, carrying galaxies apart from each other. This expansion has been happening since the Big Bang and is actually speeding up!',
    coolFact: 'Distant galaxies are moving away from us faster than the speed of light because space itself is expanding!',
    extendedFacts: [
      'Discovered by Edwin Hubble in 1929',
      'The expansion rate is called the Hubble constant',
      'Dark energy is causing the expansion to accelerate',
      'Eventually, distant galaxies will disappear from our view'
    ],
    metric: 'Accelerating',
    metricLabel: 'Rate',
    icon: '🌌',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Cosmic expansion is one of the most profound discoveries in science. In 1929, Edwin Hubble noticed that distant galaxies are moving away from us, with farther galaxies moving faster. This led to the understanding that the universe began with the Big Bang and has been expanding ever since. Surprisingly, scientists discovered in 1998 that this expansion is accelerating, driven by a mysterious force called dark energy. Eventually, the expansion will carry distant galaxies beyond our observable universe.'
  },
  // Exoplanets
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b',
    category: 'other',
    type: 'Exoplanet',
    description: 'The closest exoplanet to Earth - our nearest cosmic neighbor!',
    longDescription: 'Proxima b orbits the closest star to our Sun, Proxima Centauri, in the habitable zone where liquid water might exist on its surface!',
    coolFact: 'Proxima b is only 4.2 light-years away - the closest potentially habitable exoplanet!',
    extendedFacts: [
      'Discovered in 2016',
      'Orbits in just 11.2 Earth days',
      'About 1.17 times the mass of Earth',
      'May be tidally locked with one side always facing its star'
    ],
    metric: 'Nearest',
    metricLabel: 'Distance',
    icon: '🌍',
    color: 'planet',
    distance: 'far',
    readMoreContent: 'Proxima Centauri b is the closest known exoplanet to our solar system, orbiting the red dwarf star Proxima Centauri just 4.2 light-years away. The planet is in the habitable zone, where temperatures might allow liquid water to exist. However, Proxima Centauri is a flare star that produces intense radiation bursts, which could make conditions challenging for life. Proxima b is a prime target for future interstellar exploration.'
  },
  {
    id: 'kepler-16b',
    name: 'Kepler-16b',
    category: 'other',
    type: 'Exoplanet',
    description: 'A real-life Tatooine with two suns!',
    longDescription: 'Kepler-16b is a circumbinary planet, meaning it orbits two stars! From its surface, you would see two suns in the sky, just like Luke Skywalker\'s home planet.',
    coolFact: 'You would see two sunsets every day on Kepler-16b!',
    extendedFacts: [
      'Discovered in 2011 by the Kepler space telescope',
      'Located about 245 light-years from Earth',
      'About the size of Saturn',
      'Nicknamed "Tatooine" after the Star Wars planet'
    ],
    metric: 'Binary',
    metricLabel: 'Star System',
    icon: '☀️☀️',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Kepler-16b made headlines when discovered because it proved that planets can form and survive in the complex gravitational environment of a binary star system. The planet is about the size of Saturn and orbits both of its stars every 229 days. While its double sunsets would be spectacular, Kepler-16b is too cold for liquid water and unlikely to support life as we know it. This discovery opened our eyes to the diversity of planetary systems in the galaxy.'
  },
  {
    id: 'kepler-22b',
    name: 'Kepler-22b',
    category: 'other',
    type: 'Exoplanet',
    description: 'A super-Earth in the habitable zone!',
    longDescription: 'Kepler-22b was one of the first exoplanets discovered in the habitable zone of a Sun-like star, making it an exciting candidate for potential habitability.',
    coolFact: 'Kepler-22b is about 2.4 times the size of Earth!',
    extendedFacts: [
      'Discovered in 2011',
      'Located 640 light-years from Earth',
      'Orbits its star in 290 days',
      'Surface temperature might be around 22°C (72°F) if it has an atmosphere'
    ],
    metric: 'Super',
    metricLabel: 'Size Class',
    icon: '🌏',
    color: 'planet',
    distance: 'far',
    readMoreContent: 'Kepler-22b was a groundbreaking discovery - the first planet found by Kepler in the habitable zone of a Sun-like star. At 2.4 times Earth\'s radius, it\'s classified as a "super-Earth" or possibly a "mini-Neptune." We don\'t know if it has a rocky surface or is a water world or gas planet. If it has an Earth-like atmosphere, surface temperatures could be comfortable for liquid water. Kepler-22b represents our ongoing quest to find Earth-like worlds.'
  },
  {
    id: '51-pegasi-b',
    name: '51 Pegasi b',
    category: 'other',
    type: 'Exoplanet',
    description: 'The first exoplanet ever found around a Sun-like star!',
    longDescription: '51 Pegasi b made history in 1995 as the first exoplanet discovered orbiting a main-sequence star. It changed our understanding of planetary systems forever!',
    coolFact: 'The discovery of 51 Pegasi b won the 2019 Nobel Prize in Physics!',
    extendedFacts: [
      'Discovered in 1995 by Michel Mayor and Didier Queloz',
      'Located about 50 light-years from Earth',
      'A "hot Jupiter" - a gas giant orbiting very close to its star',
      'Orbits its star in just 4.2 Earth days'
    ],
    metric: 'Historic',
    metricLabel: 'Significance',
    icon: '🏆',
    color: 'accent',
    distance: 'far',
    readMoreContent: '51 Pegasi b represents a turning point in astronomy - the first confirmed exoplanet around a Sun-like star. Before its discovery, we only knew of planets in our own solar system. Finding a Jupiter-sized planet orbiting its star in just 4 days was shocking - nothing like this exists in our solar system. This discovery launched a revolution in planet hunting that has now found over 5,000 exoplanets. The discoverers, Mayor and Queloz, received the Nobel Prize in 2019.'
  },
  {
    id: '55-cancri-e',
    name: '55 Cancri e',
    category: 'other',
    type: 'Exoplanet',
    description: 'A super-Earth that might be covered in lava!',
    longDescription: '55 Cancri e is a rocky super-Earth that orbits so close to its star that its surface may be covered in oceans of molten lava!',
    coolFact: '55 Cancri e was once thought to be made partly of diamond!',
    extendedFacts: [
      'Located 41 light-years from Earth',
      'Surface temperature reaches about 2,000°C (3,600°F)',
      'Orbits its star in just 18 hours',
      'About twice Earth\'s diameter and 8 times its mass'
    ],
    metric: 'Scorching',
    metricLabel: 'Temperature',
    icon: '🔥',
    color: 'destructive',
    distance: 'far',
    readMoreContent: '55 Cancri e is one of the most extreme exoplanets known. It orbits so close to its star that a year lasts only 18 hours! Surface temperatures reach about 2,000°C, hot enough to melt most rocks. The James Webb Space Telescope has studied this world, revealing a thick atmosphere despite the extreme conditions. Early studies suggested it might contain diamond, but recent observations paint a picture of a hellish lava world with a substantial atmosphere.'
  },
  {
    id: 'wasp-76b',
    name: 'WASP-76b',
    category: 'other',
    type: 'Exoplanet',
    description: 'A planet where it rains molten iron!',
    longDescription: 'WASP-76b is an ultra-hot Jupiter where temperatures are so extreme that iron vaporizes on the day side and rains down as liquid metal on the night side!',
    coolFact: 'The dayside of WASP-76b reaches 2,400°C - hot enough to vaporize iron!',
    extendedFacts: [
      'Located 640 light-years from Earth',
      'Tidally locked - one side always faces the star',
      'Iron rain falls on the cooler night side',
      'About 1.8 times the size of Jupiter'
    ],
    metric: 'Iron Rain',
    metricLabel: 'Weather',
    icon: '🌧️',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'WASP-76b has some of the most extreme weather in the known universe. This ultra-hot gas giant is tidally locked, meaning one side permanently faces its star. The dayside reaches temperatures of 2,400°C, hot enough to vaporize metals including iron. These iron vapors are carried by powerful winds to the cooler night side, where temperatures drop enough for iron to condense and fall as rain. This bizarre weather was detected by studying the planet\'s atmosphere during transits.'
  },
  // === 30 NEW CELESTIAL BODIES ===
  // Moons
  {
    id: 'europa',
    name: 'Europa',
    category: 'solar-system',
    type: 'Moon',
    description: 'Jupiter\'s icy moon hiding a liquid ocean!',
    longDescription: 'Europa is one of Jupiter\'s largest moons and one of the most promising places to search for extraterrestrial life. Beneath its icy crust lies a global ocean of liquid water!',
    coolFact: 'Europa has more water than all of Earth\'s oceans combined!',
    extendedFacts: [
      'The ice shell is about 15-25 km thick',
      'The subsurface ocean may be 60-150 km deep',
      'Geysers may spray water into space',
      'NASA\'s Europa Clipper mission launches in 2024'
    ],
    metric: 'Oceanic',
    metricLabel: 'Type',
    icon: '🧊',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Europa is slightly smaller than Earth\'s Moon but harbors an ocean containing twice as much water as all of Earth\'s oceans combined. The ocean is kept liquid by tidal heating - Jupiter\'s immense gravity flexes Europa as it orbits, generating internal heat. The Hubble Space Telescope has observed plumes of water vapor erupting from the surface. NASA\'s Europa Clipper spacecraft will conduct detailed reconnaissance of this fascinating moon in the late 2020s.'
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    category: 'solar-system',
    type: 'Moon',
    description: 'A tiny moon with geysers spraying into space!',
    longDescription: 'Enceladus is a small, icy moon of Saturn famous for its spectacular geysers. These plumes spray water and organic molecules from a subsurface ocean into space!',
    coolFact: 'Enceladus shoots water geysers 500 km into space!',
    extendedFacts: [
      'Only 504 km in diameter - small enough to fit in Texas',
      'The geysers create Saturn\'s E ring',
      'Scientists detected hydrogen in the plumes - a sign of hydrothermal vents',
      'One of the most reflective objects in the solar system'
    ],
    metric: 'Active',
    metricLabel: 'Geology',
    icon: '💨',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Enceladus is a small icy moon that punches far above its weight in scientific interest. The Cassini spacecraft discovered dramatic geysers erupting from "tiger stripe" fissures near its south pole. These plumes contain water, organic molecules, and hydrogen - potentially all the ingredients for life. The subsurface ocean is relatively small but chemically rich, with possible hydrothermal vents similar to those supporting life in Earth\'s deep oceans.'
  },
  {
    id: 'titan',
    name: 'Titan',
    category: 'solar-system',
    type: 'Moon',
    description: 'Saturn\'s giant moon with lakes of liquid methane!',
    longDescription: 'Titan is the second-largest moon in the solar system and the only moon with a thick atmosphere. It has lakes, rivers, and rain - but made of liquid methane and ethane!',
    coolFact: 'Titan is the only place beyond Earth where we\'ve landed a probe on a solid surface and returned images!',
    extendedFacts: [
      'Larger than the planet Mercury',
      'Its atmosphere is thicker than Earth\'s (1.5x surface pressure)',
      'Has a subsurface water ocean beneath its icy crust',
      'NASA\'s Dragonfly mission will land in 2034'
    ],
    metric: 'Earth-like',
    metricLabel: 'Features',
    icon: '🟠',
    color: 'accent',
    distance: 'near',
    readMoreContent: 'Titan is the most Earth-like world in our solar system, with a thick nitrogen atmosphere, seasonal weather patterns, and a liquid cycle like our water cycle - but with methane instead. The Huygens probe landed on Titan in 2005, revealing a frozen world with rounded rocks (ice pebbles) and evidence of flowing liquid. NASA\'s Dragonfly mission will send a drone-like rotorcraft to explore Titan\'s diverse surface in 2034.'
  },
  {
    id: 'io',
    name: 'Io',
    category: 'solar-system',
    type: 'Moon',
    description: 'The most volcanic world in the solar system!',
    longDescription: 'Io is Jupiter\'s innermost large moon and the most geologically active object we know of. Its surface is covered in volcanoes that constantly reshape the landscape!',
    coolFact: 'Io has over 400 active volcanoes!',
    extendedFacts: [
      'Volcanoes shoot sulfur 500 km into space',
      'The surface is completely renewed every few thousand years',
      'Tidal heating from Jupiter powers the volcanism',
      'Named after a priestess in Greek mythology'
    ],
    metric: 'Volcanic',
    metricLabel: 'Activity',
    icon: '🌋',
    color: 'destructive',
    distance: 'near',
    readMoreContent: 'Io\'s intense volcanism is powered by tidal heating - the gravitational tug-of-war between Jupiter, Europa, and Ganymede flexes Io\'s interior, generating tremendous heat. This creates a world of constant eruptions, with sulfur-rich lava flows and plumes reaching hundreds of kilometers into space. The surface is a colorful patchwork of yellow, orange, and red sulfur deposits. No other world in the solar system is so actively volcanic.'
  },
  {
    id: 'triton',
    name: 'Triton',
    category: 'solar-system',
    type: 'Moon',
    description: 'Neptune\'s backwards-orbiting captured moon!',
    longDescription: 'Triton is Neptune\'s largest moon and the only large moon that orbits backward (retrograde). It was likely captured from the Kuiper Belt and has active nitrogen geysers!',
    coolFact: 'Triton orbits Neptune backward - the only large moon to do this!',
    extendedFacts: [
      'Surface temperature is -235°C (-391°F)',
      'Has nitrogen ice geysers that shoot 8 km high',
      'Will eventually crash into Neptune in 3.6 billion years',
      'Has a thin nitrogen atmosphere'
    ],
    metric: 'Captured',
    metricLabel: 'Origin',
    icon: '❄️',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Triton is a world of extremes - the coldest known object with a measured surface temperature (-235°C) and the only large moon orbiting backward around its planet. This retrograde orbit suggests Triton was once a Kuiper Belt object captured by Neptune\'s gravity. Despite the extreme cold, Triton is geologically active, with geysers of nitrogen gas erupting through the ice. Its retrograde orbit is causing it to slowly spiral inward, and it will eventually be torn apart by Neptune\'s gravity.'
  },
  // Famous Stars
  {
    id: 'polaris',
    name: 'Polaris (North Star)',
    category: 'stars',
    type: 'Yellow Supergiant',
    description: 'The famous North Star that helps travelers navigate!',
    longDescription: 'Polaris is the current North Star, sitting almost directly above Earth\'s North Pole. For centuries, it has guided travelers, sailors, and navigators!',
    coolFact: 'Polaris is actually a triple star system - three stars orbiting each other!',
    extendedFacts: [
      'Located 433 light-years away',
      'About 50 times the Sun\'s diameter',
      'A Cepheid variable star (brightness pulsates)',
      'Won\'t always be the North Star - Earth\'s axis wobbles'
    ],
    metric: 'Guiding',
    metricLabel: 'Role',
    icon: '⭐',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Polaris sits less than a degree from the north celestial pole, making it appear almost stationary while other stars rotate around it. This made it invaluable for navigation. Polaris is actually a triple star system, with the main star being a Cepheid variable - a type of pulsating star crucial for measuring cosmic distances. Due to Earth\'s axial precession (wobble), different stars serve as the North Star over a 26,000-year cycle.'
  },
  {
    id: 'vega',
    name: 'Vega',
    category: 'stars',
    type: 'Blue-White Star',
    description: 'One of the brightest stars and a future North Star!',
    longDescription: 'Vega is one of the brightest stars in the night sky and was once the North Star about 12,000 years ago. It will be again in about 14,000 years!',
    coolFact: 'Vega spins so fast it bulges at the equator!',
    extendedFacts: [
      'Only 25 light-years away',
      'About 40 times brighter than the Sun',
      'Rotates in just 12.5 hours (vs Sun\'s 25 days)',
      'Has a debris disk that may contain planets'
    ],
    metric: 'Brilliant',
    metricLabel: 'Brightness',
    icon: '💎',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Vega was one of the first stars photographed and one of the first to have its spectrum analyzed. It\'s a nearby stellar neighbor at only 25 light-years and served as the standard reference for measuring stellar brightness. Vega spins incredibly fast - once every 12.5 hours - causing it to bulge at the equator by about 23%. A dust disk surrounds Vega, possibly containing forming planets.'
  },
  {
    id: 'rigel',
    name: 'Rigel',
    category: 'stars',
    type: 'Blue Supergiant',
    description: 'A brilliant blue star in Orion - 120,000 times brighter than the Sun!',
    longDescription: 'Rigel is the brightest star in Orion and one of the most luminous stars visible to the naked eye. This massive blue supergiant will eventually explode as a supernova!',
    coolFact: 'Rigel is about 120,000 times more luminous than our Sun!',
    extendedFacts: [
      'Located about 860 light-years away',
      'About 21 times the Sun\'s mass',
      'Surface temperature around 12,000°C',
      'Part of a multiple star system'
    ],
    metric: 'Massive',
    metricLabel: 'Type',
    icon: '💙',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Rigel marks the foot of Orion the Hunter and dominates the constellation with its brilliant blue-white light. Despite being much farther than many visible stars, its extreme luminosity makes it one of the brightest in our sky. Rigel is a young star - only about 10 million years old - but its immense mass means it burns through fuel rapidly and will explode as a supernova in a few million years.'
  },
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    category: 'stars',
    type: 'Red Dwarf',
    description: 'The closest star to our Sun!',
    longDescription: 'Proxima Centauri is the nearest star to Earth (besides the Sun), a small red dwarf only 4.24 light-years away. It hosts at least one potentially habitable planet!',
    coolFact: 'Even though it\'s the closest star, Proxima Centauri is too dim to see without a telescope!',
    extendedFacts: [
      'Only 4.24 light-years away - the nearest star!',
      'About 12% of the Sun\'s mass',
      'Surface temperature only 3,000°C',
      'Will burn for trillions of years'
    ],
    metric: 'Nearest',
    metricLabel: 'Distance',
    icon: '🔴',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Proxima Centauri is a red dwarf star and the closest stellar neighbor to our solar system. It\'s part of the Alpha Centauri triple star system. Despite its proximity, it\'s invisible to the naked eye because red dwarfs are so dim. Proxima hosts at least two planets, including Proxima b in the habitable zone. However, the star\'s frequent violent flares may make the planet\'s surface inhospitable to life as we know it.'
  },
  {
    id: 'alpha-centauri',
    name: 'Alpha Centauri A & B',
    category: 'stars',
    type: 'Binary Star System',
    description: 'Twin Sun-like stars in the closest star system!',
    longDescription: 'Alpha Centauri A and B are a pair of Sun-like stars orbiting each other, forming the main component of the nearest star system to our solar system!',
    coolFact: 'Alpha Centauri A is almost identical to our Sun!',
    extendedFacts: [
      'Located 4.37 light-years away',
      'Alpha Centauri A is slightly larger and brighter than the Sun',
      'The stars orbit each other every 80 years',
      'Third brightest star in the night sky (combined light)'
    ],
    metric: 'Twin',
    metricLabel: 'System',
    icon: '☀️☀️',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Alpha Centauri A and B form a beautiful binary system visible from the Southern Hemisphere. Alpha Centauri A is 1.1 times the Sun\'s mass and slightly brighter, while B is smaller and cooler. They orbit each other at distances ranging from 11 to 36 AU (similar to Saturn-Pluto distances in our solar system). Astronomers continue searching for planets around these Sun-like stars, which would be the closest potential targets for interstellar exploration.'
  },
  // More Nebulae
  {
    id: 'cat-eye-nebula',
    name: 'Cat\'s Eye Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'A dying star\'s intricate cosmic eye!',
    longDescription: 'The Cat\'s Eye Nebula is one of the most structurally complex planetary nebulae known, with shells, jets, and knots of gas creating a stunning pattern around a dying star!',
    coolFact: 'The Cat\'s Eye has at least 11 concentric shells of gas!',
    extendedFacts: [
      'Located about 3,000 light-years away',
      'The central star is 10,000 times more luminous than the Sun',
      'Ejections occurred in pulses about every 1,500 years',
      'First planetary nebula to have its spectrum analyzed'
    ],
    metric: 'Complex',
    metricLabel: 'Structure',
    icon: '👁️',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Cat\'s Eye Nebula (NGC 6543) is a masterpiece of stellar death. Its complex structure includes concentric rings, high-speed jets, and intricate loops that scientists are still working to explain. One theory suggests the central star may have a companion whose gravitational influence created the patterns. Hubble images revealed at least 11 concentric shells, suggesting periodic ejection events every 1,500 years during the star\'s death throes.'
  },
  {
    id: 'helix-nebula',
    name: 'Helix Nebula',
    category: 'nebulas',
    type: 'Planetary Nebula',
    description: 'The \'Eye of God\' - one of the closest planetary nebulae!',
    longDescription: 'The Helix Nebula is one of the nearest planetary nebulae to Earth. Its striking appearance has earned it the nickname "Eye of God" or "Eye of Sauron!"',
    coolFact: 'The Helix is about 2.5 light-years across - half the distance to the nearest star!',
    extendedFacts: [
      'Only about 700 light-years away',
      'Formed when a Sun-like star shed its outer layers',
      'The central white dwarf has a surface temperature of 100,000°C',
      'Contains thousands of comet-like structures'
    ],
    metric: 'Nearby',
    metricLabel: 'Distance',
    icon: '🌀',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'The Helix Nebula appears large in the sky because of its relative proximity. It shows us the fate of our own Sun - in about 5 billion years, the Sun will shed its outer layers to create a similar structure. The nebula contains fascinating features called "cometary knots" - dense clumps of gas with tails pointing away from the central star. The dying star at the center is now a white dwarf, slowly cooling over billions of years.'
  },
  {
    id: 'tarantula-nebula',
    name: 'Tarantula Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'The most violent star-forming region in the local universe!',
    longDescription: 'The Tarantula Nebula is a giant stellar nursery in a nearby galaxy, producing stars at a furious rate. It\'s the most luminous nebula in our cosmic neighborhood!',
    coolFact: 'If the Tarantula Nebula were as close as the Orion Nebula, it would cast shadows on Earth!',
    extendedFacts: [
      'Located in the Large Magellanic Cloud (170,000 light-years away)',
      'About 600 light-years in diameter',
      'Contains the heaviest stars ever discovered (up to 200 solar masses)',
      'Also called 30 Doradus'
    ],
    metric: 'Gigantic',
    metricLabel: 'Size',
    icon: '🕷️',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Tarantula Nebula is so luminous that if it were as close as the Orion Nebula (1,344 light-years), it would cast shadows at night. Located in the Large Magellanic Cloud, it produces massive stars at a prodigious rate, including some of the heaviest stars known - up to 200 times the Sun\'s mass. The region also contains a supernova remnant from SN 1987A, the closest supernova in modern times.'
  },
  // More Galaxies
  {
    id: 'triangulum',
    name: 'Triangulum Galaxy (M33)',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'The third-largest galaxy in our local group!',
    longDescription: 'The Triangulum Galaxy is the third-largest member of our Local Group of galaxies and the most distant object visible to the naked eye under perfect conditions!',
    coolFact: 'M33 may be a satellite galaxy of Andromeda!',
    extendedFacts: [
      'About 2.73 million light-years away',
      'Contains about 40 billion stars',
      'Diameter of about 60,000 light-years',
      'Visible to the naked eye under dark skies'
    ],
    metric: 'Local',
    metricLabel: 'Group',
    icon: '🌀',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Triangulum Galaxy is a beautiful face-on spiral smaller than both the Milky Way and Andromeda. It may be gravitationally bound to Andromeda, making it a satellite galaxy. M33 contains the giant HII region NGC 604, one of the largest stellar nurseries known. Under exceptionally dark skies, M33 is the most distant object visible without optical aid, a testament to how bright this starry island truly is.'
  },
  {
    id: 'centaurus-a',
    name: 'Centaurus A',
    category: 'galaxies',
    type: 'Peculiar Galaxy',
    description: 'A dramatic galaxy with jets shooting from its center!',
    longDescription: 'Centaurus A is the closest active galaxy to Earth, with a supermassive black hole shooting enormous jets of radio waves and X-rays across thousands of light-years!',
    coolFact: 'Centaurus A\'s radio-emitting jets extend over a million light-years into space!',
    extendedFacts: [
      'About 12 million light-years away',
      'Result of a merger between two galaxies',
      'Central black hole is 55 million solar masses',
      'One of the strongest radio sources in the sky'
    ],
    metric: 'Active',
    metricLabel: 'Nucleus',
    icon: '💫',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Centaurus A is the nearest example of an active galactic nucleus - a supermassive black hole actively consuming material and producing powerful jets. The galaxy\'s distinctive dark dust lane formed from a merger with a smaller spiral galaxy. Jets of relativistic plasma extend over a million light-years, making Centaurus A one of the brightest radio sources in the sky. It\'s a nearby laboratory for studying how black holes affect their host galaxies.'
  },
  {
    id: 'cartwheel-galaxy',
    name: 'Cartwheel Galaxy',
    category: 'galaxies',
    type: 'Ring Galaxy',
    description: 'A spectacular cosmic collision frozen in time!',
    longDescription: 'The Cartwheel Galaxy was created when a smaller galaxy punched through a larger spiral, creating a stunning ring of star formation 150,000 light-years across!',
    coolFact: 'The blue outer ring is expanding at 200,000 mph!',
    extendedFacts: [
      'Located about 500 million light-years away',
      'The collision occurred about 200-300 million years ago',
      'The ring contains billions of new stars',
      'First revealed in detail by James Webb Space Telescope'
    ],
    metric: 'Collisional',
    metricLabel: 'Origin',
    icon: '🎡',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The Cartwheel Galaxy is cosmic art created by catastrophe. When a smaller galaxy plunged through the center of a larger spiral, it sent a ripple of gas outward like a rock dropped in water. This wave triggered massive star formation, creating the bright blue outer ring. James Webb Space Telescope images revealed unprecedented detail in the inner structures, showing spokes of gas connecting the nucleus to the outer ring.'
  },
  // More phenomena
  {
    id: 'magnetar',
    name: 'Magnetars',
    category: 'other',
    type: 'Neutron Star',
    description: 'The universe\'s most powerful magnets!',
    longDescription: 'Magnetars are neutron stars with incredibly powerful magnetic fields - trillions of times stronger than Earth\'s! They can produce the most energetic flares in the known universe!',
    coolFact: 'A magnetar\'s magnetic field would erase all credit cards on Earth from halfway to the Moon!',
    extendedFacts: [
      'Magnetic field 1,000 trillion times stronger than Earth\'s',
      'Only about 30 known magnetars in our galaxy',
      'Their flares can affect Earth\'s atmosphere from across the galaxy',
      'They spin down quickly, becoming inactive in about 10,000 years'
    ],
    metric: 'Extreme',
    metricLabel: 'Magnetism',
    icon: '🧲',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Magnetars are neutron stars with the strongest magnetic fields in the universe. These ultra-magnetic objects form when massive stars collapse and somehow generate field strengths of 10^15 Gauss (Earth\'s is about 0.5 Gauss). Magnetar starquakes cause gamma-ray flares so powerful that one in 2004 (SGR 1806-20) affected Earth\'s ionosphere from 50,000 light-years away. Magnetars are thought to power some mysterious fast radio bursts.'
  },
  {
    id: 'pulsar',
    name: 'Pulsars',
    category: 'other',
    type: 'Neutron Star',
    description: 'Cosmic lighthouses spinning faster than a blender!',
    longDescription: 'Pulsars are rapidly spinning neutron stars that beam radiation like lighthouses. Some rotate hundreds of times per second with incredible precision!',
    coolFact: 'Some pulsars keep time more accurately than atomic clocks!',
    extendedFacts: [
      'First discovered in 1967 (initially called "LGM" for Little Green Men)',
      'The fastest spin over 700 times per second',
      'Used to detect gravitational waves indirectly',
      'The first exoplanets were discovered around a pulsar'
    ],
    metric: 'Precise',
    metricLabel: 'Timing',
    icon: '💫',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Pulsars are neutron stars with beams of radio waves shooting from their magnetic poles. As they spin, these beams sweep across Earth like lighthouse beams. When first discovered, their regular pulses were so precise that astronomers half-jokingly named them "LGM" (Little Green Men). Millisecond pulsars rival atomic clocks in precision and are used to search for gravitational waves. The Vela Pulsar flashes 11 times per second and is visible in optical light.'
  },
  {
    id: 'fast-radio-burst',
    name: 'Fast Radio Bursts',
    category: 'other',
    type: 'Mysterious Phenomenon',
    description: 'Powerful millisecond blasts from across the cosmos!',
    longDescription: 'Fast Radio Bursts (FRBs) are mysterious flashes of radio waves lasting just milliseconds but releasing as much energy as the Sun does in 80 years!',
    coolFact: 'The first FRB was discovered in archived data from 2001 - we nearly missed it!',
    extendedFacts: [
      'First identified in 2007 from data recorded in 2001',
      'Some FRBs repeat, others appear once',
      'Likely caused by magnetars',
      'We detect thousands per day across the sky'
    ],
    metric: 'Mysterious',
    metricLabel: 'Origin',
    icon: '📡',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Fast Radio Bursts remain one of astronomy\'s hottest mysteries. These millisecond blasts of radio waves come from billions of light-years away and release extraordinary energy. In 2020, we finally caught one from within our galaxy - a magnetar called SGR 1935+2154 - suggesting magnetars produce at least some FRBs. However, the diversity of FRBs suggests multiple sources may be responsible. FRBs are now being used to map the universe\'s missing matter.'
  },
  {
    id: 'cosmic-web',
    name: 'The Cosmic Web',
    category: 'other',
    type: 'Large Scale Structure',
    description: 'The universe\'s skeleton made of galaxy filaments!',
    longDescription: 'The Cosmic Web is the largest known structure in the universe - a vast network of galaxy filaments and walls surrounding enormous voids, stretching across billions of light-years!',
    coolFact: 'The cosmic web looks remarkably similar to neurons in a brain!',
    extendedFacts: [
      'Formed from tiny density variations after the Big Bang',
      'Filaments can stretch hundreds of millions of light-years',
      'Clusters form at filament intersections',
      'Dark matter provides the scaffolding'
    ],
    metric: 'Cosmic',
    metricLabel: 'Scale',
    icon: '🕸️',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Cosmic Web is the largest pattern in existence. Galaxies aren\'t randomly scattered but arranged in filaments and walls surrounding vast empty voids. This structure emerged from tiny quantum fluctuations in the early universe, amplified by dark matter gravity. Dense clusters of thousands of galaxies form at filament intersections. Remarkably, the cosmic web\'s structure resembles the neural networks in our brains - a cosmic coincidence that has fascinated scientists.'
  },
  {
    id: 'laniakea',
    name: 'Laniakea Supercluster',
    category: 'other',
    type: 'Supercluster',
    description: 'Our cosmic home - a supercluster containing 100,000 galaxies!',
    longDescription: 'Laniakea is the supercluster containing our Milky Way galaxy along with about 100,000 other galaxies, spanning 520 million light-years!',
    coolFact: 'Laniakea means "immense heaven" in Hawaiian!',
    extendedFacts: [
      'Contains about 100,000 galaxies',
      'Spans 520 million light-years',
      'The Great Attractor lies near its center',
      'Discovered/mapped in 2014'
    ],
    metric: 'Home',
    metricLabel: 'Address',
    icon: '🏠',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'Laniakea Supercluster is our cosmic address beyond the Milky Way. Defined in 2014, it encompasses the Virgo Cluster (which contains our Local Group), the Great Attractor region, and numerous other galaxy clusters. All these galaxies flow toward the gravitational center. Laniakea is just one of millions of superclusters in the observable universe, and it may itself be part of an even larger structure called the Shapley Concentration.'
  },
  {
    id: 'quasar',
    name: 'Quasars',
    category: 'galaxies',
    type: 'Active Galactic Nucleus',
    description: 'The brightest objects in the universe!',
    longDescription: 'Quasars are incredibly luminous galactic cores powered by supermassive black holes consuming enormous amounts of matter. They can outshine entire galaxies!',
    coolFact: 'Some quasars are brighter than a trillion Suns!',
    extendedFacts: [
      'Can be seen billions of light-years away',
      'Powered by black holes billions of solar masses',
      'Most common in the early universe',
      'First discovered in 1963'
    ],
    metric: 'Luminous',
    metricLabel: 'Brightness',
    icon: '⚡',
    color: 'star',
    distance: 'far',
    readMoreContent: 'Quasars are the brilliant hearts of distant galaxies where supermassive black holes are actively feeding. Matter spiraling into the black hole heats to extreme temperatures, outshining the combined light of 100 billion stars. Quasars were more common in the early universe when galaxies had more gas to fuel them. The most distant quasar known existed just 670 million years after the Big Bang, showing supermassive black holes formed remarkably early.'
  },
  {
    id: 'gamma-ray-burst',
    name: 'Gamma-Ray Bursts',
    category: 'other',
    type: 'Cosmic Explosion',
    description: 'The most powerful explosions since the Big Bang!',
    longDescription: 'Gamma-Ray Bursts (GRBs) are the most energetic events in the universe since the Big Bang, releasing more energy in seconds than the Sun will produce in its entire lifetime!',
    coolFact: 'A nearby GRB could potentially trigger a mass extinction on Earth!',
    extendedFacts: [
      'Two types: long (massive star collapse) and short (neutron star mergers)',
      'Release energy equivalent to converting the Sun\'s mass to energy',
      'Beamed in narrow jets - we see only a fraction',
      'First detected by satellites watching for nuclear tests'
    ],
    metric: 'Cataclysmic',
    metricLabel: 'Energy',
    icon: '💥',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Gamma-Ray Bursts are the universe\'s most powerful explosions. Long-duration GRBs (lasting more than 2 seconds) occur when massive stars collapse into black holes. Short-duration GRBs happen when neutron stars merge. The energy is focused into narrow jets - if we\'re in the beam path, we see the burst. A GRB within a few thousand light-years could strip Earth\'s ozone layer. Fortunately, the nearest candidates are tens of thousands of light-years away.'
  },
  {
    id: 'trappist-1',
    name: 'TRAPPIST-1 System',
    category: 'other',
    type: 'Planetary System',
    description: 'Seven Earth-sized planets around one small star!',
    longDescription: 'TRAPPIST-1 is an ultra-cool dwarf star hosting seven Earth-sized rocky planets, three of which are in the habitable zone! It\'s one of the best places to search for life!',
    coolFact: 'All seven TRAPPIST-1 planets could fit inside Mercury\'s orbit!',
    extendedFacts: [
      'Located only 40 light-years away',
      'The star is barely larger than Jupiter',
      'Planets named b through h',
      'Prime target for James Webb Space Telescope'
    ],
    metric: 'Packed',
    metricLabel: 'System',
    icon: '🪐',
    color: 'planet',
    distance: 'far',
    readMoreContent: 'TRAPPIST-1 is a remarkable planetary system discovered in 2017. This tiny, cool red dwarf hosts seven Earth-sized planets in compact orbits - the entire system would fit inside Mercury\'s orbit around our Sun. Three planets (e, f, and g) lie in the habitable zone. The James Webb Space Telescope is studying their atmospheres for signs of water and potential biosignatures. TRAPPIST-1 represents our best near-term hope for finding life beyond Earth.'
  },
  {
    id: 'wolf-rayet',
    name: 'Wolf-Rayet Stars',
    category: 'stars',
    type: 'Massive Star',
    description: 'Dying giants blowing themselves apart!',
    longDescription: 'Wolf-Rayet stars are extremely hot, massive stars shedding their outer layers in powerful stellar winds before they explode as supernovae!',
    coolFact: 'Wolf-Rayet winds blow at up to 2,000 km per second!',
    extendedFacts: [
      'Surface temperatures of 30,000-200,000°C',
      'Losing mass at 10 million times the Sun\'s rate',
      'Usually the final stage before supernova',
      'Create beautiful nebulae around themselves'
    ],
    metric: 'Extreme',
    metricLabel: 'Winds',
    icon: '🌟',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Wolf-Rayet stars represent the violent final chapter of the most massive stars\' lives. Having exhausted their hydrogen, they shed outer layers at tremendous rates, revealing their hot cores. Winds reach speeds of 2,000 km/s, creating beautiful nebulae as they collide with surrounding material. WR 104, about 8,000 light-years away, will eventually produce a supernova and possibly a gamma-ray burst - fortunately, its jets aren\'t pointed at Earth.'
  },
  {
    id: 'brown-dwarf',
    name: 'Brown Dwarfs',
    category: 'other',
    type: 'Failed Star',
    description: 'Objects too big to be planets, too small to be stars!',
    longDescription: 'Brown dwarfs are objects between 13-80 times Jupiter\'s mass - too small to sustain hydrogen fusion like stars, but too massive to be called planets!',
    coolFact: 'Some brown dwarfs have weather patterns and clouds of iron and silicates!',
    extendedFacts: [
      'Temperature range from 300°C to 2,000°C',
      'Can fuse deuterium but not hydrogen',
      'Emit infrared radiation but little visible light',
      'The closest known brown dwarf is only 6.5 light-years away'
    ],
    metric: 'In-Between',
    metricLabel: 'Type',
    icon: '🟤',
    color: 'muted',
    distance: 'far',
    readMoreContent: 'Brown dwarfs occupy the gray zone between planets and stars. Lacking enough mass for sustained hydrogen fusion, they slowly cool over billions of years. They have atmospheres with clouds of exotic materials like iron droplets and silicate grains. Weather patterns include violent storms and lightning. The WISE survey discovered thousands of brown dwarfs, including the nearby binary Luhman 16 just 6.5 light-years away.'
  },
  {
    id: 'stellar-nursery',
    name: 'Stellar Nurseries',
    category: 'nebulas',
    type: 'Star-Forming Region',
    description: 'Cosmic cradles where new stars are born!',
    longDescription: 'Stellar nurseries are regions of dense gas and dust where gravity causes clouds to collapse and ignite as new stars. They\'re some of the most beautiful objects in space!',
    coolFact: 'About 3 new stars are born in the Milky Way every year!',
    extendedFacts: [
      'Require cold, dense molecular clouds to form stars',
      'Produce stars in clusters, rarely alone',
      'Newborn stars often have protoplanetary disks',
      'Radiation from new stars eventually destroys the nursery'
    ],
    metric: 'Creative',
    metricLabel: 'Process',
    icon: '👶',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'Stellar nurseries are giant molecular clouds where new stars form. Gravity causes dense regions to collapse and heat up until hydrogen fusion ignites. Stars typically form in clusters, with massive stars emerging first. Their radiation and stellar winds then erode the remaining cloud, sculpting pillars and revealing newborn stars. Famous stellar nurseries include the Orion Nebula, the Carina Nebula, and the Eagle Nebula\'s Pillars of Creation.'
  },
  {
    id: 'crab-nebula',
    name: 'Crab Nebula',
    category: 'nebulas',
    type: 'Supernova Remnant',
    description: 'The remains of a supernova seen by humans in 1054 AD!',
    longDescription: 'The Crab Nebula is the expanding debris from a supernova explosion witnessed by Chinese and Arab astronomers in 1054 AD. At its center spins a pulsar flashing 30 times per second!',
    coolFact: 'The 1054 supernova was visible in daylight for 23 days!',
    extendedFacts: [
      'Located about 6,500 light-years away',
      'Still expanding at 1,500 km per second',
      'The central pulsar is only 30 km across',
      'One of the first celestial radio sources identified'
    ],
    metric: 'Historic',
    metricLabel: 'Observation',
    icon: '🦀',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Crab Nebula is astronomy\'s Rosetta Stone - a supernova remnant we can correlate with historical records. Chinese astronomers recorded a "guest star" in 1054 that was visible in daylight. The expanding cloud of gas is now about 11 light-years across. At the center, the Crab Pulsar spins 30 times per second, beaming energy that lights up the surrounding nebula. The Crab is one of the most studied objects in astronomy.'
  },
  // NEW CELESTIAL BODIES
  {
    id: 'callisto',
    name: 'Callisto',
    category: 'solar-system',
    type: 'Moon',
    description: 'Jupiter\'s most cratered moon and the third largest moon in the solar system!',
    longDescription: 'Callisto is the outermost of Jupiter\'s four Galilean moons. Its ancient, heavily cratered surface tells the story of billions of years of asteroid impacts.',
    coolFact: 'Callisto\'s surface is the oldest in the solar system - about 4 billion years old!',
    extendedFacts: [
      'Almost as large as Mercury',
      'May have a subsurface ocean',
      'Has very low radiation levels',
      'Could be a good base for exploring Jupiter system'
    ],
    metric: '4.8 billion',
    metricLabel: 'years old',
    icon: '🌑',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Callisto is one of the most heavily cratered objects in the solar system. Unlike the other Galilean moons, Callisto orbits far enough from Jupiter to avoid intense radiation. This makes it a potential site for a future human outpost. Scientists believe it may have a liquid water ocean beneath its icy crust, though this is less certain than for Europa.'
  },
  {
    id: 'miranda',
    name: 'Miranda',
    category: 'solar-system',
    type: 'Moon',
    description: 'Uranus\'s strangest moon with cliffs 12 times higher than the Grand Canyon!',
    longDescription: 'Miranda is a small moon of Uranus with one of the most bizarre landscapes in the solar system. Its surface looks like a patchwork of different terrains smashed together.',
    coolFact: 'Verona Rupes on Miranda is the tallest known cliff in the solar system - 20 km high!',
    extendedFacts: [
      'Only 472 km in diameter',
      'May have been shattered and reassembled',
      'Has three unique chevron-shaped features',
      'Surface temperature is -187°C'
    ],
    metric: '20 km',
    metricLabel: 'cliff height',
    icon: '🧩',
    color: 'secondary',
    distance: 'near',
    readMoreContent: 'Miranda\'s fractured appearance puzzled scientists. One theory suggests it was shattered by a massive impact and gravitationally reassembled. Another theory proposes intense tidal heating created convection patterns. Its coronae - large oval features surrounded by ridges - are unlike anything else in the solar system.'
  },
  {
    id: 'ceres',
    name: 'Ceres',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'The largest object in the asteroid belt and the closest dwarf planet to the Sun!',
    longDescription: 'Ceres is a dwarf planet in the asteroid belt between Mars and Jupiter. NASA\'s Dawn spacecraft revealed bright spots and an ice volcano on its surface.',
    coolFact: 'Ceres has bright spots that are salt deposits from a subsurface ocean!',
    extendedFacts: [
      'Contains about one-third of the asteroid belt\'s mass',
      'Has a diameter of 940 km',
      'May have more fresh water than Earth',
      'Has a mountain called Ahuna Mons that might be an ice volcano'
    ],
    metric: '940 km',
    metricLabel: 'diameter',
    icon: '🪨',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Ceres was the first asteroid discovered in 1801 and was reclassified as a dwarf planet in 2006. NASA\'s Dawn mission revealed mysterious bright spots in Occator Crater - salt deposits from a subsurface ocean that seeped to the surface. Ahuna Mons is a possible cryovolcano that erupts water and ammonia instead of lava.'
  },
  {
    id: 'makemake',
    name: 'Makemake',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'A reddish dwarf planet in the Kuiper Belt named after a creation deity!',
    longDescription: 'Makemake is one of the largest known objects in the Kuiper Belt. Its surface is covered in frozen methane, ethane, and nitrogen that gives it a reddish-brown color.',
    coolFact: 'Makemake has no known atmosphere despite being large enough for one!',
    extendedFacts: [
      'Takes 310 years to orbit the Sun',
      'Named after the creation god of the Rapa Nui people',
      'Has one known moon called MK2',
      'Surface temperature is about -243°C'
    ],
    metric: '310',
    metricLabel: 'year orbit',
    icon: '🟤',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Makemake was discovered in 2005 and is the third-largest dwarf planet. Unlike Pluto, it has no significant atmosphere. Its moon MK2 was discovered in 2016 and is very dark, contrasting with Makemake\'s bright surface. Makemake is named after the chief god of the Rapa Nui (Easter Island) culture.'
  },
  {
    id: 'haumea',
    name: 'Haumea',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'An egg-shaped dwarf planet that spins faster than any other large object!',
    longDescription: 'Haumea is a uniquely elongated dwarf planet in the Kuiper Belt. Its rapid 4-hour rotation has stretched it into an egg shape. It even has its own ring system!',
    coolFact: 'Haumea is one of the fastest rotating large objects in the solar system!',
    extendedFacts: [
      'Has two moons: Hi\'iaka and Namaka',
      'Discovered to have rings in 2017',
      'Rotates once every 4 hours',
      'Named after the Hawaiian goddess of fertility'
    ],
    metric: '4 hours',
    metricLabel: 'day length',
    icon: '🥚',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Haumea\'s extreme rotation is thought to result from a massive collision billions of years ago. This impact also created its two moons and a family of smaller Kuiper Belt objects. In 2017, scientists discovered that Haumea has a ring system - the first ring system found around a trans-Neptunian object.'
  },
  {
    id: 'eris',
    name: 'Eris',
    category: 'solar-system',
    type: 'Dwarf Planet',
    description: 'The most massive dwarf planet that caused Pluto to lose its planet status!',
    longDescription: 'Eris is more massive than Pluto and its discovery in 2005 sparked the debate that led to the creation of the "dwarf planet" category. It\'s one of the most distant known objects in our solar system.',
    coolFact: 'Eris caused so much controversy it was named after the goddess of discord!',
    extendedFacts: [
      '27% more massive than Pluto',
      'Has one moon called Dysnomia',
      'Takes 558 years to orbit the Sun',
      'Currently about 96 AU from the Sun'
    ],
    metric: '558',
    metricLabel: 'year orbit',
    icon: '⚪',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'Eris was initially nicknamed "Xena" after the TV warrior princess. Its discovery forced astronomers to either make Eris the 10th planet or reclassify Pluto. They chose the latter, creating the dwarf planet category in 2006. Eris is so far away that even traveling at the speed of light, it would take about 13 hours to reach it.'
  },
  {
    id: 'sedna',
    name: 'Sedna',
    category: 'solar-system',
    type: 'Trans-Neptunian Object',
    description: 'One of the most distant known objects in our solar system with a mysterious orbit!',
    longDescription: 'Sedna has one of the longest known orbital periods - taking 11,400 years to orbit the Sun. Its extremely elongated orbit takes it from 76 AU to 937 AU from the Sun.',
    coolFact: 'Sedna\'s orbit is so distant that the Sun would look like just a bright star!',
    extendedFacts: [
      'Named after the Inuit goddess of the sea',
      'Surface temperature is about -240°C',
      'Takes 11,400 years to complete one orbit',
      'May hint at a distant Planet Nine'
    ],
    metric: '11,400',
    metricLabel: 'year orbit',
    icon: '❄️',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Sedna\'s extremely elongated orbit puzzles scientists. Something must have pulled it into this unusual path - perhaps a passing star, the gravity of a hidden planet, or influences from the Sun\'s original stellar nursery. Sedna is so far away at aphelion that the Sun would appear as just a bright point of light.'
  },
  {
    id: 'sirius',
    name: 'Sirius',
    category: 'stars',
    type: 'Binary Star System',
    description: 'The brightest star in Earth\'s night sky, also known as the Dog Star!',
    longDescription: 'Sirius is actually a binary star system - a bright white main-sequence star (Sirius A) and a faint white dwarf companion (Sirius B). It\'s only 8.6 light-years away.',
    coolFact: 'Sirius is so bright because it\'s one of Earth\'s closest stellar neighbors!',
    extendedFacts: [
      'About 25 times more luminous than the Sun',
      'Sirius B is one of the most massive known white dwarfs',
      'The name means "glowing" in Greek',
      'Important in many ancient cultures\' calendars'
    ],
    metric: '8.6',
    metricLabel: 'light-years',
    icon: '💎',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'Sirius has been important to many civilizations. Ancient Egyptians used its appearance to predict the annual Nile flooding. Sirius B, discovered in 1862, was the first white dwarf ever found. Despite being roughly the size of Earth, Sirius B contains nearly the mass of the Sun!'
  },
  {
    id: 'antares',
    name: 'Antares',
    category: 'stars',
    type: 'Red Supergiant',
    description: 'A massive red supergiant 700 times larger than our Sun!',
    longDescription: 'Antares is the heart of the constellation Scorpius. This red supergiant is so large that if placed at the center of our solar system, it would extend beyond the orbit of Mars.',
    coolFact: 'Antares means "rival of Mars" because of its similar red color!',
    extendedFacts: [
      'About 550 light-years away',
      'Will likely explode as a supernova',
      'Has a companion blue star',
      '10,000 times brighter than the Sun'
    ],
    metric: '700x',
    metricLabel: 'Sun\'s size',
    icon: '🔴',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'Antares is one of the brightest stars in the night sky and marks the heart of Scorpius the Scorpion. Like Betelgeuse, Antares is a red supergiant nearing the end of its life. It will eventually explode as a supernova, though this could be thousands or millions of years in the future.'
  },
  {
    id: 'canopus',
    name: 'Canopus',
    category: 'stars',
    type: 'Yellow-White Supergiant',
    description: 'The second brightest star in the night sky, 10,000 times brighter than the Sun!',
    longDescription: 'Canopus is a yellow-white supergiant star located about 310 light-years away. It\'s the brightest star in the constellation Carina and serves as a navigation beacon for spacecraft.',
    coolFact: 'Spacecraft use Canopus as a reference point for navigation!',
    extendedFacts: [
      'Named after a mythological Greek navigator',
      '71 times the Sun\'s diameter',
      'Visible from southern latitudes',
      'Used for spacecraft navigation since the 1960s'
    ],
    metric: '10,000x',
    metricLabel: 'Sun\'s brightness',
    icon: '⭐',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Canopus has been used for spacecraft navigation since the early Space Age. Its brightness and position make it ideal for star trackers to determine spacecraft orientation. Ancient Egyptians and Greeks knew Canopus, and it was an important star for sailors navigating the Mediterranean and beyond.'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    category: 'stars',
    type: 'Red Giant',
    description: 'The brightest star in the northern celestial hemisphere!',
    longDescription: 'Arcturus is an aging red giant star about 37 light-years away. It\'s moving through space at unusual speed and may have originated from a different galaxy!',
    coolFact: 'Arcturus might be an intergalactic visitor from another galaxy!',
    extendedFacts: [
      '25 times larger than the Sun',
      'Only 37 light-years away',
      'Part of the Arcturus stream of stars',
      '170 times brighter than the Sun'
    ],
    metric: '37',
    metricLabel: 'light-years',
    icon: '🟠',
    color: 'destructive',
    distance: 'near',
    readMoreContent: 'Arcturus is one of the easiest stars to find - just follow the arc of the Big Dipper\'s handle. It\'s part of the Arcturus stream, a group of stars moving together through the Milky Way on unusual orbits. Scientists believe these stars may have been captured from a smaller galaxy that merged with ours billions of years ago.'
  },
  {
    id: 'deneb',
    name: 'Deneb',
    category: 'stars',
    type: 'Blue-White Supergiant',
    description: 'One of the most luminous stars known, shining with the light of 200,000 Suns!',
    longDescription: 'Deneb is an incredibly luminous blue-white supergiant that marks the tail of Cygnus the Swan. Despite being about 2,600 light-years away, it\'s still one of the brightest stars in our sky.',
    coolFact: 'Deneb is so bright that if it were as close as Sirius, it would cast shadows!',
    extendedFacts: [
      'Part of the Summer Triangle asterism',
      'About 200,000 times the Sun\'s luminosity',
      'Will become a supernova someday',
      '200 times the Sun\'s diameter'
    ],
    metric: '200,000x',
    metricLabel: 'Sun\'s brightness',
    icon: '💙',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Deneb\'s true luminosity is staggering. Most of the brightest stars we see are nearby - Deneb is exceptional because it\'s genuinely one of the most luminous stars in our galaxy. It\'s one of the largest white stars known and will eventually end its life as a spectacular supernova.'
  },
  {
    id: 'rosette-nebula',
    name: 'Rosette Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'A stunning rose-shaped stellar nursery 130 light-years across!',
    longDescription: 'The Rosette Nebula is a beautiful emission nebula that looks like a cosmic rose. At its center is a cluster of young, hot stars whose radiation is sculpting the surrounding gas.',
    coolFact: 'The hole in the center was carved by radiation from young stars!',
    extendedFacts: [
      'Located about 5,000 light-years away',
      'Contains enough gas to make 10,000 Suns',
      'The central cluster is only 4 million years old',
      'Visible with binoculars in the constellation Monoceros'
    ],
    metric: '130',
    metricLabel: 'light-years wide',
    icon: '🌹',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Rosette Nebula\'s flower-like appearance is created by the interplay of stellar winds and radiation from the young star cluster NGC 2244 at its center. These energetic stars are gradually clearing out a cavity and will eventually disperse the entire nebula, ending star formation in this region.'
  },
  {
    id: 'lagoon-nebula',
    name: 'Lagoon Nebula',
    category: 'nebulas',
    type: 'Emission Nebula',
    description: 'One of only two star-forming nebulas visible to the naked eye!',
    longDescription: 'The Lagoon Nebula is a giant interstellar cloud in the constellation Sagittarius. It\'s one of the brightest nebulas in the sky and contains the Hourglass Nebula at its heart.',
    coolFact: 'The Lagoon is visible to the naked eye as a fuzzy patch near the Milky Way!',
    extendedFacts: [
      'About 4,100 light-years away',
      '110 by 50 light-years in size',
      'Contains hot young stars and dark dust lanes',
      'Named for the dark lane that looks like a lagoon'
    ],
    metric: '110',
    metricLabel: 'light-years wide',
    icon: '🏝️',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Lagoon Nebula has been known since the 1600s and remains a favorite target for astronomers. The dark lane that gives it its name is actually a cold, dense cloud of dust blocking light from behind. The nebula contains many Bok globules - small, dark clouds that may be collapsing to form new stars.'
  },
  {
    id: 'sombrero-galaxy',
    name: 'Sombrero Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'A stunning galaxy with a brilliant nucleus and a prominent dust lane!',
    longDescription: 'The Sombrero Galaxy gets its name from its resemblance to a Mexican hat. Its bright nucleus and distinctive dust lane make it one of the most photogenic galaxies in the sky.',
    coolFact: 'The Sombrero has a supermassive black hole 1 billion times the Sun\'s mass!',
    extendedFacts: [
      'About 28 million light-years away',
      'Has an unusually large central bulge',
      'Contains about 2,000 globular clusters',
      'May be an elliptical galaxy with a disk'
    ],
    metric: '1 billion',
    metricLabel: 'solar mass black hole',
    icon: '🎩',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Sombrero Galaxy\'s unique appearance comes from its large, bright nucleus surrounded by a prominent dust lane when viewed edge-on. It has an unusually rich system of globular clusters - about 10 times as many as the Milky Way. Its central black hole is one of the most massive found in nearby galaxies.'
  },
  {
    id: 'pinwheel-galaxy',
    name: 'Pinwheel Galaxy',
    category: 'galaxies',
    type: 'Spiral Galaxy',
    description: 'A magnificent face-on spiral galaxy showcasing perfect spiral structure!',
    longDescription: 'The Pinwheel Galaxy (M101) is a grand design spiral galaxy seen face-on from Earth. Its beautiful spiral arms are filled with star-forming regions and young blue stars.',
    coolFact: 'The Pinwheel Galaxy is 70% larger than our Milky Way!',
    extendedFacts: [
      'About 21 million light-years away',
      'Contains over 1 trillion stars',
      'Has asymmetric spiral arms',
      'Several supernovas observed here'
    ],
    metric: '170,000',
    metricLabel: 'light-years wide',
    icon: '🌀',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The Pinwheel Galaxy is one of the best examples of a grand design spiral galaxy. Its asymmetric appearance suggests gravitational interactions with neighboring galaxies. Several supernovas have been observed in M101, including SN 2023ixf in 2023, one of the closest and brightest supernovas in recent decades.'
  },
  {
    id: 'cigar-galaxy',
    name: 'Cigar Galaxy',
    category: 'galaxies',
    type: 'Starburst Galaxy',
    description: 'A galaxy producing new stars 10 times faster than the Milky Way!',
    longDescription: 'The Cigar Galaxy (M82) is undergoing an intense burst of star formation triggered by a close encounter with the nearby galaxy M81. Superheated gas streams out from its core.',
    coolFact: 'The Cigar Galaxy is blowing superheated gas into space at 2 million mph!',
    extendedFacts: [
      'About 12 million light-years away',
      'Producing stars 10 times faster than normal',
      'Interacting with nearby M81 galaxy',
      'Has a powerful galactic wind'
    ],
    metric: '10x',
    metricLabel: 'star formation rate',
    icon: '💨',
    color: 'destructive',
    distance: 'far',
    readMoreContent: 'The Cigar Galaxy\'s starburst was triggered by a close gravitational encounter with M81 about 300 million years ago. The intense star formation is concentrated in the galaxy\'s core, where conditions resemble the early universe. Strong galactic winds carry gas and dust thousands of light-years into intergalactic space.'
  },
  {
    id: 'solar-wind',
    name: 'Solar Wind',
    category: 'other',
    type: 'Space Weather',
    description: 'A constant stream of charged particles flowing from the Sun at 1 million mph!',
    longDescription: 'The solar wind is a continuous flow of electrically charged particles (plasma) released from the Sun\'s corona. It shapes the heliosphere and interacts with planetary magnetic fields.',
    coolFact: 'The solar wind creates beautiful auroras when it hits Earth\'s magnetic field!',
    extendedFacts: [
      'Travels at 250-750 km/s',
      'Creates the heliosphere',
      'Pushes comet tails away from the Sun',
      'Affects satellite communications'
    ],
    metric: '1 million',
    metricLabel: 'mph speed',
    icon: '💨',
    color: 'primary',
    distance: 'near',
    readMoreContent: 'The solar wind defines our heliosphere - the bubble of space dominated by the Sun\'s influence. When solar wind particles hit Earth\'s magnetic field, they can create geomagnetic storms and beautiful auroras. The solar wind also pushes comet tails to always point away from the Sun, regardless of the comet\'s direction of travel.'
  },
  {
    id: 'kuiper-belt',
    name: 'Kuiper Belt',
    category: 'other',
    type: 'Disk Region',
    description: 'A vast disk of icy bodies beyond Neptune containing millions of objects!',
    longDescription: 'The Kuiper Belt is a ring of icy objects extending from Neptune\'s orbit (30 AU) to about 50 AU from the Sun. It\'s home to dwarf planets Pluto, Eris, Makemake, and Haumea.',
    coolFact: 'The Kuiper Belt contains more mass than the asteroid belt!',
    extendedFacts: [
      'Contains trillions of icy objects',
      'Source of short-period comets',
      'Extends 30-50 AU from the Sun',
      'Discovered in 1992'
    ],
    metric: 'Trillions',
    metricLabel: 'of objects',
    icon: '💫',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'The Kuiper Belt was theoretical until 1992 when the first Kuiper Belt Object (other than Pluto) was discovered. It\'s the source of short-period comets that take less than 200 years to orbit the Sun. New Horizons became the first spacecraft to explore the Kuiper Belt when it flew by Pluto in 2015 and Arrokoth in 2019.'
  },
  {
    id: 'oort-cloud',
    name: 'Oort Cloud',
    category: 'other',
    type: 'Spherical Shell',
    description: 'A hypothetical shell of trillions of icy objects at the edge of our solar system!',
    longDescription: 'The Oort Cloud is believed to be a vast spherical shell of icy bodies extending from 2,000 to 100,000 AU from the Sun. It\'s thought to be the source of long-period comets.',
    coolFact: 'The Oort Cloud is so far away that even Voyager 1 won\'t reach it for 300 years!',
    extendedFacts: [
      'May contain trillions of objects',
      'Extends nearly halfway to the nearest star',
      'No spacecraft has ever visited it',
      'Named after astronomer Jan Oort'
    ],
    metric: '100,000',
    metricLabel: 'AU distance',
    icon: '☁️',
    color: 'secondary',
    distance: 'far',
    readMoreContent: 'The Oort Cloud has never been directly observed - it\'s inferred from the orbits of long-period comets. These comets can take millions of years to orbit the Sun. The Oort Cloud marks the true edge of the Sun\'s gravitational influence. Passing stars occasionally disturb Oort Cloud objects, sending them toward the inner solar system as comets.'
  },
  {
    id: 'exoplanet-kepler-22b',
    name: 'Kepler-22b',
    category: 'other',
    type: 'Exoplanet',
    description: 'The first planet found in the habitable zone of a Sun-like star!',
    longDescription: 'Kepler-22b orbits in the habitable zone of its star, where liquid water could exist. It\'s about 2.4 times Earth\'s size and might be a water world or a mini-Neptune.',
    coolFact: 'Kepler-22b receives about the same amount of light as Earth from our Sun!',
    extendedFacts: [
      'About 600 light-years away',
      '290-day orbital period',
      'First habitable zone planet from Kepler mission',
      'Star is slightly smaller and cooler than our Sun'
    ],
    metric: '600',
    metricLabel: 'light-years away',
    icon: '🌍',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'Kepler-22b was a landmark discovery - the first planet found orbiting in the habitable zone of a Sun-like star. Its size suggests it might be a "super-Earth" or "mini-Neptune." We don\'t know if it has a rocky surface or is a water world, but its location makes it a prime target for future observations.'
  },
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b',
    category: 'other',
    type: 'Exoplanet',
    description: 'The closest known exoplanet to Earth, orbiting our nearest stellar neighbor!',
    longDescription: 'Proxima b is a potentially rocky planet orbiting Proxima Centauri, just 4.24 light-years away. It orbits in the habitable zone and could possibly have liquid water.',
    coolFact: 'Proxima b is so close that future spacecraft might actually visit it!',
    extendedFacts: [
      'Orbits in just 11.2 days',
      'About 1.3 times Earth\'s mass',
      'May be tidally locked to its star',
      'Target of the Breakthrough Starshot project'
    ],
    metric: '4.24',
    metricLabel: 'light-years',
    icon: '🪐',
    color: 'accent',
    distance: 'far',
    readMoreContent: 'Proxima b\'s proximity makes it the most exciting exoplanet for potential future exploration. The Breakthrough Starshot project aims to send tiny spacecraft to Proxima Centauri. However, Proxima Centauri is a red dwarf star prone to violent flares, which might strip away any atmosphere the planet has.'
  },
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e',
    category: 'other',
    type: 'Exoplanet',
    description: 'The most Earth-like planet in the famous TRAPPIST-1 system!',
    longDescription: 'TRAPPIST-1e is one of seven Earth-sized planets orbiting the ultracool dwarf star TRAPPIST-1. It\'s the most likely of the seven to have conditions suitable for life.',
    coolFact: 'TRAPPIST-1e receives almost the same amount of energy as Earth does from the Sun!',
    extendedFacts: [
      'About 40 light-years away',
      'Orbits in just 6.1 days',
      'Similar size and density to Earth',
      'Part of a seven-planet system'
    ],
    metric: '6.1',
    metricLabel: 'day year',
    icon: '🌎',
    color: 'primary',
    distance: 'far',
    readMoreContent: 'The TRAPPIST-1 system is remarkable - seven Earth-sized planets orbiting so close that they would all fit inside Mercury\'s orbit. Three or four are in the habitable zone. TRAPPIST-1e is the most promising for habitability, with similar size and stellar heating to Earth. The James Webb Space Telescope is studying these worlds for signs of atmospheres.'
  }
];

// Some entries were duplicated across sections of this catalogue, which produced
// duplicate React keys and repeated cards. Keep the first occurrence of each id.
const expandedCelestialBodies: CelestialBody[] = expandedCelestialCatalog.map((body) => ({
  id: body.id,
  name: body.name,
  category: body.explorerCategory,
  type: body.objectType,
  description: `${body.name} is a ${body.objectType.toLowerCase()} in or near our Milky Way neighborhood.`,
  longDescription: `${body.name} belongs to the supplied Milky Way catalogue. Astronomers study objects of this kind to understand how stars, planetary systems, clouds, and galaxies form and change.`,
  coolFact: `${body.name} helps astronomers map our cosmic neighborhood and compare very different kinds of space objects.`,
  extendedFacts: [
    `Object class: ${body.objectType}`,
    'Included in the expanded Milky Way learning catalogue',
    'Its measured size can vary as observations improve',
  ],
  metric: body.objectType,
  metricLabel: 'Object type',
  icon: body.emoji,
  color: body.sizeType === 'star' ? 'star' : body.sizeType === 'galaxy' ? 'galaxy' : body.sizeType === 'nebula' ? 'nebula' : 'planet',
  distance: body.name === 'Sun' ? 'near' : 'far',
  readMoreContent: `${body.name} is part of a broad catalogue spanning nearby stars, exoplanets, stellar nurseries, clusters, molecular clouds, energetic remnants, and major Milky Way objects. Its entry is designed as a starting point for exploration and size comparison.`,
}));

const normalizeObjectName = (name: string) => name.toLowerCase().replace(/^the\s+/, '').replace(/\s*\([^)]*\)\s*/g, '').trim();

export const celestialBodies: CelestialBody[] = [...rawCelestialBodies, ...expandedCelestialBodies].filter(
  (body, index, all) => all.findIndex((candidate) => normalizeObjectName(candidate.name) === normalizeObjectName(body.name)) === index,
);


export const categoryLabels: Record<CelestialCategory, string> = {
  'solar-system': 'Solar System',
  'stars': 'Stars',
  'nebulas': 'Nebulas',
  'galaxies': 'Galaxies & Beyond',
  'other': 'Other'
};