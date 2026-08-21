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

## Code quality

The project uses a hybrid setup until Oxc fully supports Astro:

- [Oxlint](https://oxc.rs/docs/guide/usage/linter) lints JavaScript, TypeScript, and
  script blocks in Astro and Svelte files.
- ESLint keeps the Astro and Svelte template rules that Oxlint does not support.
  Rules handled by Oxlint are disabled in ESLint.
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) formats supported files,
  including JavaScript, TypeScript, Svelte, JSON, CSS, Markdown, MDX, and YAML.
- Prettier formats Astro files because Oxfmt does not support them yet.
- `astro check` provides Astro, Svelte, and TypeScript diagnostics.

Use `pnpm lint` to run all checks, `pnpm lint:fix` to fix lint issues, and
`pnpm format` to format all supported files.

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
