"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type KeyboardEvent } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import {
  modelComparisonContent,
  type ComparisonEvidenceTone,
  type ComparisonViewId,
} from "@/content/comparisons";
import { localizeContent, t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;
const viewIds: ComparisonViewId[] = ["architecture", "tokenizer", "pipeline"];

export function ModelComparisonSuite({ locale = "en" }: { locale?: Locale }) {
  const content = useMemo(
    () => localizeContent(modelComparisonContent, locale),
    [locale],
  );
  const tier = useMotionTier();
  const [activeView, setActiveView] =
    useState<ComparisonViewId>("architecture");
  const view = content[activeView];

  function selectAdjacentTab(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? viewIds.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + viewIds.length) %
            viewIds.length;
    const nextView = viewIds[nextIndex];
    setActiveView(nextView);
    document.getElementById(`comparison-tab-${nextView}`)?.focus();
  }

  return (
    <section
      className="comparison-suite liquid-section border-y border-line bg-pale-soft/35"
      aria-labelledby="model-system-comparison-heading"
    >
      <div className="page-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="eyebrow">{content.introduction.eyebrow}</p>
            <h2
              id="model-system-comparison-heading"
              className="display-section mt-7 max-w-[13ch] text-ink"
            >
              {content.introduction.title}
            </h2>
          </div>
          <p className="body-lg max-w-[47rem]">
            {content.introduction.description}
          </p>
        </div>

        <div className="comparison-console liquid-surface mt-12 overflow-hidden">
          <div
            className="comparison-tabs"
            role="tablist"
            aria-label={t(locale, "Select comparison view")}
          >
            {content.tabs.map((tab, index) => {
              const selected = tab.id === activeView;
              return (
                <button
                  key={tab.id}
                  id={`comparison-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`comparison-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveView(tab.id)}
                  onKeyDown={(event) => selectAdjacentTab(event, index)}
                  className="comparison-tab"
                >
                  <span>{tab.label}</span>
                  {selected ? (
                    <motion.span
                      layoutId="comparison-tab-indicator"
                      className="comparison-tab-indicator"
                      transition={
                        tier === "off"
                          ? { duration: 0 }
                          : { duration: 0.42, ease: glide }
                      }
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeView}
              id={`comparison-panel-${activeView}`}
              role="tabpanel"
              aria-labelledby={`comparison-tab-${activeView}`}
              className="comparison-panel"
              initial={tier === "off" ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={tier === "off" ? undefined : { opacity: 0, y: -8 }}
              transition={
                tier === "off"
                  ? { duration: 0 }
                  : {
                      duration: tier === "lite" ? 0.28 : 0.44,
                      ease: glide,
                    }
              }
            >
              <div className="max-w-[55rem]">
                <p className="eyebrow">{view.eyebrow}</p>
                <h3 className="mt-5 text-[clamp(2rem,4.5vw,4.6rem)] leading-[0.98] font-[510] tracking-[-0.055em] text-ink">
                  {view.title}
                </h3>
                <p className="body-copy mt-6 max-w-[47rem]">
                  {view.description}
                </p>
              </div>

              {activeView === "architecture" ? (
                <ArchitectureComparison
                  data={content.architecture}
                  locale={locale}
                />
              ) : activeView === "tokenizer" ? (
                <TokenizerComparison data={content.tokenizer} locale={locale} />
              ) : (
                <PipelineComparison data={content.pipeline} locale={locale} />
              )}

              <EvidenceFooter
                boundary={view.boundary}
                sources={view.sources}
                locale={locale}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type LocalizedComparison = ReturnType<
  typeof localizeContent<typeof modelComparisonContent>
>;

function ArchitectureComparison({
  data,
  locale,
}: {
  data: LocalizedComparison["architecture"];
  locale: Locale;
}) {
  const tier = useMotionTier();
  const maxParameters = Math.max(
    ...data.models.map((model) => model.parameters),
  );

  return (
    <div className="comparison-model-grid mt-10">
      {data.models.map((model, modelIndex) => (
        <motion.article
          key={model.id}
          tabIndex={0}
          className={`comparison-model-card is-${model.tone}`}
          initial={tier === "off" ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: tier === "off" ? 0 : 0.48,
            delay: tier === "off" ? 0 : modelIndex * 0.07,
            ease: glide,
          }}
        >
          <ComparisonCardHeader
            name={model.name}
            label={model.evidenceLabel}
            tone={model.tone}
          />

          <dl className="mt-7 grid grid-cols-2 gap-5">
            <Metric
              label={t(locale, "Parameters")}
              value={model.parameterLabel}
            />
            <Metric
              label={t(locale, "Context")}
              value={`${model.contextTokens.toLocaleString(locale)} ${t(locale, "tokens")}`}
            />
          </dl>

          <div className="comparison-parameter-track mt-7" aria-hidden="true">
            <motion.span
              className={
                model.tone === "configured" ? "is-configured" : "is-published"
              }
              style={{
                width: `${Math.max(8, (model.parameters / maxParameters) * 100)}%`,
              }}
              initial={tier === "off" ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: tier === "off" ? 0 : 0.9,
                delay: tier === "off" ? 0 : 0.15 + modelIndex * 0.09,
                ease: glide,
              }}
            />
          </div>

          <div className="comparison-stack-wrap mt-8">
            <p className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
              {model.layers
                ? `${model.layers} ${t(locale, "layers")}`
                : t(locale, "Detailed dimensions")}
            </p>
            <ArchitectureMiniStack
              layers={model.layers}
              configured={model.tone === "configured"}
              index={modelIndex}
            />
          </div>

          {model.layers ? (
            <dl className="mt-6 grid grid-cols-3 gap-2">
              <CompactMetric
                label={t(locale, "hidden size")}
                value={model.hiddenSize?.toLocaleString(locale) ?? "—"}
              />
              <CompactMetric
                label={t(locale, "attention heads")}
                value={model.attentionHeads?.toLocaleString(locale) ?? "—"}
              />
              <CompactMetric
                label={t(locale, "KV heads")}
                value={model.kvHeads?.toLocaleString(locale) ?? "—"}
              />
            </dl>
          ) : (
            <p className="mt-6 font-mono text-[0.64rem] leading-5 tracking-[0.08em] text-muted uppercase">
              {t(locale, "Not published in pinned evidence")}
            </p>
          )}

          <p className="mt-6 border-t border-line pt-5 text-[0.8rem] leading-5 text-muted">
            {model.detail}
          </p>
        </motion.article>
      ))}
    </div>
  );
}

function ArchitectureMiniStack({
  layers,
  configured,
  index,
}: {
  layers: number | null;
  configured: boolean;
  index: number;
}) {
  const tier = useMotionTier();
  const visibleLayers = layers ?? 8;

  return (
    <div
      className={`comparison-mini-stack mt-4 ${
        layers ? "" : "is-unknown"
      } ${configured ? "is-configured" : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: visibleLayers }, (_, layerIndex) => (
        <motion.span
          key={layerIndex}
          initial={tier === "off" ? false : { opacity: 0, scaleX: 0.22 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: tier === "off" ? 0 : 0.32,
            delay:
              tier === "off" ? 0 : 0.18 + index * 0.06 + layerIndex * 0.014,
            ease: glide,
          }}
        />
      ))}
    </div>
  );
}

function TokenizerComparison({
  data,
  locale,
}: {
  data: LocalizedComparison["tokenizer"];
  locale: Locale;
}) {
  const tier = useMotionTier();
  const maxVocabulary = Math.max(
    ...data.models.map((model) => model.vocabulary),
  );

  return (
    <>
      <div className="comparison-model-grid mt-10">
        {data.models.map((model, modelIndex) => (
          <motion.article
            key={model.id}
            tabIndex={0}
            className={`comparison-model-card is-${model.tone}`}
            initial={tier === "off" ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: tier === "off" ? 0 : 0.48,
              delay: tier === "off" ? 0 : modelIndex * 0.07,
              ease: glide,
            }}
          >
            <ComparisonCardHeader
              name={model.name}
              label={model.evidenceLabel}
              tone={model.tone}
            />
            <p className="mt-7 text-xl font-[500] tracking-[-0.035em] text-ink">
              {model.tokenizerLabel}
            </p>
            <p className="mt-3 text-[0.8rem] leading-5 text-muted">
              {model.relationship}
            </p>

            <div className="mt-8 flex items-end justify-between gap-4">
              <p className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
                {t(locale, "Vocabulary")}
              </p>
              <p className="technical-number text-2xl text-accent">
                {model.vocabulary.toLocaleString(locale)}
              </p>
            </div>
            <div className="comparison-vocab-track mt-3" aria-hidden="true">
              <motion.span
                className={
                  model.tone === "published" ? "is-validated" : "is-published"
                }
                style={{
                  width: `${(model.vocabulary / maxVocabulary) * 100}%`,
                }}
                initial={tier === "off" ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: tier === "off" ? 0 : 0.86,
                  delay: tier === "off" ? 0 : 0.16 + modelIndex * 0.08,
                  ease: glide,
                }}
              />
            </div>

            <div className="comparison-token-stream mt-8" aria-hidden="true">
              {["de", "ä", "{ }", "</>"].map((token, tokenIndex) => (
                <motion.span
                  key={token}
                  initial={tier === "off" ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: tier === "off" ? 0 : 0.35,
                    delay:
                      tier === "off"
                        ? 0
                        : 0.28 + modelIndex * 0.06 + tokenIndex * 0.045,
                  }}
                >
                  {token}
                </motion.span>
              ))}
            </div>

            <p className="mt-7 border-t border-line pt-5 text-[0.8rem] leading-5 text-muted">
              {model.validation}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="comparison-validation-strip mt-4">
        <p className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
          {t(locale, "Validation scope")}
        </p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {data.validationScope.map((item, index) => (
            <motion.li
              key={item}
              className="liquid-pill border border-line bg-white/35 px-3 py-2 text-[0.72rem] text-ink-soft"
              initial={tier === "off" ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: tier === "off" ? 0 : 0.34,
                delay: tier === "off" ? 0 : 0.22 + index * 0.045,
              }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PipelineComparison({
  data,
  locale,
}: {
  data: LocalizedComparison["pipeline"];
  locale: Locale;
}) {
  const tier = useMotionTier();
  const maxTokens = Math.max(
    ...data.models.map((model) => model.tokenScopeMillions),
  );

  return (
    <>
      <div className="mt-9 flex items-center justify-between gap-4 border-y border-line py-4">
        <p className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
          {data.scaleLabel}
        </p>
        <p className="font-mono text-[0.6rem] tracking-[0.1em] text-accent uppercase">
          {t(locale, "Reference scale")}
        </p>
      </div>

      <div className="comparison-model-grid mt-4">
        {data.models.map((model, modelIndex) => {
          const logWidth =
            (Math.log10(model.tokenScopeMillions) / Math.log10(maxTokens)) *
            100;

          return (
            <motion.article
              key={model.id}
              tabIndex={0}
              className={`comparison-model-card is-${model.tone}`}
              initial={tier === "off" ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: tier === "off" ? 0 : 0.48,
                delay: tier === "off" ? 0 : modelIndex * 0.07,
                ease: glide,
              }}
            >
              <ComparisonCardHeader
                name={model.name}
                label={model.evidenceLabel}
                tone={model.tone}
              />

              <div className="mt-8 flex items-end justify-between gap-4">
                <p className="technical-number text-[clamp(2.7rem,5vw,4.2rem)] leading-none tracking-[-0.07em] text-accent">
                  {model.multiplier}
                </p>
                <p className="max-w-[11rem] text-right text-[0.76rem] leading-5 text-muted">
                  {model.scopeLabel}
                </p>
              </div>

              <div className="comparison-corpus-track mt-7" aria-hidden="true">
                <motion.span
                  className={
                    model.tone === "configured"
                      ? "is-configured"
                      : "is-published"
                  }
                  style={{ width: `${Math.max(12, logWidth)}%` }}
                  initial={tier === "off" ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: tier === "off" ? 0 : 0.9,
                    delay: tier === "off" ? 0 : 0.14 + modelIndex * 0.09,
                    ease: glide,
                  }}
                />
              </div>

              <p className="mt-7 border-t border-line pt-5 text-[0.8rem] leading-5 text-muted">
                {model.process}
              </p>
            </motion.article>
          );
        })}
      </div>

      <ol className="comparison-pipeline-flow mt-6">
        {data.flow.map((step, index) => (
          <motion.li
            key={step.label}
            className={`is-${step.state}`}
            initial={tier === "off" ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: tier === "off" ? 0 : 0.38,
              delay: tier === "off" ? 0 : 0.18 + index * 0.065,
              ease: glide,
            }}
          >
            <span className="comparison-flow-node" aria-hidden="true" />
            <span>{step.label}</span>
          </motion.li>
        ))}
      </ol>
    </>
  );
}

function ComparisonCardHeader({
  name,
  label,
  tone,
}: {
  name: string;
  label: string;
  tone: ComparisonEvidenceTone;
}) {
  return (
    <header>
      <p className="font-mono text-[0.61rem] tracking-[0.12em] text-accent uppercase">
        <span
          className={`comparison-evidence-dot is-${tone}`}
          aria-hidden="true"
        />
        {label}
      </p>
      <h4 className="mt-4 text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-[510] tracking-[-0.04em] text-ink">
        {name}
      </h4>
    </header>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.58rem] tracking-[0.12em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-[0.8rem] leading-5 font-medium text-ink">
        {value}
      </dd>
    </div>
  );
}

function CompactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white/35 p-2.5">
      <dt className="font-mono text-[0.5rem] leading-4 tracking-[0.08em] text-muted uppercase">
        {label}
      </dt>
      <dd className="technical-number mt-1.5 text-base text-ink">{value}</dd>
    </div>
  );
}

function EvidenceFooter({
  boundary,
  sources,
  locale,
}: {
  boundary: string;
  sources: readonly { label: string; url: string }[];
  locale: Locale;
}) {
  return (
    <footer className="comparison-evidence-footer mt-8">
      <div>
        <p className="font-mono text-[0.61rem] tracking-[0.13em] text-accent uppercase">
          {t(locale, "Evidence boundary")}
        </p>
        <p className="mt-3 max-w-[48rem] text-sm leading-6 text-muted">
          {boundary}
        </p>
      </div>
      <div>
        <p className="font-mono text-[0.61rem] tracking-[0.13em] text-muted uppercase">
          {t(locale, "Primary sources")}
        </p>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
            >
              {source.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
