import type { MoonPhaseKey } from '../lib/astro';

export const MOON_EMOJI: Record<MoonPhaseKey, string> = {
  new: '🌑',
  waxingCrescent: '🌒',
  firstQuarter: '🌓',
  waxingGibbous: '🌔',
  full: '🌕',
  waningGibbous: '🌖',
  lastQuarter: '🌗',
  waningCrescent: '🌘',
};
