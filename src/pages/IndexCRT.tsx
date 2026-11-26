import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CRTDrive from "@/lib/crt-drive.js";
import SEOHead from "@/components/SEOHead";

import NewsletterForm from "@/components/NewsletterForm";
import { FlaskConical, BookOpen, Layers, Instagram } from "lucide-react";
import {
  PixelHills,
  PixelRoad,
  PixelRule,
  PixelStep,
  PixelArrow,
  PixelDither,
  PixelCorners,
  BIT_GREEN,
  BIT_GREEN_LIGHT,
} from "@/components/BitGraphics";
import {
  SpriteOperator,
  SpriteStack,
  SpriteCommunity,
  SpriteMail,
} from "@/components/BitSprites";


const WORDS = ["STEAL", "MY AI", "WORKFLOW"];

export default function IndexCRT() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const drive = new (CRTDrive as any)(canvasRef.current, {
      tint: "green",
      grain: 4,
      noise: 0.16,
      speed: 1,
      fps: 24,
      scanlines: true,
      rollbar: true,
    });
    drive.start();
    return () => drive.destroy();
  }, []);


  return (
    <>
      <SEOHead
        title="Steal My AI Workflow"
        description="The AI marketing systems, builds and teardowns I actually run. Take them, break them, make them your own."
      />

      {/* CRT tube hero */}
      <section className="panel-dark blend-bottom relative isolate flex min-h-[88vh] flex-col justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />

        {/* Tube vignette + phosphor bloom */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `
              radial-gradient(120% 100% at 50% 50%, hsl(var(--terminal-black) / 0.35) 0%, hsl(var(--terminal-black) / 0.8) 62%, hsl(var(--terminal-black) / 0.97) 100%),
              linear-gradient(180deg, hsl(var(--terminal-black) / 0.65) 0%, hsl(var(--terminal-black) / 0.2) 42%, hsl(var(--terminal-black) / 0.9) 100%)
            `,
          }}
        />

        {/* Aperture grille — fine RGB mask of a real tube */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,0,0,.5) 0 1px, rgba(0,255,0,.5) 1px 2px, rgba(0,0,255,.5) 2px 3px)",
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
                  textShadow:
                    "0 0 2px hsl(var(--signal-green) / 0.9), 0 0 40px hsl(var(--signal-green) / 0.5), 2px 0 0 rgba(255,0,80,.28), -2px 0 0 rgba(0,180,255,.28)",
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



        {/* the drive ends: pixel horizon sits inside the tube, not as a band */}
        <PixelHills
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20"
          height={120}
          transparent
          opacity={0.5}
        />
      </section>

      {/* Quick nav band */}
      <section className="border-b border-border bg-card">
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
              className="group relative flex flex-col gap-3 border-border py-9 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-foreground group-hover:text-primary">
                {title}
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  <PixelArrow color={BIT_GREEN} size={8} />
                </span>
              </h2>
              <p className="max-w-[34ch] text-[14px] leading-relaxed text-secondary-text">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* One man team */}
      <section className="relative isolate overflow-hidden bg-background">
        {/* faint 8-bit road receding behind the copy — texture, not a band */}
        <PixelRoad
          className="pointer-events-none absolute bottom-0 left-1/2 w-[620px] max-w-none -translate-x-1/2"
          height={200}
          opacity={0.07}
        />
        <div className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
          <div className="max-w-[680px]">
            <div className="mb-4">
              <SpriteOperator />
            </div>
            <p
              className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "hsl(var(--signal-green-deep))" }}
            >
              <PixelStep n="01" />
              the setup
            </p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em] text-foreground">
              One man. One marketing team. AI doing the boring bits.
            </h2>
            <div className="mt-6 max-w-[220px]">
              <PixelRule />
            </div>
            <p className="mt-6 text-[17px] leading-[1.7] text-secondary-text">
              I'm a solo marketer running the whole growth stack for startups.
              No agency, no big team. I build workflows with AI to kill the
              boring, repetitive work so I can focus on the parts that actually
              move the needle. The goal is simple: 10x my output, 100x my
              impact, and build brand and growth systems that once took a full
              team of five.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-secondary-text">
              Everything here is the real work. The systems I run, the tools I
              actually use, and the lessons from doing it solo with AI as my
              only teammate.
            </p>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="relative isolate overflow-hidden border-y border-border/60 bg-card">
        <PixelDither style={{ opacity: 0.45 }} />
        <div className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
          <div className="mb-4">
            <SpriteStack />
          </div>
          <p
            className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--signal-green-deep))" }}
          >
            <PixelStep n="02" />
            the stack
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em] text-foreground">
            The platforms I build on
          </h2>
          <div className="mt-6 max-w-[220px]">
            <PixelRule />
          </div>
          <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-secondary-text">
            A working stack, not a hype list. These are the tools I open every
            day to ship marketing and product.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Shopify", note: "storefront" },
              { name: "Claude", note: "the brain" },
              { name: "Codes", note: "shipping" },
              { name: "Notion", note: "the docs" },
              { name: "Lovable", note: "builds" },
              { name: "+ more", note: "always testing" },
            ].map((p) => (
              <div
                key={p.name}
                className="group relative flex flex-col gap-1 border bg-background px-4 py-5 transition-colors"
                style={{
                  borderColor: "hsl(var(--border))",
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BIT_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  <PixelCorners color={BIT_GREEN} />
                </span>
                <span className="text-[15px] font-bold text-foreground">{p.name}</span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: "hsl(var(--signal-green))" }}
                >
                  {p.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project files & code */}
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <div className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
          <div className="mb-4">
            <SpriteOperator />
          </div>
          <p
            className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--signal-green-deep))" }}
          >
            <PixelStep n="03" />
            project files & code
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em] text-foreground">
            Pull the project files apart
          </h2>
          <div className="mt-6 max-w-[220px]">
            <PixelRule />
          </div>
          <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-secondary-text">
            I drop project files and source on GitHub so you can pull them
            apart, reuse them, and break them. Everything I build ships with
            the receipts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 border bg-card px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors"
              style={{ borderRadius: 0, borderColor: "hsl(var(--border))" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = BIT_GREEN)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                <PixelCorners color={BIT_GREEN_LIGHT} />
              </span>
              GitHub
              <PixelArrow color={BIT_GREEN} size={8} />
            </a>
          </div>
        </div>
      </section>

      {/* Community — its own night-drive plate */}
      <section className="panel-dark blend-top blend-bottom relative isolate overflow-hidden">
        <PixelRoad
          className="pointer-events-none absolute bottom-0 left-1/2 w-[620px] max-w-none -translate-x-1/2"
          height={200}
          opacity={0.1}
        />
        <div className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
          <div className="mb-4">
            <SpriteCommunity />
          </div>
          <p
            className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--signal-green-light))" }}
          >
            <PixelStep n="04" />
            community
          </p>
          <h2
            className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em]"
            style={{ color: "hsl(var(--signal-green-light))" }}
          >
            Build with me, not alone
          </h2>
          <div className="mt-6 max-w-[220px]">
            <PixelRule />
          </div>
          <p
            className="mt-6 max-w-[560px] text-[16px] leading-[1.7]"
            style={{ color: "hsl(var(--terminal-white) / 0.75)" }}
          >
            I run a WhatsApp community where I share builds, early experiments,
            and the stuff that doesn't make it to the blog. Show up, ask
            questions, and steal whatever helps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 border px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
              style={{
                borderRadius: 0,
                borderColor: "hsl(var(--signal-green) / 0.4)",
                color: "hsl(var(--signal-green-light))",
                backgroundColor: "hsl(var(--signal-green) / 0.08)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = BIT_GREEN)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(var(--signal-green) / 0.4)")}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                <PixelCorners color={BIT_GREEN_LIGHT} />
              </span>
              WhatsApp community
              <PixelArrow color={BIT_GREEN} size={8} />
            </a>
          </div>
        </div>
      </section>

      {/* Monthly drop / newsletter */}
      <section className="relative isolate overflow-hidden bg-card">
        <PixelDither style={{ opacity: 0.45 }} />
        <div className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
          <div className="mb-4">
            <SpriteMail />
          </div>
          <p
            className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "hsl(var(--signal-green-deep))" }}
          >
            <PixelStep n="05" />
            monthly drop
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em] text-foreground">
            Join the newsletter
          </h2>
          <div className="mt-6 max-w-[220px]">
            <PixelRule />
          </div>
          <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-secondary-text">
            One email a month. The best build I shipped, the tool that
            changed how I work, and one thing worth reading. No noise, no
            gated content.
          </p>
          <div className="mt-7 max-w-[420px]">
            <NewsletterForm />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-text">
              monthly, unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

