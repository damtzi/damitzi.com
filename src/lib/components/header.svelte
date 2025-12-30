<script lang="ts">
	import PureBlueImg from '$lib/assets/images/0007fb.png';
	import MobileNav from '$lib/components/mobile-nav.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
</script>

<header class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<a href="/">
			<img
				src={PureBlueImg}
				alt="Pure blue, hex code #0007FB."
				class="rounded-full hover:scale-110 transition-transform duration-300"
				width={36}
				height={36}
			/>
		</a>
		<div class="flex flex-col">
			<span>Damian Tziamtzis</span>
			<span class="text-gray-400">Frontend Engineer</span>
		</div>
	</div>
	<ThemeToggle />
	<MobileNav />
</header>
