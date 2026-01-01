<script>
	import { onMount } from 'svelte';

	let time = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	const formattedTime = $derived(
		new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: 'Europe/Warsaw'
		}).format(time)
	);
</script>

<footer class="pt-2 flex items-center justify-end border-t border-pure-blue">
	<div class="flex gap-2 items-center font-mono">
		Gdynia
		<svg width="6" height="6" class="animate-pulse">
			<circle cx="3" cy="3" r="3" fill="#0007fb"></circle>
		</svg>
		<span>{formattedTime}</span>
	</div>
</footer>
