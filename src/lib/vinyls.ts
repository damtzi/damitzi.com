import type { CollectionEntry } from 'astro:content';

type Vinyl = CollectionEntry<'vinyls'>;

export const VINYLS_BASE_PATH = '/music/vinyls';
export const VINYLS_PAGE_SIZE = 24;

const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

// Ignore a leading "The" so e.g. "The Roots" files under R.
const sortKey = (value: string) => value.replace(/^the\s+/i, '');
const compareText = (a: string, b: string) => collator.compare(sortKey(a), sortKey(b));

const byArtist = (a: Vinyl, b: Vinyl) => compareText(a.data.artists[0], b.data.artists[0]);
const byTitle = (a: Vinyl, b: Vinyl) => compareText(a.data.title, b.data.title);

export const VINYL_SORTS = [
	{
		id: 'artist',
		label: 'Artist',
		compare: (a: Vinyl, b: Vinyl) => byArtist(a, b) || byTitle(a, b)
	},
	{
		id: 'title',
		label: 'Title',
		compare: (a: Vinyl, b: Vinyl) => byTitle(a, b) || byArtist(a, b)
	},
	{
		id: 'recent',
		label: 'Recently added',
		compare: (a: Vinyl, b: Vinyl) =>
			b.data.added.getTime() - a.data.added.getTime() || byArtist(a, b) || byTitle(a, b)
	}
] as const;

export type VinylSortId = (typeof VINYL_SORTS)[number]['id'];

export const DEFAULT_VINYL_SORT: VinylSortId = 'artist';

// Segments used by listing URLs; album slugs must never collide with them.
export const RESERVED_VINYL_SLUGS: ReadonlySet<string> = new Set([
	'page',
	...VINYL_SORTS.map((sort) => sort.id)
]);

/**
 * Listing URL for a sort + page, e.g. `/music/vinyls`, `/music/vinyls/page/2`,
 * `/music/vinyls/recent/page/3`. The default sort and page 1 are omitted.
 */
export function vinylListingPath(sort: VinylSortId, page = 1): string {
	const segments = [VINYLS_BASE_PATH];
	if (sort !== DEFAULT_VINYL_SORT) segments.push(sort);
	if (page > 1) segments.push('page', String(page));
	return segments.join('/');
}

/** Rest-param value for `[...listing].astro`, or undefined for the base path. */
export function vinylListingParam(sort: VinylSortId, page = 1): string | undefined {
	const path = vinylListingPath(sort, page).slice(VINYLS_BASE_PATH.length + 1);
	return path === '' ? undefined : path;
}

const LISTING_PATH_PATTERN = new RegExp(
	`^${VINYLS_BASE_PATH}(?:/(?:${VINYL_SORTS.map((sort) => sort.id).join('|')}))?(?:/page/[1-9]\\d*)?$`
);

/** Guards untrusted `?from=` values so only real listing paths are linked. */
export function isVinylListingPath(path: string): boolean {
	return LISTING_PATH_PATTERN.test(path);
}

export function assertNoReservedSlugs(vinyls: Vinyl[]): void {
	const clashes = vinyls.filter((vinyl) => RESERVED_VINYL_SLUGS.has(vinyl.id));
	if (clashes.length > 0) {
		throw new Error(
			`Vinyl slugs clash with listing routes: ${clashes.map((vinyl) => vinyl.id).join(', ')}. Rename the JSON file(s) in src/content/vinyls.`
		);
	}
}
