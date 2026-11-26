// Single source of truth for per-section brand accents.
// v2: indigo is the house signal; other sections keep a quieter distinct hue.

export type SectionKey = "home" | "blog" | "projects" | "tools" | "reads" | "social";

export const sectionAccents: Record<SectionKey, { hsl: string; hex: string; label: string }> = {
  home:     { hsl: "243 75% 59%", hex: "#4F46E5", label: "home" },     // indigo
  blog:     { hsl: "24 90% 48%",  hex: "#E8730C", label: "blog" },     // burnt orange
  projects: { hsl: "196 82% 38%", hex: "#1183B0", label: "projects" }, // deep cyan
  tools:    { hsl: "265 70% 55%", hex: "#7C41DB", label: "tools" },    // violet
  reads:    { hsl: "345 72% 48%", hex: "#D22252", label: "reads" },    // crimson
  social:   { hsl: "318 68% 48%", hex: "#CE28A0", label: "social" },   // magenta
};

// CSS variables applied at the page root so all `text-primary`,
// `bg-primary`, `ring-primary`, `accent-*` utilities re-tint to
// the section accent without rewriting components.
export function sectionStyle(key: SectionKey): React.CSSProperties {
  const { hsl } = sectionAccents[key];
  return {
    ["--primary" as any]: hsl,
    ["--ring" as any]: hsl,
    ["--accent" as any]: hsl,
  };
}
