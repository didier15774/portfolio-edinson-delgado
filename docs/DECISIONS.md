# DECISIONS.md — Registro de decisiones

Formato: **ADR** (Architecture Decision Record). Toda decisión importante se registra aquí antes o al implementar.

---

## ADR-001: Astro 7.x con output estático

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Se requiere sitio rápido, desplegable en Hostinger sin Node.js en producción.  
**Decisión:** Usar Astro 7.2.x (última estable) con `output: 'static'`.  
**Consecuencias:**  
- (+) HTML estático, excelente rendimiento  
- (+) Compatible con hosting compartido  
- (-) Formulario requiere PHP separado  
- Requiere Node ≥ 22.12 en desarrollo  

---

## ADR-002: CSS con variables, sin Tailwind en v1

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** El prompt permite Tailwind solo si reduce complejidad real. El diseño es acotado y con tokens definidos.  
**Decisión:** CSS modular con `tokens.css`, sin Tailwind.  
**Consecuencias:**  
- (+) Cero dependencia de build CSS adicional  
- (+) Control fino de identidad visual  
- (-) Más CSS manual si el sitio crece mucho  
- Revisar si el mantenimiento justifica Tailwind en v2  

---

## ADR-003: Content Collections para proyectos

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Debe poder añadir casos de estudio sin reescribir componentes.  
**Decisión:** Markdown + schema Zod en `src/content/projects/`.  
**Consecuencias:**  
- (+) Extensible, tipado, SSG automático  
- (+) Un archivo `.md` = un proyecto nuevo  
- (-) Imágenes gestionadas aparte en `public/images/projects/`  

---

## ADR-004: PHP aislado para formulario de contacto

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Hostinger soporta PHP; no hay backend Node en producción.  
**Decisión:** `public/api/contact.php` con config externa `contact.config.php`.  
**Consecuencias:**  
- (+) Simple, probado en hosting compartido  
- (+) Sin servicios externos de pago  
- (-) Depende de `mail()` o SMTP del host  
- (-) Rate limiting basado en archivos, no Redis  

---

## ADR-005: TypeScript strict

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Requisito del prompt y calidad a largo plazo.  
**Decisión:** `strict: true` en `tsconfig.json`.  
**Consecuencias:** Más rigor en desarrollo; menos errores en runtime.  

---

## ADR-006: Sin framework UI (React/Vue/Svelte)

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Prohibición explícita de React SPA y Next.js; minimizar JS.  
**Decisión:** Solo componentes `.astro` + scripts vanilla mínimos.  
**Consecuencias:**  
- (+) Mínimo JavaScript al cliente  
- (-) Interactividad compleja requiere más código manual  

---

## ADR-007: Tres recorridos, un solo sitio

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** Tres audiencias comerciales diferenciadas pero misma identidad.  
**Decisión:** Rutas `/genexus`, `/modernizacion`, `/innovacion` con `JourneyHero` parametrizado desde `src/data/journeys.ts`.  
**Consecuencias:** URLs compartibles; nav global común; contenido parcialmente reutilizado.  

---

## ADR-008: Tipografías Google Fonts

**Estado:** Propuesta (pendiente confirmación visual)  
**Fecha:** 2026-09-01  
**Contexto:** Legibilidad + estética tecnológica profesional.  
**Decisión propuesta:** Plus Jakarta Sans (títulos) + Inter (cuerpo) + JetBrains Mono (código).  
**Alternativa:** Fuentes del sistema si Lighthouse penaliza demasiado.  
**Consecuencias:** Dependencia de CDN; usar `preconnect` y subset latin.  

---

## ADR-009: Modo oscuro opcional

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Contexto:** UX_UI define fondos claros y oscuros con intención.  
**Decisión:** Modo oscuro como identidad principal (`data-theme="dark"` por defecto). Modo claro preparado en tokens CSS y toggle vía `theme.js` + `localStorage`.  
**Consecuencias:** Tokens semánticos en `tokens.css`; no auto-switch por `prefers-color-scheme`.

