// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  adapter: cloudflare({
      imageService: 'compile'
  }),

  vite: {
    // @ts-expect-error
    // see issue: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
  },
});
