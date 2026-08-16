import { useMemo } from 'react';
import type { WeatherResponse } from '../types/weather';
import { findNowIndex } from './pressure';
import { useI18n } from '../i18n/I18nContext';

interface Props {
  weather: WeatherResponse;
  hoursBack?: number;
  hoursForward?: number;
}

const WIDTH = 300;
const HEIGHT = 100;
const PAD_Y = 10;

export function PressureChart({ weather, hoursBack = 72, hoursForward = 72 }: Props) {
  const { locale } = useI18n();

  const chart = useMemo(() => {
    const nowIndex = findNowIndex(weather.hourly.time, weather.current.time);
    const start = Math.max(0, nowIndex - hoursBack);
    const end = Math.min(weather.hourly.time.length - 1, nowIndex + hoursForward);

    const slice = weather.hourly.pressureMsl.slice(start, end + 1);
    const times = weather.hourly.time.slice(start, end + 1);
    const nowOffset = nowIndex - start;

    const min = Math.min(...slice);
    const max = Math.max(...slice);
    const range = Math.max(max - min, 1); // avoid divide-by-zero on flat pressure

    const points = slice.map((p, i) => {
      const x = (i / (slice.length - 1)) * WIDTH;
      const y = HEIGHT - PAD_Y - ((p - min) / range) * (HEIGHT - PAD_Y * 2);
      return [x, y] as const;
    });

    const nowX = (nowOffset / (slice.length - 1)) * WIDTH;

    const pastPoints = points.slice(0, nowOffset + 1);
    const futurePoints = points.slice(nowOffset);

    const toPath = (pts: readonly (readonly [number, number])[]) =>
      pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

    return {
      pastPath: toPath(pastPoints),
      futurePath: toPath(futurePoints),
      nowX,
      min,
      max,
      startLabel: times[0],
      endLabel: times[times.length - 1],
    };
  }, [weather, hoursBack, hoursForward]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'lv' ? 'lv-LV' : 'en-GB', {
      day: '2-digit',
      month: '2-digit',
    });

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-24" preserveAspectRatio="none">
        <line
          x1={chart.nowX}
          x2={chart.nowX}
          y1={0}
          y2={HEIGHT}
          stroke="var(--color-line-strong)"
          strokeWidth={1}
          strokeDasharray="3,3"
        />
        <path d={chart.pastPath} fill="none" stroke="#3cc7ae" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <path
          d={chart.futurePath}
          fill="none"
          stroke="#3cc7ae"
          strokeOpacity={0.5}
          strokeWidth={2}
          strokeDasharray="4,3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between text-[11px] text-ink-faint mt-1">
        <span>{fmt(chart.startLabel)}</span>
        <span className="text-ink-muted">
          {chart.min.toFixed(0)}–{chart.max.toFixed(0)} гПа
        </span>
        <span>{fmt(chart.endLabel)}</span>
      </div>
    </div>
  );
}
