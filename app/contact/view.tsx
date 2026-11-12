import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
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
      <dt className="ui-label">{label}</dt>
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
      <PageIntro
        {...page.introduction}
        facts={[
          ...(businessEmail
            ? [{ label: t(locale, "Email"), value: businessEmail }]
            : []),
          { label: t(locale, "Based in"), value: config.location },
          {
            label: t(locale, "Typical enquiries"),
            value: page.enquiryTypes.slice(0, 2).join(" · "),
          },
        ]}
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#contact-options",
            label: t(locale, "Contact options"),
            description: t(
              locale,
              "Choose email, Hugging Face or GitHub for the right context.",
            ),
          },
          {
            href: "#prepare-email",
            label: t(locale, "Prepare an email"),
            description: t(
              locale,
              "Create a local email draft without sending data through the website.",
            ),
          },
          {
            href: "#reporting-channels",
            label: t(locale, "Reporting channels"),
            description: t(
              locale,
              "Route public feedback, security reports and sensitive concerns correctly.",
            ),
          },
        ]}
      />

      <section id="contact-options" className="page-shell section scroll-mt-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <Reveal className="liquid-surface h-fit p-6 sm:p-9">
            <p className="eyebrow">{t(locale, "Contact channels")}</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(1.9rem,3.3vw,3.25rem)] leading-[1.05] font-[520] tracking-[-0.045em] text-ink">
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

            <p className="ui-label mt-6 sm:mt-7">
              {t(locale, "Based in")} {config.location}
            </p>

            <div className="mt-6 border-t border-line pt-6 sm:mt-8 sm:pt-7">
              <p className="ui-label">{t(locale, "Typical enquiries")}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {page.enquiryTypes.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal id="prepare-email" delay={0.08} className="scroll-mt-32">
            <ContactForm businessEmail={businessEmail} locale={locale} />
          </Reveal>
        </div>

        <Reveal
          id="reporting-channels"
          className="mt-[clamp(4rem,8vw,7rem)] scroll-mt-32"
        >
          <p className="eyebrow">{t(locale, "Reporting channels")}</p>
          <h2 className="display-section mt-4 text-ink">
            {t(
              locale,
              "Public feedback, private security reports and sensitive concerns",
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
