import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const recipes = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bread' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string()
    })
});

const topPicks = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topPicks' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string()
    })
});

const concerts = defineCollection({
    loader: file('src/content/concerts.json'),
    schema: z.object({
        artist: z.string(),
        date: z.string().transform(dateString => new Date(dateString)),
        location: z.string(),
        festival: z.string().optional(),
        id: z.string()
    })
});

const workProjects = defineCollection({
    loader: file('src/content/projects.json', { parser: text => JSON.parse(text).work }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        tech: z.array(z.string()),
        githubUrl: z.string().optional(),
        id: z.number()
    })
});

const personalProjects = defineCollection({
    loader: file('src/content/projects.json', { parser: text => JSON.parse(text).personal }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        tech: z.array(z.string()),
        githubUrl: z.string().optional(),
        id: z.number()
    })
});

export const collections = { recipes, topPicks, concerts, personalProjects, workProjects };
