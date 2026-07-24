import type { ReactNode } from "react";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/ui/page-intro";
import { imprintPageContent } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/imprint");

function LegalField({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: string;
}) {
  return (
    <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.15em] text-muted">
        {label}
      </dt>
      <dd className="text-ink">
        <span className="whitespace-pre-line text-[0.98rem] leading-7">
          {value}
        </span>
        {note ? (
          <p className="mt-2 max-w-[42rem] text-sm leading-6 text-muted">
            {note}
          </p>
        ) : null}
      </dd>
    </div>
  );
}

function LegalGroup({
  id,
  eyebrow,
  title,
  children,
  delay = 0,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <section
        aria-labelledby={id}
        className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]"
      >
        <div className="research-aside">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={id}
            className="mt-4 text-[clamp(1.55rem,2.5vw,2.4rem)] font-[520] tracking-[-0.04em] text-ink"
          >
            {title}
          </h2>
        </div>
        <dl className="border-b border-line">{children}</dl>
      </section>
    </Reveal>
  );
}

export function LocalizedImprintPage({ locale }: { locale: Locale }) {
  const config = localizeContent(siteConfig, locale);
  const page = localizeContent(imprintPageContent, locale);
  const legal = config.legal;
  const businessEmail = siteConfig.businessEmail;

  return (
    <>
      <PageIntro {...page.introduction} />

      <div className="page-shell pb-[clamp(6rem,11vw,11rem)]">
        <DrawRule />

        <div className="mt-[clamp(4rem,7vw,7rem)] space-y-[clamp(4.5rem,8vw,8rem)]">
          <LegalGroup
            id="imprint-identity"
            eyebrow="01"
            title={t(locale, "Identity")}
          >
            <LegalField
              label={page.identityLabel}
              value={legal.publicIdentity}
              note={t(
                locale,
                "This is the public project identity and is not a claim about a registered legal entity.",
              )}
            />
            <LegalField
              label={t(locale, "Legal name")}
              value={legal.legalName}
            />
            <LegalField
              label={t(locale, "Legal form")}
              value={legal.legalForm}
            />
          </LegalGroup>

          <LegalGroup
            id="imprint-location"
            eyebrow="02"
            title={t(locale, "Location")}
            delay={0.04}
          >
            <LegalField
              label={page.locationLabel}
              value={legal.generalLocation}
              note={page.locationQualification}
            />
            <LegalField
              label={t(locale, "Service address")}
              value={legal.serviceAddress}
            />
          </LegalGroup>

          <LegalGroup
            id="imprint-contact"
            eyebrow="03"
            title={page.contactLabel}
            delay={0.06}
          >
            <LegalField
              label={t(locale, "Email")}
              value={
                <a
                  className="underline decoration-line-strong underline-offset-4 hover:text-accent"
                  href={`mailto:${businessEmail}`}
                >
                  {businessEmail}
                </a>
              }
            />
          </LegalGroup>

          <LegalGroup
            id="imprint-responsibility"
            eyebrow="04"
            title={t(locale, "Content responsibility")}
            delay={0.08}
          >
            <LegalField
              label={t(locale, "Responsible person")}
              value={legal.responsibleForContent}
            />
            <LegalField
              label={t(locale, "Last reviewed")}
              value={t(locale, "23 July 2026")}
            />
          </LegalGroup>
        </div>
      </div>
    </>
  );
}

export default function ImprintPage() {
  return <LocalizedImprintPage locale="en" />;
}
