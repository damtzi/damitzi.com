<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<h1 class={cn('text-3xl font-serif font-medium', className)}>
	{@render children()}
</h1>
