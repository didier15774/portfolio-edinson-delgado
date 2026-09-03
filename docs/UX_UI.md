# UX_UI.md — Portfolio Edinson Delgado

## Referencia conceptual

Inspiración: estética **StackCraft** — tecnológica, moderna, profesional. **No copiar** código, assets ni elementos con licencia restrictiva.

## Personalidad de marca

| Atributo | Sí | No |
|----------|----|----|
| Tono | Senior, empresarial, confiable | Juvenil excesivo, startup hype |
| Visual | Azul marino, naranja, claridad | Neón, cyberpunk, videojuego |
| Motion | Transiciones suaves, discretas | Animaciones gratuitas, parallax pesado |
| Imágenes | Capturas reales de proyectos | Stock genérico de bancos |

## Paleta de colores (tokens)

```css
/* tokens.css — valores previstos */
--color-navy-900: #0a1728;      /* Fondo oscuro principal */
--color-navy-800: #13263d;
--color-orange-500: #f47a16;    /* Acento principal / CTA */
--color-orange-400: #ff9233;
--color-light-bg: #f3f5f7;      /* Fondo claro */
--color-text-dark: #1c2733;     /* Texto cuerpo (modo claro) */
```

### Uso de fondos

- **Modo claro (default)**: `--color-slate-50` base, secciones alternas `--color-white` o `--color-slate-100`
- **Modo oscuro (opcional)**: `--color-navy-900` base, texto `--color-slate-100`
- **Hero / recorridos**: gradiente sutil navy → blue con overlay; sin efectos de partículas

## Tipografía

| Rol | Familia | Fallback | Peso |
|-----|---------|----------|------|
| Títulos | `"Plus Jakarta Sans"` o `"DM Sans"` | system-ui, sans-serif | 600–700 |
| Cuerpo | `"Inter"` o `"Source Sans 3"` | system-ui, sans-serif | 400–500 |
| Código / tags tech | `"JetBrains Mono"` | monospace | 400 |

- Cargar solo pesos necesarios (400, 500, 600, 700)
- `font-display: swap`
- Escala tipográfica fluida con `clamp()`

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-hero: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
```

## Espaciado y layout

```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2rem;
--space-2xl: 3rem;
--space-3xl: 4rem;
--space-section: clamp(3rem, 5vw, 6rem);

--container-max: 72rem;   /* 1152px */
--container-narrow: 48rem; /* textos largos */
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--shadow-sm: 0 1px 2px rgb(10 22 40 / 0.06);
--shadow-md: 0 4px 12px rgb(10 22 40 / 0.08);
--transition-base: 200ms ease;
```

## Breakpoints

| Nombre | Min-width | Uso |
|--------|-----------|-----|
| xs | 360px | Móvil pequeño (mínimo soportado) |
| sm | 640px | Móvil grande |
| md | 768px | Tablet |
| lg | 1024px | Escritorio |
| xl | 1280px | Escritorio amplio |

Enfoque: **mobile-first**.

## Componentes UI

### Botones

- **Primary**: fondo `--color-teal-500`, texto blanco, hover oscurecer 10%
- **Secondary**: borde `--color-blue-600`, fondo transparente
- **Ghost**: solo texto con subrayado en hover
- Tamaño mínimo táctil: 44×44 px
- Estado focus: anillo 2px `--color-focus`, offset 2px

### Cards (proyectos, servicios)

- Borde sutil `1px solid rgb(10 22 40 / 0.08)`
- `border-radius: --radius-lg`
- Hover: elevación `--shadow-md`, sin transform exagerado (máx. `translateY(-2px)`)

### Chips (tecnologías, especialidades)

- Fondo `--color-navy-800` al 8% opacidad en modo claro
- Tipografía mono, tamaño `--text-xs`

### Navegación

- Header sticky con blur backdrop ligero
- Menú hamburguesa en `< md` con trap de foco básico
- Indicador de página activa
- En recorridos: badge discreto del nivel (1/2/3) en hero, no en nav global

## Recorridos visuales

Cada ruta (`/genexus`, `/modernizacion`, `/innovacion`) comparte layout pero varía:

| Recorrido | Acento dominante | Iconografía sugerida |
|-----------|------------------|----------------------|
| GeneXus | Azul `--color-blue-600` | Capas / módulos empresariales |
| Modernización | Navy + teal | Integración / flechas |
| Innovación | Teal + gradiente suave | Red/nodos (sin cliché de robot) |

## Microinteracciones permitidas

- Fade-in suave al scroll (solo si `prefers-reduced-motion: no-preference`)
- Transición de color en links y botones (200ms)
- Menú móvil: slide + fade
- Formulario: estados visuales claros (idle, loading, success, error)

## Accesibilidad visual

- Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- Focus visible en todos los interactivos
- No depender solo del color para estados de error
- `prefers-reduced-motion`: desactivar animaciones no esenciales

## Wireframes de referencia (bloques)

### Inicio
```
[Header]
[Hero: título + subtítulo + 3 CTAs]
[Especialidades: chips]
[Proyectos destacados: 3 cards]
[CTA contacto]
[Footer]
```

### Caso de estudio
```
[Breadcrumb]
[Título + estado + resumen]
[Problema | Solución: 2 columnas en lg]
[Responsabilidades + funcionalidades]
[Arquitectura: diagrama ASCII o lista]
[Tech stack chips]
[Galería capturas]
[Resultados]
[CTA: contactar sobre proyecto similar]
```

## Criterios de aceptación (UX/UI)

- [ ] Legible en 360px sin scroll horizontal
- [ ] Jerarquía visual clara: hero → evidencia → acción
- [ ] Tres recorridos visualmente distinguibles sin romper identidad
- [ ] Sin fotos stock genéricas
- [ ] Lighthouse Accessibility ≥ 90
