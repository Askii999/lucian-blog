# 参与与友链

欢迎修正问题或提交友链。友链按以下流程申请：

1. Fork 仓库。
2. 新增 `content/friends/<slug>.json`，参考 `examples/friend.json`。
3. 新增对应头像 `public/images/friends/<slug>.png`（也可 JPEG/WebP/AVIF）。请确认你可提供该图片用于友链展示。
4. 运行 `npm ci --ignore-scripts`、`npm run setup:assets`、`npm run validate`。
5. 提交 Pull Request，描述站点即可。

字段：name（≤50字符）、HTTPS url、头像本地路径、description（≤160字符）、order（0–10000整数）。站点地址和名称不得与现有条目重复。头像必须是实际对应格式，≤2MB，不接受 SVG、脚本、外部路径或符号链接。

外部友链申请只允许新增 JSON 和头像；修改现有条目、删除条目或代码修改请由站主评审，勿夹在新增申请中。机器校验检查格式和改动范围，站主判断内容是否合适。

`CODEOWNERS` 指向站主 Askii999。GitHub Auto-merge 需要仓库设置允许，并配合主分支必要检查和站主审核；本项目不提供绕过审核的写权限机器人。部署只由 main 分支受信任提交触发，PR 检查没有服务器凭据。

提交原创代码默认按 MIT 授权；友链资料仅用于展示，不代表你将整个网站、头像或第三方素材按 MIT 授权。不得在 PR 中提交凭据、数据库或私人资料。
