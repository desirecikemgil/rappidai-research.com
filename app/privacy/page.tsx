import { DrawRule, Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/ui/page-intro";
import { privacyPageContent } from "@/content/pages";
import { siteConfig } from "@/content/site";
import type { PrivacyConfiguration } from "@/content/types";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/privacy");

type PrivacySectionRecord = (typeof privacyPageContent.sections)[number];

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid gap-2 border-t border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="font-mono text-[0.69rem] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className={`whitespace-pre-line text-[0.96rem] leading-7 ${value ? "text-ink" : "text-muted"}`}>
        {value ?? "Not supplied."}
      </dd>
    </div>
  );
}

function SectionBody({
  section,
  privacy,
  businessEmail,
}: {
  section: PrivacySectionRecord;
  privacy: PrivacyConfiguration;
  businessEmail: string | null;
}) {
  if (section.id === "controller") {
    return (
      <>
        <p>{section.text}</p>
        <dl className="mt-6 border-b border-line">
          <Detail label="Controller" value={privacy.controllerName} />
          <Detail label="Address" value={privacy.controllerAddress} />
          <Detail label="Email" value={privacy.controllerEmail} />
        </dl>
      </>
    );
  }

  if (section.id === "hosting") {
    return privacy.hostingProvider ? (
      <>
        <p>The configured hosting provider is {privacy.hostingProvider}.</p>
        <p>
          Server-log categories, processing purpose, legal basis and retention
          period must be documented for the final deployment before publication.
        </p>
      </>
    ) : (
      <p>{section.text}</p>
    );
  }

  if (section.id === "contact") {
    return (
      <>
        <p>{section.text}</p>
        <p>
          {businessEmail
            ? `The configured recipient is ${businessEmail}. The visitor chooses whether to send the prepared email in their own email application.`
            : "No recipient is currently configured, so the website does not transmit or claim to send an enquiry."}
        </p>
      </>
    );
  }

  if (section.id === "analytics") {
    if (!privacy.analyticsEnabled && !privacy.marketingCookiesEnabled) {
      return <p>{section.text}</p>;
    }

    return (
      <p>
        The site configuration indicates that analytics or marketing cookies are
        enabled. Providers, purposes, legal bases, retention periods and any
        required consent controls must be documented before publication.
      </p>
    );
  }

  return <p>{section.text}</p>;
}

function PrivacySection({
  section,
  index,
  privacy,
  businessEmail,
}: {
  section: PrivacySectionRecord;
  index: number;
  privacy: PrivacyConfiguration;
  businessEmail: string | null;
}) {
  return (
    <Reveal delay={Math.min(index * 0.035, 0.12)}>
      <section aria-labelledby={`privacy-${section.id}`} className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
          <h2 id={`privacy-${section.id}`} className="mt-4 max-w-[16ch] text-[clamp(1.55rem,2.5vw,2.4rem)] font-[520] tracking-[-0.04em] text-ink">
            {section.title}
          </h2>
        </div>
        <div className="prose-legal border-t border-line pt-1">
          <SectionBody
            section={section}
            privacy={privacy}
            businessEmail={businessEmail}
          />
        </div>
      </section>
    </Reveal>
  );
}

function configurationIsIncomplete(privacy: PrivacyConfiguration) {
  return [
    privacy.controllerName,
    privacy.controllerAddress,
    privacy.controllerEmail,
    privacy.hostingProvider,
  ].some((value) => value === null);
}

export default function PrivacyPage() {
  const privacy: PrivacyConfiguration = siteConfig.privacy;
  const businessEmail = siteConfig.businessEmail as string | null;

  return (
    <>
      <PageIntro {...privacyPageContent.introduction} />

      <div className="page-shell pb-[clamp(6rem,11vw,11rem)]">
        <DrawRule />

        {configurationIsIncomplete(privacy) ? (
          <Reveal className="mt-8">
            <p className="max-w-[48rem] border-l-2 border-accent bg-pale-soft px-5 py-4 text-sm leading-6 text-ink">
              Controller and hosting information is incomplete and must be
              verified before publication.
            </p>
          </Reveal>
        ) : null}

        <div className="mt-[clamp(4rem,7vw,7rem)] space-y-[clamp(4.5rem,8vw,8rem)]">
          {privacyPageContent.sections.map((section, index) => (
            <PrivacySection
              key={section.id}
              section={section}
              index={index}
              privacy={privacy}
              businessEmail={businessEmail}
            />
          ))}
        </div>
      </div>
    </>
  );
}
