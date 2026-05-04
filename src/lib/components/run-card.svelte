<script lang="ts">
	import { formatTime } from '$lib/utils';

	let {
		date,
		distance,
		movingTime
	}: {
		date: string;
		distance: number; // meters
		movingTime: number; // seconds
	} = $props();

	const stats = $derived.by(() => {
		const distanceKm = distance / 1000;
		const paceSecondsPerKm = movingTime / distanceKm;
		const paceMinutes = Math.floor(paceSecondsPerKm / 60);
		const paceSeconds = Math.round(paceSecondsPerKm % 60);

		return {
			distance: `${distanceKm.toFixed(2)}km`,
			pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}/km`,
			formattedDate: new Date(date).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})
		};
	});
</script>

<div class="flex flex-col gap-2 bg-background border border-gray-300 shadow rounded-md px-4 py-2">
	<h3>{stats.formattedDate}</h3>
	<div class="grid grid-cols-3">
		<div class="text-sm flex flex-col">
			<span class="text-gray-500">Distance</span>
			<span class="font-mono">
				{stats.distance}
			</span>
		</div>
		<div class="text-sm flex flex-col">
			<span class="text-gray-500">Pace</span>
			<span class="font-mono">
				{stats.pace}
			</span>
		</div>
		<div class="text-sm flex flex-col">
			<span class="text-gray-500">Duration</span>
			<span class="font-mono">
				{formatTime(movingTime)} mm:ss
			</span>
		</div>
	</div>
</div>
