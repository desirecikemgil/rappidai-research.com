import Link from "next/link";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { footerNavigation, siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="liquid-section border-t border-line bg-white/35 backdrop-blur-xl">
      <div className="page-shell section-space-sm">
        <div className="grid gap-14 lg:grid-cols-[1.45fr_0.65fr_0.65fr_0.75fr]">
          <div>
            <BrandLockup priority />
            <p className="body-copy mt-7 max-w-md">{siteConfig.description}</p>
            <p className="mt-6 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              Based in {siteConfig.location}
            </p>
          </div>

          <FooterColumn title="Explore">
            {footerNavigation.explore.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Research profiles">
            {Object.values(siteConfig.externalLinks).map((item) =>
              item.url ? (
                <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
                  {item.label}
                </a>
              ) : (
                <span key={item.label} className="text-muted" title="External link not configured">
                  {item.pendingLabel}
                </span>
              ),
            )}
          </FooterColumn>

          <FooterColumn title="Legal">
            {footerNavigation.legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-6 text-[0.78rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}</p>
          <p>Independent AI research · Berlin, Germany</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[0.68rem] font-medium tracking-[0.14em] text-muted uppercase">{title}</h2>
      <div className="mt-5 flex flex-col gap-3 text-sm text-ink">{children}</div>
    </div>
  );
}
