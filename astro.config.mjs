// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://damitzi.com',

    adapter: cloudflare({
        imageService: 'compile'
    }),

    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [mdx(), react()]
});
