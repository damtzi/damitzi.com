import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://damitzi.com',
	integrations: [svelte(), mdx()],

	env: {
		schema: {
			DISCOGS_TOKEN: envField.string({ context: 'server', access: 'secret' })
		}
	},

	adapter: cloudflare({
		imageService: 'compile'
	}),

	vite: {
		plugins: [tailwindcss()]
	}
});
