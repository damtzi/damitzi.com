<script lang="ts">
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import '@fontsource-variable/hanken-grotesk';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource-variable/lora';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Noise from '$lib/components/backgrounds/noise.svelte';
	import Grid from '$lib/components/backgrounds/grid.svelte';
	import SideNav from '$lib/components/side-nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="z-0 relative antialiased font-sans font-medium bg-background text-foreground">
	<Noise />
	<Grid />
	<div class="w-full min-h-dvh flex flex-col gap-8 px-4 py-8 max-w-4xl mx-auto">
		<Header />
		<div class="grid grid-cols-12 grow">
			<div class="hidden sm:block sm:col-span-3">
				<SideNav />
			</div>
			<main class="col-span-12 sm:col-span-9">
				{@render children?.()}
			</main>
		</div>
		<Footer />
	</div>
</div>
