<!--
	PROTOTYPE — Variant A "Clip island".
	One surface, always rendered at full panel size, clipped down to the pill with
	clip-path: inset(... round). Opening un-clips it with a bouncy spring (linear()),
	closing tucks it back with a no-bounce spring. The pill is the panel's footer,
	so the menu grows up and out of it. GPU-friendly: only clip-path/opacity/filter move.
	The surface is opaque with a drop-shadow on the wrapper (a clip-path would cut
	off a box-shadow). Frosted glass was tried and rejected.
-->
<script lang="ts">
	import { cn } from '@/lib/utils';
	import { links, MenuState, springClose, springOpen, springTimeAt } from './menu-state.svelte';

	let { pathname }: { pathname: string } = $props();
	const menu = new MenuState();

	// The clip edge travels up the list (p-2 padding + 44px rows + 2px gaps).
	// Reveal each link when the edge passes its midpoint: bottom-up, following
	// the spring's real timing, so it's naturally non-uniform (fast early, then slows).
	const LIST_H = 8 + links.length * 44 + (links.length - 1) * 2 + 8;
	const revealDelay = links.map((_, i) => {
		const fromBottom = links.length - 1 - i;
		const midpoint = 8 + 22 + fromBottom * 46;
		return Math.round(springTimeAt(midpoint / LIST_H));
	});
</script>

<svelte:document
	onkeydown={menu.onKeydown}
	onpointerdown={menu.onPointerdown}
	{@attach menu.closeOnNavigation}
/>

<div
	bind:this={menu.root}
	class="wrap fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50"
	style:--spring-open={springOpen}
	style:--spring-close={springClose}
	data-open={menu.isOpen}
>
	<div class="island bg-background text-foreground">
		<nav
			id="primary-navigation"
			aria-label="Primary"
			aria-hidden={!menu.isOpen}
			inert={!menu.isOpen}
			class="content p-2"
		>
			<ul class="flex flex-col gap-0.5">
				{#each links as link, i (link.href)}
					{@const isActive = link.match(pathname)}
					<li class="item" style:--delay="{revealDelay[i]}ms">
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

		<div class="footer">
			<button
				bind:this={menu.trigger}
				type="button"
				aria-controls="primary-navigation"
				aria-expanded={menu.isOpen}
				aria-label={menu.isOpen ? 'Close menu' : 'Open menu'}
				onclick={menu.toggle}
				class="trigger text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
			>
				<span class="icon" aria-hidden="true">
					<span class="bar top"></span>
					<span class="bar mid"></span>
					<span class="bar bot"></span>
				</span>
				<span class="labels">
					<span class="label" data-show={!menu.isOpen}>Menu</span>
					<span class="label" data-show={menu.isOpen}>Close</span>
				</span>
			</button>
		</div>
	</div>
</div>

<style>
	.wrap {
		/* the island has a 16px invisible gutter so spring overshoot has room to show */
		translate: -50% 16px;
		filter: drop-shadow(0 10px 24px rgb(0 0 0 / 0.16));
	}

	.island {
		--g: 16px;
		--pill-w: 104px;
		--pill-h: 44px;
		box-sizing: border-box;
		width: calc(176px + 2 * var(--g));
		padding: var(--g);
		clip-path: inset(
			calc(100% - var(--g) - var(--pill-h)) calc(50% - var(--pill-w) / 2) var(--g)
				calc(50% - var(--pill-w) / 2) round 22px
		);
		transition: clip-path 440ms var(--spring-close);
	}
	[data-open='true'] .island {
		clip-path: inset(var(--g) round 20px);
		transition: clip-path 820ms var(--spring-open);
	}

	/* links: on open, each one surfaces as the clip edge passes it (bottom-up,
	   delay per item from the spring). On close, all out together, fast, no stagger. */
	.item {
		opacity: 0;
		filter: blur(4px);
		translate: 0 8px;
		transition:
			opacity 100ms ease-out,
			filter 100ms ease-out,
			translate 100ms ease-out;
	}
	[data-open='true'] .item {
		opacity: 1;
		filter: blur(0);
		translate: 0 0;
		transition:
			opacity 200ms ease-out var(--delay),
			filter 200ms ease-out var(--delay),
			translate 360ms cubic-bezier(0.19, 1, 0.22, 1) var(--delay);
	}

	.footer {
		display: flex;
		justify-content: center;
		height: var(--pill-h);
	}
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: var(--pill-w);
		height: 100%;
		border-radius: 22px;
		transition: scale 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
	.trigger:active {
		scale: 0.97;
	}

	/* hamburger → cross. Open: bars converge to the centre, then rotate into the
	   X on the panel's spring (tiny overshoot wobble). Close: unrotate first, then
	   spread — the reverse order, quicker, no bounce. Spans not SVG, so
	   transform-origin is simply each bar's own centre. */
	.icon {
		position: relative;
		width: 14px;
		height: 12px;
		flex-shrink: 0;
	}
	.bar {
		position: absolute;
		left: 0;
		width: 100%;
		height: 1.5px;
		border-radius: 1px;
		background: currentColor;
		transition:
			translate 160ms cubic-bezier(0.19, 1, 0.22, 1) 120ms,
			rotate 160ms cubic-bezier(0.19, 1, 0.22, 1),
			opacity 120ms ease-out 100ms,
			scale 160ms cubic-bezier(0.19, 1, 0.22, 1) 100ms;
	}
	.top {
		top: 0;
	}
	.mid {
		top: calc(50% - 0.75px);
	}
	.bot {
		bottom: 0;
	}
	[data-open='true'] .bar {
		transition:
			translate 140ms cubic-bezier(0.19, 1, 0.22, 1),
			rotate 600ms var(--spring-open) 110ms,
			opacity 100ms ease-out,
			scale 140ms cubic-bezier(0.19, 1, 0.22, 1);
	}
	[data-open='true'] .top {
		translate: 0 5.25px;
		rotate: 45deg;
	}
	[data-open='true'] .bot {
		translate: 0 -5.25px;
		rotate: -45deg;
	}
	[data-open='true'] .mid {
		opacity: 0;
		scale: 0.3 1;
	}

	/* both labels share one grid cell so the pill width never jumps */
	.labels {
		display: grid;
	}
	.label {
		grid-area: 1 / 1;
		justify-self: center;
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
		[data-open='true'] .island {
			transition: clip-path 0ms;
		}
		/* reduced motion: no movement, no stagger — just one gentle fade */
		.item,
		[data-open='true'] .item {
			translate: 0 0;
			filter: none;
			transition-delay: 0ms;
		}
		.trigger:active {
			scale: 1;
		}
		.label {
			filter: none;
			scale: 1;
		}
		/* icon snaps between states (no travel/rotation); only the middle bar fades */
		.bar,
		[data-open='true'] .bar {
			transition: opacity 150ms ease;
		}
	}
</style>
