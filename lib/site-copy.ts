import { experimentCopy } from './experiment-copy';
import { editorialCopy } from './editorial-copy';
import { english, type Language } from './translations';
import { extraCopy } from './site-copy-extra';
import { toTraditional } from './traditional';

// Stable source strings are keys. Editing a label never changes routes or category IDs.
export const copyDefaults: Record<string, { zh: string; en: string }> = Object.fromEntries(
  Object.entries({ ...english, ...extraCopy, ...experimentCopy }).map(([zh, en]) => [zh, { zh, en }]),
);
copyDefaults['网站标题'] = { zh: '未尽 STILL — 以理性，测量星辰。以想象，抵达远方。', en: 'STILL — With reason, we measure the stars. With wonder, we travel beyond.' };
copyDefaults['网站描述'] = { zh: '未尽 STILL：一个关于技术、创造与日常思考的个人空间。记录过程，分享探索，让想法慢慢生长。', en: 'A personal journal of technology, creativity, and everyday reflections. Record the process. Keep exploring.' };
Object.assign(copyDefaults, editorialCopy);
Object.assign(copyDefaults,Object.fromEntries(Object.entries({
 '你好，我是 Lucian。':'Hello! I’m Lucian.',
 '写代码，也记录生活。':'Writing code. Recording life.',
 '这里收集学习中的问题、动手做的小事，以及一些不想忘记的日常。':'Questions from learning, things made by hand, and everyday moments worth keeping.',
 '往下看看我的手记':'Explore my journal',
 '保持好奇，慢慢记录。':'Stay curious. Keep a journal.',
 '计算机学习者。关心技术怎样运作，也关心生活里微小而具体的感受。':'A student of computing, curious about how technology works and the small details of everyday life.',
}).map(([zh,en])=>[zh,{zh,en}])));
Object.assign(copyDefaults, Object.fromEntries(Object.entries({
  '阅读导航':'Reading navigation',
  '关于作者':'About the author',
  '按主题阅读':'Read by topic',
  '订阅更新':'Follow the journal',
  '通过 RSS 阅读新文章，让更新来到你的阅读器。':'Subscribe via RSS to receive new posts in your reader.',
}).map(([zh,en])=>[zh,{zh,en}])));
Object.assign(copyDefaults,Object.fromEntries(Object.entries({
 '个人手记':'A PERSONAL JOURNAL',
 '你好，':'Hello,',
 '这里是 Lucian。':'this is Lucian.',
 '记录技术如何运作，也记录生活如何被感受。':'Notes on how technology works, and how everyday life feels.',
 '阅读手记':'Read the journal',
 '认识一下':'About me',
 '最近的手记':'Recently written',
 '全部手记':'All notes',
 '还没有公开的手记。':'No public notes yet.',
}).map(([zh,en])=>[zh,{zh,en}])));
export type CopyEntries = Record<string, { zh: string; en: string }>;
export type CopyDocument = { revision: number; entries: CopyEntries };
export function copyText(key: string, language: Language, entries: CopyEntries = {}) {
  const script = language === 'en' ? 'en' : 'zh';
  const text = entries[key]?.[script] ?? copyDefaults[key]?.[script] ?? key;
  return language === 'zh-Hant' ? toTraditional(text) : text;
}
export function validCopy(entries: unknown): entries is CopyEntries {
  return !!entries && typeof entries === 'object' && !Array.isArray(entries) &&
    Object.entries(entries).every(([key, value]) =>
      Object.hasOwn(copyDefaults, key) && value && typeof value === 'object' &&
      Object.keys(value).length === 2 &&
      ['zh', 'en'].every(lang => typeof value[lang] === 'string' && value[lang].trim().length > 0 && value[lang].length <= 4000));
}
