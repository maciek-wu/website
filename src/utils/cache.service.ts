type CacheKey = "at" | "rt" | "user" | "introSkipped" | "introPlayed";

export interface CacheItem {
  value: string;
  expire: number | undefined;
}

const cacheService = {
  prefix: "mw-",
  defaultExpire: 30 * 24 * 60 * 60 * 1000,

  get(key: CacheKey): CacheItem | null {
    const data = localStorage.getItem(`${this.prefix}${key}`);

    if (!data) {
      return null;
    }

    const item: CacheItem = JSON.parse(data);

    return this.validate(key, item);
  },

  getData<T>(key: CacheKey): T | null {
    const cached = this.get(key);
    return cached ? (JSON.parse(cached.value) as T) : null;
  },

  set(key: CacheKey, value: any, expire?: number): void {
    const item = {
      value: JSON.stringify(value),
      expire: Date.now() + (expire ?? this.defaultExpire),
    };
    const data = JSON.stringify(item);
    localStorage.setItem(`${this.prefix}${key}`, data);
  },

  del(key: CacheKey): void {
    localStorage.removeItem(`${this.prefix}${key}`);
  },

  validate(key: CacheKey, item: CacheItem): CacheItem | null {
    if (item.expire && item.expire <= Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    return item;
  },
};

export { cacheService };
