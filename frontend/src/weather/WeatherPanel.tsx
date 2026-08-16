import { useI18n } from '../i18n/I18nContext';
import { computePressureTrend, windCompass, type PressureTrend } from './pressure';
import { PressureChart } from './PressureChart';
import type { WeatherResponse } from '../types/weather';

interface Props {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const TREND_STYLE: Record<PressureTrend, string> = {
  rising_fast: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/40',
  rising: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/30',
  stable: 'bg-surface-3/60 text-ink-soft border-line-strong',
  falling: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/30',
  falling_fast: 'bg-red-50 text-red-700 border-red-300 dark:bg-red-400/15 dark:text-red-300 dark:border-red-400/40',
};

const TREND_ARROW: Record<PressureTrend, string> = {
  rising_fast: '⬆',
  rising: '↗',
  stable: '→',
  falling: '↘',
  falling_fast: '⬇',
};

export function WeatherPanel({ weather, loading, error }: Props) {
  const { t } = useI18n();

  if (loading) {
    return <div className="text-sm text-ink-muted py-2">{t('weather.loading')}</div>;
  }

  if (error || !weather) {
    return <div className="text-sm text-red-600 dark:text-red-300 py-2">{error || t('weather.error')}</div>;
  }

  const { current } = weather;
  const { trend, delta3h } = computePressureTrend(weather);

  const stats = [
    { icon: '🌡️', label: t('weather.temperature'), value: `${Math.round(current.temperature)}°C` },
    {
      icon: '💨',
      label: t('weather.wind'),
      value: `${current.windSpeed.toFixed(1)} м/с ${windCompass(current.windDirection)}`,
    },
    { icon: '☁️', label: t('weather.cloud'), value: `${Math.round(current.cloudCover)}%` },
    { icon: '🌧️', label: t('weather.precipitation'), value: `${current.precipitation.toFixed(1)} мм` },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="panel p-2.5">
            <div className="text-[11px] text-ink-muted">
              {s.icon} {s.label}
            </div>
            <div className="text-sm font-medium text-ink mt-0.5">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="panel p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-ink-muted">{t('weather.pressure')}</div>
            <div className="text-lg font-semibold text-ink">{current.pressureMsl.toFixed(0)} гПа</div>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${TREND_STYLE[trend]}`}
          >
            {TREND_ARROW[trend]} {t(`weather.trend.${trend}`)} ({delta3h > 0 ? '+' : ''}
            {delta3h.toFixed(1)})
          </span>
        </div>

        <div className="mt-2">
          <PressureChart weather={weather} />
        </div>
      </div>
    </div>
  );
}
