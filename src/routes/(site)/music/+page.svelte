<script lang="ts">
    import SeoHead from '$lib/components/seo-head.svelte';
    import Arrow from '$lib/components/arrow.svelte';
    import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
    import { TypographyH1 } from '$lib/components/typography';
</script>

<SeoHead title="Music" description="Explore my music collection and concert tracker" />

<div class="flex flex-col gap-2">
    <TypographyH1>
        Music
    </TypographyH1>
    <Breadcrumbs />
    <ul class="space-y-2 w-fit">
        <li class="flex items-center group gap-2">
            <Arrow />
            <a
                href="/music/vinyls"
                class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
            >
                Vinyl collection
            </a>
        </li>
        <li class="flex items-center group gap-2">
            <Arrow />
            <a
                href="/music/concerts"
                class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
            >
                Concert tracker
            </a>
        </li>
        <li class="flex items-center group gap-2">
            <Arrow />
            <a
                href="/music/top-picks"
                class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
            >
                Top picks
            </a>
        </li>
    </ul>
</div>
