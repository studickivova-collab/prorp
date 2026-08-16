interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// Minimal in-memory TTL cache. Good enough to stay under external API
// rate limits for a single backend instance; swap for Redis if you scale
// to multiple instances.
export class TtlCache<T> {
  private store = new Map<string, CacheEntry<T>>();

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlHours: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlHours * 3_600_000 });
  }
}
