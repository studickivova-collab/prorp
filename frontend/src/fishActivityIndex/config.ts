import type { FactorKey } from './types';

/**
 * Веса факторов индекса активности рыбы. Сумма должна быть равна 1.
 * Это единственное место, которое нужно менять при калибровке индекса
 * по реальным данным дневника уловов.
 */
export const FISH_ACTIVITY_WEIGHTS: Record<FactorKey, number> = {
  pressure: 0.35,
  moon: 0.15,
  timeOfDay: 0.15,
  temperature: 0.15,
  wind: 0.12,
  season: 0.08,
};

export const ACTIVITY_LEVEL_THRESHOLDS = {
  excellent: 75,
  good: 55,
  average: 35,
} as const;
