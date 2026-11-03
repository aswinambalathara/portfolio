import { LRUCache } from 'lru-cache'

// In-memory limiter behind an interface, so Redis can replace it later (PRD §8).
export interface RateLimiter {
  // Records a hit and returns false once the key is over its limit.
  hit(key: string): boolean
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new LRUCache<string, number[]>({ max: 5000, ttl: windowMs })

  const limiter: RateLimiter = {
    hit(key) {
      const now = Date.now()
      const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
      const allowed = recent.length < limit
      if (allowed) recent.push(now)
      hits.set(key, recent)
      return allowed
    },
  }
  return limiter
}

// NFR-32: Nginx sets these headers. The first X-Forwarded-For entry is the client.
export function getClientIp(headers: Headers) {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
  )
}
