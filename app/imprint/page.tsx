import type { ReactNode } from "react";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/ui/page-intro";
import { imprintPageContent } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";

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
        {note ? <p className="mt-2 max-w-[42rem] text-sm leading-6 text-muted">{note}</p> : null}
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
      <section aria-labelledby={id} className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="mt-4 text-[clamp(1.55rem,2.5vw,2.4rem)] font-[520] tracking-[-0.04em] text-ink">
            {title}
          </h2>
        </div>
        <dl className="border-b border-line">{children}</dl>
      </section>
    </Reveal>
  );
}

export default function ImprintPage() {
  const legal = siteConfig.legal;
  const businessEmail = siteConfig.businessEmail;

  return (
    <>
      <PageIntro {...imprintPageContent.introduction} />

      <div className="page-shell pb-[clamp(6rem,11vw,11rem)]">
        <DrawRule />

        {legal.serviceAddress === null ? (
          <Reveal className="mt-8">
            <p className="max-w-[46rem] border-l-2 border-accent bg-pale-soft px-5 py-4 text-sm leading-6 text-ink">
              {legal.missingInformationNotice}
            </p>
          </Reveal>
        ) : null}

        <div className="mt-[clamp(4rem,7vw,7rem)] space-y-[clamp(4.5rem,8vw,8rem)]">
          <LegalGroup id="imprint-identity" eyebrow="01" title="Identity">
            <LegalField
              label={imprintPageContent.identityLabel}
              value={legal.publicIdentity}
              note="This is the public project identity and is not a claim about a registered legal entity."
            />
            <LegalField label="Legal name" value={legal.legalName} />
            <LegalField label="Legal form" value={legal.legalForm} />
          </LegalGroup>

          <LegalGroup id="imprint-location" eyebrow="02" title="Location" delay={0.04}>
            <LegalField
              label={imprintPageContent.locationLabel}
              value={legal.generalLocation}
              note={imprintPageContent.locationQualification}
            />
          </LegalGroup>

          <LegalGroup id="imprint-contact" eyebrow="03" title={imprintPageContent.contactLabel} delay={0.06}>
            <LegalField
              label="Email"
              value={
                <a className="underline decoration-line-strong underline-offset-4 hover:text-accent" href={`mailto:${businessEmail}`}>
                  {businessEmail}
                </a>
              }
            />
          </LegalGroup>

          <LegalGroup id="imprint-responsibility" eyebrow="04" title="Content responsibility" delay={0.08}>
            <LegalField
              label="Responsible person"
              value={legal.responsibleForContent}
            />
          </LegalGroup>
        </div>
      </div>
    </>
  );
}
