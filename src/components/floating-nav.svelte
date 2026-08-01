<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { cn } from '@/lib/utils';

	type NavLink = { href: string; label: string; match: (path: string) => boolean };

	const links: NavLink[] = [
		{ href: '/', label: 'Home', match: (p) => p === '/' },
		{ href: '/about', label: 'About', match: (p) => p === '/about' },
		{ href: '/projects', label: 'Projects', match: (p) => p === '/projects' },
		{ href: '/hobbies', label: 'Hobbies', match: (p) => p === '/hobbies' },
		{ href: '/music', label: 'Music', match: (p) => p.includes('/music') },
		{ href: '/bread', label: 'Bread', match: (p) => p.includes('/bread') },
		{ href: '/socials', label: 'Socials', match: (p) => p === '/socials' }
	];

	let { pathname }: { pathname: string } = $props();
	let isOpen = $state(false);
	let menuElement: HTMLDivElement;
	let triggerElement: HTMLButtonElement;

	const toggleMenu = async () => {
		isOpen = !isOpen;
		if (isOpen) {
			await tick();
			menuElement.querySelector<HTMLAnchorElement>('a')?.focus();
		}
	};

	onMount(() => {
		const close = () => {
			isOpen = false;
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				close();
				triggerElement.focus();
			}
		};
		const closeOnOutsideClick = (event: PointerEvent) => {
			if (isOpen && !menuElement.contains(event.target as Node)) close();
		};

		document.addEventListener('keydown', closeOnEscape);
		document.addEventListener('pointerdown', closeOnOutsideClick);
		document.addEventListener('astro:before-swap', close);

		return () => {
			document.removeEventListener('keydown', closeOnEscape);
			document.removeEventListener('pointerdown', closeOnOutsideClick);
			document.removeEventListener('astro:before-swap', close);
		};
	});
</script>

<div
	bind:this={menuElement}
	class="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2"
>
	<nav
		id="primary-navigation"
		aria-label="Primary"
		aria-hidden={!isOpen}
		inert={!isOpen}
		class={cn(
			'absolute bottom-[calc(100%+0.5rem)] left-1/2 w-44 -translate-x-1/2 origin-bottom rounded-2xl border border-foreground/10 bg-background/90 p-2 shadow-[0_16px_48px_rgb(0_0_0/0.18)] backdrop-blur-md transition-[opacity,transform] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-opacity motion-reduce:duration-150',
			isOpen
				? 'translate-y-0 scale-100 opacity-100 duration-200'
				: 'pointer-events-none translate-y-2 scale-[0.98] opacity-0 duration-150'
		)}
	>
		<ul class="flex flex-col gap-0.5">
			{#each links as link (link.href)}
				{@const isActive = link.match(pathname)}
				<li>
					<a
						href={link.href}
						aria-current={isActive ? 'page' : undefined}
						onclick={() => (isOpen = false)}
						class={cn(
							'flex min-h-11 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent',
							isActive && 'text-foreground'
						)}
					>
						<span
							aria-hidden="true"
							class={cn(
								'size-1.5 shrink-0 rounded-full',
								isActive ? 'bg-accent' : 'bg-transparent'
							)}
						></span>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<button
		bind:this={triggerElement}
		type="button"
		aria-controls="primary-navigation"
		aria-expanded={isOpen}
		onclick={toggleMenu}
		class="flex min-h-11 min-w-20 items-center justify-center rounded-full border border-foreground/10 bg-background/90 px-5 text-sm font-medium text-foreground shadow-[0_8px_32px_rgb(0_0_0/0.16)] backdrop-blur-md transition-[color,background-color,transform] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-background motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
	>
		{isOpen ? 'Close' : 'Menu'}
	</button>
</div>
