import { LATVIA_BBOX, OVERPASS_URL, OVERPASS_CACHE_TTL_HOURS } from '../lib/config.js';
import { TtlCache } from '../lib/cache.js';
import { readDiskCache, writeDiskCache } from '../lib/diskCache.js';
import type { WaterBody, WaterBodyKind, WaterBodySummary } from '../types.js';

const cache = new TtlCache<WaterBody[]>();
// v2: bumped so the broadened query (ponds/reservoirs/canals — needed for
// Riga's urban water bodies) isn't masked by a stale v1 disk cache entry.
const CACHE_KEY = 'latvia-waterbodies-v2';

const { south, west, north, east } = LATVIA_BBOX;
const BBOX = `${south},${west},${north},${east}`;

// Помимо крупных природных озёр/рек, отдельно включены пруды, водохранилища
// и каналы — без них выпадает почти вся "городская вода": пруды в парках,
// канал в центре Риги, водохранилища и т.п. Оба варианта тегирования (way и
// relation) учтены для water=*, т.к. часть прудов/водохранилищ размечены
// как multipolygon-отношения.
const OVERPASS_QUERY = `
[out:json][timeout:90];
(
  way["natural"="water"]["name"](${BBOX});
  relation["natural"="water"]["name"](${BBOX});
  way["water"="lake"]["name"](${BBOX});
  way["water"="pond"]["name"](${BBOX});
  way["water"="reservoir"]["name"](${BBOX});
  way["water"="lagoon"]["name"](${BBOX});
  relation["water"]["name"](${BBOX});
  way["landuse"="reservoir"]["name"](${BBOX});
  way["landuse"="basin"]["name"](${BBOX});
  way["waterway"="river"]["name"](${BBOX});
  way["waterway"="canal"]["name"](${BBOX});
);
out geom;
`.trim();

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

async function fetchFromOverpass(): Promise<WaterBody[]> {
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Overpass rejects requests with no identifiable User-Agent.
      'User-Agent': 'SVCopeApp/1.0 (fishing conditions app for Latvia)',
    },
    body: `data=${encodeURIComponent(OVERPASS_QUERY)}`,
  });

  if (!res.ok) {
    throw new Error(`Overpass responded with ${res.status}`);
  }

  const json = (await res.json()) as OverpassResponse;
  const seen = new Set<string>();
  const bodies: WaterBody[] = [];

  for (const el of json.elements) {
    const parsed = parseElement(el);
    if (parsed && !seen.has(parsed.id)) {
      seen.add(parsed.id);
      bodies.push(parsed);
    }
  }

  return bodies;
}

export async function getLatviaWaterBodies(): Promise<WaterBody[]> {
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  const onDisk = readDiskCache<WaterBody[]>(CACHE_KEY);
  if (onDisk) {
    cache.set(CACHE_KEY, onDisk, OVERPASS_CACHE_TTL_HOURS);
    return onDisk;
  }

  const bodies = await fetchFromOverpass();
  cache.set(CACHE_KEY, bodies, OVERPASS_CACHE_TTL_HOURS);
  writeDiskCache(CACHE_KEY, bodies, OVERPASS_CACHE_TTL_HOURS);
  return bodies;
}

/** Small payload for the initial map render: no geometry, just pins. */
export async function getLatviaWaterBodySummaries(): Promise<WaterBodySummary[]> {
  const bodies = await getLatviaWaterBodies();
  return bodies.map(({ id, name, kind, center }) => ({ id, name, kind, center }));
}

export async function getWaterBodyById(
  osmType: string,
  osmId: string,
): Promise<WaterBody | null> {
  const bodies = await getLatviaWaterBodies();
  return bodies.find((b) => b.osmType === osmType && String(b.osmId) === osmId) ?? null;
}
