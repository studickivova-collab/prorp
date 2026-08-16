import { useI18n } from '../i18n/I18nContext';
import type { CatchEntry } from './types';

interface Props {
  entries: CatchEntry[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}

function localeTag(locale: string): string {
  if (locale === 'ru') return 'ru-RU';
  if (locale === 'lv') return 'lv-LV';
  return 'en-GB';
}

export function DiaryList({ entries, onRemove, onAdd }: Props) {
  const { t, locale } = useI18n();
  const dateFmt = new Intl.DateTimeFormat(localeTag(locale), { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      <button
        onClick={onAdd}
        className="btn btn-primary w-full py-2.5 mb-3"
      >
        + {t('diary.add')}
      </button>

      {entries.length === 0 ? (
        <p className="text-sm text-ink-muted py-4 text-center">{t('diary.empty')}</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.id} className="panel p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink">
                    {e.species}
                    {e.weightKg ? ` · ${e.weightKg} кг` : ''}
                  </div>
                  <div className="text-xs text-ink-muted truncate">
                    {e.waterBodyName} · {dateFmt.format(new Date(e.dateIso))}
                  </div>
                  {e.conditions && <div className="text-xs text-ink-soft mt-1">{e.conditions}</div>}
                </div>
                <button
                  onClick={() => onRemove(e.id)}
                  aria-label="delete"
                  className="shrink-0 w-6 h-6 rounded-full text-ink-faint hover:text-red-600 dark:hover:text-red-400 hover:bg-surface-3 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
