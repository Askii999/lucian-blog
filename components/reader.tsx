'use client';
import type {Post} from '@/lib/types';
import {useLanguage} from './language';
import {Markdown} from './markdown';
import {readingMinutes} from '@/lib/types';
import type {GiscusConfig} from '@/lib/giscus';
import {GithubComments} from './github-comments';

export function Reader({post:source,giscus}:{post:Post;related:Post[];author:string;giscus:GiscusConfig|null}){
 const {language,localize}=useLanguage(),post=localize(source),en=language==='en';
 return <div className="container note-reader">
  <header className="note-title"><h1 data-edit-post={post.slug}>{post.title}</h1>
   <div className="note-meta"><div className="note-meta-summary"><time className="num" dateTime={post.date}>{post.date.replaceAll('-','.')}</time><span><span className="num">{readingMinutes(post.content)}</span> {en?'min read':'分钟阅读'}</span></div>
   <div className="note-meta-tags">{source.tags.map((tag,index)=><a key={tag} href={'/tags?tag='+encodeURIComponent(tag.replace(/^#+\s*/, '').trim())}>{post.tags[index].replace(/^#+\s*/, '')}</a>)}</div></div>
  </header>
  <article className="note-content" data-edit-post={post.slug}><Markdown content={post.content}/></article>
  <GithubComments slug={post.slug} config={giscus}/>
 </div>;
}
