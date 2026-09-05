const nodes = [
  [86, 138],
  [236, 84],
  [340, 212],
  [474, 116],
  [590, 260],
  [704, 142],
  [820, 326],
  [954, 174],
  [1088, 286],
  [1228, 126],
  [1362, 240],
  [180, 420],
  [350, 520],
  [530, 408],
  [702, 570],
  [886, 468],
  [1058, 590],
  [1238, 452],
  [1380, 610],
] as const;

const links = [
  "M86 138C150 106 190 94 236 84",
  "M236 84C278 120 304 170 340 212",
  "M340 212C390 164 428 132 474 116",
  "M474 116C524 154 552 210 590 260",
  "M590 260C628 212 660 172 704 142",
  "M704 142C752 188 782 270 820 326",
  "M820 326C862 272 906 206 954 174",
  "M954 174C1008 196 1048 250 1088 286",
  "M1088 286C1136 224 1178 164 1228 126",
  "M1228 126C1280 154 1324 204 1362 240",
  "M86 138C102 252 130 352 180 420",
  "M180 420C236 454 286 492 350 520",
  "M340 212C386 306 448 368 530 408",
  "M530 408C582 460 636 526 702 570",
  "M590 260C674 314 756 398 886 468",
  "M886 468C942 506 994 554 1058 590",
  "M820 326C940 342 1104 378 1238 452",
  "M1238 452C1290 500 1338 552 1380 610",
  "M350 520C480 492 584 500 702 570",
  "M702 570C824 540 930 548 1058 590",
  "M1058 590C1172 566 1274 574 1380 610",
] as const;

/**
 * SVG/CSS-only by design. Redrawing a dense canvas grid on every pointer
 * frame made ordinary cursor and scroll input compete with painting.
 */
export function HeroNetworkBackdrop() {
  return (
    <div className="hero-network" aria-hidden="true">
      <div className="hero-network-grid" />
      <svg
        className="hero-network-map"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="hero-network-links">
          {links.map((path, index) => (
            <path
              key={path}
              d={path}
              className={`hero-network-link hero-network-link-${(index % 3) + 1}`}
            />
          ))}
        </g>
        <g className="hero-network-nodes">
          {nodes.map(([cx, cy], index) => (
            <g
              key={`${cx}-${cy}`}
              className={`hero-network-node hero-network-node-${(index % 4) + 1}`}
              transform={`translate(${cx} ${cy})`}
            >
              <circle className="hero-network-node-halo" r="12" />
              <circle className="hero-network-node-core" r="2.6" />
            </g>
          ))}
        </g>
      </svg>
      <div className="hero-network-vignette" />
    </div>
  );
}
