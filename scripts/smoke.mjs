import assert from 'node:assert/strict';
import {loadPosts,loadFriends} from '../lib/content-files.mjs';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {resolve} from 'node:path';
import {setTimeout as wait} from 'node:timers/promises';
const socket=createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));
const cwd=resolve('.'),root=process.env.SMOKE_URL||'http://127.0.0.1:'+port;
const child=process.env.SMOKE_URL?null:spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port',String(port)],{cwd,stdio:['ignore','pipe','pipe']});
let log='';child?.stdout.on('data',d=>{log+=d;});child?.stderr.on('data',d=>{log+=d;});
async function read(path,headers){const response=await fetch(root+path,{headers,signal:AbortSignal.timeout(5000)});assert.equal(response.status,200,path);return response.text();}
try{
 let ready=false;for(let i=0;i<40;i++){try{const r=await fetch(root+'/',{signal:AbortSignal.timeout(1000)});if(r.ok){ready=true;break;}}catch{}await wait(200);}assert.ok(ready,log);
 for(const path of ['/','/blog','/archives','/tags','/explore','/links','/about']){const html=await read(path);assert.ok(html.includes('coral-site'),path);assert.ok(!html.includes('filing-placeholder'),path);}
 const posts=await fetch(root+'/api/posts').then(r=>r.json()),expected=loadPosts(resolve(cwd,'content')),friends=loadFriends(resolve(cwd,'content'),resolve(cwd,'public'));assert.deepEqual(posts,expected);
 for(const p of posts){const html=await read('/posts/'+p.slug);assert.ok(html.includes('data-comments-provider="giscus"'));assert.ok(html.includes('note-content'));}
 for(const [category,label]of [['tech','技术'],['life','生活']])assert.ok((await read('/blog?category='+category)).includes('aria-pressed="true">'+label));
 const links=await read('/links');for(const friend of friends){assert.ok(links.includes(friend.avatar));if(friend.avatar.startsWith('/'))assert.equal((await fetch(root+friend.avatar)).status,200);}assert.equal((links.match(/class="neighbour-card stock(?: neighbour-linked)?"/g)||[]).length,Math.max(3,friends.length));
 const about=await read('/about');assert.ok(about.includes('class="about-prose"'));
 for(const [language,tag]of [['en','lang="en-US"'],['zh-Hant','lang="zh-Hant"']])assert.ok((await read('/about',{cookie:'still-language='+language})).includes(tag));
 const explore=await read('/explore');for(const kind of['reading','markdown','palette'])assert.ok(explore.includes('wire-'+kind));
 assert.ok((await read('/feed.xml')).includes('<rss'));const sitemap=await read('/sitemap.xml');assert.ok(sitemap.includes('https://lucian.me.uk/'));for(const post of expected)assert.ok(sitemap.includes('/posts/'+post.slug));
 for(const path of ['/images/lucian-profile-cutout.png','/fonts/coral/general-sans-400.woff2'])assert.equal((await fetch(root+path)).status,200,path);
 assert.equal((await fetch(root+'/admin')).status,404);assert.equal((await fetch(root+'/api/admin',{method:'POST'})).status,410);assert.equal((await fetch(root+'/api/comments',{method:'POST'})).status,410);
 console.log('Smoke passed: Workers content, all routes/locales, categories, three blocks, Giscus mount, fonts/images, admin/anonymous writes disabled.');
}finally{if(child){child.kill();await Promise.race([new Promise(r=>child.once('exit',r)),wait(2000)]);}}
process.exit(0);
