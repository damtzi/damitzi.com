/* oxlint-disable no-console -- This CLI reports validation results. */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT_DIRECTORY = fileURLToPath(new URL('../', import.meta.url));
const CONTENT_DIRECTORY = path.join(ROOT_DIRECTORY, 'src/content/vinyls');
const ASSET_DIRECTORY = path.join(ROOT_DIRECTORY, 'src/assets/vinyls');
const MAX_DIMENSION = 1000;
const MAX_FILE_SIZE = 500 * 1024;

async function readRecords() {
	const filenames = (await readdir(CONTENT_DIRECTORY)).filter((filename) =>
		filename.endsWith('.json')
	);
	return Promise.all(
		filenames.map(async (filename) => ({
			filename,
			data: JSON.parse(await readFile(path.join(CONTENT_DIRECTORY, filename), 'utf8'))
		}))
	);
}

async function validateCover(filename) {
	const filepath = path.join(ASSET_DIRECTORY, filename);
	const [metadata, file] = await Promise.all([sharp(filepath).metadata(), stat(filepath)]);
	const errors = [];

	if (metadata.format !== 'webp') errors.push('must be a WebP');
	if (metadata.width !== metadata.height) errors.push('must be square');
	if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
		errors.push(`must not exceed ${MAX_DIMENSION}×${MAX_DIMENSION}`);
	}
	if (file.size > MAX_FILE_SIZE) errors.push('must not exceed 500 KiB');

	return errors.map((error) => `${filename}: ${error}`);
}

async function main() {
	const [records, assetFilenames] = await Promise.all([readRecords(), readdir(ASSET_DIRECTORY)]);
	const covers = assetFilenames.filter((filename) => filename.endsWith('.webp'));
	const expectedCovers = new Set();
	const errors = [];

	for (const { filename, data } of records) {
		const slug = path.basename(filename, '.json');
		const expectedCover = `${slug}.webp`;
		expectedCovers.add(expectedCover);
		if (path.basename(data.cover) !== expectedCover) {
			errors.push(`${filename}: cover must reference ${expectedCover}`);
		}
		if (!covers.includes(expectedCover)) errors.push(`${filename}: ${expectedCover} is missing`);
	}

	for (const cover of covers) {
		if (!expectedCovers.has(cover)) errors.push(`${cover}: has no matching content record`);
		errors.push(...(await validateCover(cover)));
	}

	if (errors.length > 0) {
		console.error(errors.join('\n'));
		process.exitCode = 1;
		return;
	}

	console.log(`Validated ${records.length} vinyl records and ${covers.length} covers.`);
}

await main();
