<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import Arrow from '$lib/components/arrow.svelte';
	import { TypographyH1, TypographyP } from '$lib/components/typography';

	const socialLinks = [
		{ href: 'https://github.com/damtzi', text: 'github' },
		{ href: 'https://bsky.app/profile/damitzi.bsky.social', text: 'bluesky' },
		{ href: 'https://www.instagram.com/damitzi__', text: 'instagram' },
		{ href: 'https://www.discogs.com/user/damitzi__', text: 'discogs' },
		{ href: 'https://www.strava.com/athletes/108759547', text: 'strava' },
		{ href: 'mailto:damian.tziamtzis@gmail.com', text: 'email' }
	];
</script>

<SeoHead title="Socials" description="Find me on social media" />

<div class="flex flex-col gap-2">
	<TypographyH1>Socials</TypographyH1>
	<TypographyP>You can find me on:</TypographyP>
	<ul class="space-y-2 w-fit">
		{#each socialLinks as link (link.href)}
			<li class="flex items-center group gap-2">
				<Arrow />
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>
					{link.text}
				</a>
			</li>
		{/each}
	</ul>
</div>
