'use client';
import {useEffect,useState} from 'react';
import {Search} from 'lucide-react';
import type {Post} from '@/lib/types';
import {postSection} from '@/lib/post-section';
import {useLanguage} from './language';

export function ArticleRow({post:source}:{post:Post;index?:number}){
 const {localize}=useLanguage(),post=localize(source);
 return <a className="note-entry" href={'/posts/'+post.slug} data-edit-post={post.slug}>
  <div className="entry-copy"><h2>{post.title}</h2>{post.tags.length>0&&<div className="note-tags">{post.tags.map(tag=><span key={tag}>{tag.replace(/^#+\s*/, '')}</span>)}</div>}</div>
  <time className="entry-date num" dateTime={post.date}>{post.date.replaceAll('-','.')}</time>
 </a>;
}

export function Journal({posts,initialSection='all'}:{posts:Post[];initialSection?:string}){
 const {language,localize}=useLanguage(),en=language==='en';
 const [query,setQuery]=useState(''),[section,setSection]=useState(initialSection),[limit,setLimit]=useState(5);
 useEffect(()=>{
  const sync=()=>{const value=new URLSearchParams(location.search).get('category');setSection(value==='tech'||value==='life'?value:'all');setLimit(5);};
  sync();window.addEventListener('popstate',sync);
  return()=>window.removeEventListener('popstate',sync);
 },[]);
 function chooseSection(value:string){setSection(value);setLimit(5);const url=new URL(location.href);if(value==='all')url.searchParams.delete('category');else url.searchParams.set('category',value);history.pushState(null,'',url.pathname+url.search+url.hash);}
 const filtered=[...posts].sort((a,b)=>b.date.localeCompare(a.date)).filter(post=>(section==='all'||postSection(post)===section)&&[post.title,post.content,post.english?.title,post.english?.content,...post.tags,localize(post).title].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <section className="notes-page journal-page" aria-labelledby="journal-title">
  <h1 id="journal-title" className="sr-only">{en?'Journal':'手记'}</h1>
  <div className="journal-controls">
   <div className="journal-tabs" aria-label={en?'Post categories':'文章分类'}>{[['all',en?'All':'全部'],['tech',en?'Technology':'技术'],['life',en?'Life':'生活']].map(([value,label])=><button type="button" key={value} aria-pressed={section===value} onClick={()=>chooseSection(value)}>{label}</button>)}</div>
   <div className="notes-search"><Search size={20} aria-hidden="true"/><input type="search" value={query} onChange={event=>{setQuery(event.target.value);setLimit(5);}} aria-label={en?'Search articles':'搜索文章'} placeholder={en?'Search articles':'搜索文章'}/></div>
  </div>
  <div className="notes-list" id="notes-results" aria-live="polite">{filtered.slice(0,limit).map(post=><ArticleRow key={post.slug} post={post}/>)}</div>
  {filtered.length>limit&&<button type="button" className="notes-more" aria-controls="notes-results" onClick={()=>setLimit(value=>value+5)}>{en?'Show more':'展开更多'}</button>}
 </section>;
}
