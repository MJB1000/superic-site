---
name: Newsletter Integration
description: Beehiiv integration and subscriber count copy
type: feature
---
Beehiiv Publication ID: pub_8115cd79-d2a8-48ff-a97b-2ca6b47b9ac1
Transport: every signup form posts to `/api/subscribe` (`api/subscribe.ts`, a Vercel Function) which adds `BEEHIIV_API_KEY` server-side — the browser never calls Beehiiv. Each form passes a `source` (hero, training, community, footer, post, newsletter) that lands in Beehiiv as `utm_campaign`. Local dev: put the key in `.env.local`.
Social Proof: Hardcode subscriber count as "12 operators" in all trust lines/CTAs (e.g., "Join 12 operators — shipped every Tuesday").
