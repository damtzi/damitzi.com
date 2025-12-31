<script lang="ts">
	import { TypographyH4, TypographyP } from '$lib/components/typography';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import GithubIcon from '@lucide/svelte/icons/github';

	let {
		title,
		description,
		link,
		tech,
		githubUrl
	}: {
		title: string;
		description: string;
		link: string;
		tech: string[];
		githubUrl?: string;
	} = $props();
</script>

<div class="flex flex-col gap-2 bg-background border border-gray-300 shadow rounded-md px-4 py-2">
	<TypographyH4 className="flex items-center gap-2">
		<svg width="6" height="6">
			<circle cx="3" cy="3" r="3" fill="#0007fb"></circle>
		</svg>
		{title}
	</TypographyH4>
	<TypographyP>{description}</TypographyP>
	<div class="flex flex-wrap gap-2">
		{#each tech as techItem (techItem)}
			<span class="bg-pure-blue/10 dark:bg-pure-blue text-foreground px-2 py-1 rounded-md">
				{techItem}
			</span>
		{/each}
	</div>
	<div class="flex items-center justify-between">
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			class="flex gap-1 items-center hover:underline"
		>
			<ExternalLinkIcon class="w-4 h-4" />
			View Project
		</a>
		{#if githubUrl}
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex gap-1 items-center hover:underline"
			>
				<GithubIcon class="w-4 h-4" />
				View Source
			</a>
		{/if}
	</div>
</div>
