import type { Activity, StravaAuthResponse } from '@/lib/types';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from 'astro:env/server';

export async function getStravaActivity(): Promise<Activity[]> {
	const stravaAuthResponse = await fetch(
		`https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
		{
			method: 'POST'
		}
	);
	const data: StravaAuthResponse = await stravaAuthResponse.json();

	const stravaActivityResponse = await fetch(
		`https://www.strava.com/api/v3/athlete/activities?access_token=${data.access_token}&per_page=100`
	);

	return await stravaActivityResponse.json();
}
