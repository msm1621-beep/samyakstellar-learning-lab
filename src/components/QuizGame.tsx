import { useState, useMemo } from 'react';
import { Trophy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quizQuestions, badges } from '@/data/quizQuestions';

const QuizGame = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Shuffle and pick 5 questions
  const questions = useMemo(() => {
    return [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [gameState]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('finished');
    }
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getBadge = () => {
    return [...badges].reverse().find((b) => score >= b.minScore) || badges[0];
  };

  if (gameState === 'start') {
    return (
      <div className="glass-card rounded-2xl p-8 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-4">🧠</div>
        <h3 className="text-2xl font-display font-bold mb-4">Space Quiz Challenge</h3>
        <p className="text-muted-foreground mb-6">
          Test your knowledge about planets, stars, nebulas, galaxies, and more! 
          Answer 5 questions and earn a special badge!
        </p>
        <Button 
          size="lg" 
          onClick={() => setGameState('playing')}
          className="cosmic-glow"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Start Quiz!
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const badge = getBadge();
    return (
      <div className="glass-card rounded-2xl p-8 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-4">{badge.emoji}</div>
        <h3 className="text-2xl font-display font-bold mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-bold text-primary mb-2">{score} / 5</p>
        <p className="text-xl text-secondary mb-6">
          You earned the <span className="font-bold">{badge.name}</span> badge!
        </p>
        <Button 
          size="lg" 
          onClick={handleRestart}
          className="cosmic-glow"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-bold text-primary">
          Score: {score}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl font-display font-bold mb-6 text-center">
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswer;
          const isSelected = index === selectedAnswer;
          
          let buttonClass = 'glass-card hover:border-primary/50';
          if (showFeedback) {
            if (isCorrect) {
              buttonClass = 'bg-green-500/20 border-green-500';
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-red-500/20 border-red-500';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${buttonClass}`}
            >
              <span>{option}</span>
              {showFeedback && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
              {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-xl mb-6 ${
          selectedAnswer === currentQuestion.correctAnswer 
            ? 'bg-green-500/10 border border-green-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          <p className="text-sm">
            {selectedAnswer === currentQuestion.correctAnswer ? '🎉 Correct! ' : '💫 Not quite! '}
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {showFeedback && (
        <Button onClick={handleNext} className="w-full">
          {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
        </Button>
      )}
    </div>
  );
};

export default QuizGame;
