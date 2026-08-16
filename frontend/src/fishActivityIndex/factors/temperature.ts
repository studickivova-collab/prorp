import type { WeatherResponse } from '../../types/weather';
import type { FactorScore } from '../types';

/**
 * Резкие перепады температуры воздуха (а с ним и воды) за последние сутки
 * сбивают рыбу с ритма кормления. Стабильная температура — плюс.
 */
export function scoreTemperature(weather: WeatherResponse, index: number): FactorScore {
  const pastIndex = Math.max(0, index - 24);
  const delta24h = weather.hourly.temperature[index] - weather.hourly.temperature[pastIndex];
  const abs = Math.abs(delta24h);

  const score = Math.max(15, Math.round(100 - abs * 8));
  const note = abs < 2 ? 'tempStable' : abs < 5 ? 'tempModerate' : 'tempVolatile';

  return { score, note };
}
