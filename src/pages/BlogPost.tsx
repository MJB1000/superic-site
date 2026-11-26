import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sanityClient, queries, urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import CategoryBadge from "@/components/CategoryBadge";
import AuthorCard from "@/components/AuthorCard";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import PostCard from "@/components/PostCard";
import PostHero, { type HeroAnimationKey } from "@/components/PostHero";
import { playPostAnimation, type AnimationKey } from "@/lib/post-animations";

function estimateReadingTime(excerpt?: string): string {
  const words = excerpt ? excerpt.split(/\s+/).length : 0;
  const mins = Math.max(3, Math.round(words / 5) + 3);
  return `${mins} min read`;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => sanityClient.fetch(queries.singlePost, { slug }),
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["relatedPosts", post?.categories?.[0]?.slug],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "post" && $categorySlug in categories[]->slug.current && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
          _id, title, "slug": slug.current, excerpt, publishedAt, heroImage,
          categories[]->{ title, "slug": slug.current, color },
          author->{ name, avatar }
        }`,
        { categorySlug: post.categories[0].slug, currentSlug: slug }
      ),
    enabled: !!post?.categories?.[0]?.slug,
  });

  useEffect(() => {
    if (!post || isLoading) return;
    const id = requestAnimationFrame(() => {
      playPostAnimation(post.entryAnimation as AnimationKey | undefined, {
        title: titleRef.current,
        meta: metaRef.current,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [post, isLoading]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-14">
        <div className="space-y-4">
          <div className="h-6 w-32 animate-pulse rounded bg-card" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-card" />
          <div className="h-64 animate-pulse rounded-lg bg-card" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-14 text-center">
        <p className="font-mono text-sm text-muted-text">Post not found.</p>
      </div>
    );
  }

  const eyebrow = post.categories?.[0]?.title
    ? `${post.categories[0].title} · ${format(new Date(post.publishedAt), "MMM yyyy")}`
    : format(new Date(post.publishedAt), "MMM yyyy");

  return (
    <>
      <SEOHead
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        ogImage={post.heroImage ? urlFor(post.heroImage).width(1200).height(630).url() : undefined}
        ogType="article"
      />

      {/* Full-bleed thesis hero with CMS-driven animation */}
      <PostHero
        title={post.title}
        thesis={post.thesis || post.excerpt}
        eyebrow={eyebrow}
        animation={(post.heroAnimation as HeroAnimationKey) || "matrix"}
        fallbackImage={
          post.heroImage ? urlFor(post.heroImage).width(1600).height(900).url() : undefined
        }
      />

      <article className="mx-auto max-w-[720px] px-5 py-12 md:py-16">
        {/* Title + meta strip (re-stated for in-article context) */}
        <header ref={titleRef} className="mb-10" style={{ opacity: 0 }}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {post.categories?.map((cat: any) => (
              <CategoryBadge key={cat.slug} title={cat.title} slug={cat.slug} color={cat.color} />
            ))}
          </div>

          <div
            ref={metaRef}
            className="flex items-center gap-3 border-y border-border py-3 font-mono text-[11px] text-muted-text"
            style={{ opacity: 0 }}
          >
            {post.author?.avatar && (
              <img
                src={urlFor(post.author.avatar).width(40).height(40).url()}
                alt={post.author.name}
                className="h-7 w-7 rounded-full ring-1 ring-border"
              />
            )}
            {post.author?.name && (
              <span className="font-medium text-secondary-text">{post.author.name}</span>
            )}
            <span className="h-1 w-1 rounded-full bg-muted-text" />
            <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
            <span className="h-1 w-1 rounded-full bg-muted-text" />
            <span>{estimateReadingTime(post.excerpt)}</span>
          </div>
        </header>

        {/* Thesis pull-quote — anchors the page around the argument */}
        {(post.thesis || post.excerpt) && (
          <aside className="mb-12 border-l-2 border-primary pl-5 md:pl-6">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Thesis
            </div>
            <p className="text-[18px] leading-[1.55] tracking-[-0.005em] text-foreground md:text-[20px]">
              {post.thesis || post.excerpt}
            </p>
          </aside>
        )}

        {/* Body */}
        <div className="pb-12">
          <PortableTextRenderer content={post.body} />
        </div>

        {/* Author card */}
        {post.author && (
          <div className="pb-12">
            <AuthorCard author={post.author} />
          </div>
        )}
      </article>

      {/* Related */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mx-auto max-w-[720px] px-5 pb-16">
          <h2 className="mb-2 border-b border-border pb-2 text-sm font-semibold text-foreground">
            More like this
          </h2>
          <div>
            {relatedPosts.map((p: any) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
