import type { PressureTrend } from '../weather/pressure';
import type { TimeOfDayPeriod } from '../lib/astro';
import type { WaterBodyKind } from '../types/waterBody';

export type SpeciesId =
  | 'pike'
  | 'perch'
  | 'zander'
  | 'bream'
  | 'roach'
  | 'carp'
  | 'tench'
  | 'eel'
  | 'catfish'
  | 'burbot'
  | 'asp'
  | 'ide'
  | 'chub'
  | 'crucianCarp'
  | 'rudd'
  | 'silverBream';

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
  /** Повадки и поведение вида: где стоит, как питается, на что реагирует. */
  habits: string;
  baits: string[];
  tackle: string[];
  /** Инструкция по прикормке/привлечению рыбы на точку. */
  groundbait: string[];
  /** Официальные лимиты РБ (мин. размер, разрешённое количество, запрет на нерест) — если применимо. */
  regulation?: string;
  note?: string;
}

export interface ScoredSpecies {
  profile: SpeciesProfile;
  score: number;
}
