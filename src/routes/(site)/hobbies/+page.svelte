<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import { TypographyH1, TypographyP } from '$lib/components/typography';
</script>

<SeoHead title="Hobbies" description="My hobbies and interests" />

<div class="flex flex-col gap-2">
	<TypographyH1>Hobbies</TypographyH1>
	<TypographyP>
		I am a passionate basketball fan, keeping up with the NBA closely. My favorite team is the
		Chicago Bulls, with the New York Knicks being a close second. I also support Arka Gdynia in the
		Polish Basketball League - PLK. When I'm not watching hoops, I love playing padel, lifting
		weights, going for runs, and sailing. I enjoy spending time in the kitchen - I bake my own
		sourdough <a
			href="/bread"
			class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
			>bread</a
		>
		at least once a week. Music is a big passion too; I'm always curating my "<a
			href="/music/top-picks"
			class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
			>top picks</a
		>" of the year lists and adding new vinyl records to my
		<a
			href="/music/vinyls"
			class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
			>collection</a
		>.
	</TypographyP>
</div>
