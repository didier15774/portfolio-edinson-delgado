/**
 * Empresas y proyectos para la banda de confianza.
 * Solo se muestran entradas con `validated: true`.
 *
 * Logos autorizados en `public/images/companies/` (lienzo 720 × 220).
 * Sin archivo, se muestra el nombre tipográfico.
 */

export interface CompanyEntry {
  id: string;
  name: string;
  /** Ruta pública del logo (opcional hasta que exista el archivo). */
  logoSrc?: string;
  /** Texto alternativo accesible; por defecto usa el nombre. */
  logoAlt?: string;
  /** Ancho intrínseco del lienzo (evita layout shift). */
  logoWidth?: number;
  /** Alto intrínseco del lienzo (evita layout shift). */
  logoHeight?: number;
  /** Nombre o logo validado para publicación. */
  validated: boolean;
  order: number;
}

const LOGO_WIDTH = 720;
const LOGO_HEIGHT = 220;

export const companies: CompanyEntry[] = [
  {
    id: 'sofis',
    name: 'Sofis Solutions',
    logoSrc: '/images/companies/sofis-gray.png',
    logoAlt: 'Logo de Sofis Solutions',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 1,
  },
  {
    id: 'ust',
    name: 'Universal Soluciones Tecnológicas',
    logoSrc: '/images/companies/universal-gray.png',
    logoAlt: 'Logo de Universal Soluciones Tecnológicas',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 2,
  },
  {
    id: 'colmena',
    name: 'Proyecto Colmena',
    logoSrc: '/images/companies/colmena-gray.png',
    logoAlt: 'Logo de Proyecto Colmena',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 3,
  },
  {
    id: 'aprobar',
    name: 'AProbar',
    logoSrc: '/images/companies/aprobar-gray.png',
    logoAlt: 'Logo de AProbar',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 4,
  },
  {
    id: 'clicks',
    name: 'ClickS',
    logoSrc: '/images/companies/clicks-gray.png',
    logoAlt: 'Logo de ClickS',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 5,
  },
  {
    id: 'itools',
    name: 'Itools.uy',
    logoSrc: '/images/companies/itools-gray.png',
    logoAlt: 'Logo de Itools.uy',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 6,
  },
  {
    id: 'insis',
    name: 'INSIS SAS',
    logoSrc: '/images/companies/insis-gray.png',
    logoAlt: 'Logo de INSIS SAS',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 7,
  },
  {
    id: 'consorcio',
    name: 'Consorcio del Uruguay',
    logoSrc: '/images/companies/consorcio-gray.png',
    logoAlt: 'Logo de Consorcio del Uruguay',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 8,
  },
  {
    id: 'puntoexe',
    name: 'PuntoExe Consultores',
    logoSrc: '/images/companies/puntoexe-gray.png',
    logoAlt: 'Logo de PuntoExe Consultores',
    logoWidth: LOGO_WIDTH,
    logoHeight: LOGO_HEIGHT,
    validated: true,
    order: 9,
  },
];

export function getPublishedCompanies(): CompanyEntry[] {
  return companies
    .filter((item) => item.validated)
    .sort((a, b) => a.order - b.order);
}
