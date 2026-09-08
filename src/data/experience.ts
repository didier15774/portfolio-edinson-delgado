/**
 * Línea de tiempo profesional.
 * Capacidad objetivo: 5–7 hitos publicados.
 * Ampliación pendiente del PDF exportado del LinkedIn oficial (sin inventar cargos ni fechas).
 *
 * Hitos previstos cuando lleguen datos verificados:
 * - Experiencias iniciales de la carrera
 * - Consorcio del Uruguay
 * - Proyecto Colmena (publicado)
 * - Universal Soluciones Tecnológicas (publicado)
 * - Sofis Solutions, con SeCIU como cliente público de Sofis
 * - Proyectos y responsabilidades técnicas relevantes
 */

export interface ExperienceEntry {
  id: string;
  company: string;
  previousName?: string;
  /** Cliente público cuando el trabajo fue a través de otra empresa. */
  publicClient?: string;
  role: string;
  start: string;
  end: string | null;
  periodLabel: string;
  highlights: string[];
  /** Solo entradas con published: true se muestran. */
  published: boolean;
  order: number;
}

/** Rango objetivo de hitos en la timeline pública. */
export const EXPERIENCE_TARGET_COUNT = { min: 5, max: 7 } as const;

/**
 * Etiquetas de huecos pendientes — no se renderizan hasta tener datos del LinkedIn.
 * No inventar períodos, cargos ni tecnologías aquí.
 */
export const experiencePendingSlots = [
  'Experiencias iniciales de la carrera',
  'Consorcio del Uruguay',
  'Sofis Solutions — indicar SeCIU como cliente público',
  'Proyectos y responsabilidades técnicas relevantes',
] as const;

export const experienceTimeline: ExperienceEntry[] = [
  {
    id: 'sofis',
    company: 'Sofis Solutions',
    role: 'Desarrollador GeneXus Senior',
    start: '2024-04',
    end: '2026-01',
    periodLabel: 'abril 2024 — enero 2026',
    highlights: [
      'Desarrollo y evolución de aplicaciones empresariales GeneXus en entornos productivos.',
    ],
    published: true,
    order: 1,
  },
  {
    id: 'ust',
    company: 'Universal Soluciones Tecnológicas',
    role: 'Líder de Innovación y Desarrollo',
    start: '2021-03',
    end: '2024-02',
    periodLabel: 'marzo 2021 — febrero 2024',
    highlights: [
      'Liderazgo técnico en innovación, desarrollo y evolución de soluciones de software.',
    ],
    published: true,
    order: 2,
  },
  {
    id: 'colmena',
    company: 'Colmena',
    previousName: 'Colmena Comunidad Digital',
    role: 'Fundador y Director',
    start: '2016-05',
    end: null,
    periodLabel: 'mayo 2016 — actualidad',
    highlights: [
      'Fundación y dirección de la empresa; evolución hacia plataforma de servicios, metodología y soluciones de software.',
      'Etapa inicial como Colmena Comunidad Digital (mayo 2016 — enero 2021).',
    ],
    published: true,
    order: 3,
  },
];

export function getPublishedExperience(): ExperienceEntry[] {
  return experienceTimeline
    .filter((entry) => entry.published)
    .sort((a, b) => a.order - b.order);
}
