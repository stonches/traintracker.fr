// Client-side caching utilities for Train Tracker France

export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items to cache
  prefix?: string; // Cache key prefix
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class MemoryCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = {
      maxSize: 100,
      prefix: 'tt_',
      ...config,
    };
  }

  set(key: string, data: T, customTtl?: number): void {
    const fullKey = `${this.config.prefix}${key}`;
    const ttl = customTtl || this.config.ttl;
    
    // Remove oldest items if cache is full
    if (this.config.maxSize && this.cache.size >= this.config.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(fullKey, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): T | null {
    const fullKey = `${this.config.prefix}${key}`;
    const item = this.cache.get(fullKey);

    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(fullKey);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    const fullKey = `${this.config.prefix}${key}`;
    return this.cache.delete(fullKey);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired items
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }
}

export class LocalStorageCache<T> {
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = {
      prefix: 'tt_ls_',
      ...config,
    };
  }

  set(key: string, data: T, customTtl?: number): void {
    if (typeof window === 'undefined') return;

    const fullKey = `${this.config.prefix}${key}`;
    const ttl = customTtl || this.config.ttl;

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    try {
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error);
      // Clear old items and try again
      this.cleanup();
      try {
        localStorage.setItem(fullKey, JSON.stringify(item));
      } catch (retryError) {
        console.error('Failed to set localStorage cache after cleanup:', retryError);
      }
    }
  }

  get(key: string): T | null {
    if (typeof window === 'undefined') return null;

    const fullKey = `${this.config.prefix}${key}`;
    
    try {
      const itemStr = localStorage.getItem(fullKey);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);

      // Check if item has expired
      if (Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem(fullKey);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error);
      localStorage.removeItem(fullKey);
      return null;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    if (typeof window === 'undefined') return false;

    const fullKey = `${this.config.prefix}${key}`;
    try {
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.warn('Failed to delete localStorage cache:', error);
      return false;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.config.prefix!)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Clean up expired items
  cleanup(): number {
    if (typeof window === 'undefined') return 0;

    const now = Date.now();
    let cleaned = 0;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.config.prefix!)) {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item: CacheItem<T> = JSON.parse(itemStr);
            if (now - item.timestamp > item.ttl) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          // Remove invalid items
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      cleaned++;
    });

    return cleaned;
  }
}

// Cache instances for different data types
export const stationCache = new MemoryCache({
  ttl: 24 * 60 * 60 * 1000, // 24 hours
  maxSize: 1000,
  prefix: 'stations_',
});

export const departureCache = new MemoryCache({
  ttl: 30 * 1000, // 30 seconds
  maxSize: 100,
  prefix: 'departures_',
});

export const disruptionCache = new MemoryCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 200,
  prefix: 'disruptions_',
});

export const searchCache = new LocalStorageCache({
  ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  prefix: 'searches_',
});

export const preferencesCache = new LocalStorageCache({
  ttl: 365 * 24 * 60 * 60 * 1000, // 1 year
  prefix: 'prefs_',
});

// Cache management utilities
export function clearAllCaches(): void {
  stationCache.clear();
  departureCache.clear();
  disruptionCache.clear();
  searchCache.clear();
}

export function cleanupExpiredCaches(): void {
  stationCache.cleanup();
  departureCache.cleanup();
  disruptionCache.cleanup();
  searchCache.cleanup();
  preferencesCache.cleanup();
}

// Auto-cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredCaches, 5 * 60 * 1000);
}

// Performance monitoring
export function getCacheStats() {
  return {
    stations: stationCache.size(),
    departures: departureCache.size(),
    disruptions: disruptionCache.size(),
    memory: {
      used: performance.memory?.usedJSHeapSize || 0,
      total: performance.memory?.totalJSHeapSize || 0,
    },
  };
}

// Cache warming for critical data
export async function warmCache() {
  // Pre-load popular stations and their data
  const popularStations = [
    'stop_area:OCE:SA:87686006', // Gare du Nord
    'stop_area:OCE:SA:87686077', // Gare de Lyon
    'stop_area:OCE:SA:87391003', // Montparnasse
  ];

  // This would be implemented with actual API calls
  console.log('Warming cache for popular stations:', popularStations);
}