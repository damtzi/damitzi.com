import type { Activity, CollectionsResponse, StravaAuthResponse } from '$lib/types';
import type { PageServerLoad } from './$types';
import {
	STRAVA_CLIENT_ID,
	STRAVA_CLIENT_SECRET,
	STRAVA_REFRESH_TOKEN,
	DISCOGS_TOKEN
} from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const stravaAuthResponse = await fetch(
		`https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
		{
			method: 'POST'
		}
	);

	const data: StravaAuthResponse = await stravaAuthResponse.json();

	const [discogsResponse, stravaResponse] = await Promise.all([
		fetch(
			`https://api.discogs.com/users/damitzi__/collection/folders/0/releases?token=${DISCOGS_TOKEN}&sort=added&sort_order=desc&page=1&per_page=4`,
			{
				headers: {
					'User-Agent': 'damitzi.com/1.0 +https://damitzi.com'
				}
			}
		),
		fetch(
			`https://www.strava.com/api/v3/athlete/activities?access_token=${data.access_token}&per_page=100`
		)
	]);

	if (!discogsResponse.ok) {
		throw new Error(`Discogs API error: ${discogsResponse.statusText}`);
	}
	if (!stravaResponse.ok) {
		throw new Error(`Strava API error: ${stravaResponse.statusText}`);
	}

	const collection: CollectionsResponse = await discogsResponse.json();
	const releases = collection.releases
		.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
		.slice(0, 4);

	const activities: Activity[] = await stravaResponse.json();
	const runs = activities.filter((activity) => activity.type === 'Run').slice(0, 4);
	const lifts = activities.filter((activity) => activity.type === 'WeightTraining').slice(0, 4);

	// Set cache-control headers for the page response
	setHeaders({
		'cache-control': 'public, max-age=300, stale-while-revalidate=60'
	});

	return { releases, runs, lifts };
};
