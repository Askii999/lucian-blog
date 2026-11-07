'use client';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Globe,Sun,Moon,ChevronDown,Menu} from 'lucide-react';
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from './ui/dialog';
import {useLanguage} from './language';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from './ui/dropdown-menu';
const languages=[['zh','简体中文'],['zh-Hant','繁體中文'],['en','English (United States)']] as const;
function choose(value:string){document.cookie=`still-language=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;location.reload();}
export function SiteHeader({author,initialTheme='light'}:{author:string;initialTheme?:'light'|'dark'}){
 const {language}=useLanguage(),path=usePathname(),en=language==='en';
 const [theme,setTheme]=useState(initialTheme),[open,setOpen]=useState(false),[mobileOpen,setMobileOpen]=useState(false);
 useEffect(()=>{setTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');},[]);
 function toggle(){const next=theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;document.cookie=`still-theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;try{localStorage.setItem('still-theme',next);}catch{}setTheme(next);}
 function category(e:React.MouseEvent<HTMLAnchorElement>,_value:string){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;setOpen(false);setMobileOpen(false);}
 const themeButton=()=> <button type="button" className="theme-switch" role="switch" aria-checked={theme==='dark'} onClick={toggle} aria-label={en?'Dark theme':'深色模式'}><span className="theme-switch-thumb">{theme==='dark'?<Moon size={20}/>:<Sun size={20}/>}</span></button>;
 return <header className={'notes-header lucian-header '+(path==='/'?'header-home':'')}>
  <a className="skip-link" href="#main">{en?'Skip to content':'跳到正文'}</a>
  <div className="notes-header-inner">
   <a className="lucian-brand" href="/">{author}{en?'’s Blog':'的博客'}</a>
   <nav className="brand-desktop-nav" aria-label={en?'Main navigation':'主导航'}>
    <a href="/" aria-current={path==='/'?'page':undefined}>{en?'Home':'主页'}</a>
    <div className="notes-menu" role="group" aria-label={en?'Journal navigation':'手记导航'} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);e.currentTarget.querySelector('button')?.focus();}}}>
     <div className="notes-menu-label"><a href="/blog" onClick={e=>category(e,'all')} aria-current={path?.startsWith('/blog')||path?.startsWith('/posts/')||path==='/archives'||path==='/tags'?'page':undefined}>{en?'Journal':'手记'}</a><button type="button" className="notes-menu-trigger" aria-label={en?'Journal categories':'手记分类'} aria-expanded={open} aria-controls="notes-submenu" onClick={()=>setOpen(true)}><ChevronDown size={16}/></button></div>
     <div id="notes-submenu" className="notes-submenu" hidden={!open}><a href="/blog?category=tech" onClick={e=>category(e,'tech')}>{en?'Technology':'技术'}</a><a href="/blog?category=life" onClick={e=>category(e,'life')}>{en?'Life':'生活'}</a></div>
    </div>
    {[['/explore',en?'Explore':'探索'],['/links',en?'Link':'友链'],['/about',en?'About':'关于']].map(([url,label])=><a key={url} href={url} aria-current={path===url?'page':undefined}>{label}</a>)}
    {themeButton()}
   </nav>
   <div className="brand-mobile-tools">{themeButton()}<Dialog open={mobileOpen} onOpenChange={setMobileOpen}><DialogTrigger className="mobile-nav-trigger" aria-label={en?'Open navigation':'打开导航'}><Menu size={24} aria-hidden="true"/></DialogTrigger><DialogContent className="brand-mobile-menu"><DialogTitle>{author}{en?'’s Blog':'的博客'}</DialogTitle><DialogDescription className="sr-only">{en?'Choose a section':'选择要浏览的栏目'}</DialogDescription><nav aria-label={en?'Mobile navigation':'移动端导航'}>{[['/',en?'Home':'主页'],['/blog',en?'Journal':'手记'],['/explore',en?'Explore':'探索'],['/links',en?'Link':'友链'],['/about',en?'About':'关于']].map(([url,label])=><a key={url} href={url} aria-current={path===url||(url==='/blog'&&['/archives','/tags'].includes(path||''))?'page':undefined} onClick={e=>{setMobileOpen(false);if(url==='/blog')category(e,'all');}}>{label}</a>)}<div className="mobile-categories"><a href="/blog?category=tech" onClick={e=>category(e,'tech')}>{en?'Technology':'技术'}</a><a href="/blog?category=life" onClick={e=>category(e,'life')}>{en?'Life':'生活'}</a></div></nav></DialogContent></Dialog></div>
  </div>
 </header>;
}
export function SiteFooter({author}:{author:string}){
 const {language}=useLanguage(),en=language==='en';
 return <footer className="lucian-footer"><span className="lucian-copyright">© 2026<br/>{en?'The city will light up. The records stay here.':'城市会亮起来。记录留在这里。'}</span><div className="lucian-footer-center"><span>By {author}, Under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0 License</a></span></div><div className="locale-footer"><DropdownMenu modal={false}><DropdownMenuTrigger className="locale-trigger" aria-label="语言 / Language"><Globe size={16}/><span>{languages.find(([value])=>value===language)?.[1]}</span></DropdownMenuTrigger><DropdownMenuContent side="top" align="end" className="locale-options">{languages.map(([value,label])=><DropdownMenuItem key={value} onClick={()=>choose(value)}><span>{label}</span><span>{language===value?'✓':''}</span></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></div></footer>;
}
