import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookMarked, X, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface StudyNote {
  id: string;
  bodyName: string;
  bodyIcon: string;
  question: string;
  answer: string;
  createdAt: number;
}

const STORAGE_KEY = 'cosmoStudyNotes';

const loadNotes = (): StudyNote[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};

const StudyNotesViewer = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);

  // Refresh count regularly so the badge stays in sync after saves
  useEffect(() => {
    const refresh = () => setCount(loadNotes().length);
    refresh();
    const id = window.setInterval(refresh, 1500);
    window.addEventListener('storage', refresh);
    return () => { window.clearInterval(id); window.removeEventListener('storage', refresh); };
  }, []);

  useEffect(() => {
    if (open) setNotes(loadNotes());
  }, [open]);

  const remove = (id: string) => {
    const next = notes.filter(n => n.id !== id);
    setNotes(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setCount(next.length);
    toast({ title: 'Note deleted' });
  };

  const clearAll = () => {
    if (!confirm('Delete all your study notes?')) return;
    localStorage.setItem(STORAGE_KEY, '[]');
    setNotes([]);
    setCount(0);
  };

  const filtered = notes.filter(n => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return n.bodyName.toLowerCase().includes(q)
      || n.question.toLowerCase().includes(q)
      || n.answer.toLowerCase().includes(q);
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-900/40 hover:scale-105 transition-transform"
        aria-label="Open my study notes"
      >
        <BookMarked className="w-4 h-4" />
        <span className="text-xs font-semibold">My Notes</span>
        {count > 0 && (
          <span className="bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full px-1.5 min-w-[18px] text-center">{count}</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="glass-card max-w-2xl w-full rounded-2xl p-5 max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-primary" /> My Study Notes
                </h3>
                <p className="text-xs text-muted-foreground">Saved Cosmo answers • {notes.length} total</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your notes..." className="pl-9" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-sm text-muted-foreground">
                  {notes.length === 0
                    ? 'No notes yet. Open Cosmo on any celestial card and tap "Save as study note" to start your collection!'
                    : 'No notes match your search.'}
                </div>
              ) : (
                filtered.map(n => (
                  <div key={n.id} className="glass-card rounded-xl p-3 border border-purple-500/20">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{n.bodyIcon}</span>
                        <div>
                          <p className="text-sm font-bold">{n.bodyName}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => remove(n.id)} className="p-1.5 rounded-full hover:bg-destructive/20 text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-primary mt-2">Q: {n.question}</p>
                    <p className="text-xs text-foreground mt-1 whitespace-pre-wrap">{n.answer}</p>
                  </div>
                ))
              )}
            </div>

            {notes.length > 0 && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-muted">
                <Button variant="outline" size="sm" onClick={clearAll} className="flex-1">
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear all
                </Button>
                <Button size="sm" onClick={() => setOpen(false)} className="flex-1">Done</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StudyNotesViewer;
