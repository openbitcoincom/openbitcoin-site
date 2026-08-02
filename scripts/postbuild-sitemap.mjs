import { existsSync, unlinkSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const client = resolve(process.cwd(), 'dist/client');
const index = resolve(client, 'sitemap-index.xml');

if (!existsSync(client)) {
  console.error('postbuild-sitemap: dist/client not found; did the build run?');
  process.exit(1);
}

const staticFiles = readdirSync(client).filter((f) => /^sitemap-\d+\.xml$/.test(f));
if (!staticFiles.length) {
  console.error('postbuild-sitemap: no sitemap-N.xml in dist/client; the sitemap integration did not run');
  process.exit(1);
}

if (existsSync(index)) {
  unlinkSync(index);
  console.log(`postbuild-sitemap: removed the static sitemap-index.xml so the live route serves it (${staticFiles.join(', ')} kept)`);
} else {
  console.log('postbuild-sitemap: no static sitemap-index.xml to remove');
}
