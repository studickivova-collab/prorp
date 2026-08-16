import type { WeatherResponse } from '../../types/weather';
import { windCompass } from '../../weather/pressure';
import type { FactorScore } from '../types';

/**
 * Слабый-умеренный ветер создаёт рябь и насыщает воду кислородом — плюс,
 * штиль нейтрален, сильный ветер — минус. Небольшая поправка на
 * направление — народная примета "западный/юго-западный ветер к
 * стабильной погоде, северо-восточный — к похолоданию", не строгое
 * правило, а лёгкий модификатор.
 */
const DIRECTION_MODIFIER: Record<string, number> = {
  N: -4,
  NE: -10,
  E: -6,
  SE: 2,
  S: 6,
  SW: 10,
  W: 6,
  NW: -2,
};

function baseScoreForSpeed(speedMs: number): { score: number; note: string } {
  if (speedMs < 1) return { score: 60, note: 'windCalm' };
  if (speedMs <= 4) return { score: 100, note: 'windLight' };
  if (speedMs <= 7) return { score: 70, note: 'windModerate' };
  if (speedMs <= 10) return { score: 40, note: 'windStrong' };
  return { score: 15, note: 'windStorm' };
}

export function scoreWind(weather: WeatherResponse, index: number): FactorScore {
  const { score: base, note } = baseScoreForSpeed(weather.hourly.windSpeed[index]);
  const modifier = DIRECTION_MODIFIER[windCompass(weather.hourly.windDirection[index])] ?? 0;
  const score = Math.min(100, Math.max(0, base + modifier));
  return { score, note };
}
