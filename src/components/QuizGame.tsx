import { useState, useMemo, useEffect } from 'react';
import { quizQuestions, badges, difficultyConfig, QuizQuestion } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Trophy, RotateCcw, Play, Star, Coins } from 'lucide-react';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';
type GameState = 'start' | 'playing' | 'finished';

const QuizGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mixed');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const { addCoins } = useCoins();

  const gameQuestions = useMemo(() => {
    let filtered: QuizQuestion[];
    
    if (selectedDifficulty === 'mixed') {
      // Get 2 easy, 2 medium, 1 hard for mixed mode
      const easy = quizQuestions.filter(q => q.difficulty === 'easy').sort(() => Math.random() - 0.5).slice(0, 2);
      const medium = quizQuestions.filter(q => q.difficulty === 'medium').sort(() => Math.random() - 0.5).slice(0, 2);
      const hard = quizQuestions.filter(q => q.difficulty === 'hard').sort(() => Math.random() - 0.5).slice(0, 1);
      filtered = [...easy, ...medium, ...hard].sort(() => Math.random() - 0.5);
    } else {
      filtered = quizQuestions
        .filter(q => q.difficulty === selectedDifficulty)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    }
    
    return filtered;
  }, [selectedDifficulty, gameState]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === gameQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('finished');
    }
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCoinsAwarded(false);
  };

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCoinsAwarded(false);
  };

  const getBadge = () => {
    return badges.reduce((prev, current) => 
      score >= current.minScore ? current : prev
    , badges[0]);
  };

  // Start Screen
  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-display font-bold mb-2">🚀 Space Quiz Challenge</h3>
          <p className="text-muted-foreground">Choose your difficulty level and test your cosmic knowledge!</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: 'easy' as Difficulty, ...difficultyConfig.easy, questions: quizQuestions.filter(q => q.difficulty === 'easy').length },
            { value: 'medium' as Difficulty, ...difficultyConfig.medium, questions: quizQuestions.filter(q => q.difficulty === 'medium').length },
            { value: 'hard' as Difficulty, ...difficultyConfig.hard, questions: quizQuestions.filter(q => q.difficulty === 'hard').length },
            { value: 'mixed' as Difficulty, label: 'Mixed', emoji: '🌈', color: 'text-purple-400', bgColor: 'bg-purple-500/20', questions: quizQuestions.length },
          ].map((diff) => (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedDifficulty === diff.value
                  ? 'border-primary bg-primary/20 scale-105'
                  : 'border-primary/20 hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">{diff.emoji}</div>
              <div className={`font-semibold ${diff.color}`}>{diff.label}</div>
              <div className="text-xs text-muted-foreground">{diff.questions} questions</div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleStartGame} size="lg" className="gap-2">
            <Play className="w-5 h-5" />
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (gameState === 'finished') {
    const badge = getBadge();
    const isPerfect = score === gameQuestions.length;
    const coinReward = isPerfect ? COIN_REWARDS.QUIZ_PERFECT : score >= 3 ? COIN_REWARDS.QUIZ_GOOD : 10;
    
    if (!coinsAwarded) {
      addCoins(coinReward, isPerfect ? 'Perfect Quiz!' : 'Quiz Complete!');
      setCoinsAwarded(true);
    }
    
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-8 border border-primary/20 text-center">
        <div className="text-6xl mb-4 animate-bounce">{badge.emoji}</div>
        <h3 className="text-2xl font-display font-bold mb-2">Quiz Complete!</h3>
        <p className="text-xl mb-4">
          You earned the <span className="text-primary font-bold">{badge.name}</span> badge!
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-bold">{score} / {gameQuestions.length}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            selectedDifficulty === 'mixed' ? 'bg-purple-500/20 text-purple-400' :
            difficultyConfig[selectedDifficulty].bgColor + ' ' + difficultyConfig[selectedDifficulty].color
          }`}>
            {selectedDifficulty === 'mixed' ? '🌈 Mixed' : difficultyConfig[selectedDifficulty].emoji + ' ' + difficultyConfig[selectedDifficulty].label}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-lg">+{coinReward} coins!</span>
        </div>
        <Button onClick={handleRestart} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
      </div>
    );
  }

  // Playing Screen
  const question = gameQuestions[currentQuestion];
  const diffConfig = difficultyConfig[question.difficulty];

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20">
      {/* Progress and Score */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}/{gameQuestions.length}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}>
            {diffConfig.emoji} {diffConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="font-bold">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / gameQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <span className="text-sm text-primary font-medium">{question.category}</span>
        <h4 className="text-xl font-semibold mt-1">{question.question}</h4>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showResult = showFeedback;
          
          let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all ';
          
          if (showResult) {
            if (isCorrect) {
              buttonClass += 'border-green-500 bg-green-500/20 text-green-100';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-500/20 text-red-100';
            } else {
              buttonClass += 'border-muted/50 opacity-50';
            }
          } else {
            buttonClass += isSelected 
              ? 'border-primary bg-primary/20' 
              : 'border-primary/20 hover:border-primary/50 hover:bg-primary/10';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback and Next Button */}
      {showFeedback && (
        <div className="space-y-4 animate-fade-in">
          <div className={`p-4 rounded-xl ${
            selectedAnswer === question.correctAnswer 
              ? 'bg-green-500/20 border border-green-500/50' 
              : 'bg-amber-500/20 border border-amber-500/50'
          }`}>
            <p className="text-sm">
              {selectedAnswer === question.correctAnswer ? '🎉 ' : '💡 '}
              {question.explanation}
            </p>
          </div>
          <Button onClick={handleNext} className="w-full">
            {currentQuestion < gameQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
