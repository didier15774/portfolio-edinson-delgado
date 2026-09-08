# ANALYTICS_CLOUDFLARE.md — Web Analytics (condicional)

## Qué es

Cloudflare Web Analytics midiendo visitas del portfolio **sin cookies propias** y **sin panel `/admin`** en el sitio. Las métricas se ven en la cuenta Cloudflare del dominio.

## Variable de entorno

| Variable | Dónde | Notas |
|----------|-------|-------|
| `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | `.env` local / entorno de build de producción | Token público del beacon; **no** inventar ni commitear valores reales en docs |

Definir solo en el entorno que genera el build de producción. No versionar el token en git.

## Comportamiento en el sitio

Componente: `src/components/seo/CloudflareAnalytics.astro` (incluido en `BaseLayout`).

| Condición | Resultado |
|-----------|-----------|
| `import.meta.env.PROD === true` **y** token no vacío | Se inyecta `beacon.min.js` con `data-cf-beacon` |
| Desarrollo (`npm run dev`) | No se inyecta |
| Producción sin token | No se inyecta; el sitio funciona igual |

## Qué no incluye

- Sin cookies de primera parte del portfolio
- Sin panel de administración en rutas del sitio
- Sin dependencias npm adicionales

## Verificación

1. Crear/activar Web Analytics en la cuenta Cloudflare del dominio.
2. Copiar el token al entorno de build (`PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`).
3. `npm run build:prod` (o el flujo de deploy habitual).
4. En el HTML de producción, confirmar presencia de `static.cloudflareinsights.com/beacon.min.js`.
5. Generar tráfico real y revisar el dashboard en Cloudflare (puede tardar minutos).

## Si no hay token

- El build y el sitio son válidos.
- No hay medición de tráfico vía Cloudflare Web Analytics.
- Nada que configurar en Hostinger más allá del HTML estático ya desplegado.

Ver también ADR-019 en `docs/DECISIONS.md`.
