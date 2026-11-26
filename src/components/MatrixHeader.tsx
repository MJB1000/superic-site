import { useEffect, useRef } from "react";
import MatrixRain from "@/lib/matrix-rain.js";

interface MatrixHeaderProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  theme?: "green" | "amber" | "mono";
  glyphSet?: "matrix" | "binary" | "words" | "mixed";
  speed?: number;
  density?: number;
  trail?: number;
  glow?: boolean;
  scanlines?: boolean;
  children?: React.ReactNode;
}

export default function MatrixHeader({
  eyebrow = "@supereyesee  —  building in the open",
  title = "Let's build cool",
  highlight = "shit with AI",
  subtitle = "Case studies, teardowns and half-finished experiments from a marketer building with AI. Real builds, what broke, what shipped — steal any of it.",
  theme = "green",
  glyphSet = "matrix",
  speed = 1,
  density = 0.75,
  trail = 0.08,
  glow = true,
  scanlines = true,
  children,
}: MatrixHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const rain = new (MatrixRain as any)(canvasRef.current, {
      theme,
      glyphSet,
      speed,
      density,
      trail,
      glow,
    });
    rain.start();
    return () => rain.destroy();
  }, [theme, glyphSet, speed, density, trail, glow]);

  return (
    <section className="panel-dark relative isolate flex min-h-[520px] items-center justify-center overflow-hidden border-b border-border">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />

      {/* Scrim — keeps the centered copy legible over the rain */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(70% 60% at 50% 50%, hsl(var(--terminal-black) / 0.94) 0%, hsl(var(--terminal-black) / 0.7) 45%, hsl(var(--terminal-black) / 0.15) 78%),
            linear-gradient(180deg, hsl(var(--terminal-black) / 0.5) 0%, hsl(var(--terminal-black) / 0) 25%),
            linear-gradient(0deg, hsl(var(--terminal-black)) 1%, hsl(var(--terminal-black) / 0) 30%)
          `,
        }}
      />

      {scanlines && (
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-25"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0) 4px)",
          }}
        />
      )}

      <div className="relative z-30 mx-auto w-full max-w-[820px] px-6 py-[clamp(56px,9vw,96px)] text-center">
        <span className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-signal-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-green" />
          {eyebrow}
        </span>
        <h1
          className="m-0 font-extrabold leading-[1.03] tracking-[-0.03em] text-terminal-white"
          style={{
            fontSize: "clamp(36px, 5.4vw, 68px)",
            textShadow: "0 2px 40px rgba(0,0,0,.85)",
            textWrap: "balance" as any,
          }}
        >
          {title}{" "}
          <span className="block sm:inline">{highlight}</span>
        </h1>
        <p
          className="mx-auto mt-5 max-w-[54ch] text-[clamp(15px,1.5vw,18px)] leading-[1.6] text-terminal-white/70"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,.8)" }}
        >
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
