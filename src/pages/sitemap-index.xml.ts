// The one sitemap URL. Everything hangs off this: the static page sitemaps
// Astro builds, and every 50,000-address slice the explorer has earned. Submit
// https://openbitcoin.com/sitemap-index.xml to Search Console once and new
// files are discovered from here, with nothing to resubmit as the address list
// grows.
//
// Astro's own build writes a sitemap-index.xml naming only its static files.
// scripts/postbuild-sitemap.mjs deletes it so nginx's try_files falls through
// to this route, which names the same static files plus the address ones.
import type { APIRoute } from 'astro';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { PER_FILE } from './sitemap-addresses.xml.ts';

export const prerender = false;

const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
const SITE = 'https://openbitcoin.com';

// Astro splits its static sitemap at 45,000 URLs, so today this is exactly
// sitemap-0.xml. Read the directory rather than assume, so a future split is
// picked up on its own. Paths resolve from cwd because the bundler relocates
// this module (same trap noted in lib/proto.js and Base.astro).
function staticSitemaps(): string[] {
  for (const dir of [
    resolve(process.cwd(), 'client'),
    resolve(process.cwd(), '../client'),
    resolve(process.cwd(), 'dist/client'),
  ]) {
    try {
      const found = readdirSync(dir)
        .filter((f) => /^sitemap-\d+\.xml$/.test(f))
        .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));
      if (found.length) return found;
    } catch { /* try the next candidate */ }
  }
  return ['sitemap-0.xml']; // the one Astro always writes
}

export const GET: APIRoute = async () => {
  let total = 0;
  try {
    const r = await fetch(`${BACKEND}/seo/addresses?limit=1`, { signal: AbortSignal.timeout(8000) });
    if (r.ok) total = (await r.json()).total || 0;
  } catch {
    // a valid index missing the address files beats a 500, which Search
    // Console records as a failed fetch and then backs off from
  }

  const today = new Date().toISOString().slice(0, 10);
  const files = [
    ...staticSitemaps(),
    ...Array.from({ length: Math.max(1, Math.ceil(total / PER_FILE)) },
      (_, i) => `sitemap-addresses-${i}.xml`),
  ];
  const entries = files
    .map((f) => `<sitemap><loc>${SITE}/${f}</loc><lastmod>${today}</lastmod></sitemap>`)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
};
