import type { Post } from './types';
import { toTraditional } from './traditional';
export type Language = 'zh' | 'zh-Hant' | 'en';
export const english: Record<string, string> = {
  "关于": "About",
  "全部": "All",
  "技术手记": "Technology & methods",
  "创造实验": "Art & sound",
  "思考随笔": "Thoughts & perspectives",
  "生活切片": "City samples",
  "主导航": "Main navigation",
  "文章分类": "Article categories",
  "分钟阅读": "min read",
  "技术": "Engineering",
  "暂时没能打开这一页。": "We could not open this page.",
  "请稍后重试，你的内容仍保存在服务器上。": "Please try again. Your content is still saved on the server.",
  "重新加载": "Try again",
  "复制代码": "Copy code",
  "搜索文章": "Search articles",
  "有些来自推演，有些来自凌晨的窗边。": "Some come from reasoning. Others, from a window before dawn.",
  "记录技术如何运作，也记录生活如何被感受。": "Notes on how technology works, and how everyday life feels.",
  "阅读手记": "Read the journal",
  "还没有公开的手记。": "No public notes yet."
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
