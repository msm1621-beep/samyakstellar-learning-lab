import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { celestialBodies } from '@/data/celestialBodies';
import { courses } from '@/data/courses';
import { books } from '@/data/books';
import { funFacts } from '@/data/funFacts';

interface SearchResult {
  type: 'planet' | 'course' | 'book' | 'fact';
  title: string;
  description: string;
  section: string;
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results: SearchResult[] = query.trim().length < 2 ? [] : [
    ...celestialBodies
      .filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.type.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map(b => ({ type: 'planet' as const, title: b.name, description: b.description, section: '#explorer' })),
    ...courses
      .filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(c => ({ type: 'course' as const, title: c.title, description: c.description, section: '#courses' })),
    ...books
      .filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(b => ({ type: 'book' as const, title: b.title, description: `by ${b.author}`, section: '#library' })),
    ...funFacts
      .filter(f => f.fact.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(f => ({ type: 'fact' as const, title: f.fact.slice(0, 60) + '...', description: f.category, section: '#facts' })),
  ];

  const typeEmoji = { planet: '🪐', course: '📚', book: '📖', fact: '💡' };

  const goTo = (section: string) => {
    setOpen(false);
    setQuery('');
    document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-primary/20 text-muted-foreground text-sm hover:border-primary/40 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden md:inline text-xs bg-muted/50 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-card border border-primary/30 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/20">
                <Search className="w-5 h-5 text-primary" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search planets, courses, books, facts..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                />
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(r.section)}
                      className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <span className="text-lg mt-0.5">{typeEmoji[r.type]}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query.trim().length >= 2 && results.length === 0 && (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  No results found for "{query}"
                </div>
              )}

              {query.trim().length < 2 && (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  Start typing to search across the cosmos...
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
