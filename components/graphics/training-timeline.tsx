export type TimelineStage = {
  id: string;
  index: string;
  status: string;
  title: string;
  description: string;
  /** Reached stages read as solid; the open one stays hollow. */
  reached: boolean;
};

/**
 * The model line as a drawn axis rather than three cards in a row.
 *
 * The connecting rule draws itself to the last reached stage and then stops:
 * the gap to the open stage is the point, and `AGENTS.md` forbids presenting
 * a configured target as a completed one.
 */
export function TrainingTimeline({ stages }: { stages: TimelineStage[] }) {
  const reachedCount = stages.filter((stage) => stage.reached).length;
  const solidFraction =
    stages.length > 1
      ? Math.max(0, (reachedCount - 1) / (stages.length - 1))
      : 0;

  return (
    <div className="training-timeline">
      {/* The axis lives above the columns on wide screens only; stacked
          layouts get each marker attached to its own card instead. */}
      <div className="relative hidden lg:block" aria-hidden="true">
        <div className="absolute inset-x-0 top-[0.42rem] h-px bg-[var(--color-dark-line)]" />
        <div
          className="training-timeline-progress absolute left-0 top-[0.42rem] h-px origin-left"
          style={{ right: `${(1 - solidFraction) * 100}%` }}
        />
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
        >
          {stages.map((stage) => (
            <span
              key={stage.id}
              className={`training-timeline-node ${
                stage.reached ? "is-reached" : "is-open"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-0 grid gap-4 lg:mt-10 lg:grid-cols-3">
        {stages.map((stage) => (
          <article
            key={stage.id}
            className="liquid-card-dark relative border p-7 py-9 lg:min-h-[20rem] lg:p-9 lg:py-10"
          >
            <div className="flex items-center gap-4">
              <span className="technical-number text-xs text-[var(--color-dark-accent)]">
                {stage.index}
              </span>
              <span
                className={`training-timeline-node ${
                  stage.reached ? "is-reached" : "is-open"
                } lg:hidden`}
                aria-hidden="true"
              />
            </div>
            <p className="mt-12 font-mono text-[0.64rem] tracking-[0.12em] text-[var(--color-dark-muted)] uppercase">
              {stage.status}
            </p>
            <h3 className="mt-5 text-[clamp(1.7rem,3vw,2.7rem)] leading-[1.02] font-[510] tracking-[-0.045em] text-[var(--color-dark-title)]">
              {stage.title}
            </h3>
            <p className="mt-5 max-w-sm leading-7 text-[var(--color-dark-body)]">
              {stage.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
