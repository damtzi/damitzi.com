import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://damitzi.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()],
  adapter: cloudflare({
    imageService: "compile",
  }),
});
