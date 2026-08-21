<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ShaderFitOptions,
		ShaderMount,
		getShaderColorFromString,
		imageDitheringFragmentShader,
		type ImageDitheringUniforms
	} from '@paper-design/shaders';

	let { src }: { src: string } = $props();
	let shaderHost: HTMLDivElement;

	onMount(() => {
		const image = new Image();
		let shader: ShaderMount | undefined;
		let disposed = false;

		const mountShader = () => {
			if (disposed) return;

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
				shader = new ShaderMount(shaderHost, imageDitheringFragmentShader, uniforms);
			} catch {
				// Keep the image fallback when WebGL is unavailable.
			}
		};

		image.addEventListener('load', mountShader, { once: true });
		image.src = src;

		return () => {
			disposed = true;
			image.removeEventListener('load', mountShader);
			shader?.dispose();
		};
	});
</script>

<div class="relative size-full">
	<img {src} alt="" width="1344" class="size-full object-cover" />
	<div bind:this={shaderHost} aria-hidden="true" class="absolute inset-0"></div>
</div>
