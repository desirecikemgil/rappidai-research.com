import { ContactForm } from "@/components/contact/contact-form";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { contactPageContent } from "@/content/pages";
import { responsibleUseContent } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/contact");

type ContactChannelProps = {
  label: string;
  value: string | null;
  pendingLabel: string;
  kind: "email" | "external";
  locale: Locale;
};

function ContactChannel({
  label,
  value,
  pendingLabel,
  kind,
  locale,
}: ContactChannelProps) {
  return (
    <div className="grid gap-3 border-t border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:items-center sm:py-6">
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
            {kind === "email" ? t(locale, "Email rappidAI") : label}
          </ActionLink>
        ) : (
          <PendingAction>{pendingLabel}</PendingAction>
        )}
      </dd>
    </div>
  );
}

export function LocalizedContactPage({ locale }: { locale: Locale }) {
  const businessEmail = siteConfig.businessEmail as string | null;
  const page = localizeContent(contactPageContent, locale);
  const config = localizeContent(siteConfig, locale);
  const reporting = localizeContent(responsibleUseContent.reporting, locale);

  return (
    <>
      <PageIntro {...page.introduction} />

      <section className="page-shell pb-[clamp(5rem,9vw,9rem)]">
        <DrawRule />
        <div className="grid gap-[clamp(2.5rem,6vw,6rem)] pt-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <Reveal className="liquid-surface h-fit p-6 sm:p-9">
            <p className="eyebrow">{t(locale, "CONTACT CHANNELS")}</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(1.9rem,3.3vw,3.25rem)] font-[520] tracking-[-0.045em] text-ink">
              {page.methodsHeading}
            </h2>

            <dl className="mt-8 border-b border-line sm:mt-10">
              <ContactChannel
                label={t(locale, "Email")}
                value={businessEmail}
                pendingLabel={page.emailMissingLabel}
                kind="email"
                locale={locale}
              />
              <ContactChannel
                label={config.externalLinks.huggingFace.label}
                value={
                  siteConfig.externalLinks.huggingFace.url as string | null
                }
                pendingLabel={config.externalLinks.huggingFace.pendingLabel}
                kind="external"
                locale={locale}
              />
              <ContactChannel
                label={config.externalLinks.github.label}
                value={siteConfig.externalLinks.github.url as string | null}
                pendingLabel={config.externalLinks.github.pendingLabel}
                kind="external"
                locale={locale}
              />
            </dl>

            <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted sm:mt-7">
              {t(locale, "Based in")} {config.location}
            </p>

            <div className="mt-6 border-t border-line pt-6 sm:mt-8 sm:pt-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {t(locale, "Typical enquiries")}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {page.enquiryTypes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm businessEmail={businessEmail} locale={locale} />
          </Reveal>
        </div>

        <Reveal className="mt-[clamp(4rem,8vw,7rem)]">
          <p className="eyebrow">{t(locale, "REPORTING CHANNELS")}</p>
          <h2 className="display-section mt-7 text-ink">
            {t(
              locale,
              "Public feedback, private security and sensitive concerns.",
            )}
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {reporting.map((item) => (
              <div key={item.label} className="liquid-card p-7">
                <h3 className="text-xl font-medium tracking-[-0.03em] text-ink">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.detail}
                </p>
                <ActionLink
                  href={item.url}
                  external={!item.url.startsWith("mailto:")}
                  variant="text"
                  className="mt-5"
                >
                  {t(locale, "Open channel")}
                </ActionLink>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default function ContactPage() {
  return <LocalizedContactPage locale="en" />;
}
