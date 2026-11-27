import { useEffect, useRef } from "react";
import MatrixRain from "@/lib/matrix-rain.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Database, BarChart3, MessageSquare, Radar, Users, Terminal } from "lucide-react";
import { sanityClient, queries } from "@/lib/sanity";
import { builds } from "@/lib/builds";
import { goodReads } from "@/lib/config";
import SEOHead from "@/components/SEOHead";
import NewsletterForm from "@/components/NewsletterForm";
import PostCard from "@/components/PostCard";
import { PixelRule } from "@/components/BitGraphics";

const WORDS = ["STEAL", "MY AI", "WORKFLOW"];

const buildIcons = [Database, BarChart3, MessageSquare, Radar, Users, Terminal];
type Post = Parameters<typeof PostCard>[0]["post"];

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const rain = new MatrixRain(canvasRef.current, {
      theme: "green",
      glyphSet: "mixed",
      speed: 1.5,
      density: 0.8,
      trail: 0.055,
      glow: true,
      fontSize: 22,
    });
    rain.start();
    return () => rain.destroy();
  }, []);

  const { data: posts = [], isLoading, isError } = useQuery<Post[]>({
    queryKey: ["homePosts"],
    queryFn: () => sanityClient.fetch(queries.latestPosts(0, 2)),
  });

  return (
    <>
      <SEOHead
        title="SuperIC: an AI lab for Australian e-commerce"
        description="An open AI lab for Australian e-commerce operators. We test AI systems on real brands, log what we learn, and teach you to build them. Built in Melbourne."
        canonical="https://supereyesee.com/"
      />
      {/* Full-bleed chaotic hero */}
      <section className="panel-dark blend-bottom relative isolate flex min-h-[88vh] flex-col justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(180deg, hsl(var(--terminal-black) / 0.72) 0%, hsl(var(--terminal-black) / 0.25) 40%, hsl(var(--terminal-black) / 0.85) 100%)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0) 4px)",
          }}
        />

        <div className="relative z-30 mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8">
          <span
            className="mb-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--signal-green-light))" }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: "hsl(var(--signal-green))" }}
            />
            @supereyesee / building in the open
          </span>

          <h1 className="m-0 flex flex-col items-start">
            {WORDS.map((w, i) => (
              <span
                key={w}
                className="block font-extrabold uppercase leading-[0.86] tracking-[-0.045em] animate-fade-in"
                style={{
                  fontSize: "clamp(46px, 11vw, 150px)",
                  animationDelay: `${i * 140}ms`,
                  animationFillMode: "both",
                  color: "hsl(var(--signal-green-light))",
                  textShadow: "0 0 60px hsl(var(--signal-green) / 0.45), 0 4px 40px rgba(0,0,0,.8)",
                  textWrap: "balance",
                }}
              >
                {w}
              </span>
            ))}
          </h1>

          <div className="mt-10 max-w-[520px]">
            <p className="text-[clamp(15px,1.5vw,18px)] leading-[1.6] text-terminal-white/75">
              Every AI marketing system, build and teardown I actually run, written
              down while it's still messy. Copy it, break it, make it yours.
            </p>
            <div className="mt-6 max-w-[420px]">
              <NewsletterForm source="hero" />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-terminal-white/55">
                one email a week, nothing gated
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-terminal-white/55">
                built in Melbourne, tested on real Australian brands
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="homepage-lab panel-dark">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <section className="py-12 sm:py-16" aria-labelledby="builds-heading">
          <p className="label-mono mb-3">// in the lab</p>
          <h2 id="builds-heading" className="text-2xl font-bold sm:text-3xl">Current experiments</h2>
          <p className="mb-8 mt-4 max-w-[65ch] text-base leading-relaxed text-secondary-text">
            What we're testing right now. Each experiment starts with a real problem on a real Australian brand. Here's what we built, where it's at, and what we've learned so far.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {builds.map((build, index) => {
              const Icon = buildIcons[index] || Terminal;
              return (
                <article key={build.name} className="bit-corners flex flex-col rounded-lg border border-border bg-card p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-signal-green-light"><Icon className="h-4 w-4" aria-hidden="true" />EXP-{String(index + 1).padStart(2, "0")}</span>
                    <span className={`rounded border px-2 py-1 font-mono text-[11px] uppercase ${build.status === "live" ? "border-signal-green/30 bg-signal-green/10 text-signal-green-light" : "border-border bg-muted text-muted-foreground"}`} title={build.status === "wip" ? "Work in progress" : "Live"}>
                      {build.status}
                    </span>
                  </div>
                  <h3 className="mb-4 break-words font-mono text-base font-bold">{build.name}</h3>
                  <dl className="mb-5 space-y-4 text-sm leading-relaxed">
                    <div><dt className="mb-1 font-mono text-xs uppercase text-signal-green-light">Problem</dt><dd className="text-secondary-text">{build.problem}</dd></div>
                    <div><dt className="mb-1 font-mono text-xs uppercase text-signal-green-light">What we built</dt><dd className="text-secondary-text">{build.built}</dd></div>
                    <div><dt className="mb-1 font-mono text-xs uppercase text-signal-green-light">Status</dt><dd className="text-secondary-text">{build.status === "live" ? "Live" : "Work in progress"}</dd></div>
                    <div className="border-t border-border pt-4 font-mono text-xs text-muted-text">Log in progress</div>
                  </dl>
                  <a href="#training" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Learn to build this <ArrowRight size={14} /></a>
                </article>
              );
            })}
          </div>
        </section>
        <PixelRule />
        <section id="training" className="scroll-mt-20 py-12 sm:py-16" aria-labelledby="training-heading">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <BookOpen className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
              <p className="label-mono mb-3">// coming soon</p>
              <h2 id="training-heading" className="text-2xl font-bold sm:text-3xl">Learn the builds</h2>
            </div>
            <div>
              <p className="mb-5 text-base leading-relaxed text-secondary-text">We're turning these experiments into hands-on walkthroughs, so you can rebuild them for your own brand step by step.</p>
              <p className="mb-4 text-sm text-secondary-text">Join the waitlist for training updates through our existing email list.</p>
              <NewsletterForm source="training" buttonLabel="Join the waitlist" emailLabel="Email address for training updates" />
            </div>
          </div>
        </section>
      </div>

      <section id="community" className="panel-dark relative isolate scroll-mt-20 py-12 sm:py-16" aria-labelledby="community-heading">
        <div className="mx-auto grid max-w-[1000px] gap-8 px-5 sm:grid-cols-2 sm:gap-12 sm:px-8">
          <div>
            <Users className="mb-4 h-6 w-6 text-signal-green" aria-hidden="true" />
            <p className="mb-3 font-mono text-[11px] uppercase text-terminal-white/60">// open lab</p>
            <h2 id="community-heading" className="text-2xl font-bold text-terminal-white sm:text-3xl">Experiment with us</h2>
          </div>
          <div>
            <p className="mb-5 text-base leading-relaxed text-terminal-white/75">Bring your own experiments. We're a group of Australian e-commerce operators sharing what we're testing, what broke and what worked, and helping each other get unstuck.</p>
            <p className="mb-4 text-sm text-terminal-white/65">Join the community waitlist through our existing email list.</p>
            <NewsletterForm source="community" buttonLabel="Join the lab" emailLabel="Email address for the community waitlist" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <section className="py-12 sm:py-16" aria-labelledby="notes-heading">
          <p className="label-mono mb-3">// field notes</p>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
            <h2 id="notes-heading" className="text-2xl font-bold sm:text-3xl">Field notes</h2>
            <Link to="/blog" className="text-sm font-semibold text-primary hover:underline">All field notes →</Link>
          </div>
          <p className="mb-7 text-base leading-relaxed text-secondary-text">I'm Matthew. These are my notes on what I've tried, what worked and what I'm still figuring out.</p>
          {isLoading ? (
            <p role="status" className="text-sm text-muted-text">Loading field notes…</p>
          ) : isError ? (
            <p role="status" className="text-sm text-muted-text">Field notes couldn't load just now. <Link to="/blog" className="text-primary hover:underline">Visit the blog →</Link></p>
          ) : posts.length > 0 ? (
            <div>{posts.map((post) => <PostCard key={post._id} post={post} />)}</div>
          ) : (
            <p className="text-sm text-muted-text">No field notes published yet.</p>
          )}
        </section>
        <PixelRule />
        <section className="py-12 sm:py-16" aria-labelledby="reads-heading">
          <p className="label-mono mb-3">// good reads</p>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="reads-heading" className="text-2xl font-bold sm:text-3xl">Good Reads</h2>
            <Link to="/reads" className="text-sm font-semibold text-primary hover:underline">All reads →</Link>
          </div>
          {goodReads.length > 0 ? (
            <ul className="divide-y divide-border">
              {goodReads.slice(0, 2).map((read) => (
                <li key={read.url} className="py-5">
                  <a href={read.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <p className="label-mono mb-2">{read.source}</p>
                    <h3 className="text-lg font-bold group-hover:text-primary">{read.title} ↗</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary-text">{read.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-muted-text">No reads shared yet.</p>}
        </section>
      </div>
      </div>
    </>
  );
}
