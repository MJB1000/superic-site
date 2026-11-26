# Project rules

- Render the community homepage from `src/pages/Index.tsx` at `/`. It is the only homepage: the alternate variants (`/v3`, `/v4`, `/v4-matrix`) were deliberately removed on 2026-11-26 — do not reintroduce them.
- Keep homepage build summaries in `src/lib/builds.ts`, separate from the Projects catalogue so community positioning does not replace existing projects.
- Reuse the existing newsletter subscription transport for homepage waitlists; configurable labels distinguish their purpose without introducing another service.