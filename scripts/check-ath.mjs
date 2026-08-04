import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const days = JSON.parse(readFileSync(resolve(here, '../src/data/btc-daily.json'), 'utf8')).days;
const athSrc = readFileSync(resolve(here, '../src/lib/ath.js'), 'utf8');
const canon = Number(/export const ATH_USD = (\d+)/.exec(athSrc)?.[1]);

if (!canon) {
  console.error('check-ath: could not read ATH_USD from src/lib/ath.js');
  process.exitCode = 1;
} else {
  let peak = { v: 0, d: null };
  for (const d of days) {
    const v = d[2] ?? d[4];
    if (v > peak.v) peak = { v, d: d[0] };
  }
  if (peak.v > canon) {
    console.error(`check-ath: the daily series reached ${peak.v} on ${peak.d}, above the canon ${canon}.`);
    console.error('check-ath: update ATH_USD, ATH_DATE, ATH_TS and ATH_LABEL in site/src/lib/ath.js, then rebuild.');
    process.exitCode = 1;
  } else {
    console.log(`check-ath: canon ${canon} still stands (series peak ${peak.v} on ${peak.d})`);
  }
}
