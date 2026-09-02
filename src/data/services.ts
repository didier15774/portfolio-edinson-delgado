export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    id: 'genexus-senior',
    title: 'Desarrollo GeneXus Senior',
    description:
      'Aplicaciones nuevas, evolución de knowledge bases, integraciones y optimización de sistemas en producción.',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y evolución',
    description:
      'Soporte productivo, corrección, mejoras incrementales y continuidad operativa de plataformas empresariales.',
  },
  {
    id: 'modernizacion',
    title: 'Modernización e integración',
    description:
      'APIs REST y SOAP, migraciones controladas e interoperabilidad entre sistemas legados y componentes modernos.',
  },
  {
    id: 'hexyn',
    title: 'Desarrollo asistido por agentes de IA',
    description:
      'Aceleración de entrega con metodología HEXYN: implementación asistida, revisión humana y QA antes de producción.',
  },
];
