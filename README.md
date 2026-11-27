# SuperIC (Super Eye See)

An open AI lab for Australian e-commerce operators — builds, training waitlist,
community and field notes. Built in Melbourne.

React 18 · Vite 5 · TypeScript · Tailwind CSS · shadcn/ui · Sanity CMS ·
Beehiiv newsletter · hosted on Vercel.

## Quick start

Requires [bun](https://bun.sh) (`bun.lock` is the only lockfile).

```bash
bun install
cp .env.example .env.local   # then add your Beehiiv API key
bun run dev                  # http://localhost:8080
```

Without `BEEHIIV_API_KEY` the site runs normally; signup forms just show
"Something went wrong" because `/api/subscribe` answers 503.

## Environment variables

| Name | Required | What it's for |
| --- | --- | --- |
| `BEEHIIV_API_KEY` | yes, for signups | Beehiiv → Settings → Integrations → API. Server-side only — never commit it. |
| `BEEHIIV_PUBLICATION_ID` | no | Defaults to the SuperIC publication. |
| `SITE_URL` | no | Sent to Beehiiv as `referring_site`. Defaults to `https://supereyesee.com`. |

Locally they live in `.env.local` (git-ignored). On Vercel: Project → Settings →
Environment Variables.

## Scripts

| Command | Does |
| --- | --- |
| `bun run dev` | Vite dev server, including `/api/subscribe` |
| `bun run build` | Production build into `dist/` |
| `bun run preview` | Serve the production build (no `/api`) |
| `bun run test` | Unit tests (Vitest) |
| `bun run test:e2e` | Browser tests (Playwright, desktop + mobile). First run: `bunx playwright install chromium` |
| `bun run lint` | ESLint |

## Where things live

| Path | What |
| --- | --- |
| `src/pages/` | One file per route. `/` is `Index.tsx`; the others are lazy-loaded (`src/App.tsx`). |
| `src/components/` | Site components; `ui/` is shadcn. |
| `src/lib/builds.ts` | Homepage "current experiments" cards (kept separate from `projects.ts`). |
| `src/lib/projects.ts`, `tools.ts`, `config.ts`, `social.ts`, `now.ts` | Code-driven content. |
| `src/lib/sanity.ts` | Sanity client, GROQ queries and content types. Blog posts come from Sanity. |
| `api/subscribe.ts` | The only server code: Beehiiv signups for every form. |
| `e2e/` | Playwright tests. |
| `AGENTS.md` | Rules for anyone (human or AI) changing the code. |
| `CONTEXT-DECISIONS.md` | Why things look the way they do, and what was rejected. |
| `memory/` | Brand, tone, design-system and feature notes. |
| `docs/` | Design plans and the original Lovable export record. |

## Newsletter signups

Every form uses `src/components/NewsletterForm.tsx`, which posts
`{ email, source }` to `/api/subscribe`. The function adds the API key and
forwards to Beehiiv, tagging the signup with `utm_campaign = source`
(`hero`, `training`, `community`, `footer`, `post`, `newsletter`) so you can
filter by form in Beehiiv. A hidden honeypot field drops bot submissions.

## Deploying to Vercel

1. Import `MJB1000/superic-site` in Vercel. `vercel.json` sets bun, the build
   and SPA rewrites — no other settings needed.
2. Add `BEEHIIV_API_KEY` under Environment Variables (Production and Preview).
3. **Sanity CORS:** in sanity.io/manage → project `qs95bq7w` → API → CORS
   origins, add every origin the site is served from — the production domain,
   your `*.vercel.app` URLs, and `http://localhost:8080` for local dev. Without
   this the browser blocks Sanity and the blog / field notes render empty.
4. Point the domain at Vercel, then submit one real signup and confirm it
   appears in Beehiiv → Audience.
