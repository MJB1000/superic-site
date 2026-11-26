## Goal
Introduce two analog/human layers that offset the terminal-green digital feel without breaking the existing brand system (sidebar, kickers, per-section accent colors).

## 1. Handwritten accents

A small, restrained handwritten layer used as *garnish* — never as primary UI text. Pencil-feel, hand-drawn, slightly off-axis.

**Font**: `@fontsource/caveat` (clean, legible handwriting). Installed via bun, imported in `src/main.tsx`, exposed in `tailwind.config.ts` as `font-hand`.

**Where it appears (sparingly):**
- A scrawled annotation next to each page Kicker — e.g. `// projects` printed + `"the ones I actually shipped"` handwritten beside it, slightly rotated, in `text-muted-foreground/60`.
- Hand-drawn underline SVG beneath each page H1 (single wobble stroke in the section's accent color).
- One handwritten margin asterisk + short note per long-form Blog post intro (editor's note feel).
- Hand-drawn arrow SVG pointing from "Subscribe" kicker to the newsletter input.

**New shared components:**
- `src/components/HandNote.tsx` — `<HandNote rotate={-2}>text</HandNote>`, wraps in `font-hand`, sets rotation + muted color.
- `src/components/HandUnderline.tsx` — inline SVG wobble stroke; takes width + color, defaults to `currentColor` so it inherits the section accent.

**Guardrails:** never used inside the sidebar, never inside code-like UI (tools list, hashes, timestamps). Max one handwritten element per visual zone.

## 2. Personal 'now' strip

A small rotating "what's real right now" strip — the analog counterweight to the matrix-rain header.

**Placement**: bottom of the Sidebar (above the existing footer block), and a compact version in the site footer on mobile where the sidebar collapses.

**Content shape** (static config first, CMS later):
- `book` — what's on the desk
- `listening` — track or album
- `city` — where I am this week
- `last` — one short line, free-form ("walked the seawall at 6am")

**Rendering:**
- Small `font-hand` label `// now` + four lines in `font-mono` `text-xs` with muted icons (Book, Headphones, MapPin, Footprints from lucide).
- Each line tagged with a tiny handwritten annotation in `text-muted-foreground/50` (e.g. handwritten "today" next to `city`).
- No animation, no flashing — quiet block, deliberately analog.

**Source of truth:** `src/lib/now.ts` exporting a typed `now` object. Easy to edit by hand. Later upgrade path: pull from a Sanity `now` singleton.

## Files

**New**
- `src/components/HandNote.tsx`
- `src/components/HandUnderline.tsx`
- `src/components/NowStrip.tsx`
- `src/lib/now.ts`

**Edited**
- `src/main.tsx` — import `@fontsource/caveat`
- `tailwind.config.ts` — add `hand: ['Caveat', 'cursive']` to `fontFamily`
- `src/components/Kicker.tsx` — optional `note?: string` prop renders a `HandNote` beside the label
- `src/components/Sidebar.tsx` — mount `<NowStrip />` above the footer block
- `src/pages/Index.tsx`, `Projects.tsx`, `Blog.tsx`, `Tools.tsx`, `Reads.tsx` — pass a short `note` to each page's Kicker; add `HandUnderline` under the page H1

**Package**
- `bun add @fontsource/caveat`

## Out of scope (rejected earlier)
- Hand-shot photography, paper/tape textures, polaroid project cards — not picked. Will not add.
