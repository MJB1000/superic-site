import { Book, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { now } from "@/lib/now";
import HandNote from "./HandNote";

// Replaced the "now" strip with a focused reading section.
export default function NowStrip() {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 px-3 py-3">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-text">
          What I'm reading
        </span>
        <HandNote rotate={-4} className="!text-[13px]">
          currently
        </HandNote>
      </div>
      <ul className="space-y-1.5">
        <li className="flex items-start gap-2 font-mono text-[11px] leading-snug text-secondary-text">
          <Book size={12} className="mt-[2px] shrink-0 text-muted-text" />
          <span className="truncate">{now.book}</span>
        </li>
      </ul>
      <Link
        to="/reads"
        className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-text transition-colors hover:text-primary"
      >
        More reads
        <ArrowRight size={10} />
      </Link>
    </div>
  );
}
