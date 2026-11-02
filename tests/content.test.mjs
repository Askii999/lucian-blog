import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join,dirname,basename,resolve} from 'node:path';
import test from 'node:test';
import {parsePost,loadPosts,loadFriends} from '../lib/content-files.mjs';
const source=(extra='',body='正文')=>`---\ntitle: 示例\ndate: 2026-11-02\ncategory: tech\ntags: [Linux]\npublished: true\n${extra}---\n${body}`;
test('normal Markdown, links and fenced code remain plain content',()=>{const body='## 标题\n\n[链接](/blog)\n\n```js\nconst x = 1;\n```';assert.equal(parsePost(source('',body),'example').content,body);});
test('rejects traversal slugs, duplicate YAML keys, executable tags and invalid dates',()=>{
 assert.throws(()=>parsePost(source(),'../draft'));
 assert.throws(()=>parsePost(source('title: 覆盖\n'),'test'));
 assert.throws(()=>parsePost(source('excerpt: !!js/function "function(){}"\n'),'test'));
 assert.throws(()=>parsePost(source().replace('2026-11-02','2026-02-30'),'test'));
 assert.throws(()=>parsePost(source().replace('[Linux]','[Linux, Linux]'),'test'));
});
function fixture(run){const base=resolve(tmpdir()),dir=mkdtempSync(join(base,'lucian-content-'));try{return run(dir);}finally{assert.equal(dirname(dir),base);assert.ok(basename(dir).startsWith('lucian-content-'));rmSync(dir,{recursive:true,force:true});}}
test('drafts stay out of public lists but remain available for validation',()=>fixture(root=>{mkdirSync(join(root,'posts'));writeFileSync(join(root,'posts/public.md'),source());writeFileSync(join(root,'posts/draft.md'),source().replace('published: true','published: false'));assert.equal(loadPosts(root).length,1);assert.equal(loadPosts(root,true).length,2);}));
test('friend URL and avatar validation rejects active content and duplicate sites',()=>fixture(root=>{
 const content=join(root,'content'),pub=join(root,'public');mkdirSync(join(content,'friends'),{recursive:true});mkdirSync(join(pub,'images/friends'),{recursive:true});writeFileSync(join(pub,'images/friends/example.png'),Buffer.from([137,80,78,71,13,10,26,10]));
 const entry={name:'Example',url:'https://example.com/',avatar:'/images/friends/example.png',description:'A site',order:1};const path=join(content,'friends/example.json');writeFileSync(path,JSON.stringify(entry));assert.equal(loadFriends(content,pub).length,1);
 writeFileSync(path,JSON.stringify({...entry,url:'javascript:alert(1)'}));assert.throws(()=>loadFriends(content,pub));
 writeFileSync(path,JSON.stringify({...entry,avatar:'/images/friends/example.svg'}));assert.throws(()=>loadFriends(content,pub));
 writeFileSync(path,JSON.stringify(entry));writeFileSync(join(content,'friends/duplicate.json'),JSON.stringify(entry));assert.throws(()=>loadFriends(content,pub));
}));

test('unpublished English translations do not leak through a public post',()=>fixture(root=>{mkdirSync(join(root,'posts'));mkdirSync(join(root,'translations/en'),{recursive:true});writeFileSync(join(root,'posts/public.md'),source());writeFileSync(join(root,'translations/en/public.md'),source().replace('published: true','published: false'));assert.equal(loadPosts(root)[0].english,undefined);}));
