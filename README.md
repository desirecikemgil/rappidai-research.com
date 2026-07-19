# rappidAI Research

Production website for **rappidAI research**, an early-stage independent AI research initiative focused on compact language models, open-weight adaptation, efficient inference, local deployment, and transparent documentation.

The site uses the Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, and Lucide React. It includes the public research, model, company, contact, and legal routes, with shared content kept outside component logic.

## Requirements

- Node.js 20.9 or newer
- pnpm 11.9.x (the repository pins `pnpm@11.9.0`)

If pnpm is not installed:

```bash
npm install --global pnpm@11.9.0
```

## Local setup

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server is available at [http://localhost:3000](http://localhost:3000) by default.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm typecheck` | Run TypeScript without emitting files. |
| `pnpm lint` | Run ESLint across the repository. |
| `pnpm build` | Create an optimized production build. |
| `pnpm start` | Serve the completed production build. |

Before opening a pull request or deploying, run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Content and configuration

Most public copy and factual information can be changed without editing component logic:

- `content/site.ts` — site identity, navigation, business email, canonical site URL, external links, contact details, and legal placeholders.
- `content/models.ts` — model names, statuses, metadata, limitations, lineage, licensing fields, and model links.
- `content/research.ts` — research areas, notes, statuses, methodology, and roadmap content.
- `content/pages.ts` — route copy, page metadata, contact-form labels, and honest unavailable-state messages.
- `content/types.ts` — shared content contracts; update these types when adding new configuration fields.
- `public/brand/` — supplied rappidAI logos, wordmark, symbol, and ambient brand artwork.
- `public/models/` — supplied and optimized model-card imagery.
- `app/globals.css` — design tokens, global typography, colors, spacing, and shared responsive styles.

Keep claims factual. Do not add benchmark results, release status, people, partnerships, qualifications, or company details unless they have been verified.

### External links, email, and canonical URL

Update these nullable values in `content/site.ts` before launch:

- The canonical production origin, including `https://` and no trailing path.
- The public business email address.
- The exact Hugging Face organization and model URLs.
- The exact GitHub organization or repository URLs.

Placeholder links are intentionally centralized. Replace them with verified URLs rather than inventing account names. The canonical origin is also used for metadata, Open Graph URLs, the sitemap, and robots configuration.

The contact form has no server endpoint. It validates the fields and may open an encoded `mailto:` draft only after `businessEmail` is configured. With no configured address, it must display that sending is unavailable and must never show a sent-success state. Adding a form provider or API requires an explicit integration, error handling, environment configuration, and corresponding privacy updates.

## Deployment

### Vercel

1. Import the Git repository into Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Use `pnpm install --frozen-lockfile` as the install command and `pnpm build` as the build command.
4. Select a Node.js runtime compatible with Node 20.9 or newer.
5. Set the final canonical URL in `content/site.ts`, then redeploy.
6. Verify every route, metadata image, sitemap, robots file, and external link on the production domain.

No database or application server is required for the current static content. If a form backend, analytics, or another third-party service is added later, configure its environment variables in Vercel and update the privacy documentation before enabling it.

### Generic Node.js hosting

The host must support a persistent Node.js process:

```bash
pnpm install --frozen-lockfile
pnpm build
NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 pnpm start
```

Run the process behind HTTPS using a reverse proxy or the platform's managed proxy, and use a process supervisor so it restarts after failure or deployment. The build and runtime should use the same lockfile and a supported Node.js version.

## Legal and launch checklist

The Imprint and Privacy routes are structural templates, not completed legal advice. Missing information must be verified and entered through the legal configuration in `content/site.ts` before a public launch. Do not publish invented or placeholder legal data.

### Identity and contact

- [ ] Confirm the operator's full legal name.
- [ ] Add a complete service/contact address suitable for the intended jurisdiction.
- [ ] Confirm the public legal-contact email address.
- [ ] Add a telephone number only if required and intentionally made public.
- [ ] Confirm the person responsible for editorial content, if applicable.

### Registration and tax details

- [ ] Confirm the legal form; do not use `GmbH`, `UG`, `Inc.`, or another entity label unless registered.
- [ ] Add register name, court, and registration number only if they exist.
- [ ] Add VAT or other tax identification only if it exists and publication is required.
- [ ] Add supervisory authority or professional-regulation details only if applicable.

### Privacy details

- [ ] Identify the data controller and provide complete controller contact details.
- [ ] Confirm the hosting provider, processing location, and relevant processing terms.
- [ ] Document server-log data, purpose, legal basis, and retention period.
- [ ] Document how contact enquiries are processed and retained.
- [ ] Confirm whether the contact experience remains a `mailto:` handoff or is connected to a form provider/backend.
- [ ] Review cookies, analytics, embedded media, external fonts, and other third-party services; update consent and privacy text before enabling any of them.
- [ ] Add the applicable data-subject rights and supervisory-authority information.
- [ ] Add a verified effective date or revision date.

### Final launch review

- [ ] Replace every placeholder email and external URL with a verified value.
- [ ] Confirm the production domain and canonical URL.
- [ ] Verify model licensing and release links individually.
- [ ] Run type checking, linting, and the production build.
- [ ] Test navigation, the mobile menu, contact behavior, focus states, and reduced-motion mode.
- [ ] Review the Imprint and Privacy pages with qualified legal counsel for the launch jurisdiction.

## Project structure

```text
app/            App Router pages, metadata, sitemap, robots, and global styles
components/     Layout, navigation, sections, models, research, motion, and UI
content/        Central site, model, research, route-copy, and metadata content
public/brand/   Official brand assets
public/models/  Model-card assets
```

The project deliberately avoids fabricated business information, benchmark claims, team members, customers, partnerships, and institutional affiliations.
