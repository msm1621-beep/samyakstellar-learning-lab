import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Lightbulb, CheckCircle, XCircle, ArrowRight, Coins } from 'lucide-react';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';

interface SpaceWord {
  word: string;
  hint: string;
  emoji: string;
}

const spaceWords: SpaceWord[] = [
  { word: 'SATURN', hint: 'Planet with beautiful rings', emoji: '♄' },
  { word: 'GALAXY', hint: 'A huge collection of stars', emoji: '🌌' },
  { word: 'METEOR', hint: 'A shooting star', emoji: '☄️' },
  { word: 'ROCKET', hint: 'Takes astronauts to space', emoji: '🚀' },
  { word: 'COMET', hint: 'Icy object with a tail', emoji: '☄️' },
  { word: 'NEBULA', hint: 'Cloud of gas where stars are born', emoji: '🌫️' },
  { word: 'MARS', hint: 'The Red Planet', emoji: '♂️' },
  { word: 'VENUS', hint: 'Hottest planet in our solar system', emoji: '♀️' },
  { word: 'ORBIT', hint: 'Path around a planet or star', emoji: '🔄' },
  { word: 'LUNAR', hint: 'Related to the Moon', emoji: '🌙' },
  { word: 'SOLAR', hint: 'Related to the Sun', emoji: '☀️' },
  { word: 'STAR', hint: 'A ball of burning gas', emoji: '⭐' },
];

type GameState = 'start' | 'playing' | 'finished';

const WordScrambleGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameWords, setGameWords] = useState<SpaceWord[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const { addCoins } = useCoins();

  const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Make sure scrambled word is different from original
    const scrambled = arr.join('');
    if (scrambled === word && word.length > 1) {
      return scrambleWord(word);
    }
    return scrambled;
  };

  const startGame = useCallback(() => {
    const shuffled = [...spaceWords].sort(() => Math.random() - 0.5).slice(0, 5);
    setGameWords(shuffled);
    setCurrentWordIndex(0);
    setScrambledWord(scrambleWord(shuffled[0].word));
    setUserGuess('');
    setScore(0);
    setShowHint(false);
    setFeedback(null);
    setHintsUsed(0);
    setCoinsAwarded(false);
    setGameState('playing');
  }, []);

  const handleSubmit = () => {
    if (feedback) return;
    
    const currentWord = gameWords[currentWordIndex];
    const isCorrect = userGuess.toUpperCase().trim() === currentWord.word;
    
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setScore(prev => prev + (showHint ? 1 : 2));
    }
  };

  const handleNext = () => {
    if (currentWordIndex < gameWords.length - 1) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      setScrambledWord(scrambleWord(gameWords[nextIndex].word));
      setUserGuess('');
      setShowHint(false);
      setFeedback(null);
    } else {
      setGameState('finished');
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !feedback) {
      handleSubmit();
    }
  };

  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🔤</div>
        <h3 className="text-xl font-display font-bold mb-2">Space Word Scramble</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Unscramble the letters to reveal space words! Use hints if you get stuck.
        </p>
        <Button onClick={startGame} className="gap-2">
          <Play className="w-4 h-4" /> Start Game
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const maxScore = gameWords.length * 2;
    const percentage = Math.round((score / maxScore) * 100);
    const coinReward = percentage >= 80 ? COIN_REWARDS.GAME_WIN : percentage >= 50 ? 25 : 10;
    
    if (!coinsAwarded) {
      addCoins(coinReward, 'Word Scramble Complete!');
      setCoinsAwarded(true);
    }
    
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">
          {percentage >= 80 ? '🏆' : percentage >= 50 ? '⭐' : '🌟'}
        </div>
        <h3 className="text-xl font-display font-bold mb-2">Game Complete!</h3>
        <p className="text-2xl font-bold text-primary mb-2">{score}/{maxScore} points</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-lg">+{coinReward} coins!</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {hintsUsed === 0 
            ? 'Amazing! You did it without any hints!' 
            : `You used ${hintsUsed} hint${hintsUsed > 1 ? 's' : ''}`}
        </p>
        <Button onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </div>
    );
  }

  const currentWord = gameWords[currentWordIndex];

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-primary/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-display font-bold">🔤 Word Scramble</h3>
        <div className="flex items-center gap-2 text-sm">
          <span>Word {currentWordIndex + 1}/{gameWords.length}</span>
          <span className="text-primary font-bold">{score} pts</span>
        </div>
      </div>

      {/* Scrambled Word */}
      <div className="bg-background/30 rounded-xl p-4 mb-4 text-center">
        <div className="text-3xl mb-2">{currentWord.emoji}</div>
        <div className="flex justify-center gap-2 mb-3">
          {scrambledWord.split('').map((letter, index) => (
            <div
              key={index}
              className="w-10 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-xl font-bold"
            >
              {letter}
            </div>
          ))}
        </div>
        
        {/* Hint */}
        {showHint ? (
          <p className="text-sm text-yellow-400">
            💡 Hint: {currentWord.hint}
          </p>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleHint} className="text-xs gap-1">
            <Lightbulb className="w-3 h-3" /> Need a hint?
          </Button>
        )}
      </div>

      {/* Input */}
      <div className="space-y-3">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Type your answer..."
          disabled={feedback !== null}
          className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 text-center text-lg font-bold uppercase tracking-widest focus:border-primary focus:outline-none"
          maxLength={currentWord.word.length}
        />

        {/* Feedback */}
        {feedback && (
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            feedback === 'correct' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {feedback === 'correct' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Correct! +{showHint ? 1 : 2} points</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>The answer was: {currentWord.word}</span>
              </>
            )}
          </div>
        )}

        {/* Action Button */}
        {feedback ? (
          <Button onClick={handleNext} className="w-full gap-2">
            {currentWordIndex < gameWords.length - 1 ? (
              <>Next Word <ArrowRight className="w-4 h-4" /></>
            ) : (
              'See Results'
            )}
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={!userGuess.trim()}
            className="w-full"
          >
            Check Answer
          </Button>
        )}
      </div>
    </div>
  );
};

export default WordScrambleGame;
