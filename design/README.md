# Discovery banner artwork

The current version-2 SVG sources in `banners/` produce five per-project WebP backgrounds in `assets/banners/`. All canvases are 1536×864. The left half is reserved for the wallet’s localized heading, subtitle, badge and CTA. Version-1 files remain available for previously published catalogs.

| Banner | Color treatment |
|---|---|
| DMAST | Forest green surface, emerald network accents and the existing gold/green mark |
| AST | Purple surface, silver/lavender rings and the existing AST symbol |
| HYPE / Hyperliquid | Deep teal surface, mint liquidity rings and Hyperliquid symbol |
| PancakeSwap | Light sky-blue surface, cyan and cream details with the official rabbit icon |
| ASTER | Warm charcoal surface, sand-gold geometry and the existing ASTER mark |

These palette treatments reference each project’s existing icon and brand presentation; they are not a claim that every chosen shade is an official brand-kit token. Primary references include [Hyperliquid’s brand kit](https://hyperliquid.gitbook.io/hyperliquid-docs/brand-kit), [PancakeSwap](https://pancake.xyz/) and [ASTER’s media kit](https://docs.asterdex.com/brand-and-community). The DMAST and AST marks come from the existing approved project assets.

The homepage order and website destinations are AST, DMAST, HYPE, PancakeSwap, ASTER. Every card resolves its destination through `appId`. The optional `theme` object now also controls background, border, text, badge and CTA colors, so the native renderer does not apply a fixed purple overlay to a non-purple brand. Missing themes use a neutral fallback in the updated client. Banner artwork must cover the entire card, including both edges, at all supported card widths.

Edit the SVGs in a vector editor and export at the original size as WebP (the current output uses Sharp 0.35.5 with quality 91). Retain the 512 KiB limit and use a new filename when changing artwork. Keep the text-area background consistent with `theme.background`. Do not bake translated copy or a second CTA into the image.
