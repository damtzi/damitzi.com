import { DISCOGS_TOKEN } from '$env/static/private';
import type { CollectionsResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const response = await fetch(
		`https://api.discogs.com/users/damitzi__/collection/folders/0/releases?token=${DISCOGS_TOKEN}&per_page=100&sort=artist`
	);

	if (!response.ok) {
		throw new Error(`Discogs API error: ${response.statusText}`);
	}

	const collection: CollectionsResponse = await response.json();
	const releases = collection.releases;

	// Set cache-control headers for the page response
	setHeaders({
		'cache-control': 'public, max-age=300, stale-while-revalidate=60'
	});

	return { releases };
};
