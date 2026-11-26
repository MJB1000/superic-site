/* BitGraphics — 8-bit "night drive" accents that echo the CRT hero.
 * All SVG, crispEdges-rendered, brand-green phosphor palette.
 * Designed to sit *inside* sections as texture and typographic marks,
 * not as full-bleed dark bands between light sections.
 */
import type { CSSProperties } from "react";

const G = "hsl(160 84% 39%)"; // signal-green
const GL = "hsl(160 73% 52%)"; // signal-green-light
const GD = "hsl(160 90% 30%)"; // signal-green-deep

/* Layered pixel hill silhouettes + starfield.
 * `transparent` drops the sky fill so it can sit over the CRT hero.
 */
export function PixelHills({
  className = "",
  height = 96,
  transparent = false,
  opacity = 1,
}: {
  className?: string;
  height?: number;
  transparent?: boolean;
  opacity?: number;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 320 64"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated", opacity }}
      aria-hidden
    >
      {!transparent && <rect x="0" y="0" width="320" height="64" fill="hsl(160 60% 6%)" />}
      {!transparent && (
        <g fill={GL}>
          <rect x="20" y="6" width="1" height="1" />
          <rect x="54" y="4" width="1" height="1" />
          <rect x="90" y="9" width="1" height="1" />
          <rect x="130" y="5" width="1" height="1" />
          <rect x="172" y="8" width="1" height="1" />
          <rect x="210" y="4" width="1" height="1" />
          <rect x="248" y="7" width="1" height="1" />
          <rect x="286" y="5" width="1" height="1" />
        </g>
      )}
      {/* far hills */}
      <path
        d="M0 52 L16 46 L32 50 L48 42 L64 48 L80 40 L96 47 L112 38 L128 45 L144 39 L160 46 L176 41 L192 48 L208 42 L224 47 L240 40 L256 46 L272 42 L288 49 L304 43 L320 48 L320 64 L0 64 Z"
        fill={GD}
        opacity="0.45"
      />
      {/* mid hills */}
      <path
        d="M0 56 L20 50 L40 55 L60 47 L80 53 L100 46 L120 52 L140 48 L160 54 L180 47 L200 53 L220 49 L240 54 L260 48 L280 53 L300 50 L320 55 L320 64 L0 64 Z"
        fill={G}
        opacity="0.3"
      />
      {/* near hill rim */}
      <path
        d="M0 60 L24 57 L48 61 L72 56 L96 60 L120 55 L144 60 L168 57 L192 61 L216 56 L240 60 L264 57 L288 61 L312 57 L320 60 L320 64 L0 64 Z"
        fill={GL}
        opacity="0.22"
      />
    </svg>
  );
}

/* Faint POV road, used as a low-opacity background watermark inside a
 * light section (no dark plate). */
export function PixelRoad({
  className = "",
  height = 220,
  opacity = 0.1,
}: {
  className?: string;
  height?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 320 120"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated", opacity }}
      aria-hidden
    >
      <polygon points="150,0 170,0 300,120 20,120" fill={G} opacity="0.14" />
      <polygon points="150,0 152,0 24,120 18,120" fill={G} />
      <polygon points="168,0 170,0 302,120 296,120" fill={G} />
      <g fill={GD}>
        <rect x="159" y="6" width="2" height="3" />
        <rect x="158" y="20" width="4" height="5" />
        <rect x="156" y="42" width="7" height="8" />
        <rect x="152" y="74" width="14" height="12" />
      </g>
    </svg>
  );
}

/* Thin 8-bit rule: a pixel-tooth divider that reads on light backgrounds. */
export function PixelRule({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="6"
      viewBox="0 0 320 6"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated" }}
      aria-hidden
    >
      <rect x="0" y="2" width="320" height="1" fill={G} opacity="0.28" />
      <g fill={G} opacity="0.75">
        {Array.from({ length: 40 }).map((_, i) => (
          <rect key={i} x={i * 8} y="0" width="2" height="2" />
        ))}
      </g>
    </svg>
  );
}

/* Small pixel step marker used in kickers, e.g. 01 / 02 / 03. */
export function PixelStep({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 22,
        height: 16,
        padding: "0 4px",
        background: G,
        color: "hsl(160 60% 6%)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        imageRendering: "pixelated",
        boxShadow: `2px 2px 0 0 ${GD}`,
      }}
    >
      {n}
    </span>
  );
}

/* Inline pixel arrow — a signpost mark that lives next to a link. */
export function PixelArrow({
  dir = "right",
  color = G,
  size = 10,
}: {
  dir?: "left" | "right";
  color?: string;
  size?: number;
}) {
  const pts = dir === "left" ? "8,0 8,12 0,6" : "0,0 0,12 8,6";
  return (
    <svg
      width={size}
      height={(size * 12) / 8}
      viewBox="0 0 8 12"
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated", flexShrink: 0 }}
      aria-hidden
    >
      <polygon points={pts} fill={color} />
    </svg>
  );
}

/* Ordered dithering overlay — faint CRT texture for light sections. */
export function PixelDither({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage:
          "radial-gradient(hsl(160 84% 39% / 0.10) 0.5px, transparent 0.5px)",
        backgroundSize: "4px 4px",
        ...style,
      }}
    />
  );
}

/* Pixel corner brackets — L-shaped ticks, subtler than solid blocks. */
export function PixelCorners({ color = G, size = 6 }: { color?: string; size?: number }) {
  const arm: CSSProperties = { position: "absolute", background: color, imageRendering: "pixelated" };
  const h = { ...arm, width: size, height: 2 };
  const v = { ...arm, width: 2, height: size };
  return (
    <>
      <span style={{ ...h, top: -2, left: -2 }} />
      <span style={{ ...v, top: -2, left: -2 }} />
      <span style={{ ...h, top: -2, right: -2 }} />
      <span style={{ ...v, top: -2, right: -2 }} />
      <span style={{ ...h, bottom: -2, left: -2 }} />
      <span style={{ ...v, bottom: -2, left: -2 }} />
      <span style={{ ...h, bottom: -2, right: -2 }} />
      <span style={{ ...v, bottom: -2, right: -2 }} />
    </>
  );
}

export { G as BIT_GREEN, GL as BIT_GREEN_LIGHT, GD as BIT_GREEN_DEEP };
