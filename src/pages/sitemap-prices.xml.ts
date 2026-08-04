// The price calendar cluster renders server-side (it extends the baked daily
// series with the live tail), so its pages are absent from Astro's static
// sitemaps. This live sitemap owns them: /price/calendar, every /price/{year},
// and every /price/{year}/{month} the merged series actually has, so a new
// month is discoverable the day it begins. Named by /sitemap-index.xml.
import type { APIRoute } from 'astro';
import { liveSeries } from '../lib/prices-live.js';

export const prerender = false;

const SITE = 'https://openbitcoin.com';

export const GET: APIRoute = async () => {
  const S = await liveSeries();
  const today = new Date().toISOString().slice(0, 10);
  const thisYear = today.slice(0, 4), thisMonth = today.slice(5, 7);
  // /price/calendar itself is a fixed-path route the static sitemap already
  // names; listing it here again would give one page two sitemap homes
  const urls: string[] = [];
  for (const y of S.years()) {
    urls.push(`${SITE}/price/${y}`);
    for (const m of S.monthsOf(y)) urls.push(`${SITE}/price/${y}/${m}`);
  }
  // current-period pages change daily and carry lastmod; historical ones are
  // settled and go without, so crawlers spend their budget on the live edge
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
