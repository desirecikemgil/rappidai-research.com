import { Reveal } from "@/components/motion/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="page-intro-liquid page-shell pt-[clamp(4.25rem,7vw,6.5rem)] pb-[clamp(2.75rem,5.5vw,5.5rem)]">
      <div className="liquid-intro-panel max-w-[64rem] p-6 sm:p-10 lg:p-14">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-page mt-6 text-ink sm:mt-8">{title}</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="body-lg mt-6 max-w-[44rem] sm:mt-8">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
