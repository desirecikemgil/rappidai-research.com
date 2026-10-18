export type SignatureKind =
  | "publications"
  | "reproducibility"
  | "data"
  | "responsible"
  | "licensing"
  | "status"
  | "faq"
  | "directory";

const stroke = { stroke: "#126BFF", strokeWidth: 1.4, fill: "none" } as const;

/** Static line motif: visually distinctive, with zero hydration cost. */
export function SectionSignature({
  kind,
  className = "",
}: {
  kind: SignatureKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`section-signature ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="#C5D2E4" strokeWidth="1" fill="none">
        {[24, 48, 72, 96].map((value) => (
          <line
            key={value}
            x1={value}
            x2={value}
            y1="16"
            y2="104"
            opacity="0.5"
          />
        ))}
      </g>
      <SignatureDrawing kind={kind} />
    </svg>
  );
}

function SignatureDrawing({ kind }: { kind: SignatureKind }) {
  switch (kind) {
    case "publications":
      return (
        <>
          {[0, 1, 2].map((index) => (
            <rect
              key={index}
              x={22 + index * 6}
              y={28 + index * 12}
              width="60"
              height="30"
              rx="3"
              opacity={1 - index * 0.28}
              {...stroke}
            />
          ))}
        </>
      );
    case "reproducibility":
      return (
        <>
          <path d="M34 44a26 26 0 1 1 6 34" strokeLinecap="round" {...stroke} />
          <path d="M40 62l-6 16 16-4" strokeLinecap="round" {...stroke} />
        </>
      );
    case "data":
      return (
        <>
          <path d="M24 40h30l12 20h30" strokeLinecap="round" {...stroke} />
          <path d="M24 80h30l12-20" strokeLinecap="round" {...stroke} />
          <circle cx="96" cy="60" r="5" {...stroke} />
        </>
      );
    case "responsible":
      return (
        <>
          <path
            d="M60 22l30 12v22c0 20-13 34-30 42-17-8-30-22-30-42V34z"
            {...stroke}
          />
          <path d="M48 62l9 9 18-18" strokeLinecap="round" {...stroke} />
        </>
      );
    case "licensing":
      return (
        <>
          <rect x="30" y="26" width="52" height="66" rx="4" {...stroke} />
          <path d="M42 46h28M42 58h28M42 70h16" {...stroke} />
          <circle cx="86" cy="82" r="12" {...stroke} />
        </>
      );
    case "status":
      return (
        <>
          <path
            d="M22 84l20-14 18 8 20-26 18 12"
            strokeLinecap="round"
            {...stroke}
          />
          {[
            [42, 70],
            [60, 78],
            [80, 52],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="3.4" fill="#126BFF" />
          ))}
        </>
      );
    case "faq":
      return (
        <>
          <path
            d="M28 34h48a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H50l-14 12V76h-8a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z"
            {...stroke}
          />
          <path d="M48 52a8 8 0 1 1 10 8v6" {...stroke} />
        </>
      );
    case "directory":
    default:
      return (
        <>
          {[0, 1, 2, 3].map((index) => (
            <rect
              key={index}
              x={26 + (index % 2) * 36}
              y={30 + Math.floor(index / 2) * 34}
              width="32"
              height="26"
              rx="3"
              {...stroke}
            />
          ))}
        </>
      );
  }
}
