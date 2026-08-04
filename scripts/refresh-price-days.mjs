import { readFileSync, writeFileSync, renameSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/btc-daily.json');
const PUBLIC_COPY = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/btc-daily.json');
const API = process.env.OB_CANDLES_URL || 'https://openbitcoin.com/api/v1/candles?interval=1d&limit=400';

const data = JSON.parse(readFileSync(FILE, 'utf8'));
const last = data.days[data.days.length - 1][0];

let candles = null;
try {
  const r = await fetch(API, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  candles = (await r.json()).candles || [];
} catch (e) {
  console.warn(`refresh-price-days: fetch failed (${e.message}); building with the existing snapshot (last ${last})`);
}

if (candles) {
  const nowSec = Math.floor(Date.now() / 1000);
  const fresh = candles
    .filter((c) => c[0] + 86400 <= nowSec) // completed UTC days only
    .map((c) => [new Date(c[0] * 1000).toISOString().slice(0, 10),
      c[1], c[2], c[3], c[4]])
    .filter((d) => d[0] > last);

  const oldest = candles.length ? new Date(candles[0][0] * 1000).toISOString().slice(0, 10) : null;
  if (oldest && oldest > last) {
    console.error(`refresh-price-days: GAP: snapshot ends ${last} but the fetch window only reaches back to ${oldest}; raise the limit before building`);
    process.exitCode = 1;
  } else if (!fresh.length) {
    console.log(`refresh-price-days: snapshot already current (last ${last})`);
    copyFileSync(FILE, PUBLIC_COPY);
  } else {
    data.days.push(...fresh);
    const today = new Date().toISOString().slice(0, 10);
    data.meta.fetched = today;
    data.meta.last = data.days[data.days.length - 1][0];
    data.meta.source = 'Bitstamp public OHLC API (BTC/USD, UTC days) 2011-08-18 to 2026-07-30; Blockchain.info market-price daily closes (Mt. Gox era, close only) 2010-08 to 2011-08; extended from 2026-07-31 by the site-logged daily series (provenance at /sources)';

    const body = '{"meta":' + JSON.stringify(data.meta) + ',"days":[\n'
      + data.days.map((d) => JSON.stringify(d)).join(',\n') + '\n]}';
    writeFileSync(FILE + '.tmp', body + '\n');
    renameSync(FILE + '.tmp', FILE);
    copyFileSync(FILE, PUBLIC_COPY);
    console.log(`refresh-price-days: appended ${fresh.length} days (${fresh[0][0]} .. ${data.meta.last})`);
  }
}
