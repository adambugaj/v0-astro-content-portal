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
        return !page.includes('/koszt-budowy-domu-2026') && 
               !page.includes('-2026') &&
               !page.includes('/twoja-domena');
      },
      serialize: (item) => {
        const url = item.url.toLowerCase();
        
        if (url === 'https://domjakosci.pl/' || url === 'https://domjakosci.pl') {
          item.priority = 1.0;
        } else if (url.includes('/koszt-budowy-domu') || url.includes('/budowa-domu-krok')) {
          item.priority = 0.95;
        } else if (url.endsWith('/budowa/') || url.endsWith('/energia/') || url.endsWith('/wnetrza/') || url.endsWith('/ogrod/')) {
          item.priority = 0.9;
        } else if (url.includes('/budowa/') || url.includes('/energia/') || url.includes('/wnetrza/') || url.includes('/ogrod/')) {
          item.priority = 0.8;
        }
        
        return item;
      },
      xmlns: {
        img: 'http://www.google.com/schemas/sitemap-image/1.1'
      }
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  }
});
