import { getSunInfo } from '../../lib/astro';
import type { FactorScore } from '../types';

/**
 * Классические "золотые часы" рыбалки — рассвет и закат. Чем ближе
 * текущее время к восходу/закату, тем выше бонус.
 */
export function scoreTimeOfDay(date: Date, lat: number, lon: number): FactorScore {
  const { sunrise, sunset } = getSunInfo(date, lat, lon);
  const minutesTo = (t: Date) => Math.abs(date.getTime() - t.getTime()) / 60_000;
  const minutes = Math.min(minutesTo(sunrise), minutesTo(sunset));

  if (minutes <= 60) return { score: 100, note: 'goldenHour' };
  if (minutes <= 150) return { score: Math.round(100 - ((minutes - 60) / 90) * 40), note: 'transition' };
  return { score: 48, note: 'offPeak' };
}
