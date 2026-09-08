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

  it('public contact email is corporate, not Gmail', () => {
    const home = readFileSync(join(dist, 'index.html'), 'utf8');
    const contact = readFileSync(join(dist, 'contacto', 'index.html'), 'utf8');
    assert.match(home, /mailto:edelgado@proyectocolmena\.com/);
    assert.match(contact, /mailto:edelgado@proyectocolmena\.com/);
    assert.doesNotMatch(home, /it\.edelgado@gmail\.com/);
    assert.doesNotMatch(contact, /it\.edelgado@gmail\.com/);
  });

  it('company and project logos are published', () => {
    const logos = [
      join(dist, 'images', 'companies', 'sofis-gray.png'),
      join(dist, 'images', 'companies', 'universal-gray.png'),
      join(dist, 'images', 'companies', 'colmena-gray.png'),
      join(dist, 'images', 'companies', 'itools-gray.png'),
      join(dist, 'images', 'companies', 'insis-gray.png'),
      join(dist, 'images', 'companies', 'consorcio-gray.png'),
      join(dist, 'images', 'companies', 'puntoexe-gray.png'),
      join(dist, 'images', 'projects', 'aprobar-gray.png'),
      join(dist, 'images', 'projects', 'clicks-gray.png'),
    ];
    for (const file of logos) {
      assert.ok(existsSync(file), `missing ${file}`);
    }
    assert.ok(!existsSync(join(dist, 'images', 'projects', 'sofis-gray.png')));

    const html = readFileSync(join(dist, 'index.html'), 'utf8');
    assert.match(html, /\/images\/companies\/sofis-gray\.png/);
    assert.match(html, /\/images\/projects\/aprobar-gray\.png/);
    assert.match(html, /\/images\/projects\/clicks-gray\.png/);
    assert.match(html, /alt="Logo de Sofis Solutions"/);
  });

  it('project covers are published without personal email or deploy metadata', () => {
    const covers = [
      join(dist, 'images', 'projects', 'aprobar-cover.webp'),
      join(dist, 'images', 'projects', 'clicks-cover.webp'),
      join(dist, 'images', 'projects', 'colmena-cover.webp'),
    ];
    for (const file of covers) {
      assert.ok(existsSync(file), `missing ${file}`);
      const bytes = readFileSync(file);
      assert.equal(bytes.includes(Buffer.from('it.edelgado@gmail.com')), false);
      assert.equal(bytes.includes(Buffer.from('commercial-email')), false);
      assert.equal(bytes.includes(Buffer.from('release/')), false);
    }
    assert.ok(!existsSync(join(dist, 'images', 'projects', 'aprobar-cover.png')));
    assert.ok(!existsSync(join(dist, 'images', 'projects', 'clicks-cover.png')));
    assert.ok(!existsSync(join(dist, 'images', 'projects', 'colmena-cover.png')));

    const home = readFileSync(join(dist, 'index.html'), 'utf8');
    assert.match(home, /\/images\/projects\/aprobar-cover\.webp/);
    assert.match(home, /\/images\/projects\/clicks-cover\.webp/);
    assert.match(home, /\/images\/projects\/colmena-cover\.webp/);
    assert.match(
      home,
      /AProbar en escritorio y móvil — insights de consumidores, pricing e intención de compra/,
    );

    const caseHtml = readFileSync(join(dist, 'proyectos', 'aprobar', 'index.html'), 'utf8');
    assert.match(caseHtml, /\/images\/projects\/aprobar-cover\.webp/);
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
