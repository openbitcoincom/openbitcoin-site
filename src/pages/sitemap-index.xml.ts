import type { APIRoute } from 'astro';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { PER_FILE } from './sitemap-addresses-[page].xml.ts';

export const prerender = false;

const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
const SITE = 'https://openbitcoin.com';

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
  }

  const today = new Date().toISOString().slice(0, 10);
  const files = [
    ...staticSitemaps(),
    'sitemap-prices.xml', // the SSR price-calendar cluster (live route)
    'sitemap-pools.xml',  // /pools + every mining-pool page (live route)
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
