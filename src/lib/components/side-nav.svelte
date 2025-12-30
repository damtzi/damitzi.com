<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
</script>

<nav class="flex flex-col gap-2">
	<a
		href="/"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname === '/' ? 'text-foreground' : ''
		)}
	>
		home
	</a>
	<a
		href="/about"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/about') ? 'text-foreground' : ''
		)}
	>
		about
	</a>
	<a
		href="/projects"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/projects') ? 'text-foreground' : ''
		)}
	>
		projects
	</a>
	<a
		href="/hobbies"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/hobbies') ? 'text-foreground' : ''
		)}
	>
		hobbies
	</a>
	<a
		href="/music"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/music') ? 'text-foreground' : ''
		)}
	>
		music
	</a>
	<a
		href="/bread"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/bread') ? 'text-foreground' : ''
		)}
	>
		bread
	</a>
	<a
		href="/socials"
		class={cn(
			'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer',
			page.url.pathname.includes('/socials') ? 'text-foreground' : ''
		)}
	>
		socials
	</a>
</nav>
