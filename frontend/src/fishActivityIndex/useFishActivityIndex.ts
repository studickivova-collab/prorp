import { useMemo } from 'react';
import { computeFishActivityIndex } from './computeIndex';
import type { WeatherResponse } from '../types/weather';
import type { FishActivityResult } from './types';

export function useFishActivityIndex(
  weather: WeatherResponse | null,
  lat: number,
  lon: number,
): FishActivityResult | null {
  return useMemo(() => {
    if (!weather) return null;
    return computeFishActivityIndex(weather, lat, lon);
  }, [weather, lat, lon]);
}
