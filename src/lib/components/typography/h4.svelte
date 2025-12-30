<script lang="ts">
    import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<h4 class={cn('text-lg font-serif font-medium', className)}>
	{@render children()}
</h4>
