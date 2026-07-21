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

const featuredProjects = defineCollection({
	loader: file('src/content/featured-projects.json'),
	schema: z.object({
		id: z.string(),
		order: z.number(),
		title: z.string(),
		domain: z.string(),
		role: z.string(),
		period: z.string(),
		summary: z.string(),
		link: z.url(),
		impact: z.array(z.string()),
		tech: z.array(z.string())
	})
});

const uses = defineCollection({
	loader: file('src/content/uses.json'),
	schema: z.object({
		id: z.string(),
		category: z.string(),
		items: z.array(
			z.object({
				name: z.string(),
				description: z.string(),
				link: z.url().optional()
			})
		)
	})
});

const now = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/now' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: z.boolean()
	})
});

export const collections = { recipes, topPicks, concerts, projects, featuredProjects, uses, now };
