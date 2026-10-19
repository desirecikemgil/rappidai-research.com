# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable visual direction

- September 2026 redesign: give rappidAI a confident, product-led presence, with a deep-navy opening, generous typography, concise introductions and distinct Quantum, Ghost and Replay compositions. The latest brief authorizes reworking the overall layout and supersedes the earlier liquid-glass emphasis.
- Use lightweight signal-line SVG illustrations and sparse, slow CSS transform/opacity motion. Pause passive effects outside the viewport, on hidden tabs and for reduced-motion preferences. Keep evidence and current implementation limits intact.

- Favor premium, restrained passive motion and polished active hover/focus responses.
- Use a single observer for sparse, one-time scroll entrances (10px / 420ms) and a short incoming-introduction transition on route changes (4px / 220ms). Never delay navigation or hide content pending JavaScript; cancel motion for reduced-motion preferences and hidden tabs.
- Use fluid, layered scroll reveals and subtle scroll-linked depth; motion should guide hierarchy rather than compete with content.
- Use calm paper and ice-blue reading surfaces, deep-navy product stages, restrained borders and controlled radii. Reserve refraction for the signal illustrations; avoid broad backdrop blur.
- Keep motion accessible with `prefers-reduced-motion`, and verify new effects at desktop and mobile breakpoints.
- Carry the typography, surface hierarchy and clear interaction states consistently through mobile layouts.
- September 2026 Echelon launch preview: Quantum 1 Echelon takes priority in a centered, spacious first-viewport hero. Keep the navy/research-blue/white identity, restrained web-native aura and subtle desktop pointer light. The prior “Smaller Models.” hero is superseded. Preserve both historical pilots, EN/DE routing and existing product/research sections. All 1B specifications remain explicitly planned targets; no benchmark, release-date, license or weights-availability claims.
- September 2026 Echelon hero refinement: Echelon should be the element that stands out on the site — premium, detailed and eye-catching without being loud. Its hero uses an interactive signal lattice (canvas): a fine graphical grid — never literal Matrix-style characters or digits — that bends towards the pointer like a gravity well, lights up around it, rings outwards on click and carries sparse signal pulses along its lines, plus a pointer-lit wordmark, a two-part status chip, primary/secondary CTAs and a horizon strip of key targets, each labelled Target or Planned. This is a deliberate, Echelon-only exception to the no-canvas-loop rule: the loop must stay cheap (one grid path per frame, half rate when idle), run only while the hero is visible and the tab is shown, never for reduced-motion preferences, and fall back to a static CSS grid without JavaScript.
- Preserve the established white, research-blue and deep-navy identity while using the deep navy more deliberately for full-width orientation, comparison and closing sections.
- Keep every page easy to scan: lead with a concise purpose statement, expose a short set of meaningful topics or jump targets, and reveal detailed evidence through graphics, tables or focused text only after the overview.
- Treat navigation as an information hierarchy rather than a flat link list: keep the main research areas immediately visible, make the current section unmistakable, and separate contact from the primary content taxonomy.
- Reduce equal-weight card density and decorative labels. Use larger calm surfaces, fewer simultaneous choices and stronger light/dark rhythm so content-heavy pages do not feel crowded.
- Treat interaction performance as a visual requirement: scrolling, filtering, navigation and pointer feedback must remain fluid before adding passive motion or refraction effects.
- Avoid permanent pointer/scroll subscriptions, per-frame canvas redraws, widespread backdrop blur and decorative infinite loops. Prefer static server-rendered graphics, short CSS transform/opacity responses and native progressive enhancement.

- October 2026 Sentinel prioritization: Quantum Sentinel Alpha replaces Echelon only as the homepage focus. Preserve Echelon content, URLs, assets and its detail presentation. Reuse the navy/blue/white launch layout with a static signal grid for Sentinel; the existing canvas remains Echelon-specific. Sentinel capabilities are training objectives, Qwen3.5-9B is a provisional candidate pending a 4B/9B security bake-off, October 2026 is an Alpha target only, and all weights/inference/quantization artifacts remain planned. Preserve EN/DE parity.

