import { json } from '@sveltejs/kit';
import type { Recipe } from '$lib/types';

async function getRecipes() {
	const recipes: Recipe[] = [];

	// Get all recipe files
	const paths = import.meta.glob('/src/lib/assets/data/recipes/*.md', { eager: true });

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

	return recipes;
}

export async function GET() {
	const recipes = await getRecipes();
	return json(recipes);
}
