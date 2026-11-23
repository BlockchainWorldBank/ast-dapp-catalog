# DApp 目录变更记录

`revision` 每次修改目录或图片时递增。客户端读取到的 `revision` 即目录版本。

## Revision 5

- Banner 顺序调整为 AST 超级合约流动池、DMAST 链上交易所、HYPE、PancakeSwap、ASTER。
- Banner 背景改为满铺裁切，在不同宽高比的卡片上不再左右留边；缺少主题配色时使用中性色。

## Revision 4

- Banner 增加可选的 `theme` 对象，字段为 `background`、`accent`、`accentSecondary`、`text`、`mutedText`、`buttonText`，均为六位十六进制颜色，统一控制背景、标签、文字与按钮配色。
- 五张 Banner 分别采用各项目的主题色。不支持该字段的旧版客户端仍使用原有配色。

## Revision 3

- 所有应用介绍扩写为中文不少于 30 个汉字、英文不少于 30 个字符，校验脚本阻止过短的介绍。撰写依据见 [内容依据](content-sources.md)。
- 新增 HYPE、PancakeSwap、ASTER 和 DMAST 链上交易所 Banner，共五张。可编辑源文件见 [Banner 设计](../design/README.md)。
- 「社区热门工具」首列固定为 DMAST 链上交易所、AST 超级合约流动池、DefiLlama。

## Revision 2

- 新增 AI、预测、RWA、永续合约、DeFi、Meme、生态、工具等分类及首页分组。首页与收藏由客户端提供，不写入目录。
- Banner 增加可选的多语言 `eyebrow`（顶部标签）、`badge`（角标）、`cta`（按钮文案）和 `style`（`image` 或 `orbit`）字段。

## Revision 1

- 发布首批 DApp 目录，参考资料包括 [Uniswap 支持网络](https://support.uniswap.org/hc/en-us/articles/40074184880525-Networks-on-Uniswap)、[Aave 入口与网络](https://aave.com/help/aave-101/accessing-aave)、[Sui 主网及浏览器](https://docs.sui.io/develop/sui-architecture/networks) 和 [Blockscout](https://eth.blockscout.com/)。
