// The address sitemap. This URL is a sitemap INDEX, not a list of pages: it
// names one child file per 50,000 addresses, so the set can grow without
// anything needing to be resubmitted to Search Console. Submit this one URL
// and the children are discovered from it.
//
// The protocol caps a sitemap at 50,000 URLs and 50MB uncompressed. At roughly
// 90 bytes per entry the count is what binds first, so that is the split.
//
// What is NOT here: every address that has ever transacted. That is roughly
// 1.3 billion, which this scheme could technically address across 26,000
// children, but which no young domain has the crawl budget to absorb, and
// which would be mostly near-identical "one transaction, empty" pages. Google
// does not penalise a large sitemap of genuine pages, but it does spend crawl
// budget on them instead of the guides and tools, and volume of thin
// near-duplicates is a real site-quality signal. The list is curated
// notability plus organic demand. See server/seed-seo-addresses.py.
import type { APIRoute } from 'astro';

export const prerender = false;

// server-side, so the loopback data service directly: config.js's DATA_API is
// the browser's relative path and cannot be fetched from Node
const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
const SITE = 'https://openbitcoin.com';
export const PER_FILE = 50000;

export const GET: APIRoute = async () => {
  let total = 0;
  try {
    const r = await fetch(`${BACKEND}/seo/addresses?limit=1`, { signal: AbortSignal.timeout(8000) });
    if (r.ok) total = (await r.json()).total || 0;
  } catch {
    // fall through: an index naming one empty child beats a 500, which Search
    // Console records as a failed fetch and then backs off from
  }

  const files = Math.max(1, Math.ceil(total / PER_FILE));
  const today = new Date().toISOString().slice(0, 10);
  const entries = Array.from({ length: files }, (_, i) =>
    `<sitemap><loc>${SITE}/sitemap-addresses-${i}.xml</loc><lastmod>${today}</lastmod></sitemap>`,
  ).join('');

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
