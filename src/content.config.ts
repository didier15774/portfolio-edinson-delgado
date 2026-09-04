import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['producción', 'desarrollo', 'archivado']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    problem: z.string().optional(),
    solution: z.string().optional(),
    responsibility: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    architecture: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
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
