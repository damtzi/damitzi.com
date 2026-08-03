import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

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

const concerts = defineCollection({
	loader: file('src/content/concerts.json'),
	schema: z.object({
		id: z.string(),
		artist: z.string(),
		date: z.string().transform((value) => new Date(value)),
		location: z.string(),
		festival: z.string().optional()
	})
});

const projects = defineCollection({
	// projects.json is grouped as { personal: [...], work: [...] }; flatten it into
	// a single list of entries, tagging each with its category.
	loader: file('src/content/projects.json', {
		parser: (text) => {
			const data = JSON.parse(text) as Record<'personal' | 'work', Record<string, unknown>[]>;
			return [
				...data.personal.map((project) => ({ ...project, category: 'personal' })),
				...data.work.map((project) => ({ ...project, category: 'work' }))
			];
		}
	}),
	schema: z.object({
		id: z.number(),
		title: z.string(),
		description: z.string(),
		link: z.string(),
		tech: z.array(z.string()),
		githubUrl: z.string().optional(),
		category: z.enum(['personal', 'work'])
	})
});

const vinyls = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/vinyls' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			artists: z.array(z.string()).min(1),
			labels: z.array(z.string()),
			formats: z.array(z.string()).min(1),
			genres: z.array(z.string()),
			released: z.string(),
			added: z.coerce.date(),
			cover: image()
		})
});

export const collections = { recipes, topPicks, concerts, projects, vinyls };
