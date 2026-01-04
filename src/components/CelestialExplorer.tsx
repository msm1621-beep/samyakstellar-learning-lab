import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { celestialBodies, categoryLabels, type CelestialCategory, type DistanceFilter } from '@/data/celestialBodies';

const CelestialExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<CelestialCategory | 'all'>('all');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('all');
  const [selectedBody, setSelectedBody] = useState<string | null>(null);

  const categories: (CelestialCategory | 'all')[] = ['all', 'solar-system', 'stars', 'nebulas', 'galaxies'];

  const filteredBodies = celestialBodies.filter((body) => {
    const categoryMatch = selectedCategory === 'all' || body.category === selectedCategory;
    const distanceMatch = distanceFilter === 'all' || body.distance === distanceFilter;
    return categoryMatch && distanceMatch;
  });

  const selectedBodyData = celestialBodies.find((b) => b.id === selectedBody);

  return (
    <section id="explorer" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            🔭 Universe Explorer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any celestial body to learn amazing facts about our universe!
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
            <button
              key={body.id}
              onClick={() => setSelectedBody(body.id)}
              className="glass-card p-4 rounded-xl text-center hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {body.icon}
              </div>
              <h3 className="font-display font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                {body.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {body.description}
              </p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-${body.color}/20 text-${body.color}`}>
                {body.type}
              </span>
            </button>
          ))}
        </div>

        {filteredBodies.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No celestial bodies found with these filters.</p>
            <p className="text-sm">Try adjusting your filters!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBodyData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedBody(null)}
        >
          <div 
            className="glass-card max-w-lg w-full rounded-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBody(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{selectedBodyData.icon}</div>
              <h3 className="text-2xl font-display font-bold">{selectedBodyData.name}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/20 text-primary mt-2">
                {selectedBodyData.type}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-1">What is it?</h4>
                <p className="text-foreground">{selectedBodyData.longDescription}</p>
              </div>

              <div className="glass-card p-4 rounded-xl bg-accent/10 border-accent/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h4 className="text-sm font-semibold text-accent">Cool Fact!</h4>
                </div>
                <p className="text-foreground">{selectedBodyData.coolFact}</p>
              </div>

              <div className="flex justify-between items-center glass-card p-4 rounded-xl">
                <span className="text-sm text-muted-foreground">{selectedBodyData.metricLabel}</span>
                <span className="font-display font-bold text-primary">{selectedBodyData.metric}</span>
              </div>
            </div>

            <Button 
              onClick={() => setSelectedBody(null)}
              className="w-full mt-6"
            >
              Keep Exploring! 🚀
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CelestialExplorer;
