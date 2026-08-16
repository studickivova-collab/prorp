import type { WeatherResponse } from '../types/weather';
import { computeFishActivityIndexAtIndex, levelFor } from '../fishActivityIndex/computeIndex';
import { getMoonInfo } from '../lib/astro';
import type { CalendarDay } from './types';

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Прогоняет индекс активности рыбы по каждому часу прогноза и группирует
 * по дням, беря лучший час дня как "пик" — это и есть дневная оценка в
 * календаре. Даты считаются с начала текущего часа: сегодняшний день
 * может ещё попасть в календарь, если впереди есть непрошедшие часы.
 */
export function computeCalendar(
  weather: WeatherResponse,
  lat: number,
  lon: number,
  daysAhead = 7,
): CalendarDay[] {
  const cutoff = Date.now() - 30 * 60_000; // small buffer so the current hour still counts
  const byDay = new Map<string, number[]>();

  weather.hourly.time.forEach((iso, idx) => {
    const t = new Date(iso);
    if (t.getTime() < cutoff) return;
    const key = dateKey(t);
    const list = byDay.get(key);
    if (list) list.push(idx);
    else byDay.set(key, [idx]);
  });

  const sortedKeys = Array.from(byDay.keys()).sort().slice(0, daysAhead);

  const days: CalendarDay[] = sortedKeys.map((key) => {
    const indices = byDay.get(key)!;
    let bestIdx = indices[0];
    let bestScore = -1;
    for (const idx of indices) {
      const { score } = computeFishActivityIndexAtIndex(weather, idx, lat, lon);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    }

    const noon = new Date(`${key}T12:00:00`);
    const moon = getMoonInfo(noon);

    return {
      dateKey: key,
      date: noon,
      peak: { time: weather.hourly.time[bestIdx], score: bestScore },
      level: levelFor(bestScore),
      moonPhaseKey: moon.phaseKey,
      isBestDay: false,
    };
  });

  const bestCount = Math.max(1, Math.round(days.length * 0.3));
  const bestKeys = new Set(
    [...days]
      .sort((a, b) => b.peak.score - a.peak.score)
      .slice(0, bestCount)
      .map((d) => d.dateKey),
  );

  for (const day of days) {
    day.isBestDay = bestKeys.has(day.dateKey);
  }

  return days;
}
