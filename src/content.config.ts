import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Subtítulo breve bajo el título (p. ej. tipo de producto). */
    tagline: z.string().optional(),
    summary: z.string(),
    status: z.enum(['producción', 'desarrollo', 'archivado', 'prototipo']),
    /** Etiqueta visible del estado; si falta, se usa `status`. */
    statusLabel: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    /** Si es false, la tarjeta omite problema/responsabilidad (sigue en el caso completo). */
    showCardDetails: z.boolean().default(true),
    problem: z.string().optional(),
    solution: z.string().optional(),
    responsibility: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    verifiedFeatures: z.array(z.string()).default([]),
    plannedFeatures: z.array(z.string()).default([]),
    architecture: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    repoLabel: z.string().optional(),
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    logo: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number(),
          height: z.number(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
