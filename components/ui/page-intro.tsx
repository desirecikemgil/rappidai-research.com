import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  SectionNavigator,
  type SectionNavigatorItem,
} from "@/components/ui/section-navigator";

type Fact = { readonly label: string; readonly value: string };

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  indexLabel?: string;
  topics?: readonly SectionNavigatorItem[];
  facts?: readonly Fact[];
  actions?: ReactNode;
  aside?: ReactNode;
};

/** Light page header: location, purpose, key facts and a short page map. */
export function PageIntro({
  eyebrow,
  title,
  description,
  indexLabel,
  topics,
  facts,
  actions,
  aside,
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-shell page-intro-shell">
        <div className="page-intro-context">
          <Breadcrumbs trailing={/\d/.test(eyebrow) ? eyebrow : undefined} />
        </div>
        <div className={`page-intro-main ${aside ? "has-aside" : ""}`}>
          <div className="min-w-0">
            <h1 className="display-page">{title}</h1>
            <p className="page-intro-description mt-6">{description}</p>
            {actions ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
        {facts?.length ? (
          <dl className="facts mt-12">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {topics?.length && indexLabel ? (
          <div className="intro-index">
            <SectionNavigator label={indexLabel} items={topics} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
