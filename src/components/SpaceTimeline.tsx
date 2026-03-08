import { useState } from 'react';
import { timelineEvents, categoryColors, categoryLabels, TimelineEvent } from '@/data/timelineEvents';
import { useLanguage } from '@/contexts/LanguageContext';

const SpaceTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState<TimelineEvent['category'] | 'all'>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const { t } = useLanguage();

  const categories = ['all', 'universe', 'solar-system', 'earth', 'exploration'] as const;

  const filteredEvents = selectedCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === selectedCategory);

  return (
    <section id="timeline" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🚀</span>
            Journey Through Time
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Travel from the Big Bang to today! Explore the most amazing moments in cosmic history.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:scale-105'
              }`}
            >
              {cat === 'all' ? '🌟 All Events' : `${cat === 'universe' ? '💥' : cat === 'solar-system' ? '☀️' : cat === 'earth' ? '🌍' : '🚀'} ${categoryLabels[cat as keyof typeof categoryLabels]}`}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full hidden md:block" />
          
          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const colors = categoryColors[event.category];
              const isExpanded = expandedEvent === event.id;

              return (
                <div
                  key={event.id}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex">
                    <div className={`w-12 h-12 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center text-2xl shadow-lg animate-pulse`}>
                      {event.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      className={`w-full text-left ${colors.bg} ${colors.border} border rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group`}
                    >
                      {/* Mobile Icon */}
                      <div className="md:hidden flex items-center gap-3 mb-2">
                        <span className="text-3xl">{event.icon}</span>
                        <span className={`text-sm font-medium ${colors.text}`}>{event.year}</span>
                      </div>

                      {/* Year - Desktop */}
                      <div className={`hidden md:block text-sm font-medium ${colors.text} mb-1`}>
                        {event.year}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {event.title}
                      </h3>

                      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-0 md:max-h-40'}`}>
                        <p className="text-purple-200 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Expand hint on mobile */}
                      <div className="md:hidden mt-2 text-xs text-purple-400">
                        {isExpanded ? 'Tap to collapse' : 'Tap to learn more'}
                      </div>
                    </button>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>

          {/* Rocket at the end */}
          <div className="flex justify-center mt-12">
            <div className="text-6xl animate-bounce">🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceTimeline;
