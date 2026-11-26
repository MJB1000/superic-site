import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import anime from "animejs";
import { sanityClient, queries } from "@/lib/sanity";
import SEOHead from "@/components/SEOHead";
import PostCard from "@/components/PostCard";
import Kicker from "@/components/Kicker";
import HandUnderline from "@/components/HandUnderline";
import { PixelRule } from "@/components/BitGraphics";
import { sectionStyle } from "@/lib/sectionTheme";

export default function Blog() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => sanityClient.fetch(queries.latestPosts(0, 50)),
  });

  useEffect(() => {
    if (!headerRef.current) return;
    const children = Array.from(headerRef.current.children);
    anime({
      targets: children,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
      delay: anime.stagger(80, { start: 100 }),
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <>
      <SEOHead
        title="Archive — Super Eye See (IC)"
        description="Everything I've written, newest first — notes, systems and lessons from learning AI marketing in public."
      />

      <div className="mx-auto max-w-[720px] px-5 py-10 md:py-14" style={sectionStyle("blog")}>
        <div ref={headerRef} className="relative isolate mb-8">
          <div
            aria-hidden
            className="bit-dither pointer-events-none absolute -inset-x-4 -top-6 -z-10 h-40"
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
          <div style={{ opacity: 0 }} className="mb-4">
            <Kicker note="notes as I go">the archive</Kicker>
          </div>
          <h1
            className="mb-1 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-[42px]"
            style={{ opacity: 0 }}
          >
            Archive
          </h1>
          <HandUnderline width={150} className="mb-4 text-primary" />
          <p
            className="text-[15px] leading-relaxed text-secondary-text"
            style={{ opacity: 0 }}
          >
            Everything I've written so far, newest first. Take what's useful — most
            posts have a{" "}
            <Link to="/social" className="text-primary hover:opacity-80">
              short-form companion on Instagram
            </Link>
            .
          </p>
        </div>


        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-5 border-b border-border py-6">
                <div className="flex-1 space-y-3">
                  <div className="h-3 w-20 animate-pulse rounded bg-card" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-card" />
                  <div className="h-3 w-full animate-pulse rounded bg-card" />
                </div>
                <div className="h-[120px] w-[180px] animate-pulse rounded-lg bg-card" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {(allPosts || []).map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
