import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve,relative} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve('.'),assets=JSON.parse(readFileSync('scripts/local-assets.json','utf8'));
for(const asset of assets){
 const file=resolve(asset.file);if(relative(root,file).startsWith('..'))throw Error('Asset escapes project');
 const hash=data=>createHash('sha256').update(data).digest('hex');
 if(existsSync(file)&&hash(readFileSync(file))===asset.sha256){console.log('Ready:',asset.file);continue;}
 let response;let lastError;for(let attempt=0;attempt<3;attempt++){try{response=await fetch(asset.url,{signal:AbortSignal.timeout(30000)});if(response.ok)break;throw Error('Asset HTTP '+response.status);}catch(error){lastError=error;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));}}if(!response?.ok)throw lastError||Error('Unable to download '+asset.file);
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length>8*1024*1024||hash(bytes)!==asset.sha256)throw Error('Asset digest changed; review the source before updating manifest: '+asset.file);
 mkdirSync(dirname(file),{recursive:true});writeFileSync(file,bytes);console.log('Downloaded:',asset.file);
}
