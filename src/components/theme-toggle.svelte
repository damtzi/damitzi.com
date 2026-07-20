<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';

	const toggleTheme = () => {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle Theme"
	class="relative hidden cursor-pointer sm:block"
>
	<Sun class="size-6 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	<Moon
		class="absolute inset-0 size-6 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