---

## ADR-012: Dominio centralizado

**Estado:** Aceptada (actualizada)  
**Fecha:** 2026-09-02  
**Contexto:** Dominio de producción definido.  
**Decisión:** `PUBLIC_SITE_URL=https://edinson.proyectocolmena.com` en `.env` (no versionado) y `.env.example`. Build productivo vía `scripts/build-prod.mjs`. Sin URL válida no se emiten canonical, OG absolutos ni sitemap.  
**Valor:** `https://edinson.proyectocolmena.com`

---

## ADR-013: Contacto vía SMTP Hostinger

**Estado:** Aceptada  
**Fecha:** 2026-09-02  
**Contexto:** Preferencia de SMTP en Hostinger; dominio definitivo conocido.  
**Decisión:** `contact.config.example.php` con `mail_from` y `allowed_origins` del dominio; credenciales solo en `contact.config.php` del servidor. Guía en `docs/SMTP_HOSTINGER.md`.  

---

## ADR-014: Recomendaciones con autorización explícita

**Estado:** Aceptada  
**Fecha:** 2026-09-02  
**Contexto:** Incluir referencias profesionales sin inventar contenido.  
**Decisión:** `src/data/recommendations.ts` con campos texto, nombre, cargo, empresa, relación y `authorized`. Solo se publican ítems autorizados; si la lista filtrada está vacía, la sección no se renderiza. Textos originales; solo correcciones de claridad aprobadas por el autor.  

---

## ADR-015: Rediseño visual portada 2026

**Estado:** Aceptada  
**Fecha:** 2026-09-02  
**Contexto:** Paquete `PROMPT_REDISENO_PORTFOLIO_2026.md` con nueva identidad, hero en dos columnas, bloque IA y carrusel de empresas.  
**Decisión:** Paleta navy + naranja (`#F47A16`); acento turquesa eliminado. Hero con foto en `public/images/profile/` (JPG + WebP). Secciones nuevas: `AiExecution`, `CompanyCarousel`. CV publicado como `Edinson_Delgado_CV_2026.pdf`. Logos de empresas solo cuando se entreguen; hasta entonces nombres tipográficos desde `src/data/companies.ts`.  

---

## ADR-016: Posicionamiento profesional sin niveles

**Estado:** Aceptada  
**Fecha:** 2026-09-03  
**Contexto:** La portada presentaba a Edinson de forma demasiado estrecha (solo GeneXus / web) y las capacidades aparecían como “Nivel 1/2/3”.  
**Decisión:** Rol unificado: “Desarrollador de software senior y líder técnico”. Capacidades complementarias en inicio sin niveles. CTA de contacto con mensaje de etapa progresiva según prioridades y presupuesto. Banda de empresas lista para logos reales en `public/images/companies/`.  

---

## ADR-010: trailingSlash

**Estado:** Aceptada  
**Fecha:** 2026-09-01  
**Decisión:** `trailingSlash: 'always'` — URLs tipo `/contacto/`.  

---

## Plantilla para nuevas decisiones

```markdown
## ADR-XXX: Título

**Estado:** Propuesta | Aceptada | Rechazada | Supersedida por ADR-YYY
**Fecha:** YYYY-MM-DD
**Contexto:** ...
**Decisión:** ...
**Consecuencias:** ...
```

---

## Decisiones rechazadas

| Idea | Motivo |
|------|--------|
| Next.js / React SPA | Prohibido por requisitos; innecesario para sitio estático |
| Base de datos | Fuera de alcance v1 |
| CMS headless | Complejidad y costo no justificados en v1 |
| Formspree / Netlify Forms | Cambia arquitectura; preferir PHP en Hostinger |
| Placeholders de recomendaciones | No mostrar sección vacía ni textos inventados |
