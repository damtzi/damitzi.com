import type { Activity, CollectionsResponse, StravaAuthResponse } from '$lib/types';
import type { PageServerLoad } from './$types';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
    const stravaAuthResponse = await fetch(
        `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
        {
            method: 'POST'
        }
    );

    const data: StravaAuthResponse = await stravaAuthResponse.json();

    const [discogsResponse, stravaResponse] = await Promise.all([
        fetch('/api/discogs?sort=added&sort_order=desc&page=1&per_page=4'),
        fetch(
            `https://www.strava.com/api/v3/athlete/activities?access_token=${data.access_token}`
        )
    ]);

    const collection: CollectionsResponse = await discogsResponse.json();
    const releases = collection.releases;

    const activities: Activity[] = await stravaResponse.json();
    const runs = activities.filter(activity => activity.type === 'Run').slice(0, 4);

    return { releases, runs };
};
