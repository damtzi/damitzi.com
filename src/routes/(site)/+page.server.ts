import type { CollectionsResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('/api/discogs?sort=added&sort_order=desc&page=1&per_page=4');
    const collection: CollectionsResponse = await response.json();
    const releases = collection.releases;
    return { releases };
};
