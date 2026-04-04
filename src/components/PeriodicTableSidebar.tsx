import { useState } from 'react';
import { ChevronDown, ChevronRight, Atom, X, Search } from 'lucide-react';
import { elements, categories, categoryColors, Element } from '@/data/periodicTable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const PeriodicTableSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [search, setSearch] = useState('');

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = search.trim()
    ? elements.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.symbol.toLowerCase().includes(search.toLowerCase()) ||
        String(e.atomicNumber).includes(search)
      )
    : null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-primary/90 hover:bg-primary text-primary-foreground p-2 rounded-r-lg shadow-lg transition-all hover:pl-3"
        aria-label="Open Periodic Table"
      >
        <Atom className="w-5 h-5" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => { setIsOpen(false); setSelectedElement(null); }}
            />
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[340px] sm:w-[380px] z-50 bg-background/95 backdrop-blur-xl border-r border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-bold text-lg text-foreground">Periodic Table</h2>
                </div>
                <button onClick={() => { setIsOpen(false); setSelectedElement(null); }} className="p-1 hover:bg-muted rounded-md transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Search */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search elements..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 bg-muted/50 border-border"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                {selectedElement ? (
                  <ElementDetail element={selectedElement} onBack={() => setSelectedElement(null)} />
                ) : filtered ? (
                  <div className="p-3 space-y-1">
                    {filtered.length === 0 && <p className="text-muted-foreground text-sm text-center py-4">No elements found</p>}
                    {filtered.map(el => (
                      <ElementRow key={el.atomicNumber} element={el} onClick={() => setSelectedElement(el)} />
                    ))}
                  </div>
                ) : (
                  <div className="p-3 space-y-1">
                    {categories.map(cat => {
                      const isExpanded = expandedCategories.includes(cat);
                      const catElements = elements.filter(e => e.category === cat);
                      const colors = categoryColors[cat] || '';
                      return (
                        <div key={cat}>
                          <button
                            onClick={() => toggleCategory(cat)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                            <span className={`text-xs px-2 py-0.5 rounded border ${colors}`}>{catElements.length}</span>
                            <span className="text-sm font-medium text-foreground">{cat}</span>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 space-y-0.5 pb-2">
                                  {catElements.map(el => (
                                    <ElementRow key={el.atomicNumber} element={el} onClick={() => setSelectedElement(el)} />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              <div className="p-3 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">118 Elements • Tap any to view details</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ElementRow = ({ element, onClick }: { element: Element; onClick: () => void }) => {
  const colors = categoryColors[element.category] || '';
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
    >
      <div className={`w-10 h-10 flex flex-col items-center justify-center rounded border text-xs font-bold ${colors}`}>
        <span className="text-[10px] leading-none opacity-70">{element.atomicNumber}</span>
        <span className="text-sm leading-none">{element.symbol}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{element.name}</p>
        <p className="text-xs text-muted-foreground truncate">{element.atomicMass} u</p>
      </div>
    </button>
  );
};

const ElementDetail = ({ element, onBack }: { element: Element; onBack: () => void }) => {
  const colors = categoryColors[element.category] || '';
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 space-y-4">
      <button onClick={onBack} className="text-sm text-primary hover:underline flex items-center gap-1">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to list
      </button>

      <div className="flex flex-col items-center gap-2">
        <div className={`w-24 h-24 flex flex-col items-center justify-center rounded-xl border-2 ${colors}`}>
          <span className="text-sm opacity-70">{element.atomicNumber}</span>
          <span className="text-4xl font-bold">{element.symbol}</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{element.name}</h3>
        <span className={`text-xs px-3 py-1 rounded-full border ${colors}`}>{element.category}</span>
      </div>

      <div className="space-y-3 text-sm">
        <DetailRow label="Atomic Mass" value={`${element.atomicMass} u`} />
        <DetailRow label="Electron Config" value={element.electronConfig} />
        <DetailRow label="Discovered By" value={element.discoveredBy} />
        <DetailRow label="Year Discovered" value={element.yearDiscovered} />
        <div className="pt-2 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{element.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-2">
    <span className="text-muted-foreground shrink-0">{label}</span>
    <span className="text-foreground text-right">{value}</span>
  </div>
);

export default PeriodicTableSidebar;