- October 2026 Sentinel design refinement: align the Sentinel hero, model name, copy, status and CTAs to the shared left page edge. Use the public name “Quantum Sentinel-Alpha”: Quantum is the model family, Sentinel the security line, Alpha the development stage. Keep Sentinel-Alpha together at one type size, scale headings and cards to the established site, and avoid oversized viewport-filling stages. Preserve the current URLs and Echelon presentation.

- October 2026 complete rebuild (supersedes the earlier navy-stage and liquid-glass directions): the site should read as a serious, institutional AI research company, not as "typical AI" (no glow, neon gradients, radar/matrix motifs or decorative dark stages). Light-first: white reading surfaces, a quiet stone tone (`--paper`) for rhythm, brand navy for primary actions and one closing band, one signal blue for links and state, restrained 8–12px radii and hairline borders.
- Information architecture is grouped, not flat: Models, Research, Tools and About, each with a mega-menu panel of its pages; Contact is a separate action. Inner pages open with a light page header (breadcrumb, title, purpose, key facts, short page map). Research, resources and legal pages share a documentation layout with a persistent section sidebar. Existing URLs stay unchanged.
- Visuals come from real content presented as product UI (terminal windows with real commands, spec sheets, tables, the two-lane Sentinel pipeline, bar figures drawn to scale). Any illustration of planned output must be labelled as illustrative and never read as model output.
- Every page closes with a deep-navy footer that ends in an oversized lowercase "quantum" wordmark, at the same size the earlier "rappidAI" wordmark used, cropped at the bottom edge (maintainer requests, October 2026); the homepage closing band above it stays light so the two do not merge.
- October 2026 mobile pass (maintainer feedback that the phone layout looked broken): multi-column figures stack below 980px; label/value tables and data tables (`.stack-table` with `data-label` on cells) become one card per row below 640px; never use `overflow-wrap: anywhere` on text, because it lets grid and table columns collapse to a few pixels — use `break-word` plus `hyphens: auto` and reserve `break-all` for hashes. Check German pages at 320, 375, 414, 768 and 1280px before shipping layout changes.
- Model lists (the model lineup table, model index cards, homepage portfolio list, mega menu and footer) name every model in the same lowercase, hyphenated form: `quantum-sentinel-alpha`, `quantum-1-echelon`, `quantum-1.6-pilot`, `quantum-1-pilot` (maintainer request, October 2026). Hero headings, page titles and running text keep the public names „Quantum Sentinel-Alpha“ and „Quantum 1 Echelon“.
- Typography is part of the rappidAI identity: keep Geist Sans for headlines and text and Geist Mono for technical values, with tight headline tracking (about -0.045 to -0.055em, weight ~500). Do not introduce serif or other display typefaces (explicit maintainer decision).

## Durable research-publication direction

- Treat “Documented clearly” as an evidence rule: connect public claims to committed reports, configurations, manifests, checksums or model cards.
- Keep configuration, preflight, smoke-test, production-run and trained-model evidence visibly separate.
- Present Echelon Base and Echelon Chat as stages or variants within `quantum-1-echelon`, never as separate model families.
- Show missing evidence directly with `Not published`, `Not measured`, `Not yet available`, `Partial evidence` or `Maintainer input required`.
- Never upgrade configured targets, estimated architecture properties or smoke-test totals into claims about completed Echelon training or production data.

## Durable German-language direction

- October 2026 maintainer request: the German site must read like native German copy, not a 1:1 translation. Follow `docs/german-style-guide.md` for every German string: formal „Sie“ (never „du“), natural sentence structure, „Belege/Nachweise“ instead of „Evidenz“, „Model Card“, plural „Tokens“, German quotes and number formats, short UI labels, and unchanged facts and evidence boundaries.
- Every visible English string needs a German value; check `/de` pages for English leftovers (including aria-labels, units and labels rendered from protected keys) before shipping.

## Delivery workflow

- After a requested change is complete and verified, commit it and push it to GitHub immediately; do not leave finished website changes only in the local worktree.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
