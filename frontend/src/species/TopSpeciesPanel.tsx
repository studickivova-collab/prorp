import { useI18n } from '../i18n/I18nContext';
import { useTopSpecies } from './useTopSpecies';
import { SpeciesCard } from './SpeciesCard';
import type { WeatherResponse } from '../types/weather';
import type { WaterBodyKind } from '../types/waterBody';

interface Props {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  lat: number;
  lon: number;
  waterKind: WaterBodyKind;
}

export function TopSpeciesPanel({ weather, loading, error, lat, lon, waterKind }: Props) {
  const { t } = useI18n();
  const top = useTopSpecies(weather, lat, lon, waterKind);

  if (loading) {
    return <div className="text-sm text-ink-muted py-2">{t('weather.loading')}</div>;
  }

  if (error || top.length === 0) {
    return <div className="text-sm text-red-600 dark:text-red-300 py-2">{error || t('weather.error')}</div>;
  }

  return (
    <div>
      <span className="eyebrow">{t('species.title')}</span>
      <div className="mt-1.5 space-y-2">
        {top.map((scored, i) => (
          <SpeciesCard key={scored.profile.id} scored={scored} rank={i} />
        ))}
      </div>
    </div>
  );
}
