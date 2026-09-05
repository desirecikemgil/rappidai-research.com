# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable visual direction

- September 2026 redesign: give rappidAI a confident, product-led presence, with a deep-navy opening, generous typography, concise introductions and distinct Quantum, Ghost and Replay compositions. The latest brief authorizes reworking the overall layout and supersedes the earlier liquid-glass emphasis.
- Use lightweight signal-line SVG illustrations and sparse, slow CSS transform/opacity motion. Pause passive effects outside the viewport, on hidden tabs and for reduced-motion preferences. Keep evidence and current implementation limits intact.

- Favor premium, restrained passive motion and polished active hover/focus responses.
- Use fluid, layered scroll reveals and subtle scroll-linked depth; motion should guide hierarchy rather than compete with content.
- Use calm paper and ice-blue reading surfaces, deep-navy product stages, restrained borders and controlled radii. Reserve refraction for the signal illustrations; avoid broad backdrop blur.
- Keep motion accessible with `prefers-reduced-motion`, and verify new effects at desktop and mobile breakpoints.
- Carry the typography, surface hierarchy and clear interaction states consistently through mobile layouts.
- Keep the home hero editorial and wide: the “Smaller Models. / Focused Intelligence.” statement stays on exactly two lines over a full-width signal-line composition.
- Preserve the established white, research-blue and deep-navy identity while using the deep navy more deliberately for full-width orientation, comparison and closing sections.
- Keep every page easy to scan: lead with a concise purpose statement, expose a short set of meaningful topics or jump targets, and reveal detailed evidence through graphics, tables or focused text only after the overview.
- Treat navigation as an information hierarchy rather than a flat link list: keep the main research areas immediately visible, make the current section unmistakable, and separate contact from the primary content taxonomy.
- Reduce equal-weight card density and decorative labels. Use larger calm surfaces, fewer simultaneous choices and stronger light/dark rhythm so content-heavy pages do not feel crowded.
- Treat interaction performance as a visual requirement: scrolling, filtering, navigation and pointer feedback must remain fluid before adding passive motion or refraction effects.
- Avoid permanent pointer/scroll subscriptions, per-frame canvas redraws, widespread backdrop blur and decorative infinite loops. Prefer static server-rendered graphics, short CSS transform/opacity responses and native progressive enhancement.

## Durable research-publication direction

- Treat “Documented clearly” as an evidence rule: connect public claims to committed reports, configurations, manifests, checksums or model cards.
- Keep configuration, preflight, smoke-test, production-run and trained-model evidence visibly separate.
- Present Echelon Base and Echelon Chat as stages or variants within `quantum-1-echelon`, never as separate model families.
- Show missing evidence directly with `Not published`, `Not measured`, `Not yet available`, `Partial evidence` or `Maintainer input required`.
- Never upgrade configured targets, estimated architecture properties or smoke-test totals into claims about completed Echelon training or production data.

## Delivery workflow

- After a requested change is complete and verified, commit it and push it to GitHub immediately; do not leave finished website changes only in the local worktree.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
