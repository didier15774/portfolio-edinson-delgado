# Portfolio Profesional — Edinson Delgado

Sitio estático profesional orientado a oportunidades laborales, contratos y clientes directos.

## Estado

**Completado** — Bloques 1 a 8 implementados.

## Stack

- Astro 7.2 (SSG, `output: static`)
- TypeScript strict
- CSS con variables de diseño (modo oscuro principal)
- PHP (formulario de contacto en Hostinger)

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321 — NO abrir dist/index.html directamente
npm run build      # genera dist/ (sin URL absoluta)
npm run build:prod # requiere PUBLIC_SITE_URL
npm run preview    # sirve dist/ con servidor local
npm run check      # diagnóstico TypeScript/Astro
npm test           # build + pruebas de rutas y validación
```

## Despliegue rápido (Hostinger)

```bash
PUBLIC_SITE_URL=https://tudominio.com npm run build:prod
# Subir contenido de dist/ a public_html/
# Crear public_html/api/contact.config.php desde contact.config.example.php
```

Ver guía completa: [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md)

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [AGENTS.md](./AGENTS.md) | Guía operativa |
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Producto y mapa del sitio |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Arquitectura técnica |
| [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md) | Despliegue |

## Contacto

- **Edinson Delgado** — it.edelgado@gmail.com
- [LinkedIn](https://www.linkedin.com/in/edinsondelgado/)
- [GitHub](https://github.com/didier15774)
