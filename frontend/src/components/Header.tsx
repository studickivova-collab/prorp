import { useI18n } from '../i18n/I18nContext';
import { LOCALES } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { useDiary } from '../diary/DiaryContext';

/** Simple hook-and-line mark — stands in for a generic emoji logo. */
function HookLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M12 2v11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5c0 3.2-2.4 5.5-5 5.5-2.8 0-5-2-5-4.6 0-2.3 1.7-3.9 3.6-3.9 1.6 0 2.9 1.1 2.9 2.7 0 1.2-.9 2-1.9 2-.7 0-1.3-.4-1.3-1.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="2.3" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { openList } = useDiary();

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-2.5 bg-surface-1 border-b-2 border-brand-700 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-brand-500 dark:text-brand-400">
          <HookLogo />
        </span>
        <h1 className="font-display text-base font-semibold tracking-wide text-ink truncate uppercase">
          {t('app.name')}
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex rounded-full bg-surface-3 p-0.5 border border-line">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={`chip px-2 py-1 ${locale === l.code ? 'chip-active' : 'text-ink-muted hover:text-ink-soft'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => openList()}
          aria-label={t('diary.button')}
          className="w-8 h-8 rounded-full bg-surface-3 border border-line text-ink-soft flex items-center justify-center hover:bg-line-strong"
        >
          📔
        </button>
        <button
          onClick={toggleTheme}
          aria-label={t('theme.toggle')}
          className="w-8 h-8 rounded-full bg-surface-3 border border-line text-ink-soft flex items-center justify-center hover:bg-line-strong"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
