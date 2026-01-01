<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let isOpen = $state(false);

	// Disable scrolling when hamburger menu is open
	$effect(() => {
		const body = document.querySelector('body');
		if (body) {
			body.classList.toggle('overflow-hidden', isOpen);
		}
	});

	// Reset overflow-hidden class when screen size changes
	onMount(() => {
		const closeHamburgerNav = () => {
			isOpen = false;
		};

		window.addEventListener('orientationchange', closeHamburgerNav);
		window.addEventListener('resize', closeHamburgerNav);

		return () => {
			window.removeEventListener('orientationchange', closeHamburgerNav);
			window.removeEventListener('resize', closeHamburgerNav);
		};
	});

	const toggleMenu = () => {
		isOpen = !isOpen;
	};
</script>

<div class="sm:hidden">
	<!-- Animated button -->
	<button
		class="relative w-10 h-10 text-slate-50 rounded-sm focus:outline-none"
		onclick={toggleMenu}
	>
		<span class="sr-only">Toggle menu</span>
		<div class="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen ? 'rotate-45' : '-translate-y-1.5'
				)}
			>
			</span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen && 'opacity-0'
				)}
			>
			</span>
			<span
				aria-hidden="true"
				class={cn(
					'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
					isOpen ? '-rotate-45' : 'translate-y-1.5'
				)}
			>
			</span>
		</div>
	</button>
	<div class={cn('transition-opacity md:hidden', isOpen ? 'opacity-100' : 'delay-500 opacity-0')}>
		<nav
			class={cn(
				'h-full fixed inset-x-0 z-20 mx-auto bg-background/50 backdrop-blur-lg overflow-auto',
				isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100vw]'
			)}
		>
			<ul
				class={cn(
					'flex h-full flex-col px-6 gap-2',
					'ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300',
					isOpen && '[&_a]:translate-y-0'
				)}
			>
				<li>
					<a
						href="/"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname === '/' ? 'text-foreground' : ''
						)}
					>
						home
					</a>
				</li>
				<li>
					<a
						href="/about"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname === '/about' ? 'text-foreground' : ''
						)}
					>
						about
					</a>
				</li>
				<li>
					<a
						href="/projects"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname === '/projects' ? 'text-foreground' : ''
						)}
					>
						projects
					</a>
				</li>
				<li>
					<a
						href="/hobbies"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname === '/hobbies' ? 'text-foreground' : ''
						)}
					>
						hobbies
					</a>
				</li>
				<li>
					<a
						href="/music"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname.includes('/music') ? 'text-foreground' : ''
						)}
					>
						music
					</a>
				</li>
				<li>
					<a
						href="/bread"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname.includes('/bread') ? 'text-foreground' : ''
						)}
					>
						bread
					</a>
				</li>
				<li>
					<a
						href="/socials"
						class={cn(
							'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
							page.url.pathname === '/socials' ? 'text-foreground' : ''
						)}
					>
						socials
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
