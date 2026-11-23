# App icon sources

The existing AST icon and orbit artwork are retained from the original catalog. Added icons are downloaded without image modification. The favicon service returns the public favicon associated with each listed app domain; selected icons come from DefiLlama’s public icon collection. These assets identify third-party apps and do not imply endorsement.

- `uniswap`: https://www.google.com/s2/favicons?domain=app.uniswap.org&sz=128
- `aave`: https://www.google.com/s2/favicons?domain=app.aave.com&sz=128
- `suiscan`: https://www.google.com/s2/favicons?domain=suiscan.xyz&sz=128
- `blockscout`: https://www.google.com/s2/favicons?domain=eth.blockscout.com&sz=128
- `hyperliquid`: https://www.google.com/s2/favicons?domain=app.hyperliquid.xyz&sz=128
- `pancakeswap`: https://www.google.com/s2/favicons?domain=pancakeswap.finance&sz=128
- `curve`: https://icons.llamao.fi/icons/protocols/curve.png
- `virtuals`: https://www.google.com/s2/favicons?domain=app.virtuals.io&sz=128
- `olas`: https://www.google.com/s2/favicons?domain=olas.network&sz=128
- `four-meme`: https://icons.llamao.fi/icons/protocols/four.meme.png
- `gmgn`: https://www.google.com/s2/favicons?domain=gmgn.ai&sz=128
- `dexscreener`: https://www.google.com/s2/favicons?domain=dexscreener.com&sz=128
- `defillama`: https://www.google.com/s2/favicons?domain=defillama.com&sz=128
- `polymarket`: https://www.google.com/s2/favicons?domain=polymarket.com&sz=128
- `ondo`: https://www.google.com/s2/favicons?domain=ondo.finance&sz=128
- `pendle`: https://www.google.com/s2/favicons?domain=app.pendle.finance&sz=128
- `gmx`: https://icons.llamao.fi/icons/protocols/gmx.png

## Revision 3 additions

- `dmast-v1.png`: DMAST official favicon at `https://dm.astai.org/assets/dm-favicon-green-20261030.png`. Rendered from the matching existing DMAST brand asset at 256×256 and losslessly encoded as PNG for the catalog limits.
- `aster-v1.png`: public favicon for `www.asterdex.com` from `https://www.google.com/s2/favicons?domain=www.asterdex.com&sz=128`; re-encoded losslessly from the returned JPEG to PNG without changing its dimensions.
- The four revision-3 banner backgrounds are original editable SVG compositions, using the corresponding project icons. They were rasterized to WebP with Sharp 0.35.5; editable sources and design notes are in `design/`.

## Revision 4 theme artwork

The five `*-feature-v2.webp` backgrounds are exported from the matching editable version-2 SVGs in `design/banners/`. They use the existing app icons, preserve the project marks and apply distinct project-inspired palettes. No icon file is replaced. AST’s embedded WebP icon is losslessly encoded as PNG inside its editable SVG solely for vector-renderer compatibility.
