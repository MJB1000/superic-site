import PostCard from "./PostCard";

interface PostGridProps {
  posts: any[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card p-8 text-center"
          >
            <div className="mb-3 grid-overlay h-16 w-16 rounded-lg" />
            <p className="font-mono text-xs text-muted-foreground">No posts yet</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
