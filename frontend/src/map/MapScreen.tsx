import { useEffect, useMemo, useState } from 'react';
import { MapView } from './MapView';
import { MapFilters, type KindFilter } from './MapFilters';
import { WaterBodyPanel } from './WaterBodyPanel';
import { useWaterBodies } from './useWaterBodies';
import { useWaterBodyDetail } from './useWaterBodyDetail';
import { useFavorites } from '../lib/useFavorites';
import { useI18n } from '../i18n/I18nContext';
import { useDiary } from '../diary/DiaryContext';
import { computeEchoZones } from '../echo/zones';
import type { WaterBodySummary } from '../types/waterBody';

export function MapScreen() {
  const { t } = useI18n();
  const { items, loading, error, retry } = useWaterBodies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { entries, openForm } = useDiary();

  const [search, setSearch] = useState('');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [selected, setSelected] = useState<WaterBodySummary | null>(null);
  const [echoMode, setEchoMode] = useState(false);

  // Echo mode only makes sense while a specific water body is open — leaving
  // it selected keeps the toggle available but drop it once nothing's picked.
  useEffect(() => {
    if (!selected) setEchoMode(false);
  }, [selected]);

  const { detail } = useWaterBodyDetail(echoMode ? selected?.id ?? null : null);

  const zones = useMemo(() => {
    if (!detail) return [];
    return computeEchoZones(detail);
  }, [detail]);

  const personalPins = useMemo(() => {
    if (!selected) return [];
    return entries
      .filter((e) => e.waterBodyId === selected.id && e.lat !== undefined && e.lon !== undefined)
      .map((e) => ({ id: e.id, lat: e.lat as number, lon: e.lon as number, species: e.species, dateIso: e.dateIso }));
  }, [entries, selected]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (kindFilter !== 'all' && item.kind !== kindFilter) return false;
      if (query && !item.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [items, search, kindFilter]);

  const handleMapTap = (lat: number, lon: number) => {
    if (!selected) return;
    openForm({ waterBodyName: selected.name, waterBodyId: selected.id, lat, lon });
  };

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

        {!loading && !error && (
          <MapView
            items={filtered}
            onSelect={setSelected}
            echoMode={echoMode}
            outline={detail?.geometry ?? null}
            waterKind={selected?.kind}
            zones={zones}
            personalPins={personalPins}
            onMapTap={echoMode ? handleMapTap : undefined}
          />
        )}

        {echoMode && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] max-w-[92%] bg-surface-1/95 border border-line rounded-full px-3 py-1.5 text-xs text-ink-soft shadow flex items-center gap-1.5">
            📡 {t('echo.tapHint')}
          </div>
        )}

        {selected && (
          <WaterBodyPanel
            summary={selected}
            onClose={() => setSelected(null)}
            isFavorite={isFavorite(selected.id)}
            onToggleFavorite={() => toggleFavorite(selected.id)}
            echoMode={echoMode}
            onToggleEcho={() => setEchoMode((v) => !v)}
          />
        )}
      </div>
    </div>
  );
}
