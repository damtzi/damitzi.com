<script lang="ts">
	import { page } from '$app/state';

	const segments = page.url.pathname.split('/').filter((segment) => segment !== '');

	const breadcrumbPaths = segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join('/')}`;

		return {
			name: segment,
			href
		};
	});

	breadcrumbPaths.unshift({ name: 'home', href: '/' });
</script>

<nav aria-label="Breadcrumb" class="hidden md:block py-3">
	<ol class="flex flex-wrap items-center text-sm">
		{#each breadcrumbPaths as path, index (path.href)}
			<li class="flex items-center">
				{#if index > 0}
					<div class="mx-3 w-1.5 h-1.5 rounded-full bg-pure-blue"></div>
				{/if}

				{#if index === breadcrumbPaths.length - 1}
					<span>{path.name}</span>
				{:else}
					<a
						href={path.href}
						class="transition-colors duration-150 ease-out text-gray-500 hover:text-pure-blue hover:cursor-pointer"
					>
						{path.name}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
