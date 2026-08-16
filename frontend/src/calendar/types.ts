import type { ActivityLevel } from '../fishActivityIndex/types';
import type { MoonPhaseKey } from '../lib/astro';

export interface CalendarHour {
  time: string; // ISO
  score: number;
}

export interface CalendarDay {
  dateKey: string; // YYYY-MM-DD, local
  date: Date; // noon local reference, for display formatting
  peak: CalendarHour; // best hour of the day
  level: ActivityLevel;
  moonPhaseKey: MoonPhaseKey;
  isBestDay: boolean;
}
