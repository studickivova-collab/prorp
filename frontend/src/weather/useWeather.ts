import { useEffect, useState } from 'react';
import { fetchWeather } from '../lib/api';
import type { WeatherResponse } from '../types/weather';

interface State {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(lat: number | null, lon: number | null) {
  const [state, setState] = useState<State>({ weather: null, loading: false, error: null });

  useEffect(() => {
    if (lat === null || lon === null) {
      setState({ weather: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ weather: null, loading: true, error: null });

    fetchWeather(lat, lon)
      .then((weather) => {
        if (!cancelled) setState({ weather, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ weather: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  return state;
}
