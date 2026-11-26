/* BitBand — a shared 8-bit "night horizon" strip used to blend the light
 * page body into the dark CRT world. The top edge fades out of white and
 * the bottom edge fades back into it, so there is never a hard seam.
 */
import { PixelHills, PixelRoad } from "./BitGraphics";

export default function BitBand({
  height = 132,
  road = true,
  fadeBottom = false,
  className = "",
}: {
  height?: number;
  road?: boolean;
  fadeBottom?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative isolate overflow-hidden bg-terminal-black ${className}`}
      style={{ height }}
    >
      {road && (
        <PixelRoad
          className="pointer-events-none absolute inset-x-0 bottom-0"
          height={height}
          opacity={0.16}
        />
      )}
      {/* top seam fade sits UNDER the hills so the horizon stays crisp */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: Math.round(height * 0.7),
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.98) 12%, hsl(var(--background) / 0.88) 28%, hsl(var(--background) / 0.68) 44%, hsl(var(--background) / 0.42) 60%, hsl(var(--background) / 0.18) 78%, transparent 100%)",
        }}
      />
      {/* 8-bit dither dissolve riding the seam */}
      <div
        className="pointer-events-none absolute inset-x-0 opacity-50"
        style={{
          top: Math.round(height * 0.3),
          height: 16,
          backgroundImage:
            "repeating-conic-gradient(hsl(var(--background)) 0% 25%, transparent 0% 50%)",
          backgroundSize: "4px 4px",
          maskImage: "linear-gradient(to bottom, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)",
        }}
      />
      <PixelHills
        className="pointer-events-none absolute inset-x-0 bottom-0"
        height={Math.round(height * 0.72)}
        transparent
        opacity={0.9}
      />
      {/* bottom seam: always soften the hard cut back into the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: Math.round(height * (fadeBottom ? 0.55 : 0.22)),
          background: fadeBottom
            ? "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 20%, hsl(var(--background) / 0.5) 46%, hsl(var(--background) / 0.18) 72%, transparent 100%)"
            : "linear-gradient(to top, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.22) 45%, transparent 100%)",
        }}
      />
    </div>
  );
}

