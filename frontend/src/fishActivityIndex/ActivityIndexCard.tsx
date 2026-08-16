import { useI18n } from '../i18n/I18nContext';
import { useFishActivityIndex } from './useFishActivityIndex';
import { ActivityGauge } from './ActivityGauge';
import type { WeatherResponse } from '../types/weather';
import type { FactorKey, ActivityLevel } from './types';

interface Props {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  lat: number;
  lon: number;
}

const FACTOR_ICON: Record<FactorKey, string> = {
  pressure: '📊',
  moon: '🌙',
  timeOfDay: '🌅',
  temperature: '🌡️',
  wind: '💨',
  season: '📅',
};

const LEVEL_BADGE: Record<ActivityLevel, string> = {
  excellent: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/40',
  good: 'bg-brand-50 text-brand-700 border-brand-300 dark:bg-brand-400/15 dark:text-brand-300 dark:border-brand-400/40',
  average: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/40',
  poor: 'bg-red-50 text-red-700 border-red-300 dark:bg-red-400/15 dark:text-red-300 dark:border-red-400/40',
};

function factorScoreColor(score: number): string {
  if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

export function ActivityIndexCard({ weather, loading, error, lat, lon }: Props) {
  const { t } = useI18n();
  const result = useFishActivityIndex(weather, lat, lon);

  if (loading) {
    return <div className="text-sm text-ink-muted py-2">{t('weather.loading')}</div>;
  }

  if (error || !result) {
    return <div className="text-sm text-red-600 dark:text-red-300 py-2">{error || t('weather.error')}</div>;
  }

  const best = result.factors.reduce((a, b) => (b.score > a.score ? b : a));
  const worst = result.factors.reduce((a, b) => (b.score < a.score ? b : a));

  return (
    <div className="panel p-3">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{t('activity.title')}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${LEVEL_BADGE[result.level]}`}>
          {t(`activity.level.${result.level}` as const)}
        </span>
      </div>

      <div className="mt-1.5">
        <ActivityGauge score={result.score} level={result.level} />
      </div>

      <p className="mt-2.5 text-xs text-ink-muted leading-relaxed">
        {t('activity.summary.best')}{' '}
        <span className="text-ink-soft">
          {FACTOR_ICON[best.key]} {t(`activity.factor.${best.key}` as const)}
        </span>
        {worst.key !== best.key && (
          <>
            . {t('activity.summary.worst')}{' '}
            <span className="text-ink-soft">
              {FACTOR_ICON[worst.key]} {t(`activity.factor.${worst.key}` as const)}
            </span>
          </>
        )}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {result.factors.map((f) => (
          <div key={f.key} className="flex items-center gap-1.5 text-xs">
            <span>{FACTOR_ICON[f.key]}</span>
            <span className="flex-1 truncate text-ink-soft">{t(`activity.factor.${f.key}` as const)}</span>
            <span className={`tabular-nums font-medium ${factorScoreColor(f.score)}`}>{f.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
