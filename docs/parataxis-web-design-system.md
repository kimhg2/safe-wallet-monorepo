# Parataxis Web Design System

Last updated: 2026-04-28

## Reference

Source: https://parataxiseth.co.kr/

The wallet web UI now uses the public Parataxis Ethereum site as the visual reference for its first web pass. The reference site is high-contrast, institutional, and typography-led:

- White and near-white editorial surfaces
- Dense black headline typography
- Ethereum blue as the primary accent
- Minimal borders, squared geometry, and restrained elevation
- Uppercase wordmark treatment with wide tracking
- Dark mode based on deep navy/black with the same blue accent

## Token Mapping

| Role              | Light     | Dark      | Notes                                                |
| ----------------- | --------- | --------- | ---------------------------------------------------- |
| Primary text      | `#17181C` | `#F8FAFC` | Near-black / near-white contrast                     |
| Secondary text    | `#536179` | `#9AA8BC` | Slate copy color from the reference site's body tone |
| Brand accent      | `#155DFC` | `#3F7BFF` | Ethereum blue CTA/accent color                       |
| Accent background | `#EFF4FF` | `#14244A` | Subtle selected/hover surfaces                       |
| App background    | `#F7F8FA` | `#0B1020` | Quiet operational workspace                          |
| Panel background  | `#FFFFFF` | `#111827` | Main cards, header, sidebar                          |
| Border            | `#E5EAF1` | `#273449` | Low-contrast structural lines                        |

These colors are defined in `packages/theme/src/palettes/` and mirrored to `apps/web/src/styles/vars.css`.

## Typography

The web app keeps the existing DM Sans font stack to avoid a font migration in this pass. Heading weights were raised in the shared typography tokens so product surfaces better match the Parataxis site's heavy editorial hierarchy.

Wordmark and label treatments use uppercase text with tracked spacing to match the reference navigation and logo system.

## Components Updated

- `BrandLogo`: new reusable Parataxis fallback wordmark/mark component.
- `Header`: uses Safe logos only on official Safe hosts; fork/default builds render Parataxis branding.
- `Footer`: fork/default builds render Parataxis copyright instead of the old unofficial distribution copy.
- `MetaTags`: description, social image, Twitter site, and icon are now brand constants.
- `Welcome/NewSafe`: first screen now uses the Parataxis tagline with a white editorial panel, black headline typography, and Ethereum-blue emphasis.
- `Sidebar`: navigation hover/selected states now use the blue accent system.
- `shadcn.css`: scoped shadcn variables now align with Parataxis tokens.
- `safe.webmanifest`: PWA name/icon/description updated for Parataxis Wallet.

## Brand Constants

Defaults are set in `apps/web/src/config/constants.ts`:

- `BRAND_NAME`: `Parataxis Wallet`
- `BRAND_ICON`: `/favicons/parataxis-mark.svg`
- `BRAND_DESCRIPTION`: Ethereum smart account wallet for institutional treasury operations.
- `BRAND_SOCIAL_IMAGE`: `/images/social-share.png`

All can still be overridden with `NEXT_PUBLIC_*` environment variables.

## Verification Notes

The reference screenshot was captured from `https://parataxiseth.co.kr/` at a `1440x1200` viewport. The key visual traits observed were the black/white editorial layout, blue `#155DFC` accent, uppercase tracked navigation, and heavy hero typography.

Verified in this pass:

- `yarn workspace @safe-global/web css-vars`
- `yarn verify:changed:web`
- `yarn workspace @safe-global/theme type-check`
- `yarn workspace @safe-global/theme test`
- `yarn workspace @safe-global/theme prettier`
- `yarn workspace @safe-global/web prettier`
- Local runtime check at `http://localhost:3000/welcome`

`verify:changed:web` exits successfully. It may still print missing-test warnings while the newly added test files are untracked, because the verifier only inspects `git diff` tracked paths.
