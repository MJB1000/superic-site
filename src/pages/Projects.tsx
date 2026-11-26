import { ArrowRight, ArrowUpRight, ImageOff } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Kicker from "@/components/Kicker";
import HandUnderline from "@/components/HandUnderline";
import BitBand from "@/components/BitBand";
import { PixelRule } from "@/components/BitGraphics";
import { sectionStyle } from "@/lib/sectionTheme";
import { projects, type ProjectItem } from "@/lib/projects";

const BLOG_URL = "/blog";

export default function Projects() {
  return (
    <>
      <SEOHead
        title="My experiments — projects you can try and rebuild"
        description="Live marketing tools and web apps I built while learning AI — try them, take the idea, and build your own version."
      />

      <div className="min-h-screen bg-background" style={sectionStyle("projects")}>
        {/* HERO */}
        <section className="blend-bottom relative isolate overflow-hidden">
          <MatrixBackdrop />
          <div className="relative mx-auto max-w-[1200px] px-[clamp(20px,5vw,68px)] py-[clamp(56px,10vh,104px)]">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col items-start gap-7">
                <Kicker note="built while learning">things I've made</Kicker>
                <h1 className="m-0 font-sans text-[clamp(48px,8vw,96px)] font-black leading-[1.02] tracking-[-0.035em] text-foreground">
                  Vibe Code Projects.
                  <br />
                  Ready To{" "}
                  <span className="relative inline-block">
                    <span
                      className="text-primary"
                      style={{ textShadow: "0 0 38px hsl(var(--primary) / 0.45)" }}
                    >
                      Run
                    </span>
                    <HandUnderline
                      width={120}
                      className="absolute -bottom-3 left-0 text-primary"
                    />
                  </span>
                </h1>
                <p className="m-0 max-w-[560px] text-[clamp(15px,1.4vw,18px)] leading-[1.6] text-body">
                  These are the things I've built while learning — small tools,
                  web apps and automations that solved a real problem for me. Every
                  one is live, so click in and play with it. The notes explain what
                  it is, why I made it and how it works, so you can go build your
                  own version.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    style={{ boxShadow: "0 0 32px hsl(var(--primary) / 0.35)" }}
                  >
                    Have a look <ArrowRight size={16} />
                  </a>
                  <a
                    href={BLOG_URL}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/40 px-6 text-[14px] font-semibold text-foreground transition-colors hover:bg-card"
                  >
                    Read the notes <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="mt-2 flex items-center gap-2.5 font-mono text-[12px] text-muted-text">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
                  />
                  live demos below — click into any of them
                </div>
              </div>

              <div className="hidden min-w-0 lg:block">
                <HeroConsole />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="blend-dark-top relative isolate">
          <div className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,68px)] py-[clamp(64px,10vh,120px)]">
            <div className="mb-12">
              <Kicker>the work</Kicker>
              <h2 className="mt-3.5 font-sans text-[clamp(32px,4.5vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-foreground">
                Have a look. Then go make yours.
              </h2>
              <p className="mt-3.5 max-w-[560px] text-[clamp(15px,1.3vw,17px)] leading-[1.6] text-muted-text">
                Real screenshots, live demos, honest notes. The list grows every
                time I learn something new.
              </p>
              <div className="mt-7 max-w-[360px] opacity-70">
                <PixelRule />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* AUTHOR BAND */}
        <section>
          <div className="mx-auto max-w-[1200px] grid items-start gap-[clamp(24px,5vw,72px)] px-[clamp(20px,5vw,68px)] py-[clamp(48px,8vh,96px)] md:grid-cols-[minmax(0,220px)_1fr]">
            <Kicker className="whitespace-nowrap">who's behind this</Kicker>
            <p className="m-0 max-w-[760px] font-sans text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.45] tracking-[-0.015em] text-foreground">
              I'm Matthew — a marketer learning to build with AI, in public. Each
              project here started as something I needed, then became something I
              could share. I write up the how and why on{" "}
              <a
                href="/"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                supereyesee
              </a>
              .
            </p>
          </div>
        </section>

        {/* closing horizon */}
        <BitBand height={132} road={false} />
      </div>
    </>
  );
}


