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

	function mountDithering(src: string, darkSrc = src): Attachment<HTMLDivElement> {
		return (host) => {
			const root = document.documentElement;
			const currentSrc = () => (root.classList.contains('dark') ? darkSrc : src);
			let image = new Image();
			let shader: ShaderMount | undefined;

			// Swap the shader's texture when the theme class changes.
			const swapImage = () => {
				const next = currentSrc();
				if (!shader || image.src.endsWith(next)) return;
				const nextImage = new Image();
				nextImage.addEventListener(
					'load',
					() => {
						image = nextImage;
						shader?.setUniforms({ u_image: nextImage });
					},
					{ once: true }
				);
				nextImage.src = next;
			};
			const observer = new MutationObserver(swapImage);

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
					observer.observe(root, { attributes: true, attributeFilter: ['class'] });
					// The theme may have changed while the first image was loading.
					swapImage();
				} catch {
					// Keep the image fallback when WebGL is unavailable.
				}
			};

			image.addEventListener('load', mountShader, { once: true });
			image.src = currentSrc();

			return () => {
				observer.disconnect();
				image.removeEventListener('load', mountShader);
				shader?.dispose();
			};
		};
	}
</script>

<div class="relative size-full">
	<img {src} alt="" width="1344" class={['size-full object-cover', darkSrc && 'dark:hidden']} />
	{#if darkSrc}
		<img src={darkSrc} alt="" width="1344" class="hidden size-full object-cover dark:block" />
	{/if}
	<div {@attach mountDithering(src, darkSrc)} aria-hidden="true" class="absolute inset-0"></div>
</div>
