import type { CollectionsResponse, DiscogsRelease } from '@/lib/types';
import { DISCOGS_TOKEN } from 'astro:env/server';

const DISCOGS_HEADERS = {
	'User-Agent': 'damitzi.com/1.0 +https://damitzi.com'
};

// Discogs rate-limits authenticated requests (~60/min). Retry on 429, honouring
// the Retry-After header, with exponential backoff as a fallback.
async function fetchDiscogs(url: string, retries = 6): Promise<Response> {
	for (let attempt = 0; ; attempt++) {
		const response = await fetch(url, { headers: DISCOGS_HEADERS });
		if (response.status !== 429 || attempt >= retries) {
			return response;
		}
		const retryAfter = Number(response.headers.get('Retry-After')) || 2 ** attempt;
		await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
	}
}

export async function getDiscogsCollection(): Promise<CollectionsResponse> {
	const response = await fetchDiscogs(
		`https://api.discogs.com/users/damitzi__/collection/folders/0/releases?token=${DISCOGS_TOKEN}&per_page=100&sort=artist`
	);

	return response.json();
}

export async function getVinylDetails(id: string): Promise<DiscogsRelease> {
	const response = await fetchDiscogs(
		`https://api.discogs.com/releases/${id}?token=${DISCOGS_TOKEN}`
	);

	return response.json();
}
