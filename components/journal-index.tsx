'use client';
import {useLanguage} from './language';
import {SiteText} from './site-text';
import {ArticleRow} from './journal';
import {collectTags,cleanTag,groupArchive} from '@/lib/journal-index';
import type {Post} from '@/lib/types';

export function ArchiveTimeline({posts}:{posts:Post[]}){
 const {language,localize}=useLanguage(),en=language==='en';
 return <section className="notes-page archive-page" aria-labelledby="archive-title">
  <header className="reading-heading"><h1 id="archive-title">{en?'Archives':'归档'}</h1><p><SiteText text="有些来自推演，有些来自凌晨的窗边。"/></p></header>
  <div className="archive-timeline">{groupArchive(posts).map(({year,months})=><section className="archive-year" key={year} aria-labelledby={'year-'+year}>
   <h2 id={'year-'+year} className="num">{year}</h2>
   <div className="archive-months">{months.map(({month,posts:entries})=><section className="archive-month" key={month} aria-label={year+'-'+month}>
    <h3>{en?new Intl.DateTimeFormat('en-US',{month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2000,Number(month)-1,1))):Number(month)+'月'}</h3>
    <ol>{entries.map(post=><li key={post.slug}><a href={'/posts/'+post.slug} data-edit-post={post.slug}><time className="num" dateTime={post.date}>{post.date.slice(5).replace('-','.')}</time><span>{localize(post).title}</span></a></li>)}</ol>
   </section>)}</div>
  </section>)}</div>
  {!posts.length&&<p className="notes-empty">{en?'No public notes yet.':'还没有公开的手记。'}</p>}
 </section>;
}

export function TagIndex({posts,selectedTag=''}:{posts:Post[];selectedTag?:string}){
 const {language,t}=useLanguage(),en=language==='en',tags=collectTags(posts),selected=cleanTag(selectedTag);
 const matching=selected?posts.filter(post=>post.tags.some(tag=>cleanTag(tag)===selected)):[];
 return <section className="notes-page tags-page" aria-labelledby="tags-title">
  <header className="reading-heading"><h1 id="tags-title">{en?'Tags':'标签'}</h1></header>
  <nav className="tag-cloud" aria-label={en?'All article tags':'所有文章标签'}>{tags.map(tag=><a key={tag.name} href={'/tags?tag='+encodeURIComponent(tag.name)} aria-current={selected===tag.name?'page':undefined}><span>{t(tag.name)}</span><span className="tag-frequency num" aria-label={tag.count+(en?' notes':' 篇手记')}>{tag.count}</span></a>)}</nav>
  {!tags.length&&<p className="notes-empty">{en?'No tags yet.':'还没有标签。'}</p>}
  {selected&&<section className="tag-results" aria-labelledby="tag-results-heading"><header><h2 id="tag-results-heading">{t(selected)}</h2><a href="/tags">{en?'All tags':'全部标签'}</a></header><div className="notes-list">{matching.map(post=><ArticleRow key={post.slug} post={post}/>)}{!matching.length&&<p className="notes-empty">{en?'No articles found.':'没有找到文章。'}</p>}</div></section>}
 </section>;
}
