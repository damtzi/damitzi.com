<script lang="ts">
	import type { PageProps } from './$types';
	import SeoHead from '$lib/components/seo-head.svelte';
	import { TypographyH1 } from '$lib/components/typography';

	let { data }: PageProps = $props();

	const primaryImage = data.vinyl.images.find((image) => image.type === 'primary');
	const secondaryImage = data.vinyl.images.find((image) => image.type === 'secondary');
</script>

<SeoHead title={data.vinyl.title} description={`${data.vinyl.title} details`} />

<div class="flex flex-col gap-2">
	<TypographyH1>
		{data.vinyl.title}
	</TypographyH1>
	<!-- <Breadcrumbs /> -->
	<div class="flex flex-col md:flex-row gap-8">
		<img
			src={primaryImage?.uri || secondaryImage?.uri}
			alt={`Cover for ${data.vinyl.title}`}
			width={400}
			height={400}
			class="rounded-xs shadow-lg"
		/>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Album</span>
				<span>
					{data.vinyl.title}
				</span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Artist</span>
				<span>
					{data.vinyl.artists.map((artist) => artist.name).join(', ')}
				</span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Label</span>
				<span>
					{data.vinyl.labels.map((label) => label.name).join(', ')}
				</span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Format</span>
				<span>
					{data.vinyl.formats.map((format) => format.name).join(', ')}
				</span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Genres</span>
				<span>
					{data.vinyl.genres.join(', ')}
				</span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-500">Released</span>
				<span>
					{data.vinyl.released}
				</span>
			</div>
		</div>
	</div>
</div>
