export interface HexynStep {
  order: number;
  title: string;
  description: string;
}

export const hexynContent = {
  title: 'Metodología HEXYN',
  summary:
    'Proceso de desarrollo donde la IA actúa como acelerador bajo control técnico humano, sin sustituir la experiencia ni la responsabilidad de la entrega.',
  principle:
    'La IA acelera la implementación; la revisión humana garantiza calidad, seguridad y coherencia arquitectónica.',
  steps: [
    {
      order: 1,
      title: 'Requisitos y análisis',
      description: 'Relevamiento, definición de alcance y criterios de aceptación acordados con el cliente.',
    },
    {
      order: 2,
      title: 'Implementación con agentes',
      description:
        'Generación asistida de código y artefactos bajo estándares técnicos y convenciones del proyecto.',
    },
    {
      order: 3,
      title: 'Revisión humana',
      description:
        'Validación técnica, revisión de seguridad y verificación de coherencia arquitectónica antes de integrar.',
    },
    {
      order: 4,
      title: 'Pruebas y QA',
      description: 'Casos funcionales, regresión y validación con usuarios según el alcance definido.',
    },
    {
      order: 5,
      title: 'Despliegue',
      description: 'Entrega controlada a producción con procedimientos de despliegue documentados.',
    },
    {
      order: 6,
      title: 'Soporte',
      description: 'Seguimiento post-entrega y corrección de incidencias en el período acordado.',
    },
  ] satisfies HexynStep[],
};
