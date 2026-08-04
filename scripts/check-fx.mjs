import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const { FX } = await import(pathToFileURL(resolve(here, '../src/lib/fx.js')).href);
const chrome = readFileSync(resolve(here, '../public/js/chrome.js'), 'utf8');

const m = /var fx=\{([^}]+)\}/.exec(chrome);
if (!m) {
  console.error('check-fx: could not find the fx table in public/js/chrome.js');
  process.exitCode = 1;
} else {
  const mirror = Object.fromEntries(m[1].split(',').map((kv) => {
    const [k, v] = kv.split(':');
    return [k.trim(), Number(v)];
  }));
  const bad = [];
  for (const [k, v] of Object.entries(FX)) if (mirror[k] !== v) bad.push(`${k}: lib ${v} vs chrome ${mirror[k]}`);
  for (const k of Object.keys(mirror)) if (!(k in FX)) bad.push(`${k}: only in chrome.js`);
  if (bad.length) {
    console.error('check-fx: chrome.js fx table has drifted from src/lib/fx.js:');
    for (const b of bad) console.error('  ' + b);
    console.error('check-fx: update both together; fx.js is the source of truth.');
    process.exitCode = 1;
  } else {
    console.log(`check-fx: chrome.js mirror matches src/lib/fx.js (${Object.keys(FX).length} currencies)`);
  }
}
