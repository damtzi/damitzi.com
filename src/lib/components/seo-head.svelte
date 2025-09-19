<script lang="ts">
    import { page } from '$app/state';
    import favicon from '$lib/assets/favicon.svg';
    let { title, description }: { title: string; description: string } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>{`${title} | damitzi`}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={`${page.url.origin}${page.url.pathname}`} />
</svelte:head>
