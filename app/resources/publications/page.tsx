import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { publications } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/resources/publications");

export default function PublicationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="PUBLICATIONS"
        title="Research notes with visible evidence boundaries."
        description="Project publications summarize public artifacts, negative results and unresolved questions. They are not presented as peer-reviewed academic papers."
      />

      <section className="page-shell pb-[var(--section-space)]">
        <div className="space-y-4">
          {publications.map((publication) => (
            <Reveal key={publication.slug}>
              <Link
                href={publication.href}
                className="liquid-card group grid gap-8 p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-10 lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div>
                  <p className="eyebrow">{publication.kindLabel}</p>
                  <p className="mt-5 font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase">
                    23 July 2026 · {publication.peerReviewStatus} · No DOI
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <EvidenceBadge status="Published" />
                  </div>
                  <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.05em] text-ink">
                    {publication.title}
                  </h2>
                  <p className="body-lg mt-6">{publication.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                    Read research note
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ResourceDirectory current="publications" />
    </>
  );
}
