/**
 * Empresas y proyectos para el carrusel de confianza.
 * Solo se muestran entradas con `validated: true`.
 *
 * Logos: colocar archivos autorizados en `public/images/companies/`
 * y referenciarlos con `logoSrc` (ej. `/images/companies/sofis.webp`).
 * Sin archivo, se muestra el nombre tipográfico.
 */

export interface CompanyEntry {
  id: string;
  name: string;
  /** Ruta pública del logo (opcional hasta que exista el archivo). */
  logoSrc?: string;
  /** Texto alternativo accesible; por defecto usa el nombre. */
  logoAlt?: string;
  /** Ancho intrínseco sugerido para evitar layout shift. */
  logoWidth?: number;
  /** Alto intrínseco sugerido para evitar layout shift. */
  logoHeight?: number;
  /** Nombre o logo validado para publicación. */
  validated: boolean;
  order: number;
}

export const companies: CompanyEntry[] = [
  {
    id: 'sofis',
    name: 'Sofis Solutions',
    logoAlt: 'Logo de Sofis Solutions',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 1,
  },
  {
    id: 'ust',
    name: 'Universal Soluciones Tecnológicas',
    logoAlt: 'Logo de Universal Soluciones Tecnológicas',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 2,
  },
  {
    id: 'colmena',
    name: 'Proyecto Colmena',
    logoAlt: 'Logo de Proyecto Colmena',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 3,
  },
  {
    id: 'itools',
    name: 'Itools.uy',
    logoAlt: 'Logo de Itools.uy',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 4,
  },
  {
    id: 'insis',
    name: 'INSIS SAS',
    logoAlt: 'Logo de INSIS SAS',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 5,
  },
  {
    id: 'consorcio',
    name: 'Consorcio del Uruguay',
    logoAlt: 'Logo de Consorcio del Uruguay',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 6,
  },
  {
    id: 'puntoexe',
    name: 'PuntoExe Consultores',
    logoAlt: 'Logo de PuntoExe Consultores',
    logoWidth: 160,
    logoHeight: 48,
    validated: true,
    order: 7,
  },
];

export function getPublishedCompanies(): CompanyEntry[] {
  return companies
    .filter((item) => item.validated)
    .sort((a, b) => a.order - b.order);
}
