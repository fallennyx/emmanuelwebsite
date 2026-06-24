import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://akanmutech.com',
  output: 'static',
  integrations: [sitemap()],
});
