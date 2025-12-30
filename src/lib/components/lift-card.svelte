<script lang="ts">
	import { formatTime } from '$lib/utils';

	let {
		date,
		maxHeartRate,
		movingTime
	}: {
		date: string;
		maxHeartRate: number;
		movingTime: number; // seconds
	} = $props();

	// Format date to "12 May 2025"
	const formattedDate = new Date(date).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});
</script>

<div class="flex flex-col gap-2 bg-background border border-gray-300 shadow rounded-md px-4 py-2">
	<h3>{formattedDate}</h3>
	<div class="grid grid-cols-2">
		<div class="text-sm flex flex-col">
			<span class="text-gray-500">Max Heart Rate</span>
			<span class="font-mono">
				{maxHeartRate}
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
