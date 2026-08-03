# damitzi.com

Welcome to my corner of the web.

## Getting Started

To run the site locally, follow these steps:

```sh
# install dependencies
pnpm install

# run development server
pnpm run dev
```

## Vinyl collection

The vinyl collection is an Astro content collection. Each record has:

- A JSON entry in `src/content/vinyls/<slug>.json`
- A square WebP cover in `src/assets/vinyls/<slug>.webp`

To add a record, copy an existing JSON entry, update its metadata and `added`
date, and add the matching local cover. The JSON filename becomes the record's
URL under `/music/vinyls/<slug>`.

## Stack

To build the website, I'm using:

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
