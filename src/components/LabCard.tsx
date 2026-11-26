import { ExternalLink, Eye } from "lucide-react";

interface LabCardProps {
  title: string;
  description?: string;
  status?: string;
  techStack?: string[];
  url?: string;
  previewEnabled?: boolean;
  onPreview?: () => void;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  live: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
  wip: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
  archived: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF" },
};

export default function LabCard({ title, description, status, techStack, url, previewEnabled, onPreview }: LabCardProps) {
  const s = statusStyles[status || ""] || statusStyles.archived;

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-foreground/5">
      <div>
        {/* Title + status */}
        <div className="mb-2 flex items-start justify-between gap-2">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-primary"
            >
              {title}
              <ExternalLink size={12} className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ) : (
            <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
          )}
          {status && (
            <span
              className="flex-shrink-0 rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: s.bg, color: s.text }}
            >
              {status}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mb-3 text-[13px] leading-relaxed text-secondary-text line-clamp-2">{description}</p>
        )}

        {/* Tech stack */}
        {techStack && techStack.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Preview button */}
      {previewEnabled && url && onPreview && (
        <button
          onClick={onPreview}
          className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <Eye size={12} /> Live Preview
        </button>
      )}
    </div>
  );
}
