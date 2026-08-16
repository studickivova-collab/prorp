import { SPECIES } from './data';
import type { ScoredSpecies, SpeciesProfile } from './types';
import type { WeatherResponse } from '../types/weather';
import type { WaterBodyKind } from '../types/waterBody';
import { computePressureTrend } from '../weather/pressure';
import { classifyTimeOfDay } from '../lib/astro';

/**
 * Веса подфакторов пригодности вида под текущие условия. Сезон (месяц)
 * значит больше всего — он определяет, ловится ли вид вообще сейчас;
 * остальное — тонкая настройка внутри сезона.
 */
const SPECIES_WEIGHTS = {
  month: 0.4,
  temperature: 0.25,
  timeOfDay: 0.2,
  trend: 0.1,
  habitat: 0.05,
};

function circularMonthDistance(month: number, activeMonths: number[]): number {
  let best = 6;
  for (const m of activeMonths) {
    const diff = Math.abs(month - m);
    best = Math.min(best, diff, 12 - diff);
  }
  return best;
}

function scoreMonth(date: Date, profile: SpeciesProfile): number {
  const distance = circularMonthDistance(date.getMonth(), profile.activeMonths);
  if (distance === 0) return 100;
  return Math.max(20, 100 - distance * 22);
}

function scoreTemperature(currentTemp: number, [min, max]: [number, number]): number {
  if (currentTemp >= min && currentTemp <= max) return 100;
  const distance = currentTemp < min ? min - currentTemp : currentTemp - max;
  return Math.max(20, 100 - distance * 8);
}

function scoreTimeOfDay(period: string, preferred: string[]): number {
  return preferred.includes(period) ? 100 : 55;
}

function scoreTrend(trend: string, preferred: string[]): number {
  return preferred.includes(trend) ? 100 : 60;
}

function scoreHabitat(kind: WaterBodyKind, habitat: WaterBodyKind[]): number {
  return habitat.includes(kind) || habitat.includes('water') ? 100 : 55;
}

export function scoreAllSpecies(
  weather: WeatherResponse,
  date: Date,
  lat: number,
  lon: number,
  waterKind: WaterBodyKind,
): ScoredSpecies[] {
  const { trend } = computePressureTrend(weather);
  const period = classifyTimeOfDay(date, lat, lon);

  return SPECIES.map((profile) => {
    const score =
      scoreMonth(date, profile) * SPECIES_WEIGHTS.month +
      scoreTemperature(weather.current.temperature, profile.tempRange) * SPECIES_WEIGHTS.temperature +
      scoreTimeOfDay(period, profile.preferredTimeOfDay) * SPECIES_WEIGHTS.timeOfDay +
      scoreTrend(trend, profile.preferredTrends) * SPECIES_WEIGHTS.trend +
      scoreHabitat(waterKind, profile.habitat) * SPECIES_WEIGHTS.habitat;

    return { profile, score: Math.round(score) };
  }).sort((a, b) => b.score - a.score);
}

export function getTopSpecies(
  weather: WeatherResponse,
  date: Date,
  lat: number,
  lon: number,
  waterKind: WaterBodyKind,
  count = 3,
): ScoredSpecies[] {
  return scoreAllSpecies(weather, date, lat, lon, waterKind).slice(0, count);
}
