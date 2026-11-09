// PROTOTYPE — throwaway. Shared open/close behaviour for the floating-nav
// motion variants so each variant file only differs in shape + motion.
import { tick } from 'svelte';

export type NavLink = { href: string; label: string; match: (path: string) => boolean };

export const links: NavLink[] = [
	{ href: '/', label: 'Home', match: (p) => p === '/' },
	{ href: '/about', label: 'About', match: (p) => p === '/about' },
	{ href: '/projects', label: 'Projects', match: (p) => p === '/projects' },
	{ href: '/hobbies', label: 'Hobbies', match: (p) => p === '/hobbies' },
	{ href: '/music', label: 'Music', match: (p) => p.includes('/music') },
	{ href: '/bread', label: 'Bread', match: (p) => p.includes('/bread') },
	{ href: '/socials', label: 'Socials', match: (p) => p === '/socials' }
];

export class MenuState {
	isOpen = $state(false);
	root: HTMLElement | undefined;
	trigger: HTMLButtonElement | undefined;

	close = () => {
		this.isOpen = false;
	};

	toggle = async () => {
		this.isOpen = !this.isOpen;
		if (this.isOpen) {
			await tick();
			this.root?.querySelector<HTMLAnchorElement>('nav a')?.focus({ preventScroll: true });
		}
	};

	onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && this.isOpen) {
			this.close();
			this.trigger?.focus();
		}
	};

	onPointerdown = (event: PointerEvent) => {
		const target = event.target as Element;
		// clicks on prototype tooling (switcher, tuning panel) shouldn't close the menu
		if (target.closest?.('[data-prototype-ui]')) return;
		if (this.isOpen && this.root && !this.root.contains(target)) this.close();
	};

	closeOnNavigation = (document: Document) => {
		document.addEventListener('astro:before-swap', this.close);
		return () => document.removeEventListener('astro:before-swap', this.close);
	};
}

// Time (ms) at which an Apple-style spring (duration s, bounce) first reaches
// `progress` (0..1). Used to fire each link's reveal exactly when the
// expanding clip edge passes over it.
export function springTimeAt(progress: number, duration = 0.5, bounce = 0.3) {
	const k = ((2 * Math.PI) / duration) ** 2;
	const c = (4 * Math.PI * (1 - bounce)) / duration;
	const w0 = Math.sqrt(k);
	const z = c / (2 * w0);
	const wd = w0 * Math.sqrt(1 - z * z);
	const x = (t: number) =>
		1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
	for (let t = 0; t < duration * 2; t += 0.002) if (x(t) >= progress) return t * 1000;
	return duration * 1000;
}

// Spring curves generated from Apple-style (duration, bounce) params.
// open:  duration 0.5,  bounce 0.3  → settles ≈ 820ms, ~4.5% overshoot
// soft:  duration 0.45, bounce 0.15 → settles ≈ 630ms, ~0.6% overshoot
// close: duration 0.3,  bounce 0    → settles ≈ 440ms, no overshoot
export const springOpen =
	'linear(0, 0.0356, 0.1238, 0.2415, 0.371, 0.4998, 0.6196, 0.7253, 0.8145, 0.8867, 0.9426, 0.984, 1.0128, 1.0313, 1.0415, 1.0457, 1.0454, 1.0422, 1.0372, 1.0314, 1.0254, 1.0197, 1.0145, 1.0101, 1.0065, 1.0036, 1.0014, 0.9999, 0.9989, 0.9982, 0.9979, 0.9979, 0.998, 0.9982, 0.9984, 0.9987, 1)';
export const springSoft =
	'linear(0, 0.0258, 0.0898, 0.176, 0.2727, 0.3717, 0.4675, 0.5565, 0.6368, 0.7074, 0.7681, 0.8195, 0.8622, 0.8971, 0.9251, 0.9472, 0.9644, 0.9775, 0.9873, 0.9943, 0.9992, 1.0026, 1.0046, 1.0058, 1.0062, 1.0062, 1.006, 1.0055, 1.0049, 1.0043, 1.0037, 1.0031, 1.0025, 1.0021, 1.0017, 1.0013, 1)';
export const springClose =
	'linear(0, 0.0573, 0.1797, 0.3199, 0.4541, 0.5719, 0.67, 0.7491, 0.8113, 0.8594, 0.8959, 0.9235, 0.9441, 0.9593, 0.9705, 0.9787, 0.9847, 0.989, 0.9921, 0.9944, 0.996, 0.9971, 0.998, 0.9986, 1)';
