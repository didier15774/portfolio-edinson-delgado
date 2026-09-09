# CONTENT.md — Portfolio Edinson Delgado

Inventario de contenidos, tono editorial y datos pendientes.

## Tono editorial

- Primera persona solo en «Sobre mí» y citas; resto en tercera persona o impersonal profesional
- Verbos de acción: construir, modernizar, integrar, liderar, desplegar
- Evitar adjetivos vacíos («apasionado», «gurú», «ninja»)
- Cifras y hechos verificables cuando existan

## Contenido por página

### Inicio (`/`)

| Elemento | Contenido |
|----------|-----------|
| Título H1 | Desarrollador de software senior y líder técnico |
| Subtítulo | 20 años construyendo y modernizando sistemas empresariales |
| Especialidades | GeneXus · Web · Mobile · Escritorio · APIs · Modernización · IA aplicada |
| CTA primario | Ver proyectos → `/proyectos` |
| CTA secundario | Descargar CV → `/cv` |
| CTA terciario | Contactar → `/contacto` |

### Sobre mí (`/sobre-mi`)

**Redacción publicada** en `src/data/about.ts`:

- Desarrollador de software con 20 años de experiencia en diseño, desarrollo y evolución de sistemas empresariales
- Experiencia en todo el ciclo de vida del software
- Liderazgo técnico de equipos y comunicación con stakeholders
- Base en Canelones, Uruguay; trabajo con equipos locales e internacionales

### Servicios (`/servicios`)

1. **Desarrollo GeneXus Senior** — Aplicaciones nuevas, evolución de KBs, integraciones, performance
2. **Mantenimiento y evolución** — Soporte productivo, corrección, mejoras incrementales
3. **Modernización e integración** — APIs REST/SOAP, migraciones, interoperabilidad
4. **Desarrollo con agentes de IA (HEXYN)** — Aceleración controlada con revisión humana

### GeneXus (`/genexus` + sección dedicada)

| Tema | Contenido |
|------|-----------|
| Versiones | GeneXus 9 → 18, conocimiento GeneXus Next |
| Herramientas | WorkWithPlus, K2BTools, PXTools, GAM, GX Server |
| Bases de datos | MySQL, SQL Server, Oracle, PostgreSQL |
| Integraciones | SOAP, REST, JSON, XML |
| Servicios | Migraciones, mantenimiento, evolución, desarrollo greenfield |

### HEXYN (`/hexyn`)

Pasos del proceso:

1. **Requisitos y análisis** — Relevamiento, alcance, criterios de aceptación
2. **Implementación con agentes** — Generación asistida bajo estándares definidos
3. **Revisión humana** — Validación técnica, seguridad y coherencia arquitectónica
4. **Pruebas / QA** — Casos funcionales, regresión, validación con usuario
5. **Despliegue** — Entrega controlada a producción
6. **Soporte** — Seguimiento post-entrega

Mensaje clave: *La IA acelera; la experiencia humana garantiza calidad y responsabilidad.*

### Experiencia (`/experiencia`)

Timeline extensible (`src/data/experience.ts`). Objetivo publicado: **5–7 hitos**. Ampliación pendiente del PDF exportado del LinkedIn oficial (sin inventar cargos ni fechas).

| Empresa | Rol | Período | Notas |
|---------|-----|---------|-------|
| Sofis Solutions | Desarrollador GeneXus Senior | abril 2024 — enero 2026 | GeneXus Senior en producción; SeCIU como cliente público pendiente de indicar |
| Universal Soluciones Tecnológicas | Líder de Innovación y Desarrollo | marzo 2021 — febrero 2024 | Innovación y desarrollo |
| Colmena | Fundador y Director | mayo 2016 — actualidad | Antes Colmena Comunidad Digital |
| Experiencias iniciales / Consorcio del Uruguay / otros | **Pendiente** | **Pendiente** | Completar desde LinkedIn PDF |

### Contacto (`/contacto`)

| Campo | Valor |
|-------|-------|
| Email | edelgado@proyectocolmena.com |
| LinkedIn | https://www.linkedin.com/in/edinsondelgado/ |
| GitHub | https://github.com/didier15774 |
| Ubicación | Canelones, Uruguay |
| Disponibilidad | Presencial, híbrida y remota — Montevideo, remoto, internacional |

Campos del formulario: nombre, email, asunto, mensaje, honeypot (oculto).

---

## Casos de estudio

### AProbar (`/proyectos/aprobar`)

| Campo | Contenido |
|-------|-----------|
| Resumen | Plataforma de muestreo de productos e inteligencia del consumidor |
| Estado | En producción |
| Problema | Centralizar campañas de muestreo, productos, proveedores e inteligencia del consumidor |
| Solución | Plataforma web: campañas, productos, proveedores, CRM, reclutamiento, aprendizaje y automatizaciones, con APIs REST |
| Responsabilidad Edinson | Arquitectura, desarrollo full-stack, evolución continua e integración de módulos y APIs |
| Funcionalidades | Campañas, productos, proveedores, CRM, reclutamiento, módulo de aprendizaje, automatizaciones |
| Arquitectura | Web PHP + MySQL, frontend JS/HTML/CSS, capa REST (descripción de alto nivel; sin infraestructura real) |
| Tecnologías | PHP, MySQL, JavaScript, HTML, CSS, REST, servicios web |
| Resultados | Sin métricas numéricas publicadas |
| Capturas | Portada promocional publicada (`aprobar-cover.webp`) y logo |

### Clicks (`/proyectos/clicks`)

