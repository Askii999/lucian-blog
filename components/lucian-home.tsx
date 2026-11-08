'use client';
import {useEffect,useRef,useState} from 'react';
import {useLanguage} from './language';
import {SiteText} from './site-text';
import {explorePhotos} from '@/lib/explore-photos';
import {cleanTag} from '@/lib/journal-index';
import type {Post} from '@/lib/types';
export function LucianHome({posts}:{posts:Post[]}){
 const {language,localize,t}=useLanguage(),en=language==='en',latest=posts[0],post=latest?localize(latest):undefined,photo=explorePhotos[0];
 const desk=useRef<HTMLElement>(null),[play,setPlay]=useState(false),[visible,setVisible]=useState(true);
 useEffect(()=>{let alive=true;let observer:IntersectionObserver|undefined;document.fonts.ready.then(()=>{if(!alive||!desk.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;observer=new IntersectionObserver(entries=>{const active=entries.some(entry=>entry.isIntersecting);setVisible(active);if(active)setPlay(true);},{threshold:.3});observer.observe(desk.current);});return()=>{alive=false;observer?.disconnect();};},[]);
 const excerpt=post?(post.excerpt||post.content.replace(/[#*>`[\]]/g,'').replace(/\s+/g,' ').trim()).slice(0,en?110:36):'';
 return <div className="coral-home">
 <section className="coral-desk-ground" aria-labelledby="welcome-title"><div className="coral-opening container">
  <div className="coral-greeting"><h1 id="welcome-title">{en?<>Notes from<br/>Lucian.</>:<>你好，<br/>这里是 Lucian。</>}</h1><p className="lead"><SiteText text="记录技术如何运作，也记录生活如何被感受。"/></p><div className="coral-actions"><a className="btn btn-primary" href="/blog"><SiteText text="阅读手记"/></a><a className="btn" href="/about">{en?'About Lucian':'关于作者'}</a></div></div>
  <figure ref={desk} className={'coral-desk-scene'+(play?' desk-play':'')+(visible?'':' desk-paused')} aria-label={en?'Journal on the desk':'桌上的手记与索引'}>
   {post&&latest&&<article className="coral-manuscript stock"><div className="manuscript-mast"><span>Lucian</span><span className="coral-published">{en?'Published':'已发布'}</span></div><div className="manuscript-copy"><time className="fig" dateTime={latest.date}>{latest.date.replaceAll('-',' / ')}</time><h2><a href={'/posts/'+latest.slug}>{post.title}</a></h2><p>{excerpt}</p></div><div className="manuscript-tags">{latest.tags.map(tag=><a key={tag} href={'/tags?tag='+encodeURIComponent(cleanTag(tag))}>{t(cleanTag(tag))}</a>)}</div></article>}
   <div className="coral-envelope stock"><div className="envelope-fold" aria-hidden="true"/><div className="glassine"><span>Lucian’s journal</span><span>{en?'Technology & life':'技术与生活'}</span></div><nav className="envelope-index" aria-label={en?'Journal indexes':'手记索引'}><a href="/archives">{en?'Archives':'时间归档'}</a><a href="/tags">{en?'Tags':'标签索引'}</a></nav></div>
   <a className="coral-correspondence stock" href="/explore"><span>{en?'Explore':'探索'}</span><strong>{en?'Photographs. Small experiments.':'照片与一些小实验。'}</strong></a>
  </figure>
 </div></section>
 <section className="coral-journal container" aria-labelledby="recent-heading"><header className="coral-section-heading"><div><h2 id="recent-heading">{en?'The latest notes':'最近的手记'}</h2><p>{en?'On building systems, fragments of reading, and moments taken slowly.':language==='zh-Hant'?'關於系統構建、閱讀切片，以及一些慢下來的時刻。':'关于系统构建、阅读切片，以及一些慢下来的时刻。'}</p></div><a className="text-link" href="/blog">{en?'All notes':'全部手记'}</a></header><div className="coral-index-paper stock">{posts.slice(0,3).map(source=>{const item=localize(source);return <article className="coral-index-row" key={item.slug}><time className="fig" dateTime={source.date}>{source.date.replaceAll('-','.')}</time><div><h3><a href={'/posts/'+source.slug}>{item.title}</a></h3><div className="coral-row-tags">{source.tags.map(tag=><a href={'/tags?tag='+encodeURIComponent(cleanTag(tag))} key={tag}>{t(cleanTag(tag))}</a>)}</div></div><a className="text-link coral-read-note" href={'/posts/'+source.slug}>{en?'Read note':'阅读手记'}</a></article>;})}{!posts.length&&<p><SiteText text="还没有公开的手记。"/></p>}</div></section>
 <section className="coral-explore-band" aria-labelledby="explore-title"><div className="container coral-explore"><div className="coral-explore-copy"><h2 id="explore-title">{en?'Off the page.':'纸页之外。'}</h2><p>{en?'Photographs and small experiments.':'照片与一些小实验。'}</p><a className="btn" href="/explore">{en?'Browse the collection':'浏览探索'}</a></div><figure className="coral-photo"><span className="coral-photo-pin" aria-hidden="true"/><a href="/explore" aria-label={en?'Open photograph collection':'打开照片集'}><img src={'/images/explore/'+photo.file} alt={en?photo.altEn:photo.alt} width={photo.width} height={photo.height} loading="lazy"/></a><figcaption><span>{en?photo.en:photo.zh}</span><a href={photo.url} target="_blank" rel="noopener noreferrer">{photo.credit}</a></figcaption></figure></div></section>
 </div>;
}
