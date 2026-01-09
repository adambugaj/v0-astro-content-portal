import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://domjakosci.pl',
  integrations: [
    tailwind(),
    sitemap({
      // Default settings are applied per-item in `serialize` below.
      filter: (page) => {
        return !page.includes('/koszt-budowy-domu-2026') && 
               !page.includes('-2026') &&
               !page.includes('/twoja-domena');
      },
      serialize: (item) => {
        const url = item.url.toLowerCase();
        const siteRoot = 'https://domjakosci.pl/';

        // Default values
        let changefreq = 'monthly';
        let priority = 0.7;
        const categoryRoots = ['/budowa/', '/energia-oze/', '/wnetrza/', '/ogrod/'];

        // Derive pathname parts to distinguish category index / pillar / supporting pages
        const pathname = new URL(item.url).pathname;
        const parts = pathname.split('/').filter(Boolean);

        // Homepage: weekly, highest priority
        if (pathname === '/' || url === siteRoot || url === 'https://domjakosci.pl') {
          changefreq = 'weekly';
          priority = 1.0;
        }

        // Formal single pages (kontakt, o-redakcji, polityka-redakcyjna, wspolpraca)
        else if (pathname === '/kontakt/' || pathname === '/o-redakcji/' || pathname === '/polityka-redakcyjna/' || pathname === '/wspolpraca/') {
          changefreq = 'monthly';
          priority = 0.6;
        }

        // Category root index pages: weekly, pillar-level priority
        else if (categoryRoots.some(r => pathname === r)) {
          changefreq = 'weekly';
          priority = 0.9;
        }

        // Pillar pages (index.astro inside a category subfolder) -> depth 2
        else if (parts.length === 2 && pathname.endsWith('/')) {
          changefreq = 'monthly';
          priority = 0.9;
        }

        // Supporting articles (all deeper subpages under categories) -> depth >=3
        else if (parts.length >= 3) {
          changefreq = 'monthly';
          priority = 0.7;
        }

        return {
          ...item,
          changefreq,
          priority,
          lastmod: item.lastmod || new Date()
        };
      }
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  }
});
