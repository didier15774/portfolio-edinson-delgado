# Portfolio — Edinson Delgado

Sitio profesional estático para presentar trayectoria, proyectos y servicios de **Edinson Delgado** — Senior Software Engineer / Technical Lead con 20 años en sistemas empresariales.

Orientado a generar oportunidades laborales, contratos como contractor y clientes directos. No es un currículum decorativo: cada sección comunica problemas que resuelve, experiencia verificable y forma de contacto.

**Repositorio:** [github.com/didier15774/portfolio-edinson-delgado](https://github.com/didier15774/portfolio-edinson-delgado)

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
| Contacto | PHP aislado (`public/api/contact.php`) |
| Despliegue | Hostinger — carpeta `dist/` en `public_html` |

Sin React, Vue, Tailwind ni base de datos en esta versión.

---

## Funcionalidades

- Hero profesional con especialidades y CTAs (proyectos, CV, contacto)
- Tres **recorridos compartibles** en un solo sitio: `/genexus/`, `/modernizacion/`, `/innovacion/`
- Casos de estudio: **AProbar**, **Clicks**, **Proyecto Colmena**
- Metodología **HEXYN** (IA como acelerador bajo control humano)
- Línea de tiempo profesional (Sofis, UST, Colmena)
- Formulario de contacto con validación servidor, honeypot y SMTP opcional
- SEO condicional: canonical, Open Graph y sitemap solo con `PUBLIC_SITE_URL`
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
/experiencia/               Timeline profesional
/contacto/                 Formulario + canales directos
/cv/                       Descarga de CV (PDF)
```

---

## Instalación local

**Requisitos:** Node.js ≥ 22.12, npm ≥ 10

```bash
git clone https://github.com/didier15774/portfolio-edinson-delgado.git
cd portfolio-edinson-delgado
npm install
npm run dev        # http://localhost:4321
```

### Comandos útiles

```bash
npm run check      # TypeScript / Astro diagnostics
npm run build      # Genera dist/ (sin URL absoluta)
npm run build:prod # Requiere PUBLIC_SITE_URL
npm run preview    # Sirve dist/ — usar esto, no abrir dist/index.html directo
npm test           # Build + pruebas de rutas y validación
```

> **Importante:** Los estilos se cargan desde `/_astro/`. Abrir `dist/index.html` con `file://` no funciona; usar `npm run dev` o `npm run preview`.

---

## Despliegue (Hostinger)

```bash
PUBLIC_SITE_URL=https://tudominio.com npm run build:prod
# Subir contenido de dist/ → public_html/
# Crear public_html/api/contact.config.php desde contact.config.example.php
```

Guía completa: [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md)

---

## Capturas

Identidad visual: azul marino, turquesa, estética tecnológica profesional (inspirada conceptualmente en StackCraft), tipografía legible y diseño responsive.

Para previsualizar:

```bash
npm run dev
```

Abrir `http://localhost:4321/` — inicio con hero, recorridos y proyectos; `/contacto/` con formulario; `/proyectos/aprobar/` con caso de estudio.

---

## Estado del proyecto

| Área | Estado |
|------|--------|
| Sitio estático (15 rutas) | Completado |
| Formulario PHP | Implementado — requiere `contact.config.php` en servidor |
| Dominio de producción | Pendiente (`PUBLIC_SITE_URL`) |
| Capturas de proyectos | Estructura lista; imágenes pendientes |
| Despliegue Hostinger | Pendiente |

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [AGENTS.md](./AGENTS.md) | Guía para agentes y colaboradores |
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Producto y mapa del sitio |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Arquitectura técnica |
| [docs/SECURITY.md](./docs/SECURITY.md) | Seguridad del formulario |
| [docs/DEPLOYMENT_HOSTINGER.md](./docs/DEPLOYMENT_HOSTINGER.md) | Despliegue |

---

## Contacto

- **Edinson Delgado** — [it.edelgado@gmail.com](mailto:it.edelgado@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/edinsondelgado/)
- [GitHub](https://github.com/didier15774)

---

## Licencia

Contenido y código propiedad de Edinson Delgado. Dependencias sujetas a sus licencias respectivas.
