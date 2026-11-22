# AST Wallet Dapp 目录

安卓和 iOS 共用的公开应用目录。[查看线上 JSON](https://blockchainworldbank.github.io/ast-dapp-catalog/catalog.json)

### 更新目录

1. 编辑 [data/catalog.json](data/catalog.json) 和 `assets/`。数组顺序决定分类、Banner 和应用的展示顺序。替换图片时使用新文件名。
2. 增加 `revision`。下架应用时将 `status` 设为 `disabled`，恢复旧内容时也使用新的 `revision`。
3. 核对目标域名、来源和应用支持的链后提交 PR。合并到 `main` 后，Actions 校验并发布新目录。

结构由 [JSON Schema](schema/catalog.schema.json) 定义。`startsAt` 和 `endsAt` 采用 UTC。Banner 通过 `appId` 指向应用条目。每个条目至少提供简体中文和英文。链 ID 依据 [浏览器链键快照](schema/browser-chains.json)，客户端再按自身浏览器支持的网络筛选。仓库只保存公开应用信息和图片。

本地校验运行 `npm ci --ignore-scripts`，再运行 `npm run check`。运行 `npm run build` 生成可发布目录。

### 首批应用参考

- [Uniswap 支持网络](https://support.uniswap.org/hc/en-us/articles/40074184880525-Networks-on-Uniswap)
- [Aave 入口与网络](https://aave.com/help/aave-101/accessing-aave)
- [Sui 主网及浏览器](https://docs.sui.io/develop/sui-architecture/networks)
- [Blockscout](https://eth.blockscout.com/)
