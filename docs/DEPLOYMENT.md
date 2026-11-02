# 自动发布与服务器接入

## 当前状态

此目录仅准备了新工作流，没有创建 GitHub 远程仓库、配置 Secrets、运行远端安装或切换现有 freeme.fun。自动发布默认关闭（未设置 `DEPLOY_ENABLED=true` 即不执行）。

独立服务约定：`/opt/lucian-blog`、`lucian-blog.service`、`127.0.0.1:3002`。原站的 `/opt/still-blog` 和数据库不参与新发布。

## 1. GitHub 仓库

以 Askii999 创建公开仓库，建议 `lucian-blog`。不要由 GitHub 初始化 README/LICENSE（本地已提供）。本目录自身是一个独立 Git 仓库。确认 `git rev-parse --show-toplevel` 指向本目录再执行：

```sh
git add .
git diff --cached --stat
git commit -m "Prepare file-based Lucian blog"
git remote add origin https://github.com/Askii999/lucian-blog.git
git push -u origin main
```

这些命令由站主在审核待提交文件后执行。本次准备工作未替站主提交或推送。

在 Settings → Actions 中允许仓库自己的工作流；`.github/workflows/check.yml` 执行安装、内容/凭据校验、类型检查、测试、构建和独立运行检查。

## 2. 服务器一次性准备

由服务器管理员执行；不要使用 root 的 SSH 私钥作为部署密钥。

```sh
sudo useradd --create-home --shell /bin/bash blog-deploy
sudo install -d -o blog-deploy -g blog-deploy -m 755 /opt/lucian-blog
sudo install -d -o blog-deploy -g blog-deploy -m 755 /opt/lucian-blog/incoming /opt/lucian-blog/releases
```

为 blog-deploy 安装专用 SSH 公钥。关闭该账号不必要的转发能力，私钥只放 GitHub `production` 环境的 Secret。

服务器安装 Node 24；用 `command -v node` 确认真实路径，将 `deploy/lucian-blog.service.example` 的 ExecStart 调整为该 Node 路径，复制到 `/etc/systemd/system/lucian-blog.service`。

```sh
sudo systemctl daemon-reload
sudo systemctl enable lucian-blog.service
```

不要在首次 release 建立之前手动启动。通过 `sudo visudo -f /etc/sudoers.d/lucian-blog-deploy` 仅授予重启这个服务的能力：

```text
blog-deploy ALL=(root) NOPASSWD: /bin/systemctl restart lucian-blog.service
```

若系统的 systemctl 路径不同，同步修改 sudoers 和 `deploy/remote-release.sh`。不要授予该账号任意 sudo。

## 3. GitHub 配置

创建名为 `production` 的 Environment，配置 Secrets：

| Secret | 内容 |
| --- | --- |
| DEPLOY_HOST | SSH 主机名或公网 IP |
| DEPLOY_USER | blog-deploy |
| DEPLOY_PORT | SSH 端口，留空时 22 |
| DEPLOY_SSH_KEY | 专用部署私钥 |
| DEPLOY_KNOWN_HOSTS | 已通过可信渠道核对的服务器 SSH 主机公钥记录 |

不要从不可信网络临时扫描并无条件接受主机密钥。上述 Secret 不应出现在仓库文件中。可为 production 设置人工审批。

准备完毕后，在仓库 Variables 中设 `DEPLOY_ENABLED=true`。此后 main 分支 push 或手动触发 Deploy 都会先执行完整检查，再构建 Linux 发布包、校验 SHA-256、上传、切换 release 和检查 `/blog`、`/feed.xml`。

工作流不会部署 fork PR 的代码，也不会给 PR 检查服务器凭据。不上传含受限字体的公开 release 资产。Linux 生产包由 Linux runner 构建，勿把 Windows 本地构建产物直接部署到 Linux。

## 4. 验收与切换

首次发布后先通过 SSH 隧道检查 3002 端口页面、文章正文、关于页、友链、RSS、归档/标签、评论及手机布局。原站此时仍可运行。

验收后参考 `deploy/nginx-location.conf.example`，仅将现有 HTTPS server 的上游端口改为 3002，运行 `nginx -t` 后 reload。保留原证书、HTTP→HTTPS 和域名配置，勿整份覆盖现有 Nginx 文件。

## 5. 回退

发布健康检查失败时脚本恢复前一个 current 链接并重启。首发没有旧 release 时不会假称可以回退。

站主可将 `/opt/lucian-blog/current` 指回已知正常 release 并重启服务。版本目录和上传包不自动删除，定期检查磁盘占用。若切回原架构，只需将 Nginx 上游恢复到原服务；本流程没有改动原数据库。

## 6. PR 与自动合并

Settings → General 开启 Allow auto-merge，并为 main 配置必要状态检查 `Check / verify`（以 GitHub 实际显示的名字为准）。建议要求站主审核外部贡献、禁止 force push 和分支删除。

友链新增 PR 必须只增加自己的 JSON 与头像。你审核后可选择 Auto-merge，等待检查通过后自动合并。自己的文章也可通过 GitHub 网页编辑后提交；若设置要求所有提交均经过 PR，按该规则提交并安排合适审核人，勿为了发布绕过规则。

本仓库不包含一个对任意陌生 PR 自动授权/合并的机器人。代码所有者审核和受保护分支由 GitHub 仓库设置落实，尚未建仓时不能验证这些远程设置。
