import { useMemo } from 'react';
import { getTopSpecies } from './scoreSpecies';
import type { WeatherResponse } from '../types/weather';
import type { WaterBodyKind } from '../types/waterBody';
import type { ScoredSpecies } from './types';

export function useTopSpecies(
  weather: WeatherResponse | null,
  lat: number,
  lon: number,
  waterKind: WaterBodyKind,
  count = 3,
): ScoredSpecies[] {
  return useMemo(() => {
    if (!weather) return [];
    return getTopSpecies(weather, new Date(), lat, lon, waterKind, count);
  }, [weather, lat, lon, waterKind, count]);
}
