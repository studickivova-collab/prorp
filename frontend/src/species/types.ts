import type { PressureTrend } from '../weather/pressure';
import type { TimeOfDayPeriod } from '../lib/astro';
import type { WaterBodyKind } from '../types/waterBody';

export type SpeciesId = 'pike' | 'perch' | 'zander' | 'bream' | 'roach' | 'carp' | 'tench' | 'eel';

export interface SpeciesProfile {
  id: SpeciesId;
  /** Real photo of the species (Wikimedia Commons), used instead of an emoji. */
  image: string;
  /** Months (0=Jan..11=Dec) when the species is actively feeding/catchable. */
  activeMonths: number[];
  preferredTrends: PressureTrend[];
  preferredTimeOfDay: TimeOfDayPeriod[];
  /** Comfortable air-temperature proxy for water temperature, °C. */
  tempRange: [number, number];
  habitat: WaterBodyKind[];
}

export interface SpeciesText {
  name: string;
  season: string;
  baits: string[];
  tackle: string[];
  note?: string;
}

export interface ScoredSpecies {
  profile: SpeciesProfile;
  score: number;
}
