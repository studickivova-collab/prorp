import type { WaterBody, WaterBodySummary } from '../types/waterBody';
import type { WeatherResponse } from '../types/weather';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new ApiError('Нет соединения с сервером. Проверьте интернет и попробуйте снова.');
  }

  if (!res.ok) {
    let message = `Сервер вернул ошибку (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // ignore — keep default message
    }
    throw new ApiError(message);
  }

  return res.json() as Promise<T>;
}

export function fetchWaterBodySummaries(): Promise<{ count: number; items: WaterBodySummary[] }> {
  return request('/waterbodies');
}

export function fetchWaterBodyDetail(id: string): Promise<WaterBody> {
  return request(`/waterbodies/${id}`);
}

export function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  return request(`/weather?lat=${lat}&lon=${lon}`);
}
