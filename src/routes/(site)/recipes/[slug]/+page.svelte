<script lang="ts">
    import { dateFormatter } from '$lib/utils';
    import SeoHead from '$lib/components/seo-head.svelte';
    import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
    let { data } = $props();
</script>

<SeoHead title={data.meta.title} description={data.meta.description} />

<article class="flex flex-col gap-2">
    <h1 class="text-2xl font-serif font-medium">{data.meta.title}</h1>
    <Breadcrumbs />
    <span>Last updated: {dateFormatter(data.meta.date)}</span>
    <p class="lead">
        {data.meta.description}
    </p>
    <div class="prose dark:prose-invert
  prose-h1:font-bold prose-h1:text-xl
  prose-a:text-pure-blue
  prose-p:text-justify prose-p:text-foreground
  prose-img:rounded-xl">
        <data.content />
  </div>
</article>
