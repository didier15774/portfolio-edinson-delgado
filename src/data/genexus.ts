export interface GenexusCapability {
  category: string;
  items: string[];
}

export const genexusProfile = {
  headline: 'Experiencia GeneXus de entorno productivo a evolución moderna',
  summary:
    'Trayectoria con GeneXus desde versiones 9 a 18, con pruebas prácticas en GeneXus Next y su enfoque agéntico.',
  versions: {
    from: 9,
    to: 18,
    next: 'Pruebas prácticas con GeneXus Next y enfoque agéntico',
  },
  capabilities: [
    {
      category: 'Versiones y plataforma',
      items: [
        'GeneXus 9 a GeneXus 18',
        'GeneXus Next — pruebas prácticas y enfoque agéntico',
        'WorkWithPlus, K2BTools, PXTools',
        'GAM, GX Server',
      ],
    },
    {
      category: 'Bases de datos',
      items: ['MySQL', 'SQL Server', 'Oracle', 'PostgreSQL'],
    },
    {
      category: 'Integraciones',
      items: ['SOAP', 'REST', 'JSON', 'XML'],
    },
    {
      category: 'Servicios',
      items: [
        'Migraciones',
        'Mantenimiento y evolución',
        'Desarrollo de sistemas nuevos',
        'Integración con ecosistemas existentes',
      ],
    },
  ] satisfies GenexusCapability[],
};
