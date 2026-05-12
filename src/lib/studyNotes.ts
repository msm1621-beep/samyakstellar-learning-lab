export interface StudyNote {
  id: string;
  bodyName: string;
  bodyIcon: string;
  question: string;
  answer: string;
  createdAt: number;
  source?: string;
}

export const STUDY_NOTES_STORAGE_KEY = 'cosmoStudyNotes';

export const NOTE_REWARD = 10;

export const loadStudyNotes = (): StudyNote[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STUDY_NOTES_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveStudyNotes = (notes: StudyNote[]) => {
  localStorage.setItem(STUDY_NOTES_STORAGE_KEY, JSON.stringify(notes));
  window.dispatchEvent(new CustomEvent('cosmo-notes-updated'));
};

export const saveStudyNote = (note: Omit<StudyNote, 'id' | 'createdAt'>): StudyNote => {
  const savedNote: StudyNote = {
    ...note,
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    createdAt: Date.now(),
  };

  const allNotes = loadStudyNotes();
  allNotes.unshift(savedNote);
  saveStudyNotes(allNotes);
  return savedNote;
};

export const isSaveNoteRequest = (text: string) => /\b(save|store|add|keep)\b[\s\S]*\b(note|notes|conversation|chat|answer|reply)\b/i.test(text);