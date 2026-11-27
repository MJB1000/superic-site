---
name: Tech Stack
description: Core technologies, hosting and removed legacy systems
type: reference
---
Frontend: React 18 (Vite 5), TypeScript, Tailwind CSS v3, shadcn/ui. Pages other than `/` are lazy-loaded.
Data: Sanity.io CMS (Project ID: qs95bq7w), TanStack Query. Content types live in `src/lib/sanity.ts`.
Server: one Vercel Function, `api/subscribe.ts` (Beehiiv signups). `bun run dev` serves it via a Vite middleware.
Hosting: Vercel (`vercel.json`: SPA rewrites, asset caching, security headers). Package manager: bun (`bun.lock` is the only lockfile).
Tests: Vitest (unit, `bun run test`), Playwright (browser, `bun run test:e2e`).
Other: anime.js (animations), react-helmet-async (SEO).
Removed: Lovable tooling (2026-11-26), legacy GitHub API.
