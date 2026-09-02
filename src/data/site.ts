/**
 * Configuración central del sitio.
 * Cambiar DEFAULT_SITE_URL o PUBLIC_SITE_URL cuando el dominio esté definido.
 */

export const DEFAULT_SITE_URL = 'https://example.com';

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL as string | undefined;
  return (fromEnv ?? DEFAULT_SITE_URL).replace(/\/$/, '');
}

export const siteConfig = {
  name: 'Edinson Delgado',
  role: 'Senior Software Engineer / Technical Lead',
  tagline: '20 años construyendo y modernizando sistemas empresariales',
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
    filename: 'Edinson_Delgado_CV_GeneXus_Senior.pdf',
    path: '/cv/Edinson_Delgado_CV_GeneXus_Senior.pdf',
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
