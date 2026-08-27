# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 私有操作事项（待办、内部决策背景、隐私红线）位于本地文件 `CLAUDE.local.md`（已 gitignore，不进入公共仓库）。

## 项目定位

蔡鹏（Peng Cai）的个人学术主页 —— 重庆医科大学应用统计硕士生，面向国内博士学位申请并兼顾求职展示。托管于 GitHub Pages，经 Cloudflare 代理自定义域名 `www.151187.xyz`。页面有意不做搜索引擎收录（robots.txt + 全站 meta noindex，见"不可改动项"）。

## 常用命令

```bash
# 构建（源码在 site/ 子目录，构建产物 out/ 已 gitignore）
cd site && npm ci && npm run build     # 输出 site/out/

# 本地预览构建产物（不要用 file:// 直接打开 index.html）
cd site/out && python3 -m http.server 8000
# 或开发服务器（改内容热更新）：cd site && npm run dev

# 发布：push 到 master → GitHub Actions 自动构建并部署到 Pages
# （需要仓库 Settings → Pages → Source = GitHub Actions）
```

## 架构

- `site/` = **PRISM 模板源码**（Next.js 静态导出），是普通文件而非 submodule。
- 内容全部在 `site/content/`（**英文兜底层**）+ `site/content_zh/`（**中文覆盖层**），纯 TOML/Markdown/BibTeX 驱动，改内容不碰代码。
- i18n：`content/config.toml` 中 `default_locale = "en"`、`mode = "fixed"`——**英文为默认界面**；每页静态导出同时打包 en+zh 两份数据供客户端切换（语言偏好存 localStorage）。
- 部署：`.github/workflows/deploy.yml`（build → upload-pages-artifact → deploy-pages，CNAME 由 workflow 复制进产物）。

## 内容约定（重要）

- **出版物按语言拆分**：`site/content/publications.bib`（英文描述）+ `site/content_zh/publications.bib`（中文描述）。PRISM 按 locale 优先读取 `content_zh/` 再回退 `content/`。不要合并为单一共享 bib（会导致英文界面混入中文）。
- **TOML 陷阱**：双引号字符串内禁止 `\*` 等非标准转义——非法转义会使整个 TOML 解析失败，页面在构建时静默变成 notFound（症状：页面 `noindex` 且无内容）。改为 `*`。
- **论文状态词严格**：已发表（含 DOI）/ 已接收 / 在审（注明轮次与进度）/ 在投 / 在研，禁止在接收前写成"已接收"。
- bib 作者字段：`*` = 共同第一作者，`#` = 通讯作者；在研论文作者名单定稿前不写 author 字段，位次用 description 文本表述。
- news 日期格式 `YYYY-MM`（如 `2026-08`）。

## 不可改动项

- **零外部依赖**：全站不得引入 Google Fonts / cdnjs / jsdelivr 等外部资源（大陆访问需求）。此前已移除 PRISM 上游的 `jialeliu.com` 字体 preconnect/preload 与 `@font-face`（`site/src/app/layout.tsx`、`site/src/app/globals.css`），不要恢复。
- **noindex 双锁**：`site/public/robots.txt`（`Disallow: /`）+ `site/src/app/layout.tsx` 的 `generateMetadata` 中 `robots: { index: false, follow: false }`。
- `files/` 目录为本地素材，已 gitignore——不要提交。
