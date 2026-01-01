import type { Activity, StravaAuthResponse } from '@/lib/types';

export async function getStravaActivity(): Promise<Activity[]> {
	const stravaAuthResponse = await fetch(
		`https://www.strava.com/oauth/token?client_id=${import.meta.env.STRAVA_CLIENT_ID}&client_secret=${import.meta.env.STRAVA_CLIENT_SECRET}&refresh_token=${import.meta.env.STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
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
