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
	redirects: {
		'/projects': '/work',
		'/hobbies': '/interests',
		'/socials': '/about',
		'/music': '/interests/music',
		'/music/concerts': '/interests/music/concerts',
		'/music/top-picks': '/interests/music/top-picks',
		'/music/top-picks/[slug]': '/interests/music/top-picks/[slug]',
		'/music/vinyls': '/interests/music/vinyls',
		'/music/vinyls/[slug]': '/interests/music/vinyls/[slug]',
		'/bread': '/interests/kitchen',
		'/bread/[slug]': '/interests/kitchen/[slug]'
	},

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
