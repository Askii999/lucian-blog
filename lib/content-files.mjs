import {existsSync,readFileSync,readdirSync,realpathSync,statSync} from 'node:fs';
import {resolve,relative,sep,basename} from 'node:path';
import {parseDocument} from 'yaml';

export const contentRoot=()=>resolve(process.env.CONTENT_DIR||'content');
const slugPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function fail(message){throw new Error(message);}
function object(value,label){if(!value||typeof value!=='object'||Array.isArray(value))fail(label+' must be an object');return value;}
function text(value,label,max=200,empty=false){if(typeof value!=='string'||(!empty&&!value.trim())||value.length>max)fail(label+' is invalid');return value;}
function keys(value,allowed,label){for(const key of Object.keys(value))if(!allowed.includes(key))fail(label+': unknown field '+key);}
function safeFile(root,file){const full=resolve(root,file),actual=realpathSync(full),rel=relative(realpathSync(root),actual);if(rel.startsWith('..'+sep)||rel==='..'||rel.startsWith(sep))fail('Path escapes its content directory');return actual;}
function read(root,file,max=256000){const full=safeFile(root,file);if(!statSync(full).isFile()||statSync(full).size>max)fail('File is too large: '+file);return readFileSync(full,'utf8');}
function json(root,file){return object(JSON.parse(read(root,file)),file);}
function files(root,dir,extension){const base=resolve(root,dir);if(!existsSync(base))return[];return readdirSync(base,{withFileTypes:true}).map(entry=>{if(!entry.isFile()||!entry.name.endsWith(extension))fail('Unexpected entry: '+dir+'/'+entry.name);return dir+'/'+entry.name;}).sort();}
function https(value,label){text(value,label,400);let url;try{url=new URL(value);}catch{fail(label+' must be a URL');}if(url.protocol!=='https:'||url.username||url.password)fail(label+' must use HTTPS without credentials');return value;}
export function parsePost(markdown,slug){
 if(!slugPattern.test(slug))fail('Invalid post slug: '+slug);
 const match=markdown.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
 if(!match)fail(slug+': expected YAML front matter between --- lines');
 const document=parseDocument(match[1],{schema:'core',uniqueKeys:true,strict:true});
 if(document.errors.length||document.warnings.length)fail(slug+': invalid YAML');
 const meta=object(document.toJS({maxAliasCount:0}),slug);
 keys(meta,['title','date','category','tags','excerpt','published','featured'],slug);
 text(meta.title,slug+'.title',160);text(meta.date,slug+'.date',10);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)||!Number.isFinite(Date.parse(meta.date+'T00:00:00Z'))||new Date(meta.date+'T00:00:00Z').toISOString().slice(0,10)!==meta.date)fail(slug+': invalid calendar date');
 if(!['tech','life'].includes(meta.category))fail(slug+': category must be tech or life');
 if(!Array.isArray(meta.tags)||meta.tags.length>20||new Set(meta.tags).size!==meta.tags.length)fail(slug+': tags must be a unique array');
 meta.tags.forEach(tag=>text(tag,slug+'.tag',40));text(meta.excerpt??'',slug+'.excerpt',800,true);
 if(typeof meta.published!=='boolean'||(meta.featured!==undefined&&typeof meta.featured!=='boolean'))fail(slug+': published/featured must be boolean');
 if(match[2].length>200000||!match[2].trim())fail(slug+': empty or oversized body');
 return{slug,title:meta.title,date:meta.date,category:meta.category==='tech'?'技术手记':'生活切片',tags:meta.tags,excerpt:meta.excerpt||'',published:meta.published,featured:meta.featured||false,sample:false,content:match[2].replace(/\n$/,'')};
}
export function loadPosts(root=contentRoot(),all=false){
 const posts=files(root,'posts','.md').map(file=>{const slug=basename(file,'.md'),post=parsePost(read(root,file),slug),translation='translations/en/'+slug+'.md';if(existsSync(resolve(root,translation))){const en=parsePost(read(root,translation),slug);if(en.published)post.english={title:en.title,excerpt:en.excerpt,content:en.content};}return post;});
 for(const file of files(root,'translations/en','.md'))if(!posts.some(post=>post.slug===basename(file,'.md')))fail('Orphan English translation: '+file);
 return posts.filter(post=>all||post.published).sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug));
}
export function loadProfile(root=contentRoot()){
 const p=json(root,'profile.json');keys(p,['author','intro','introEn','email','github'],'profile');text(p.author,'author',40);text(p.intro,'intro',800,true);text(p.email,'email',160);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))fail('Invalid public email');https(p.github,'GitHub profile');
 if(!/^https:\/\/github\.com\/[\w-]+\/?$/.test(p.github))fail('Invalid GitHub profile URL');
 if(p.introEn!==undefined)text(p.introEn,'introEn',800,true);
 return{...p,about:read(root,'about.zh.md'),aboutEn:existsSync(resolve(root,'about.en.md'))?read(root,'about.en.md'):undefined};
}
export function loadFriends(root=contentRoot(),publicRoot=resolve('public')){
 const friends=files(root,'friends','.json').map(file=>{
  if(!slugPattern.test(basename(file,'.json')))fail('Invalid friend filename');
  const f=json(root,file);keys(f,['name','url','avatar','description','order'],file);text(f.name,'friend name',50);text(f.description,'friend description',160,true);https(f.url,'friend URL');
  if(!Number.isInteger(f.order)||f.order<0||f.order>10000)fail('Invalid friend order');
  text(f.avatar,'friend avatar',180);if(!/^\/images\/friends\/[a-z0-9-]+\.(png|jpe?g|webp|avif)$/.test(f.avatar))fail('Avatar must be a local raster under /images/friends/');
  const image=safeFile(publicRoot,f.avatar.slice(1));if(statSync(image).size>2*1024*1024)fail('Avatar exceeds 2 MB');
  const bytes=readFileSync(image),ext=f.avatar.split('.').pop();
  if(ext==='png'&&!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))fail('Avatar is not a PNG');
  if(['jpg','jpeg'].includes(ext)&&!(bytes[0]===255&&bytes[1]===216&&bytes[2]===255))fail('Avatar is not JPEG');
  if(ext==='webp'&&!(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP'))fail('Avatar is not WebP');
  if(ext==='avif'&&!bytes.toString('ascii',4,24).includes('avif'))fail('Avatar is not AVIF');
  return{...f,id:basename(file,'.json')};
 });
 for(const field of ['url','name'])if(new Set(friends.map(f=>field==='url'?new URL(f.url).href:f.name.toLowerCase())).size!==friends.length)fail('Duplicate friend '+field);
 return friends.sort((a,b)=>a.order-b.order||a.id.localeCompare(b.id));
}
export function loadSiteCopy(root=contentRoot()){
 const copy=json(root,'site-copy.json');if(!Number.isInteger(copy.revision)||copy.revision<0)fail('Invalid copy revision');object(copy.entries,'copy entries');
 for(const entry of Object.values(copy.entries)){object(entry,'copy entry');for(const value of Object.values(entry))text(value,'copy value',20000,true);}
 return copy;
}
export function validateContent(root=contentRoot(),publicRoot=resolve('public')){const posts=loadPosts(root,true),friends=loadFriends(root,publicRoot);loadProfile(root);loadSiteCopy(root);return{posts:posts.length,published:posts.filter(p=>p.published).length,friends:friends.length};}
