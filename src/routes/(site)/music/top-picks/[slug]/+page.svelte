<script lang="ts">
    import SeoHead from '$lib/components/seo-head.svelte';
    import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
    import { TypographyH1, TypographyP } from '$lib/components/typography';
    
    let { data } = $props();
</script>

<SeoHead title={data.meta.title} description={data.meta.description} />

<article class="flex flex-col gap-2">
    <TypographyH1>{data.meta.title}</TypographyH1>
    <Breadcrumbs />
    <TypographyP className="lead">
        {data.meta.description}
    </TypographyP>
    <div class="prose dark:prose-invert
  prose-h1:font-bold prose-h1:text-xl
  prose-a:text-pure-blue
  prose-p:text-justify prose-p:text-foreground
  prose-img:rounded-xl">
        <data.content />
  </div>
</article>
