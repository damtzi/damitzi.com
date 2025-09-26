import { json } from '@sveltejs/kit';
import type { Recipe } from '$lib/types';

async function getRecipes() {
    let recipes: Recipe[] = [];

    // Get all recipe files
    const paths = import.meta.glob('/src/recipes/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Recipe, 'slug'>;
            const recipe = { ...metadata, slug } satisfies Recipe;
            if (recipe.published) {
                recipes.push(recipe);
            }
        }
    }

    recipes = recipes.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );

    return recipes;
}

export async function GET() {
    const recipes = await getRecipes();
    return json(recipes);
}
