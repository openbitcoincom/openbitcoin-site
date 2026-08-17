import type { APIRoute } from 'astro';

export const prerender = false;

const BACKEND = process.env.OB_BACKEND || 'http://127.0.0.1:8090/v1';
const SITE = 'https://openbitcoin.com';

export const GET: APIRoute = async () => {
  let slugs: string[] = [];
  try {
    const r = await fetch(`${BACKEND}/pools`, { signal: AbortSignal.timeout(8000) });
    if (r.ok) slugs = ((await r.json()).pools || []).map((p: { slug: string }) => p.slug);
  } catch { /* an index page alone beats a 500 Search Console backs off from */ }

  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/pools', ...slugs.map((s) => `/pools/${s}`)]
    .map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
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
