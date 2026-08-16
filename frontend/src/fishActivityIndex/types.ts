export type ActivityLevel = 'excellent' | 'good' | 'average' | 'poor';

export type FactorKey = 'pressure' | 'moon' | 'timeOfDay' | 'temperature' | 'wind' | 'season';

export interface FactorScore {
  score: number; // 0-100
  note: string; // short machine-readable qualitative state, e.g. 'pressureFalling'
}

export interface FactorResult extends FactorScore {
  key: FactorKey;
  weight: number; // 0-1, from config
  contribution: number; // score * weight
}

export interface FishActivityResult {
  score: number; // 0-100, weighted sum
  level: ActivityLevel;
  factors: FactorResult[];
}
