import { useQuery } from "@tanstack/react-query";
import { Instagram, ExternalLink, Film, Images, Image as ImageIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import SEOHead from "@/components/SEOHead";
import PageHeader from "@/components/PageHeader";
import { sectionStyle } from "@/lib/sectionTheme";
import { sanityClient, queries } from "@/lib/sanity";
import { socialPosts, INSTAGRAM_URL, INSTAGRAM_HANDLE, type SocialItem } from "@/lib/social";

const formatMeta: Record<string, { label: string; icon: any }> = {
  reel: { label: "Reel", icon: Film },
  carousel: { label: "Carousel", icon: Images },
  post: { label: "Post", icon: ImageIcon },
};

export default function Social() {
  const { data: cmsPosts } = useQuery<SocialItem[]>({
    queryKey: ["socialPosts"],
    queryFn: () => sanityClient.fetch(queries.socialPosts),
  });

  const items: SocialItem[] = [
    ...((cmsPosts || []).filter((p) => p && p.url)),
    ...socialPosts.filter(
      (lp) => !(cmsPosts || []).some((cp) => cp?.url === lp.url)
    ),
  ].sort((a, b) =>
    a.date && b.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0
  );

  return (
    <>
      <SEOHead
        title="Instagram — companions to the blog | Super Eye See"
        description="Short-form breakdowns on Instagram that pair with the longer write-ups here — the reel version of each build."
      />

      <div
        className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 md:py-14"
        style={sectionStyle("social")}
      >
        <PageHeader
          kicker="the short version"
          note="same ideas, 30 seconds"
          title="On Instagram"
          underlineWidth={165}
          intro="Every build here gets a short-form companion — the reel or carousel version of the write-up. Watch the quick take, then read the long one for the wiring."
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Instagram size={14} />@{INSTAGRAM_HANDLE}
          </a>
        </PageHeader>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <Instagram className="mx-auto mb-4 h-7 w-7 text-primary" />
            <h2 className="mb-2 text-[17px] font-bold tracking-tight text-foreground">
              Nothing posted here yet
            </h2>
            <p className="mx-auto mb-6 max-w-[46ch] text-[14px] leading-relaxed text-secondary-text">
              Companion reels and carousels will land here as they go up. In the
              meantime the feed itself is the best place to look.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:opacity-80"
            >
              Open Instagram <ExternalLink size={12} />
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const meta = formatMeta[item.format || "post"] || formatMeta.post;
              const Icon = meta.icon;
              return (
                <article
                  key={item.url}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-[4/5] overflow-hidden border-b border-border bg-muted"
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid-overlay flex h-full w-full items-center justify-center">
                        <Instagram className="h-8 w-8 text-muted-text" />
                      </div>
                    )}
                  </a>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-text">
                      <span className="inline-flex items-center gap-1 text-primary">
                        <Icon size={12} /> {meta.label}
                      </span>
                      {item.date && (
                        <>
                          <span className="text-border">·</span>
                          <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mb-1.5 text-[16px] font-bold leading-snug tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="mb-4 line-clamp-3 text-[14px] leading-relaxed text-secondary-text">
                        {item.caption}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:opacity-80"
                      >
                        Watch <ExternalLink size={11} />
                      </a>
                      {item.postSlug && (
                        <Link
                          to={`/blog/${item.postSlug}`}
                          className="inline-flex items-center gap-1 text-muted-text hover:text-foreground"
                        >
                          <FileText size={11} /> Read the post
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
