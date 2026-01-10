import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, CheckCircle, Trophy } from 'lucide-react';

interface Planet {
  id: string;
  name: string;
  emoji: string;
  order: number;
  color: string;
}

const planets: Planet[] = [
  { id: 'mercury', name: 'Mercury', emoji: '☿️', order: 1, color: '#8C7853' },
  { id: 'venus', name: 'Venus', emoji: '♀️', order: 2, color: '#E6C87A' },
  { id: 'earth', name: 'Earth', emoji: '🌍', order: 3, color: '#4A90D9' },
  { id: 'mars', name: 'Mars', emoji: '♂️', order: 4, color: '#CD5C5C' },
  { id: 'jupiter', name: 'Jupiter', emoji: '♃', order: 5, color: '#D4A574' },
  { id: 'saturn', name: 'Saturn', emoji: '♄', order: 6, color: '#F4D03F' },
  { id: 'uranus', name: 'Uranus', emoji: '⛢', order: 7, color: '#7FDBFF' },
  { id: 'neptune', name: 'Neptune', emoji: '♆', order: 8, color: '#4169E1' },
];

type GameState = 'start' | 'playing' | 'finished';

const PlanetOrderGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [shuffledPlanets, setShuffledPlanets] = useState<Planet[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<(Planet | null)[]>(Array(8).fill(null));
  const [availablePlanets, setAvailablePlanets] = useState<Planet[]>([]);
  const [draggedPlanet, setDraggedPlanet] = useState<Planet | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = useCallback(() => {
    const shuffled = [...planets].sort(() => Math.random() - 0.5);
    setShuffledPlanets(shuffled);
    setAvailablePlanets(shuffled);
    setSelectedSlots(Array(8).fill(null));
    setIsCorrect(false);
    setGameState('playing');
  }, []);

  const handleDragStart = (planet: Planet) => {
    setDraggedPlanet(planet);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSlot = (slotIndex: number) => {
    if (!draggedPlanet) return;

    const newSlots = [...selectedSlots];
    const oldSlotIndex = newSlots.findIndex(p => p?.id === draggedPlanet.id);
    
    // If planet was in another slot, clear it
    if (oldSlotIndex !== -1) {
      newSlots[oldSlotIndex] = null;
    }

    // If there's already a planet in this slot, put it back to available
    if (newSlots[slotIndex]) {
      setAvailablePlanets(prev => [...prev, newSlots[slotIndex]!]);
    }

    newSlots[slotIndex] = draggedPlanet;
    setSelectedSlots(newSlots);
    setAvailablePlanets(prev => prev.filter(p => p.id !== draggedPlanet.id));
    setDraggedPlanet(null);
  };

  const handleRemoveFromSlot = (slotIndex: number) => {
    const planet = selectedSlots[slotIndex];
    if (planet) {
      setAvailablePlanets(prev => [...prev, planet]);
      const newSlots = [...selectedSlots];
      newSlots[slotIndex] = null;
      setSelectedSlots(newSlots);
    }
  };

  const checkAnswer = () => {
    const allFilled = selectedSlots.every(slot => slot !== null);
    if (!allFilled) return;

    const correct = selectedSlots.every((planet, index) => planet?.order === index + 1);
    setIsCorrect(correct);
    setGameState('finished');
  };

  const allSlotsFilled = selectedSlots.every(slot => slot !== null);

  if (gameState === 'start') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">🪐</div>
        <h3 className="text-xl font-display font-bold mb-2">Planet Order Challenge</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag the planets to arrange them in order from the Sun!
        </p>
        <Button onClick={startGame} className="gap-2">
          <Play className="w-4 h-4" /> Start Game
        </Button>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20 text-center">
        <div className="text-5xl mb-4">{isCorrect ? '🎉' : '🌟'}</div>
        <h3 className="text-xl font-display font-bold mb-2">
          {isCorrect ? 'Perfect!' : 'Almost There!'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {isCorrect 
            ? 'You placed all planets in the correct order!' 
            : 'Some planets were in the wrong position. Try again!'}
        </p>
        {isCorrect && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">Solar System Expert!</span>
          </div>
        )}
        <Button onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-primary/20">
      <h3 className="text-lg font-display font-bold mb-3 text-center">🪐 Planet Order</h3>
      
      {/* Sun and Slots */}
      <div className="mb-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-lg flex-shrink-0 shadow-lg shadow-yellow-500/50">
            ☀️
          </div>
          {selectedSlots.map((planet, index) => (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnSlot(index)}
              onClick={() => planet && handleRemoveFromSlot(index)}
              className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center text-xs flex-shrink-0 transition-all cursor-pointer ${
                planet 
                  ? 'border-primary bg-primary/20' 
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
              style={planet ? { backgroundColor: `${planet.color}40`, borderColor: planet.color } : {}}
            >
              {planet ? (
                <span className="text-lg">{planet.emoji}</span>
              ) : (
                <span className="text-muted-foreground">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Closest to Sun → Farthest from Sun
        </p>
      </div>

      {/* Available Planets */}
      <div className="bg-background/30 rounded-xl p-3 mb-4">
        <p className="text-xs text-muted-foreground mb-2 text-center">Drag planets to their positions:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {availablePlanets.map((planet) => (
            <div
              key={planet.id}
              draggable
              onDragStart={() => handleDragStart(planet)}
              className="flex flex-col items-center p-2 rounded-lg bg-card/50 border border-primary/20 cursor-grab hover:scale-105 transition-transform active:cursor-grabbing"
            >
              <span className="text-2xl">{planet.emoji}</span>
              <span className="text-xs mt-1">{planet.name}</span>
            </div>
          ))}
          {availablePlanets.length === 0 && (
            <p className="text-sm text-muted-foreground">All planets placed!</p>
          )}
        </div>
      </div>

      {/* Check Button */}
      <Button 
        onClick={checkAnswer} 
        disabled={!allSlotsFilled}
        className="w-full gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Check Order
      </Button>
    </div>
  );
};

export default PlanetOrderGame;
