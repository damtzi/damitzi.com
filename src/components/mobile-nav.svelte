<script lang="ts">
	import { onMount } from 'svelte';
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

	$effect(() => {
		document.body.classList.toggle('overflow-hidden', isOpen);

		return () => document.body.classList.remove('overflow-hidden');
	});

	onMount(() => {
		const close = () => (isOpen = false);
		window.addEventListener('orientationchange', close);
		window.addEventListener('resize', close);

		return () => {
			window.removeEventListener('orientationchange', close);
			window.removeEventListener('resize', close);
		};
	});
</script>

<div class="lg:hidden">
	<!-- Animated button -->
	<button
		class="relative z-30 h-10 w-10 rounded-sm text-slate-50 focus:outline-none"
		onclick={() => (isOpen = !isOpen)}
	>
		<span class="sr-only">Toggle menu</span>
		<div class="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen ? 'rotate-45' : '-translate-y-1.5'
				)}
			></span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen && 'opacity-0'
				)}
			></span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen ? '-rotate-45' : 'translate-y-1.5'
				)}
			></span>
		</div>
	</button>
	<nav
		class={cn(
			'fixed inset-0 z-20 h-dvh w-full overflow-auto bg-background/70 backdrop-blur-xl transition-opacity duration-300 ease-out',
			isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
		)}
	>
		<ul
			class={cn(
				'flex h-full flex-col justify-center gap-6 px-8',
				'[&_a]:flex [&_a]:w-full [&_a]:items-center [&_a]:text-2xl [&_a]:transition-[color,transform,opacity] [&_a]:duration-300 [&_a]:ease-out',
				isOpen ? '[&_a]:translate-y-0 [&_a]:opacity-100' : '[&_a]:translate-y-4 [&_a]:opacity-0'
			)}
		>
			{#each links as link, i (link.href)}
				<li>
					<a
						href={link.href}
						style:transition-delay={isOpen ? `${i * 40 + 100}ms` : '0ms'}
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:cursor-pointer hover:text-foreground',
							link.match(pathname) && 'text-foreground'
						)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
