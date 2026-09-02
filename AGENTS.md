# AGENTS.md — Portfolio Edinson Delgado

Guía operativa para agentes de IA y colaboradores que trabajen en este repositorio.

## Propósito del proyecto

Portfolio profesional estático orientado a generar oportunidades laborales, contratos como contractor y clientes propios. No es un currículum decorativo: cada sección debe demostrar capacidad real de resolver problemas empresariales.

## Stack obligatorio

| Capa | Tecnología |
|------|------------|
| Framework | Astro 7.x (output: `static`) |
| Lenguaje | TypeScript (strict) |
| Estilos | CSS con variables de diseño (sin Tailwind salvo decisión documentada) |
| Interactividad | JavaScript mínimo, solo donde sea necesario |
| Contacto | PHP aislado en `public/api/contact.php` |
| Producción | `dist/` subido a Hostinger, sin Node.js permanente |

## Documentación viva

Antes de cambiar alcance, arquitectura, navegación o identidad visual, actualizar el documento correspondiente en `docs/` y registrar la decisión en `docs/DECISIONS.md`.

| Documento | Cuándo actualizar |
|-----------|-------------------|
| `docs/PRODUCT.md` | Objetivos, audiencias, recorridos por nivel |
| `docs/ARCHITECTURE.md` | Estructura de carpetas, build, datos, rutas |
| `docs/UX_UI.md` | Tokens, componentes visuales, breakpoints |
| `docs/CONTENT.md` | Textos, casos de estudio, metadatos |
| `docs/SECURITY.md` | Formulario, secretos, validaciones |
| `docs/SEO_ACCESSIBILITY.md` | SEO, OG, a11y |
| `docs/QA.md` | Pruebas y criterios de aceptación |
| `docs/DEPLOYMENT_HOSTINGER.md` | Despliegue y configuración servidor |

## Reglas de implementación

1. **Minimizar alcance**: cambios focalizados; no refactorizar sin necesidad.
2. **Convenciones del repo**: leer código existente antes de añadir archivos.
3. **Sin secretos en git**: credenciales de correo y dominio solo en `contact.config.php` (fuera del repo o en `.gitignore`).
4. **Sin base de datos** en v1.
5. **Sin React SPA ni Next.js**.
6. **Casos de estudio extensibles**: nuevos proyectos vía archivos en `src/content/projects/` sin reescribir componentes.
7. **Tres recorridos compartibles**: `/genexus`, `/modernizacion`, `/innovacion` — un solo sitio, no tres sitios independientes.
8. **Commits por bloque funcional** (ver plan en `docs/PRODUCT.md`).

## Plan de bloques (orden de commits)

1. Documentación, arquitectura y sistema visual
2. Estructura global, navegación y rutas por nivel
3. Inicio y perfil profesional
4. Servicios y GeneXus
5. Casos AProbar, Clicks y Proyecto Colmena
6. HEXYN, experiencia y contacto
7. SEO, accesibilidad, rendimiento y seguridad
8. QA final y despliegue en Hostinger

## Comandos útiles

```bash
npm install
npm run dev      # desarrollo local
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
npm run test     # pruebas (build + navegación + formulario)
```

## Datos sensibles pendientes del humano

Ver sección «Datos faltantes» en `docs/CONTENT.md` y `docs/DEPLOYMENT_HOSTINGER.md`.

## Criterio de éxito global

Visitante comprende en < 30 segundos qué problemas resuelve Edinson, qué ha construido y cómo contactarlo. Lighthouse ≥ 90 en las cuatro categorías. Cero errores de consola en rutas críticas.
