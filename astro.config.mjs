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

        // Homepage: weekly, highest priority
        if (url === siteRoot || url === 'https://domjakosci.pl') {
          changefreq = 'weekly';
          priority = 1.0;
        }

        // Category index pages: weekly
        else if (categoryRoots.some(r => url.endsWith(r))) {
          changefreq = 'weekly';
          priority = 0.9;
        }

        // Specific supporting pages with custom priority (user request)
        else if (url.includes('/koszt-100m2/') || url.includes('/koszt-fundamentow/') || url.includes('/murowany-vs-szkielet/')) {
          changefreq = 'monthly';
          priority = 0.7;
        }

        // Formal pages (kontakt, o-redakcji, polityka-redakcyjna, wspolpraca)
        else if (url.endsWith('/kontakt/') || url.endsWith('/o-redakcji/') || url.endsWith('/polityka-redakcyjna/') || url.endsWith('/wspolpraca/')) {
          changefreq = 'monthly';
          priority = 0.6;
        }

        // Pillar pages (main category articles): monthly, slightly higher priority
        else if (url.includes('/koszt-budowy-domu/') || url.includes('/technologie-budowy/') || url.includes('/formalnosci-budowlane/') || url.includes('/materialy-budowlane/') || url.includes('/etapy-budowy/')) {
          changefreq = 'monthly';
          priority = 0.95;
        }

        // Supporting articles: monthly, standard priority
        else if (url.includes('/budowa/') || url.includes('/energia/') || url.includes('/wnetrza/') || url.includes('/ogrod/')) {
          changefreq = 'monthly';
          priority = 0.8;
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
