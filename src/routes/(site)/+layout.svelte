<script lang="ts">
    import '../../app.css';
    import '@fontsource-variable/hanken-grotesk';
    import '@fontsource/ibm-plex-mono';
    import '@fontsource-variable/lora';
    import favicon from '$lib/assets/favicon.svg';
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import Header from '$lib/components/header.svelte';
    import Footer from '$lib/components/footer.svelte';
    import Noise from '$lib/components/backgrounds/noise.svelte';
    import Grid from '$lib/components/backgrounds/grid.svelte';

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative antialiased font-sans text-foreground w-screen h-screen">
    <Noise />
    <Grid />
    <div class="w-full h-full flex flex-col gap-8 px-4 py-8 max-w-3xl mx-auto">
        <Header/>
        <div class="flex-1 overflow-y-auto">
            {@render children?.()}
        </div>
        <Footer />
    </div>
</main>
