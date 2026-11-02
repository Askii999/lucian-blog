export async function copyText(text:string){
 if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return;}
 const input=document.createElement('textarea');input.value=text;input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();const ok=document.execCommand('copy');input.remove();if(!ok)throw new Error('请手动复制');
}
