import { createContext, useContext, useState, type ReactNode } from 'react';

export type GuideTab = 'species' | 'tips';

interface GuideContextValue {
  isOpen: boolean;
  tab: GuideTab;
  open: (tab?: GuideTab) => void;
  close: () => void;
  setTab: (tab: GuideTab) => void;
}

const GuideContext = createContext<GuideContextValue | null>(null);

export function GuideProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<GuideTab>('species');

  const open = (t?: GuideTab) => {
    if (t) setTab(t);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <GuideContext.Provider value={{ isOpen, tab, open, close, setTab }}>{children}</GuideContext.Provider>
  );
}

export function useGuide(): GuideContextValue {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error('useGuide must be used within GuideProvider');
  return ctx;
}
