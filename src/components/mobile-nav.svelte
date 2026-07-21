<script lang="ts">
	import { cn } from '@/lib/utils';

	type NavLink = { href: string; label: string; match: (path: string) => boolean };

	const links: NavLink[] = [
		{ href: '/', label: 'home', match: (p) => p === '/' },
		{ href: '/about', label: 'about', match: (p) => p === '/about' },
		{ href: '/projects', label: 'projects', match: (p) => p === '/projects' },
		{ href: '/hobbies', label: 'hobbies', match: (p) => p === '/hobbies' },
		{ href: '/music', label: 'music', match: (p) => p.includes('/music') },
		{ href: '/bread', label: 'bread', match: (p) => p.includes('/bread') },
		{ href: '/socials', label: 'socials', match: (p) => p === '/socials' }
	];

	let { pathname }: { pathname: string } = $props();
	let isOpen = $state(false);
</script>

<div class="contents sm:hidden">
	<button
		type="button"
		class="relative h-10 w-10 justify-self-end text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
		aria-controls="mobile-site-index"
	>
		<span class="sr-only">{isOpen ? 'Close site index' : 'Open site index'}</span>
		<div class="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-px w-5 bg-foreground transition duration-300 ease-out',
					isOpen ? 'rotate-45' : '-translate-y-1.5'
				)}
			></span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-px w-5 bg-foreground transition duration-300 ease-out',
					isOpen && 'opacity-0'
				)}
			></span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-px w-5 bg-foreground transition duration-300 ease-out',
					isOpen ? '-rotate-45' : 'translate-y-1.5'
				)}
			></span>
		</div>
	</button>
	<nav
		id="mobile-site-index"
		aria-label="Site index"
		aria-hidden={!isOpen}
		class={cn(
			'col-span-2 grid transition-[grid-template-rows,margin] duration-300 ease-out',
			isOpen ? 'mt-5 grid-rows-[1fr]' : 'grid-rows-[0fr]'
		)}
	>
		<ul class="grid min-h-0 grid-cols-2 overflow-hidden border-t border-foreground/15">
			{#each links as link, i (link.href)}
				<li class="border-b border-foreground/15 odd:border-r">
					<a
						href={link.href}
						aria-current={link.match(pathname) ? 'page' : undefined}
						tabindex={isOpen ? undefined : -1}
						class={cn(
							'flex items-baseline gap-3 px-2 py-3 font-serif text-lg text-foreground/50 transition-colors hover:text-foreground',
							link.match(pathname) && 'text-foreground'
						)}
					>
						<span
							class={cn(
								'font-mono text-[0.55rem] text-foreground/30',
								link.match(pathname) && 'text-accent'
							)}
						>
							{String(i + 1).padStart(2, '0')}
						</span>
						<span>{link.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
