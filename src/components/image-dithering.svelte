<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { ShaderMount } from '@paper-design/shaders';
	import { CoverScenes, coverFragmentShader, type CoverScene } from '@/lib/cover-shader';

	let { src, darkSrc }: { src: string; darkSrc?: string } = $props();

	// Each theme gets its own shader layer; the dark layer crossfades in on top
	// of the light one, so the theme swap is a CSS opacity transition rather
	// than an instant texture swap.
	function mountDithering(src: string, scene: CoverScene): Attachment<HTMLDivElement> {
		return (host) => {
			const image = new Image();
			const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
			let shader: ShaderMount | undefined;

			// Only the layer for the current theme animates; the other one is
			// invisible, so it holds its last frame. Reduced motion holds both.
			const updateSpeed = () => {
				const isDark = document.documentElement.classList.contains('dark');
				const isShowing = !darkSrc || isDark === (scene === 'dusk');
				shader?.setSpeed(isShowing && !reducedMotion.matches ? 1 : 0);
			};

			const mountShader = () => {
				try {
					shader = new ShaderMount(host, coverFragmentShader, {
						u_image: image,
						u_scene: CoverScenes[scene],
						u_pxSize: 1.4,
						u_colorSteps: 5
					});
				} catch {
					// Keep the image fallback when WebGL is unavailable.
					return;
				}
				updateSpeed();
			};

			const themeObserver = new MutationObserver(updateSpeed);
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class']
			});
			reducedMotion.addEventListener('change', updateSpeed);

			image.addEventListener('load', mountShader, { once: true });
			image.src = src;

			return () => {
				image.removeEventListener('load', mountShader);
				reducedMotion.removeEventListener('change', updateSpeed);
				themeObserver.disconnect();
				shader?.dispose();
			};
		};
	}
</script>

<div class="relative size-full">
	<div class="absolute inset-0">
		<img {src} alt="" width="1344" class="size-full object-cover" />
		<div {@attach mountDithering(src, 'day')} aria-hidden="true" class="absolute inset-0"></div>
	</div>
	{#if darkSrc}
		<div
			class="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out dark:opacity-100"
		>
			<img src={darkSrc} alt="" width="1344" class="size-full object-cover" />
			<div
				{@attach mountDithering(darkSrc, 'dusk')}
				aria-hidden="true"
				class="absolute inset-0"
			></div>
		</div>
	{/if}
</div>
