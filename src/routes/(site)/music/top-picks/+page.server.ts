import type { TopPick } from '$lib/types';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/top-picks');
	const topPicks: TopPick[] = await response.json();
	return { topPicks };
};
