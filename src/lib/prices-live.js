import { makeSeries, LAST_BAKED } from './prices.js';

const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
let cache = { at: 0, ttl: 0, series: null };

export async function liveSeries() {
  if (cache.series && Date.now() - cache.at < cache.ttl) return cache.series;
  let tail = [];
  let ok = false;
  try {
    const r = await fetch(`${BACKEND}/candles?interval=1d&limit=400`, { signal: AbortSignal.timeout(4000) });
    if (r.ok) {
      const nowSec = Math.floor(Date.now() / 1000);
      tail = ((await r.json()).candles || [])
        .filter((c) => c[0] + 86400 <= nowSec)
        .map((c) => [new Date(c[0] * 1000).toISOString().slice(0, 10), c[1], c[2], c[3], c[4]])
        .filter((d) => d[0] > LAST_BAKED);
      ok = true;
    }
  } catch { /* baked-only fallback below */ }
  const series = makeSeries(tail);
  cache = { at: Date.now(), ttl: ok ? 600_000 : 60_000, series };
  return series;
}
