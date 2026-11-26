import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import ToolCard from "@/components/ToolCard";
import PageHeader from "@/components/PageHeader";
import { sectionStyle } from "@/lib/sectionTheme";
import { sanityClient, queries } from "@/lib/sanity";
import { localTools } from "@/lib/tools";

interface Tool {
  title: string;
  slug?: string;
  url: string;
  description: string;
  category?: string;
  language?: string;
  tags?: string[];
  displayOrder?: number;
}

export default function Tools() {
  const { data: sanityTools, isLoading } = useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: () => sanityClient.fetch(queries.tools),
  });

  // Merge Sanity tools with locally curated tools, de-duped by URL.
  const merged: Tool[] = [
    ...(sanityTools || []),
    ...localTools.filter(
      (lt) => !(sanityTools || []).some((st) => st.url === lt.url),
    ),
  ];

  return (
    <>
      <SEOHead
        title="Tools — Super Eye See"
        description="The repos, libraries and open source tools I'm learning with right now — borrow any of them."
      />

      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 md:py-14" style={sectionStyle("tools")}>
        <PageHeader
          kicker="what I'm learning with"
          note="borrow any of them"
          title="Tools"
          underlineWidth={140}
          intro="The repos, libraries and links I'm actually learning with right now. If one of these helps you, take it and build something."
        />


        {isLoading && merged.length === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="mb-2 h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {merged.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {merged.map((t) => (
              <ToolCard
                key={t.url}
                title={t.title}
                description={t.description}
                url={t.url}
                category={t.category}
                language={t.language}
                tags={t.tags}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

