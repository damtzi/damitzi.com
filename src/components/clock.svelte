<script lang="ts">
	import { onMount } from 'svelte';

	const timeZone = 'Europe/Warsaw';
	const formatter = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone
	});

	let time = $state(new Date());
	let timeParts = $derived(formatter.formatToParts(time));
	let hours = $derived(Number(timeParts.find((part) => part.type === 'hour')?.value));
	let minutes = $derived(Number(timeParts.find((part) => part.type === 'minute')?.value));
	let hourAngle = $derived((hours % 12) * 30 + minutes * 0.5);
	let minuteAngle = $derived(minutes * 6);
	let label = $derived(`Gdynia, Poland — ${formatter.format(time)}`);

	onMount(() => {
		const interval = setInterval(() => (time = new Date()), 60_000);
		return () => clearInterval(interval);
	});
</script>

<div class="local-time" aria-label={label} title={label}>
	<svg class="analog-clock" viewBox="0 0 20 20" aria-hidden="true">
		<circle cx="10" cy="10" r="8.5"></circle>
		<path class="hour-hand" d="M10 10V6" style:transform={`rotate(${hourAngle}deg)`}></path>
		<path class="minute-hand" d="M10 10V3.8" style:transform={`rotate(${minuteAngle}deg)`}></path>
		<circle class="clock-pin" cx="10" cy="10" r="1"></circle>
	</svg>
	<span>Gdynia</span>
	<span class="local-time__value">{formatter.format(time)}</span>
</div>
