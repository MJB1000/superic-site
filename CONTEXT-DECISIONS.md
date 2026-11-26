# Context & decisions

Everything here records *why* the code looks the way it does, plus the rules that
constrain future changes. Source code lives in `src/`, project instructions in
`AGENTS.md`, the approved plan in `.lovable/plan.md`, and project memory in
`memory/`.

---

## 1. Standing rules (apply to every change)

These come from the project's own instructions file (`AGENTS.md`) and the
workspace rules that govern this project.

**From `AGENTS.md`:**
- Render the community homepage from `src/pages/Index.tsx` at `/`. It is the only
  homepage — the alternate variants were removed on 2026-11-26 (see section 6).
- Keep homepage build summaries in `src/lib/builds.ts`, separate from the Projects
  catalogue so community positioning does not replace existing projects.
- Reuse the existing newsletter subscription transport for homepage waitlists;
  configurable labels distinguish their purpose without introducing another service.

**From workspace rules:**
- `/` renders `src/pages/Index.tsx`. *(Superseded 2026-11-26: the former rule to
  keep alternate homepage routes accessible no longer applies — see section 6.)*
- Homepage build summaries stay in `src/lib/builds.ts`, separate from the Projects
  catalogue.
- Homepage waitlists reuse the existing newsletter subscription transport.

**From project memory (`memory/`):**
- Design: light editorial surface (#fafafa) with indigo #4F46E5 accent, mono
  uppercase labels, top nav, matrix rain confined to a dark hero band.
- Tone: direct, operator-driven, zero "AI" fluff; first person for blog/field notes.
- Banned copy: guru/hype language, "10x", "do the work of five", "stolen",
  "field log", "dispatch", agency-speak, AI-slop superlatives.
- Never fabricate testimonials, member counts, results, course names or prices.
- Australian spelling throughout.

---

## 2. Positioning decisions (this session)

### Round 1 — community positioning
- Repositioned SuperIC (Super Eye See) as an Australian e-commerce AI community
  with hands-on training and open experiments.
- Rule adopted: visitors don't know what a "lab" is, so never rely on the word
  "lab" to explain anything — lead with plain benefits. Where "Labs" appears as a
  label, add a plain explainer.
- Voice split: "we" for community, builds and training; Matthew's first person for
  blog / field notes.
- Always mention Melbourne / Australia: "Built in Melbourne, tested on real
  Australian brands."
- Homepage order settled as: hero → what we're building → training → community →
  field notes → Good Reads.
- Six builds recorded in `src/lib/builds.ts` with problem / built / status.
- Removed from the homepage only: the four-column "What lives here" strip and the
  "Case studies" block. The pages themselves stay.
- Existing projects (FRAMEDROP, COUNTDOWN.STUDIO) stay on the Projects page.

### Round 2 — hero restore + lab framing (current state)
- Restored the original "STEAL MY AI WORKFLOW" hero exactly as it appears in
  `src/pages/IndexVariant.tsx`: same MatrixRain canvas and settings (theme green,
  glyphSet mixed, speed 1.5, density 0.8, trail 0.055, glow, fontSize 22), same
  gradient and scanline overlays, eyebrow `@supereyesee / building in the open`
  with pulsing green dot, left-aligned uppercase `clamp(46px, 11vw, 150px)`
  headline in signal-green-light with glow text-shadow and staggered fade-in, the
  "Every AI marketing system, build and teardown I actually run…" paragraph, the
  default `<NewsletterForm />` and the caption "one email a week, nothing gated".
- Only addition: one extra mono caption, "built in Melbourne, tested on real
  Australian brands".
- `MatrixHeader` is no longer used for the homepage hero; its unused
  heading/highlight additions were reverted. `IndexVariant.tsx` output unchanged.
  *(2026-11-26: `IndexVariant.tsx` has since been deleted; the hero in
  `src/pages/Index.tsx` is now the single source of truth.)*
- Sections below the hero reframed as an approachable AI lab for people who
  already know a bit about AI: kickers `// in the lab`, `// coming soon`,
  `// open lab`, `// field notes`, `// good reads`; cards styled as experiment log
  entries (`EXP-01` + name + LIVE/WIP chip, then Problem / What we built / Status).
- "Learned so far" is deliberately omitted — no real learnings exist yet, so cards
  show "Log in progress" instead of invented learnings.
- Training (`#training`) and community (`#community`) both capture emails through
  the existing Beehiiv transport with different button labels: "Join the waitlist"
  and "Join the lab". No course names, prices, member counts or testimonials.

### Metadata (current, consistent across `index.html` and the homepage `SEOHead`)
- Title: `SuperIC: an AI lab for Australian e-commerce`
- Description: `An open AI lab for Australian e-commerce operators. We test AI
  systems on real brands, log what we learn, and teach you to build them. Built in
  Melbourne.`

---

## 3. Rejected / out of scope
- Hand-shot photography, paper/tape textures, polaroid project cards — rejected in
  the earlier analog-layers plan; not added.
- Handwritten accents (`HandNote`, `HandUnderline`) and the `// now` strip
  (`NowStrip`, `src/lib/now.ts`) exist in the codebase from that plan and remain
  as the analog counterweight, per memory.
- No publishing or deployment, no change to project visibility, databases,
  connectors, Sanity schema/config or knowledge during this work — code edits only.

---

## 4. What is CMS-driven (cannot be changed in code)
- Blog post titles, excerpts, body content and images come from Sanity
  (project `qs95bq7w`) via `src/lib/sanity.ts` — the homepage "Field notes"
  section renders whatever is published there.
- `socialPost` documents for `/social` are Sanity-sourced; that schema is not
  deployed yet, so the query returns empty until it is.
- Everything else on the homepage (build cards, training and community copy,
  Good Reads previews) is code/config driven: `src/lib/builds.ts`,
  `src/lib/config.ts`, `src/lib/tools.ts`, `src/lib/projects.ts`,
  `src/lib/social.ts`, `src/lib/now.ts`.

---

## 5. Verification notes
- `src/lib/builds.test.ts` asserts the six build statuses; it passes.
- Desktop and mobile preview checks showed no horizontal overflow and no browser
  errors after the hero restore.
- Newsletter delivery itself was not tested.

---

## 6. Post-export rebuild decisions (2026-11-26)
- The project left Lovable. Lovable tooling was removed; `bun.lock` is the only
  lockfile; hosting target is Vercel (per the original `BEEHIIV-SETUP.md` plan).
- Alternate homepage variants removed at the owner's request: routes `/v3`
  (duplicate of `/`), `/v4` (`IndexCRT.tsx`, CRT "night drive" hero) and
  `/v4-matrix` (`IndexVariant.tsx`). Code used only by them was deleted too:
  `src/lib/crt-drive.js`, `src/lib/crt-static.js`, `src/components/BitSprites.tsx`
  and the unused `PixelArrow` / `PixelDither` / `PixelCorners` exports of
  `BitGraphics.tsx`. Both pages remain recoverable from the baseline commit.
