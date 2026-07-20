import { ContactForm } from "@/components/contact/contact-form";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { contactPageContent } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/contact");

type ContactChannelProps = {
  label: string;
  value: string | null;
  pendingLabel: string;
  kind: "email" | "external";
};

function ContactChannel({
  label,
  value,
  pendingLabel,
  kind,
}: ContactChannelProps) {
  return (
    <div className="grid gap-3 border-t border-line py-6 sm:grid-cols-[8.5rem_1fr] sm:items-center">
      <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd>
        {value ? (
          <ActionLink
            href={kind === "email" ? `mailto:${value}` : value}
            variant="text"
            external={kind === "external"}
          >
            {kind === "email" ? value : label}
          </ActionLink>
        ) : (
          <PendingAction>{pendingLabel}</PendingAction>
        )}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  const businessEmail = siteConfig.businessEmail as string | null;

  return (
    <>
      <PageIntro {...contactPageContent.introduction} />

      <section className="page-shell pb-[clamp(6rem,11vw,11rem)]">
        <DrawRule />
        <div className="grid gap-[clamp(4.5rem,9vw,9rem)] pt-[clamp(3.5rem,6vw,6rem)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <Reveal className="liquid-surface h-fit p-7 sm:p-9">
            <p className="eyebrow">CONTACT CHANNELS</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(1.9rem,3.3vw,3.25rem)] font-[520] tracking-[-0.045em] text-ink">
              {contactPageContent.methodsHeading}
            </h2>

            <dl className="mt-10 border-b border-line">
              <ContactChannel
                label="Email"
                value={businessEmail}
                pendingLabel={contactPageContent.emailMissingLabel}
                kind="email"
              />
              <ContactChannel
                label={siteConfig.externalLinks.huggingFace.label}
                value={siteConfig.externalLinks.huggingFace.url as string | null}
                pendingLabel={siteConfig.externalLinks.huggingFace.pendingLabel}
                kind="external"
              />
              <ContactChannel
                label={siteConfig.externalLinks.github.label}
                value={siteConfig.externalLinks.github.url as string | null}
                pendingLabel={siteConfig.externalLinks.github.pendingLabel}
                kind="external"
              />
            </dl>

            <p className="mt-7 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              Based in {siteConfig.location}
            </p>

            <div className="mt-8 border-t border-line pt-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                Typical enquiries
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactPageContent.enquiryTypes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm businessEmail={businessEmail} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
