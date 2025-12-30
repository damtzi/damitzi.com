<script lang="ts">
    import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<h3 class={cn('text-xl font-serif font-medium', className)}>
	{@render children()}
</h3>
