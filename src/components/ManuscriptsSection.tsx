import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, ChevronRight, Calendar, MapPin, User, X } from 'lucide-react';

interface Manuscript {
  id: string;
  title: string;
  author: string;
  date: string;
  location: string;
  text: string;
}

const manuscripts: Manuscript[] = [
  {
    id: 'manuscript-1',
    title: 'The Cosmic Dance',
    author: 'Aisha Khan',
    date: '2344-07-12',
    location: 'Lunar Observatory, Moon',
    text: 'In the silent expanse, celestial bodies waltz to rhythms unknown, guided by gravity\'s gentle hand. Each orbit tells a story, a cosmic ballet of creation and wonder.',
  },
  {
    id: 'manuscript-2',
    title: 'Echoes of the Nebula',
    author: 'Kenji Tanaka',
    date: '2345-03-01',
    location: 'Mars Research Station, Mars',
    text: 'Nebulas, the universe\'s art canvases, swirl with colors born from stardust and light. They whisper tales of stellar nurseries, where new suns ignite and dreams are born.',
  },
  {
    id: 'manuscript-3',
    title: 'The Martian Dreamer',
    author: 'Sofia Rodriguez',
    date: '2346-11-28',
    location: 'Olympus City, Mars',
    text: 'Gazing at Earth from the red dunes of Mars, one feels a profound connection to our shared cosmic origin. The universe beckons us to explore, to question, and to dream beyond the stars.',
  },
];

const ManuscriptsSection = () => {
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);

  return (
    <section id="manuscripts" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">📜 Ancient Manuscripts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uncover the wisdom of space explorers from centuries past.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {manuscripts.map((manuscript) => (
            <motion.button
              key={manuscript.id}
              className="glass-card p-6 rounded-2xl text-left hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
              onClick={() => setSelectedManuscript(manuscript)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">
                <ScrollText />
              </div>
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                {manuscript.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                By {manuscript.author}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
                Read More
              </div>
            </motion.button>
          ))}
        </div>

        {/* Manuscript Modal */}
        <AnimatePresence>
          {selectedManuscript && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setSelectedManuscript(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{selectedManuscript.title}</h3>
                  <p className="text-muted-foreground italic">By {selectedManuscript.author}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedManuscript.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedManuscript.location}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{selectedManuscript.text}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {selectedManuscript.author}
                  </div>
                  <button
                    onClick={() => setSelectedManuscript(null)}
                    className="py-3 px-6 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ManuscriptsSection;
