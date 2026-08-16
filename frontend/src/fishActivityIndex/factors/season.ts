import type { FactorScore } from '../types';

/**
 * Общая сезонная кривая активности для водоёмов Латвии (без привязки к
 * конкретному виду рыбы — это уточняется в модуле species). Весна
 * (нерест/посленерестовый жор) и осень (осенний жор) — пики; глухозимье
 * и разгар лета — спады.
 */
const SEASON_SCORE_BY_MONTH = [
  30, // янв
  35, // фев
  55, // мар
  90, // апр
  90, // май
  80, // июн
  65, // июл
  65, // авг
  95, // сен
  95, // окт
  70, // ноя
  30, // дек
];

export function scoreSeason(date: Date): FactorScore {
  const score = SEASON_SCORE_BY_MONTH[date.getMonth()];
  const note = score >= 85 ? 'seasonPeak' : score >= 60 ? 'seasonGood' : score >= 40 ? 'seasonAverage' : 'seasonLow';
  return { score, note };
}
