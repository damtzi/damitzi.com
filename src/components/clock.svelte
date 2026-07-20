<script lang="ts">
	import { onMount } from 'svelte';

	const formatter = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: 'Europe/Warsaw'
	});

	let time = new Date();

	onMount(() => {
		const interval = setInterval(() => (time = new Date()), 1000);
		return () => clearInterval(interval);
	});
</script>

<span>{formatter.format(time)}</span>
