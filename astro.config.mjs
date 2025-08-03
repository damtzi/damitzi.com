// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  adapter: cloudflare({
      imageService: 'compile'
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
});
