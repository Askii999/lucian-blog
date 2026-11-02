import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join,dirname,basename,resolve} from 'node:path';
import test from 'node:test';
import {parsePost,loadPosts,loadFriends,loadSiteCopy} from '../lib/content-files.mjs';
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
test('four-field friends support remote avatars and reject invalid or duplicate entries',()=>fixture(root=>{
 const content=join(root,'content'),pub=join(root,'public');mkdirSync(content);mkdirSync(join(pub,'images/friends'),{recursive:true});writeFileSync(join(pub,'images/friends/example.png'),Buffer.from([137,80,78,71,13,10,26,10]));
 const entry={name:'Example',avatar:'https://example.com/avatar.png',link:'https://example.com/',desc:'A site'};const path=join(content,'friends.json');
 const save=value=>writeFileSync(path,JSON.stringify(value));save([entry]);const loaded=loadFriends(content,pub);assert.deepEqual(loaded[0],entry);
 save([{...entry,avatar:'/images/friends/example.png'}]);assert.equal(loadFriends(content,pub).length,1);
 save([{...entry,link:'javascript:alert(1)'}]);assert.throws(()=>loadFriends(content,pub));
 save([{...entry,avatar:'javascript:alert(1)'}]);assert.throws(()=>loadFriends(content,pub));
 save([entry,entry]);assert.throws(()=>loadFriends(content,pub));
 save([{...entry,links:[{icon:'web',link:'https://example.com/'}]}]);assert.throws(()=>loadFriends(content,pub));
}));
test('unpublished English translations do not leak through a public post',()=>fixture(root=>{mkdirSync(join(root,'posts'));mkdirSync(join(root,'translations/en'),{recursive:true});writeFileSync(join(root,'posts/public.md'),source());writeFileSync(join(root,'translations/en/public.md'),source().replace('published: true','published: false'));assert.equal(loadPosts(root)[0].english,undefined);}));

test('optional site-copy falls back only when absent, preserving validation for existing overrides',()=>fixture(root=>{
 assert.deepEqual(loadSiteCopy(root),{revision:0,entries:{}});
 const path=join(root,'site-copy.json');writeFileSync(path,JSON.stringify({revision:1,entries:{Greeting:{zh:'你好',en:'Hello'}}}));assert.equal(loadSiteCopy(root).entries.Greeting.zh,'你好');
 writeFileSync(path,'{broken');assert.throws(()=>loadSiteCopy(root));
}));
