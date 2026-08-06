import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://damitzi.com',
	integrations: [svelte(), mdx()],

	adapter: cloudflare({
		imageService: 'compile'
	}),

	vite: {
		plugins: [
			tailwindcss(),
			{
				name: 'amp-portal',
				configureServer(server) {
					server.httpServer?.prependListener('request', (request) => {
						delete request.headers['sec-fetch-site'];
						delete request.headers['sec-fetch-mode'];
					});
				}
			}
		],
		server: {
			allowedHosts: ['.onamp.dev', '.e2b.app']
		}
	}
});
