import {english,type Language} from './translations';
import {toTraditional} from './traditional';
export type CopyEntries=Record<string,{zh:string;en:string}>;
export type CopyDocument={revision:number;entries:CopyEntries};
export function copyText(key:string,language:Language,entries:CopyEntries={}){
 const text=entries[key]?.[language==='en'?'en':'zh']??(language==='en'?(english[key]??key):key);
 return language==='zh-Hant'?toTraditional(text):text;
}
