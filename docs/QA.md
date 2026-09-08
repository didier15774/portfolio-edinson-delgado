# QA.md — Portfolio Edinson Delgado

## Estrategia de pruebas

| Nivel | Qué se prueba | Herramienta |
|-------|---------------|-------------|
| Build | Compilación sin errores | `npm run build` |
| Unitario | Validación formulario, utilidades | Vitest o Node test runner |
| Integración | Rutas generadas, assets | Script post-build |
| Manual | UX, responsive, a11y | Checklist |
| Performance | Lighthouse | Chrome DevTools |

## Pruebas automatizadas previstas

### `tests/build.test.ts`

```typescript
// Verifica que npm run build exitoso y dist/ contiene:
// - index.html
// - genexus/index.html (o genexus.html según trailingSlash)
// - api/contact.php
// - sitemap-index.xml o sitemap-0.xml
// - robots.txt
```

### `tests/routes.test.ts`

Rutas críticas que deben existir en `dist/`:

| Ruta | Contiene (mínimo) |
|------|-------------------|
| `/` | "Desarrollador de software senior" o "líder técnico" |
| `/sobre-mi` | "Edinson" |
| `/servicios` | "GeneXus" |
| `/proyectos` | "AProbar" o slug |
| `/proyectos/aprobar` | "AProbar" |
| `/proyectos/clicks` | "Clicks" |
| `/proyectos/colmena` | "Colmena" |
| `/genexus` | "GeneXus" |
| `/modernizacion` | "modernización" (case insensitive) |
| `/innovacion` | "HEXYN" o "innovación" |
| `/hexyn` | "HEXYN" |
| `/experiencia` | timeline content |
| `/contacto` | formulario |
| `/404` | página error |

### `tests/contact-validation.test.ts`

Casos para lógica compartida o simulación PHP:

- Email inválido → error
- Honeypot con valor → rechazo silencioso
- Campos con `\n` en subject → rechazo
- Mensaje < 20 chars → error
- Payload válido → estructura correcta

### Script npm

```json
{
  "scripts": {
    "test": "npm run build && node --test tests/**/*.test.ts",
    "test:unit": "node --test tests/contact-validation.test.ts"
  }
}
```

## Checklist manual — Responsive

Probar en anchos: **360**, **390**, **768**, **1024**, **1440** px.

- [ ] Sin scroll horizontal
- [ ] Menú móvil abre/cierra correctamente
- [ ] CTAs accesibles con pulgar en móvil
- [ ] Imágenes no desbordan contenedor
- [ ] Tipografía legible sin zoom

## Checklist manual — Navegación

- [ ] Todos los enlaces del header/footer funcionan
- [ ] Breadcrumbs en casos de estudio correctos
- [ ] Links externos (LinkedIn, GitHub) abren en nueva pestaña con `rel="noopener noreferrer"`
- [ ] 404 personalizada para rutas inexistentes
- [ ] Descarga CV funciona

## Checklist manual — Formulario

- [ ] Validación HTML5 en cliente
- [ ] Mensajes de error claros
- [ ] Estado loading durante envío
- [ ] Éxito muestra confirmación
- [ ] Honeypot no visible para usuarios
- [ ] Envío real llega a email configurado (staging/producción)
- [ ] Reenvío doble no duplica (deshabilitar botón tras submit)

## Checklist manual — Recorridos (capacidades complementarias)

- [ ] `/genexus` mensaje GeneXus diferenciado (sin «Nivel»)
- [ ] `/modernizacion` mensaje modernización diferenciado (sin «Nivel»)
- [ ] `/innovacion` mensaje innovación/HEXYN diferenciado (sin «Nivel»)
- [ ] URLs compartibles copian correctamente en redes
- [ ] Ninguna UI visible presenta «Nivel 1/2/3» como estructura del sitio

## Checklist manual — Tema (desktop y móvil)

- [ ] Toggle claro/oscuro funciona en desktop (≥ 1024 px)
- [ ] Toggle claro/oscuro funciona en móvil (≤ 390 px)
- [ ] Preferencia persistida en `localStorage` tras recargar
- [ ] Contraste legible en ambos temas

## Checklist manual — Open Graph

- [ ] `og:image` apunta a `/images/redes/og-default.png` (o URL absoluta equivalente)
- [ ] Dimensiones 1200×630
- [ ] Depurador LinkedIn/Facebook muestra imagen y título correctos en dominio de producción

## Checklist manual — Contenido

- [ ] Sin lorem ipsum
- [ ] Sin «TODO» o «pendiente» visible
- [ ] Ortografía revisada (español Uruguay)
- [ ] Capturas sin datos sensibles
- [ ] Correo visible = `edelgado@proyectocolmena.com` (sin Gmail personal)

## Lighthouse — páginas a auditar

1. `/` (inicio)
2. `/proyectos/aprobar` (caso largo)
3. `/contacto` (formulario)

| Métrica | Objetivo |
|---------|----------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

### Si Performance < 90

- Optimizar imágenes (AVIF/WebP, dimensiones correctas)
- Reducir peso de fuentes
- Verificar que no hay JS innecesario
- Preconnect a Google Fonts si se usan

## Checklist pre-release

- [x] `npm run build` sin warnings críticos
- [x] `npm test` pasa (23 pruebas)
- [x] `npm run check` sin errores
- [x] `npm audit` sin vulnerabilidades críticas
- [x] CSS global cargado vía `/_astro/` (no abrir `dist/index.html` directo)
- [x] `npm run dev` y `npm run preview` verificados
- [ ] Lighthouse ≥ 90 en producción con HTTPS y `PUBLIC_SITE_URL` (auditar post-despliegue)
- [ ] Formulario probado end-to-end en Hostinger con SMTP
- [ ] Documentación actualizada
- [ ] `contact.config.php` configurado en servidor

## Registro de bugs

Documentar en issues o en `docs/DECISIONS.md` si son decisiones, no bugs.

| ID | Descripción | Severidad | Estado |
|----|-------------|-----------|--------|
| — | — | — | — |

## Criterios de aceptación (QA global)

- [ ] Todas las pruebas automatizadas pasan en CI/local
- [ ] Checklist manual 100% en rutas críticas
- [ ] Lighthouse ≥ 90 en 3 páginas auditadas
- [ ] Formulario probado end-to-end en Hostinger
- [ ] Cero enlaces rotos
