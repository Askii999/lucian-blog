import {cpSync,mkdirSync} from 'node:fs';
mkdirSync('dist/standalone',{recursive:true});
cpSync('content','dist/standalone/content',{recursive:true});
console.log('Public content staged into standalone release.');
