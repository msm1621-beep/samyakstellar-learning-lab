import { useState } from 'react';
import { constellations, Constellation } from '@/data/constellations';
import { X, Sparkles, Calendar, BookOpen } from 'lucide-react';

const ConstellationViewer = () => {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="constellations" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ✨ Constellation Viewer ✨
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any constellation to discover its ancient story and see its stars connect!
          </p>
        </div>

        {/* Constellation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {constellations.map((constellation) => (
            <button
              key={constellation.id}
              onClick={() => setSelectedConstellation(constellation)}
              onMouseEnter={() => setHoveredId(constellation.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`glass-card p-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:border-cosmic-purple/50 ${
                hoveredId === constellation.id ? 'border-cosmic-purple/50 shadow-lg shadow-cosmic-purple/20' : ''
              }`}
            >
              <div className="text-4xl mb-2">{constellation.icon}</div>
              <h3 className="font-bold text-foreground text-sm md:text-base">{constellation.name}</h3>
              <p className="text-xs text-muted-foreground italic">{constellation.latinName}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-cosmic-blue">
                <Calendar className="w-3 h-3" />
                <span>{constellation.bestSeason}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Star Map */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep/50 to-cosmic-dark/80" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cosmic-gold" />
              Interactive Star Map
            </h3>
            
            <div className="relative w-full aspect-[2/1] bg-cosmic-dark/60 rounded-2xl overflow-hidden border border-white/10">
              {/* Background stars */}
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
              
              {/* Constellation previews */}
              {constellations.map((constellation, idx) => {
                const offsetX = (idx % 4) * 25;
                const offsetY = Math.floor(idx / 4) * 50;
                const isHovered = hoveredId === constellation.id;
                const isSelected = selectedConstellation?.id === constellation.id;
                
                return (
                  <g key={constellation.id}>
                    <svg
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${offsetX}%`,
                        top: `${offsetY}%`,
                        width: '25%',
                        height: '50%',
                        opacity: isHovered || isSelected ? 1 : 0.6,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      }}
                      viewBox="0 0 100 100"
                      onClick={() => setSelectedConstellation(constellation)}
                      onMouseEnter={() => setHoveredId(constellation.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Connection lines */}
                      {constellation.connections.map(([from, to], lineIdx) => (
                        <line
                          key={lineIdx}
                          x1={constellation.stars[from].x}
                          y1={constellation.stars[from].y}
                          x2={constellation.stars[to].x}
                          y2={constellation.stars[to].y}
                          stroke={isHovered || isSelected ? '#8B5CF6' : '#6366F1'}
                          strokeWidth={isHovered || isSelected ? 1.5 : 0.8}
                          strokeOpacity={isHovered || isSelected ? 0.9 : 0.4}
                          className="transition-all duration-300"
                        />
                      ))}
                      
                      {/* Stars */}
                      {constellation.stars.map((star, starIdx) => (
                        <circle
                          key={starIdx}
                          cx={star.x}
                          cy={star.y}
                          r={star.size || 1.5}
                          fill={isHovered || isSelected ? '#FCD34D' : '#E5E7EB'}
                          className="transition-all duration-300"
                          style={{
                            filter: isHovered || isSelected ? 'drop-shadow(0 0 4px #FCD34D)' : 'none',
                          }}
                        />
                      ))}
                      
                      {/* Label */}
                      <text
                        x="50"
                        y="95"
                        textAnchor="middle"
                        fill={isHovered || isSelected ? '#FCD34D' : '#9CA3AF'}
                        fontSize="6"
                        className="transition-all duration-300"
                      >
                        {constellation.name.split(' ')[0]}
                      </text>
                    </svg>
                  </g>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Constellation Modal */}
        {selectedConstellation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-in">
              <button
                onClick={() => setSelectedConstellation(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">{selectedConstellation.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedConstellation.name}</h3>
                  <p className="text-muted-foreground italic">{selectedConstellation.latinName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-cosmic-blue" />
                    <span className="text-sm text-cosmic-blue">Best seen in {selectedConstellation.bestSeason}</span>
                  </div>
                </div>
              </div>
              
              {/* Large Star Map */}
              <div className="relative w-full aspect-square bg-cosmic-dark/80 rounded-2xl mb-6 overflow-hidden border border-cosmic-purple/30">
                {/* Background stars */}
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
                
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Glowing connections */}
                  {selectedConstellation.connections.map(([from, to], idx) => (
                    <line
                      key={idx}
                      x1={selectedConstellation.stars[from].x}
                      y1={selectedConstellation.stars[from].y}
                      x2={selectedConstellation.stars[to].x}
                      y2={selectedConstellation.stars[to].y}
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      className="animate-pulse"
                      style={{ filter: 'drop-shadow(0 0 3px #8B5CF6)' }}
                    />
                  ))}
                  
                  {/* Bright stars */}
                  {selectedConstellation.stars.map((star, idx) => (
                    <g key={idx}>
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={(star.size || 1.5) * 2}
                        fill="#FCD34D"
                        className="animate-pulse-glow"
                        style={{ filter: 'drop-shadow(0 0 8px #FCD34D)' }}
                      />
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={(star.size || 1.5)}
                        fill="white"
                      />
                    </g>
                  ))}
                </svg>
              </div>
              
              {/* Story */}
              <div className="space-y-4">
                <div className="bg-cosmic-purple/10 rounded-2xl p-4 border border-cosmic-purple/20">
                  <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-cosmic-purple" />
                    The Story
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedConstellation.story}</p>
                </div>
                
                <div className="bg-cosmic-gold/10 rounded-2xl p-4 border border-cosmic-gold/20">
                  <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-cosmic-gold" />
                    Fun Fact
                  </h4>
                  <p className="text-muted-foreground">{selectedConstellation.funFact}</p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedConstellation(null)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              >
                Back to Star Map
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConstellationViewer;
