import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronUp, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SECTIONS = [
  { key: 'solar', label: 'Solar System', icon: '🪐' },
  { key: 'timeline', label: 'Timeline', icon: '⏳' },
  { key: 'constellations', label: 'Constellations', icon: '✨' },
  { key: 'courses', label: 'Courses', icon: '📚' },
  { key: 'library', label: 'Library', icon: '📖' },
  { key: 'games', label: 'Games', icon: '🎮' },
  { key: 'facts', label: 'Fun Facts', icon: '💡' },
];

const ExplorationProgress = () => {
  const [expanded, setExpanded] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('visitedSections');
    if (saved) setVisited(new Set(JSON.parse(saved)));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisited(prev => {
              const next = new Set(prev);
              const id = entry.target.id;
              const matchedSection = SECTIONS.find(s => id.includes(s.key));
              if (matchedSection) next.add(matchedSection.key);
              localStorage.setItem('visitedSections', JSON.stringify([...next]));
              return next;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe section elements
    const sectionIds = ['explorer', 'timeline', 'constellations', 'courses', 'library', 'games', 'facts'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const percentage = Math.round((visited.size / SECTIONS.length) * 100);

  return (
    <motion.div
      className="fixed top-20 right-4 z-40"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 shadow-lg hover:border-primary/50 transition-colors"
      >
        <Compass className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-foreground">{percentage}%</span>
        {expanded ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 w-56 bg-card/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-xl p-4"
          >
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              🚀 Exploration Journey
            </h4>
            <Progress value={percentage} className="h-2 mb-3" />
            <div className="space-y-2">
              {SECTIONS.map(s => (
                <div key={s.key} className="flex items-center gap-2 text-xs">
                  <span>{s.icon}</span>
                  <span className={visited.has(s.key) ? 'text-foreground' : 'text-muted-foreground'}>{s.label}</span>
                  {visited.has(s.key) && <span className="ml-auto text-green-400">✓</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExplorationProgress;
