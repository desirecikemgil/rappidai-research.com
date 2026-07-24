# Model image asset record

This directory contains two raster presentations associated with
`quantum-1.6-pilot`. They are website/media assets, not model binaries,
manifests, benchmark evidence, or authoritative sources for technical claims.

## Inventory

| File                                   | Technical properties              | Current repository role                                 | SHA-256                                                            |
| -------------------------------------- | --------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| `quantum-1-6-pilot-model-card-web.png` | 1,600 × 1,006, RGB, 401,942 bytes | Retained variant; no longer rendered by the website     | `9e014de9fd8214f2194958a563fcf2f02c6d7b07d8dbfc421530acf85263108d` |
| `quantum-1-6-pilot-model-card.png`     | 2,480 × 1,560, RGB, 724,138 bytes | Larger retained variant; no direct code reference found | `3a7bf05600967a3d6bbe1348d37cc1b06985d4c838d640a9d053c91b5c9e5de2` |

Neither file is rendered by the site any more. The home page and the model
detail pages now draw the model card from `content/models.ts` through
`components/graphics/model-card-visual.tsx`, so the visible values are read
from the same records as the rest of the site instead of being baked into a
raster. Both files are retained unchanged because their provenance review is
still open; nothing here authorises deleting or replacing them.

The filenames and dimensions suggest a web-sized and a larger variant, but the
repository does not retain a source record or transformation recipe that proves
their exact relationship.

Technical model facts must be checked against the Markdown model cards, public
Hugging Face manifests, checksums, and versioned research sources. Text rendered
inside a PNG can become stale and is not machine-verifiable release metadata.

## Provenance and licensing status

The repository does not currently identify the images' creator, rights holder,
source date, source file, generation/editing process, or applicable reuse
license. The root `NOTICE` and
[licensing record](../../docs/licensing.md) exclude these files from the
website's Apache-2.0 grant pending that review.

No license for the model weights, tokenizer, dataset, logo, or image should be
inferred from the presence of these PNGs. Likewise, any future license for model
weights would not automatically license the images.

## Required maintenance

Before reuse, redistribution, or replacement:

1. record creator, rights holder, source, date, and written permission/license;
2. record generation/editing tools, transformations, and relationship between
   the two files;
3. verify every visible technical value against the canonical release manifest;
4. record checksums and approval for both web publication and redistribution;
5. update alt text and code references without using the image as factual
   evidence; and
6. replace or remove the image if its visible facts diverge from the current
   model card.
