import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import {
  SectionSignature,
  type SignatureKind,
} from "@/components/graphics/section-signature";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /**
   * Optional motif for this page. The resource pages all share one layout;
   * a distinct drawing per page is what stops them reading as the same page.
   */
  signature?: SignatureKind;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  signature,
}: PageIntroProps) {
  return (
    <section className="page-intro-liquid page-shell pt-[clamp(4.25rem,7vw,6.5rem)] pb-[clamp(2.75rem,5.5vw,5.5rem)]">
      <div className="liquid-intro-panel max-w-[68rem] p-6 sm:p-10 lg:p-14">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-12">
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
            <h1 className="display-page mt-6 text-ink sm:mt-8">
              <RevealText lines={[title]} delay={0.06} />
            </h1>
          </div>
          {signature ? (
            <Reveal
              delay={0.14}
              variant="scale"
              className="hidden sm:block sm:justify-self-end"
            >
              <SectionSignature kind={signature} />
            </Reveal>
          ) : null}
        </div>
        <Reveal delay={0.12}>
          <p className="lede mt-6 sm:mt-9">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
