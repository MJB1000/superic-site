// Curated tools list rendered on /tools alongside any Sanity-managed tools.
// Edit this list to add, remove, or reorder.

export interface LocalTool {
  title: string;
  url: string;
  description: string;
  category?: "agents" | "rag" | "automation" | "devtools" | "data" | "other";
  language?: string;
  tags?: string[];
}

export const localTools: LocalTool[] = [
  {
    title: "Claude Agent Teams",
    url: "https://code.claude.com/docs/en/agent-teams",
    category: "agents",
    description:
      "Anthropic docs on running multi-agent Claude teams — orchestration patterns for parallel sub-agents.",
    tags: ["claude", "docs", "multi-agent"],
  },
  {
    title: "Open Generative AI",
    url: "https://github.com/Anil-matcha/Open-Generative-AI",
    category: "other",
    description:
      "Open collection of generative AI tools, references, and starter projects.",
    tags: ["genai", "collection"],
  },
  {
    title: "beads",
    url: "https://github.com/gastownhall/beads",
    category: "devtools",
    description:
      "Gastown Hall's beads — lightweight building blocks for stringing together agent workflows.",
    tags: ["agents", "workflows"],
  },
  {
    title: "open-cowork",
    url: "https://github.com/OpenCoworkAI/open-cowork",
    category: "agents",
    description:
      "Open-source co-working environment for human + AI agents to operate side by side.",
    tags: ["cowork", "agents"],
  },
  {
    title: "gastown",
    url: "https://github.com/gastownhall/gastown",
    category: "devtools",
    description:
      "Gastown Hall's main repo — agent tooling and operator-side experiments.",
    tags: ["agents"],
  },
  {
    title: "diagram-design",
    url: "https://github.com/cathrynlavery/diagram-design",
    category: "devtools",
    description:
      "Cathryn Lavery's diagram-design — generative diagrams and system-design visuals from prompts.",
    tags: ["diagrams", "design"],
  },
  {
    title: "banana-claude",
    url: "https://github.com/AgriciDaniel/banana-claude",
    category: "agents",
    description:
      "Banana Claude — Claude skill / agent kit for image and asset workflows.",
    tags: ["claude", "skills"],
  },
  {
    title: "HeyGen HyperFrames",
    url: "https://hyperframes.heygen.com/",
    category: "other",
    description: "Frame-by-frame AI video composition surface from HeyGen.",
    tags: ["video", "ai"],
  },
  {
    title: "last30days-skill",
    url: "https://github.com/mvanhorn/last30days-skill",
    category: "agents",
    description:
      "Claude skill that surfaces what you actually did over the last 30 days from your activity sources.",
    tags: ["claude", "skills"],
  },
  {
    title: "claude-video-vision",
    url: "https://github.com/jordanrendric/claude-video-vision",
    category: "agents",
    description:
      "Give Claude eyes on video — frame extraction + vision pipeline as a skill.",
    tags: ["claude", "video", "vision"],
  },
  {
    title: "SuperData",
    url: "https://superdata.com.au/",
    category: "data",
    description: "AU-based data + analytics operator playground.",
    tags: ["analytics"],
  },
  {
    title: "Swishy",
    url: "https://www.swishy.ai/",
    category: "other",
    description: "Swishy.ai — AI surface for marketers.",
    tags: ["marketing", "ai"],
  },
  {
    title: "You're Just a Text File",
    url: "https://ruben.substack.com/p/youre-just-a-text-file",
    category: "other",
    description:
      "Ruben's essay on operating as a structured text file the way LLMs do — reference reading.",
    tags: ["essay", "llm"],
  },
  {
    title: "Shared note — KKbYXh",
    url: "https://share.google/KKbYXh8prMzabTIQ6",
    category: "other",
    description: "Saved share link from Matthew's stack — untriaged reference.",
    tags: ["reference"],
  },
  {
    title: "YouTube — YsD7e-bv77k",
    url: "https://youtu.be/YsD7e-bv77k",
    category: "other",
    description: "Saved video reference from Matthew's stack — untriaged.",
    tags: ["video"],
  },
  {
    title: "r/claudeskills thread",
    url: "https://www.reddit.com/r/claudeskills/s/NDo5jw8bmy",
    category: "agents",
    description:
      "Reddit thread from r/claudeskills — community-surfaced Claude skill pattern.",
    tags: ["claude", "skills", "reddit"],
  },
  {
    title: "Web Profits Academy",
    url: "https://webprofitsacademy.com.au/",
    category: "other",
    description: "AU performance-marketing program reference.",
    tags: ["marketing"],
  },
  {
    title: "ShaderGradient",
    url: "https://github.com/ruucm/shadergradient",
    category: "devtools",
    language: "TypeScript",
    description:
      "Animated GLSL gradients as a drop-in React component.",
    tags: ["shader", "react", "gradient"],
  },
  {
    title: "liquid-logo",
    url: "https://github.com/paper-design/liquid-logo",
    category: "devtools",
    description:
      "Paper Design's liquid-logo — fluid, distorted logo treatment shader.",
    tags: ["shader", "logo", "design"],
  },
  {
    title: "liquid-glass-js",
    url: "https://github.com/dashersw/liquid-glass-js",
    category: "devtools",
    language: "JavaScript",
    description: "Liquid Glass effect in plain JS — Apple-style refractive surface.",
    tags: ["effect", "ui"],
  },
  {
    title: "react-three-fiber",
    url: "https://github.com/pmndrs/react-three-fiber",
    category: "devtools",
    language: "TypeScript",
    description:
      "React renderer for Three.js — declarative 3D scenes inside React.",
    tags: ["three.js", "react", "3d"],
  },
  {
    title: "open-design",
    url: "https://github.com/nexu-io/open-design",
    category: "devtools",
    description: "Nexu's open-design — open primitives for AI-assisted UI design.",
    tags: ["design", "ui"],
  },
  {
    title: "r/AskVibecoders thread",
    url: "https://www.reddit.com/r/AskVibecoders/s/xpJYf8ZHeN",
    category: "other",
    description:
      "Reddit thread from r/AskVibecoders — vibe-coding pattern worth pulling apart.",
    tags: ["reddit", "vibecoding"],
  },
  {
    title: "claude-skills (alirezarezvani)",
    url: "https://github.com/alirezarezvani/claude-skills",
    category: "agents",
    description: "Curated pack of Claude skills from alirezarezvani.",
    tags: ["claude", "skills"],
  },
  {
    title: "Shared note — m9H32tH",
    url: "https://share.google/m9H32tH5YZiCY01yy",
    category: "other",
    description: "Saved share link from Matthew's stack — untriaged reference.",
    tags: ["reference"],
  },
  {
    title: "LLM Wiki v2",
    url: "https://share.google/w5F7e8qN4xZOVqPAT",
    category: "agents",
    description:
      "Extension of Karpathy's LLM Wiki pattern, with lessons from building agent memory.",
    tags: ["llm", "wiki", "memory"],
  },
  {
    title: "cookiy-ai",
    url: "https://github.com/cookiy-ai",
    category: "agents",
    description:
      "Cookiy AI org on GitHub — agent + automation experiments to watch.",
    tags: ["agents", "org"],
  },
  {
    title: "mindmap-markmap-viewer",
    url: "https://github.com/Jaderson-bit/mindmap-markmap-viewer",
    category: "devtools",
    description: "Viewer for markmap-style mindmaps generated from Markdown.",
    tags: ["mindmap", "markdown"],
  },
];
