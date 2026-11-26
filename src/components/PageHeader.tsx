// Shared page header used across every inner page so the branding
// pattern (kicker + heading + hand underline + intro) is identical.

import Kicker from "./Kicker";
import HandUnderline from "./HandUnderline";
import { PixelRule, PixelStep } from "./BitGraphics";

interface PageHeaderProps {
  kicker: string;
  note?: string;
  title: string;
  intro?: string;
  step?: string;
  underlineWidth?: number;
  children?: React.ReactNode;
}

export default function PageHeader({
  kicker,
  note,
  title,
  intro,
  step,
  underlineWidth = 150,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative isolate mb-9">
      {/* faint 8-bit dither wash behind the heading, fading out downward */}
      <div
        aria-hidden
        className="bit-dither pointer-events-none absolute -inset-x-4 -top-6 h-40 -z-10"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="mb-4 flex items-center gap-2.5">
        {step && <PixelStep n={step} />}
        <Kicker note={note}>{kicker}</Kicker>
      </div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-[42px]">
        {title}
      </h1>
      <HandUnderline width={underlineWidth} className="mb-4 text-primary" />
      {intro && (
        <p className="max-w-[58ch] text-[15px] leading-relaxed text-secondary-text">
          {intro}
        </p>
      )}
      {children}
      <div className="mt-7 max-w-[420px] opacity-70">
        <PixelRule />
      </div>
    </header>
  );
}
