import { Reveal } from "@/components/motion/reveal";
import { ResourceDirectory } from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { faqEntries } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/resources/faq");

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Straight answers about an early-stage research project."
        description="The most common questions about model type, local inference, Echelon, evidence status, privacy, licensing and reporting."
      />

      <section className="page-shell pb-[var(--section-space)]">
        <div className="space-y-4">
          {faqEntries.map((entry, index) => (
            <Reveal
              key={entry.question}
              delay={Math.min(index * 0.025, 0.12)}
              className="liquid-row grid gap-7 rounded-[1.3rem] border-y border-line py-8 lg:grid-cols-[0.7fr_1.3fr]"
            >
              <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                <span className="technical-number text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-medium tracking-[-0.03em] text-ink">
                  {entry.question}
                </h2>
              </div>
              <p className="body-copy">{entry.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ResourceDirectory current="faq" />
    </>
  );
}
