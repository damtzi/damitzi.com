<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Arrow from '$lib/components/arrow.svelte';
	import { TypographyH1, TypographyP } from '$lib/components/typography';

	let { data } = $props();
</script>

<SeoHead title="Top Picks" description="My favorite albums of the year" />

<div class="flex flex-col gap-2">
	<TypographyH1>My Top Picks</TypographyH1>
	<TypographyP>
		Since 2020 I have been writing down all the albums I have listened to that year and ranking
		them. I do not follow any universal ranking system, but rather rely on my personal taste and
		listening habits.
	</TypographyP>
	<Breadcrumbs />
	<ul class="space-y-2 w-fit">
		{#each data.topPicks as topPick (topPick.slug)}
			{@render topPickLink(topPick.title, topPick.slug)}
		{/each}
	</ul>
</div>

{#snippet topPickLink(title: string, slug: string)}
	<li class="flex items-center group gap-2">
		<Arrow />
		<a
			href={`/music/top-picks/${slug}`}
			class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
		>
			{title}
		</a>
	</li>
{/snippet}
