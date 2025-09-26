<script lang="ts">
    import SeoHead from '$lib/components/seo-head.svelte';
    import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
    import Arrow from '$lib/components/arrow.svelte';

    let { data } = $props();
</script>

<SeoHead title="Recipes" description="Recipes page" />

<div class="flex flex-col gap-2">
    <h1 class="text-2xl font-serif font-medium">
        Recipes
    </h1>
     <Breadcrumbs />
     <ul class="space-y-2 w-fit">
         {#each data.recipes as recipe (recipe.slug)}
             {@render recipeLink(recipe.title, recipe.slug)}
         {/each}
     </ul>
</div>

{#snippet recipeLink(title: string, slug: string)}
    <li class="flex items-center group gap-2">
        <Arrow />
        <a
            href={`/recipes/${slug}`}
            class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
        >
            {title}
        </a>
    </li>
{/snippet}
