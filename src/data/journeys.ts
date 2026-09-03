export interface JourneyConfig {
  slug: string;
  level: 1 | 2 | 3;
  path: string;
  headline: string;
  subheadline: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const journeys: Record<string, JourneyConfig> = {
  genexus: {
    slug: 'genexus',
    level: 1,
    path: '/genexus/',
    headline: 'Desarrollo GeneXus Senior para sistemas empresariales',
    subheadline:
      'Mantenimiento, evolución e integración de aplicaciones en producción con experiencia desde GeneXus 9 hasta 18.',
    highlights: [
      'KBs en producción y evolución continua',
      'Integraciones SOAP y REST',
      'WorkWithPlus, K2BTools, GAM y GX Server',
    ],
    primaryCta: { label: 'Ver experiencia GeneXus', href: '/genexus/#experiencia-genexus' },
    secondaryCta: { label: 'Contactar', href: '/contacto/' },
  },
  modernizacion: {
    slug: 'modernizacion',
    level: 2,
    path: '/modernizacion/',
    headline: 'Liderazgo técnico y modernización de sistemas críticos',
    subheadline:
      'Integraciones, migraciones y evolución arquitectónica con foco en continuidad operativa y calidad de entrega.',
    highlights: [
      'Liderazgo de equipos y relación con clientes',
      'Modernización incremental sin detener operación',
      'Sistemas empresariales de misión crítica',
    ],
    primaryCta: { label: 'Ver proyectos', href: '/proyectos/' },
    secondaryCta: { label: 'Contactar', href: '/contacto/' },
  },
  innovacion: {
    slug: 'innovacion',
    level: 3,
    path: '/innovacion/',
    headline: 'Innovación y desarrollo agéntico con control técnico humano',
    subheadline:
      'IA aplicada, automatización y dirección tecnológica con metodología propia de desarrollo multiagente, documentada y supervisada técnicamente, denominada HEXYN.',
    highlights: [
      'Metodología propia HEXYN: desarrollo multiagente documentado y supervisado',
      'Agentes especializados bajo revisión humana',
      'Automatización con responsabilidad técnica',
    ],
    primaryCta: { label: 'Conocer metodología HEXYN', href: '/hexyn/' },
    secondaryCta: { label: 'Contactar', href: '/contacto/' },
  },
};

export const journeyList = Object.values(journeys);
