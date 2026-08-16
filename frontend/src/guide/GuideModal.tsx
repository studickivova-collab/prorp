import { useI18n } from '../i18n/I18nContext';
import { useGuide } from './GuideContext';
import { AllSpeciesList } from './AllSpeciesList';
import { TipsPanel } from './TipsPanel';

export function GuideModal() {
  const { t } = useI18n();
  const { isOpen, tab, setTab, close } = useGuide();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/50 flex items-end sm:items-center sm:justify-center"
      onClick={close}
    >
      <div
        className="w-full sm:max-w-md sm:rounded-2xl bg-surface-1 border border-line border-t-2 sm:border-t-2 border-t-brand-600 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-semibold tracking-wide text-ink uppercase">{t('guide.title')}</h2>
          <button
            onClick={close}
            aria-label="close"
            className="w-8 h-8 rounded-full bg-surface-3 text-ink-soft hover:bg-line-strong flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="flex rounded-full bg-surface-3 p-0.5 border border-line mb-3 w-fit">
          <button
            onClick={() => setTab('species')}
            className={`chip px-3 py-1 ${tab === 'species' ? 'chip-active' : 'text-ink-muted hover:text-ink-soft'}`}
          >
            {t('guide.tab.species')}
          </button>
          <button
            onClick={() => setTab('tips')}
            className={`chip px-3 py-1 ${tab === 'tips' ? 'chip-active' : 'text-ink-muted hover:text-ink-soft'}`}
          >
            {t('guide.tab.tips')}
          </button>
        </div>

        {tab === 'species' ? <AllSpeciesList /> : <TipsPanel />}
      </div>
    </div>
  );
}
