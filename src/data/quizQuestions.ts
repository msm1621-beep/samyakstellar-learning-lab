export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    category: 'Planets',
    explanation: 'Mars is called the Red Planet because of its rusty red color!'
  },
  {
    id: 'q2',
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: 'Jupiter is so big that all other planets could fit inside it!'
  },
  {
    id: 'q3',
    question: 'What is a nebula?',
    options: ['A type of star', 'A cloud of gas and dust', 'A small planet', 'A moon'],
    correctAnswer: 1,
    category: 'Nebulas',
    explanation: 'Nebulas are giant clouds of gas and dust where new stars are born!'
  },
  {
    id: 'q4',
    question: 'What galaxy do we live in?',
    options: ['Andromeda', 'Sombrero', 'Milky Way', 'Whirlpool'],
    correctAnswer: 2,
    category: 'Galaxies',
    explanation: 'Our solar system is located in the Milky Way galaxy!'
  },
  {
    id: 'q5',
    question: 'What happens to a star when it runs out of fuel?',
    options: ['It disappears', 'It becomes a red giant', 'It turns blue', 'Nothing'],
    correctAnswer: 1,
    category: 'Stars',
    explanation: 'When stars like our Sun run out of fuel, they puff up into red giants!'
  },
  {
    id: 'q6',
    question: 'What is special about black holes?',
    options: ['They are very cold', 'Nothing can escape their gravity', 'They glow brightly', 'They are small'],
    correctAnswer: 1,
    category: 'Black Holes',
    explanation: 'Black holes have such strong gravity that not even light can escape!'
  },
  {
    id: 'q7',
    question: 'Which planet has the famous rings?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
    correctAnswer: 2,
    category: 'Planets',
    explanation: 'Saturn\'s beautiful rings are made of ice and rock!'
  },
  {
    id: 'q8',
    question: 'What is an exoplanet?',
    options: ['A very big planet', 'A planet outside our solar system', 'A planet with no moons', 'A hot planet'],
    correctAnswer: 1,
    category: 'Exoplanets',
    explanation: 'Exoplanets orbit stars other than our Sun - we\'ve found thousands!'
  },
  {
    id: 'q9',
    question: 'What creates a comet\'s tail?',
    options: ['Wind', 'Heat from the Sun', 'Gravity', 'Other comets'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'When comets get close to the Sun, the heat makes gas and dust stream off!'
  },
  {
    id: 'q10',
    question: 'How many moons does Earth have?',
    options: ['None', 'One', 'Two', 'Three'],
    correctAnswer: 1,
    category: 'Solar System',
    explanation: 'Earth has just one moon - simply called The Moon!'
  },
];

export const badges = [
  { minScore: 0, name: 'Space Cadet', emoji: '🚀' },
  { minScore: 3, name: 'Star Gazer', emoji: '⭐' },
  { minScore: 5, name: 'Nebula Navigator', emoji: '🌌' },
  { minScore: 7, name: 'Galaxy Explorer', emoji: '🔭' },
  { minScore: 9, name: 'Cosmic Genius', emoji: '🧠' },
];
