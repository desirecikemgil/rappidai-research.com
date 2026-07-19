type DiagramKind = "adaptation" | "inference" | "evaluation";

export function ResearchDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === "adaptation") {
    return (
      <svg viewBox="0 0 320 180" className="h-auto w-full" fill="none" aria-hidden="true">
        <g stroke="#C8D6E9" strokeWidth="1">
          {[42, 88, 134, 180, 226].map((x) => (
            <line key={x} x1={x} x2={x} y1="44" y2="136" />
          ))}
        </g>
        {[48, 76, 104, 132].map((y, index) => (
          <rect key={y} x="34" y={y} width={156 + index * 22} height="9" fill={index === 2 ? "#126BFF" : "#EAF2FF"} />
        ))}
        <path d="M245 48C278 64 278 116 245 132" stroke="#126BFF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="250" cy="90" r="4" fill="#126BFF" />
      </svg>
    );
  }

  if (kind === "inference") {
    return (
      <svg viewBox="0 0 320 180" className="h-auto w-full" fill="none" aria-hidden="true">
        <rect x="56" y="42" width="208" height="96" stroke="#BFD0E7" />
        <rect x="76" y="62" width="68" height="56" fill="#EAF2FF" stroke="#C8D6E9" />
        <rect x="176" y="62" width="68" height="56" fill="#FFFFFF" stroke="#126BFF" />
        {[0, 1, 2, 3].map((index) => (
          <line key={index} x1={92} x2={128} y1={76 + index * 10} y2={76 + index * 10} stroke="#7EA8E8" />
        ))}
        <path d="M145 90H174" stroke="#126BFF" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="210" cy="90" r="13" stroke="#126BFF" />
        <circle cx="210" cy="90" r="3" fill="#126BFF" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" fill="none" aria-hidden="true">
      <line x1="48" x2="272" y1="132" y2="132" stroke="#BFD0E7" />
      <line x1="48" x2="48" y1="42" y2="132" stroke="#BFD0E7" />
      <path d="M48 112L94 102L138 108L182 76L226 68L272 48" stroke="#126BFF" strokeWidth="1.6" />
      <path d="M48 92L94 86L138 90L182 88L226 81L272 86" stroke="#061E46" strokeWidth="1.2" strokeDasharray="4 5" />
      {[94, 138, 182, 226, 272].map((x, index) => (
        <circle key={x} cx={x} cy={[102, 108, 76, 68, 48][index]} r="3.2" fill="#126BFF" />
      ))}
    </svg>
  );
}
