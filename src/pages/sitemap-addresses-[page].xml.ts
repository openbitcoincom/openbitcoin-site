// One 50,000-URL slice of the address sitemap. Named by /sitemap-addresses.xml,
// which is the index; that is the only URL that needs submitting.
import type { APIRoute } from 'astro';
import { PER_FILE } from './sitemap-addresses.xml.ts';

export const prerender = false;

const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
const SITE = 'https://openbitcoin.com';

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ params }) => {
  const page = Number(params.page);
  // reject anything that is not a plain page number, so /sitemap-addresses-x.xml
  // 404s instead of quietly serving page zero
  if (!Number.isInteger(page) || page < 0 || String(page) !== params.page) {
    return new Response('Not found', { status: 404 });
  }

  let rows: Array<{ address: string; lastmod: string | null }> = [];
  let total = 0;
  try {
    const r = await fetch(
      `${BACKEND}/seo/addresses?limit=${PER_FILE}&offset=${page * PER_FILE}`,
      { signal: AbortSignal.timeout(10000) },
    );
    if (r.ok) {
      const j = await r.json();
      rows = j.addresses || [];
      total = j.total || 0;
    }
  } catch {
    // an empty but valid file beats a 500
  }

  // a page past the end is a real 404, not an empty file: an index should never
  // name one, and if it does we want that visible in Search Console
  if (page > 0 && page * PER_FILE >= Math.max(total, 1)) {
    return new Response('Not found', { status: 404 });
  }

  const urls = rows
    .map((a) => {
      const loc = `${SITE}/${xmlEscape(a.address)}`;
      const mod = a.lastmod ? `<lastmod>${a.lastmod.slice(0, 10)}</lastmod>` : '';
      return `<url><loc>${loc}</loc>${mod}<changefreq>weekly</changefreq></url>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
};
