# Discovery banner artwork

The editable SVG sources in `banners/` produce the four versioned WebP backgrounds in `assets/banners/`. All canvases are 1536×864. The left half intentionally stays quiet: the wallet renders the configured localized heading, subtitle, badge and CTA over that area. Do not bake translated copy or a second CTA into the artwork.

- **DMAST:** teal network connections, a purple exchange panel and the existing green DMAST mark.
- **HYPE / Hyperliquid:** mint orbital liquidity rings and the Hyperliquid mark, on the wallet’s dark purple base.
- **PancakeSwap:** a warm gold and cyan token composition with the official rabbit icon.
- **ASTER:** a violet and rose geometric market emblem around the official ASTER icon.

The AST liquidity-pool banner keeps the existing native orbit design. The homepage order is DMAST, AST, HYPE, PancakeSwap, ASTER. All cards resolve their destination through `appId`, so changing an app’s canonical website updates the corresponding banner action without adding another link field.

The SVGs embed the public project icons and can be edited in a vector editor. Export at their original size as WebP (the current output uses Sharp 0.35.5 with quality 91), retain the catalog’s 512 KiB limit and use a new versioned filename when changing artwork. Run the catalog build after exporting.
