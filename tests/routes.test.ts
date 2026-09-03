import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

const routes = [
  { path: 'index.html', contains: 'Desarrollador de software senior' },
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
    assert.ok(existsSync(join(dist, 'cv', 'Edinson_Delgado_CV_2026.pdf')));
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

  it('homepage positioning without exclusive GeneXus title or levels', () => {
    const html = readFileSync(join(dist, 'index.html'), 'utf8');
    assert.match(html, /Desarrollador de software senior y líder técnico/i);
    assert.doesNotMatch(html, /Nivel\s*[123]/i);
    assert.doesNotMatch(html, /Senior Software Engineer\s*\/\s*Technical Lead/i);
    assert.match(html, /Conversemos sobre tu proyecto/i);
    assert.match(html, /etapa ajustada a tus prioridades y presupuesto/i);
  });

  it('contact availability without duplicated label text', () => {
    const html = readFileSync(join(dist, 'contacto', 'index.html'), 'utf8');
    assert.match(
      html,
      /Disponibilidad presencial, híbrida y remota\. Proyectos nacionales e internacionales\./,
    );
    assert.doesNotMatch(html, /DisponibilidadDisponibilidad/i);
  });
});
