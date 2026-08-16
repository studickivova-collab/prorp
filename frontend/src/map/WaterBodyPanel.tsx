import { useI18n } from '../i18n/I18nContext';
import { WeatherPanel } from '../weather/WeatherPanel';
import { useWeather } from '../weather/useWeather';
import { computePressureTrend, windCompass } from '../weather/pressure';
import { ActivityIndexCard } from '../fishActivityIndex/ActivityIndexCard';
import { TopSpeciesPanel } from '../species/TopSpeciesPanel';
import { CalendarPanel } from '../calendar/CalendarPanel';
import { useDiary } from '../diary/DiaryContext';
import type { WaterBodySummary } from '../types/waterBody';

interface Props {
  summary: WaterBodySummary;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function WaterBodyPanel({ summary, onClose, isFavorite, onToggleFavorite }: Props) {
  const { t } = useI18n();
  const kindLabel = t(`water.${summary.kind}` as const);
  const [lat, lon] = summary.center;
  const { weather, loading, error } = useWeather(lat, lon);
  const { openForm } = useDiary();

  const conditionsSummary = weather
    ? (() => {
        const { trend, delta3h } = computePressureTrend(weather);
        return `${weather.current.pressureMsl.toFixed(0)} гПа (${t(`weather.trend.${trend}` as const)}, ${
          delta3h > 0 ? '+' : ''
        }${delta3h.toFixed(1)}), ${Math.round(weather.current.temperature)}°C, ${weather.current.windSpeed.toFixed(
          1,
        )} м/с ${windCompass(weather.current.windDirection)}`;
      })()
    : '';

  return (
    <div className="absolute inset-x-0 bottom-0 z-[1000] max-h-[75vh] overflow-y-auto bg-surface-1 border-t-2 border-brand-600 rounded-t-2xl shadow-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom">
      <div className="flex items-start justify-between gap-3 sticky -top-4 -mt-4 pt-4 pb-2 bg-surface-1">
        <div>
          <span className="inline-block eyebrow text-brand-600 dark:text-brand-400 font-semibold mb-1">
            {kindLabel}
          </span>
          <h2 className="font-display text-lg font-semibold text-ink leading-tight">{summary.name}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="close"
          className="shrink-0 w-8 h-8 rounded-full bg-surface-3 border border-line text-ink-soft hover:bg-line-strong flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggleFavorite}
          className={`btn flex-1 py-2 ${
            isFavorite
              ? 'bg-accent-400/20 text-accent-700 dark:text-accent-300 border-2 border-accent-500/50'
              : 'btn-ghost'
          }`}
        >
          {isFavorite ? `★ ${t('map.favorite.remove')}` : `☆ ${t('map.favorite.add')}`}
        </button>
        <button
          onClick={() => openForm({ waterBodyName: summary.name, conditions: conditionsSummary })}
          className="btn btn-ghost flex-1 py-2"
        >
          📔 {t('diary.logCatch')}
        </button>
      </div>

      <div className="mt-3">
        <ActivityIndexCard weather={weather} loading={loading} error={error} lat={lat} lon={lon} />
      </div>

      <div className="mt-3">
        <CalendarPanel weather={weather} loading={loading} error={error} lat={lat} lon={lon} />
      </div>

      <div className="mt-3">
        <TopSpeciesPanel
          weather={weather}
          loading={loading}
          error={error}
          lat={lat}
          lon={lon}
          waterKind={summary.kind}
        />
      </div>

      <div className="mt-3">
        <WeatherPanel weather={weather} loading={loading} error={error} />
      </div>
    </div>
  );
}
