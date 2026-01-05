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

export const celestialBodies: CelestialBody[] = [
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
  }
];

export const categoryLabels: Record<CelestialCategory, string> = {
  'solar-system': 'Solar System',
  'stars': 'Stars',
  'nebulas': 'Nebulas',
  'galaxies': 'Galaxies & Beyond',
  'other': 'Other'
};