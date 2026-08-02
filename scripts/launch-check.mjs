import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const PHRASES = [
  'demo', 'preview build', 'until launch', 'at launch', 'coming soon',
  'sample pair', 'sample data', 'not yet live', 'when the site is live',
  'linked here the day', 'placeholder',
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')      // tags (and their attributes) gone
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase();
}

const hits = [];
for (const file of walk(DIST)) {
  const text = visibleText(readFileSync(file, 'utf8'));
  for (const phrase of PHRASES) {
    const re = new RegExp('\\b' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      const ctx = text.slice(Math.max(0, m.index - 60), m.index + phrase.length + 60).replace(/\s+/g, ' ').trim();
      hits.push({ file: relative(DIST, file), phrase, ctx });
    }
  }
}

if (hits.length) {
  console.error(`LAUNCH CHECK FAILED: ${hits.length} visible draft note(s) remain:\n`);
  for (const h of hits) console.error(` ${h.file}  [${h.phrase}]\n   ...${h.ctx}...\n`);
  process.exit(1);
}
console.log('launch check passed: no visible draft notes in the built site');
