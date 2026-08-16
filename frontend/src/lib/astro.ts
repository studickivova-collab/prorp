import * as SunCalc from 'suncalc';

export type MoonPhaseKey =
  | 'new'
  | 'waxingCrescent'
  | 'firstQuarter'
  | 'waxingGibbous'
  | 'full'
  | 'waningGibbous'
  | 'lastQuarter'
  | 'waningCrescent';

const MOON_PHASE_KEYS: MoonPhaseKey[] = [
  'new',
  'waxingCrescent',
  'firstQuarter',
  'waxingGibbous',
  'full',
  'waningGibbous',
  'lastQuarter',
  'waningCrescent',
];

export interface MoonInfo {
  /** 0..1: 0/1 = new moon, 0.25 = first quarter, 0.5 = full moon, 0.75 = last quarter */
  phase: number;
  /** 0..1 fraction of the moon's visible disk illuminated */
  illumination: number;
  phaseKey: MoonPhaseKey;
}

export function getMoonInfo(date: Date): MoonInfo {
  const { phase, fraction } = SunCalc.getMoonIllumination(date);
  const phaseKey = MOON_PHASE_KEYS[Math.round(phase * 8) % 8];
  return { phase, illumination: fraction, phaseKey };
}

export interface SunInfo {
  sunrise: Date;
  sunset: Date;
  dawn: Date;
  dusk: Date;
}

export function getSunInfo(date: Date, lat: number, lon: number): SunInfo {
  const t = SunCalc.getTimes(date, lat, lon);
  // At Latvia's latitude the sun always rises/sets, but the type covers
  // polar day/night, so fall back to the reference date defensively.
  return {
    sunrise: t.sunrise ?? date,
    sunset: t.sunset ?? date,
    dawn: t.dawn ?? date,
    dusk: t.dusk ?? date,
  };
}

export type TimeOfDayPeriod = 'dawn' | 'day' | 'dusk' | 'night';

const GOLDEN_WINDOW_MS = 90 * 60_000;

export function classifyTimeOfDay(date: Date, lat: number, lon: number): TimeOfDayPeriod {
  const { sunrise, sunset } = getSunInfo(date, lat, lon);
  const t = date.getTime();

  if (Math.abs(t - sunrise.getTime()) <= GOLDEN_WINDOW_MS) return 'dawn';
  if (Math.abs(t - sunset.getTime()) <= GOLDEN_WINDOW_MS) return 'dusk';
  if (t > sunrise.getTime() && t < sunset.getTime()) return 'day';
  return 'night';
}
