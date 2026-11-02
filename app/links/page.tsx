import {getLanguage} from '@/lib/locale';
import {getFriends} from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata={title:'友链',alternates:{canonical:'/links'}};
export default async function Links(){
 const language=await getLanguage(),en=language==='en',hant=language==='zh-Hant',friends=getFriends();
 return <section className="container neighbours-page">
  <header className="reading-heading"><h1>{en?'Neighbours':hant?'鄰居':'邻居'}</h1><p>{en?'Leave a message and say hello.':hant?'歡迎留言交友。':'欢迎留言交友。'}</p></header>
  <div className="neighbour-grid">{friends.map(friend=><a className="neighbour-card stock" key={friend.id} href={friend.url} target="_blank" rel="noopener noreferrer"><span className="neighbour-avatar has-image" aria-hidden="true"><img src={friend.avatar} width="80" height="80" alt="" loading="lazy"/></span><div><h2>{friend.name}</h2><p>{friend.description}</p></div></a>)}{Array.from({length:Math.max(0,3-friends.length)},(_,index)=><article className="neighbour-card stock" key={'reserved-'+index} aria-label={(en?'Reserved link ':hant?'預留友鏈 ':'预留友链 ')+index}><span className="neighbour-avatar" aria-hidden="true">+</span><div><h2>{en?'Site name':hant?'站點名稱':'站点名称'}</h2><p>{en?'A short introduction':hant?'一句介紹':'一句介绍'}</p></div></article>)}</div>
 </section>;
}
