import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MatrixRain from "@/lib/matrix-rain.js";
import SEOHead from "@/components/SEOHead";
import NewsletterForm from "@/components/NewsletterForm";
import { FlaskConical, BookOpen, Layers, Instagram } from "lucide-react";

const WORDS = ["STEAL", "MY AI", "WORKFLOW"];

export default function IndexVariant() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const rain = new (MatrixRain as any)(canvasRef.current, {
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

  return (
    <>
      <SEOHead
        title="Steal My AI Workflow"
        description="The AI marketing systems, builds and teardowns I actually run. Take them, break them, make them your own."
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
                  textWrap: "balance" as any,
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
              <NewsletterForm />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-terminal-white/55">
                one email a week, nothing gated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav band */}
      <section className="blend-dark-top relative isolate bg-card">
        <div className="mx-auto grid max-w-[1180px] gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            { icon: FlaskConical, title: "Case studies", body: "Full builds. The brief, the wrong turns, what shipped.", href: "/projects" },
            { icon: Layers, title: "Teardowns and systems", body: "How the brand and growth machines are wired.", href: "/blog" },
            { icon: Instagram, title: "The short version", body: "Reels and carousels. The 30 second cut.", href: "/social" },
            { icon: BookOpen, title: "Discoveries", body: "Tools and reading I keep going back to.", href: "/tools" },
          ].map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              to={href}
              className="group bit-corners flex flex-col gap-3 border-border py-9 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="text-[16px] font-bold tracking-tight text-foreground group-hover:text-primary">{title}</h2>
              <p className="max-w-[34ch] text-[14px] leading-relaxed text-secondary-text">{body}</p>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
