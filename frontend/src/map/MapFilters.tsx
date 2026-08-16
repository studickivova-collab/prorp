import { useI18n } from '../i18n/I18nContext';
import type { WaterBodyKind } from '../types/waterBody';

export type KindFilter = 'all' | WaterBodyKind;

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  kindFilter: KindFilter;
  onKindFilterChange: (value: KindFilter) => void;
  resultCount: number;
}

export function MapFilters({ search, onSearchChange, kindFilter, onKindFilterChange, resultCount }: Props) {
  const { t } = useI18n();

  const kinds: KindFilter[] = ['all', 'lake', 'river'];

  return (
    <div className="flex flex-col gap-2 p-3 bg-surface-1/95 border-b border-line">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t('map.search.placeholder')}
        className="w-full rounded-lg bg-surface-3 border border-line text-ink placeholder-ink-faint px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
      />
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => onKindFilterChange(k)}
              className={`chip px-3 py-1.5 transition ${kindFilter === k ? 'chip-active' : 'chip-inactive'}`}
            >
              {k === 'all' ? t('map.filter.all') : k === 'lake' ? t('map.filter.lake') : t('map.filter.river')}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-ink-muted whitespace-nowrap">
          {resultCount} {t('map.count')}
        </span>
      </div>
    </div>
  );
}
