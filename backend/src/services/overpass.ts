import { OVERPASS_URL, OVERPASS_CACHE_TTL_HOURS } from '../lib/config.js';
import { TtlCache } from '../lib/cache.js';
import waterBodySummarySnapshot from '../data/latvia-waterbodies-summary.json' with { type: 'json' };
import type { WaterBody, WaterBodyKind, WaterBodySummary } from '../types.js';

// The full "all of Latvia, all geometry" Overpass query this used to run on
// every cold start takes 30-90s (~15MB response) — fine for a long-lived
// local dev server, but far past Netlify Functions' hard execution ceiling
// (~10-26s), so the deployed map load always failed with a 502.
//
// Fix: the summary list (pins on the map — id/name/kind/center, no
// geometry) ships as a static snapshot bundled into the function at build
// time, so it's served instantly with zero Overpass calls. Full geometry
// for a single water body (fetched on marker click) is a small,
// single-element Overpass query instead of a filter over the giant list —
// that stays well within the timeout.
//
// The snapshot can be refreshed periodically by regenerating
// src/data/latvia-waterbodies-summary.json from a fresh Overpass fetch.
const byIdCache = new TtlCache<WaterBody>();

/** Small, single-element query for full geometry on marker click — stays
 * well within Netlify Functions' execution ceiling, unlike the old
 * all-of-Latvia query this replaces. */
function singleElementQuery(osmType: string, osmId: string): string {
  return `
[out:json][timeout:25];
${osmType}(${osmId});
out geom;
`.trim();
}

interface OverpassGeomPoint {
  lat: number;
  lon: number;
}

interface OverpassElement {
  type: 'way' | 'relation' | 'node';
  id: number;
  tags?: Record<string, string>;
  geometry?: OverpassGeomPoint[];
  members?: Array<{
    type: string;
    ref: number;
    role: string;
    geometry?: OverpassGeomPoint[];
  }>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

const STILL_WATER_TAGS = new Set(['lake', 'pond', 'reservoir', 'lagoon']);

function classify(tags: Record<string, string> | undefined): WaterBodyKind {
  if (!tags) return 'water';
  if (tags.waterway === 'river' || tags.waterway === 'canal') return 'river';
  if ((tags.water && STILL_WATER_TAGS.has(tags.water)) || tags.natural === 'water') return 'lake';
  if (tags.landuse === 'reservoir' || tags.landuse === 'basin') return 'lake';
  return 'water';
}

function centroidOf(paths: [number, number][][]): [number, number] {
  let sumLat = 0;
  let sumLon = 0;
  let count = 0;
  for (const path of paths) {
    for (const [lat, lon] of path) {
      sumLat += lat;
      sumLon += lon;
      count += 1;
    }
  }
  if (count === 0) return [0, 0];
  return [sumLat / count, sumLon / count];
}

const COORD_PRECISION = 5; // ~1.1m, plenty for map display
const MAX_POINTS_PER_PATH = 200; // cap payload size for long rivers/shorelines

function round(n: number): number {
  return Math.round(n * 10 ** COORD_PRECISION) / 10 ** COORD_PRECISION;
}

/** Keeps endpoints and evenly-spaced points in between, to bound payload size. */
function simplifyPath(points: OverpassGeomPoint[]): [number, number][] {
  const step = Math.max(1, Math.ceil(points.length / MAX_POINTS_PER_PATH));
  const simplified: [number, number][] = [];
  for (let i = 0; i < points.length; i += step) {
    simplified.push([round(points[i].lat), round(points[i].lon)]);
  }
  const last = points[points.length - 1];
  const lastSimplified = simplified[simplified.length - 1];
  if (
    lastSimplified &&
    (lastSimplified[0] !== round(last.lat) || lastSimplified[1] !== round(last.lon))
  ) {
    simplified.push([round(last.lat), round(last.lon)]);
  }
  return simplified;
}

function parseElement(el: OverpassElement): WaterBody | null {
  if (!el.tags?.name) return null;

  let paths: [number, number][][] = [];

  if (el.type === 'way' && el.geometry?.length) {
    paths = [simplifyPath(el.geometry)];
  } else if (el.type === 'relation' && el.members?.length) {
    paths = el.members
      .filter((m) => m.role === 'outer' && m.geometry?.length)
      .map((m) => simplifyPath(m.geometry!));
  }

  if (paths.length === 0) return null;

  return {
    id: `${el.type}/${el.id}`,
    osmType: el.type as 'way' | 'relation',
    osmId: el.id,
    name: el.tags.name,
    kind: classify(el.tags),
    center: centroidOf(paths),
    geometry: paths,
  };
}

async function fetchSingleElement(osmType: string, osmId: string): Promise<WaterBody | null> {
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Overpass rejects requests with no identifiable User-Agent.
      'User-Agent': 'SVCopeApp/1.0 (fishing conditions app for Latvia)',
    },
    body: `data=${encodeURIComponent(singleElementQuery(osmType, osmId))}`,
  });

  if (!res.ok) {
    throw new Error(`Overpass responded with ${res.status}`);
  }

  const json = (await res.json()) as OverpassResponse;
  for (const el of json.elements) {
    const parsed = parseElement(el);
    if (parsed) return parsed;
  }
  return null;
}

/** Small payload for the initial map render: no geometry, just pins, served
 * instantly from the bundled build-time snapshot — zero Overpass calls. */
export async function getLatviaWaterBodySummaries(): Promise<WaterBodySummary[]> {
  return waterBodySummarySnapshot.items as WaterBodySummary[];
}

export async function getWaterBodyById(
  osmType: string,
  osmId: string,
): Promise<WaterBody | null> {
  const cacheKey = `${osmType}/${osmId}`;
  const cached = byIdCache.get(cacheKey);
  if (cached) return cached;

  if (osmType !== 'way' && osmType !== 'relation') return null;

  const body = await fetchSingleElement(osmType, osmId);
  if (body) byIdCache.set(cacheKey, body, OVERPASS_CACHE_TTL_HOURS);
  return body;
}
