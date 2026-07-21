<script lang="ts">
	let isDark = $state(false);

	const syncTheme = () => {
		isDark = document.documentElement.classList.contains('dark');
	};

	const toggleTheme = () => {
		isDark = !document.documentElement.classList.contains('dark');
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};

	$effect(() => {
		syncTheme();
		document.addEventListener('astro:after-swap', syncTheme);
		return () => document.removeEventListener('astro:after-swap', syncTheme);
	});
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label={`Use ${isDark ? 'light' : 'dark'} theme`}
	class="theme-toggle"
>
	<span class="theme-toggle__orbit" aria-hidden="true">
		<span class="theme-toggle__moon"></span>
	</span>
</button>
