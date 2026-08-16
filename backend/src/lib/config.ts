export const PORT = Number(process.env.PORT ?? 4000);

// Bounding box of Latvia: south, west, north, east
export const LATVIA_BBOX = {
  south: 55.61,
  west: 20.97,
  north: 58.09,
  east: 28.24,
} as const;

export const OVERPASS_URL =
  process.env.OVERPASS_URL ?? 'https://overpass-api.de/api/interpreter';

export const OPEN_METEO_URL =
  process.env.OPEN_METEO_URL ?? 'https://api.open-meteo.com/v1/forecast';

export const OVERPASS_CACHE_TTL_HOURS = Number(
  process.env.OVERPASS_CACHE_TTL_HOURS ?? 24,
);

export const WEATHER_CACHE_TTL_HOURS = Number(
  process.env.WEATHER_CACHE_TTL_HOURS ?? 2,
);

export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*';
