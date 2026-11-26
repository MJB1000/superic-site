# Project rules

- Render the community homepage from `src/pages/Index.tsx` at `/`, preserving the alternate homepage routes so existing variants remain accessible.
- Keep homepage build summaries in `src/lib/builds.ts`, separate from the Projects catalogue so community positioning does not replace existing projects.
- Reuse the existing newsletter subscription transport for homepage waitlists; configurable labels distinguish their purpose without introducing another service.