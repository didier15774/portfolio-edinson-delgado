# Portfolio — Edinson Delgado

Sitio profesional estático para presentar trayectoria, proyectos y servicios de **Edinson Delgado** — Senior Software Engineer / Technical Lead con 20 años en sistemas empresariales.

Orientado a generar oportunidades laborales, contratos como contractor y clientes directos. No es un currículum decorativo: cada sección comunica problemas que resuelve, experiencia verificable y forma de contacto.

| | |
|--|--|
| **Sitio (producción)** | [https://edinson.proyectocolmena.com](https://edinson.proyectocolmena.com) |
| **Repositorio** | [github.com/didier15774/portfolio-edinson-delgado](https://github.com/didier15774/portfolio-edinson-delgado) |

---

## Objetivo

Convertir la trayectoria profesional en evidencia clara para tres audiencias:

| Audiencia | Recorrido sugerido |
|-----------|-------------------|
| Reclutadores / RRHH técnico | Inicio → Experiencia → CV |
| CTO / gerentes de TI | `/modernizacion/` → Proyectos |
| Equipos GeneXus | `/genexus/` → GeneXus |
| Clientes / founders | `/innovacion/` → HEXYN → Contacto |

---

## Tecnologías

| Capa | Stack |
|------|-------|
| Framework | [Astro](https://astro.build) 7.2 — SSG (`output: static`) |
| Lenguaje | TypeScript (strict) |
| Estilos | CSS con variables de diseño (modo oscuro principal) |
| Contenido | Content Collections (Markdown + Zod) |
| Contacto | PHP + SMTP Hostinger (`public/api/contact.php`) |
| Despliegue | Hostinger — contenido de `dist/` en `public_html` |

Sin React, Vue, Tailwind ni base de datos en esta versión.

---

## Funcionalidades

- Hero profesional con especialidades y CTAs (proyectos, CV, contacto)
- Tres **recorridos compartibles**: `/genexus/`, `/modernizacion/`, `/innovacion/`
- Casos de estudio: **AProbar**, **Clicks**, **Proyecto Colmena**
- Metodología **HEXYN** (IA como acelerador bajo control humano)
- Línea de tiempo profesional (Sofis, UST, Colmena)
- **Recomendaciones** gestionadas en `src/data/recommendations.ts` (sección oculta hasta haber ítems autorizados)
- Formulario de contacto con validación servidor, honeypot y SMTP
- SEO: canonical, Open Graph, JSON-LD y sitemap con el dominio de producción
- Navegación accesible (teclado, `aria-current`, menú móvil)
- Modo oscuro por defecto; modo claro preparado

---

## Rutas

```
/                          Inicio
/sobre-mi/                 Perfil profesional
/servicios/                Servicios
/proyectos/                Índice de casos
/proyectos/aprobar/        Caso AProbar
/proyectos/clicks/         Caso Clicks
/proyectos/colmena/        Caso Colmena
/genexus/                  Recorrido Nivel 1
/modernizacion/            Recorrido Nivel 2
/innovacion/               Recorrido Nivel 3
/hexyn/                    Metodología HEXYN
/experiencia/              Timeline profesional
/contacto/                 Formulario + canales directos
/cv/                       Descarga de CV (PDF)
```

---

## Instalación local

**Requisitos:** Node.js ≥ 22.12, npm ≥ 10

```bash
git clone https://github.com/didier15774/portfolio-edinson-delgado.git
cd portfolio-edinson-delgado
cp .env.example .env   # PUBLIC_SITE_URL ya apunta al dominio de producción
npm install
npm run dev            # http://localhost:4321
```

### Comandos útiles

```bash
npm run check       # TypeScript / Astro diagnostics
npm run build       # Build sin exigir dominio (SEO absoluto desactivado)
npm run build:prod  # Build productivo (lee .env / PUBLIC_SITE_URL)
npm run preview     # Sirve dist/ — no abrir dist/index.html con file://
npm test            # build:prod + pruebas de rutas, SEO y validación
```

> **Importante:** Los estilos se cargan desde `/_astro/`. Abrir `dist/index.html` con `file://` no funciona.

---

## Despliegue (Hostinger)

```bash
npm run build:prod
npm test
# O scripts automatizados (SSH):
# Deploy\validate_remote.bat
# Deploy\build_Production.bat
# Deploy\deploy_Production.bat
```

Guía de scripts: [Deploy/docs/DEPLOY_PROCESS.md](./Deploy/docs/DEPLOY_PROCESS.md)  
Checklist: [docs/CHECKLIST_PRODUCCION.md](./docs/CHECKLIST_PRODUCCION.md)  
SMTP: [docs/SMTP_HOSTINGER.md](./docs/SMTP_HOSTINGER.md)

**Producción:** https://edinson.proyectocolmena.com  
Credenciales SSH solo en `Deploy/deploy.config.ps1` (gitignored).

---

## Recomendaciones

Archivo: `src/data/recommendations.ts`

Campos: `text`, `name`, `role`, `company`, `relationship`, `authorized`, `order`.

Solo se publican entradas con `authorized: true`. Si no hay ninguna, la sección **no aparece** (sin placeholders). Los textos deben ser originales; solo se admiten correcciones de claridad aprobadas por el autor.

---

## Secretos (fuera del repositorio)

| Archivo | Ubicación |
|---------|-----------|
| `.env` | Local / CI — no versionado |
| `contact.config.php` | Solo en Hostinger `public_html/api/` |

Plantillas versionadas: `.env.example`, `contact.config.example.php`.

---

## Estado del proyecto

| Área | Estado |
|------|--------|
| Sitio estático (15 rutas) | Completado |
| Dominio `edinson.proyectocolmena.com` | Configurado en build productivo |
| Formulario PHP + SMTP | Código listo — credenciales solo en servidor |
| Recomendaciones | Estructura lista — sección oculta hasta autorizaciones |
| Capturas de proyectos | Estructura lista — imágenes pendientes |
| Despliegue Hostinger | Pendiente de subir `dist/` |

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [AGENTS.md](./AGENTS.md) | Guía para agentes y colaboradores |
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Producto y mapa del sitio |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Arquitectura técnica |
| [docs/SECURITY.md](./docs/SECURITY.md) | Seguridad del formulario |
| [docs/SMTP_HOSTINGER.md](./docs/SMTP_HOSTINGER.md) | SMTP sin secretos en git |
| [docs/CHECKLIST_PRODUCCION.md](./docs/CHECKLIST_PRODUCCION.md) | Pruebas productivas |
| [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md) | Despliegue |

---

## Contacto

- **Edinson Delgado** — [it.edelgado@gmail.com](mailto:it.edelgado@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/edinsondelgado/)
- [GitHub](https://github.com/didier15774)

---

## Licencia

Contenido y código propiedad de Edinson Delgado. Dependencias sujetas a sus licencias respectivas.
