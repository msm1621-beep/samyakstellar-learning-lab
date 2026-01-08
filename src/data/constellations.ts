export interface Star {
  x: number;
  y: number;
  size?: number;
}

export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  story: string;
  funFact: string;
  bestSeason: string;
  stars: Star[];
  connections: [number, number][];
  icon: string;
}

export const constellations: Constellation[] = [
  {
    id: 'orion',
    name: 'Orion the Hunter',
    latinName: 'Orion',
    story: 'Orion was a mighty hunter in Greek mythology. He was so strong that he boasted he could defeat any animal on Earth! The gods placed him in the sky where he continues to hunt among the stars forever.',
    funFact: 'The three stars in Orion\'s belt are called Alnitak, Alnilam, and Mintaka!',
    bestSeason: 'Winter',
    icon: '🏹',
    stars: [
      { x: 50, y: 15, size: 3 },  // Betelgeuse
      { x: 70, y: 20, size: 2 },  // Bellatrix
      { x: 45, y: 40 },           // Belt left
      { x: 55, y: 42 },           // Belt middle
      { x: 65, y: 44 },           // Belt right
      { x: 40, y: 70, size: 3 },  // Rigel
      { x: 75, y: 65, size: 2 },  // Saiph
      { x: 35, y: 55 },           // Sword
    ],
    connections: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [3, 7]]
  },
  {
    id: 'ursa-major',
    name: 'The Big Dipper',
    latinName: 'Ursa Major',
    story: 'The Big Dipper is part of the Great Bear constellation. In one story, a beautiful woman named Callisto was turned into a bear by a jealous goddess. Her son almost hunted her, but Zeus saved them both by placing them in the sky!',
    funFact: 'You can use the Big Dipper to find the North Star by following the two stars at the end of the "cup"!',
    bestSeason: 'Spring',
    icon: '🐻',
    stars: [
      { x: 20, y: 30, size: 2 },
      { x: 35, y: 25, size: 2 },
      { x: 50, y: 28 },
      { x: 60, y: 35, size: 2 },
      { x: 65, y: 50 },
      { x: 78, y: 55, size: 2 },
      { x: 85, y: 45, size: 2 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
  },
  {
    id: 'cassiopeia',
    name: 'Queen Cassiopeia',
    latinName: 'Cassiopeia',
    story: 'Cassiopeia was a vain queen who boasted she was more beautiful than the sea nymphs. As punishment, she was placed in the sky on her throne, sometimes hanging upside down!',
    funFact: 'Cassiopeia looks like a giant "W" or "M" in the sky depending on when you look!',
    bestSeason: 'Fall',
    icon: '👑',
    stars: [
      { x: 15, y: 50, size: 2 },
      { x: 30, y: 30, size: 2 },
      { x: 50, y: 45, size: 3 },
      { x: 70, y: 25, size: 2 },
      { x: 85, y: 40, size: 2 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    id: 'leo',
    name: 'Leo the Lion',
    latinName: 'Leo',
    story: 'Leo represents the fierce Nemean Lion that Hercules had to defeat as one of his twelve labors. The lion\'s skin was so tough that no weapon could pierce it, so Hercules had to use his incredible strength!',
    funFact: 'The bright star Regulus in Leo is actually four stars orbiting each other!',
    bestSeason: 'Spring',
    icon: '🦁',
    stars: [
      { x: 25, y: 20, size: 3 },  // Regulus
      { x: 35, y: 15, size: 2 },
      { x: 50, y: 20 },
      { x: 60, y: 30 },
      { x: 75, y: 35, size: 2 },
      { x: 80, y: 50 },
      { x: 70, y: 55 },
      { x: 55, y: 45 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 3]]
  },
  {
    id: 'scorpius',
    name: 'Scorpius the Scorpion',
    latinName: 'Scorpius',
    story: 'The scorpion was sent by the goddess Artemis to defeat Orion. That\'s why Orion and Scorpius are never in the sky at the same time - Orion is still running away from the scorpion!',
    funFact: 'The red star Antares in Scorpius is a supergiant star 700 times bigger than our Sun!',
    bestSeason: 'Summer',
    icon: '🦂',
    stars: [
      { x: 30, y: 25, size: 2 },
      { x: 40, y: 35 },
      { x: 50, y: 45, size: 3 },  // Antares
      { x: 55, y: 55 },
      { x: 60, y: 65 },
      { x: 70, y: 70 },
      { x: 80, y: 65 },
      { x: 85, y: 55, size: 2 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]
  },
  {
    id: 'cygnus',
    name: 'Cygnus the Swan',
    latinName: 'Cygnus',
    story: 'Cygnus represents Zeus disguised as a beautiful swan. The swan flies along the Milky Way, and you can see it soaring through the river of stars on clear summer nights!',
    funFact: 'Cygnus is also called the Northern Cross because of its shape!',
    bestSeason: 'Summer',
    icon: '🦢',
    stars: [
      { x: 50, y: 15, size: 3 },  // Deneb
      { x: 50, y: 35 },
      { x: 50, y: 55, size: 2 },  // Sadr
      { x: 30, y: 45 },
      { x: 70, y: 45 },
      { x: 50, y: 80, size: 2 },  // Albireo
    ],
    connections: [[0, 1], [1, 2], [2, 5], [2, 3], [2, 4]]
  },
  {
    id: 'draco',
    name: 'Draco the Dragon',
    latinName: 'Draco',
    story: 'Draco was a dragon that guarded golden apples in a magical garden. Hercules had to sneak past the dragon to steal the apples. Now Draco wraps around the North Star, still guarding the sky!',
    funFact: 'Draco is one of the largest constellations and wraps around the Little Dipper!',
    bestSeason: 'Summer',
    icon: '🐉',
    stars: [
      { x: 20, y: 20, size: 2 },
      { x: 30, y: 35 },
      { x: 25, y: 50 },
      { x: 40, y: 55 },
      { x: 55, y: 50, size: 2 },
      { x: 70, y: 60 },
      { x: 80, y: 50 },
      { x: 85, y: 35, size: 2 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]
  },
  {
    id: 'pegasus',
    name: 'Pegasus the Winged Horse',
    latinName: 'Pegasus',
    story: 'Pegasus was a magical flying horse with beautiful white wings. He was born from sea foam and helped the hero Bellerophon defeat monsters. Pegasus now gallops across the autumn sky!',
    funFact: 'The Great Square of Pegasus is easy to spot - it\'s about the size of your fist held at arm\'s length!',
    bestSeason: 'Fall',
    icon: '🐴',
    stars: [
      { x: 25, y: 25, size: 2 },
      { x: 55, y: 20, size: 2 },
      { x: 60, y: 50, size: 2 },
      { x: 30, y: 55, size: 2 },
      { x: 15, y: 70 },
      { x: 80, y: 35 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [1, 5]]
  },
];
