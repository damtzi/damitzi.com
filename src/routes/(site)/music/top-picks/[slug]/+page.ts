import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const topPick = await import(`../../../../../lib/assets/data/top-picks/${params.slug}.md`);

		return {
			content: topPick.default,
			meta: topPick.metadata
		};
	} catch (e) {
		console.error(e);
		error(404, `Could not find ${params.slug}`);
	}
}
