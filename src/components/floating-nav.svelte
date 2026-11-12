<script lang="ts">
	import { tick } from 'svelte';
	import { springTimeAt } from '@/lib/spring';
	import { cn } from '@/lib/utils';

	type NavLink = { href: string; label: string; match: (path: string) => boolean };

	const links: NavLink[] = [
		{ href: '/', label: 'Home', match: (p) => p === '/' },
		{ href: '/about', label: 'About', match: (p) => p === '/about' },
		{ href: '/projects', label: 'Projects', match: (p) => p === '/projects' },
		{ href: '/hobbies', label: 'Hobbies', match: (p) => p === '/hobbies' },
		{ href: '/music', label: 'Music', match: (p) => p.includes('/music') },
		{ href: '/bread', label: 'Bread', match: (p) => p.includes('/bread') },
		{ href: '/socials', label: 'Socials', match: (p) => p === '/socials' }
	];

	// The open panel's top edge sweeps up the list (8px padding, 44px rows,
	// 2px gaps). Each link reveals as the edge passes its midpoint, timed off
	// the same spring as the `--spring-open` curve below, so the stagger runs
	// bottom-up and is naturally uneven: quick at first, then slowing as the spring settles.
	const ROW = 44;
	const GAP = 2;
	const PAD = 8;
	const listHeight = PAD * 2 + links.length * ROW + (links.length - 1) * GAP;
	const revealDelays = links.map((_, i) => {
		const rowsFromBottom = links.length - 1 - i;
		const midpoint = PAD + ROW / 2 + rowsFromBottom * (ROW + GAP);
		return Math.round(springTimeAt(midpoint / listHeight));
	});

	let { pathname }: { pathname: string } = $props();
	let isOpen = $state(false);
	let menuElement: HTMLDivElement;
	let triggerElement: HTMLButtonElement;

	const closeMenu = () => {
		isOpen = false;
	};
	const closeOnEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isOpen) {
			closeMenu();
			triggerElement.focus();
		}
	};
	const closeOnOutsideClick = (event: PointerEvent) => {
		if (isOpen && !menuElement.contains(event.target as Node)) closeMenu();
	};
	const closeOnNavigation = (document: Document) => {
		document.addEventListener('astro:before-swap', closeMenu);
		return () => document.removeEventListener('astro:before-swap', closeMenu);
	};

	const toggleMenu = async () => {
		isOpen = !isOpen;
		if (isOpen) {
			await tick();
			menuElement.querySelector<HTMLAnchorElement>('nav a')?.focus({ preventScroll: true });
		}
	};
</script>

<svelte:document
	onkeydown={closeOnEscape}
	onpointerdown={closeOnOutsideClick}
	{@attach closeOnNavigation}
/>

<!--
	One surface that morphs out of the pill, Dynamic Island-style. The panel is
	always rendered at full size and clip-path'd down to the pill; opening
	un-clips it on a bouncy spring, closing tucks it back with no bounce. The pill
	is the panel's footer, so the menu grows up and out of it.
-->
<div
	bind:this={menuElement}
	class="menu fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50"
	data-open={isOpen}
