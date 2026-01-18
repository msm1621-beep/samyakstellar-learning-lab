export interface DailyFact {
  id: number;
  fact: string;
  category: 'planets' | 'stars' | 'space' | 'exploration' | 'moons';
  emoji: string;
}

export const dailyFacts: DailyFact[] = [
  { id: 1, fact: "A day on Venus is longer than a year on Venus! It takes 243 Earth days to rotate once.", category: 'planets', emoji: '🪐' },
  { id: 2, fact: "Neutron stars are so dense that a teaspoon would weigh about 6 billion tons!", category: 'stars', emoji: '⭐' },
  { id: 3, fact: "There are more stars in the universe than grains of sand on all Earth's beaches.", category: 'space', emoji: '🌌' },
  { id: 4, fact: "Footprints on the Moon will last for millions of years because there's no wind!", category: 'moons', emoji: '👣' },
  { id: 5, fact: "The International Space Station travels at 17,500 mph, orbiting Earth every 90 minutes.", category: 'exploration', emoji: '🛰️' },
  { id: 6, fact: "Jupiter's Great Red Spot is a storm that's been raging for over 400 years!", category: 'planets', emoji: '🔴' },
  { id: 7, fact: "The Sun makes up 99.86% of all the mass in our solar system.", category: 'stars', emoji: '☀️' },
  { id: 8, fact: "If you could fly a plane to Pluto, it would take more than 800 years!", category: 'space', emoji: '✈️' },
  { id: 9, fact: "Saturn's moon Titan has lakes and rivers, but they're made of liquid methane!", category: 'moons', emoji: '🌊' },
  { id: 10, fact: "Astronauts grow up to 2 inches taller in space because of no gravity!", category: 'exploration', emoji: '📏' },
  { id: 11, fact: "One million Earths could fit inside the Sun!", category: 'stars', emoji: '🌍' },
  { id: 12, fact: "Mars has the tallest volcano in the solar system - Olympus Mons is 3x taller than Everest!", category: 'planets', emoji: '🌋' },
  { id: 13, fact: "Space is completely silent because there's no air for sound to travel through.", category: 'space', emoji: '🤫' },
  { id: 14, fact: "Europa, a moon of Jupiter, may have twice as much water as Earth's oceans!", category: 'moons', emoji: '💧' },
  { id: 15, fact: "The first animal in space was a fruit fly, launched by the USA in 1947!", category: 'exploration', emoji: '🪰' },
  { id: 16, fact: "Neptune's winds are the fastest in the solar system, reaching 1,200 mph!", category: 'planets', emoji: '💨' },
  { id: 17, fact: "Betelgeuse is so big that if it replaced our Sun, it would swallow Mars!", category: 'stars', emoji: '🔥' },
  { id: 18, fact: "A year on Mercury is only 88 Earth days, but a day is 59 Earth days long!", category: 'planets', emoji: '⏰' },
  { id: 19, fact: "The largest known star, UY Scuti, is 1,700 times wider than our Sun!", category: 'stars', emoji: '🌟' },
  { id: 20, fact: "Voyager 1 is the farthest human-made object from Earth, over 14 billion miles away!", category: 'exploration', emoji: '🚀' },
  { id: 21, fact: "Earth's Moon is slowly drifting away from us at about 1.5 inches per year.", category: 'moons', emoji: '🌙' },
  { id: 22, fact: "Uranus rotates on its side, like a rolling ball through space!", category: 'planets', emoji: '🔄' },
  { id: 23, fact: "Black holes can warp time - near one, time moves slower than far away!", category: 'space', emoji: '🕳️' },
  { id: 24, fact: "The Sun's core is about 27 million degrees Fahrenheit!", category: 'stars', emoji: '🌡️' },
  { id: 25, fact: "Io, Jupiter's moon, has over 400 active volcanoes - the most volcanic place in our solar system!", category: 'moons', emoji: '🌋' },
  { id: 26, fact: "The first living creature to orbit Earth was Laika, a dog from Russia, in 1957.", category: 'exploration', emoji: '🐕' },
  { id: 27, fact: "Saturn is so light it would float if you could find a bathtub big enough!", category: 'planets', emoji: '🛁' },
  { id: 28, fact: "The Milky Way and Andromeda galaxies will collide in about 4.5 billion years!", category: 'space', emoji: '💥' },
  { id: 29, fact: "Sunlight takes 8 minutes and 20 seconds to reach Earth.", category: 'stars', emoji: '💡' },
  { id: 30, fact: "There are more trees on Earth than stars in the Milky Way!", category: 'space', emoji: '🌳' },
  { id: 31, fact: "Triton, Neptune's largest moon, orbits backwards compared to other large moons!", category: 'moons', emoji: '↩️' },
  { id: 32, fact: "The largest known structure in the universe is the Hercules-Corona Borealis Great Wall, spanning 10 billion light-years!", category: 'space', emoji: '🧱' },
  { id: 33, fact: "A pulsar can rotate up to 716 times per second!", category: 'stars', emoji: '🔄' },
  { id: 34, fact: "If you could drive to space at 60 mph, it would take less than an hour!", category: 'space', emoji: '🚗' },
  { id: 35, fact: "The Sun is so loud that if sound could travel through space, it would be 125 decibels on Earth!", category: 'stars', emoji: '📢' },
  { id: 36, fact: "Mars has blue sunsets because of how its dust scatters light!", category: 'planets', emoji: '🔵' },
  { id: 37, fact: "The first meal eaten on the Moon was bacon!", category: 'exploration', emoji: '🥓' },
  { id: 38, fact: "Enceladus shoots geysers of water into space that freeze into snow!", category: 'moons', emoji: '❄️' },
  { id: 39, fact: "The SETI project has been searching for alien signals for over 60 years!", category: 'exploration', emoji: '👽' },
  { id: 40, fact: "Venus has over 1,600 major volcanoes - more than any other planet!", category: 'planets', emoji: '🌋' },
  { id: 41, fact: "If the Sun were hollow, you could fit 1.3 million Earths inside it!", category: 'stars', emoji: '🌍' },
  { id: 42, fact: "The cosmic microwave background is the oldest light we can see - 13.8 billion years old!", category: 'space', emoji: '📻' },
  { id: 43, fact: "Ganymede, Jupiter's moon, is larger than the planet Mercury!", category: 'moons', emoji: '🌑' },
  { id: 44, fact: "NASA's Perseverance rover carries a small piece of Martian meteorite back to Mars!", category: 'exploration', emoji: '🚀' },
  { id: 45, fact: "A day on Jupiter lasts only 10 hours - the shortest day of any planet!", category: 'planets', emoji: '⏱️' },
  { id: 46, fact: "Betelgeuse is so big that if it replaced our Sun, it would extend past Jupiter's orbit!", category: 'stars', emoji: '🔴' },
  { id: 47, fact: "The largest canyon in the solar system, Valles Marineris, could stretch across the entire USA!", category: 'planets', emoji: '🏜️' },
  { id: 48, fact: "Europa may have twice as much water as all of Earth's oceans combined!", category: 'moons', emoji: '🌊' },
  { id: 49, fact: "The first photograph of a black hole was taken in 2019!", category: 'space', emoji: '📸' },
  { id: 50, fact: "Apollo astronauts left mirrors on the Moon that scientists still use today!", category: 'exploration', emoji: '🪞' },
  { id: 51, fact: "There's a storm on Saturn's north pole shaped like a hexagon!", category: 'planets', emoji: '⬡' },
  { id: 52, fact: "The Boomerang Nebula is colder than the cosmic background radiation at -272°C!", category: 'space', emoji: '🥶' },
  { id: 53, fact: "Callisto's surface hasn't changed much in 4 billion years - the oldest in our solar system!", category: 'moons', emoji: '🏛️' },
  { id: 54, fact: "The Space Shuttle's main engines could drain an average swimming pool in 25 seconds!", category: 'exploration', emoji: '🏊' },
  { id: 55, fact: "Pluto's heart-shaped glacier is larger than Texas!", category: 'planets', emoji: '💙' },
  { id: 56, fact: "Some stars are so cool you could touch them without getting burned!", category: 'stars', emoji: '🤏' },
  { id: 57, fact: "The James Webb Space Telescope can see galaxies 13.5 billion light-years away!", category: 'exploration', emoji: '🔭' },
  { id: 58, fact: "Miranda, a moon of Uranus, has cliffs 12 times higher than the Grand Canyon!", category: 'moons', emoji: '⛰️' },
  { id: 59, fact: "The Sun is actually white - it looks yellow because of Earth's atmosphere!", category: 'stars', emoji: '⚪' },
  { id: 60, fact: "There are more possible games of chess than atoms in the observable universe!", category: 'space', emoji: '♟️' }
];

export const getCategoryColor = (category: DailyFact['category']) => {
  const colors = {
    planets: 'from-orange-500/20 to-red-500/20 border-orange-500/50',
    stars: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50',
    space: 'from-purple-500/20 to-indigo-500/20 border-purple-500/50',
    exploration: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50',
    moons: 'from-slate-400/20 to-gray-500/20 border-slate-400/50'
  };
  return colors[category];
};

export const getCategoryLabel = (category: DailyFact['category']) => {
  const labels = {
    planets: 'Planets',
    stars: 'Stars',
    space: 'Deep Space',
    exploration: 'Exploration',
    moons: 'Moons'
  };
  return labels[category];
};
