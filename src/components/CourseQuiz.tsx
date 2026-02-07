import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Trophy, RotateCcw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAchievements } from '@/contexts/AchievementsContext';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface CourseQuizProps {
  courseId: string;
  courseTitle: string;
  onClose: () => void;
}

// Course-specific quiz questions
const courseQuizzes: Record<string, QuizQuestion[]> = {
  course1: [
    { question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctIndex: 1, explanation: "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune." },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctIndex: 1, explanation: "Mars is called the Red Planet because of the iron oxide (rust) on its surface." },
    { question: "Which planet is the largest in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], correctIndex: 2, explanation: "Jupiter is the largest planet - so big that 1,300 Earths could fit inside it!" },
    { question: "What type of planet is Earth?", options: ["Gas giant", "Ice giant", "Rocky planet", "Dwarf planet"], correctIndex: 2, explanation: "Earth is a rocky (terrestrial) planet with a solid surface." },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctIndex: 1, explanation: "Saturn has the most moons with 146 known moons!" }
  ],
  course2: [
    { question: "What are stars made of?", options: ["Rock and metal", "Hot gas", "Ice", "Liquid water"], correctIndex: 1, explanation: "Stars are giant balls of hot, glowing gas - mainly hydrogen and helium." },
    { question: "What is the North Star called?", options: ["Sirius", "Polaris", "Betelgeuse", "Vega"], correctIndex: 1, explanation: "The North Star is called Polaris and has been used for navigation for centuries." },
    { question: "What color are the hottest stars?", options: ["Red", "Yellow", "Orange", "Blue"], correctIndex: 3, explanation: "Blue stars are the hottest, while red stars are cooler." },
    { question: "What constellation contains the Big Dipper?", options: ["Orion", "Ursa Major", "Cassiopeia", "Leo"], correctIndex: 1, explanation: "The Big Dipper is part of Ursa Major, the Great Bear constellation." },
    { question: "What happens when a massive star dies?", options: ["It disappears", "It becomes a planet", "It explodes as a supernova", "It turns into a comet"], correctIndex: 2, explanation: "Massive stars end their lives in spectacular explosions called supernovas!" }
  ],
  course3: [
    { question: "What is a galaxy?", options: ["A single star", "A collection of billions of stars", "A type of planet", "A moon"], correctIndex: 1, explanation: "A galaxy is a huge collection of stars, gas, dust, and dark matter held together by gravity." },
    { question: "What galaxy do we live in?", options: ["Andromeda", "Triangulum", "Milky Way", "Sombrero"], correctIndex: 2, explanation: "We live in the Milky Way galaxy, which contains over 200 billion stars!" },
    { question: "What is at the center of most galaxies?", options: ["A giant star", "A supermassive black hole", "A planet", "Nothing"], correctIndex: 1, explanation: "Most large galaxies have a supermassive black hole at their center." },
    { question: "What shape is the Milky Way?", options: ["Elliptical", "Irregular", "Spiral", "Square"], correctIndex: 2, explanation: "The Milky Way is a barred spiral galaxy with spiral arms." },
    { question: "Which galaxy will collide with the Milky Way?", options: ["Triangulum", "Sombrero", "Andromeda", "Whirlpool"], correctIndex: 2, explanation: "The Andromeda galaxy is heading toward us and will merge with the Milky Way in about 4 billion years!" }
  ],
  course4: [
    { question: "Who was the first human in space?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], correctIndex: 2, explanation: "Yuri Gagarin became the first human in space on April 12, 1961." },
    { question: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"], correctIndex: 1, explanation: "Neil Armstrong was the first person to walk on the Moon on July 20, 1969." },
    { question: "What is the International Space Station?", options: ["A Moon base", "A space laboratory orbiting Earth", "A rocket ship", "A satellite"], correctIndex: 1, explanation: "The ISS is a space laboratory where astronauts live and work while orbiting Earth." },
    { question: "What force pushes rockets into space?", options: ["Gravity", "Magnetism", "Thrust", "Wind"], correctIndex: 2, explanation: "Rockets use thrust - the force created by burning fuel and pushing gas out the back." },
    { question: "How long does it take to get to the Moon?", options: ["1 hour", "1 day", "About 3 days", "1 week"], correctIndex: 2, explanation: "It takes about 3 days for a spacecraft to travel from Earth to the Moon." }
  ],
  course5: [
    { question: "What is a nebula?", options: ["A type of star", "A cloud of gas and dust in space", "A planet", "A moon"], correctIndex: 1, explanation: "A nebula is a giant cloud of gas and dust in space where new stars are born." },
    { question: "What famous nebula is called the 'Pillars of Creation'?", options: ["Orion Nebula", "Eagle Nebula", "Crab Nebula", "Ring Nebula"], correctIndex: 1, explanation: "The Pillars of Creation are in the Eagle Nebula, where new stars are being born." },
    { question: "What happens in a nebula?", options: ["Planets collide", "Stars are born", "Galaxies merge", "Black holes form"], correctIndex: 1, explanation: "Nebulas are star nurseries where gravity pulls gas and dust together to form new stars." },
    { question: "What color are many emission nebulas?", options: ["White", "Black", "Red or pink", "Green"], correctIndex: 2, explanation: "Many emission nebulas appear red or pink because of glowing hydrogen gas." },
    { question: "What creates a planetary nebula?", options: ["A dying star", "A new star", "A black hole", "An asteroid"], correctIndex: 0, explanation: "Planetary nebulas form when dying stars shed their outer layers into space." }
  ],
  course6: [
    { question: "What is dark matter?", options: ["Black holes", "Invisible matter that has gravity", "Empty space", "Dark colored planets"], correctIndex: 1, explanation: "Dark matter is mysterious invisible matter that we can't see but affects gravity." },
    { question: "What is an exoplanet?", options: ["A planet in our solar system", "A planet orbiting another star", "A dwarf planet", "An asteroid"], correctIndex: 1, explanation: "Exoplanets are planets that orbit stars other than our Sun." },
    { question: "How old is the universe?", options: ["4.5 billion years", "10 billion years", "About 13.8 billion years", "1 trillion years"], correctIndex: 2, explanation: "The universe is approximately 13.8 billion years old!" },
    { question: "What started the universe?", options: ["A star", "The Big Bang", "A black hole", "The Sun"], correctIndex: 1, explanation: "The Big Bang was the explosive event that started the universe about 13.8 billion years ago." },
    { question: "What is the habitable zone?", options: ["A safe place for astronauts", "Where liquid water can exist on a planet", "The center of a galaxy", "A type of nebula"], correctIndex: 1, explanation: "The habitable zone is the area around a star where conditions might allow liquid water on a planet's surface." }
  ],
  course7: [
    { question: "What is the difference between an asteroid and a comet?", options: ["Asteroids are larger", "Comets have ice and develop tails", "Asteroids orbit faster", "There is no difference"], correctIndex: 1, explanation: "Comets are made of ice and dust, and develop tails when they approach the Sun!" },
    { question: "What is a meteor?", options: ["A rock in space", "A streak of light from a space rock burning up", "A type of star", "A planet"], correctIndex: 1, explanation: "A meteor is the streak of light we see when a space rock burns up in Earth's atmosphere." },
    { question: "Where is the asteroid belt located?", options: ["Between Earth and Mars", "Between Mars and Jupiter", "Beyond Neptune", "Around Saturn"], correctIndex: 1, explanation: "The asteroid belt is located between Mars and Jupiter." },
    { question: "What likely caused dinosaur extinction?", options: ["A volcano", "An asteroid impact", "A flood", "Climate change"], correctIndex: 1, explanation: "Scientists believe a large asteroid impact 66 million years ago led to dinosaur extinction." },
    { question: "What is a shooting star?", options: ["A dying star", "A meteor", "A comet", "A satellite"], correctIndex: 1, explanation: "A 'shooting star' is actually a meteor - a piece of space debris burning up in our atmosphere!" }
  ],
  course8: [
    { question: "What are Uranus and Neptune called?", options: ["Gas giants", "Ice giants", "Rocky planets", "Dwarf planets"], correctIndex: 1, explanation: "Uranus and Neptune are called ice giants because they contain more ice than gas." },
    { question: "What is special about Uranus's rotation?", options: ["It doesn't rotate", "It rotates on its side", "It rotates backwards", "It rotates very fast"], correctIndex: 1, explanation: "Uranus rotates on its side, like a rolling ball!" },
    { question: "Which planet has the fastest winds in the solar system?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctIndex: 3, explanation: "Neptune has the fastest winds, reaching up to 1,200 mph!" },
    { question: "Why is Neptune blue?", options: ["It has oceans", "Methane in its atmosphere", "It's made of ice", "Blue rocks"], correctIndex: 1, explanation: "Neptune's blue color comes from methane in its atmosphere, which absorbs red light." },
    { question: "Which moon of Neptune is the largest?", options: ["Nereid", "Proteus", "Triton", "Larissa"], correctIndex: 2, explanation: "Triton is Neptune's largest moon and orbits in the opposite direction to Neptune's rotation!" }
  ]
};

// Default quiz for courses without specific questions
const defaultQuiz: QuizQuestion[] = [
  { question: "What is space?", options: ["The area beyond Earth's atmosphere", "The ocean", "Underground", "A forest"], correctIndex: 0, explanation: "Space is the vast region beyond Earth's atmosphere where stars, planets, and galaxies exist." },
  { question: "How many planets are in our solar system?", options: ["6", "7", "8", "9"], correctIndex: 2, explanation: "Our solar system has 8 planets." },
  { question: "What is the Sun?", options: ["A planet", "A star", "A moon", "An asteroid"], correctIndex: 1, explanation: "The Sun is a star - a giant ball of hot, glowing gas at the center of our solar system." },
  { question: "What causes day and night on Earth?", options: ["The Moon", "Earth's rotation", "The Sun moving", "Clouds"], correctIndex: 1, explanation: "Day and night are caused by Earth rotating on its axis once every 24 hours." },
  { question: "What is gravity?", options: ["A type of light", "A force that pulls objects together", "Sound in space", "A planet"], correctIndex: 1, explanation: "Gravity is the force that pulls objects toward each other - it keeps us on the ground and planets in orbit!" }
];

const CourseQuiz = ({ courseId, courseTitle, onClose }: CourseQuizProps) => {
  const questions = courseQuizzes[courseId] || defaultQuiz;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [achievementAwarded, setAchievementAwarded] = useState(false);
  const { addAchievement } = useAchievements();
  const { addCoins } = useCoins();

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => {
      const updated = [...prev];
      updated[currentQuestion] = isCorrect;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      if (score >= questions.length * 0.8) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: "🌟", message: "Perfect Score! You're a Space Master!" };
    if (percentage >= 80) return { emoji: "🚀", message: "Excellent! You're ready for the stars!" };
    if (percentage >= 60) return { emoji: "⭐", message: "Great job! Keep exploring!" };
    if (percentage >= 40) return { emoji: "🌙", message: "Good effort! Review and try again!" };
    return { emoji: "📚", message: "Keep learning! The universe awaits!" };
  };

  if (quizComplete) {
    const { emoji, message } = getScoreMessage();
    const isPerfect = score === questions.length;
    
    // Award achievement and coins only once
    if (!achievementAwarded) {
      const coinReward = isPerfect ? COIN_REWARDS.QUIZ_PERFECT : score >= 3 ? COIN_REWARDS.QUIZ_GOOD : 10;
      addCoins(coinReward, `${courseTitle} Quiz`);
      addAchievement({
        type: 'quiz',
        name: `${courseTitle} Quiz`,
        icon: emoji,
        description: `Scored ${score}/${questions.length} on the ${courseTitle} course quiz!`
      });
      setAchievementAwarded(true);
    }
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <div className="glass-card max-w-lg w-full rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-display font-bold mb-2">Quiz Complete!</h2>
          <p className="text-xl text-primary mb-2">{score} / {questions.length} Correct</p>
          <p className="text-muted-foreground mb-6">{message}</p>
          
          <div className="flex gap-2 mb-6 justify-center">
            {answeredQuestions.map((correct, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  correct ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button onClick={onClose}>
              Finish 🎉
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card max-w-2xl w-full rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-display font-bold">{courseTitle} Quiz</h2>
            <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctIndex;
              
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-500/20";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-500/20";
                } else {
                  buttonClass += "border-muted opacity-50";
                }
              } else {
                buttonClass += isSelected 
                  ? "border-primary bg-primary/20" 
                  : "border-muted hover:border-primary/50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className={`p-4 rounded-xl mb-4 ${
            selectedAnswer === question.correctIndex 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <p className="text-sm">
              <strong>{selectedAnswer === question.correctIndex ? '✅ Correct!' : '❌ Not quite!'}</strong>
              {' '}{question.explanation}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Exit Quiz
          </Button>
          {!showResult ? (
            <Button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseQuiz;