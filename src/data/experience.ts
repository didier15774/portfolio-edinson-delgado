export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string | null;
  periodLabel: string;
  highlights: string[];
}

export const experienceTimeline: ExperienceEntry[] = [
  {
    id: 'sofis',
    company: 'Sofis Solutions',
    role: 'Desarrollador GeneXus Senior',
    start: '2024-04',
    end: '2026-01',
    periodLabel: 'abril 2024 — enero 2026',
    highlights: [],
  },
  {
    id: 'ust',
    company: 'Universal Soluciones Tecnológicas',
    role: 'Líder de Innovación y Desarrollo',
    start: '2021-03',
    end: '2024-02',
    periodLabel: 'marzo 2021 — febrero 2024',
    highlights: [],
  },
  {
    id: 'colmena',
    company: 'Colmena Comunidad Digital',
    role: 'Fundador y Director',
    start: '2016-05',
    end: '2021-01',
    periodLabel: 'mayo 2016 — enero 2021',
    highlights: [],
  },
];
