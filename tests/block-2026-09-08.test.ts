import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const dist = join(process.cwd(), 'dist');
const SITE = 'https://edinson.proyectocolmena.com';
const OG_PATH = '/images/redes/og-default.png';
const OG_ABS = `${SITE}${OG_PATH}`;
const ROLE = 'Desarrollador de software senior y líder técnico';
const CORP_EMAIL = 'edelgado@proyectocolmena.com';

function readDist(rel: string): string {
  return readFileSync(join(dist, rel), 'utf8');
}

function walkFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

describe('Open Graph and Twitter metadata', () => {
  it('uses PNG redes image with 1200×630 metadata', () => {
    const html = readDist('index.html');
    assert.match(html, new RegExp(`property="og:image" content="${OG_ABS}"`));
    assert.match(html, /property="og:image:type" content="image\/png"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(
      html,
      new RegExp(
        `property="og:image:alt" content="Edinson Delgado — ${ROLE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
      ),
    );
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, new RegExp(`name="twitter:image" content="${OG_ABS}"`));
    assert.match(html, /name="twitter:image:alt"/);
    assert.doesNotMatch(html, /og-default\.svg/);
    assert.doesNotMatch(html, /Senior Software Engineer/i);
    assert.doesNotMatch(html, /Technical Lead/i);
    assert.doesNotMatch(html, /\uFFFD|Ã¡|Ã©|Ã­|Ã³|Ãº/);
  });

  it('publishes OG PNG at exact 1200×630', () => {
    const file = join(dist, 'images', 'redes', 'og-default.png');
    assert.ok(existsSync(file), 'missing og-default.png in dist');
    assert.ok(!existsSync(join(dist, 'images', 'og-default.svg')));

    const probe = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import sharp from 'sharp'; const m = await sharp(process.argv[1]).metadata(); if (m.width!==1200||m.height!==630) { console.error(m.width+'x'+m.height); process.exit(1); }`,
        file,
      ],
      { encoding: 'utf8' },
    );
    assert.equal(probe.status, 0, probe.stderr || probe.stdout);
  });
});

describe('corporate email and secrets hygiene', () => {
  it('uses corporate email in public dist HTML and example config', () => {
    const home = readDist('index.html');
    const contact = readDist(join('contacto', 'index.html'));
    const example = readFileSync(join(dist, 'api', 'contact.config.example.php'), 'utf8');
    const php = readFileSync(join(dist, 'api', 'contact.php'), 'utf8');

    assert.match(home, new RegExp(CORP_EMAIL));
    assert.match(contact, new RegExp(CORP_EMAIL));
    assert.match(example, /'mail_to'\s*=>\s*'edelgado@proyectocolmena\.com'/);
    assert.match(example, /'mail_from'\s*=>\s*'edelgado@proyectocolmena\.com'/);
    assert.match(example, /'username'\s*=>\s*'edelgado@proyectocolmena\.com'/);
    assert.match(php, /assert_allowed_origin/);
    assert.doesNotMatch(home, /it\.edelgado@gmail\.com/);
    assert.doesNotMatch(contact, /it\.edelgado@gmail\.com/);
    assert.doesNotMatch(example, /gmail\.com/);
    assert.ok(!existsSync(join(dist, 'api', 'contact.config.php')));
  });

  it('docs and source tree omit Gmail contact destination', () => {
    const roots = [
      join(process.cwd(), 'docs'),
      join(process.cwd(), 'src'),
      join(process.cwd(), 'public', 'api'),
      join(process.cwd(), 'README.md'),
    ];
    const files: string[] = [];
    for (const root of roots) {
      if (root.endsWith('.md')) files.push(root);
      else walkFiles(root, files);
    }

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (!['.md', '.ts', '.astro', '.php', '.js', '.mjs', '.css', '.html'].includes(ext)) continue;
      const text = readFileSync(file, 'utf8');
      assert.equal(
        text.includes('it.edelgado@gmail.com'),
        false,
        `Gmail found in ${file}`,
      );
    }
  });
});

describe('HEXYN and journeys content', () => {
  it('hexyn page does not duplicate intro before process steps', () => {
    const html = readDist(join('hexyn', 'index.html'));
    assert.match(html, /Cómo funciona HEXYN/);
    const processIdx = html.indexOf('Cómo funciona HEXYN');
    assert.ok(processIdx > 0);
    const before = html.slice(0, processIdx);
    const after = html.slice(processIdx);
    assert.match(before, /Metodología HEXYN/);
    assert.match(before, /La IA acelera la implementación; la revisión humana/);
    assert.doesNotMatch(after, /La IA acelera la implementación; la revisión humana/);
    assert.doesNotMatch(
      after,
      /Proceso de desarrollo donde la IA actúa como acelerador bajo control técnico humano/,
    );
    assert.match(after, /Requisitos y análisis/);
    assert.match(after, /Implementación con agentes/);
  });

  it('public pages omit Nivel 1/2/3 framing', () => {
    const pages = [
      'index.html',
      join('genexus', 'index.html'),
      join('modernizacion', 'index.html'),
      join('innovacion', 'index.html'),
      join('hexyn', 'index.html'),
    ];
    for (const page of pages) {
      const html = readDist(page);
      assert.doesNotMatch(html, /Nivel\s*[123]/i, page);
      assert.doesNotMatch(html, /Senior Software Engineer/i, page);
    }
  });
});

describe('theme toggle and navigation markup', () => {
  it('exposes desktop icon toggle and mobile panel toggle', () => {
    const html = readDist('index.html');
    assert.match(html, /data-theme-toggle/);
    assert.match(html, /site-nav__theme--icon/);
    assert.match(html, /site-nav__theme--panel/);
    assert.match(html, /data-nav-toggle/);
    assert.match(html, /aria-expanded="false"/);
  });

  it('nav and theme scripts handle breakpoint and persistence keys', () => {
    const nav = readFileSync(join(dist, 'scripts', 'nav.js'), 'utf8');
    const theme = readFileSync(join(dist, 'scripts', 'theme.js'), 'utf8');
    assert.match(nav, /min-width:\s*1024px/);
    assert.match(nav, /aria-expanded/);
    assert.match(nav, /Escape/);
    assert.match(theme, /localStorage/);
    assert.match(theme, /portfolio-theme/);
  });
});

describe('Cloudflare Web Analytics', () => {
  it('is absent from default production test build without token', () => {
    const html = readDist('index.html');
    assert.doesNotMatch(html, /cloudflareinsights\.com\/beacon\.min\.js/);
    assert.doesNotMatch(html, /data-cf-beacon/);
    assert.doesNotMatch(html, /google-analytics|gtag\(/i);
  });

  it('component stays conditional on PROD + token', () => {
    const src = readFileSync(
      join(process.cwd(), 'src', 'components', 'seo', 'CloudflareAnalytics.astro'),
      'utf8',
    );
    assert.match(src, /PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN/);
    assert.match(src, /import\.meta\.env\.PROD/);
  });
});
