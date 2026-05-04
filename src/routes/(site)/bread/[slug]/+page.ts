import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const recipe = await import(`../../../../lib/assets/data/recipes/${params.slug}.md`);

		return {
			content: recipe.default,
			meta: recipe.metadata
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
