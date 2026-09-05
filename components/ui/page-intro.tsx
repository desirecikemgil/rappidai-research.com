import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import type { SignatureKind } from "@/components/graphics/section-signature";
import { SignalArt, type SignalKind } from "@/components/graphics/signal-art";
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
  artwork?: SignalKind;
  indexLabel?: string;
  topics?: readonly SectionNavigatorItem[];
};

export function PageIntro({
  eyebrow,
  title,
  description,
  signature,
  artwork,
  indexLabel,
  topics,
}: PageIntroProps) {
  return (
    <section className="page-intro-liquid dark-band text-white">
      <SignalArt
        kind={artwork ?? (signature === "directory" ? "replay" : "quantum")}
        className="page-intro-art"
      />
      <div className="page-shell page-intro-shell">
        <div className="page-intro-main">
          <div className="min-w-0">
            <Reveal>
              <p className="page-intro-context">
                rappidAI <span aria-hidden="true" />
                {eyebrow}
              </p>
            </Reveal>
            <h1 className="display-page mt-7 text-[var(--color-dark-title)]">
              <RevealText lines={[title]} delay={0.06} />
            </h1>
          </div>
          <Reveal delay={0.12} className="lg:pb-1">
            <p className="page-intro-description">{description}</p>
          </Reveal>
        </div>
        {topics?.length && indexLabel ? (
          <Reveal delay={0.18} className="intro-index">
            <SectionNavigator label={indexLabel} items={topics} onDark />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
