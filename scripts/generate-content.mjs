import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {loadPosts,loadProfile,loadFriends,loadSiteCopy,validateContent} from '../lib/content-files.mjs';

validateContent();
const content={posts:loadPosts(undefined,true),settings:loadProfile(),friends:loadFriends(),copy:loadSiteCopy(),giscus:JSON.parse(readFileSync('content/giscus.json','utf8'))};
mkdirSync('lib/generated',{recursive:true});
writeFileSync('lib/generated/content.json',JSON.stringify(content));
console.log('Content compiled for Workers.');
