export type WaterBodyKind = 'lake' | 'river' | 'water';

export interface WaterBody {
  id: string;
  osmType: 'way' | 'relation';
  osmId: number;
  name: string;
  kind: WaterBodyKind;
  center: [number, number]; // [lat, lon]
  /** One or more line/ring paths, each an array of [lat, lon] points. */
  geometry: [number, number][][];
}

/** Lightweight version for the initial map load — no geometry payload. */
export interface WaterBodySummary {
  id: string;
  name: string;
  kind: WaterBodyKind;
  center: [number, number];
}

export interface WeatherHourly {
  time: string[]; // ISO timestamps, local timezone
  temperature: number[]; // °C
  pressureMsl: number[]; // hPa, sea-level — comparable across elevations
  windSpeed: number[]; // m/s
  windDirection: number[]; // degrees, 0 = N
  cloudCover: number[]; // %
  precipitation: number[]; // mm
}

export interface WeatherCurrent {
  time: string;
  temperature: number;
  pressureMsl: number;
  windSpeed: number;
  windDirection: number;
  cloudCover: number;
  precipitation: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: WeatherCurrent;
  hourly: WeatherHourly;
}
