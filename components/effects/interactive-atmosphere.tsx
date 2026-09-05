export function InteractiveAtmosphere() {
  return (
    <div className="interactive-atmosphere" aria-hidden="true">
      <div className="atmosphere-wash atmosphere-wash-a" />
      <div className="atmosphere-wash atmosphere-wash-b" />
      <svg
        className="atmosphere-flow"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          className="flow-line flow-line-a"
          d="M-80 690C250 430 460 760 745 454C994 188 1185 392 1510 122"
        />
        <path
          className="flow-line flow-line-b"
          d="M-120 790C258 532 485 850 794 542C1040 296 1240 468 1520 236"
        />
        <path
          className="flow-line flow-line-c"
          d="M175 -70C350 200 215 376 485 525C738 665 894 470 1125 672C1265 795 1380 770 1510 706"
        />
        <circle className="flow-node flow-node-a" cx="746" cy="454" r="3" />
        <circle className="flow-node flow-node-b" cx="1185" cy="392" r="2.5" />
        <circle className="flow-node flow-node-c" cx="485" cy="525" r="2.5" />
      </svg>
      <div className="atmosphere-grain" />
    </div>
  );
}
