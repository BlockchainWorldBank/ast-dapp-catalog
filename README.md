# AST Wallet Dapp 目录

安卓和 iOS 共用的公开应用目录。[查看线上 JSON](https://blockchainworldbank.github.io/ast-dapp-catalog/catalog.json)

### 更新目录

1. 编辑 [data/catalog.json](data/catalog.json) 和 `assets/`。数组顺序决定分类、Banner 和应用的展示顺序。替换图片时使用新文件名。
2. 增加 `revision`。下架应用时将 `status` 设为 `disabled`，恢复旧内容时也使用新的 `revision`。
3. 核对目标域名、来源和应用支持的链后提交 PR。合并到 `main` 后，Actions 校验并发布新目录。

结构由 [JSON Schema](schema/catalog.schema.json) 定义。`startsAt` 和 `endsAt` 采用 UTC。Banner 通过 `appId` 指向应用条目。每个条目至少提供简体中文和英文。链 ID 依据 [浏览器链键快照](schema/browser-chains.json)，实际连接和签名仍由原生浏览器按其支持的网络处理。仓库只保存公开应用信息和图片。

本地校验运行 `npm ci --ignore-scripts`，再运行 `npm run check`。运行 `npm run build` 生成可发布目录。

### 首批应用参考

- [Uniswap 支持网络](https://support.uniswap.org/hc/en-us/articles/40074184880525-Networks-on-Uniswap)
- [Aave 入口与网络](https://aave.com/help/aave-101/accessing-aave)
- [Sui 主网及浏览器](https://docs.sui.io/develop/sui-architecture/networks)
- [Blockscout](https://eth.blockscout.com/)

### DM Wallet 发现页扩展

Revision 2 增加 AI、预测、RWA、永续合约、Meme 等分类和分组列表，包含 18 个应用、7 个首页分组和 2 个 Banner。首页与收藏由客户端提供，不写入分类配置。

Banner 保留原字段，并增加可选的多语言 `eyebrow`（顶部标签）、`badge`（角标）、`cta`（按钮文案）和 `style`（`image` 或 `orbit`）字段。`orbit` 由两端用 DM 紫色绘制轨道图形，正文和按钮仍来自配置；省略时使用图片。AST 文案为“AST超级合约流动池 / 连接生态 · 探索链上流动性 / 立即进入”。

公开应用图标来源见 [图标来源](assets/SOURCES.md)。配置通过校验后，在钱包仓库运行 `python3 scripts/sync-dapp-catalog.py "../DM Wallet Catalog"` 同步两端内置快照；运行相同命令加 `--check` 可核对一致性。原有 GitHub Pages 发布流程保持不变。

### Revision 3 内容与 Banner

所有应用的简体中文介绍均至少包含 30 个汉字，英文介绍至少 30 个字符，仍受每种语言最多 160 个字符的约束。校验脚本会阻止短介绍再次进入目录。文案根据各项目官网与官方文档独立撰写，来源见 [内容依据](docs/content-sources.md)。

新增 HYPE、PancakeSwap、ASTER 三张官网 Banner，并新增 DMAST 链上交易所首图；保留 AST 超级合约流动池，总计五张。可编辑背景源文件见 [Banner 设计](design/README.md)。社区热门工具的首列自上而下固定为 DMAST 链上交易所、AST 超级合约流动池、DefiLlama，其余项目保留在后续列。

DMAST 配置使用标准地址 `https://dm.astai.org/`，官网会自动进入 `#home`。已通过独立浏览器只读检查确认最终地址为用户指定的 `https://dm.astai.org/#home`；不把片段写入目录，以保持现有钱包解码器兼容。
