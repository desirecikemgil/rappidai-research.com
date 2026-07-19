import { Reveal } from "@/components/motion/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="page-intro-liquid page-shell pt-[clamp(5rem,8vw,7rem)] pb-[clamp(4rem,7vw,6.5rem)]">
      <div className="liquid-intro-panel max-w-[64rem] p-6 sm:p-10 lg:p-14">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-page mt-8 text-ink">{title}</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="body-lg mt-8 max-w-[44rem]">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
