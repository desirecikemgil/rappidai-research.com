import { Reveal } from "@/components/motion/reveal";
import { SourceLinks } from "@/components/resources/resource-ui";
import type { DocumentationSection } from "@/content/documentation";
import { localizeContent, type Locale } from "@/lib/i18n";

export function DocumentationSections({
  content,
  locale,
}: {
  content: {
    title: string;
    introduction: string;
    sections: readonly DocumentationSection[];
  };
  locale: Locale;
}) {
  const localized = localizeContent(content, locale);
  return (
    <section className="mb-12">
      <Reveal>
        <h2 className="display-section text-ink">{localized.title}</h2>
        <p className="body-copy mt-5 max-w-[62rem]">{localized.introduction}</p>
      </Reveal>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {localized.sections.map((section) => (
          <Reveal
            key={section.title}
            className="grid gap-6 py-8 xl:grid-cols-[0.65fr_1.35fr]"
          >
            <h3 className="text-2xl font-medium tracking-[-0.035em] text-ink">
              {section.title}
            </h3>
            <div className="min-w-0 space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-copy">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-ink-soft">
                  {section.items.map((item) => (
                    <li key={item} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ol>
              )}
              <SourceLinks sources={section.sources} locale={locale} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
