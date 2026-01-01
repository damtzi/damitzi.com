<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<p class={cn('', className)}>
	{@render children()}
</p>
