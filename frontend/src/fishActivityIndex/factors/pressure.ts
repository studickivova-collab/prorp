import type { WeatherResponse } from '../../types/weather';
import { pressureTrendAtIndex, type PressureTrend } from '../../weather/pressure';
import type { FactorScore } from '../types';

/**
 * Самый важный фактор. По опыту рыболовов: клёв активнее всего перед
 * приходом циклона (давление медленно падает), стабильное давление —
 * тоже хорошо. Резкий скачок вверх после прохождения фронта — худший
 * случай, рыба становится пассивной.
 */
const SCORE_BY_TREND: Record<PressureTrend, number> = {
  falling: 90,
  stable: 75,
  falling_fast: 55,
  rising: 55,
  rising_fast: 25,
};

export function scorePressure(weather: WeatherResponse, index: number): FactorScore {
  const { trend } = pressureTrendAtIndex(weather, index);
  return { score: SCORE_BY_TREND[trend], note: trend };
}
