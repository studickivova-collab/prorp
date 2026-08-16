import { SPECIES } from './data';
import type { ScoredSpecies, SpeciesProfile } from './types';
import type { WeatherResponse } from '../types/weather';
import type { WaterBodyKind } from '../types/waterBody';
import { computePressureTrend } from '../weather/pressure';
import { classifyTimeOfDay } from '../lib/astro';

/**
 * Веса подфакторов пригодности вида под текущие условия. Сезон (месяц)
 * значит больше всего — он определяет, ловится ли вид вообще сейчас;
 * остальное — тонкая настройка внутри сезона.
 *
 * habitat намеренно весит больше остальных "тонких" факторов: тип
 * водоёма (озеро/река/непонятно) — это вопрос "водится ли здесь вообще
 * этот вид", а не "хороший ли сейчас момент". Раньше он весил всего 5%
 * и почти не влиял на итоговый скор, из-за чего, например, карпа (вид
 * стоячей воды) подсовывало и на реках/каналах вроде Саркандаугавы.
 */
const SPECIES_WEIGHTS = {
  month: 0.3,
  temperature: 0.2,
  timeOfDay: 0.15,
  trend: 0.05,
  habitat: 0.3,
};

function circularMonthDistance(month: number, activeMonths: number[]): number {
  let best = 6;
  for (const m of activeMonths) {
    const diff = Math.abs(month - m);
    best = Math.min(best, diff, 12 - diff);
  }
  return best;
}

function scoreMonth(date: Date, profile: SpeciesProfile): number {
  const distance = circularMonthDistance(date.getMonth(), profile.activeMonths);
  if (distance === 0) return 100;
  return Math.max(20, 100 - distance * 22);
}

function scoreTemperature(currentTemp: number, [min, max]: [number, number]): number {
  if (currentTemp >= min && currentTemp <= max) return 100;
  const distance = currentTemp < min ? min - currentTemp : currentTemp - max;
  return Math.max(20, 100 - distance * 8);
}

function scoreTimeOfDay(period: string, preferred: string[]): number {
  return preferred.includes(period) ? 100 : 55;
}

function scoreTrend(trend: string, preferred: string[]): number {
  return preferred.includes(trend) ? 100 : 60;
}

/**
 * Есть ли виду смысл вообще фигурировать на водоёме такого типа.
 *
 * "water" — это OSM-категория "непонятно что" (не распозналось явно ни
 * как стоячая вода, ни как река/канал) — для неё честного ответа нет,
 * так что не фильтруем и даём решить остальным факторам. А вот "lake"
 * и "river" — это уже осмысленная классификация: карпу, линю и карасю
 * (виды стоячей воды) не место в списке видов для реки или канала —
 * их отсекаем полностью, а не просто слегка занижаем скор.
 */
export function isHabitatCompatible(kind: WaterBodyKind, habitat: WaterBodyKind[]): boolean {
  if (kind === 'water') return true;
  return habitat.includes(kind);
}

function scoreHabitat(kind: WaterBodyKind, habitat: WaterBodyKind[]): number {
  return habitat.includes(kind) ? 100 : 60;
}

export function scoreAllSpecies(
  weather: WeatherResponse,
  date: Date,
  lat: number,
  lon: number,
  waterKind: WaterBodyKind,
): ScoredSpecies[] {
  const { trend } = computePressureTrend(weather);
  const period = classifyTimeOfDay(date, lat, lon);

  return SPECIES.filter((profile) => isHabitatCompatible(waterKind, profile.habitat))
    .map((profile) => {
      const score =
        scoreMonth(date, profile) * SPECIES_WEIGHTS.month +
        scoreTemperature(weather.current.temperature, profile.tempRange) * SPECIES_WEIGHTS.temperature +
        scoreTimeOfDay(period, profile.preferredTimeOfDay) * SPECIES_WEIGHTS.timeOfDay +
        scoreTrend(trend, profile.preferredTrends) * SPECIES_WEIGHTS.trend +
        scoreHabitat(waterKind, profile.habitat) * SPECIES_WEIGHTS.habitat;

      return { profile, score: Math.round(score) };
    })
    .sort((a, b) => b.score - a.score);
}

export function getTopSpecies(
  weather: WeatherResponse,
  date: Date,
  lat: number,
  lon: number,
  waterKind: WaterBodyKind,
  count = 3,
): ScoredSpecies[] {
  return scoreAllSpecies(weather, date, lat, lon, waterKind).slice(0, count);
}
