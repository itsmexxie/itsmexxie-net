import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from '../schema';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "*.{md,mdx}" }),
  schema: postSchema
})

export const collections = { blog, notes };
