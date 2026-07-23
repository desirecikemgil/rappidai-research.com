import { Reveal } from "@/components/motion/reveal";
import {
  ResourceDirectory,
  ReviewStamp,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { resourcesPageContent } from "@/content/pages";
import { resourceReview, resourceUtilityLinks } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/resources");

export default function ResourcesPage() {
  return (
    <>
      <PageIntro {...resourcesPageContent.introduction} />

      <section className="page-shell pb-[var(--section-space)]">
        <ReviewStamp
          label={resourceReview.label}
          reference={resourceReview.evidenceReference}
          explanation={resourceReview.explanation}
          url={resourceReview.evidenceUrl}
        />

        <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
          {resourceUtilityLinks.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="liquid-card min-h-[10rem] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-mono text-[0.64rem] tracking-[0.13em] text-accent uppercase">
                OPEN SOURCE
              </p>
              <h2 className="mt-5 text-xl font-medium tracking-[-0.03em] text-ink">
                {item.label}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </a>
          ))}
        </Reveal>
      </section>

      <ResourceDirectory />
    </>
  );
}
