# Lucian的博客

个人博客 [freeme.fun](https://www.freeme.fun/)。以 **Coral** 视觉风格呈现技术与生活手记，保留照片集、三个积木实验、归档、标签、语言及深浅色切换。

本站采用 **Git 管理内容**：文章写 Markdown，友链写 JSON，主分支通过检查后可由 GitHub Actions 部署到自己的云服务器。GitHub 登录评论由 Giscus / GitHub Discussions 提供。

## 本地运行

需要 Node.js **24.x** 和 npm。Windows PowerShell、Linux 均可：

```sh
npm ci --ignore-scripts
npm run setup:assets
npm run dev
```

访问终端显示的本地地址（默认 `http://127.0.0.1:3000`）。

`setup:assets` 从原始来源下载字体和站点头像，并校验 SHA-256。General Sans 和两个头像不进入 Git；下载表示你按相应来源的许可为本站使用这些素材。字体许可见 `public/fonts/coral/FFL.txt`，素材说明见 [docs/ASSETS.md](docs/ASSETS.md)。使用自己的头像时，请同时更新引用和素材配置。

## 写文章

在 `content/posts/` 新建 `文章标识.md`，文件名只能使用小写英文、数字和连字符。例如：

```markdown
---
title: 从一个小系统开始
date: 2026-11-02
category: tech
tags: [Linux, 网络]
excerpt: 一次小系统的搭建记录。
published: false
featured: false
---

## 正文

从这里开始写。
```

- `category` 为 `tech` 或 `life`，对应手记页技术、生活分类。
- `published: false` 不进入公开列表、文章详情、RSS 和站点地图。公开仓库中的草稿文件仍可被任何人读取；私密草稿不要提交。
- 发布时改为 `published: true`，提交到 `main`。已启用部署时，检查通过后自动上线。
- 已发布文章不要随意改文件名，文件名决定 `/posts/<标识>` 地址和对应评论讨论。
- 英文稿放在 `content/translations/en/<相同标识>.md`；繁体由现有转换逻辑处理。

完整字段、关于页编辑及图片用法见 [docs/WRITING.md](docs/WRITING.md)。

## 申请友链

Fork 本仓库，新增 `content/friends/<站点标识>.json`：

```json
{
  "name": "你的名字",
  "url": "https://example.com/",
  "avatar": "/images/friends/example.png",
  "description": "一句介绍",
  "order": 10
}
```

把对应 PNG/JPEG/WebP/AVIF 头像放到 `public/images/friends/`，文件不超过 2 MB。仅提交这两个文件，不修改代码、依赖或工作流。校验通过、站主审核同意后即可合并；可在 GitHub 中启用 Auto-merge，等待检查和审核通过后自动合并。详情见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 检查与构建

```sh
npm run check:secrets
npm run validate
npm run typecheck
npm run lint
npm test
npm run build
node scripts/smoke.mjs
```

生产运行：

```sh
cd dist/standalone
node server.js
```

构建结果包含独立运行依赖、公开素材和 `content/`。可通过 `PORT`、`HOST` 调整监听。动态页面每次请求读取内容文件，修改文件后刷新即可看到；通过 Git 发布时由完整 release 替换内容。

## 目录

```text
app/                     页面、路由和兼容跳转
app/coral/               当前启用的 Coral 样式与设计变量
components/              页面与交互组件
lib/content-files.mjs    内容读取、字段与路径校验
lib/content.ts           页面使用的内容接口
content/posts/           Markdown 文章
content/friends/         友链 JSON
content/about.*.md       关于页
content/profile.json     公开作者资料
content/site-copy.json   页面文案覆盖
content/giscus.json      Giscus 公开配置标识
public/                  字体、照片、图标与纹理
scripts/                 校验、素材获取、构建打包和冒烟检查
.github/workflows/       PR 检查与可选自动部署
deploy/                  新版部署模板
```

`/blog`、`/archives`、`/tags` 保持独立。旧 admin 不再写入内容，`/admin` 返回 404，旧管理写接口返回 410。新版本没有 SQLite、管理员密码或 SSH 隧道依赖。

## 部署

自动部署默认关闭。新建 GitHub 仓库后，按 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) 配置专用账号、Secrets、环境和 `DEPLOY_ENABLED`。

模板首先部署到 `/opt/lucian-blog`、本机端口 `3002`，与原站分开。完成验收后再调整现有 Nginx 上游，证书和域名无需重建。发布包校验 SHA-256，使用版本目录与符号链接切换，健康检查失败时回到上一版本。

## 许可

- 原创代码与项目文档：[MIT](LICENSE)。
- Lucian 原创文章和关于页：[CC BY-NC-SA 4.0](content/LICENSE.md)。
- 第三方照片、字体、头像和依赖沿用各自授权，不被 MIT 或文章许可覆盖。

具体范围见 [NOTICE.md](NOTICE.md)，素材来源见 [docs/ASSETS.md](docs/ASSETS.md)。
