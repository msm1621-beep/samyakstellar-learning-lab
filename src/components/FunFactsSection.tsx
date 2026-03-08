import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { funFacts } from '@/data/funFacts';

const FunFactsSection = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [randomFact, setRandomFact] = useState(funFacts[0]);

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) { newSet.delete(id); } else { newSet.add(id); }
      return newSet;
    });
  };

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setRandomFact(funFacts[randomIndex]);
  };

  return (
    <section id="facts" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">🤯 Fun Facts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tap the cards to reveal amazing facts about the universe!</p>
        </div>
        <div className="max-w-xl mx-auto mb-12">
          <div className="glass-card rounded-2xl p-6 text-center border-accent/30">
            <div className="text-5xl mb-4">{randomFact.emoji}</div>
            <p className="text-lg font-medium mb-4">{randomFact.fact}</p>
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-accent/20 text-accent mb-4">{randomFact.category}</span>
            <br />
            <Button onClick={getRandomFact} variant="outline" className="border-accent/50 hover:bg-accent/10">
              <Shuffle className="w-4 h-4 mr-2" />
              Random Fact!
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {funFacts.map((fact) => {
            const isFlipped = flippedCards.has(fact.id);
            return (
              <button key={fact.id} onClick={() => toggleCard(fact.id)} className="relative h-40 perspective-1000" style={{ perspective: '1000px' }}>
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 glass-card rounded-xl flex flex-col items-center justify-center p-4 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="text-4xl mb-2">{fact.emoji}</div>
                    <p className="text-sm text-muted-foreground">Tap to reveal!</p>
                  </div>
                  <div className="absolute inset-0 glass-card rounded-xl flex flex-col items-center justify-center p-4 backface-hidden bg-primary/10 border-primary/30" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <p className="text-sm font-medium text-center">{fact.fact}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FunFactsSection;
