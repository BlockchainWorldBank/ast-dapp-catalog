<div align="center">

<img src="docs/images/dm-wallet-icon.png" width="96" height="96" alt="DM Wallet">

# DM Wallet

多链 Web3 钱包 · 安卓版本发布与 DApp 目录

[下载安卓版](https://github.com/BlockchainWorldBank/ast-dapp-catalog/releases/latest) · [DApp 目录](https://blockchainworldbank.github.io/ast-dapp-catalog/catalog.json) · [English](#english)

</div>

---

## 仓库内容

本仓库是 DM Wallet 对外发布的公开仓库，只保存安装包、版本信息、DApp 应用信息和图片，不包含钱包源码、签名密钥或任何用户数据。

| 内容 | 位置 | 用途 |
|---|---|---|
| 安卓安装包 | [Releases](https://github.com/BlockchainWorldBank/ast-dapp-catalog/releases) | 每个版本一个 Release，附带安装包 |
| 版本清单 | 每个 Release 中的 `wallet-release.json` | DM Wallet 安卓版据此检查和校验更新 |
| DApp 目录 | [`data/catalog.json`](data/catalog.json)，发布到 [GitHub Pages](https://blockchainworldbank.github.io/ast-dapp-catalog/catalog.json) | 钱包「发现」页的分类、Banner 和应用列表 |

## 下载与安装

1. 打开 [最新版本](https://github.com/BlockchainWorldBank/ast-dapp-catalog/releases/latest)，下载 Assets 中的 `.apk` 文件。
2. 如系统提示，允许浏览器或文件管理器安装应用。
3. 已安装 DM Wallet 时直接覆盖安装，钱包数据会保留。

本仓库只发布安卓版。

### 应用内更新

DM Wallet 安卓版在启动和回到前台时检查本仓库的最新版本。发现新版本后，会提示版本号和更新说明，用户确认后在应用内下载并调起系统安装。安装前会自动完成以下校验，任何一项不符都会删除安装包并拒绝安装：

- 文件大小和 SHA-256 与版本清单一致
- 包名、版本号与清单一致，且版本高于当前安装的版本
- 签名证书与当前安装的应用一致

下载地址固定为本仓库的 Release，只使用 HTTPS。

### 手动校验安装包

每个 Release 的说明中都列出了安装包的 SHA-256。下载后可自行核对：

```bash
# macOS / Linux
shasum -a 256 <安装包文件名>.apk

# Windows
certutil -hashfile <安装包文件名>.apk SHA256
```

输出结果应与 Release 说明中的值完全一致。

## 版本规则

- 版本号采用 `主版本.次版本.修订号`，从 `0.0.1` 开始。
- 每个版本对应一个标签 `wallet-<版本号>`，最新的 Release 即当前版本。
- 版本可以设定最低支持版本。低于该版本的安装会收到必须更新的提示，无法跳过。
- 可选更新可以跳过。被跳过的版本不再提示，直到有更新的版本发布，或该版本变为必须更新。

<details>
<summary>版本清单格式</summary>

```json
{
  "schemaVersion": 1,
  "releases": [
    {
      "store": "apkUniversal",
      "version": "0.0.2",
      "minimumVersion": "0.0.1",
      "file": {
        "sha256": "<安装包 SHA-256>",
        "size": 83296292,
        "signer": "<签名证书 SHA-256>"
      },
      "notes": {
        "zh": "更新说明",
        "en": "Release notes"
      }
    }
  ]
}
```

| 字段 | 说明 |
|---|---|
| `version` | 本次发布的版本号 |
| `minimumVersion` | 可选。低于此版本时更新为必须 |
| `file.sha256` / `file.size` | 安装包的 SHA-256 和字节数，应用下载后逐一核对 |
| `file.signer` | 签名证书的 SHA-256，供发布时核对签名未变 |
| `notes` | 更新说明，按应用语言显示，缺少该语言时显示英文 |

</details>

## DApp 目录

DM Wallet 的「发现」页从 GitHub Pages 读取目录。应用内置一份目录快照，线上目录无法读取时使用快照。

| 路径 | 说明 |
|---|---|
| [`data/catalog.json`](data/catalog.json) | 目录数据：分类、首页分组、Banner 和应用 |
| [`assets/`](assets) | 应用图标和 Banner 图片，来源见 [SOURCES.md](assets/SOURCES.md) |
| [`schema/catalog.schema.json`](schema/catalog.schema.json) | 目录结构定义 |
| [`schema/browser-chains.json`](schema/browser-chains.json) | 可用的链 ID |
| [`design/`](design) | Banner 可编辑源文件与配色说明 |
| [`docs/content-sources.md`](docs/content-sources.md) | 应用介绍的撰写依据 |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | 目录各版本的变更记录 |

### 更新规则

1. 修改 `data/catalog.json` 或 `assets/` 时必须增加 `revision`。数组顺序即展示顺序，替换图片时使用新文件名。
2. 下架应用时将 `status` 设为 `disabled`；恢复旧内容同样使用新的 `revision`。
3. 每个条目至少提供简体中文和英文，每种语言的文字不超过 160 个字符。应用介绍的中文不少于 30 个汉字，英文不少于 30 个字符，不得包含收益承诺、用户数量或排名。
4. 应用支持的链使用 `schema/browser-chains.json` 中的链 ID。实际连接和签名由钱包内置浏览器按其支持的网络处理。
5. Banner 通过 `appId` 指向应用，`startsAt` 和 `endsAt` 采用 UTC。可选的 `theme` 对象以六位十六进制颜色控制背景、强调色、文字和按钮配色。
6. 变更合并到 `main` 后，GitHub Actions 自动校验并发布到 GitHub Pages。

### 本地校验

需要 Node.js（CI 使用 24 版）。

```bash
npm ci --ignore-scripts
npm run check   # 校验结构、图片、链 ID、介绍长度和 revision
npm run build   # 生成待发布的 site/ 目录
```

## 安全提示

- 只从本仓库的 Releases 下载 DM Wallet，不要安装来源不明的安装包。
- 助记词和私钥只保存在你的设备上。任何人以任何理由索要，都是诈骗。
- DApp 目录仅提供访问入口，不构成对任何项目的推荐或担保。连接 DApp 和签名前，请自行核对网址与交易内容。

---

<a id="english"></a>

## English

DM Wallet is a multi-chain Web3 wallet. This public repository publishes the Android app, its update manifest and the DApp catalog shown on the wallet's Discover page. It contains no wallet source code, signing keys or user data.

### Download

Download the `.apk` from the [latest release](https://github.com/BlockchainWorldBank/ast-dapp-catalog/releases/latest) and install it. Installing over an existing DM Wallet keeps your wallets. Only the Android app is published here.

### In-app updates

The Android app checks this repository's latest release when it opens or returns to the foreground. It shows the new version and its release notes, then downloads the package inside the app. Before handing it to the system installer, the app verifies the file size and SHA-256 against the manifest, the package name and version, and that the package is signed with the same certificate as the installed app. A package that fails any check is deleted. Downloads always come from this repository's releases over HTTPS.

Each release lists the SHA-256 of its package, so you can verify a manual download with `shasum -a 256` (macOS, Linux) or `certutil -hashfile <file> SHA256` (Windows).

### Versions

Versions use `Major.Minor.Patch`, starting at `0.0.1`, and each release is tagged `wallet-<version>`. A release can set a minimum version: installations below it must update and cannot skip the prompt. Optional updates can be skipped until a newer version is published or the skipped one becomes required.

### DApp catalog

The Discover page reads [`catalog.json`](https://blockchainworldbank.github.io/ast-dapp-catalog/catalog.json) from GitHub Pages and falls back to the snapshot bundled with the app. The structure is defined by [`schema/catalog.schema.json`](schema/catalog.schema.json). Every change to the catalog or its images increases `revision`. Each entry carries Simplified Chinese and English text of at most 160 characters; app introductions need at least 30 Chinese characters and 30 English characters and contain no return promises, user counts or rankings. Run `npm ci --ignore-scripts` and `npm run check` to validate locally, and `npm run build` to produce the site.

### Safety

Install DM Wallet only from this repository's releases. Your recovery phrase and private keys stay on your device; anyone who asks for them is a scammer. Listing in the catalog is not an endorsement: check the address and transaction before you connect or sign.
