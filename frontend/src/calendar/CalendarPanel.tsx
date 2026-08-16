import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useCalendar } from './useCalendar';
import { MOON_EMOJI } from './moonEmoji';
import type { WeatherResponse } from '../types/weather';
import type { ActivityLevel } from '../fishActivityIndex/types';

interface Props {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  lat: number;
  lon: number;
}

const LEVEL_BAR_COLOR: Record<ActivityLevel, string> = {
  excellent: '#34d399',
  good: '#4fa171',
  average: '#f0a94e',
  poor: '#f87171',
};

function localeTag(locale: string): string {
  if (locale === 'ru') return 'ru-RU';
  if (locale === 'lv') return 'lv-LV';
  return 'en-GB';
}

export function CalendarPanel({ weather, loading, error, lat, lon }: Props) {
  const { t, locale } = useI18n();
  const days = useCalendar(weather, lat, lon, 7);
  const [selected, setSelected] = useState(0);

  if (loading) {
    return <div className="text-sm text-ink-muted py-2">{t('weather.loading')}</div>;
  }

  if (error || days.length === 0) {
    return <div className="text-sm text-red-600 dark:text-red-300 py-2">{error || t('weather.error')}</div>;
  }

  const tag = localeTag(locale);
  const weekdayFmt = new Intl.DateTimeFormat(tag, { weekday: 'short' });
  const dayFmt = new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'short' });
  const timeFmt = new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit' });

  const active = days[Math.min(selected, days.length - 1)];

  return (
    <div>
      <span className="eyebrow">{t('calendar.title')}</span>

      <div className="mt-1.5 grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={day.dateKey}
              onClick={() => setSelected(i)}
              className={`flex flex-col items-center gap-1 rounded-lg py-2 border transition ${
                isSelected
                  ? 'bg-surface-3/70 border-brand-400/60'
                  : 'bg-surface-2/60 border-line/60 hover:bg-surface-2'
              }`}
            >
              <span className="text-[10px] text-ink-muted capitalize">{weekdayFmt.format(day.date)}</span>
              <span className="text-xs">{MOON_EMOJI[day.moonPhaseKey]}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: LEVEL_BAR_COLOR[day.level] }}>
                {day.peak.score}
              </span>
              {day.isBestDay && <span className="w-1 h-1 rounded-full bg-accent-500 dark:bg-accent-400" />}
            </button>
          );
        })}
      </div>

      <div className="mt-2 panel p-2.5 text-xs text-ink-soft flex items-center justify-between">
        <span>
          {dayFmt.format(active.date)}
          {active.isBestDay && (
            <span className="ml-2 text-accent-600 dark:text-accent-400">★ {t('calendar.bestDay')}</span>
          )}
        </span>
        <span className="text-ink-muted">
          {t('calendar.peakAt')} {timeFmt.format(new Date(active.peak.time))} · {t(`activity.level.${active.level}` as const)}
        </span>
      </div>
    </div>
  );
}
