<!--
	PROTOTYPE — throwaway. Question: "How should the Menu pill morph to feel like
	Dynamic Island?" Three motion variants plus the current nav, switchable via
	?variant=A|B|C|current and a floating bar (top-centre, so it doesn't collide
	with the nav). Mounted from base.astro in dev only.
-->
<script lang="ts">
	import type { Component } from 'svelte';
	import FloatingNav from '../floating-nav.svelte';
	import VariantA from './variant-a-clip-island.svelte';
	import VariantB from './variant-b-spring-blob.svelte';
	import VariantC from './variant-c-wide-island.svelte';

	let { pathname }: { pathname: string } = $props();

	const variants: { key: string; name: string; component: Component<{ pathname: string }> }[] = [
		{ key: 'A', name: 'Clip island — clip-path + CSS spring', component: VariantA },
		{ key: 'B', name: 'Spring blob — JS spring w/h, glass', component: VariantB },
		{ key: 'C', name: 'Wide island — staged width→height, chips', component: VariantC },
		{ key: 'current', name: 'Current (baseline)', component: FloatingNav }
	];
	const STORAGE_KEY = 'prototype:floating-nav-variant';

	let index = $state(0);
	const current = $derived(variants[index]);

	$effect(() => {
		const fromUrl = new URL(location.href).searchParams.get('variant');
		const key = fromUrl ?? sessionStorage.getItem(STORAGE_KEY);
		const found = variants.findIndex((v) => v.key.toLowerCase() === key?.toLowerCase());
		if (found !== -1) index = found;
	});

	const go = (delta: number) => {
		index = (index + delta + variants.length) % variants.length;
		const key = variants[index].key;
		sessionStorage.setItem(STORAGE_KEY, key);
		const url = new URL(location.href);
		url.searchParams.set('variant', key);
		history.replaceState(history.state, '', url);
	};

	const onKeydown = (event: KeyboardEvent) => {
		const el = document.activeElement as HTMLElement | null;
		if (el?.closest('input, textarea, select, [contenteditable]')) return;
		if (event.key === 'ArrowLeft') go(-1);
		if (event.key === 'ArrowRight') go(1);
	};
</script>

<svelte:document onkeydown={onKeydown} />

{#key current.key}
	<current.component {pathname} />
{/key}

<div
	data-prototype-ui
	class="fixed top-3 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#ff2d8a] p-1 font-mono text-xs text-white shadow-lg"
>
	<button
		type="button"
		class="size-8 rounded-full hover:bg-white/20"
		onclick={() => go(-1)}
		aria-label="Previous variant">←</button
	>
	<span class="px-2 whitespace-nowrap"><strong>{current.key}</strong> · {current.name}</span>
	<button
		type="button"
		class="size-8 rounded-full hover:bg-white/20"
		onclick={() => go(1)}
		aria-label="Next variant">→</button
	>
</div>
