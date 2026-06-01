import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://damitzi.com',
	integrations: [react(), mdx()],

	env: {
		schema: {
			DISCOGS_TOKEN: envField.string({ context: 'server', access: 'secret' }),
			STRAVA_CLIENT_ID: envField.string({ context: 'server', access: 'secret' }),
			STRAVA_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret' }),
			STRAVA_REFRESH_TOKEN: envField.string({ context: 'server', access: 'secret' })
		}
	},

	adapter: cloudflare({
		imageService: 'compile'
	}),

	vite: {
		plugins: [tailwindcss()]
	}
});
