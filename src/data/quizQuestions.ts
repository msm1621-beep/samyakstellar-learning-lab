export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
  // EASY QUESTIONS
  {
    id: 'q1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    category: 'Planets',
    explanation: 'Mars is called the Red Planet because of its rusty red color!',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: 'Jupiter is so big that all other planets could fit inside it!',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'How many moons does Earth have?',
    options: ['None', 'One', 'Two', 'Three'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'Earth has just one moon - simply called The Moon!',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: 'What is the closest star to Earth?',
    options: ['Polaris', 'Sirius', 'The Sun', 'Alpha Centauri'],
    correctAnswer: 2,
    category: 'Stars',
    explanation: 'The Sun is our closest star - only about 8 light-minutes away!',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'Which planet has the famous rings?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: "Saturn's beautiful rings are made of ice and rock!",
    difficulty: 'easy'
  },
  {
    id: 'q6',
    question: 'What color is the Sun?',
    options: ['Yellow', 'White', 'Orange', 'Red'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'The Sun is actually white! It looks yellow from Earth due to our atmosphere.',
    difficulty: 'easy'
  },
  {
    id: 'q7',
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: 'Mercury is the closest planet to the Sun and also the smallest!',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    question: 'What do we call a rock from space that lands on Earth?',
    options: ['Asteroid', 'Comet', 'Meteorite', 'Star'],
    correctAnswer: 2,
    category: 'Solar System',
    explanation: 'When a meteor survives the trip through our atmosphere and lands, it becomes a meteorite!',
    difficulty: 'easy'
  },
  
  // MEDIUM QUESTIONS
  {
    id: 'q9',
    question: 'What is a nebula?',
    options: ['A type of star', 'A cloud of gas and dust', 'A small planet', 'A moon'],
    correctAnswer: 1,
    category: 'Nebulas',
    explanation: 'Nebulas are giant clouds of gas and dust where new stars are born!',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    question: 'What galaxy do we live in?',
    options: ['Andromeda', 'Sombrero', 'Milky Way', 'Whirlpool'],
    correctAnswer: 2,
    category: 'Galaxies',
    explanation: 'Our solar system is located in the Milky Way galaxy!',
    difficulty: 'medium'
  },
  {
    id: 'q11',
    question: 'What happens to a star when it runs out of fuel?',
    options: ['It disappears', 'It becomes a red giant', 'It turns blue', 'Nothing'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'When stars like our Sun run out of fuel, they puff up into red giants!',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    question: 'What is an exoplanet?',
    options: ['A very big planet', 'A planet outside our solar system', 'A planet with no moons', 'A hot planet'],
    correctAnswer: 1,
    category: 'Exoplanets',
    explanation: "Exoplanets orbit stars other than our Sun - we've found thousands!",
    difficulty: 'medium'
  },
  {
    id: 'q13',
    question: 'What creates a comet\'s tail?',
    options: ['Wind', 'Heat from the Sun', 'Gravity', 'Other comets'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'When comets get close to the Sun, the heat makes gas and dust stream off!',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    question: 'How long does it take light from the Sun to reach Earth?',
    options: ['1 second', '8 minutes', '1 hour', '1 day'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'Sunlight travels about 150 million km and takes around 8 minutes to reach us!',
    difficulty: 'medium'
  },
  {
    id: 'q15',
    question: 'What is the hottest planet in our solar system?',
    options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    correctAnswer: 1,
    category: 'Planets',
    explanation: 'Venus is hottest because its thick atmosphere traps heat like a blanket!',
    difficulty: 'medium'
  },
  {
    id: 'q16',
    question: 'What are Saturn\'s rings made of?',
    options: ['Fire', 'Gas', 'Ice and rock', 'Metal'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: "Saturn's rings are made of billions of pieces of ice and rock, from tiny grains to huge chunks!",
    difficulty: 'medium'
  },
  {
    id: 'q17',
    question: 'Which moon in our solar system has active volcanoes?',
    options: ['Earth\'s Moon', 'Europa', 'Io', 'Titan'],
    correctAnswer: 2,
    category: 'Moons',
    explanation: "Io, Jupiter's moon, is the most volcanically active place in our solar system!",
    difficulty: 'medium'
  },
  {
    id: 'q18',
    question: 'What is the name of the first satellite launched into space?',
    options: ['Apollo', 'Sputnik', 'Voyager', 'Hubble'],
    correctAnswer: 1,
    category: 'Space Exploration',
    explanation: 'Sputnik 1 was launched by the Soviet Union in 1957 and started the Space Age!',
    difficulty: 'medium'
  },
  
  // HARD QUESTIONS
  {
    id: 'q19',
    question: 'What is special about black holes?',
    options: ['They are very cold', 'Nothing can escape their gravity', 'They glow brightly', 'They are small'],
    correctAnswer: 1,
    category: 'Black Holes',
    explanation: 'Black holes have such strong gravity that not even light can escape!',
    difficulty: 'hard'
  },
  {
    id: 'q20',
    question: 'What is the name of the boundary around a black hole?',
    options: ['Event Horizon', 'Photosphere', 'Corona', 'Magnetosphere'],
    correctAnswer: 0,
    category: 'Black Holes',
    explanation: 'The event horizon is the point of no return - once you cross it, you cannot escape!',
    difficulty: 'hard'
  },
  {
    id: 'q21',
    question: 'What type of star will our Sun become at the end of its life?',
    options: ['Black hole', 'Neutron star', 'White dwarf', 'Red dwarf'],
    correctAnswer: 2,
    category: 'Stars',
    explanation: 'After becoming a red giant, our Sun will shrink into a small, dense white dwarf!',
    difficulty: 'hard'
  },
  {
    id: 'q22',
    question: 'What is a pulsar?',
    options: ['A dying star', 'A rotating neutron star', 'A type of galaxy', 'A large asteroid'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'Pulsars are rapidly spinning neutron stars that emit beams of radiation like cosmic lighthouses!',
    difficulty: 'hard'
  },
  {
    id: 'q23',
    question: 'What causes a supernova?',
    options: ['Two stars colliding', 'A massive star exploding', 'A planet hitting a star', 'Solar flares'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'When massive stars run out of fuel, they collapse and explode in a brilliant supernova!',
    difficulty: 'hard'
  },
  {
    id: 'q24',
    question: 'What is the most common type of galaxy?',
    options: ['Spiral', 'Elliptical', 'Irregular', 'Dwarf'],
    correctAnswer: 1,
    category: 'Galaxies',
    explanation: 'Elliptical galaxies are the most common, though spirals like the Milky Way are very famous!',
    difficulty: 'hard'
  },
  {
    id: 'q25',
    question: 'What is redshift in astronomy?',
    options: ['Stars turning red', 'Light stretching as objects move away', 'Sunset on other planets', 'Red nebulas'],
    correctAnswer: 1,
    category: 'Cosmology',
    explanation: 'Redshift happens when light stretches to longer wavelengths as objects move away from us!',
    difficulty: 'hard'
  },
  {
    id: 'q26',
    question: 'What is the Kuiper Belt?',
    options: ['A ring of asteroids', 'A region of icy objects beyond Neptune', 'A constellation', 'A type of nebula'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'The Kuiper Belt is home to Pluto and millions of icy objects beyond Neptune!',
    difficulty: 'hard'
  },
  {
    id: 'q27',
    question: 'What is a quasar?',
    options: ['A small star', 'A type of comet', 'An extremely bright galactic core', 'A moon'],
    correctAnswer: 2,
    category: 'Galaxies',
    explanation: 'Quasars are supermassive black holes actively consuming matter, outshining entire galaxies!',
    difficulty: 'hard'
  },
  {
    id: 'q28',
    question: 'What element makes up most of the Sun?',
    options: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],
    correctAnswer: 2,
    category: 'Stars',
    explanation: 'The Sun is about 73% hydrogen, which it fuses into helium in its core!',
    difficulty: 'hard'
  },
  {
    id: 'q29',
    question: 'What is the Great Red Spot on Jupiter?',
    options: ['A volcano', 'A giant storm', 'A crater', 'A moon shadow'],
    correctAnswer: 1,
    category: 'Planets',
    explanation: 'The Great Red Spot is a massive storm that has been raging for at least 400 years!',
    difficulty: 'hard'
  },
  {
    id: 'q30',
    question: 'What is a kilonova?',
    options: ['A small star', 'Two neutron stars colliding', 'A type of planet', 'A meteor shower'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'A kilonova occurs when two neutron stars collide, creating gold and other heavy elements!',
    difficulty: 'hard'
  },
];

export const badges = [
  { minScore: 0, name: 'Space Cadet', emoji: '🚀' },
  { minScore: 3, name: 'Star Gazer', emoji: '⭐' },
  { minScore: 5, name: 'Nebula Navigator', emoji: '🌌' },
  { minScore: 7, name: 'Galaxy Explorer', emoji: '🔭' },
  { minScore: 9, name: 'Cosmic Genius', emoji: '🧠' },
];

export const difficultyConfig = {
  easy: { label: 'Easy', emoji: '🌟', color: 'text-green-400', bgColor: 'bg-green-500/20' },
  medium: { label: 'Medium', emoji: '🌙', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  hard: { label: 'Hard', emoji: '🔥', color: 'text-red-400', bgColor: 'bg-red-500/20' },
};
