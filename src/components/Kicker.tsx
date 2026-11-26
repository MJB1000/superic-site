// Shared section kicker: short line + glowing dot + label.
// Used at the top of every page so the branding pattern is consistent.
// Optional `note` renders a small handwritten scrawl beside the label.

import HandNote from "./HandNote";

interface KickerProps {
  children: React.ReactNode;
  note?: string;
  className?: string;
}

export default function Kicker({ children, note, className = "" }: KickerProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted-text ${className}`}
    >
      <span className="inline-block h-px w-9 bg-border" />
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      />
      <span>{children}</span>
      {note && (
        <HandNote rotate={-3} className="ml-1 normal-case tracking-normal">
          {note}
        </HandNote>
      )}
    </div>
  );
}
