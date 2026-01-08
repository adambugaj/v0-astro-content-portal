import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://domjakosci.pl',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        // Exclude old duplicate URL with 2026
        return !page.includes('/koszt-budowy-domu-2026');
      },
      serialize: (item) => {
        // Set priority based on page type
        if (item.url.includes('/')) {
          if (item.url === 'https://domjakosci.pl/') {
            item.priority = 1.0; // Homepage
          } else if (item.url.includes('/budowa/') || item.url.includes('/energia/') || item.url.includes('/wnetrza/') || item.url.includes('/ogrod/')) {
            if (item.url.endsWith('/budowa') || item.url.endsWith('/energia') || item.url.endsWith('/wnetrza') || item.url.endsWith('/ogrod')) {
              item.priority = 0.9; // Pillar pages
            } else if (item.url.includes('/koszt-budowy-domu')) {
              item.priority = 0.95; // Main calculator page
            } else {
              item.priority = 0.8; // Supporting pages
            }
          } else {
            item.priority = 0.7; // Other pages
          }
        }
        return item;
      }
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  }
});
