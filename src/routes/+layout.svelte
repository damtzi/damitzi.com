<script lang="ts">
    import '../app.css';
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

<main class="relative w-screen h-screen antialiased bg-background text-foreground">
    <Noise />
    <Grid />
    <div class="w-full h-full flex flex-col">
        <Header/>
        <div class="flex-1 overflow-y-auto container mx-auto">
            {@render children?.()}
        </div>
        <Footer />
    </div>
</main>
