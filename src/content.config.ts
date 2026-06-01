import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const markdownSchema = z.object({
	title: z.string(),
	slug: z.coerce.string(),
	description: z.string(),
	published: z.boolean()
});

const recipes = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/recipes' }),
	schema: markdownSchema
});

const topPicks = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/top-picks' }),
	schema: markdownSchema
});

export const collections = { recipes, topPicks };
