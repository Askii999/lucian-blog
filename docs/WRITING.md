# 写作与内容

## 文章

文章路径：`content/posts/<slug>.md`。文件名采用小写英文、数字和连字符，构成文章固定地址。YAML front matter 必须有开始和结束的 `---`。

| 字段 | 规则 |
| --- | --- |
| title | 必填，最多 160 字符 |
| date | 必填，有效的 `YYYY-MM-DD` 日期 |
| category | 必填，`tech` 或 `life` |
| tags | 必填，字符串数组，最多 20 个，不重复 |
| published | 必填，布尔值 |
| featured | 可选，布尔值，默认 false |
| excerpt | 可选，最多 800 字符 |

正文支持 GFM Markdown、列表、表格、引用、链接和代码块。正文作为内容渲染，不执行 MDX/JS。相对图片放在 `public/images/` 后以 `/images/...` 引用。不要将文章名、摘要等写成 HTML。

代码示例可以放在 fenced code blocks 中。避免提交私钥、密码、个人访问令牌或包含这些内容的截图。公开仓库中的 `published: false` 只是页面不显示，不具有保密效果。

英文稿沿用同一个 slug，放进 `content/translations/en/`，字段结构相同。缺少英文稿时显示中文原文；关于页缺少英文稿时也会显示翻译待更新提示。繁体自动转换可见文字，不改代码块和链接目标。

## 关于页与公开资料

- `content/about.zh.md`：简体正文。
- `content/about.en.md`：可选英文正文。
- `content/profile.json`：作者名、公开简介、公开邮箱、GitHub 主页。
- `content/site-copy.json`：已有页面文案覆盖；revision 为非负整数。

标准标题写作 `## 信箱与索引`。关于页也兼容原来 `##信箱与索引##` 的写法。链接示例：

```markdown
- 代码与痕迹：[GitHub](https://github.com/Askii999)
- 订阅：[/feed.xml](/feed.xml)
```

## 评论

`content/giscus.json` 的 repo/repoId/category/categoryId 均是公开标识，不是密钥。访客登录 GitHub 后由 Giscus 发言，评论存在 `Askii999/blog-comment` 的 Discussions。网站无需保存 GitHub 密码或令牌。

已发布文章的 slug 关联评论映射；修改标题不改变讨论，修改 slug 会改变关联。
