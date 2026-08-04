import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/news.json');
const API = process.env.OB_NEWS_URL || 'https://openbitcoin.com/api/v1/news';

const data = JSON.parse(readFileSync(FILE, 'utf8'));

let items = null;
try {
  const r = await fetch(API, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  items = (await r.json()).items || null;
} catch (e) {
  console.warn(`refresh-news: fetch failed (${e.message}); building with the committed seed (newest ${data.items[0]?.date})`);
}

if (items && items.length) {
  const fresh = items.slice(0, data.items.length).map((i) => ({
    title: i.title, url: i.url, outlet: i.outlet, date: String(i.date).slice(0, 10),
  }));
  if (fresh.every((i) => i.title && i.url && i.outlet && /^\d{4}-\d{2}-\d{2}$/.test(i.date))) {
    writeFileSync(FILE + '.tmp', JSON.stringify({ note: data.note, items: fresh }, null, 2) + '\n');
    renameSync(FILE + '.tmp', FILE);
    console.log(`refresh-news: seed refreshed, newest ${fresh[0].date}`);
  } else {
    console.warn('refresh-news: live feed items malformed; keeping the committed seed');
  }
}
