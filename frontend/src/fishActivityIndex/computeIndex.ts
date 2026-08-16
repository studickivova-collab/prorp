import type { WeatherResponse } from '../types/weather';
import { findNowIndex } from '../weather/pressure';
import { FISH_ACTIVITY_WEIGHTS, ACTIVITY_LEVEL_THRESHOLDS } from './config';
import { scorePressure } from './factors/pressure';
import { scoreMoon } from './factors/moon';
import { scoreTimeOfDay } from './factors/timeOfDay';
import { scoreTemperature } from './factors/temperature';
import { scoreWind } from './factors/wind';
import { scoreSeason } from './factors/season';
import type { ActivityLevel, FactorKey, FactorResult, FishActivityResult } from './types';

export function levelFor(score: number): ActivityLevel {
  if (score >= ACTIVITY_LEVEL_THRESHOLDS.excellent) return 'excellent';
  if (score >= ACTIVITY_LEVEL_THRESHOLDS.good) return 'good';
  if (score >= ACTIVITY_LEVEL_THRESHOLDS.average) return 'average';
  return 'poor';
}

/**
 * Считает индекс для конкретного часа прогноза (по индексу в
 * weather.hourly). Используется и для "сейчас" (см. computeFishActivityIndex
 * ниже), и для календаря клёва, который прогоняет эту же формулу по каждому
 * часу на неделю вперёд.
 */
export function computeFishActivityIndexAtIndex(
  weather: WeatherResponse,
  index: number,
  lat: number,
  lon: number,
): FishActivityResult {
  const date = new Date(weather.hourly.time[index]);

  const raw: Record<FactorKey, { score: number; note: string }> = {
    pressure: scorePressure(weather, index),
    moon: scoreMoon(date),
    timeOfDay: scoreTimeOfDay(date, lat, lon),
    temperature: scoreTemperature(weather, index),
    wind: scoreWind(weather, index),
    season: scoreSeason(date),
  };

  const factors: FactorResult[] = (Object.keys(FISH_ACTIVITY_WEIGHTS) as FactorKey[]).map((key) => {
    const weight = FISH_ACTIVITY_WEIGHTS[key];
    const { score, note } = raw[key];
    return { key, score, weight, contribution: score * weight, note };
  });

  const score = Math.round(factors.reduce((sum, f) => sum + f.contribution, 0));

  return { score, level: levelFor(score), factors };
}

export function computeFishActivityIndex(weather: WeatherResponse, lat: number, lon: number): FishActivityResult {
  const index = findNowIndex(weather.hourly.time, weather.current.time);
  return computeFishActivityIndexAtIndex(weather, index, lat, lon);
}
