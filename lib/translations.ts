import type { Post } from './types';
import { toTraditional } from './traditional';
export type Language = 'zh' | 'zh-Hant' | 'en';
export const english: Record<string, string> = {
  钴蓝玻璃与银色金属交织的环形雕塑:
    'An orbital sculpture of cobalt glass and silver metal',
  首页: 'Home',
  文章: 'Journal',
  实验室: 'Lab',
  关于: 'About',
  全部: 'All',
  技术手记: 'Engineering',
  创造实验: 'Experiments',
  思考随笔: 'Reflections',
  生活切片: 'Everyday',
  '保持好奇。': 'Stay curious.',
  '以理性，测量星辰。': 'With reason, we measure the stars.',
  '以想象，抵达远方。': 'With wonder, we travel beyond.',
  '让思考，继续发生。': 'Keep the ideas moving.',
  '技术、创造，以及日常的切片。': 'Technology, creation, and everyday life.',
  '在这里，记录那些尚未完成的探索。':
    'Notes from explorations still in progress.',
  向下探索: 'Explore below',
  '独立思考 · 持续构建': 'THINK INDEPENDENTLY. KEEP BUILDING.',
  精选文章: 'FEATURED STORY',
  最近的记录: 'Latest entries',
  全部归档: 'Explore the archive',
  '想法不止于文字。': 'Ideas beyond the page.',
  '把抽象变成可以触碰、可以尝试的小实验。':
    'Small experiments that make abstract ideas tangible.',
  走进实验室: 'Enter the lab',
  '有些想法，': 'Some ideas',
  '值得慢慢生长。': 'deserve time to grow.',
  关于这个空间: 'About this space',
  寻找一个想法: 'Find an idea',
  '搜索标题、正文或标签。按 Esc 关闭。':
    'Search titles, articles, or tags. Press Esc to close.',
  '输入关键词，例如：设计、学习…': 'Try a keyword: design, learning…',
  '没有找到相关内容，换个关键词试试。':
    'No matching ideas yet. Try another keyword.',
  '正在读取文章…': 'Loading the journal…',
  '读取失败，请关闭后重试。': 'Unable to load articles. Close and try again.',
  篇文章: 'articles',
  我的收藏: 'Bookmarks',
  阅读收藏: 'Bookmarks',
  '关于 ↗': 'About ↗',
  跳至主要内容: 'Skip to main content',
  主导航: 'Main navigation',
  '搜索文章 Ctrl K': 'Search articles, Ctrl K',
  搜索关键词: 'Search keywords',
  关闭搜索: 'Close search',
  切换深色主题: 'Switch to dark theme',
  切换浅色主题: 'Switch to light theme',
  返回顶部: 'Back to top',
  '未尽 STILL 首页': 'STILL home',
  '所有文字，皆有来处。': 'Every note has a beginning.',
  '随时回来，接着上一次的思考。':
    'Come back whenever you like. Pick up a thought where you left it.',
  搜索归档: 'Search the archive',
  '搜索标题、正文和标签': 'Search titles, articles, and tags',
  文章排序: 'Sort articles',
  最新在前: 'Newest first',
  最早在前: 'Oldest first',
  收藏: 'Save',
  文章分类: 'Article categories',
  '还没有符合条件的收藏。打开一篇文章，点击收藏即可保存在此浏览器。':
    'No matching bookmarks. Open an article and save it to this browser.',
  '没有匹配的文章，试着调整分类或搜索词。':
    'No matching articles. Try another category or keyword.',
  查看全部文章: 'View all articles',
  继续阅读: 'Read more',
  篇记录: 'entries',
  '文字有尽，探索未尽。': 'The page ends. The exploration continues.',
  返回所有文章: 'Back to the journal',
  分钟阅读: 'min read',
  文字与探索: 'Words & explorations',
  示例文章: 'Sample article',
  文章目录: 'On this page',
  已收藏: 'Saved',
  分享: 'Share',
  标准字号: 'Standard type',
  增大字号: 'Larger type',
  专注阅读: 'Focus mode',
  '— 本文完 —': '— END OF NOTE —',
  已加入阅读收藏: 'Saved to bookmarks',
  '收藏，留待重读': 'Save for another reading',
  留下一点想法: 'Leave a thought',
  '友善交流。留言将在审核后公开，请勿填写私人信息。':
    'Keep it kind. Comments appear after review. Do not include private information.',
  怎么称呼你: 'Your name',
  昵称: 'Display name',
  你的想法: 'Your thoughts',
  '关于这篇文章，你想补充些什么？':
    'What would you like to add to this article?',
  '提交中…': 'Sending…',
  提交留言: 'Send comment',
  '沿着这个想法，继续。': 'Follow the thought.',
  已取消收藏: 'Bookmark removed',
  已收藏到此浏览器: 'Saved to this browser',
  '浏览器存储不可用，无法保存收藏':
    'Browser storage is unavailable. Unable to save.',
  文章链接已复制: 'Article link copied',
  请复制浏览器地址栏中的链接: 'Please copy the link from your address bar',
  '留言暂时无法读取，请稍后刷新。':
    'Comments could not be loaded. Please refresh later.',
  '留言已提交，审核后将显示在这里。':
    'Your comment was submitted and will appear after review.',
  '提交失败，请稍后重试': 'Unable to send. Please try again.',
  请求来源无效: 'Invalid request origin',
  '昵称 1–30 字，留言 2–1000 字':
    'Use 1–30 characters for your name and 2–1000 for your comment.',
  '提交频繁，请稍后再试': 'Too many requests. Please try again later.',
  '不急着定义，': 'Leave room for change.',
  '保持生长。': 'Keep becoming.',
  持续关注: 'Ongoing interests',
  技术: 'Engineering',
  '把问题拆开，让理解落地。':
    'Break problems down. Make understanding concrete.',
  创造: 'Making',
  '通过动手，给想法一个形状。': 'Give ideas a shape by making something.',
  思考: 'Thinking',
  '保持提问，也保持修正的能力。':
    'Keep questioning. Keep the freedom to revise.',
  日常: 'Everyday',
  '给生活中的细节留一点注意力。': 'Leave some attention for the small things.',
  '在下一次更新里，再见。': 'See you in the next note.',
  '通过 RSS 订阅，直接在你喜欢的阅读器里接收新文章。':
    'Subscribe with RSS and receive new articles in your favorite reader.',
  写封邮件: 'Send an email',
  '订阅 RSS': 'Subscribe via RSS',
  '把好奇心，': 'Turn curiosity',
  '变成可触碰的东西。': 'into something tangible.',
  '一些小工具，一些未尽的可能。点击卡片，直接开始实验。':
    'Small tools and unfinished possibilities. Pick a card and try something.',
  文字的时间: 'The time in words',
  从纯文本到文章: 'From text to article',
  一个空间的颜色: 'The colors of a space',
  '一篇文章，需要读多久？探索文字长度与阅读节奏之间的关系。':
    'How long does an article take to read? Explore length and reading pace.',
  '写一点 Markdown，即时看见文字、列表和代码如何组成页面。':
    'Write Markdown and watch words, lists, and code turn into a page.',
  '切换色彩组合，观察阅读氛围的变化，带走一份可用的配色。':
    'Explore palettes, see the atmosphere change, and take the colors with you.',
  开始探索: 'Start exploring',
  '持续实验中。新的想法会在这里慢慢出现。':
    'Work in progress. More ideas will find their way here.',
  关闭实验: 'Close experiment',
  '估算仅供参考，代码和图表可能需要更多阅读时间。':
    'This is an estimate. Code and diagrams may need more reading time.',
  '只在当前页面预览，不会发布到博客。':
    'A local preview only. This does not publish to the blog.',
  '选择一组配色，点击色块复制色值，或下载 CSS。':
    'Choose a palette, click a color to copy it, or download the CSS.',
  待估算的文字: 'Text to measure',
  '阅读速度：': 'Reading speed:',
  '字符 / 分钟': 'characters / minute',
  非空白字符: 'Characters without spaces',
  预计分钟: 'Estimated minutes',
  段落: 'Paragraphs',
  'Markdown 编辑器': 'Markdown editor',
  '未尽 · 钴蓝': 'STILL · Cobalt',
  '深海 · 青绿': 'Deep sea · Teal',
  '余温 · 赤陶': 'Afterglow · Terracotta',
  '下载配色 CSS': 'Download palette CSS',
  请手动复制色值: 'Please copy the color value manually',
  '已复制 ': 'Copied ',
  '这页故事，': 'This story',
  '还没有写下。': 'has not been written yet.',
  '文章可能尚未发布，或地址已经改变。':
    'The article may be unpublished, or its address may have changed.',
  回到首页: 'Back home',
  '暂时没能打开这一页。': 'We could not open this page.',
  '请稍后重试，你的内容仍保存在服务器上。':
    'Please try again. Your content is still saved on the server.',
  重新加载: 'Try again',
  复制代码: 'Copy code',
  创作: 'Making',
  设计: 'Design',
  界面: 'Interface',
  交互: 'Interaction',
  学习方法: 'Learning',
  笔记: 'Notes',
  系统设计: 'System design',
  工程: 'Engineering',
  长期主义: 'Long-term thinking',
  写作: 'Writing',
  观察: 'Observation',
  个人网站: 'Personal web',
  知识管理: 'Knowledge',
};
export function translate(text: string, language: Language) {
  return language === 'en' ? (english[text] ?? text) : language === 'zh-Hant' ? toTraditional(text) : text;
}
export function localPost(p: Post, language: Language): Post {
  if (language === 'zh-Hant') return { ...p, title: toTraditional(p.title), excerpt: toTraditional(p.excerpt), category: toTraditional(p.category), tags: p.tags.map(toTraditional) };
  if (language !== 'en') return p;
  const en = p.english;
  return {
    ...p,
    ...(en?.title && en?.content
      ? { title: en.title, excerpt: en.excerpt, content: en.content }
      : {}),
    category: translate(p.category, language),
    tags: p.tags.map((t) => translate(t, language)),
  };
}