>
	<div class="surface bg-elevated text-foreground">
		<nav
			id="primary-navigation"
			aria-label="Primary"
			aria-hidden={!isOpen}
			inert={!isOpen}
			class="p-2"
		>
			<ul class="flex flex-col gap-0.5">
				{#each links as link, i (link.href)}
					{@const isActive = link.match(pathname)}
					<li class="item" style:--reveal-delay="{revealDelays[i]}ms">
						<a
							href={link.href}
							aria-current={isActive ? 'page' : undefined}
							onclick={closeMenu}
							class={cn(
								'flex min-h-11 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent dark:hover:bg-foreground/7',
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
				bind:this={triggerElement}
				type="button"
				aria-controls="primary-navigation"
				aria-expanded={isOpen}
				onclick={toggleMenu}
				class="trigger text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
			>
				<span class="icon" aria-hidden="true">
					<span class="bar bar-top"></span>
					<span class="bar bar-middle"></span>
					<span class="bar bar-bottom"></span>
				</span>
				<span class="labels">
					<span class="label" aria-hidden={isOpen} data-show={!isOpen}>Menu</span>
					<span class="label" aria-hidden={!isOpen} data-show={isOpen}>Close</span>
				</span>
			</button>
		</div>
	</div>
</div>

<style>
	.menu {
		/* Springs as linear() curves, generated from (duration, bounce):
		   open  (0.5s, 0.3) settles in ~820ms with ~4.5% overshoot;
		   close (0.3s, 0)   settles in ~440ms, no overshoot. */
		--spring-open: linear(
			0,
			0.0356,
			0.1238,
			0.2415,
			0.371,
			0.4998,
			0.6196,
			0.7253,
			0.8145,
			0.8867,
			0.9426,
			0.984,
			1.0128,
			1.0313,
			1.0415,
			1.0457,
			1.0454,
			1.0422,
			1.0372,
			1.0314,
			1.0254,
			1.0197,
			1.0145,
			1.0101,
			1.0065,
			1.0036,
			1.0014,
			0.9999,
			0.9989,
			0.9982,
			0.9979,
			0.9979,
			0.998,
			0.9982,
			0.9984,
			0.9987,
			1
		);
		--spring-close: linear(
			0,
			0.0573,
			0.1797,
			0.3199,
			0.4541,
			0.5719,
			0.67,
			0.7491,
			0.8113,
			0.8594,
			0.8959,
			0.9235,
			0.9441,
			0.9593,
			0.9705,
			0.9787,
			0.9847,
			0.989,
			0.9921,
			0.9944,
			0.996,
			0.9971,
			0.998,
			0.9986,
			1
		);
		--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
		--gutter: 16px; /* invisible margin so the spring's overshoot has room to show */
		--pill-w: 104px;
		--pill-h: 44px;

		translate: -50% var(--gutter);
		/* drop-shadow, not box-shadow: it follows the clipped shape. clip-path
		   also eats borders, so the hairline rim is a tight drop-shadow too:
		   rim, contact shadow that anchors it, ambient lift. */
		filter: drop-shadow(0 0 0.5px rgb(0 0 0 / 0.4)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.08))
			drop-shadow(0 12px 28px rgb(0 0 0 / 0.14));
	}
	/* A black shadow vanishes on the near-black page, so dark mode leans on a
	   light rim instead. */
	:global(.dark) .menu {
		filter: drop-shadow(0 0 0.5px rgb(255 255 255 / 0.45)) drop-shadow(0 12px 28px rgb(0 0 0 / 0.6));
	}

	.surface {
		box-sizing: border-box;
		width: calc(11rem + 2 * var(--gutter));
		padding: var(--gutter);
		clip-path: inset(
			calc(100% - var(--gutter) - var(--pill-h)) calc(50% - var(--pill-w) / 2) var(--gutter)
				calc(50% - var(--pill-w) / 2) round 22px
		);
		transition: clip-path 440ms var(--spring-close);
	}
	[data-open='true'] .surface {
		clip-path: inset(var(--gutter) round 20px);
		transition: clip-path 820ms var(--spring-open);
	}

	/* Links: on open each one surfaces as the edge passes it; on close they all
	   leave together, fast. */
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
			opacity 200ms ease-out var(--reveal-delay),
			filter 200ms ease-out var(--reveal-delay),
			translate 360ms var(--ease-out-expo) var(--reveal-delay);
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

	/* Hamburger → cross. Open: bars converge, then rotate on the open spring.
	   Close: unrotate first, then spread, with no bounce. */
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
			translate 160ms var(--ease-out-expo) 120ms,
			rotate 160ms var(--ease-out-expo),
			opacity 120ms ease-out 100ms,
			scale 160ms var(--ease-out-expo) 100ms;
	}
	.bar-top {
		top: 0;
	}
	.bar-middle {
		top: calc(50% - 0.75px);
	}
	.bar-bottom {
		bottom: 0;
	}
	[data-open='true'] .bar {
		transition:
			translate 140ms var(--ease-out-expo),
			rotate 600ms var(--spring-open) 110ms,
			opacity 100ms ease-out,
			scale 140ms var(--ease-out-expo);
	}
	[data-open='true'] .bar-top {
		translate: 0 5.25px;
		rotate: 45deg;
	}
	[data-open='true'] .bar-bottom {
		translate: 0 -5.25px;
		rotate: -45deg;
	}
	[data-open='true'] .bar-middle {
		opacity: 0;
		scale: 0.3 1;
	}

	/* Both labels share one grid cell so the pill never changes width. */
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

	/* Reduced motion: no morph, travel, rotation, or stagger; fades only. */
	@media (prefers-reduced-motion: reduce) {
		.surface,
		[data-open='true'] .surface {
			transition: none;
		}
		.item,
		[data-open='true'] .item {
			translate: 0 0;
			filter: none;
			transition-delay: 0ms;
		}
		.trigger:active {
			scale: 1;
		}
		.bar,
		[data-open='true'] .bar {
			transition: opacity 150ms ease;
		}
		.label {
			filter: none;
			scale: 1;
		}
	}
</style>
