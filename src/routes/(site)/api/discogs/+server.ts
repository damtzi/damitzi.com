import type { RequestHandler } from './$types';
import { DISCOGS_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { CollectionsResponse } from '$lib/types';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const sort = url.searchParams.get('sort') || 'added';
    const sort_order = url.searchParams.get('sort_order') || 'asc';
    const page = url.searchParams.get('page') || '1';
    const per_page = url.searchParams.get('per_page') || '50';

    const response = await fetch(`https://api.discogs.com/users/damitzi__/collection/folders/0/releases?token=${DISCOGS_TOKEN}&sort=${sort}&sort_order=${sort_order}&page=${page}&per_page=${per_page}`);
    const data: CollectionsResponse = await response.json();

    return json(data);
};
