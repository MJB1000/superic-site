// Hand-drawn wobble underline. Inherits color from currentColor so it
// picks up the section accent when wrapped in a `text-primary` parent.

interface HandUnderlineProps {
  width?: number;
  className?: string;
  strokeWidth?: number;
}

export default function HandUnderline({
  width = 180,
  className = "",
  strokeWidth = 2,
}: HandUnderlineProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      width={width}
      height={12}
      preserveAspectRatio="none"
      className={`block text-primary ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 7 C 28 3, 55 10, 82 5 S 138 9, 165 4 S 192 8, 198 6"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}
