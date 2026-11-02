'use client';
import {useEffect,useRef,useState} from 'react';
import type {GiscusConfig} from '@/lib/giscus';
import {useLanguage} from './language';

const origin='https://giscus.app';
export function GithubComments({slug,config}:{slug:string;config:GiscusConfig|null}){
 const {language}=useLanguage(),en=language==='en',hant=language==='zh-Hant';
 const host=useRef<HTMLDivElement>(null);
 const [state,setState]=useState<'loading'|'ready'|'error'>('loading'),[attempt,setAttempt]=useState(0);
 const repo=config?.repo,repoId=config?.repoId,category=config?.category,categoryId=config?.categoryId;
 useEffect(()=>{
  const container=host.current;if(!container||!repo||!repoId||!category||!categoryId)return;
  const embed=document.createElement('div');embed.className='giscus';container.replaceChildren(embed);
  setState('loading');let active=true;
  const theme=()=>document.documentElement.dataset.theme==='dark'?'dark':'light';
  const locale=language==='en'?'en':language==='zh-Hant'?'zh-TW':'zh-CN';
  const timeout=setTimeout(()=>{if(active)setState('error');},8000);
  const receive=(event:MessageEvent)=>{
   const frame=container.querySelector('iframe');
   if(!active||event.origin!==origin||!frame||event.source!==frame.contentWindow||!event.data||typeof event.data!=='object')return;
   const payload=event.data.giscus;if(!payload||typeof payload!=='object')return;
   if(typeof payload.error==='string'&&!payload.error.includes('Discussion not found')){clearTimeout(timeout);setState('error');}
   else if(payload.resizeHeight>0||payload.discussion||payload.error?.includes('Discussion not found')){clearTimeout(timeout);setState('ready');}
  };
  window.addEventListener('message',receive);
  const observer=new MutationObserver(()=>container.querySelector('iframe')?.contentWindow?.postMessage({giscus:{setConfig:{theme:theme()}}},origin));
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  const script=document.createElement('script');script.src=origin+'/client.js';script.async=true;script.crossOrigin='anonymous';
  Object.assign(script.dataset,{repo,repoId,category,categoryId,mapping:'specific',term:'/posts/'+slug,strict:'1',reactionsEnabled:'1',emitMetadata:'1',inputPosition:'top',theme:theme(),lang:locale,loading:'eager'});
  script.onerror=()=>{if(active){clearTimeout(timeout);setState('error');}};
  container.appendChild(script);
  return()=>{active=false;clearTimeout(timeout);window.removeEventListener('message',receive);observer.disconnect();container.replaceChildren();};
 },[slug,repo,repoId,category,categoryId,language,attempt]);
 return <section className="note-comments" id="comments" aria-labelledby="comments-title" data-comments-provider="giscus">
  <div className="comments-heading"><h2 id="comments-title">{en?'Comments':hant?'評論':'评论'}</h2></div>
  <p className="comment-state">{en?'Sign in with GitHub to join the conversation.':hant?'登入 GitHub 後即可留言。':'登录 GitHub 后即可留言。'}</p>
  {!config?<p className="comment-state" role="status">{en?'Comments are not open yet.':hant?'評論區尚未開放。':'评论区尚未开放。'}</p>:<>
   {state==='loading'&&<p className="comment-state" role="status">{en?'Loading comments…':hant?'正在讀取評論…':'正在读取评论…'}</p>}
   {state==='error'&&<div className="comment-state" role="status"><p>{en?'Comments are unavailable or took too long to load.':hant?'評論區暫未開啟或載入逾時':'评论区暂未开启或加载超时'}</p><button className="text-link" type="button" onClick={()=>setAttempt(value=>value+1)}>{en?'Try again':hant?'重試':'重试'}</button> · <a className="text-link" href={'https://github.com/'+config.repo+'/discussions'} target="_blank" rel="noopener noreferrer">{en?'View on GitHub':hant?'前往 GitHub':'前往 GitHub'}</a></div>}
   <div ref={host}/>
  </>}
 </section>;
}
