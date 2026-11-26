import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sanityClient, queries } from "@/lib/sanity";
import SEOHead from "@/components/SEOHead";
import PostGrid from "@/components/PostGrid";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: category } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => sanityClient.fetch(queries.category, { slug }),
    enabled: !!slug,
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["categoryPosts", slug],
    queryFn: () => sanityClient.fetch(queries.postsByCategory, { categorySlug: slug }),
    enabled: !!slug,
  });

  return (
    <>
      <SEOHead
        title={category?.title || "Category"}
        description={category?.description || `Posts in ${category?.title || "this category"}`}
      />

      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-10">
          {category?.color && (
            <div
              className="mb-3 inline-block h-1 w-8 rounded-full"
              style={{ backgroundColor: category.color }}
            />
          )}
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-foreground">
            {category?.title || "Category"}
          </h1>
          {category?.description && (
            <p className="mt-2 text-sm text-secondary-text">{category.description}</p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[280px] animate-pulse rounded-xl bg-card" />
            ))}
          </div>
        ) : (
          <PostGrid posts={posts || []} />
        )}
      </div>
    </>
  );
}
