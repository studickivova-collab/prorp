import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CatchEntry } from './types';

const STORAGE_KEY = 'zvejaslaiks.diary';

function readStored(): CatchEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CatchEntry[]) : [];
  } catch {
    return [];
  }
}

export interface DiaryPrefill {
  waterBodyName?: string;
  conditions?: string;
}

interface DiaryContextValue {
  entries: CatchEntry[];
  addEntry: (entry: Omit<CatchEntry, 'id' | 'createdAt'>) => void;
  removeEntry: (id: string) => void;
  isOpen: boolean;
  mode: 'list' | 'form';
  prefill: DiaryPrefill | null;
  openList: () => void;
  openForm: (prefill?: DiaryPrefill) => void;
  close: () => void;
}

const DiaryContext = createContext<DiaryContextValue | null>(null);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CatchEntry[]>(readStored);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [prefill, setPrefill] = useState<DiaryPrefill | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry: DiaryContextValue['addEntry'] = (entry) => {
    setEntries((prev) => [{ ...entry, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev]);
  };

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const openList = () => {
    setMode('list');
    setPrefill(null);
    setIsOpen(true);
  };

  const openForm = (p?: DiaryPrefill) => {
    setMode('form');
    setPrefill(p ?? null);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <DiaryContext.Provider
      value={{ entries, addEntry, removeEntry, isOpen, mode, prefill, openList, openForm, close }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary(): DiaryContextValue {
  const ctx = useContext(DiaryContext);
  if (!ctx) throw new Error('useDiary must be used within DiaryProvider');
  return ctx;
}
