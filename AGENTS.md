# AGENTS.md — guidance for Amp agents working in this repo

## Toolchain

- Node.js 24.x (LTS) and pnpm 10.33.2 (pinned via `packageManager` in package.json).
- Orbs ship Node 20; `.agents/setup` upgrades to Node 24 automatically.
- Framework: Astro 6 (static output for Cloudflare) with Svelte + MDX integrations,
  Tailwind CSS v4.

## Commands

- `pnpm install --frozen-lockfile` — install dependencies
- `pnpm dev` — local dev server
- `pnpm build` — production build (static export for Cloudflare)
- `pnpm check` — Astro/TypeScript typecheck (no secrets needed)
- `pnpm lint` — eslint + `astro check` + prettier (no secrets needed)
- `pnpm format` / `pnpm format:check` — prettier
- `pnpm lint:fix` — eslint --fix

## Secrets and the build

The site has no required build-time secrets or external data fetches. The
vinyl collection and its cover artwork live locally under `src/content/vinyls`
and `src/assets/vinyls`.

There is no test suite; `pnpm check` + `pnpm lint` are the verification gates
(matching CI, which runs `pnpm lint` then `pnpm build`).

## Conventions

- Conventional Commits enforced via commitlint (`.husky/commit-msg`).
- lint-staged runs on pre-commit (`.husky/pre-commit`).
