import { defineConfig } from 'astro/config';
import { DEFAULT_SITE_URL } from './src/data/site';

const siteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ?? DEFAULT_SITE_URL;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
