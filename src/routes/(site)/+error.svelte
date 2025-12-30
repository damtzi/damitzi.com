<script lang="ts">
	import { page } from '$app/state';
</script>

<h1 class="text-2xl font-serif font-medium">Error: {page.status}</h1>
<span>
	Looks like something went wrong:
	{#if page.error}
		{page.error.message}
	{:else}
		{page.status}
	{/if}
</span>
