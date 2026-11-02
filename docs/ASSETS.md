# 素材来源与授权边界

所有以下素材均不因项目代码采用 MIT 而变为 MIT。不得将来源不明的头像或其他网站图片标为自己的作品。

## 字体

- General Sans：Indian Type Foundry / Fontshare，https://www.fontshare.com/fonts/general-sans 。官方完整下载包带有 ITF Free Font License，已保留在 `public/fonts/coral/FFL.txt`。字体二进制不进入 Git，由 `npm run setup:assets` 从 Fontshare 原始 CDN 下载并校验哈希，供本站自托管使用。
- Geist Mono：Geist Project Authors，SIL OFL 1.1，许可文本为 `public/fonts/coral/OFL-Geist-Mono.txt`。

## 头像

- Lucian 头像：站主提供的人物图经生成工具去背景，原始画作作者和另行授权未在仓库中确认。图片不进 Git，素材下载脚本从站主当前公开网站取得显示版本；本站代码许可不覆盖它。
- dustella 头像：主页 https://www.dustella.net/ ，显示素材 https://img-cdn.dustella.net/markdown/avtr-layer.png 。图片不进 Git，也没有被声明为 MIT 或 CC BY-NC-SA。仅按站主请求用于该站友链展示。
- 新友链头像由提交者提供，并确认可用于友链展示；不得将第三方图像一并作无限制再授权。

若复用本项目，请替换为你有权使用的头像；同时更新对应路径、友链资料和素材清单。

## 照片

照片集保留既有摄影者署名和原始页面链接。许可依据为 Unsplash License：https://unsplash.com/license 。其许可不同于代码 MIT。页面仍展示作者来源，具体清单如下。

- `yClOrbWkm4Y.webp` — Mahdis Mousavi / Unsplash — https://unsplash.com/photos/yClOrbWkm4Y
- `tXxyqjaXvRs.webp` — Stéphane Mingot / Unsplash — https://unsplash.com/photos/tXxyqjaXvRs
- `o1DtfvF4kC4.webp` — Fer Troulik / Unsplash — https://unsplash.com/photos/o1DtfvF4kC4
- `2GKKRXeONCo.webp` — Redd Francisco / Unsplash — https://unsplash.com/photos/2GKKRXeONCo
- `ZrTmrc6_IYc.webp` — Ryo Nagisa / Unsplash — https://unsplash.com/photos/ZrTmrc6_IYc
- `9UobRLY9xZo.webp` — Paulius Dragunas / Unsplash — https://unsplash.com/photos/9UobRLY9xZo
- `kYqO-zK3esU.webp` — Patrick Rosenberger (Schneider) / Unsplash — https://unsplash.com/photos/kYqO-zK3esU
- `8_nGeFzyLuM.webp` — Roel Dierckens / Unsplash — https://unsplash.com/photos/8_nGeFzyLuM
- `poEga0PVyPs.webp` — Miguel Picq / Unsplash — https://unsplash.com/photos/poEga0PVyPs
- `G_TeIjM5ey0.webp` — Bartosz Palus / Unsplash — https://unsplash.com/photos/G_TeIjM5ey0

## 图形与依赖

Coral 的纸张纹理、积木图形和图钉由项目 SVG/CSS 绘制。Lucide 图标、Base UI 等依赖保留各自 npm 包内许可，不由本项目重新授权。

`components/ui/` 的基础模板保留 shadcn/ui 的 MIT 许可，见 `licenses/shadcn-ui-MIT.txt`。
