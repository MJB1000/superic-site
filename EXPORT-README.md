# Super Eye See (SuperIC) — full project export

Packed: 2026-11-26 (UTC)

## What's inside

| Path | What it is |
| --- | --- |
| `src/` | All application code — pages, components, hooks, lib, tests |
| `public/` | Static assets: favicons, placeholder, robots.txt |
| `index.html` | App shell with page title, meta description, og/twitter tags |
| `AGENTS.md` | Project instructions the agent must follow |
| `CONTEXT-DECISIONS.md` | Why the code looks like this: positioning, rejected ideas, CMS boundaries |
| `memory/` | Project memory: brand tone, design system, tech stack, feature constraints, SEO |
| `.lovable/plan.md` | The approved plan for the analog/human design layer |
| `.lovable/vite.config.ts` | Platform-managed Vite config override |
| `package.json`, `bun.lock`, `bun.lockb`, `package-lock.json` | Dependencies and lockfiles |
| `tailwind.config.ts`, `src/index.css` | Design tokens, theme, animations |
| `tsconfig*.json`, `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `postcss.config.js` | Build, typecheck, test and lint config |
| `playwright.config.ts`, `playwright-fixture.ts` | Browser test setup |
| `components.json` | shadcn/ui setup |
| `README.md` | Project readme (still the template placeholder) |

## Excluded on purpose
- `node_modules/` — reinstall with `bun install` (or `npm install`)
- `.git/`, `.oj-cache/`, `dist/`, `*.tsbuildinfo` — repository metadata and generated build output

## Run it

```bash
bun install
bun run dev      # Vite dev server
bun run test     # vitest
bun run build    # production build
```

## Stack
React 18 + Vite 5 + TypeScript 5 + Tailwind CSS v3, shadcn/ui, TanStack Query,
Sanity CMS (project `qs95bq7w`), Beehiiv newsletter API, anime.js.

## Routes
`/` homepage · `/v4`, `/v4-matrix`, `/v3` alternate homepage variants ·
`/blog`, `/blog/:slug`, `/category/:slug` · `/newsletter` · `/projects` ·
`/tools` · `/reads` · `/social` · `*` not found
