type DiagramKind = "pipeline" | "inference" | "evaluation";

const INK = "#0B2D60";
const ACCENT = "#126BFF";
const LINE = "#AFC4E0";

/** Static evidence diagram with no hydration or per-frame drawing work. */
export function ResearchDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <svg
      viewBox="0 0 340 200"
      className="research-diagram h-auto w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`rd-fill-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="1" stopColor={INK} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <g stroke={LINE} strokeWidth="1.2">
        {[
          [14, 14, 1, 1],
          [326, 14, -1, 1],
          [14, 186, 1, -1],
          [326, 186, -1, -1],
        ].map(([x, y, dx, dy]) => (
          <g key={`${x}-${y}`}>
            <line x1={x} y1={y} x2={x + dx * 12} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + dy * 12} />
          </g>
        ))}
      </g>

      {kind === "pipeline" ? (
        <Pipeline kind={kind} />
      ) : kind === "inference" ? (
        <Inference kind={kind} />
      ) : (
        <Evaluation />
      )}
    </svg>
  );
}

function Pipeline({ kind }: { kind: DiagramKind }) {
  return (
    <>
      {[0, 1, 2, 3].map((index) => {
        const y = 46 + index * 30;
        const width = 104 + index * 30;
        return (
          <g key={index}>
            <rect
              x="38"
              y={y}
              width={width}
              height="14"
              rx="3"
              fill={`url(#rd-fill-${kind})`}
              fillOpacity={0.18 + index * 0.24}
            />
            <line
              x1={38 + width + 6}
              x2="242"
              y1={y + 7}
              y2={y + 7}
              stroke={LINE}
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </g>
        );
      })}
      <path
        d="M250 44C284 66 284 134 250 156"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="258" cy="100" r="6" fill={ACCENT} />
      <line
        x1="266"
        x2="302"
        y1="100"
        y2="100"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function Inference({ kind }: { kind: DiagramKind }) {
  return (
    <>
      <rect
        x="30"
        y="38"
        width="280"
        height="124"
        rx="6"
        stroke={LINE}
        strokeWidth="1.2"
      />
      <rect
        x="52"
        y="60"
        width="86"
        height="80"
        rx="4"
        fill={`url(#rd-fill-${kind})`}
        fillOpacity="0.12"
        stroke={LINE}
        strokeWidth="1.2"
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <line
          key={index}
          x1="66"
          x2="124"
          y1={74 + index * 13}
          y2={74 + index * 13}
          stroke={ACCENT}
          strokeOpacity={0.75 - index * 0.1}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M144 100h48"
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <rect
        x="198"
        y="60"
        width="86"
        height="80"
        rx="4"
        fill="#FFFFFF"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <rect
          key={index}
          x={212 + (index % 4) * 17}
          y={74 + Math.floor(index / 4) * 17}
          width="12"
          height="12"
          rx="2"
          fill={ACCENT}
          fillOpacity={index % 3 === 0 ? 0.75 : 0.22}
        />
      ))}
    </>
  );
}

function Evaluation() {
  const points: Array<[number, number]> = [
    [40, 150],
    [90, 138],
    [140, 142],
    [190, 106],
    [240, 92],
    [296, 62],
  ];

  return (
    <>
      <g stroke={LINE} strokeWidth="1.2">
        <line x1="40" x2="304" y1="164" y2="164" />
        <line x1="40" x2="40" y1="40" y2="164" />
      </g>
      <g stroke={LINE} strokeWidth="1" strokeOpacity="0.45">
        {[70, 100, 130].map((y) => (
          <line key={y} x1="40" x2="304" y1={y} y2={y} strokeDasharray="2 5" />
        ))}
      </g>
      <path
        d={`M${points.map(([x, y]) => `${x} ${y}`).join("L")}`}
        stroke={ACCENT}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 122L90 118L140 121L190 119L240 114L296 117"
        stroke={INK}
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeDasharray="5 5"
      />
      {points.slice(1).map(([x, y]) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r="4"
          fill="#FFFFFF"
          stroke={ACCENT}
          strokeWidth="2"
        />
      ))}
    </>
  );
}
