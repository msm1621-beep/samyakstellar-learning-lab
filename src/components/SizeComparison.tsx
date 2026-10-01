import { useState, useMemo } from 'react';
import { celestialSizes, typeColors, CelestialSize } from '@/data/sizeComparisonData';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Info } from 'lucide-react';

type FilterType = 'all' | 'planet' | 'moon' | 'star' | 'dwarf-planet' | 'asteroid' | 'comet' | 'exoplanet' | 'nebula' | 'galaxy' | 'black-hole';

const SizeComparison = () => {
  const [leftSelection, setLeftSelection] = useState<CelestialSize>(() => celestialSizes.find(c => c.id === 'earth') ?? celestialSizes[0]);
  const [rightSelection, setRightSelection] = useState<CelestialSize>(() => celestialSizes.find(c => c.id === 'jupiter') ?? celestialSizes[1] ?? celestialSizes[0]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFact, setShowFact] = useState<'left' | 'right' | null>(null);

  const filteredBodies = useMemo(() => {
    if (filter === 'all') return celestialSizes;
    return celestialSizes.filter(c => c.type === filter);
  }, [filter]);

  const comparison = useMemo(() => {
    const ratio = leftSelection.diameter / rightSelection.diameter;
    if (ratio > 1) {
      return {
        text: `${leftSelection.name} is ${ratio.toFixed(1)}x bigger than ${rightSelection.name}!`,
        leftSize: 100,
        rightSize: Math.max(8, 100 / ratio),
      };
    } else if (ratio < 1) {
      return {
        text: `${rightSelection.name} is ${(1 / ratio).toFixed(1)}x bigger than ${leftSelection.name}!`,
        leftSize: Math.max(8, 100 * ratio),
        rightSize: 100,
      };
    } else {
      return {
        text: `${leftSelection.name} and ${rightSelection.name} are the same size!`,
        leftSize: 100,
        rightSize: 100,
      };
    }
  }, [leftSelection, rightSelection]);

  const formatDiameter = (diameter: number) => {
    if (diameter >= 1000000) {
      return `${(diameter / 1000000).toFixed(1)}M km`;
    } else if (diameter >= 1000) {
      return `${(diameter / 1000).toFixed(1)}K km`;
    }
    return `${diameter} km`;
  };

  const swapSelections = () => {
    const temp = leftSelection;
    setLeftSelection(rightSelection);
    setRightSelection(temp);
  };

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-primary/20">
      <h3 className="text-xl font-display font-bold mb-4 text-center">
        🔭 Size Comparison
      </h3>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[
          { value: 'all', label: 'All', emoji: '🌌' },
          { value: 'planet', label: 'Planets', emoji: '🪐' },
          { value: 'moon', label: 'Moons', emoji: '🌙' },
          { value: 'dwarf-planet', label: 'Dwarfs', emoji: '💫' },
          { value: 'asteroid', label: 'Asteroids', emoji: '🪨' },
          { value: 'comet', label: 'Comets', emoji: '☄️' },
          { value: 'exoplanet', label: 'Exoplanets', emoji: '🌐' },
          { value: 'star', label: 'Stars', emoji: '⭐' },
          { value: 'black-hole', label: 'Black Holes', emoji: '🕳️' },
          { value: 'nebula', label: 'Nebulae', emoji: '🌸' },
          { value: 'galaxy', label: 'Galaxies', emoji: '🌀' },
        ].map(({ value, label, emoji }) => (
          <Button
            key={value}
            variant={filter === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(value as FilterType)}
            className="text-xs"
          >
            {emoji} {label}
          </Button>
        ))}
      </div>

      {/* Selection Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground block text-center">First Object</label>
          <select
            value={leftSelection.id}
            onChange={(e) => {
              const selection = celestialSizes.find(c => c.id === e.target.value);
              if (selection) setLeftSelection(selection);
            }}
            className="w-full p-2 rounded-lg bg-background/50 border border-primary/20 text-foreground text-sm"
          >
            {filteredBodies.map((body) => (
              <option key={body.id} value={body.id}>
                {body.emoji} {body.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={swapSelections}
            className="rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground block text-center">Second Object</label>
          <select
            value={rightSelection.id}
            onChange={(e) => {
              const selection = celestialSizes.find(c => c.id === e.target.value);
              if (selection) setRightSelection(selection);
            }}
            className="w-full p-2 rounded-lg bg-background/50 border border-primary/20 text-foreground text-sm"
          >
            {filteredBodies.map((body) => (
              <option key={body.id} value={body.id}>
                {body.emoji} {body.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="relative bg-background/30 rounded-xl p-8 mb-4">
        <div className="flex items-center justify-around gap-4 min-h-[180px]">
          {/* Left Object */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full transition-all duration-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 relative group"
              style={{
                width: `${comparison.leftSize}px`,
                height: `${comparison.leftSize}px`,
                backgroundColor: leftSelection.color,
                boxShadow: `0 0 ${comparison.leftSize / 3}px ${leftSelection.color}40`,
              }}
              onClick={() => setShowFact(showFact === 'left' ? null : 'left')}
            >
              <Info className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity absolute" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">{leftSelection.emoji} {leftSelection.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[leftSelection.type].bg} ${typeColors[leftSelection.type].text}`}>
                {leftSelection.type.replace('-', ' ')}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{formatDiameter(leftSelection.diameter)}</p>
            </div>
            {showFact === 'left' && (
              <div className="absolute bottom-2 left-2 right-2 md:left-4 md:right-auto md:max-w-[200px] bg-primary/20 backdrop-blur-md rounded-lg p-3 text-xs animate-fade-in">
                💡 {leftSelection.funFact}
              </div>
            )}
          </div>

          {/* VS Divider */}
          <div className="text-2xl font-bold text-primary/50">VS</div>

          {/* Right Object */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full transition-all duration-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 relative group"
              style={{
                width: `${comparison.rightSize}px`,
                height: `${comparison.rightSize}px`,
                backgroundColor: rightSelection.color,
                boxShadow: `0 0 ${comparison.rightSize / 3}px ${rightSelection.color}40`,
              }}
              onClick={() => setShowFact(showFact === 'right' ? null : 'right')}
            >
              <Info className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity absolute" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">{rightSelection.emoji} {rightSelection.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[rightSelection.type].bg} ${typeColors[rightSelection.type].text}`}>
                {rightSelection.type.replace('-', ' ')}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{formatDiameter(rightSelection.diameter)}</p>
            </div>
            {showFact === 'right' && (
              <div className="absolute bottom-2 left-2 right-2 md:right-4 md:left-auto md:max-w-[200px] bg-primary/20 backdrop-blur-md rounded-lg p-3 text-xs animate-fade-in">
                💡 {rightSelection.funFact}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Text */}
      <div className="text-center bg-primary/10 rounded-lg p-4">
        <p className="text-lg font-semibold text-primary">{comparison.text}</p>
        <p className="text-xs text-muted-foreground mt-1">Click on the objects to see fun facts!</p>
      </div>
    </div>
  );
};

export default SizeComparison;
