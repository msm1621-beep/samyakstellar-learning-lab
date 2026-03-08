import { useState } from 'react';
import QuizGame from './QuizGame';
import SizeComparison from './SizeComparison';
import SpaceRocketShooter from './games/SpaceRocketShooter';
import MemoryMatchGame from './games/MemoryMatchGame';
import WordScrambleGame from './games/WordScrambleGame';
import RocketMathGame from './games/RocketMathGame';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState('quiz');
  const { t } = useLanguage();

  const games = [
    { id: 'quiz', label: t('games.quiz'), emoji: '🧠', component: QuizGame },
    { id: 'size', label: t('games.sizeCompare'), emoji: '🔭', component: SizeComparison },
    { id: 'rocket-shooter', label: t('games.rocketShooter'), emoji: '🚀', component: SpaceRocketShooter },
    { id: 'memory', label: t('games.memoryMatch'), emoji: '🃏', component: MemoryMatchGame },
    { id: 'scramble', label: t('games.wordScramble'), emoji: '🔤', component: WordScrambleGame },
    { id: 'math', label: t('games.rocketMath'), emoji: '🚀', component: RocketMathGame },
  ];

  const ActiveGameComponent = games.find(g => g.id === activeGame)?.component || QuizGame;

  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('section.games')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('section.gamesDesc')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {games.map((game) => (
            <Button key={game.id} variant={activeGame === game.id ? 'default' : 'outline'} size="sm" onClick={() => setActiveGame(game.id)} className="gap-1">
              <span>{game.emoji}</span>
              <span className="hidden sm:inline">{game.label}</span>
            </Button>
          ))}
        </div>
        <div className="max-w-2xl mx-auto"><ActiveGameComponent /></div>
      </div>
    </section>
  );
};

export default GamesSection;
