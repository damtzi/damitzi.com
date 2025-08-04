// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://damitzi.com',

  adapter: cloudflare({
      imageService: 'compile'
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte(), mdx()],
});
