# ARCHITECTURE.md — Portfolio Edinson Delgado

## Decisiones de arquitectura

### ADR resumidas (detalle en DECISIONS.md)

| ID | Decisión | Razón |
|----|----------|-------|
| ADR-001 | Astro 7.x, output static | Rendimiento, SSG, compatibilidad Hostinger |
| ADR-002 | Sin Tailwind en v1 | CSS variables + BEM ligero reduce dependencias |
| ADR-003 | Content Collections para proyectos | Extensibilidad sin tocar componentes |
| ADR-004 | PHP aislado para contacto | Hostinger soporta PHP; sin backend Node |
| ADR-005 | TypeScript strict | Calidad y mantenibilidad |
| ADR-006 | Sin framework UI (React/Vue) | Mínimo JS, máximo HTML estático |

## Estructura propuesta del repositorio

```
Portfolio_2026/
├── AGENTS.md
├── README.md
├── package.json
├── tsconfig.json
├── astro.config.mjs
├── .gitignore
├── .env.example                    # Solo variables de desarrollo si aplica
│
├── docs/                           # Documentación obligatoria
│   ├── PRODUCT.md
│   ├── ARCHITECTURE.md
│   ├── UX_UI.md
│   ├── CONTENT.md
│   ├── SECURITY.md
│   ├── SEO_ACCESSIBILITY.md
│   ├── QA.md
│   ├── DEPLOYMENT_HOSTINGER.md
│   └── DECISIONS.md
│
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   ├── cv/
│   │   └── edinson-delgado-cv.pdf  # Proporcionado por Edinson
│   ├── images/
│   │   └── projects/               # Capturas AVIF/WebP
│   └── api/
│       ├── contact.php             # Endpoint público
│       └── contact.config.example.php
│
├── src/
│   ├── assets/                     # Imágenes procesadas por Astro
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Nav.astro
│   │   │   └── SkipLink.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Chip.astro
│   │   │   ├── SectionHeading.astro
│   │   │   ├── Timeline.astro
│   │   │   └── ThemeToggle.astro   # Opcional: claro/oscuro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── ServicesGrid.astro
│   │   │   ├── ProjectCard.astro
│   │   │   ├── CaseStudyLayout.astro
│   │   │   ├── HexynProcess.astro
│   │   │   ├── ExperienceTimeline.astro
│   │   │   ├── ContactForm.astro
│   │   │   └── JourneyHero.astro   # Hero contextual por recorrido
│   │   └── seo/
│   │       ├── Meta.astro
│   │       └── JsonLd.astro
│   │
│   ├── content/
│   │   ├── config.ts               # Schemas Content Collections
│   │   └── projects/
│   │       ├── aprobar.md
│   │       ├── clicks.md
│   │       └── colmena.md
│   │
│   ├── data/
│   │   ├── site.ts                 # Metadatos globales, enlaces sociales
│   │   ├── navigation.ts
│   │   ├── services.ts
│   │   ├── journeys.ts             # Config recorridos /genexus, etc.
│   │   ├── experience.ts
│   │   └── genexus.ts
│   │
│   ├── layouts/
│   │   └── PageLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre-mi.astro
│   │   ├── servicios.astro
│   │   ├── proyectos/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── genexus.astro
│   │   ├── modernizacion.astro
│   │   ├── innovacion.astro
│   │   ├── hexyn.astro
│   │   ├── experiencia.astro
│   │   ├── contacto.astro
│   │   ├── cv.astro                # Redirect o página de descarga
│   │   └── 404.astro
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css              # Variables de diseño
│   │   ├── typography.css
│   │   ├── layout.css
│   │   └── components/             # Estilos por componente si crece
│   │
│   └── scripts/
│       ├── contact-form.ts         # Validación cliente + fetch
│       └── nav.ts                  # Menú móvil, focus trap ligero
│
├── tests/
│   ├── build.test.ts
│   ├── routes.test.ts
│   └── contact-validation.test.ts
│
└── dist/                           # Generado por build (no commitear)
```

## Flujo de build

```
src/ + public/  →  astro build  →  dist/
                                      ├── index.html
                                      ├── genexus/index.html
                                      ├── api/contact.php  (copiado desde public/)
                                      └── assets/...
```

- **Desarrollo**: `npm run dev` (Astro dev server)
- **Producción**: subir contenido de `dist/` a `public_html` en Hostinger
- **PHP**: `contact.php` vive en `public/api/` y se copia a `dist/api/` en el build

## Modelo de datos

### Proyectos (Content Collection)

```typescript
// src/content/config.ts (esquema previsto)
{
  title: string;
  slug: string;
  summary: string;
  status: 'producción' | 'desarrollo' | 'archivado';
  problem: string;
  solution: string;
  responsibility: string[];
  features: string[];
  architecture: string;
  technologies: string[];
  results: string[];
  images: { src: string; alt: string; width: number; height: number }[];
  featured: boolean;
  order: number;
}
```

Añadir un proyecto = nuevo archivo `.md` en `src/content/projects/` + imágenes en `public/images/projects/`.

### Recorridos (journeys)

```typescript
// src/data/journeys.ts
{
  slug: 'genexus' | 'modernizacion' | 'innovacion';
  level: 1 | 2 | 3;
  headline: string;
  subheadline: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  relatedSections: string[];  // anchors o rutas
}
```

## Rutas y generación

| Ruta | Tipo | Fuente |
|------|------|--------|
| `/` | Estática | `pages/index.astro` |
| `/proyectos/[slug]` | Dinámica SSG | Content Collection `getStaticPaths` |
| Resto | Estática | Una página `.astro` por ruta |

## Componentes previstos

| Componente | Responsabilidad |
|------------|-----------------|
| `BaseLayout` | HTML shell, meta, skip link, header/footer |
| `JourneyHero` | Hero parametrizado por recorrido |
| `CaseStudyLayout` | Plantilla uniforme para casos |
| `HexynProcess` | Diagrama/pasos de metodología |
| `ExperienceTimeline` | Línea de tiempo vertical |
| `ContactForm` | Formulario + estados loading/success/error |
| `Meta` / `JsonLd` | SEO por página |

## Integraciones

| Integración | Paquete | Uso |
|-------------|---------|-----|
| Sitemap | `@astrojs/sitemap` | Generación automática post-build |
| Imágenes | `astro:assets` | Optimización AVIF/WebP |

**No incluir en v1**: React, Vue, Tailwind (salvo reversión documentada), CMS headless.

## Requisitos de entorno

- Node.js ≥ 22.12 (Astro 7)
- npm ≥ 10
- PHP ≥ 8.0 en Hostinger (solo para contacto)

## Criterios de aceptación (arquitectura)

- [ ] `npm run build` genera `dist/` desplegable sin pasos adicionales
- [ ] Nuevo proyecto se añade solo con markdown + imágenes
- [ ] TypeScript strict sin errores
- [ ] `contact.php` funciona independiente del build Astro
- [ ] Ningún secreto en el repositorio
