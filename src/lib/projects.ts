// Shared source of truth for /projects page and the homepage "Latest" feed.
// Add a high-resolution screenshot URL on each non-reserved project — these
// render as the card cover. Place files in /public/projects/ or use a CDN.

import countdownAsset from "@/assets/countdown-studio.png.asset.json";

export interface ProjectItem {
  slug: string;
  name: string;
  url: string;           // displayed in the browser-frame URL bar
  desc: string;          // short pitch shown on the card
  details?: string;      // long-form build notes, expandable on the card
  tags?: string[];
  demo?: string;         // live link
  secondary?: { label: string; href: string };
  reserved?: boolean;
  flagship?: boolean;
  /** REQUIRED for live projects. High-res screenshot (1600px+ wide). */
  screenshot?: string;
  date?: string;         // ISO date for sorting in homepage feed
}

export const projects: ProjectItem[] = [
  {
    slug: "framedrop",
    name: "FRAMEDROP",
    url: "framedrop.app",
    desc:
      "Creator content-drop portal that pushes straight into Frame.io — with an admin inbox and live config.",
    tags: ["Next.js", "Frame.io", "Supabase", "AI"],
    demo: "https://framedrop.app",
    flagship: true,
    screenshot: "/projects/framedrop.png",
    date: "2026-06-20",
  },
  {
    slug: "countdown-studio",
    name: "COUNTDOWN.STUDIO",
    url: "countdown-timer-smoky-phi.vercel.app",
    desc:
      "On-brand email & web countdowns — one tool, nine designs. Server-rendered GIFs for the inbox, live JS clocks for the web, identical look in both.",
    details: `WHAT IT IS
A self-hosted, brand-agnostic countdown tool — a replacement for paid SaaS countdown widgets. It produces three things: (1) server-rendered countdown images for email (Klaviyo and any ESP), because email can't run code; (2) a live, forever-ticking JavaScript countdown for web pages like a Shopify hype page, driven by the same config; and (3) a dashboard to create, save, edit and delete unlimited timers, choose from 9 designs, set the deadline and timezone, colours, font and units, and copy a paste-ready embed. One tool, two surfaces, identical look in both.

WHY IT WAS BUILT
DiggerLid was paying for a third-party countdown widget in its Klaviyo emails and wanted something self-hosted, on-brand, free to run, and fully controllable. The brief was explicit: it had to be on-brand, light, mobile and desktop responsive, fast-rendering, and accurate. Partway through it was productised into "Countdown.Studio" — de-branded, neutral defaults, reusable Brand Kits — so it works for any brand, not just DiggerLid.

THE CORE PROBLEM (AND THE KEY INSIGHT)
Email clients strip JavaScript, so a live ticking script clock is impossible in the inbox. The countdown therefore can't be code running on the recipient's machine — it has to be an image that the server re-renders on every open, computing the time left to one fixed UTC instant. That makes it the same moment for everyone, in every country. To create the illusion of ticking, the image is an animated GIF where each frame is one second of the countdown. The web companion is the opposite case: a web page can run JS, so there it renders a real DOM clock that ticks forever — reading the same deadline, so email and web always agree.

HOW IT'S BUILT (ARCHITECTURE)
Platform: Vercel serverless functions (Node, ESM). Rendering: @napi-rs/canvas (server-side Canvas) draws each frame.

The clever bit — lightweight GIFs: a naïve 2-minute animated GIF is about 350 KB, far too heavy for email. Instead it uses dirty-rectangle encoding — it diffs each frame against the previous one and re-encodes only the changed pixels (the ticking digits) as a small offset sub-frame, leaving everything else transparent. This is built on omggif's GifWriter (which supports offset sub-frames), with gifenc for palette quantisation and a custom exact nearest-colour palette mapper that does no dithering (dithering would smear the diff across the whole row and destroy the savings). Digits sit in fixed-width slots so the row never reflows frame-to-frame. The result: a 2-minute GIF is about 65 KB, and a static PNG fallback is about 14 KB.

One config schema everywhere: a single normalizeConfig() is shared by the stateless renderer, the saved-timer renderer, and the dashboard, so a URL, a stored record, and the UI all produce byte-identical output.

Storage and "blank slate": timers and brand kits persist in Vercel Blob (one JSON per record). The dashboard is also cache-based using localStorage, so any visitor gets a private, empty workspace with no sign-up, and embeds are self-contained URLs / data-attributes that need no server state to render.

Timezones: IANA and DST-aware via Intl.DateTimeFormat — you pick "Sydney/Melbourne" and it converts wall-time to UTC correctly. Accuracy: render endpoints send no-store headers and recompute on every open, with an optional CDN-cache window for very large sends.

THE 9 DESIGNS
Bars (columns + accent underline), Tiles (rounded cards), Hazard (yellow caution-tape), Flip (flip-clock), Minimal (colon clock), Gold Rush (gold-dig sale theme), Strip (condensed single line for header/announcement bars), Rings (circular ring per unit), and Badge (solid accent chips). All nine render in both the email image and the web companion. Brand Kits let you save colours and font once and one-click apply them to every timer.

ENDPOINTS
GET /api/t/<id> renders a saved timer (missing or deleted ones return a neutral "ended" image, never a broken 404). GET /api/countdown?… is a stateless render with config in the URL. GET/POST /api/timers and /api/brands are CRUD (soft-delete keeps rendering; one-step undo). GET /api/health is a health check, and /embed.js is the web companion script.

ROADBLOCKS SOLVED
The GIF encoder fight: gifenc's default palette dithered and smeared the changed region to about 514 px wide, so it was swapped for omggif plus a custom no-dither exact palette — the diff dropped to about 34 px and the GIF went from 153 KB to 65 KB. The strip skin re-centred every frame because of proportional digit widths; fixed-width slots brought it from 130 KB to 32 KB. Gold Rush was heavy at 207 KB with gradient gold, so it was flattened to solid gold on a dark "trench" band, down to 126 KB. Supabase was blocked by its free-tier two-project cap, so storage moved to Vercel Blob. A denormalised index.json drifted under Blob's eventual consistency and was removed; the list now reads per-record blobs directly.

KNOWN LIMITS (TRUE OF EVERY EMAIL COUNTDOWN)
Apple Mail Privacy Protection pre-fetches and caches images at delivery, freezing the timer at send time for those opens; a per-recipient cache-buster (&cb={{ person.id }}) stops Gmail's proxy sharing one frozen image across recipients. Outlook's Windows/Word engine shows only the first GIF frame — but that first frame is still the correct time at open, so it degrades to an accurate static number rather than breaking.`,
    tags: ["Vercel", "Node", "Canvas", "GIF", "Klaviyo"],
    demo: "https://countdown-timer-smoky-phi.vercel.app/",
    screenshot: countdownAsset.url,
    date: "2026-06-25",
  },
];
