import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const recipe = await import(`../../../../lib/assets/data/recipes/${params.slug}.md`);

        return {
            content: recipe.default,
            meta: recipe.metadata
        };
    }
    catch (e) {
        console.error(e);
        error(404, `Could not find ${params.slug}`);
    }
}
