<script lang="ts">
    import SeoHead from '$lib/components/seo-head.svelte';
    import Arrow from '$lib/components/arrow.svelte';
    import RunCard from '$lib/components/run-card.svelte';
    import type { PageProps } from './$types';
    import { slugify } from '$lib/utils';
    import VinylPng from '$lib/assets/images/black-vinyl.png';
    import CdPng from '$lib/assets/images/clear-cd.png';

    const { data }: PageProps = $props();

    const socialLinks = [
        { href: 'https://github.com/damtzi', text: 'github' },
        { href: 'https://bsky.app/profile/damitzi.bsky.social', text: 'bluesky' },
        { href: 'https://www.instagram.com/damitzi__', text: 'instagram' },
        { href: 'https://www.discogs.com/user/damitzi__', text: 'discogs' },
        { href: 'https://www.strava.com/athletes/108759547', text: 'strava' },
        { href: 'mailto:damian.tziamtzis@gmail.com', text: 'email' }
    ];
</script>

<SeoHead title="Home" description="Home page" />

<div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            About me
        </h2>
        <p>
            I am a frontend engineer based in Gdynia, specializing in
            building and maintaining user interfaces for websites and web
            applications. Currently, I'm working on <a
                href="https://klave.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
            >
                Klave
            </a> at <a
                href="https://secretarium.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
            >
                Secretarium
            </a>, crafting intuitive and secure frontends that prioritise
            privacy and security at every step.
        </p>
        <p>
            In my spare time, I am keeping up with the NBA, listening to <a href="/music" class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer">music</a>, running
            and baking <a href="/bread" class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer">bread</a>.
        </p>
    </div>

    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            Recent runs
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each data.runs as run (run.id)}
                <RunCard
                    date={run.start_date_local}
                    distance={run.distance}
                    movingTime={run.moving_time}
                />
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            Recent pickups
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
            {#each data.releases as release (release.id)}
                <a
                    href={`/music/vinyls/${slugify(release.basic_information.title)}`}
                    class="relative group"
                >
                    <img
                        src={release.basic_information.cover_image}
                        alt={release.basic_information.title}
                        width={200}
                        height={200}
                        class="hover:scale-105 hover:cursor-pointer hover:shadow transition-all duration-300 rounded-xs shadow-lg relative z-10 aspect-square"
                    />
                    <img
                        src={
                            release.basic_information.formats
                                .map(format => format.name)
                                .find(name => name === 'Vinyl')
                                ? VinylPng
                                : CdPng
                        }
                        alt={
                            release.basic_information.formats
                                .map(format => format.name)
                                .find(name => name === 'Vinyl')
                                ? 'A black vinyl record'
                                : 'A clear CD'
                        }
                        width={200}
                        height={200}
                        class="absolute top-0 group-hover:translate-x-10 transition-transform duration-300 z-0"
                    />
                </a>
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            Socials
        </h2>
        <p>You can find me on:</p>
        <ul class="space-y-2 w-fit">
            {#each socialLinks as link (link.href)}
                <li class="flex items-center group gap-2">
                    <Arrow />
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
                    >
                        {link.text}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>
