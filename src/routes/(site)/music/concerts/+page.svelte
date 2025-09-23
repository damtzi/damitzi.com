<script lang="ts">
    import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
    import SeoHead from '$lib/components/seo-head.svelte';
    import concerts from '$lib/assets/data/concerts.json';
    import { dateFormatter } from '$lib/utils';

    // Sort concerts by date (newest first, oldest last)
    const sortedConcerts = concerts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Group concerts by year
    const concertsByYear = sortedConcerts.reduce(
        (acc, concert) => {
            const year = new Date(concert.date).getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(concert);
            return acc;
        },
        {} as Record<number, typeof concerts>
    );

    // Get years in descending order (newest first)
    const years = Object.keys(concertsByYear)
        .map(Number)
        .sort((a, b) => b - a);
</script>

<SeoHead title="Concert Tracker" description="All the concerts I've attended" />

<div class="flex flex-col gap-4">
    <h1 class="text-2xl font-serif font-medium">My concerts</h1>
    <Breadcrumbs />
    <div class="space-y-6 w-full">
        {#each years as year (year)}
            <div class="space-y-2">
                <h2 class="text-lg font-semibold font-mono text-gray-500 border-b border-gray-200 pb-1">
                    {year}
                </h2>
                    <ul class="space-y-2 w-full">
                        {#each concertsByYear[year] as concert (concert.id)}
                            <li class="flex flex-col md:flex-row md:items-center md:justify-between group">
                                <span>{concert.artist}</span>
                                <span>
                                    {dateFormatter(concert.date)} @ {concert.location} {concert.festival && `[${concert.festival} Festival]`}
                                </span>
                            </li>
                        {/each}
                    </ul>
            </div>
        {/each}
    </div>
</div>
