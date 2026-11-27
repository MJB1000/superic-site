import { Link } from "react-router-dom";
import { format } from "date-fns";
import CategoryBadge from "./CategoryBadge";
import { urlFor, type PostSummary } from "@/lib/sanity";

function estimateReadingTime(excerpt?: string): string {
  const words = excerpt ? excerpt.split(/\s+/).length : 0;
  const mins = Math.max(3, Math.round(words / 5) + 3);
  return `${mins} min read`;
}

interface PostCardProps {
  post: PostSummary;
  variant?: "feed" | "grid";
}

export default function PostCard({ post, variant = "feed" }: PostCardProps) {
  if (variant === "grid") {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group bit-corners block overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-foreground/5"
      >
        <div className="relative h-[160px] bg-muted/50">
          {post.heroImage && (
            <img
              src={urlFor(post.heroImage).width(600).height(320).url()}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-5">
          {post.categories?.[0] && (
            <div className="mb-2">
              <CategoryBadge {...post.categories[0]} />
            </div>
          )}
          <h3 className="mb-2 text-base font-bold leading-snug tracking-tight text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-secondary-text">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Substack-style feed row
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block border-b border-border py-6 transition-colors first:pt-0 hover:bg-card"
    >
      <article className="flex flex-col-reverse gap-5 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          {post.categories?.[0] && (
            <div className="mb-2">
              <CategoryBadge {...post.categories[0]} />
            </div>
          )}
          <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mb-3 line-clamp-2 text-[14px] leading-relaxed text-secondary-text md:text-[15px]">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-text">
            {post.author?.name && (
              <>
                <span className="text-secondary-text">{post.author.name}</span>
                <span className="text-border">·</span>
              </>
            )}
            <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
            <span className="text-border">·</span>
            <span>{estimateReadingTime(post.excerpt)}</span>
          </div>
        </div>

        {post.heroImage && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted/50 sm:h-[120px] sm:w-[180px] sm:flex-shrink-0">
            <img
              src={urlFor(post.heroImage).width(480).height(300).url()}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
