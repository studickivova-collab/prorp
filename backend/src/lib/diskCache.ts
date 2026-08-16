import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

// On Netlify (AWS Lambda under the hood) the deployed function bundle is
// read-only — only os.tmpdir() ("/tmp") is writable, and even that isn't
// guaranteed to persist between invocations (only within a warm container).
// Locally, keep using a real project-relative folder as before.
//
// import.meta.url is only resolved in the local (non-serverless) branch:
// esbuild's CJS bundling for Netlify Functions leaves import.meta.url
// undefined, and calling fileURLToPath(undefined) throws at module-load
// time, crashing the function before it can even handle a request.
const isServerless = Boolean(process.env.LAMBDA_TASK_ROOT || process.env.NETLIFY);
const CACHE_DIR = isServerless
  ? join(tmpdir(), 'sv-cope-cache')
  : join(dirname(fileURLToPath(import.meta.url)), '..', '..', '.cache');

interface DiskEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Persists a cache entry to disk so it survives dev-server restarts
 * (tsx watch restarts the whole process on every save, which would
 * otherwise wipe the in-memory Overpass cache and re-trigger a ~30MB
 * fetch — enough repeats of that and the public Overpass instance
 * rate-limits us with 429s).
 */
export function readDiskCache<T>(key: string): T | null {
  const file = join(CACHE_DIR, `${key}.json`);
  if (!existsSync(file)) return null;

  try {
    const entry = JSON.parse(readFileSync(file, 'utf8')) as DiskEntry<T>;
    if (Date.now() > entry.expiresAt) return null;
    return entry.value;
  } catch {
    return null;
  }
}

export function writeDiskCache<T>(key: string, value: T, ttlHours: number): void {
  mkdirSync(CACHE_DIR, { recursive: true });
  const file = join(CACHE_DIR, `${key}.json`);
  const entry: DiskEntry<T> = { value, expiresAt: Date.now() + ttlHours * 3_600_000 };
  writeFileSync(file, JSON.stringify(entry));
}
