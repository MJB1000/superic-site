/* BitSprites — tiny animated 8-bit sprites used as section mascots.
 * Pure SVG + CSS keyframes, crispEdges, brand green phosphor palette.
 */
const G = "hsl(160 84% 39%)";
const GL = "hsl(160 73% 52%)";
const GD = "hsl(160 90% 30%)";

const CSS = `
@keyframes bit-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes bit-roll { 0% { transform: translateX(0) } 100% { transform: translateX(-8px) } }
@keyframes bit-blink { 0%,45% { opacity: 1 } 50%,95% { opacity: 0.15 } }
@keyframes bit-rise { 0% { transform: translateY(2px); opacity: 0 } 30% { opacity: 1 } 100% { transform: translateY(-8px); opacity: 0 } }
@keyframes bit-flag { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(0.82) } }
.bit-bob { animation: bit-bob 1.1s steps(2, end) infinite; }
.bit-roll { animation: bit-roll .5s steps(4, end) infinite; }
.bit-blink { animation: bit-blink 1.4s steps(1, end) infinite; }
.bit-flag { animation: bit-flag 1s steps(3, end) infinite; transform-origin: left center; }
.bit-p1 { animation: bit-rise 2.1s steps(6, end) infinite; }
.bit-p2 { animation: bit-rise 2.1s steps(6, end) .7s infinite; }
.bit-p3 { animation: bit-rise 2.1s steps(6, end) 1.4s infinite; }
@media (prefers-reduced-motion: reduce) {
  .bit-bob,.bit-roll,.bit-blink,.bit-flag,.bit-p1,.bit-p2,.bit-p3 { animation: none; }
}
`;

function Frame({
  children,
  size = 72,
  vb = "0 0 32 24",
}: {
  children: React.ReactNode;
  size?: number;
  vb?: string;
}) {
  return (
    <svg
      width={size}
      height={(size * 24) / 32}
      viewBox={vb}
      shapeRendering="crispEdges"
      style={{ display: "block", imageRendering: "pixelated", overflow: "visible" }}
      aria-hidden
    >
      <style>{CSS}</style>
      {children}
    </svg>
  );
}

/* 01 — the setup: a lone operator sprite at a desk terminal */
export function SpriteOperator({ size = 76 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* terminal */}
      <g fill={GD}>
        <rect x="16" y="6" width="13" height="9" />
      </g>
      <rect x="17" y="7" width="11" height="7" fill={GL} opacity="0.85" className="bit-blink" />
      <rect x="20" y="15" width="5" height="2" fill={GD} />
      {/* desk */}
      <rect x="4" y="17" width="26" height="2" fill={G} />
      {/* operator */}
      <g className="bit-bob" fill={G}>
        <rect x="7" y="4" width="6" height="5" />
        <rect x="6" y="10" width="8" height="7" />
      </g>
      <g className="bit-bob" fill={GL}>
        <rect x="8" y="5" width="1" height="1" />
        <rect x="11" y="5" width="1" height="1" />
        <rect x="13" y="12" width="4" height="2" />
      </g>
    </Frame>
  );
}

/* 02 — the stack: stacked crates that bob in sequence */
export function SpriteStack({ size = 76 }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="2" y="20" width="28" height="2" fill={G} opacity="0.5" />
      <g className="bit-p1" fill={GL}>
        <rect x="12" y="2" width="8" height="4" />
      </g>
      <g fill={G}>
        <rect x="8" y="14" width="8" height="6" />
        <rect x="17" y="14" width="8" height="6" />
        <rect x="12" y="7" width="8" height="6" />
      </g>
      <g fill={GD}>
        <rect x="10" y="16" width="4" height="2" />
        <rect x="19" y="16" width="4" height="2" />
        <rect x="14" y="9" width="4" height="2" />
      </g>
    </Frame>
  );
}

/* 03 — community: two sprites with rising chat pixels */
export function SpriteCommunity({ size = 76 }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="2" y="20" width="28" height="2" fill={G} opacity="0.5" />
      <g fill={G}>
        <rect x="5" y="9" width="5" height="4" />
        <rect x="4" y="14" width="7" height="6" />
        <rect x="21" y="9" width="5" height="4" />
        <rect x="20" y="14" width="7" height="6" />
      </g>
      <g fill={GL}>
        <rect x="6" y="10" width="1" height="1" />
        <rect x="8" y="10" width="1" height="1" />
        <rect x="22" y="10" width="1" height="1" />
        <rect x="24" y="10" width="1" height="1" />
      </g>
      <g fill={GL}>
        <rect className="bit-p1" x="13" y="12" width="2" height="2" />
        <rect className="bit-p2" x="16" y="12" width="2" height="2" />
        <rect className="bit-p3" x="19" y="12" width="2" height="2" />
      </g>
    </Frame>
  );
}

/* 04 — monthly drop: a pixel envelope with a waving flag */
export function SpriteMail({ size = 76 }: { size?: number }) {
  return (
    <Frame size={size}>
      <g className="bit-bob">
        <rect x="7" y="8" width="18" height="12" fill={GD} />
        <rect x="8" y="9" width="16" height="10" fill={G} />
        <path d="M8 9 L16 15 L24 9 L24 11 L16 17 L8 11 Z" fill={GL} />
      </g>
      <g fill={GL} className="bit-flag">
        <rect x="24" y="3" width="1" height="6" />
        <rect x="25" y="3" width="5" height="3" />
      </g>
      <rect x="4" y="21" width="24" height="1" fill={G} opacity="0.4" />
    </Frame>
  );
}
