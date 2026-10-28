import { ActionLink } from "@/components/ui/action-link";
import {
  securityResearch,
  securityResources,
} from "@/content/security-research";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

function SourceLinks({
  links,
}: {
  links: readonly { label: string; url: string }[];
}) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
      {links.map((link) => (
        <li key={link.url}>
          <a
            className="underline underline-offset-4 hover:text-accent"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SecurityResearch({ locale }: { locale: Locale }) {
  const copy = localizeContent(securityResearch, locale);
  return (
    <section
      id="security-research"
      aria-labelledby="security-research-heading"
      className="scroll-mt-32 pb-[var(--section-space)]"
    >
      <p className="kicker">{copy.reviewed}</p>
      <h2 id="security-research-heading" className="display-section mt-3">
        {copy.title}
      </h2>
      <p className="body-lg mt-5 max-w-[48rem]">{copy.introduction}</p>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {copy.projects.map((project) => (
          <article key={project.name} className="py-8 sm:py-10">
            <p className="text-sm text-muted">{project.status}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight">
              {project.name}
            </h3>
            <p className="mt-5 text-lg font-medium">{project.question}</p>
            <p className="body-copy mt-3">{project.evidence}</p>
            <p className="body-copy mt-4">{project.method}</p>
            <p className="body-copy mt-5 border-l-2 border-line-strong pl-4">
              {project.boundary}
            </p>
            <SourceLinks links={project.sources} />
            <ActionLink
              className="mt-6"
              href={localizePath(project.href, locale)}
            >
              {project.linkLabel}
            </ActionLink>
          </article>
        ))}
      </div>
      <aside className="mt-8 rounded-lg border border-line bg-paper p-6 sm:p-8">
        <p className="kicker">{t(locale, "Research note")}</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">
          {copy.noteTitle}
        </h3>
        <p className="body-copy mt-4">{copy.noteText}</p>
        <ActionLink className="mt-5" href={localizePath(copy.noteHref, locale)}>
          {t(locale, "Read research note")}
        </ActionLink>
      </aside>
    </section>
  );
}

export function SecurityResources({ locale }: { locale: Locale }) {
  const copy = localizeContent(securityResources, locale);
  return (
    <section
      id="security-resources"
      aria-labelledby="security-resources-heading"
      className="scroll-mt-32"
    >
      <p className="kicker">{t(locale, securityResearch.reviewed)}</p>
      <h2 id="security-resources-heading" className="display-section mt-3">
        {copy.title}
      </h2>
      <p className="body-copy mt-5">{copy.introduction}</p>
      {copy.groups.map((group) => (
        <article key={group.title} className="mt-8 border-t border-line pt-7">
          <h3 className="text-2xl font-medium tracking-tight">{group.title}</h3>
          <p className="body-copy mt-4">{group.description}</p>
          <pre
            tabIndex={0}
            aria-label={group.title}
            className="mt-5 max-w-full overflow-x-auto rounded-lg border border-line bg-paper p-5 text-sm leading-7"
          >
            <code>{group.code}</code>
          </pre>
          <SourceLinks links={group.links} />
        </article>
      ))}
    </section>
  );
}
