import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One unified collection. Every entry is filterable by `category`.
// - writing  → essays, theses, thoughts (rendered from the Markdown body)
// - project  → builds that link out via `repo`
// - research → papers / findings / data (a written body, or an uploaded `file`)
const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    category: z.enum(['writing', 'project', 'research']),
    status: z.enum(['shipped', 'building', 'archived']).default('shipped'),
    repo: z.string().url().optional(),
    file: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { archive };
