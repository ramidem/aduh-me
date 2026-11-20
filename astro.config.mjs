// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aduh.me',
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !/^\/folders\/[^/]+\/[^/]+\/$/.test(pathname) && !/^\/404(\.html|\/)?$/.test(pathname);
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
});