| Campo | Contenido |
|-------|-----------|
| Resumen | Gestión de mantenimiento en campo desde dispositivos móviles |
| Estado | En producción |
| Problema | Trazabilidad de clientes, edificios, unidades, elementos y evidencia fotográfica en campo |
| Solución | Sistema web: clientes, edificios, unidades, elementos, trabajos, fotografías, frecuencias, historial e informes PDF |
| Responsabilidad Edinson | Diseño, desarrollo y mantenimiento en producción; interfaz responsive e informes |
| Funcionalidades | Gestión de clientes/edificios/unidades, órdenes de trabajo, evidencia fotográfica, frecuencias, historial, PDF |
| Arquitectura | Web PHP + MySQL, interfaz responsive para móvil, APIs de integración (alto nivel) |
| Tecnologías | PHP, MySQL, JavaScript, HTML, CSS, APIs, servicios web |
| Resultados | Sin métricas numéricas publicadas |
| Capturas | Portada promocional publicada (`clicks-cover.webp`) y logo |

### Proyecto Colmena (`/proyectos/colmena`)

| Campo | Contenido |
|-------|-----------|
| Resumen | Empresa y plataforma de presentación de servicios, metodología y soluciones de software |
| Estado | En producción (actividad vigente desde 2016) |
| Problema | Presentar con claridad servicios, metodología y soluciones de software |
| Solución | Plataforma de presentación evolucionada desde Colmena Comunidad Digital hacia Proyecto Colmena |
| Responsabilidad Edinson | Fundación, dirección y evolución; metodología y propuesta comercial |
| Tecnologías | Astro, PHP, CSS |
| Resultados | Sin métricas numéricas publicadas |
| Capturas | Portada promocional publicada (`colmena-cover.webp`) |

---

## Recorridos (journeys) — capacidades complementarias

No son niveles jerárquicos. Cada URL profundiza una capacidad del mismo perfil.

### `/genexus` — GeneXus
- **Headline**: Desarrollo GeneXus Senior para sistemas empresariales
- **Subheadline**: Mantenimiento, evolución e integración de aplicaciones en producción
- **CTA**: Ver experiencia GeneXus → ancla o `/genexus#experiencia`

### `/modernizacion` — Modernización
- **Headline**: Liderazgo técnico y modernización de sistemas críticos
- **Subheadline**: Integraciones, migraciones y evolución arquitectónica con enfoque en continuidad operativa
- **CTA**: Ver proyectos → `/proyectos`

### `/innovacion` — Innovación
- **Headline**: Innovación y desarrollo agéntico con control técnico humano
- **Subheadline**: IA aplicada, automatización y dirección tecnológica mediante metodología HEXYN
- **CTA**: Conocer HEXYN → `/hexyn`

---

## SEO — títulos por ruta

| Ruta | Title (≤ 60 chars) |
|------|---------------------|
| `/` | Edinson Delgado — Desarrollador senior y líder técnico |
| `/sobre-mi` | Sobre mí — Edinson Delgado |
| `/servicios` | Servicios — Edinson Delgado |
| `/proyectos` | Proyectos — Edinson Delgado |
| `/genexus` | GeneXus Senior — Edinson Delgado |
| `/modernizacion` | Modernización de sistemas — Edinson Delgado |
| `/innovacion` | Innovación e IA aplicada — Edinson Delgado |
| `/hexyn` | Metodología HEXYN — Edinson Delgado |
| `/experiencia` | Experiencia profesional — Edinson Delgado |
| `/contacto` | Contacto — Edinson Delgado |

---

## Datos faltantes (requieren input de Edinson)

### Críticos (bloquean contenido final)

- [x] **CV en PDF** — archivo: `Edinson_Delgado_CV_2026.pdf` → `public/cv/`
- [ ] **PDF exportado del LinkedIn** — completar timeline a 5–7 hitos (cargos, fechas, highlights verificados)
- [ ] **Roles, fechas y descripciones** en Sofis Solutions, UST y Colmena (detalle)
- [ ] **Métricas de resultado verificables** en AProbar, Clicks y Colmena
- [x] **Capturas de pantalla promocionales** — portadas WebP publicadas (revisar residuales: etiqueta «Panel Interno» en AProbar y «v1.6» en ClickS)
- [x] **Dominio final** del portfolio — `https://edinson.proyectocolmena.com`
- [x] **Foto profesional** — `public/images/profile/`

### Importantes (mejoran credibilidad)

- [ ] Diagramas de arquitectura simplificados por proyecto
- [ ] Testimonios o referencias (con permiso) — estructura en `src/data/recommendations.ts`; sección oculta hasta `authorized: true`
- [ ] Certificaciones GeneXus u otras
- [ ] Idiomas y nivel (español nativo, inglés técnico, etc.)
- [ ] Disponibilidad horaria / modalidad preferida (remoto, híbrido)

### Configuración despliegue

- [x] `contact.config.php` presente en servidor (el endpoint no responde 503)
- [ ] Entrega de correo SMTP comprobada con un mensaje real de prueba
- [x] Email destino del formulario: `edelgado@proyectocolmena.com`

---

## Criterios de aceptación (contenido)

- [ ] Cero lorem ipsum o placeholders visibles en producción
- [ ] Tres casos con estructura homogénea completa
- [ ] Timeline con 5–7 entradas verificables (hoy: 3 publicadas; resto pendiente LinkedIn PDF)
- [ ] Todos los enlaces externos válidos
- [ ] Mensaje HEXYN coherente en `/innovacion` y `/hexyn`