/* ------------------------------ Hero console ----------------------------- */
function HeroConsole() {
  const Line = ({ a, b }: { a: string; b: string }) => (
    <div className="flex gap-2.5 py-[7px] font-mono text-[12.5px]">
      <span className="text-primary">{a}</span>
      <span className="text-muted-text">{b}</span>
    </div>
  );
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-card"
      style={{ boxShadow: "0 20px 60px -20px hsl(0 0% 0% / 0.6)" }}
    >
      <div className="flex h-[38px] items-center gap-2 border-b border-border bg-background/60 px-3.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-muted" />
        ))}
        <span className="ml-2 font-mono text-[11px] text-muted-text">
          ~/ships
        </span>
      </div>
      <div className="px-[18px] py-3.5">
        <div className="font-mono text-[12.5px] text-muted-text">
          $ ls --status
        </div>
        <Line a="framedrop" b="creator → frame.io portal   ● live" />
        <Line a="project_02" b="scaffolding ...             ○ soon" />
        <Line a="project_03" b="in design ...               ○ soon" />
        <div className="mt-2.5 font-mono text-[12.5px] text-secondary-text">
          $ open framedrop<span className="animate-blink">▌</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Matrix backdrop -------------------------- */
function MatrixBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 22px, hsl(var(--primary) / 0.25) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, hsl(var(--primary) / 0.15) 22px 23px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% -10%, transparent 30%, hsl(var(--background) / 0.6) 70%, hsl(var(--background)) 100%), linear-gradient(180deg, hsl(var(--background) / 0.55), hsl(var(--background) / 0.2) 40%, hsl(var(--background)))",
        }}
      />
    </div>
  );
}

/* ------------------------------ Project card ----------------------------- */
function ProjectCard({ project }: { project: ProjectItem }) {
  const { name, desc, details, tags = [], demo = "#", url, reserved, secondary, screenshot } = project;
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:bg-card/60">
      <BrowserFrame url={url}>
        <ScreenshotCover screenshot={screenshot} name={name} reserved={reserved} />
      </BrowserFrame>
      <div className="flex flex-1 flex-col gap-3.5 px-1 pb-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="m-0 font-sans text-[21px] font-extrabold tracking-[-0.02em] text-foreground">
            {name}
          </h3>
          {reserved ? (
            <span className="inline-flex h-6 items-center rounded-full border border-border bg-muted/40 px-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-text">
              reserved
            </span>
          ) : (
            <span
              className="inline-flex h-6 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 font-mono text-[10px] uppercase tracking-wider text-primary"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 6px hsl(var(--primary) / 0.6)" }}
              />
              live
            </span>
          )}
        </div>
        <p className="m-0 max-w-[52ch] font-sans text-[15px] leading-[1.55] text-body">
          {desc}
        </p>
        {details && (
          <details className="group/details rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-[14px] leading-[1.6] text-body">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-primary [&::-webkit-details-marker]:hidden">
              <span>Build notes — what it is, why, how</span>
              <span className="transition-transform group-open/details:rotate-90">→</span>
            </summary>
            <div className="mt-3 max-h-[420px] overflow-y-auto whitespace-pre-line pr-2 text-secondary-text">
              {details}
            </div>
          </details>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex h-6 items-center rounded-md border border-border bg-background/60 px-2 font-mono text-[11px] text-secondary-text"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          {reserved ? (
            <span className="inline-flex flex-col gap-2 text-[13px] text-muted-text">
              <span className="inline-flex items-center gap-2 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-muted-text" /> in the lab</span>
              <span className="text-xs leading-relaxed">Where we test new AI tools on real brands before teaching them.</span>
            </span>
          ) : (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-primary"
            >
              Try the live demo{" "}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          )}
          {secondary && !reserved && (
            <a
              href={secondary.href}
              className="font-mono text-[12px] tracking-wide text-muted-text hover:text-foreground"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Browser frame ---------------------------- */
function BrowserFrame({
  url = "app.example.com",
  children,
}: {
  url?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex h-[34px] items-center gap-2.5 border-b border-border bg-card/60 px-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-muted" />
          ))}
        </div>
        <div className="flex flex-1 justify-center">
          <span className="inline-flex h-5 max-w-[78%] items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-border bg-background px-3 font-mono text-[11px] text-muted-text">
            <span className="text-[9px] text-primary">▲</span>
            {url}
          </span>
        </div>
        <span className="w-[30px]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

/* ------------------------------ Screenshot cover ------------------------- */
function ScreenshotCover({
  screenshot,
  name,
  reserved,
}: {
  screenshot?: string;
  name: string;
  reserved?: boolean;
}) {
  if (reserved) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 23px, hsl(var(--foreground) / 0.02) 23px 24px)",
        }}
      >
        <div className="font-mono text-[11px] text-muted-text">&gt; awaiting next drop</div>
        <div className="font-mono text-[12px] text-primary">$ init {name.toLowerCase().replace(/\s+/g, "_")}</div>
      </div>
    );
  }
  if (!screenshot) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background text-muted-text">
        <ImageOff size={22} />
        <div className="font-mono text-[11px]">screenshot required</div>
        <div className="font-mono text-[10px] opacity-70">
          add a high-res image in src/lib/projects.ts
        </div>
      </div>
    );
  }
  return (
    <img
      src={screenshot}
      alt={`${name} — product screenshot`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

