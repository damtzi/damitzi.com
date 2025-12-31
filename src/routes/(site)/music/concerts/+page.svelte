<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { TypographyH1 } from '$lib/components/typography';
	import { dateFormatter } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead title="My Concerts" description="Concerts I've attended over the years" />

<div class="flex flex-col gap-4">
	<TypographyH1>My Concerts</TypographyH1>
	<Breadcrumbs />
	<div class="space-y-6 w-full">
		{#each data.years as year (year)}
			<div class="space-y-2">
				<h2 class="text-lg font-semibold font-mono text-gray-500 border-b border-gray-200 pb-1">
					{year}
				</h2>
				<ul class="space-y-2 w-full">
					{#each data.concertsByYear[year] as concert (concert.id)}
						<li class="flex flex-col md:flex-row md:items-center md:justify-between group">
							<span>{concert.artist}</span>
							<span>
								{dateFormatter(new Date(concert.date))} @ {concert.location}
								{#if concert.festival}
									[{concert.festival} Festival]
								{/if}
							</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
