<script lang="ts">
    import '../app.css';
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import SeoHead from '$lib/components/seo-head.svelte';

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    let { children } = $props();
</script>

<SeoHead title="home" description="Welcome to my website!"/>

<main class="w-screen h-screen antialiased">
    {@render children?.()}
</main>
