import { getMoonInfo } from '../../lib/astro';
import type { FactorScore } from '../types';

/**
 * Солунарная теория: активность рыбы выше в полнолуние/новолуние и в
 * переходные периоды к ним, ниже — в фазы четвертей. Упрощённая версия:
 * учитываем только фазу луны на дату, без точного времени восхода/захода
 * луны (это уместнее для календаря клёва, см. модуль calendar).
 */
export function scoreMoon(date: Date): FactorScore {
  const { phase } = getMoonInfo(date);
  const distanceToPeak = Math.min(Math.abs(phase - 0), Math.abs(phase - 0.5), Math.abs(phase - 1));
  const normalized = Math.min(distanceToPeak / 0.25, 1); // 0 = full/new moon, 1 = quarter moon
  const score = Math.round(100 - normalized * 60);

  const note = normalized <= 0.25 ? 'moonPeak' : normalized >= 0.85 ? 'moonQuarter' : 'moonTransition';

  return { score, note };
}
