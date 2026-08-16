import { useI18n } from '../i18n/I18nContext';
import { useDiary } from './DiaryContext';
import { DiaryList } from './DiaryList';
import { DiaryForm } from './DiaryForm';

export function DiaryModal() {
  const { t } = useI18n();
  const { isOpen, mode, prefill, entries, addEntry, removeEntry, openForm, openList, close } = useDiary();

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
          <h2 className="font-display text-base font-semibold tracking-wide text-ink uppercase">{t('diary.title')}</h2>
          <button
            onClick={close}
            aria-label="close"
            className="w-8 h-8 rounded-full bg-surface-3 text-ink-soft hover:bg-line-strong flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {mode === 'list' ? (
          <DiaryList entries={entries} onRemove={removeEntry} onAdd={() => openForm()} />
        ) : (
          <DiaryForm
            prefill={prefill}
            onCancel={openList}
            onSave={(entry) => {
              addEntry(entry);
              openList();
            }}
          />
        )}
      </div>
    </div>
  );
}
