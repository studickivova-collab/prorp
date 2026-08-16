export interface WeatherHourly {
  time: string[];
  temperature: number[];
  pressureMsl: number[];
  windSpeed: number[];
  windDirection: number[];
  cloudCover: number[];
  precipitation: number[];
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
