'use client';
import {Rss,Mail} from 'lucide-react';
import {Journal} from './journal';
import {ArchiveTimeline,TagIndex} from './journal-index';
import {collectTags} from '@/lib/journal-index';
import {useLanguage} from './language';
import type {Post} from '@/lib/types';

function Github(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.1c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z"/></svg>;}

export function BlogContent({posts,email,github,view='journal',selectedTag='',initialSection='all'}:{posts:Post[];email:string;github:string;view?:'journal'|'archives'|'tags';selectedTag?:string;initialSection?:string}){
 const {language}=useLanguage(),en=language==='en';
 const tags=collectTags(posts).length;
 return <div className="container reading-layout blog-desk">
  <aside className="author-index" aria-label={en?'Author and indexes':'作者与索引'}>
   <div className="author-identity"><span className="reading-avatar"><img src="/images/lucian-profile-cutout.png" width="112" height="112" alt=""/></span><h2>Lucian</h2><p className="author-caption">{en?'Notes on technology and life':language==='zh-Hant'?'技術與生活手記':'技术与生活手记'}</p></div>
   <nav className="author-counts" aria-label={en?'Journal indexes':'手记索引'}>
    <a href="/archives" aria-current={view==='archives'?'page':undefined}><span>{en?'Posts':'手记'}</span><b className="num">{posts.length}</b></a>
    <a href="/tags" aria-current={view==='tags'?'page':undefined}><span>{en?'Tags':'标签'}</span><b className="num">{tags}</b></a>
   </nav>
   <nav className="author-links" aria-label={en?'Personal links':'个人链接'}>
    {github&&<a href={github} target="_blank" rel="noopener noreferrer"><Github/><span>GitHub</span></a>}
    <a href="/feed.xml"><Rss size={20} aria-hidden="true"/><span>RSS</span></a>
    {email&&<a href={'mailto:'+email}><Mail size={20} aria-hidden="true"/><span>{en?'Email':'邮箱'}</span></a>}
   </nav>
  </aside>
  {view==='archives'?<ArchiveTimeline posts={posts}/>:view==='tags'?<TagIndex posts={posts} selectedTag={selectedTag}/>:<Journal posts={posts} initialSection={initialSection}/>}
 </div>;
}
