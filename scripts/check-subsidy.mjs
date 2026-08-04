import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const S = await import(pathToFileURL(resolve(here, '../src/lib/subsidy.js')).href);

const expected = S.subsidyAt(S.NEXT_HALVING_HEIGHT - 1);
if (expected !== S.SUBSIDY_BTC) {
  console.error(`check-subsidy: SUBSIDY_BTC ${S.SUBSIDY_BTC} disagrees with subsidyAt(${S.NEXT_HALVING_HEIGHT - 1}) = ${expected}`);
  process.exitCode = 1;
}
if (S.NEXT_HALVING_HEIGHT % S.EPOCH !== 0) {
  console.error(`check-subsidy: NEXT_HALVING_HEIGHT ${S.NEXT_HALVING_HEIGHT} is not an epoch boundary`);
  process.exitCode = 1;
}

try {
  const r = await fetch('https://openbitcoin.com/api/v1/summary', { signal: AbortSignal.timeout(8000) });
  const h = r.ok ? (await r.json()).height : null;
  if (typeof h === 'number') {
    if (h >= S.NEXT_HALVING_HEIGHT) {
      console.error(`check-subsidy: the halving has happened (height ${h} >= ${S.NEXT_HALVING_HEIGHT}).`);
      console.error('check-subsidy: update SUBSIDY_BTC and NEXT_HALVING_HEIGHT in src/lib/subsidy.js and walk its prose checklist.');
      process.exitCode = 1;
    } else if (h >= S.NEXT_HALVING_HEIGHT - 4032) {
      console.warn(`check-subsidy: HEADS UP: the halving is ~${S.NEXT_HALVING_HEIGHT - h} blocks away; prepare the subsidy.js update and prose checklist.`);
    } else {
      console.log(`check-subsidy: canon consistent, halving in ${(S.NEXT_HALVING_HEIGHT - h).toLocaleString('en-US')} blocks`);
    }
  } else {
    console.warn('check-subsidy: could not read the live height; static checks passed');
  }
} catch {
  console.warn('check-subsidy: height fetch failed; static checks passed');
}
