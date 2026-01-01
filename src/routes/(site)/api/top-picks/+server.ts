import { json } from '@sveltejs/kit';
import type { TopPick } from '$lib/types';

async function getTopPicks() {
	const topPicks: TopPick[] = [];

	// Get all recipe files
	const paths = import.meta.glob('/src/lib/assets/data/top-picks/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<TopPick, 'slug'>;
			const topPick = { ...metadata, slug } satisfies TopPick;
			if (topPick.published) {
				topPicks.push(topPick);
			}
		}
	}

	return topPicks;
}

export async function GET() {
	const topPicks = await getTopPicks();
	return json(topPicks);
}
