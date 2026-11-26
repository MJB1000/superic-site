// Small handwritten annotation — used sparingly as a margin/scrawl accent
// next to printed UI labels. Slightly rotated, always muted.

interface HandNoteProps {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
}

export default function HandNote({
  children,
  rotate = -2,
  className = "",
}: HandNoteProps) {
  return (
    <span
      className={`font-hand text-[15px] leading-none text-muted-text/70 ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, display: "inline-block" }}
    >
      {children}
    </span>
  );
}
