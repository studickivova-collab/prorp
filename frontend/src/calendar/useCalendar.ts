import { useMemo } from 'react';
import { computeCalendar } from './computeCalendar';
import type { WeatherResponse } from '../types/weather';
import type { CalendarDay } from './types';

export function useCalendar(weather: WeatherResponse | null, lat: number, lon: number, daysAhead = 7): CalendarDay[] {
  return useMemo(() => {
    if (!weather) return [];
    return computeCalendar(weather, lat, lon, daysAhead);
  }, [weather, lat, lon, daysAhead]);
}
