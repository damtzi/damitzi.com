<script lang="ts">
    import SeoHead from '$lib/components/seo-head.svelte';
    import Arrow from '$lib/components/arrow.svelte';

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
            applications.
        </p>
    </div>

    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            Recent runs
        </h2>
    </div>

    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-serif font-medium">
            Recent pickups
        </h2>
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
