import type { CollectionsResponse, DiscogsRelease } from '@/lib/types';

export async function getDiscogsCollection(): Promise<CollectionsResponse> {
    const response = await fetch(
        `https://api.discogs.com/users/damitzi__/collection/folders/0/releases?token=${import.meta.env.DISCOGS_TOKEN}&per_page=100&sort=artist`
    );

    return response.json();
}

export async function getVinylDetails(id: string): Promise<DiscogsRelease> {
    const response = await fetch(
        `https://api.discogs.com/releases/${id}?token=${import.meta.env.DISCOGS_TOKEN}`
    );

    return response.json();
}
