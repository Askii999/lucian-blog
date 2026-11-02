import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync} from 'node:fs';
if(!existsSync('dist/standalone/server.js')||!existsSync('dist/standalone/content/posts'))throw Error('Run npm run build first');
mkdirSync('release',{recursive:true});
execFileSync('tar',['-czf','release/site.tgz','-C','dist/standalone','.'],{stdio:'inherit'});
console.log('Packaged standalone code, dependencies, public assets and content into release/site.tgz');
