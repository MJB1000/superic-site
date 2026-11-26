import { ExternalLink, Github } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  url: string;
  category?: string;
  language?: string;
  tags?: string[];
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  agents: { bg: "rgba(168,85,247,0.15)", text: "#A855F7" },
  rag: { bg: "rgba(59,130,246,0.15)", text: "#3B82F6" },
  automation: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
  devtools: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
  data: { bg: "rgba(236,72,153,0.15)", text: "#EC4899" },
  other: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF" },
};

export default function ToolCard({ title, description, url, category, language, tags }: ToolCardProps) {
  const c = categoryStyles[category || ""] || categoryStyles.other;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bit-corners flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-foreground/5"
    >
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            <Github size={14} className="flex-shrink-0" />
            {title}
            <ExternalLink size={12} className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          {category && (
            <span
              className="flex-shrink-0 rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: c.bg, color: c.text }}
            >
              {category}
            </span>
          )}
        </div>

        <p className="mb-3 text-[13px] leading-relaxed text-secondary-text">{description}</p>

        {(language || (tags && tags.length > 0)) && (
          <div className="flex flex-wrap gap-1.5">
            {language && (
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {language}
              </span>
            )}
            {tags?.map((tag) => (
              <span key={tag} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
