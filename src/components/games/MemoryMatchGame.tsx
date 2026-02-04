import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Trophy, Star, Clock, Coins } from 'lucide-react';
import { useCoins, COIN_REWARDS } from '@/contexts/CoinsContext';

interface Card {
  id: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const spaceItems = [
  { emoji: '🌍', name: 'Earth' },
  { emoji: '🌙', name: 'Moon' },
  { emoji: '☀️', name: 'Sun' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🪐', name: 'Saturn' },
  { emoji: '☄️', name: 'Comet' },
  { emoji: '🌌', name: 'Galaxy' },
];

type GameState = 'start' | 'playing' | 'finished';

const MemoryMatchGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const { addCoins } = useCoins();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = useCallback(() => {
    // Create pairs and shuffle
    const cardPairs = [...spaceItems, ...spaceItems].map((item, index) => ({
      id: index,
      emoji: item.emoji,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));
    
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setIsLocked(false);
    setCoinsAwarded(false);
    setGameState('playing');
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isLocked) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsLocked(true);

      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === spaceItems.length) {
              setGameState('finished');
            }
            return newMatches;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStarRating = () => {
    if (moves <= 10) return 3;
    if (moves <= 15) return 2;
    return 1;
  };

  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🧠</div>
        <h3 className="text-xl font-display font-bold mb-2">Space Memory Match</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Find matching pairs of space objects! Flip cards to reveal what's underneath.
        </p>
        <Button onClick={startGame} className="gap-2">
          <Play className="w-4 h-4" /> Start Game
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const stars = getStarRating();
    const coinReward = stars === 3 ? COIN_REWARDS.GAME_WIN : stars === 2 ? 30 : 15;
    
    // Award coins only once
    if (!coinsAwarded) {
      addCoins(coinReward, 'Memory Match Complete!');
      setCoinsAwarded(true);
    }
    
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-display font-bold mb-2">Congratulations!</h3>
        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3].map(i => (
            <Star 
              key={i} 
              className={`w-8 h-8 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
            />
          ))}
        </div>
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-primary" />
            <span>{moves} moves</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            <span>{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">+{coinReward}</span>
          </div>
        </div>
        <Button onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-primary/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-display font-bold">🧠 Memory Match</h3>
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-primary" />
            {moves}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            {formatTime(timer)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(matches / spaceItems.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1">
          {matches}/{spaceItems.length} pairs found
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched || isLocked}
            className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-primary/20 border-2 border-primary scale-100'
                : 'bg-card/50 border-2 border-primary/20 hover:border-primary/50 hover:scale-105'
            } ${card.isMatched ? 'opacity-60' : ''}`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatchGame;
