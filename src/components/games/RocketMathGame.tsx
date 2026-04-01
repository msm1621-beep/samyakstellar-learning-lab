import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Rocket, Star, Zap, Coins } from 'lucide-react';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';

interface MathProblem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×';
  answer: number;
}

type GameState = 'start' | 'playing' | 'finished';

const RocketMathGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [rocketHeight, setRocketHeight] = useState(0);
  const [problemCount, setProblemCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const { addCoins } = useCoins();
  const { addAchievement } = useAchievements();

  const generateProblem = useCallback((): MathProblem => {
    const operators: ('+' | '-' | '×')[] = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1: number, num2: number, answer: number;
    
    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
    }
    
    return { num1, num2, operator, answer };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = useCallback(() => {
    setProblem(generateProblem());
    setUserAnswer('');
    setScore(0);
    setStreak(0);
    setRocketHeight(0);
    setProblemCount(0);
    setFeedback(null);
    setTimeLeft(60);
    setCoinsAwarded(false);
    setGameState('playing');
  }, [generateProblem]);

  const handleSubmit = () => {
    if (!problem || feedback) return;
    
    const isCorrect = parseInt(userAnswer) === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setProblemCount(prev => prev + 1);
    
    if (isCorrect) {
      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setRocketHeight(prev => Math.min(prev + 10, 100));
    } else {
      setStreak(0);
      setRocketHeight(prev => Math.max(prev - 5, 0));
    }
    
    // Auto advance after feedback
    setTimeout(() => {
      setProblem(generateProblem());
      setUserAnswer('');
      setFeedback(null);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !feedback && userAnswer) {
      handleSubmit();
    }
  };

  const getRank = () => {
    if (score >= 200) return { name: 'Space Commander', emoji: '🎖️' };
    if (score >= 150) return { name: 'Star Pilot', emoji: '✨' };
    if (score >= 100) return { name: 'Rocket Cadet', emoji: '🚀' };
    if (score >= 50) return { name: 'Space Trainee', emoji: '⭐' };
    return { name: 'Space Beginner', emoji: '🌟' };
  };

  // Award coins and achievement when game finishes
  useEffect(() => {
    if (gameState === 'finished' && !coinsAwarded) {
      const rank = score >= 200 ? 'Space Commander' : score >= 150 ? 'Star Pilot' : score >= 100 ? 'Rocket Cadet' : score >= 50 ? 'Space Trainee' : 'Space Beginner';
      const emoji = score >= 200 ? '🎖️' : score >= 150 ? '✨' : score >= 100 ? '🚀' : score >= 50 ? '⭐' : '🌟';
      const coinReward = score >= 100 ? COIN_REWARDS.GAME_WIN : score >= 50 ? 25 : 10;
      addCoins(coinReward, 'Rocket Math Mission!');
      addAchievement({
        type: 'game',
        name: rank,
        icon: emoji,
        description: `Scored ${score} points and completed ${problemCount} problems in Rocket Math!`
      });
      setCoinsAwarded(true);
    }
  }, [gameState, coinsAwarded, score, problemCount, addCoins, addAchievement]);

  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-display font-bold mb-2">Rocket Math</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Solve math problems to launch your rocket! Build streaks for bonus points!
        </p>
        <Button onClick={startGame} className="gap-2">
          <Play className="w-4 h-4" /> Launch Mission
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const rank = getRank();
    const coinReward = score >= 100 ? COIN_REWARDS.GAME_WIN : score >= 50 ? 25 : 10;
    
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">{rank.emoji}</div>
        <h3 className="text-xl font-display font-bold mb-2">Mission Complete!</h3>
        <p className="text-lg mb-2">Rank: <span className="text-primary font-bold">{rank.name}</span></p>
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <div className="bg-primary/20 rounded-lg px-3 py-2">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div className="bg-primary/20 rounded-lg px-3 py-2">
            <div className="text-2xl font-bold">{problemCount}</div>
            <div className="text-xs text-muted-foreground">Problems</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg px-3 py-2">
            <div className="text-2xl font-bold flex items-center gap-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">+{coinReward}</span>
            </div>
            <div className="text-xs text-muted-foreground">Coins</div>
          </div>
        </div>
        <Button onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" /> New Mission
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-primary/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-display font-bold">🚀 Rocket Math</h3>
        <div className="flex items-center gap-3 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-yellow-400 animate-pulse">
              <Zap className="w-4 h-4" /> {streak}x
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" /> {score}
          </span>
          <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Rocket Progress */}
      <div className="relative h-24 bg-gradient-to-t from-background/50 to-primary/10 rounded-xl mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-4xl transition-all duration-500"
          style={{ bottom: `${rocketHeight}%` }}
        >
          🚀
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-orange-500/30 to-transparent" />
      </div>

      {/* Problem */}
      {problem && (
        <div className={`bg-background/30 rounded-xl p-4 mb-4 text-center transition-all ${
          feedback === 'correct' ? 'ring-2 ring-green-500' : 
          feedback === 'wrong' ? 'ring-2 ring-red-500' : ''
        }`}>
          <div className="text-3xl font-bold mb-3 font-mono">
            {problem.num1} {problem.operator} {problem.num2} = ?
          </div>
          
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="?"
            disabled={feedback !== null}
            autoFocus
            className="w-24 p-3 rounded-lg bg-background/50 border border-primary/20 text-center text-2xl font-bold focus:border-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          
          {feedback && (
            <div className={`mt-3 text-lg font-bold ${
              feedback === 'correct' ? 'text-green-400' : 'text-red-400'
            }`}>
              {feedback === 'correct' ? '✓ Correct!' : `✗ It was ${problem.answer}`}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit} 
        disabled={!userAnswer || feedback !== null}
        className="w-full gap-2"
      >
        <Rocket className="w-4 h-4" /> Launch Answer
      </Button>
    </div>
  );
};

export default RocketMathGame;
