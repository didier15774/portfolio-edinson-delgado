/**
 * Recomendaciones profesionales.
 *
 * Reglas:
 * - Solo se muestran entradas con `authorized: true`.
 * - Si no hay recomendaciones autorizadas, la sección no se renderiza (sin placeholders).
 * - Los textos deben ser originales del autor; solo correcciones de claridad
 *   previamente aprobadas por quien los emitió.
 */

export interface Recommendation {
  id: string;
  /** Texto original (o con correcciones de claridad aprobadas por el autor). */
  text: string;
  name: string;
  role: string;
  company: string;
  /** Relación profesional con Edinson (ej. cliente, colega, líder de equipo). */
  relationship: string;
  /** Autorización explícita para publicar en el portfolio. */
  authorized: boolean;
  order: number;
}

/**
 * Lista de recomendaciones.
 * Vacía hasta recibir textos autorizados — la sección permanece oculta.
 */
export const recommendations: Recommendation[] = [];

export function getPublishedRecommendations(): Recommendation[] {
  return recommendations
    .filter((item) => item.authorized === true && item.text.trim().length > 0)
    .sort((a, b) => a.order - b.order);
}

export function hasPublishedRecommendations(): boolean {
  return getPublishedRecommendations().length > 0;
}
