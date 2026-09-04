import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import {
  SectionSignature,
  type SignatureKind,
} from "@/components/graphics/section-signature";
import {
  SectionNavigator,
  type SectionNavigatorItem,
} from "@/components/ui/section-navigator";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /**
   * Optional motif for this page. The resource pages all share one layout;
   * a distinct drawing per page is what stops them reading as the same page.
   */
  signature?: SignatureKind;
  indexLabel?: string;
  topics?: readonly SectionNavigatorItem[];
};

export function PageIntro({
  eyebrow,
  title,
  description,
  signature,
  indexLabel,
  topics,
}: PageIntroProps) {
  return (
    <section className="page-intro-liquid dark-band text-white">
      <div className="page-shell page-intro-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.58fr)] lg:items-end lg:gap-20">
          <div className="min-w-0">
            <Reveal>
              <p className="page-context">{eyebrow}</p>
            </Reveal>
            <h1 className="display-page mt-7 text-[var(--color-dark-title)]">
              <RevealText lines={[title]} delay={0.06} />
            </h1>
          </div>
          <Reveal delay={0.12} className="lg:pb-1">
            <p className="page-intro-description">{description}</p>
          </Reveal>
        </div>
        {signature ? (
          <Reveal
            delay={0.14}
            variant="scale"
            className="page-intro-signature hidden sm:block"
          >
            <SectionSignature kind={signature} />
          </Reveal>
        ) : null}
        {topics?.length && indexLabel ? (
          <Reveal delay={0.18} className="mt-12 lg:mt-16">
            <SectionNavigator label={indexLabel} items={topics} onDark />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
