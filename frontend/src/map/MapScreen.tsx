import { useMemo, useState } from 'react';
import { MapView } from './MapView';
import { MapFilters, type KindFilter } from './MapFilters';
import { WaterBodyPanel } from './WaterBodyPanel';
import { useWaterBodies } from './useWaterBodies';
import { useFavorites } from '../lib/useFavorites';
import { useI18n } from '../i18n/I18nContext';
import type { WaterBodySummary } from '../types/waterBody';

export function MapScreen() {
  const { t } = useI18n();
  const { items, loading, error, retry } = useWaterBodies();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [selected, setSelected] = useState<WaterBodySummary | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (kindFilter !== 'all' && item.kind !== kindFilter) return false;
      if (query && !item.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [items, search, kindFilter]);

  return (
    <div className="flex flex-col h-full">
      <MapFilters
        search={search}
        onSearchChange={setSearch}
        kindFilter={kindFilter}
        onKindFilterChange={setKindFilter}
        resultCount={filtered.length}
      />

      <div className="relative flex-1 min-h-0">
        {loading && (
          <div className="absolute inset-0 z-[1100] flex items-center justify-center bg-surface-0/70 text-ink-soft text-sm">
            {t('map.loading')}
          </div>
        )}

        {!loading && error && (
          <div className="absolute inset-0 z-[1100] flex flex-col items-center justify-center gap-3 bg-surface-0/90 text-center px-6">
            <p className="text-ink-soft text-sm">{error || t('map.error')}</p>
            <button
              onClick={retry}
              className="btn btn-primary px-4 py-2"
            >
              {t('map.retry')}
            </button>
          </div>
        )}

        {!loading && !error && <MapView items={filtered} onSelect={setSelected} />}

        {selected && (
          <WaterBodyPanel
            summary={selected}
            onClose={() => setSelected(null)}
            isFavorite={isFavorite(selected.id)}
            onToggleFavorite={() => toggleFavorite(selected.id)}
          />
        )}
      </div>
    </div>
  );
}
