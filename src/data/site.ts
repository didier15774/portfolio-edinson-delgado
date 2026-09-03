/**
 * Configuración central del sitio.
 * URL pública: definir PUBLIC_SITE_URL al desplegar (ver src/lib/site-url.ts).
 */

export const siteConfig = {
  name: 'Edinson Delgado',
  role: 'Desarrollador GeneXus Senior y constructor de soluciones empresariales',
  tagline: 'Edinson Delgado',
  locale: 'es_UY',
  language: 'es',

  email: 'it.edelgado@gmail.com',
  linkedin: 'https://www.linkedin.com/in/edinsondelgado/',
  github: 'https://github.com/didier15774',

  location: {
    city: 'Canelones',
    country: 'Uruguay',
    label: 'Canelones, Uruguay',
  },

  availability: {
    modes: ['presencial', 'híbrida', 'remota'] as const,
    areas: ['Montevideo', 'remoto', 'proyectos internacionales'],
    label: 'Disponibilidad presencial, híbrida y remota',
  },

  cv: {
    filename: 'Edinson_Delgado_CV_2026.pdf',
    path: '/cv/Edinson_Delgado_CV_2026.pdf',
  },

  profile: {
    image: {
      jpg: '/images/profile/edinson-portfolio-2026.jpg',
      webp: '/images/profile/edinson-portfolio-2026.webp',
      width: 681,
      height: 1024,
      alt: 'Retrato profesional de Edinson Delgado, desarrollador GeneXus Senior, con saco gris y camisa azul sobre fondo oscuro.',
    },
  },

  specialties: [
    'GeneXus Senior',
    'Desarrollo full-stack',
    'Modernización de sistemas',
    'Desarrollo asistido por agentes de IA',
  ],

  theme: {
    default: 'dark' as const,
    storageKey: 'portfolio-theme',
  },
} as const;

export type AvailabilityMode = (typeof siteConfig.availability.modes)[number];
export type ThemeMode = 'light' | 'dark';
