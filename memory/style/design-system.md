---
name: Design System
description: Visual styling, colors, typography, and animations
type: design
---
# v2 design system (aiwithremy.com-inspired)

Light editorial surface, indigo signal, mono labels.

- Background #fafafa (`0 0% 98%`), cards pure white, foreground #1a1a1a.
- Primary/accent: indigo `243 75% 59%` (#4F46E5). Border `0 0% 90%`.
- Layout: **left sidebar** nav on desktop (`SideNav`, md+, 228px wide) and a sticky **top bar** on mobile (`TopNav`, below md). Mono uppercase links. *(Corrected 2026-11-26: earlier notes said "top nav, no sidebar", which no longer matched the code.)*
- Homepage hero: full-width **dark band** (`.panel-dark`, --terminal-black) with matrix rain + centered headline, email capture, mono proof line.
- Labels use `.label-mono` (JetBrains Mono, 11px, uppercase, 0.14em tracking).
- Handwritten Caveat accents (HandNote / HandUnderline) and the sidebar "// now" strip (now in footer) stay as the analog counterweight.
- Per-section accents in `src/lib/sectionTheme.ts`: home indigo, blog burnt orange, projects deep cyan, tools violet, reads crimson.
