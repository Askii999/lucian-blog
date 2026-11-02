// About-only support for compact Markdown headings.
export function formatAboutDocument(content:string){
 let fence='';
 return content.replace(/\r\n/g,'\n').split('\n').map(line=>{
  const trimmed=line.trim(),marker=trimmed.match(/^(`{3,}|~{3,})/);
  if(marker){const char=marker[1][0];if(!fence)fence=char;else if(fence===char)fence='';return line;}
  // Accept compact headings pasted into the About editor, e.g. ##附注##.
  // Limit this repair to standalone, unindented lines outside code fences.
  const compact=!fence&&!/^\s/.test(line)?line.match(/^(#{1,6})([^#\s].*?)\s*$/):null;
  if(compact){const title=compact[2].replace(/\s*#+\s*$/,'').trim();if(title)return compact[1]+' '+title;}
  return line;
 }).join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
export function resolveAboutDocument(source:string,english:string|undefined,language:string){
 if(language==='en'&&english?.trim())return{markdown:formatAboutDocument(english),notice:''};
 return{markdown:formatAboutDocument(source),notice:language==='en'?'The English translation is being updated. The latest Chinese text is shown below.':''};
}
