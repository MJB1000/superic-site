export interface Build {
  name: string;
  problem: string;
  built: string;
  status: "live" | "wip";
}

export const builds: Build[] = [
  {
    name: "Knowledge Vault",
    problem: "Scattered notes and research we can't actually use when making decisions.",
    built: "A personal knowledge graph using Supabase and OpenAI embeddings. Semantic search finds relevant ideas; graph traversal connects them for strategic synthesis.",
    status: "live",
  },
  {
    name: "WiperTech Marketing Dashboard",
    problem: "Marketing data split across too many tools.",
    built: "Custom MCP servers connect GA4, Search Console, Klaviyo and Microsoft Clarity into one AI-queryable layer. We ask questions in plain English and get the data back.",
    status: "live",
  },
  {
    name: "Brand Intelligence Bot",
    problem: "Customer-facing copy drifting off-brand.",
    built: "A bot that monitors brand voice, checks alignment with our unique selling points and drafts copy grounded in positioning, backed by the Knowledge Vault.",
    status: "wip",
  },
  {
    name: "Automated Competitor Tracker",
    problem: "No time to watch competitors manually.",
    built: "Scheduled scraping and AI analysis of competitor sites, pricing and messaging. A weekly report covers what changed and why it matters.",
    status: "wip",
  },
  {
    name: "Voice of Customer Tracker",
    problem: "Customer insight buried across reviews, support tickets and social mentions.",
    built: "A structured feed that brings those sources together. AI extracts themes, pain points and customer language for ad copy and product decisions.",
    status: "wip",
  },
  {
    name: "Super Eye See",
    problem: "We needed a home to share builds and notes in public.",
    built: "This site: Sanity, React and a terminal-inspired theme, bringing our open experiments and field notes together.",
    status: "live",
  },
];