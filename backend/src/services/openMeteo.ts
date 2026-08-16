import { OPEN_METEO_URL, WEATHER_CACHE_TTL_HOURS } from '../lib/config.js';
import { TtlCache } from '../lib/cache.js';
import type { WeatherResponse } from '../types.js';

const cache = new TtlCache<WeatherResponse>();

// Round to ~1.1km so nearby water bodies share one cached forecast instead
// of each triggering its own Open-Meteo request.
const COORD_CACHE_PRECISION = 2;

function roundCoord(n: number): number {
  return Math.round(n * 10 ** COORD_CACHE_PRECISION) / 10 ** COORD_CACHE_PRECISION;
}

interface OpenMeteoApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    cloud_cover: number;
    precipitation: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    pressure_msl: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    cloud_cover: number[];
    precipitation: number[];
  };
}

const CURRENT_VARS = [
  'temperature_2m',
  'pressure_msl',
  'wind_speed_10m',
  'wind_direction_10m',
  'cloud_cover',
  'precipitation',
].join(',');

const HOURLY_VARS = CURRENT_VARS;

async function fetchFromOpenMeteo(lat: number, lon: number): Promise<WeatherResponse> {
  const url = new URL(OPEN_METEO_URL);
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('current', CURRENT_VARS);
  url.searchParams.set('hourly', HOURLY_VARS);
  url.searchParams.set('past_days', '3');
  url.searchParams.set('forecast_days', '8');
  url.searchParams.set('wind_speed_unit', 'ms');
  url.searchParams.set('timezone', 'Europe/Riga');

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Open-Meteo responded with ${res.status}`);
  }

  const json = (await res.json()) as OpenMeteoApiResponse;

  return {
    latitude: json.latitude,
    longitude: json.longitude,
    timezone: json.timezone,
    current: {
      time: json.current.time,
      temperature: json.current.temperature_2m,
      pressureMsl: json.current.pressure_msl,
      windSpeed: json.current.wind_speed_10m,
      windDirection: json.current.wind_direction_10m,
      cloudCover: json.current.cloud_cover,
      precipitation: json.current.precipitation,
    },
    hourly: {
      time: json.hourly.time,
      temperature: json.hourly.temperature_2m,
      pressureMsl: json.hourly.pressure_msl,
      windSpeed: json.hourly.wind_speed_10m,
      windDirection: json.hourly.wind_direction_10m,
      cloudCover: json.hourly.cloud_cover,
      precipitation: json.hourly.precipitation,
    },
  };
}

export async function getWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const key = `${roundCoord(lat)},${roundCoord(lon)}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const weather = await fetchFromOpenMeteo(lat, lon);
  cache.set(key, weather, WEATHER_CACHE_TTL_HOURS);
  return weather;
}
