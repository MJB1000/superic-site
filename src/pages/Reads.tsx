import { useState, useMemo } from "react";
import { ExternalLink, Search } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHeader from "@/components/PageHeader";
import { sectionStyle } from "@/lib/sectionTheme";
import { goodReads } from "@/lib/config";

const categoryColors: Record<string, string> = {
  Thinking: "#8B5CF6",
  Strategy: "#3B82F6",
  Systems: "#10B981",
  Operations: "#F59E0B",
  Growth: "#EC4899",
  Design: "#6366F1",
  Writing: "#14B8A6",
};

export default function Reads() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(goodReads.map((r) => r.category))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return goodReads.filter((read) => {
      const matchesSearch =
        !search ||
        read.title.toLowerCase().includes(search.toLowerCase()) ||
        read.description.toLowerCase().includes(search.toLowerCase()) ||
        read.source.toLowerCase().includes(search.toLowerCase());
      const matchesCat = !catFilter || read.category === catFilter;
      return matchesSearch && matchesCat;
    });
  }, [search, catFilter]);

  return (
    <>
      <SEOHead
        title="Good Reads"
        description="Essays and resources that changed how I think about marketing, systems and AI — shared as I find them."
      />

      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 md:py-14" style={sectionStyle("reads")}>
        <PageHeader
          kicker="what shaped my thinking"
          note="hope one lands"
          title="Good Reads"
          underlineWidth={170}
          intro="Essays and frameworks I keep coming back to. Everything here changed how I think about marketing, systems or work — I hope one lands for you too."
        />


        {/* Search & filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
            <input
              type="text"
              placeholder="Search reads…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 font-mono text-xs text-foreground placeholder:text-muted-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setCatFilter(null)}
              className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors ${
                !catFilter
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-text hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const color = categoryColors[cat] || "#666";
              return (
                <button
                  key={cat}
                  onClick={() => setCatFilter(catFilter === cat ? null : cat)}
                  className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors ${
                    catFilter === cat
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-text hover:text-foreground"
                  }`}
                  style={catFilter === cat ? { backgroundColor: `${color}1a`, color } : {}}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((read) => {
            const color = categoryColors[read.category] || "#666";
            return (
              <a
                key={read.url}
                href={read.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bit-corners flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-foreground/5"
              >
                <div>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span
                      className="inline-block rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${color}1a`,
                        color,
                      }}
                    >
                      {read.category}
                    </span>
                    <ExternalLink
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-muted-text opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {read.title}
                  </h3>
                  <p className="mb-3 text-[13px] leading-relaxed text-secondary-text line-clamp-3">
                    {read.description}
                  </p>
                </div>
                <p className="font-mono text-[11px] text-muted-text">
                  {read.source}
                </p>
              </a>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <p className="font-mono text-sm text-muted-text">
                {goodReads.length === 0
                  ? "No reads committed yet — the next one will land here."
                  : "No reads match your search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
