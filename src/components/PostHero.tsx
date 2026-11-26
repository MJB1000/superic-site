import { useEffect, useRef } from "react";
import MatrixRain from "@/lib/matrix-rain.js";

export type HeroAnimationKey =
  | "matrix"
  | "beams"
  | "grid"
  | "noise"
  | "gradient"
  | "constellation"
  | "waves"
  | "none";

interface PostHeroProps {
  title: string;
  thesis?: string;
  eyebrow?: string;
  animation?: HeroAnimationKey;
  /** Optional fallback still image (e.g. Sanity heroImage URL) shown when animation === "none" */
  fallbackImage?: string;
}

/**
 * Full-bleed thesis-style header for a single post.
 * The background slot is driven by a CMS key so an editor can pick the
 * mood per post. Title + thesis sit over the animation with a dark scrim.
 */
export default function PostHero({
  title,
  thesis,
  eyebrow,
  animation = "matrix",
  fallbackImage,
}: PostHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drive any canvas-based variant from here
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cleanup: (() => void) | undefined;

    if (animation === "matrix") {
      const rain = new (MatrixRain as any)(canvas, {
        theme: "green",
        glyphSet: "mixed",
        speed: 0.85,
        density: 0.7,
        trail: 0.09,
        glow: true,
      });
      rain.start();
      cleanup = () => rain.destroy();
    } else if (animation === "constellation") {
      cleanup = runConstellation(canvas);
    } else if (animation === "waves") {
      cleanup = runWaves(canvas);
    } else if (animation === "noise") {
      cleanup = runNoise(canvas);
    }

    return cleanup;
  }, [animation]);

  const usesCanvas =
    animation === "matrix" ||
    animation === "constellation" ||
    animation === "waves" ||
    animation === "noise";

  return (
    <section
      className="relative isolate w-full overflow-hidden border-b border-border bg-background"
      style={{ minHeight: 420, height: "62vh", maxHeight: 680 }}
    >
      {/* Animation slot */}
      {usesCanvas && (
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />
      )}

      {animation === "beams" && <BeamsLayer />}
      {animation === "grid" && <GridLayer />}
      {animation === "gradient" && <GradientLayer />}
      {animation === "none" && fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
        />
      )}

      {/* Scrim for legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(120% 100% at 12% 85%, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.55) 40%, hsl(var(--background) / 0) 72%),
            linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0) 28%),
            linear-gradient(0deg, hsl(var(--background)) 2%, hsl(var(--background) / 0) 36%)
          `,
        }}
      />

      {/* Subtle scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-25 mix-blend-multiply"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.22) 3px, rgba(0,0,0,0) 4px)",
        }}
      />

      {/* Thesis copy */}
      <div className="relative z-30 mx-auto flex h-full max-w-[1080px] flex-col justify-end px-[clamp(24px,5vw,68px)] pb-[clamp(34px,5vw,64px)] pt-[clamp(48px,8vw,96px)]">
        {eyebrow && (
          <span className="mb-5 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-[28px] bg-primary" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            {eyebrow}
          </span>
        )}
        <h1
          className="m-0 max-w-[22ch] font-bold leading-[0.98] tracking-[-0.03em] text-foreground"
          style={{
            fontSize: "clamp(34px, 5.2vw, 68px)",
            textShadow: "0 2px 44px rgba(0,0,0,.9)",
            textWrap: "balance" as any,
          }}
        >
          {title}
        </h1>
        {thesis && (
          <p
            className="mt-6 max-w-[58ch] text-[clamp(16px,1.55vw,21px)] leading-[1.5] text-body-text"
            style={{ textShadow: "0 1px 18px rgba(0,0,0,.8)" }}
          >
            <span className="bg-primary/15 px-1.5 py-0.5 text-foreground decoration-primary/60 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {thesis}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------- CSS-only background variants ---------------- */

function BeamsLayer() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 210deg at 30% 110%, hsl(var(--primary) / 0.35), transparent 35%, hsl(var(--primary) / 0.18) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-0 animate-[pulse_6s_ease-in-out_infinite] bg-[radial-gradient(60%_40%_at_70%_20%,hsl(var(--primary)/0.18),transparent_60%)]" />
    </div>
  );
}

function GridLayer() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)/0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at 30% 80%, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

function GradientLayer() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--background)) 55%), radial-gradient(80% 60% at 80% 20%, hsl(var(--primary) / 0.25), transparent 70%)",
      }}
    />
  );
}

/* ---------------- Canvas variants ---------------- */

function runConstellation(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  let raf = 0;
  let w = 0, h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pts: { x: number; y: number; vx: number; vy: number }[] = [];

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.floor((w * h) / 14000);
    pts.length = 0;
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      });
    }
  };
  resize();
  window.addEventListener("resize", resize);

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "hsl(160 84% 55% / 0.9)";
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          ctx.strokeStyle = `hsl(160 84% 55% / ${0.18 * (1 - d2 / 14400)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}

function runWaves(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  let raf = 0, t = 0, w = 0, h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (let k = 0; k < 5; k++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsl(160 84% ${45 + k * 4}% / ${0.18 + k * 0.05})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += 6) {
        const y = h * 0.55 + Math.sin(x * 0.012 + t * 0.025 + k) * (16 + k * 6) + k * 14;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    t += 1;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}

function runNoise(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  let raf = 0, w = 0, h = 0;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = Math.floor(r.width / 3); h = Math.floor(r.height / 3);
    canvas.width = w; canvas.height = h;
    canvas.style.imageRendering = "pixelated";
  };
  resize();
  window.addEventListener("resize", resize);
  const tick = () => {
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 40;
      d[i] = 16 + v * 0.1;
      d[i + 1] = 60 + v;
      d[i + 2] = 40 + v * 0.4;
      d[i + 3] = 60;
    }
    ctx.putImageData(img, 0, 0);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}
