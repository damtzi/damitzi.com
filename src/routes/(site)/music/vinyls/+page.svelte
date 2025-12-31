<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { TypographyH1 } from '$lib/components/typography';
	import VinylPng from '$lib/assets/images/black-vinyl.png';
	import CdPng from '$lib/assets/images/clear-cd.png';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead title="Vinyls" description="My vinyl and CD collection" />

<div class="flex flex-col gap-2">
	<TypographyH1>Music</TypographyH1>
	<Breadcrumbs />
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-10">
		{#each data.releases as release (release.id)}
			<a href={`/music/vinyls/${release.id}`} class="relative group">
				<img
					src={release.basic_information.cover_image}
					alt={release.basic_information.title}
					width={200}
					height={200}
					class="hover:scale-105 hover:cursor-pointer hover:shadow transition-all duration-300 rounded-xs shadow-lg relative z-10 aspect-square"
				/>
				<img
					src={release.basic_information.formats
						.map((format) => format.name)
						.find((name) => name === 'Vinyl')
						? VinylPng
						: CdPng}
					alt={release.basic_information.formats
						.map((format) => format.name)
						.find((name) => name === 'Vinyl')
						? 'A black vinyl record'
						: 'A clear CD'}
					width={200}
					height={200}
					class="absolute top-0 group-hover:translate-x-10 transition-transform duration-300 z-0"
				/>
			</a>
		{/each}
	</div>
</div>
