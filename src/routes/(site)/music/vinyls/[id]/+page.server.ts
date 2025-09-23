import type { PageServerLoad, EntryGenerator } from './$types';
import type { CollectionsResponse, DiscogsRelease } from '$lib/types';
import { error } from '@sveltejs/kit';
import { DISCOGS_TOKEN } from '$env/static/private';

export const prerender = true;

// Provide list of paths to prerender
export const entries: EntryGenerator = async () => {
    const response = await fetch('/api/discogs?per_page=100');

    const collection: CollectionsResponse = await response.json();
    const releases = collection.releases;

    // Return paths like '/music/vinyl/123'
    return releases.map((vinyl) => {
        return {
            id: `/music/vinyl/${vinyl.id}`
        };
    });
};

export const load: PageServerLoad = async ({ fetch, params }) => {
    const { id } = params;
    const response = await fetch(`https://api.discogs.com/releases/${id}?token=${DISCOGS_TOKEN}`);

    if (!response.ok) {
        error(404, {
            message: 'Vinyl not found'
        });
    }

    const vinyl: DiscogsRelease = await response.json();

    return { vinyl };
};
