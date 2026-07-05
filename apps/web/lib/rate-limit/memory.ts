const hits = new Map<string, { count: number; ts: number }>();

export function allowRequest(key: string, max = 30, windowMs = 60_000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || now - current.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}
