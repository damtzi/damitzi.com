<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<button
	type="button"
	onclick={toggleMode}
	aria-label="Toggle Theme"
	class="hidden sm:block hover:cursor-pointer relative"
>
	<SunIcon class="s-6 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	<MoonIcon
		class="absolute inset-0 s-6 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
