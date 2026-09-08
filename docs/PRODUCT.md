# PRODUCT.md — Portfolio Edinson Delgado

## Visión

Convertir la trayectoria de Edinson Delgado en evidencia verificable que genere confianza en reclutadores, empresas que buscan contractors y clientes directos.

## Problema que resuelve el producto

Los perfiles genéricos no comunican impacto real. Este portfolio debe responder en cada visita:

1. ¿Qué problemas puede resolver Edinson?
2. ¿Qué experiencia real posee?
3. ¿Qué sistemas ha construido?
4. ¿Cómo trabaja?
5. ¿Cómo contactarlo correctamente?

## Audiencias

| Audiencia | Necesidad | Recorrido preferido |
|-----------|-----------|---------------------|
| Reclutadores / RRHH técnico | Rol, seniority, stack, disponibilidad | Inicio → Experiencia → CV |
| CTO / gerente de TI | Modernización, liderazgo, sistemas críticos | `/modernizacion` → Proyectos |
| Equipos GeneXus / partners | Experiencia GX, bases, integraciones | `/genexus` → GeneXus |
| Clientes potenciales / founders | Servicios, metodología, IA aplicada | `/innovacion` → HEXYN → Contacto |

## Propuesta de valor (mensaje principal)

**Desarrollador de software senior y líder técnico** con 20 años construyendo y modernizando sistemas empresariales.

Especialidades: GeneXus Senior, desarrollo full-stack, modernización e integración, desarrollo asistido por agentes de IA bajo control técnico humano.

## Tres recorridos compartibles (capacidades complementarias)

Cada recorrido es una ruta con hero, mensajes y CTAs contextualizados. No son niveles jerárquicos: son **capacidades complementarias** del mismo perfil. La navegación global permanece.

| Ruta | Capacidad | Enfoque comercial |
|------|-----------|-------------------|
| `/genexus` | GeneXus | Desarrollo, mantenimiento y evolución de aplicaciones empresariales GeneXus |
| `/modernizacion` | Modernización | Liderazgo técnico, modernización, integraciones y sistemas críticos |
| `/innovacion` | Innovación | IA aplicada, agentes especializados, automatización y dirección tecnológica |

## Mapa del sitio

```
/                          Inicio (hero, especialidades, CTAs)
/sobre-mi                  Trayectoria, ciclo completo, liderazgo
/servicios                 Oferta de servicios
/proyectos                 Índice de casos de estudio
/proyectos/aprobar         Caso AProbar
/proyectos/clicks          Caso Clicks
/proyectos/colmena         Caso Proyecto Colmena
/genexus                   Recorrido GeneXus + profundidad GeneXus
/modernizacion             Recorrido modernización
/innovacion                Recorrido innovación + HEXYN
/hexyn                     Metodología HEXYN (también enlazada desde innovación)
/experiencia               Línea de tiempo profesional
/contacto                  Formulario + datos de contacto
/cv                        Descarga de CV (PDF)
/404                       Página no encontrada
```

### Recursos estáticos

```
/robots.txt
/sitemap.xml
/assets/...                Imágenes optimizadas (AVIF/WebP)
/api/contact.php           Endpoint de formulario (PHP en Hostinger)
```

## Secciones y contenido mínimo

### Inicio
- Título: Desarrollador de software senior y líder técnico
- Subtítulo: 20 años construyendo y modernizando sistemas empresariales
- Especialidades en chips o lista breve
- CTAs: Ver proyectos, Descargar CV, Contactar

### Sobre Edinson
- Trayectoria resumida
- Ciclo completo: relevamiento → arquitectura → implementación → QA → despliegue → soporte
- Liderazgo de equipos y relación con clientes

### Servicios
- Desarrollo GeneXus Senior
- Mantenimiento y evolución de sistemas empresariales
- Modernización e integración de aplicaciones
- Desarrollo integral asistido por agentes de IA

### Proyectos (casos de estudio)
Cada caso incluye: problema, solución, responsabilidad, funcionalidades, arquitectura, tecnologías, estado, capturas, resultados verificables.

Proyectos iniciales: **AProbar**, **Clicks**, **Proyecto Colmena**.

### GeneXus
- GX 9 → GX 18, conocimiento GX Next
- WorkWithPlus, K2BTools, PXTools, GAM, GX Server
- Bases: MySQL, SQL Server, Oracle, PostgreSQL
- SOAP, REST, JSON, XML
- Migraciones, mantenimiento, evolución, sistemas nuevos

### HEXYN
Proceso: requisitos → implementación con agentes → revisión humana → QA → despliegue → soporte. IA como acelerador, no sustituto.

### Experiencia
Línea de tiempo: Sofis Solutions, Universal Soluciones Tecnológicas, Colmena y experiencias anteriores relevantes (ampliación pendiente del LinkedIn PDF; objetivo 5–7 hitos).

### Contacto
- Formulario funcional
- Email: edelgado@proyectocolmena.com
- LinkedIn: https://www.linkedin.com/in/edinsondelgado/
- GitHub: https://github.com/didier15774
- Ubicación: Canelones, Uruguay — Montevideo, remoto, internacional

## Métricas de éxito

| Métrica | Objetivo |
|---------|----------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse Best Practices | ≥ 90 |
| Lighthouse SEO | ≥ 90 |
| Tiempo hasta comprensión del perfil | < 30 s en inicio |
| Formulario de contacto | Entrega exitosa con validación servidor |
| Errores consola (rutas críticas) | 0 |

## Plan de ejecución y commits

| Bloque | Entregable | Commit sugerido |
|--------|------------|-----------------|
| 1 | Docs + tokens CSS + scaffold Astro | `docs: arquitectura y sistema visual base` |
| 2 | Layout, nav, rutas de recorridos | `feat: estructura global y rutas por recorrido` |
| 3 | Inicio + sobre mí | `feat: inicio y perfil profesional` |
| 4 | Servicios + GeneXus | `feat: servicios y sección genexus` |
| 5 | Casos de estudio | `feat: casos aprobar clicks colmena` |
| 6 | HEXYN + experiencia + contacto | `feat: hexyn experiencia y contacto` |
| 7 | SEO, a11y, rendimiento | `chore: seo accesibilidad y optimización` |
| 8 | QA + despliegue | `chore: qa final y guía hostinger` |

## Fuera de alcance (v1)

- Blog o CMS
- Base de datos
- Autenticación de usuarios
- Panel de administración
- Internacionalización (i18n) — español únicamente en v1
- Animaciones pesadas o librerías de motion

## Criterios de aceptación (producto)

- [ ] Un visitante identifica rol, años de experiencia y especialidades en la primera pantalla
- [ ] Tres URLs compartibles (`/genexus`, `/modernizacion`, `/innovacion`) con mensaje diferenciado como capacidades complementarias
- [ ] Al menos tres casos de estudio completos con estructura homogénea
- [ ] Formulario de contacto operativo en Hostinger
- [ ] CV descargable desde CTA principal
- [ ] Sin contenido placeholder ni lorem ipsum en producción
- [ ] Documentación en `docs/` coherente con lo implementado
