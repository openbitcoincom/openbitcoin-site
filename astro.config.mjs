import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://openbitcoin.com',
  adapter: node({ mode: 'standalone' }),
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames(info) {
            const raw = info.name || 'asset';
            const dot = raw.lastIndexOf('.');
            let base = dot > 0 ? raw.slice(0, dot) : raw;
            base = base.replace(/[^a-zA-Z0-9_-]+/g, '') || 'asset';
            return `_astro/${base}.[hash][extname]`;
          },
        },
      },
    },
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/games/mempool-crossing') &&
        !page.includes('/games/last-sat'),
      customPages: ['https://openbitcoin.com/blocks'],
    }),
  ],
});
