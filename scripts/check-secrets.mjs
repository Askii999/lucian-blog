import {readdirSync,lstatSync,readFileSync} from 'node:fs';
import {join,relative,resolve} from 'node:path';
const root=resolve(process.argv[2]||'.'),skip=new Set(['.git','node_modules','dist','.next','.vinext','.cloudflare','.local','release','coverage']);
const findings=[];
const patterns=[/-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/\bgithub_pat_[A-Za-z0-9_]{30,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bsk-[A-Za-z0-9_-]{32,}\b/];
function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name))continue;const file=join(dir,e.name),rel=relative(root,file).replaceAll('\\','/');if(e.isSymbolicLink()){findings.push({file:rel,reason:'symlink outside release output'});continue;}if(e.isDirectory()){walk(file);continue;}
if(/(?:\.(?:pem|key|p12|pfx|sqlite|sqlite3|db|zip|tgz|tar\.gz)|(?:^|\/)(?:auth\.json|ADMIN-ACCESS\.txt|admin-password\.txt)|(?:^|\/)\.env(?:\..*)?)$/i.test(rel)&&!['.env.example'].includes(rel)){findings.push({file:rel,reason:'private/runtime/archive filename'});continue;}
if(lstatSync(file).size>3*1024*1024)continue;
const data=readFileSync(file);if(data.subarray(0,1000).includes(0))continue;
if(patterns.some(pattern=>pattern.test(data.toString('utf8'))))findings.push({file:rel,reason:'possible credential material'});
}}
walk(root);if(findings.length){console.error(JSON.stringify(findings,null,2));process.exit(1);}console.log('No forbidden runtime/private filenames or known credential patterns in publishable source.');
