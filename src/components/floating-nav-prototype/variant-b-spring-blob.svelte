<!--
	PROTOTYPE — Variant B "Spring blob".
	One glass surface (keeps backdrop-blur + border) whose width/height/radius are
	driven by a real JS spring (svelte/motion Spring). Unlike CSS, the spring keeps
	its velocity when you interrupt it (spam the button), which is the most
	"organic" behaviour. Content is absolutely anchored bottom-centre so the
	resize never reflows it. Cost: layout props animate on the main thread.
	A small tuning panel (top-right) lets you dial stiffness/damping live.
-->
<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { cn } from '@/lib/utils';
	import { links, MenuState } from './menu-state.svelte';

	let { pathname }: { pathname: string } = $props();
	const menu = new MenuState();

	const PANEL_W = 176;
	const PILL = { w: 80, h: 44, r: 22 };

	let navHeight = $state(0);
	let tune = $state({
		openStiffness: 0.1,
		openDamping: 0.45,
		closeStiffness: 0.2,
		closeDamping: 0.9
	});

	const size = new Spring(PILL, { stiffness: 0.15, damping: 0.8 });
	const reduceMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	$effect(() => {
		const open = menu.isOpen;
		const target = open ? { w: PANEL_W, h: navHeight + PILL.h, r: 20 } : PILL;
		size.stiffness = open ? tune.openStiffness : tune.closeStiffness;
		size.damping = open ? tune.openDamping : tune.closeDamping;
		size.set(target, { instant: reduceMotion });
	});
</script>

<svelte:document
	onkeydown={menu.onKeydown}
	onpointerdown={menu.onPointerdown}
	{@attach menu.closeOnNavigation}
/>

<div
	bind:this={menu.root}
	class="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 overflow-hidden border border-foreground/10 bg-background/90 text-foreground shadow-[0_12px_40px_rgb(0_0_0/0.18)] backdrop-blur-md"
	style:width="{size.current.w}px"
	style:height="{size.current.h}px"
	style:border-radius="{size.current.r}px"
	data-open={menu.isOpen}
>
	<div class="absolute bottom-0 left-1/2 -translate-x-1/2" style:width="{PANEL_W}px">
		<nav
			id="primary-navigation"
			aria-label="Primary"
			aria-hidden={!menu.isOpen}
			inert={!menu.isOpen}
			bind:clientHeight={navHeight}
			class="content p-2"
		>
			<ul class="flex flex-col gap-0.5">
				{#each links as link (link.href)}
					{@const isActive = link.match(pathname)}
					<li>
						<a
							href={link.href}
							aria-current={isActive ? 'page' : undefined}
							onclick={menu.close}
							class={cn(
								'flex min-h-11 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent',
								isActive && 'text-foreground'
							)}
						>
							<span
								aria-hidden="true"
								class={cn(
									'size-1.5 shrink-0 rounded-full',
									isActive ? 'bg-accent' : 'bg-transparent'
								)}
							></span>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex h-11 justify-center">
			<button
				bind:this={menu.trigger}
				type="button"
				aria-controls="primary-navigation"
				aria-expanded={menu.isOpen}
				aria-label={menu.isOpen ? 'Close menu' : 'Open menu'}
				onclick={menu.toggle}
				class="trigger relative h-full w-20 rounded-full text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
			>
				<span class="label" data-show={!menu.isOpen}>Menu</span>
				<span class="label" data-show={menu.isOpen}>Close</span>
			</button>
		</div>
	</div>
</div>

<aside
	data-prototype-ui
	class="fixed top-16 right-3 z-[60] w-56 rounded-lg bg-black/85 p-3 font-mono text-[11px] text-white shadow-lg"
>
	<p class="mb-2 font-semibold">Spring tuning (B)</p>
	{#each [['openStiffness', 0.02, 0.4], ['openDamping', 0.1, 1], ['closeStiffness', 0.02, 0.4], ['closeDamping', 0.1, 1]] as const as [key, min, max] (key)}
		<label class="mb-1 flex items-center justify-between gap-2">
			<span>{key}</span>
			<input type="range" {min} {max} step="0.01" bind:value={tune[key]} class="w-20" />
			<span class="w-8 text-right">{tune[key].toFixed(2)}</span>
		</label>
	{/each}
	<p class="mt-2 text-white/60">
		w {size.current.w.toFixed(0)} · h {size.current.h.toFixed(0)} · r {size.current.r.toFixed(0)}
	</p>
</aside>

<style>
	.content {
		opacity: 0;
		filter: blur(4px);
		translate: 0 6px;
		transition:
			opacity 100ms ease-out,
			filter 100ms ease-out,
			translate 100ms ease-out;
	}
	[data-open='true'] .content {
		opacity: 1;
		filter: blur(0);
		translate: 0 0;
		transition:
			opacity 220ms ease-out 70ms,
			filter 220ms ease-out 70ms,
			translate 320ms cubic-bezier(0.19, 1, 0.22, 1) 70ms;
	}
	.trigger {
		transition: scale 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
	.trigger:active {
		scale: 0.97;
	}
	.label {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		opacity: 0;
		filter: blur(2px);
		scale: 0.92;
		transition:
			opacity 150ms ease-out,
			filter 150ms ease-out,
			scale 150ms ease-out;
	}
	.label[data-show='true'] {
		opacity: 1;
		filter: blur(0);
		scale: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.content,
		[data-open='true'] .content {
			translate: 0 0;
			filter: none;
		}
		.label {
			filter: none;
			scale: 1;
		}
	}
</style>
