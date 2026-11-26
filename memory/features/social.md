---
name: Instagram companions
description: /social page hosting Instagram reels/carousels that pair with blog posts; data from src/lib/social.ts + Sanity socialPost
type: feature
---
`/social` ("On Instagram", magenta accent `318 68% 48%`) hosts short-form Instagram content as companions to blog posts.

- Data sources merged by URL: local `src/lib/social.ts` (`socialPosts`) and Sanity `socialPost` documents (`queries.socialPosts`). Sanity schema for `socialPost` is not deployed yet — the query safely returns empty until it is.
- Item fields: url, title, caption, format (reel | carousel | post), thumbnail, postSlug (companion blog post), date.
- Cards link out to Instagram (new tab) and to `/blog/{postSlug}` as "Read the post".
- Handle used: `@supereyesee` (`INSTAGRAM_HANDLE` in src/lib/social.ts) — confirm/replace if wrong.
- Nav entries: SideNav + mobile TopNav ("Instagram"), homepage "what lives here" band (4 columns), footer.
- Empty state is intentional: only real published content is listed.
