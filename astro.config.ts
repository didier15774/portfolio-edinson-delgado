import { defineConfig } from 'astro/config';
import { resolvePublicSiteUrl } from './src/lib/site-url';

const siteUrl = resolvePublicSiteUrl(process.env.PUBLIC_SITE_URL);
const isProductionBuild = process.env.NODE_ENV === 'production';

if (isProductionBuild && !siteUrl) {
  console.warn(
    '[portfolio] PUBLIC_SITE_URL no definida: canonical, Open Graph absolutos y sitemap quedan desactivados.',
  );
}

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
