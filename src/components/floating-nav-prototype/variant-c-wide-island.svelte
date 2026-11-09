<!--
	PROTOTYPE — Variant C "Wide island".
	Closest to the real Dynamic Island choreography: a two-stage morph. The pill
	stretches sideways first, then swells upward (staggered width → height), and
	on close it reverses (height first, then width). Links become a wrapped grid
	of chips instead of a vertical list, so the open state is wide and short —
	an island, not a dropdown. CSS transitions with linear() springs (interruptible,
	retargets from current value, but no carried velocity).
-->
<script lang="ts">
	import { cn } from '@/lib/utils';
	import { links, MenuState, springClose, springOpen, springSoft } from './menu-state.svelte';

	let { pathname }: { pathname: string } = $props();
	const menu = new MenuState();
	let contentHeight = $state(0);
</script>

<svelte:document
	onkeydown={menu.onKeydown}
	onpointerdown={menu.onPointerdown}
	{@attach menu.closeOnNavigation}
/>

<div
	bind:this={menu.root}
	class="island fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 overflow-hidden border border-foreground/10 bg-background/90 text-foreground shadow-[0_12px_40px_rgb(0_0_0/0.18)] backdrop-blur-md"
	data-open={menu.isOpen}
	style:--content-h="{contentHeight}px"
	style:--spring-open={springOpen}
	style:--spring-soft={springSoft}
	style:--spring-close={springClose}
>
	<div class="inner absolute bottom-0 left-1/2 -translate-x-1/2">
		<nav
			id="primary-navigation"
			aria-label="Primary"
			aria-hidden={!menu.isOpen}
			inert={!menu.isOpen}
			bind:clientHeight={contentHeight}
			class="content px-3 pt-3 pb-1"
		>
			<ul class="flex flex-wrap justify-center gap-1.5">
				{#each links as link (link.href)}
					{@const isActive = link.match(pathname)}
					<li>
						<a
							href={link.href}
							aria-current={isActive ? 'page' : undefined}
							onclick={menu.close}
							class={cn(
								'flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent',
								isActive
									? 'bg-foreground text-background'
									: 'bg-foreground/5 text-muted hover:bg-foreground/10 hover:text-foreground'
							)}
						>
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

<style>
	.island {
		--open-w: min(calc(100vw - 2rem), 340px);
		width: 80px;
		height: 44px;
		border-radius: 22px;
		/* close: collapse height first, then pull the sides in */
		transition:
			height 300ms var(--spring-close),
			width 440ms var(--spring-close) 110ms;
	}
	.island[data-open='true'] {
		width: var(--open-w);
		height: calc(var(--content-h) + 44px);
		/* open: stretch sideways first, then swell upward */
		transition:
			width 630ms var(--spring-soft),
			height 820ms var(--spring-open) 90ms;
	}
	.inner {
		width: var(--open-w);
	}

	.content {
		opacity: 0;
		filter: blur(4px);
		scale: 0.96;
		transform-origin: bottom center;
		transition:
			opacity 100ms ease-out,
			filter 100ms ease-out,
			scale 100ms ease-out;
	}
	.island[data-open='true'] .content {
		opacity: 1;
		filter: blur(0);
		scale: 1;
		transition:
			opacity 220ms ease-out 140ms,
			filter 220ms ease-out 140ms,
			scale 360ms cubic-bezier(0.19, 1, 0.22, 1) 140ms;
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
		.island,
		.island[data-open='true'] {
			transition: none;
		}
		.content,
		.island[data-open='true'] .content {
			scale: 1;
			filter: none;
		}
		.label {
			filter: none;
			scale: 1;
		}
	}
</style>
