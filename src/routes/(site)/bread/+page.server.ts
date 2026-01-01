import type { Recipe } from '$lib/types';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/recipes');
	const recipes: Recipe[] = await response.json();
	return { recipes };
};
