import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import dict, { type Locale, type TranslationKey } from './translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = 'zvejaslaiks.locale';

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru' || stored === 'lv' || stored === 'en') return stored;
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === 'lv') return 'lv';
  if (browserLang === 'en') return 'en';
  return 'ru';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  };

  const t = useMemo(() => {
    const table = dict[locale];
    return (key: TranslationKey) => table[key] ?? dict.ru[key] ?? key;
  }, [locale]);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
