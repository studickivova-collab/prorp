import type { WeatherResponse } from '../types/weather';

export type PressureTrend = 'rising_fast' | 'rising' | 'stable' | 'falling' | 'falling_fast';

export function findNowIndex(time: string[], currentTime: string): number {
  const idx = time.indexOf(currentTime);
  if (idx !== -1) return idx;
  // Fall back to the closest timestamp <= now.
  const now = Date.now();
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < time.length; i++) {
    const diff = Math.abs(new Date(time[i]).getTime() - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

export interface PressureTrendResult {
  trend: PressureTrend;
  /** hPa change over the last 3 hours, rounded to 1 decimal */
  delta3h: number;
}

/**
 * Rule-of-thumb thresholds anglers use: a swing under 0.5 hPa/3h reads as
 * stable, 3 hPa/3h or more is a "rapid" change (the kind that tends to spook
 * fish), everything between is a gentle rise or fall.
 */
export function pressureTrendAtIndex(weather: WeatherResponse, index: number): PressureTrendResult {
  const pastIndex = Math.max(0, index - 3);
  const raw = weather.hourly.pressureMsl[index] - weather.hourly.pressureMsl[pastIndex];
  const delta3h = Math.round(raw * 10) / 10;

  let trend: PressureTrend;
  if (Math.abs(delta3h) < 0.5) trend = 'stable';
  else if (delta3h >= 3) trend = 'rising_fast';
  else if (delta3h > 0) trend = 'rising';
  else if (delta3h <= -3) trend = 'falling_fast';
  else trend = 'falling';

  return { trend, delta3h };
}

export function computePressureTrend(weather: WeatherResponse): PressureTrendResult {
  return pressureTrendAtIndex(weather, findNowIndex(weather.hourly.time, weather.current.time));
}

export function windCompass(direction: number): string {
  const points = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return points[Math.round(direction / 45) % 8];
}
