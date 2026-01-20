import { useState } from 'react';
import { celestialBodies, categoryLabels, type CelestialCategory, type DistanceFilter } from '@/data/celestialBodies';
import CelestialCard from './CelestialCard';

const CelestialExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<CelestialCategory | 'all'>('all');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('all');

  const categories: (CelestialCategory | 'all')[] = ['all', 'solar-system', 'stars', 'nebulas', 'galaxies', 'other'];

  const filteredBodies = celestialBodies.filter((body) => {
    const categoryMatch = selectedCategory === 'all' || body.category === selectedCategory;
    const distanceMatch = distanceFilter === 'all' || body.distance === distanceFilter;
    return categoryMatch && distanceMatch;
  });

  return (
    <section id="explorer" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            🔭 Universe Explorer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any celestial body to see images, read about it, or ask Cosmo!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground cosmic-glow'
                    : 'glass-card hover:border-primary/50'
                }`}
              >
                {cat === 'all' ? '🌟 All' : categoryLabels[cat]}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            {(['all', 'near', 'far'] as DistanceFilter[]).map((dist) => (
              <button
                key={dist}
                onClick={() => setDistanceFilter(dist)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  distanceFilter === dist
                    ? 'bg-secondary text-secondary-foreground'
                    : 'glass-card hover:border-secondary/50'
                }`}
              >
                {dist === 'all' ? '📍 Any Distance' : dist === 'near' ? '🏠 Near' : '🚀 Far'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBodies.map((body) => (
            <CelestialCard key={body.id} body={body} onSelect={() => {}} />
          ))}
        </div>

        {filteredBodies.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No celestial bodies found with these filters.</p>
            <p className="text-sm">Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CelestialExplorer;