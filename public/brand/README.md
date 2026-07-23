# Brand asset record

This directory contains PNG files used by the public website and source-named
variants retained with the project. This inventory documents technical identity
and current code references. It does **not** grant a copyright or trademark
license and does not prove the files' origin.

## Inventory

| File                             | Technical properties             | Current repository role                                                  | SHA-256                                                            |
| -------------------------------- | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `rappidai-research-ambient.png`  | 1,672 × 941, RGB, 868,858 bytes  | Referenced by site configuration as the ambient image                    | `ee3678915a682d897eaea76dd23d0ea01a4ae0429d97cd505756f48849afadc0` |
| `rappidai-research-lockup.png`   | 1,034 × 204, RGBA, 48,775 bytes  | Referenced directly by the brand-lockup component and site configuration | `7185d5d94dbde54ab307e4be9cb7d8243dfcd4cb4e655e26d45c8f1dd3f0a541` |
| `rappidai-symbol-original.png`   | 432 × 484, RGB, 66,304 bytes     | Source-named retained variant; no direct code reference found            | `60f31f0554661502b5075828216bb18ff794defe1f573a66862ac1a55f47f269` |
| `rappidai-symbol.png`            | 448 × 448, RGBA, 36,292 bytes    | Referenced by the brand-lockup component and site configuration          | `6247d10022174afd7f8507db1d563ef29bd1f69db4274e411b761aef3a6e5e05` |
| `rappidai-wordmark-original.png` | 2,552 × 982, RGB, 496,386 bytes  | Source-named retained variant; no direct code reference found            | `ee3f32360504dbc44f0ff8cfc28cba0b420e22d3e5b4c98cdf65507e8e2421f4` |
| `rappidai-wordmark.png`          | 2,102 × 520, RGBA, 153,228 bytes | Referenced by site configuration as the website wordmark                 | `492a1a8992893a2e5033896b6020ee5096af0791618505fd4a24c4f87718eec5` |

“Original” is part of two filenames. It is not a verified claim that those files
are the first, canonical, lossless, or rights-cleared sources. The repository
does not contain a transformation recipe or retained provenance evidence that
establishes how either paired website asset was derived.

## Related application icons

Next.js serves these brand-related metadata images from `app/`. They share the
same unresolved provenance and licensing status as the files above.

| File                 | Technical properties    | Current repository role                                     | SHA-256                                                            |
| -------------------- | ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| `app/icon.png`       | 512 × 512, 41,879 bytes | Browser and application icon discovered by Next.js metadata | `42962345930e682920424a974edcb34ac7cfbd3dedc1d67ccf64816d515c225a` |
| `app/apple-icon.png` | 180 × 180, 7,834 bytes  | Apple touch icon discovered by Next.js metadata             | `c0fa324594fa0b7fda432cf8ddce42c072632dc4b8cc34d3171fce96e2d3a516` |

## Provenance and licensing status

The repository currently lacks a complete per-file record for:

- creator and rights holder;
- original source and acquisition date;
- commissioned, generated, licensed, or supplied status;
- license text or written permission;
- transformations and the person/tool that performed them; and
- trademark ownership and permitted forms of use.

The root `NOTICE` and [licensing record](../../docs/licensing.md) exclude these
assets from the website's Apache-2.0 grant pending that review. Public visibility
and use by the website do not by themselves grant permission to copy, modify,
redistribute, or use the marks as a trademark.

## Required record before reuse or replacement

For every asset, add an owner-approved record containing:

1. exact filename and checksum;
2. creator, rights holder, source URI or source-delivery record, and date;
3. license or written permission, including trademark conditions;
4. generation/editing tools and a reproducible transformation description;
5. relationship to source and derivative files; and
6. approval for web publication and any independent redistribution.

When replacing a file, update code references, dimensions, byte size, checksum,
alt-text use, cache expectations, and the provenance record in the same change.
