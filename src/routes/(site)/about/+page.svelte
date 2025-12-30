<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import { TypographyH1, TypographyP } from '$lib/components/typography';
</script>

<SeoHead title="About" description="About me" />

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<TypographyH1>About me</TypographyH1>

		<TypographyP>
			I am a frontend engineer based in Gdynia, specializing in building and maintaining user
			interfaces for websites and web applications. Currently, I'm working on
			<a
				href="https://klave.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
			>
				Klave
			</a>
			at
			<a
				href="https://secretarium.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
			>
				Secretarium
			</a>, crafting intuitive and secure frontends that prioritise privacy and security at every
			step.
		</TypographyP>
		<TypographyP>WIP</TypographyP>
	</div>
</div>
