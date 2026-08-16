import type { WaterBody } from '../types/waterBody';

export type EchoZoneType = 'ambushPoint' | 'cove' | 'openWater' | 'riverBend' | 'riverLane';

export interface EchoZone {
  id: string;
  type: EchoZoneType;
  center: [number, number]; // [lat, lon]
}

type Point = [number, number]; // [lat, lon]

/** Euclidean distance treating [lat, lon] as flat Cartesian — fine at the
 * scale of a single lake/river and for a rough heuristic, not for anything
 * that needs real geodesic accuracy. */
function dist(a: Point, b: Point): number {
  const dLat = a[0] - b[0];
  const dLon = a[1] - b[1];
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

/** Signed "sharpness" of the turn at `curr`, normalized to roughly [-1, 1]
 * (an approximation of sin of the turning angle) so long and short edges
 * are compared fairly. Sign depends on turn direction (left vs right). */
function turnSharpness(prev: Point, curr: Point, next: Point): number {
  const v1: Point = [curr[0] - prev[0], curr[1] - prev[1]];
  const v2: Point = [next[0] - curr[0], next[1] - curr[1]];
  const len1 = Math.hypot(v1[0], v1[1]);
  const len2 = Math.hypot(v2[0], v2[1]);
  if (len1 < 1e-9 || len2 < 1e-9) return 0;
  const cross = v1[0] * v2[1] - v1[1] * v2[0];
  return cross / (len1 * len2);
}

function signedArea(ring: Point[]): number {
  let sum = 0;
  for (let i = 0; i < ring.length; i++) {
    const [lat1, lon1] = ring[i];
    const [lat2, lon2] = ring[(i + 1) % ring.length];
    sum += lon1 * lat2 - lon2 * lat1;
  }
  return sum / 2;
}

/** Greedily picks up to `max` candidates from a sharpness-sorted list,
 * skipping any that fall within `minSeparation` of an already-picked point
 * so the zones don't all cluster on the same jagged bit of shoreline. */
function pickSpread(
  candidates: { point: Point; score: number }[],
  max: number,
  minSeparation: number,
): Point[] {
  const sorted = [...candidates].sort((a, b) => b.score - a.score);
  const picked: Point[] = [];
  for (const c of sorted) {
    if (picked.length >= max) break;
    if (picked.some((p) => dist(p, c.point) < minSeparation)) continue;
    picked.push(c.point);
  }
  return picked;
}

function boundingDiagonal(points: Point[]): number {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLon = Infinity;
  let maxLon = -Infinity;
  for (const [lat, lon] of points) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
  }
  return Math.hypot(maxLat - minLat, maxLon - minLon);
}

function lakeZones(ring: Point[], center: Point): EchoZone[] {
  const zones: EchoZone[] = [{ id: 'open', type: 'openWater', center }];
  if (ring.length < 6) return zones;

  const orientation = Math.sign(signedArea(ring)) || 1;
  const n = ring.length;
  const separation = boundingDiagonal(ring) * 0.12;

  const convex: { point: Point; score: number }[] = [];
  const concave: { point: Point; score: number }[] = [];

  for (let i = 0; i < n; i++) {
    const prev = ring[(i - 1 + n) % n];
    const curr = ring[i];
    const next = ring[(i + 1) % n];
    const sharpness = turnSharpness(prev, curr, next);
    const isConvex = Math.sign(sharpness) === orientation;
    const entry = { point: curr, score: Math.abs(sharpness) };
    if (isConvex) convex.push(entry);
    else concave.push(entry);
  }

  const capes = pickSpread(convex, 3, separation);
  const coves = pickSpread(concave, 3, separation);

  capes.forEach((point, i) => zones.push({ id: `cape-${i}`, type: 'ambushPoint', center: point }));
  coves.forEach((point, i) => zones.push({ id: `cove-${i}`, type: 'cove', center: point }));

  return zones;
}

function riverZones(path: Point[]): EchoZone[] {
  const n = path.length;
  if (n < 3) return [];

  const separation = boundingDiagonal(path) * 0.15;
  const bends: { point: Point; score: number }[] = [];
  for (let i = 1; i < n - 1; i++) {
    const sharpness = turnSharpness(path[i - 1], path[i], path[i + 1]);
    bends.push({ point: path[i], score: Math.abs(sharpness) });
  }

  const picked = pickSpread(bends, 3, separation);
  const zones: EchoZone[] = picked.map((point, i) => ({ id: `bend-${i}`, type: 'riverBend', center: point }));

  // Always add one generic "current lane" zone at the midpoint of the run,
  // so a very straight stretch still gets a suggested spot to try.
  const mid = path[Math.floor(n / 2)];
  zones.push({ id: 'lane', type: 'riverLane', center: mid });

  return zones;
}

/**
 * Approximate, heuristic "where to try" zones derived purely from the
 * water body's shoreline/course shape (points = likely ambush spots for
 * predators, coves = calmer water peaceful fish favour, bends = deeper
 * pools on a river). There is no real bathymetry (depth) data behind this
 * for the ~10,000 water bodies in the app — it's a shape-based guess, not
 * a sonar reading, and is presented to the user as such.
 */
export function computeEchoZones(waterBody: WaterBody): EchoZone[] {
  const paths = waterBody.geometry;
  if (!paths || paths.length === 0) return [{ id: 'open', type: 'openWater', center: waterBody.center }];

  if (waterBody.kind === 'river') {
    const zones = riverZones(paths[0]);
    return zones.length > 0 ? zones : [{ id: 'open', type: 'openWater', center: waterBody.center }];
  }

  // Lake / generic "water": use the largest ring as the shoreline.
  const ring = paths.reduce((a, b) => (a.length >= b.length ? a : b));
  return lakeZones(ring, waterBody.center);
}
