import {execFileSync} from 'node:child_process';
import {loadFriends} from '../lib/content-files.mjs';
const base=process.env.PR_BASE_SHA;
if(!base||!/^[0-9a-f]{40}$/.test(base))throw Error('Set PR_BASE_SHA to the PR base commit SHA');
const changes=execFileSync('git',['diff','--name-status','--no-renames',base,'HEAD'],{encoding:'utf8'}).trim().split('\n').filter(Boolean).map(line=>line.split('\t'));
const allowed=path=>/^content\/friends\/[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(path)||/^public\/images\/friends\/[a-z0-9]+(?:-[a-z0-9]+)*\.(png|jpe?g|webp|avif)$/.test(path);
if(!changes.length||changes.some(([status,path])=>status!=='A'||!allowed(path)))throw Error('A friend application may only add its JSON entry and raster avatar; edits/deletions/code changes need normal review.');
const friends=loadFriends();
for(const [,path]of changes){const mode=execFileSync('git',['ls-tree','HEAD','--',path],{encoding:'utf8'}).split(' ')[0];if(mode!=='100644')throw Error('Only regular non-executable files may be submitted');if(path.startsWith('public/')&&!friends.some(friend=>path==='public'+friend.avatar))throw Error('Unreferenced avatar');}
console.log('Friend-only PR path and data validation passed; owner review still required.');
