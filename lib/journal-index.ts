import type {Post} from './types';

export function cleanTag(tag:string){return tag.replace(/^#+\s*/, '').trim();}
export function collectTags(posts:Post[]){
 const counts=new Map<string,number>();
 for(const post of posts)for(const tag of new Set(post.tags.map(cleanTag).filter(Boolean)))counts.set(tag,(counts.get(tag)||0)+1);
 return [...counts].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name,'zh-CN'));
}
export function groupArchive(posts:Post[]){
 const years=new Map<string,Map<string,Post[]>>();
 for(const post of [...posts].sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug))){
  const year=post.date.slice(0,4),month=post.date.slice(5,7);
  if(!years.has(year))years.set(year,new Map());
  const months=years.get(year)!;
  if(!months.has(month))months.set(month,[]);
  months.get(month)!.push(post);
 }
 return [...years].map(([year,months])=>({year,months:[...months].map(([month,posts])=>({month,posts}))}));
}
