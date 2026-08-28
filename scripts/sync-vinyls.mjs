/* oxlint-disable no-console -- This CLI reports progress and recoverable provider failures. */
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DISCOGS_USERNAME = 'damitzi__';
const USER_AGENT = 'damitzi.com/1.0 +https://damitzi.com';
const ROOT_DIRECTORY = fileURLToPath(new URL('../', import.meta.url));
const CONTENT_DIRECTORY = path.join(ROOT_DIRECTORY, 'src/content/vinyls');
const DEFAULT_OUTPUT_DIRECTORY = path.join(ROOT_DIRECTORY, '.vinyl-sync');

function removeDiscogsSuffix(value) {
	return value.replace(/\s+\(\d+\)$/u, '').trim();
}

function normalize(value) {
	return removeDiscogsSuffix(value)
		.normalize('NFKD')
		.replace(/\p{Mark}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '');
}

function collectionKey(title, artists) {
	return `${normalize(title)}::${artists.map(normalize).sort().join('::')}`;
}

function slugify(value) {
	return removeDiscogsSuffix(value)
		.normalize('NFKD')
		.replace(/\p{Mark}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

async function fetchWithRetry(url, init = {}, retries = 5) {
	for (let attempt = 0; ; attempt++) {
		const response = await fetch(url, {
			...init,
			headers: { 'User-Agent': USER_AGENT, ...init.headers }
		});

		if (response.status !== 429 || attempt >= retries) {
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText} for ${url}`);
			}
			return response;
		}

		const retryAfter = Number(response.headers.get('Retry-After')) || 2 ** attempt;
		await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
	}
}

async function fetchJson(url, init) {
	return fetchWithRetry(url, init).then((response) => response.json());
}

function discogsHeaders() {
	const headers = { Accept: 'application/vnd.discogs.v2.discogs+json' };
	if (process.env.DISCOGS_TOKEN) {
		headers.Authorization = `Discogs token=${process.env.DISCOGS_TOKEN}`;
	}
	return headers;
}

async function fetchDiscogsCollection() {
	const releases = [];
	let page = 1;
	let pages = 1;

	do {
		const url = new URL(
			`https://api.discogs.com/users/${DISCOGS_USERNAME}/collection/folders/0/releases`
		);
		url.search = new URLSearchParams({
			page: String(page),
			per_page: '100',
			sort: 'added',
			sort_order: 'desc'
		}).toString();

		const response = await fetchJson(url, { headers: discogsHeaders() });
		releases.push(...response.releases);
		pages = response.pagination.pages;
		page++;
	} while (page <= pages);

	return releases;
}

async function fetchDiscogsRelease(releaseId) {
	return fetchJson(`https://api.discogs.com/releases/${releaseId}`, {
		headers: discogsHeaders()
	});
}

async function readLocalCollection() {
	const filenames = (await readdir(CONTENT_DIRECTORY)).filter((filename) =>
		filename.endsWith('.json')
	);
	const records = await Promise.all(
		filenames.map(async (filename) => {
			const content = await readFile(path.join(CONTENT_DIRECTORY, filename), 'utf8');
			return { filename, data: JSON.parse(content) };
		})
	);

	return {
		records,
		releaseIds: new Set(
			records.map(({ data }) => data.discogsReleaseId).filter((id) => Number.isInteger(id))
		),
		legacyKeys: new Set(
			records
				.filter(({ data }) => !data.discogsReleaseId)
				.map(({ data }) => collectionKey(data.title, data.artists))
		)
	};
}

function findIncomingReleases(collection, localCollection) {
	return collection.filter(({ basic_information: information }) => {
		if (localCollection.releaseIds.has(information.id)) return false;

		const key = collectionKey(
			information.title,
			information.artists.map(({ name }) => name)
		);
		return !localCollection.legacyKeys.has(key);
	});
}

function textScore(expected, candidate, maximum) {
	const expectedNormalized = normalize(expected);
	const candidateNormalized = normalize(candidate);
	if (!expectedNormalized || !candidateNormalized) return 0;
	if (expectedNormalized === candidateNormalized) return maximum;
	if (
		expectedNormalized.includes(candidateNormalized) ||
		candidateNormalized.includes(expectedNormalized)
	) {
		return Math.round(maximum * 0.75);
	}
	return 0;
}

function matchScore(release, candidate) {
	const titleScore = textScore(release.title, candidate.title, 100);
	const artistScore = Math.max(
		...release.artists.map((artist) => textScore(artist, candidate.artist, 40))
	);
	const releaseYear = Number.parseInt(release.released, 10);
	const candidateYear = Number.parseInt(candidate.released, 10);
	const yearScore = releaseYear && releaseYear === candidateYear ? 5 : 0;
	return titleScore + artistScore + yearScore;
}

async function searchDeezer(release) {
	const url = new URL('https://api.deezer.com/search/album');
	url.search = new URLSearchParams({
		q: `artist:"${removeDiscogsSuffix(release.artists[0])}" album:"${release.title}"`,
		limit: '10'
	}).toString();
	const response = await fetchJson(url);

	return response.data.map((album) => ({
		provider: 'deezer',
		sourceId: String(album.id),
		title: album.title,
		artist: album.artist.name,
		released: album.release_date ?? '',
		sourceUrl: album.link,
		imageUrl: album.cover_xl
	}));
}

async function searchItunes(release) {
	const url = new URL('https://itunes.apple.com/search');
	url.search = new URLSearchParams({
		term: `${removeDiscogsSuffix(release.artists[0])} ${release.title}`,
		entity: 'album',
		limit: '10'
	}).toString();
	const response = await fetchJson(url);

	return response.results.map((album) => ({
		provider: 'apple-music',
		sourceId: String(album.collectionId),
		title: album.collectionName,
		artist: album.artistName,
		released: album.releaseDate ?? '',
		sourceUrl: album.collectionViewUrl,
		imageUrl: album.artworkUrl100.replace(/\d+x\d+bb/u, '1000x1000bb')
	}));
}

async function searchCoverArtArchive(release) {
	const url = new URL('https://musicbrainz.org/ws/2/release-group');
	url.search = new URLSearchParams({
		query: `artist:"${removeDiscogsSuffix(release.artists[0])}" AND releasegroup:"${release.title}"`,
		fmt: 'json',
		limit: '10'
	}).toString();
	const response = await fetchJson(url);

	return response['release-groups'].map((group) => ({
		provider: 'cover-art-archive',
		sourceId: group.id,
		title: group.title,
		artist: group['artist-credit'].map(({ name }) => name).join(', '),
		released: group['first-release-date'] ?? '',
		sourceUrl: `https://musicbrainz.org/release-group/${group.id}`,
		imageUrl: `https://coverartarchive.org/release-group/${group.id}/front-1000`
	}));
}

async function searchProvider(provider, search, release) {
	try {
		return await search(release);
	} catch (error) {
		console.warn(`${provider} search failed: ${error.message}`);
		return [];
	}
}

async function findCoverCandidates(release) {
	const candidateGroups = await Promise.all([
		searchProvider('Deezer', searchDeezer, release),
		searchProvider('Apple Music', searchItunes, release),
		searchProvider('Cover Art Archive', searchCoverArtArchive, release)
	]);

	return candidateGroups
		.flat()
		.map((candidate) => ({ ...candidate, matchScore: matchScore(release, candidate) }))
		.filter(({ imageUrl, matchScore: score }) => imageUrl && score >= 100)
		.sort((first, second) => second.matchScore - first.matchScore)
		.slice(0, 6);
}

function safeFilename(value) {
	return value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
}

async function downloadCandidate(candidate, index, directory) {
	try {
		const response = await fetchWithRetry(candidate.imageUrl);
		const input = Buffer.from(await response.arrayBuffer());
		const { data, info } = await sharp(input)
			.rotate()
			.resize({
				width: 1000,
				height: 1000,
				fit: 'inside',
				withoutEnlargement: true
			})
			.webp({ quality: 82, effort: 6, smartSubsample: true })
			.toBuffer({ resolveWithObject: true });
		const filename = `${String(index + 1).padStart(2, '0')}-${safeFilename(candidate.provider)}.webp`;
		await writeFile(path.join(directory, filename), data);

		return {
			...candidate,
			filename,
			width: info.width,
			height: info.height,
			sha256: createHash('sha256').update(data).digest('hex')
		};
	} catch (error) {
		console.warn(`${candidate.provider} cover download failed: ${error.message}`);
		return undefined;
	}
}

function createRecord(release, collectionItem, slug) {
	return {
		discogsReleaseId: release.id,
		title: release.title.trim(),
		artists: release.artists.map(({ name }) => name),
		labels: release.labels.map(({ name }) => name),
		formats: release.formats.map(({ name }) => name),
		genres: release.genres,
		released: release.released || String(release.year || ''),
		added: collectionItem.date_added,
		cover: `../../assets/vinyls/${slug}.webp`
	};
}

async function availableSlug(title, releaseId) {
	const baseSlug = slugify(title);
	try {
		await readFile(path.join(CONTENT_DIRECTORY, `${baseSlug}.json`));
		return `${baseSlug}-${releaseId}`;
	} catch {
		return baseSlug;
	}
}

async function prepareRelease(collectionItem, outputDirectory) {
	const release = await fetchDiscogsRelease(collectionItem.basic_information.id);
	const slug = await availableSlug(release.title, release.id);
	const directory = path.join(outputDirectory, slug);
	await mkdir(directory, { recursive: true });

	const record = createRecord(release, collectionItem, slug);
	await writeFile(path.join(directory, 'record.json'), `${JSON.stringify(record, null, '\t')}\n`);

	const candidates = await findCoverCandidates(record);
	const downloadedCandidates = (
		await Promise.all(
			candidates.map((candidate, index) => downloadCandidate(candidate, index, directory))
		)
	).filter(Boolean);
	const result = {
		slug,
		discogsReleaseId: release.id,
		discogsUrl: release.uri,
		record: path.relative(ROOT_DIRECTORY, path.join(directory, 'record.json')),
		candidates: downloadedCandidates
	};
	await writeFile(path.join(directory, 'manifest.json'), `${JSON.stringify(result, null, '\t')}\n`);

	return result;
}

async function main() {
	const outputDirectory = DEFAULT_OUTPUT_DIRECTORY;
	const [collection, localCollection] = await Promise.all([
		fetchDiscogsCollection(),
		readLocalCollection()
	]);
	const incoming = findIncomingReleases(collection, localCollection);

	await rm(outputDirectory, { recursive: true, force: true });
	await mkdir(outputDirectory, { recursive: true });

	const releases = [];
	for (const collectionItem of incoming) {
		releases.push(await prepareRelease(collectionItem, outputDirectory));
	}

	const manifest = {
		generatedAt: new Date().toISOString(),
		discogsUsername: DISCOGS_USERNAME,
		discogsCount: collection.length,
		localCount: localCollection.records.length,
		incomingCount: releases.length,
		releases
	};
	await writeFile(
		path.join(outputDirectory, 'manifest.json'),
		`${JSON.stringify(manifest, null, '\t')}\n`
	);

	console.log(
		`Compared ${collection.length} Discogs records with ${localCollection.records.length} local records.`
	);
	if (releases.length === 0) {
		console.log('No incoming records found.');
		return;
	}

	console.log(`Prepared ${releases.length} incoming record${releases.length === 1 ? '' : 's'}:`);
	for (const release of releases) {
		console.log(`\n${release.slug} (${release.discogsUrl})`);
		for (const candidate of release.candidates) {
			console.log(
				`  ${candidate.filename}: ${candidate.provider}, score ${candidate.matchScore}, ${candidate.width}x${candidate.height}`
			);
		}
	}
	console.log(`\nReview files in ${path.relative(ROOT_DIRECTORY, outputDirectory) || '.'}.`);
}

await main();
