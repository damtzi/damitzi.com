<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';

	const toggleTheme = () => {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle Theme"
	class="relative cursor-pointer"
>
	<HugeiconsIcon
		icon={Sun01Icon}
		size={16}
		strokeWidth={2}
		class="size-4 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
	/>
	<HugeiconsIcon
		icon={Moon02Icon}
		size={16}
		strokeWidth={2}
		class="absolute inset-0 size-4 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
