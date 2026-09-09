# Portfolio — Edinson Delgado

Sitio profesional estático para presentar la trayectoria, proyectos y servicios de **Edinson Delgado** — desarrollador de software senior y líder técnico con más de 20 años creando, evolucionando y modernizando sistemas empresariales.

Objetivo: convertir experiencia real en evidencia verificable para oportunidades laborales, contratos como contractor y clientes propios.

| | |
|--|--|
| **Sitio en producción** | [https://edinson.proyectocolmena.com](https://edinson.proyectocolmena.com) |
| **Repositorio** | [github.com/didier15774/portfolio-edinson-delgado](https://github.com/didier15774/portfolio-edinson-delgado) |
| **Versión** | `1.0.0` (tag `v1.0.0`) |

![Inicio del portfolio en producción](docs/assets/home-production.png)

---

## Descripción profesional

El visitante debe comprender en segundos qué problemas resuelve Edinson, qué sistemas ha construido y cómo contactarlo. El sitio combina:

- Identidad visual tecnológica (azul marino / naranja, modo oscuro principal).
- Tres recorridos compartibles (`/genexus/`, `/modernizacion/`, `/innovacion/`) en un solo producto.
- Casos de estudio extensibles, metodología HEXYN y formulario de contacto seguro.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Astro 7.2 — SSG (`output: static`) |
| Lenguaje | TypeScript (strict) |
| Estilos | CSS con variables de diseño (sin Tailwind) |
| Contenido | Content Collections (Markdown + Zod) |
| Contacto | PHP + SMTP (`api/contact.php`) |
| Hosting | Hosting compartido — contenido de `dist/` en el document root |

Sin React, Vue, Next.js ni base de datos en v1.

---

## Rutas principales

14 rutas de contenido publicadas, más la página 404:

```
/                          Inicio
/sobre-mi/                 Perfil profesional
/servicios/                Servicios
/proyectos/                Índice de casos
/proyectos/aprobar/        Caso AProbar
/proyectos/clicks/         Caso Clicks
/proyectos/colmena/        Caso Colmena
/genexus/                  Capacidad GeneXus
/modernizacion/            Capacidad modernización y liderazgo
/innovacion/               Capacidad IA aplicada
/hexyn/                    Metodología propia HEXYN
/experiencia/              Timeline profesional
/contacto/                 Formulario + canales directos
/cv/                       Descarga de CV (PDF)
```

Verificadas en producción (HTTP 200) el 2026-09-09, junto con `/robots.txt`, `/sitemap-index.xml` y el CV en PDF.

---

## Instalación local

**Requisitos:** Node.js ≥ 22.12, npm ≥ 10

```bash
git clone https://github.com/didier15774/portfolio-edinson-delgado.git
cd portfolio-edinson-delgado
cp .env.example .env
npm install
npm run dev
```

Abrir http://localhost:4321 — no abrir `dist/index.html` con `file://` (los CSS viven en `/_astro/`).

---

## Build y despliegue

```bash
# Build productivo (SEO + sitemap con dominio real)
npm run build:prod
npm test
npm run check
```

Despliegue desde Windows (credenciales solo en archivo local, no versionado):

```bat
Deploy\validate_remote.bat
Deploy\build_Production.bat
Deploy\deploy_Production.bat
```

Documentación:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [Deploy/docs/DEPLOY_PROCESS.md](./Deploy/docs/DEPLOY_PROCESS.md)
- [docs/CHECKLIST_PRODUCCION.md](./docs/CHECKLIST_PRODUCCION.md)
- [docs/SMTP_HOSTINGER.md](./docs/SMTP_HOSTINGER.md)

**Secretos fuera del repo:** `.env`, `Deploy/deploy.config.ps1`, `api/contact.config.php` (solo en el servidor).

---

## Estado (verificado 2026-09-09)

| Área | Estado |
|------|--------|
| Sitio estático (14 rutas de contenido) | En producción |
| Dominio | https://edinson.proyectocolmena.com |
| Formulario de contacto | Configurado en servidor (GET 405; validación 400; honeypot 200). Entrega de correo no reprobada con un envío real en esta auditoría. |
| Correo público | `edelgado@proyectocolmena.com` |
| Cloudflare Web Analytics | Beacon presente en el HTML de producción |
| Foto de perfil y portadas | Publicadas (AProbar, ClickS, Proyecto Colmena) |
| Recomendaciones | Estructura lista — sección oculta hasta autorizaciones |
| Timeline de experiencia | 3 hitos publicados; ampliación pendiente de datos verificados |

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Desarrollo local y convenciones |
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Producto y mapa del sitio |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Arquitectura |
| [docs/SECURITY.md](./docs/SECURITY.md) | Seguridad del formulario |
| [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md) | Despliegue |

---

## Contacto

- **Edinson Delgado** — [edelgado@proyectocolmena.com](mailto:edelgado@proyectocolmena.com)
- [LinkedIn](https://www.linkedin.com/in/edinsondelgado/)
- [GitHub](https://github.com/didier15774)

---

## Licencia

Contenido y código propiedad de Edinson Delgado. Dependencias sujetas a sus licencias respectivas.
