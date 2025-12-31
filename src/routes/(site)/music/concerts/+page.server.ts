import concertsData from '$lib/assets/data/concerts.json';
import type { PageServerLoad } from './$types';

type Concert = {
	artist: string;
	date: string;
	location: string;
	festival?: string;
	id: string;
};

export const load: PageServerLoad = async () => {
	// Sort concerts by date (newest first)
	const sortedConcerts = concertsData.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	// Group concerts by year
	const concertsByYear = sortedConcerts.reduce(
		(acc, concert) => {
			const year = new Date(concert.date).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(concert);
			return acc;
		},
		{} as Record<number, Concert[]>
	);

	// Get years in descending order
	const years = Object.keys(concertsByYear)
		.map(Number)
		.sort((a, b) => b - a);

	return {
		concertsByYear,
		years
	};
};
