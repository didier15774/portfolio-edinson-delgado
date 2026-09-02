import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const SITE = 'https://edinson.proyectocolmena.com';

describe('production SEO', () => {
  it('robots.txt includes production sitemap', () => {
    const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
    assert.match(robots, new RegExp(`${SITE}/sitemap-index\\.xml`));
    assert.doesNotMatch(robots, /example\.com/);
  });

  it('sitemap exists for production domain', () => {
    const indexPath = join(dist, 'sitemap-index.xml');
    const flatPath = join(dist, 'sitemap-0.xml');
    assert.ok(existsSync(indexPath) || existsSync(flatPath), 'sitemap missing in dist/');

    const sitemapFile = existsSync(indexPath) ? indexPath : flatPath;
    const xml = readFileSync(sitemapFile, 'utf8');
    assert.match(xml, new RegExp(SITE.replace(/\./g, '\\.')));
    assert.doesNotMatch(xml, /example\.com/);
  });

  it('homepage has canonical, og:url and Person JSON-LD', () => {
    const html = readFileSync(join(dist, 'index.html'), 'utf8');
    assert.match(html, new RegExp(`rel="canonical" href="${SITE}/"`));
    assert.match(html, new RegExp(`property="og:url" content="${SITE}/"`));
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /"@type":"Person"/);
    assert.match(html, new RegExp(`"url":"${SITE}"`));
    assert.doesNotMatch(html, /example\.com/);
    assert.doesNotMatch(html, /id="recomendaciones"/);
  });

  it('contact page has absolute canonical', () => {
    const html = readFileSync(join(dist, 'contacto', 'index.html'), 'utf8');
    assert.match(html, new RegExp(`rel="canonical" href="${SITE}/contacto/"`));
  });

  it('dist ready for Hostinger (api + htaccess + cv)', () => {
    assert.ok(existsSync(join(dist, 'api', 'contact.php')));
    assert.ok(existsSync(join(dist, 'api', 'contact.config.example.php')));
    assert.ok(!existsSync(join(dist, 'api', 'contact.config.php')));
    assert.ok(existsSync(join(dist, '.htaccess')));
    assert.ok(existsSync(join(dist, 'cv', 'Edinson_Delgado_CV_GeneXus_Senior.pdf')));
  });
});
