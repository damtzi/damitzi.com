<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import {
		ShaderFitOptions,
		ShaderMount,
		getShaderColorFromString,
		imageDitheringFragmentShader,
		type ImageDitheringUniforms
	} from '@paper-design/shaders';

	let { src, darkSrc }: { src: string; darkSrc?: string } = $props();

	// Each theme gets its own static shader layer; the dark layer crossfades in
	// on top of the light one, so the theme swap is a CSS opacity transition
	// rather than an instant texture swap.
	function mountDithering(src: string): Attachment<HTMLDivElement> {
		return (host) => {
			const image = new Image();
			let shader: ShaderMount | undefined;

			const mountShader = () => {
				const uniforms: ImageDitheringUniforms = {
					u_image: image,
					u_colorBack: getShaderColorFromString('#000000'),
					u_colorFront: getShaderColorFromString('#ffffff'),
					u_colorHighlight: getShaderColorFromString('#ffffff'),
					u_originalColors: true,
					u_inverted: false,
					u_type: 4,
					u_pxSize: 1.4,
					u_colorSteps: 5,
					u_fit: ShaderFitOptions.cover,
					u_scale: 1,
					u_rotation: 0,
					u_originX: 0.5,
					u_originY: 0.5,
					u_offsetX: 0,
					u_offsetY: 0,
					u_worldWidth: 0,
					u_worldHeight: 0
				};

				try {
					shader = new ShaderMount(host, imageDitheringFragmentShader, uniforms);
				} catch {
					// Keep the image fallback when WebGL is unavailable.
				}
			};

			image.addEventListener('load', mountShader, { once: true });
			image.src = src;

			return () => {
				image.removeEventListener('load', mountShader);
				shader?.dispose();
			};
		};
	}
</script>

<div class="relative size-full">
	<div class="absolute inset-0">
		<img {src} alt="" width="1344" class="size-full object-cover" />
		<div {@attach mountDithering(src)} aria-hidden="true" class="absolute inset-0"></div>
	</div>
	{#if darkSrc}
		<div
			class="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out dark:opacity-100"
		>
			<img src={darkSrc} alt="" width="1344" class="size-full object-cover" />
			<div {@attach mountDithering(darkSrc)} aria-hidden="true" class="absolute inset-0"></div>
		</div>
	{/if}
</div>
