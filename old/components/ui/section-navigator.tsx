import Link from "next/link";

export type SectionNavigatorItem = {
  href: string;
  label: string;
  description: string;
};

type SectionNavigatorProps = {
  label: string;
  items: readonly SectionNavigatorItem[];
  onDark?: boolean;
};

/**
 * A compact map of the page or site area. The descriptions do the orientation
 * work, so the links do not need decorative numbering or category badges.
 */
export function SectionNavigator({
  label,
  items,
  onDark = false,
}: SectionNavigatorProps) {
  return (
    <nav
      aria-label={label}
      className={`section-navigator ${onDark ? "section-navigator-dark" : ""}`}
    >
      <p className="section-navigator-label">{label}</p>
      <ul className="section-navigator-list">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href} className="section-navigator-link">
              <span className="section-navigator-title">{item.label}</span>
              <span className="section-navigator-description">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
