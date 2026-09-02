export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi/' },
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Proyectos', href: '/proyectos/' },
  { label: 'GeneXus', href: '/genexus/' },
  { label: 'HEXYN', href: '/hexyn/' },
  { label: 'Experiencia', href: '/experiencia/' },
  { label: 'Contacto', href: '/contacto/' },
];

export const journeyNavigation: NavItem[] = [
  { label: 'GeneXus', href: '/genexus/' },
  { label: 'Modernización', href: '/modernizacion/' },
  { label: 'Innovación', href: '/innovacion/' },
];
