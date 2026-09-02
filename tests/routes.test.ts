import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

const routes = [
  { path: 'index.html', contains: 'Senior Software Engineer' },
  { path: join('sobre-mi', 'index.html'), contains: 'Sobre Edinson Delgado' },
  { path: join('servicios', 'index.html'), contains: 'Servicios' },
  { path: join('proyectos', 'index.html'), contains: 'Proyectos' },
  { path: join('proyectos', 'aprobar', 'index.html'), contains: 'AProbar' },
  { path: join('proyectos', 'clicks', 'index.html'), contains: 'Clicks' },
  { path: join('proyectos', 'colmena', 'index.html'), contains: 'Colmena' },
  { path: join('genexus', 'index.html'), contains: 'GeneXus' },
  { path: join('modernizacion', 'index.html'), contains: 'modernización' },
  { path: join('innovacion', 'index.html'), contains: 'HEXYN' },
  { path: join('hexyn', 'index.html'), contains: 'HEXYN' },
  { path: join('experiencia', 'index.html'), contains: 'Experiencia' },
  { path: join('contacto', 'index.html'), contains: 'contact-form' },
  { path: join('cv', 'index.html'), contains: 'Curriculum vitae' },
  { path: '404.html', contains: 'no encontrada' },
];

describe('build output', () => {
  it('dist/index.html exists with global CSS', () => {
    const file = join(dist, 'index.html');
    assert.ok(existsSync(file));
    const html = readFileSync(file, 'utf8');
    assert.match(html, /stylesheet/);
    assert.doesNotMatch(html, /example\.com/);
  });

  it('contact.php copied to dist', () => {
    assert.ok(existsSync(join(dist, 'api', 'contact.php')));
  });

  it('CV pdf copied to dist', () => {
    assert.ok(existsSync(join(dist, 'cv', 'Edinson_Delgado_CV_GeneXus_Senior.pdf')));
  });
});

describe('critical routes', () => {
  for (const route of routes) {
    it(`route ${route.path}`, () => {
      const file = join(dist, route.path);
      assert.ok(existsSync(file), `missing ${file}`);
      const html = readFileSync(file, 'utf8').toLowerCase();
      assert.ok(html.includes(route.contains.toLowerCase()), `expected "${route.contains}" in ${route.path}`);
    });
  }
});
