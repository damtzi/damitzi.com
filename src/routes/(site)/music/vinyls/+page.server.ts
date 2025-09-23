import type { PageServerLoad } from './$types';
import type { CollectionsResponse } from '$lib/types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
    const response = await fetch('/api/discogs?per_page=100');

    const collection: CollectionsResponse = await response.json();
    const releases = collection.releases;

    // Set cache-control headers for the page response
    setHeaders({
        'cache-control': 'public, max-age=300, stale-while-revalidate=60'
    });

    return { releases };
};
