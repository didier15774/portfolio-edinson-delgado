# SEO_ACCESSIBILITY.md — Portfolio Edinson Delgado

## SEO

### Objetivos

- Posicionamiento por nombre («Edinson Delgado») y especialidades («GeneXus Uruguay», «desarrollador senior Uruguay»)
- Rich snippets básicos vía JSON-LD
- URLs limpias, indexables, sin parámetros innecesarios

### Metadatos por página

Cada página debe definir vía componente `Meta.astro`:

```typescript
interface PageMeta {
  title: string;           // único, ≤ 60 caracteres
  description: string;     // 150–160 caracteres
  canonical: string;       // URL absoluta
  ogImage?: string;        // 1200×630, /images/redes/og-default.png
  noindex?: boolean;       // solo 404 o páginas de prueba
}
```

### Open Graph y Twitter Cards

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_UY" />
<meta property="og:site_name" content="Edinson Delgado" />
<meta name="twitter:card" content="summary_large_image" />
```

Imagen OG por defecto: `/images/redes/og-default.png` (1200×630), en `public/images/redes/`. Diseño con nombre, rol y paleta de marca (sin foto stock).

### JSON-LD

**Person** (páginas principales):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Edinson Delgado",
  "jobTitle": "Desarrollador de software senior y líder técnico",
  "url": "https://DOMINIO/",
  "email": "edelgado@proyectocolmena.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Canelones",
    "addressCountry": "UY"
  },
  "sameAs": [
    "https://www.linkedin.com/in/edinsondelgado/",
    "https://github.com/didier15774"
  ]
}
```

**WebSite** con `SearchAction` opcional deshabilitado (sin buscador en v1).

**CreativeWork** o **SoftwareApplication** en páginas de proyecto según corresponda.

### Sitemap

- Generar con `@astrojs/sitemap`
- `site` en `astro.config.mjs` = dominio de producción
- Excluir `/404`, `/cv` si es solo redirect
- `lastmod` actualizado en cada deploy

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://DOMINIO/sitemap.xml
```

### URLs y estructura

- Trailing slash: consistente (Astro default `/ruta/` o configurar `trailingSlash: 'never'`)
- Jerarquía lógica: `/proyectos/aprobar` no `/p?id=1`
- `<h1>` único por página
- Jerarquía de headings sin saltos (h1 → h2 → h3)

### Rendimiento SEO

- HTML semántico reduce dependencia de JS para contenido
- Imágenes con `width`, `height`, `alt` descriptivo
- `loading="lazy"` en imágenes below the fold
- Fuentes con `preload` solo para críticas

---

## Accesibilidad (WCAG 2.1 AA)

### HTML semántico

| Elemento | Uso |
|----------|-----|
| `<header>`, `<nav>`, `<main>`, `<footer>` | Estructura de página |
| `<article>` | Casos de estudio |
| `<section>` + heading | Bloques de contenido |
| `<button>` vs `<a>` | Acciones vs navegación |
| `<label>` asociado | Todos los campos de formulario |

### Navegación por teclado

- Skip link «Saltar al contenido» como primer foco
- Orden de tabulación lógico
- Menú móvil: trap de foco mientras abierto, Escape cierra
- Todos los CTAs alcanzables sin mouse

### Foco visible

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

No eliminar outline sin reemplazo.

### Contraste

- Texto normal: ratio ≥ 4.5:1
- Texto grande (≥ 18pt o 14pt bold): ratio ≥ 3:1
- Verificar en modo claro y oscuro si aplica

### Formulario

- Labels visibles (no solo placeholder)
- Errores asociados con `aria-describedby`
- `aria-live="polite"` en mensajes de éxito/error
- Campos requeridos con `required` y `aria-required="true"`

### Imágenes

- `alt` descriptivo en contenido informativo
- `alt=""` en decorativas
- No texto crítico solo en imágenes

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Idioma

```html
<html lang="es">
```

---

## Herramientas de verificación

| Herramienta | Uso |
|-------------|-----|
| Lighthouse (Chrome) | Score ≥ 90 en las 4 categorías |
| axe DevTools | Errores críticos = 0 |
| WAVE | Contraste y estructura |
| Google Rich Results Test | JSON-LD válido |
| Screaming Frog / manual | Enlaces rotos |

---

## Criterios de aceptación

- [ ] Cada ruta tiene title y description únicos
- [ ] `sitemap.xml` y `robots.txt` accesibles en producción
- [ ] JSON-LD válido en inicio y contacto
- [ ] Navegación completa solo con teclado
- [ ] Lighthouse Accessibility ≥ 90 en inicio, proyectos y contacto
- [ ] Cero errores críticos en axe
