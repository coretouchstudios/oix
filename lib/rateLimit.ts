const map = new Map<string, { count: number; time: number }>();

export function rateLimit(key: string, limit = 10, windowMs = 60000) {
  const now = Date.now();

  const entry = map.get(key);

  if (!entry) {
    map.set(key, { count: 1, time: now });
    return true;
  }

  if (now - entry.time > windowMs) {
    map.set(key, { count: 1, time: now });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}