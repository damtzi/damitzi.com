import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const topPick = await import(`../../../../../lib/assets/data/top-picks/${params.slug}.md`);

		return {
			content: topPick.default,
			meta: topPick.metadata
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
