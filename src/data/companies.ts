/**
 * Empresas y proyectos para el carrusel de confianza.
 * Solo se muestran entradas con `validated: true`.
 * Logos opcionales: agregar `logoSrc` cuando Edinson entregue o autorice el archivo.
 */

export interface CompanyEntry {
  id: string;
  name: string;
  logoSrc?: string;
  logoAlt?: string;
  /** Nombre o logo validado para publicación. */
  validated: boolean;
  order: number;
}

export const companies: CompanyEntry[] = [
  { id: 'sofis', name: 'Sofis Solutions', validated: true, order: 1 },
  {
    id: 'ust',
    name: 'Universal Soluciones Tecnológicas',
    validated: true,
    order: 2,
  },
  { id: 'colmena', name: 'Proyecto Colmena', validated: true, order: 3 },
  { id: 'itools', name: 'Itools.uy', validated: true, order: 4 },
  { id: 'insis', name: 'INSIS SAS', validated: true, order: 5 },
  { id: 'consorcio', name: 'Consorcio del Uruguay', validated: true, order: 6 },
  { id: 'puntoexe', name: 'PuntoExe Consultores', validated: true, order: 7 },
];

export function getPublishedCompanies(): CompanyEntry[] {
  return companies
    .filter((item) => item.validated)
    .sort((a, b) => a.order - b.order);
}
