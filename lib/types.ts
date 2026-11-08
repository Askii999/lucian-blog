export const categories = [
  '技术手记',
  '创造实验',
  '思考随笔',
  '生活切片',
] as const;
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  date: string;
  published: boolean;
  featured: boolean;
  sample: boolean;
  english?: { title: string; excerpt: string; content: string };
};
export type Settings = {
  author: string;
  intro: string;
  email: string;
  github: string;
  about: string;
  introEn?: string;
  aboutEn?: string;
};
export function readingMinutes(content: string) {
  return Math.max(
    1,
    Math.ceil(content.replace(/[#*`>[\]()]/g, '').length / 380),
  );
}

export type Friend={name:string;avatar:string;link:string;desc:string};
