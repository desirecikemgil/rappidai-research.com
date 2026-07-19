import { Reveal } from "@/components/motion/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="page-intro-liquid page-shell pt-[clamp(8.5rem,15vw,13rem)] pb-[clamp(5rem,9vw,8rem)]">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="display-page mt-8 text-ink">{title}</h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="body-lg mt-8 max-w-[44rem]">{description}</p>
      </Reveal>
    </section>
  );
}
