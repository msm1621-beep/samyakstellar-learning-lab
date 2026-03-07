import { useState } from 'react';
import QuizGame from './QuizGame';
import SizeComparison from './SizeComparison';
import SpaceRocketShooter from './games/SpaceRocketShooter';
import MemoryMatchGame from './games/MemoryMatchGame';
import WordScrambleGame from './games/WordScrambleGame';
import RocketMathGame from './games/RocketMathGame';
import { Button } from './ui/button';

const games = [
  { id: 'quiz', label: 'Quiz', emoji: '🧠', component: QuizGame },
  { id: 'size', label: 'Size Compare', emoji: '🔭', component: SizeComparison },
  { id: 'rocket-shooter', label: 'Rocket Shooter', emoji: '🚀', component: SpaceRocketShooter },
  { id: 'memory', label: 'Memory Match', emoji: '🃏', component: MemoryMatchGame },
  { id: 'scramble', label: 'Word Scramble', emoji: '🔤', component: WordScrambleGame },
  { id: 'math', label: 'Rocket Math', emoji: '🚀', component: RocketMathGame },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState('quiz');

  const ActiveGameComponent = games.find(g => g.id === activeGame)?.component || QuizGame;

  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            🎮 Games & Quizzes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your space knowledge with fun interactive games!
          </p>
        </div>

        {/* Game Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {games.map((game) => (
            <Button
              key={game.id}
              variant={activeGame === game.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveGame(game.id)}
              className="gap-1"
            >
              <span>{game.emoji}</span>
              <span className="hidden sm:inline">{game.label}</span>
            </Button>
          ))}
        </div>

        {/* Active Game */}
        <div className="max-w-2xl mx-auto">
          <ActiveGameComponent />
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
