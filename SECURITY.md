# 安全与私有资料

可提交：应用源码、Markdown 正文、公开作者信息、友链、Giscus 公开 ID、校验和部署模板。

不可提交：SSH/SSL 私钥、GitHub token、真实 `.env`、管理员密码、auth.json、SQLite/WAL/SHM、备份、证书压缩包、npm 缓存和本地审计材料。

`.gitignore` 只是避免误加入，不会清除已经提交的历史。提交前运行 `npm run check:secrets` 并检查 `git diff --cached`。若凭据曾公开，删除文件不能使凭据失效，需要在相应平台更换；本次新仓库没有继承 D:/project 的 Git 历史。

扫描器检测常见私钥/令牌模式及敏感文件名，不代表能发现所有形式的秘密。公开邮箱和 Giscus 的 repo/repoId/categoryId 是公开配置，不属于认证凭据。

文件模式不需要生产数据库或 admin 认证，原服务器私有资料留在原位置。本站不执行文章中的 MDX、HTML 脚本或 YAML 自定义代码标签。

发现问题请先联系站主的公开邮箱；不要在公开 Issue 中贴密钥或私人数据。
