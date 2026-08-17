import type { APIRoute } from 'astro';
import { liveSeries } from '../lib/prices-live.js';

export const prerender = false;

const SITE = 'https://openbitcoin.com';

export const GET: APIRoute = async () => {
  const S = await liveSeries();
  const today = new Date().toISOString().slice(0, 10);
  const thisYear = today.slice(0, 4), thisMonth = today.slice(5, 7);
  const urls: string[] = [];
  for (const y of S.years()) {
    urls.push(`${SITE}/price/${y}`);
    for (const m of S.monthsOf(y)) urls.push(`${SITE}/price/${y}/${m}`);
  }
  const changing = (u: string) =>
    u.endsWith('/price/calendar') || u.endsWith(`/price/${thisYear}`) || u.endsWith(`/price/${thisYear}/${thisMonth}`);
  const entries = urls
    .map((u) => `<url><loc>${u}</loc>${changing(u) ? `<lastmod>${today}</lastmod>` : ''}</url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
};
