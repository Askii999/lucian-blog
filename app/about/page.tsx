import {getSettings} from '@/lib/content';
import {getLanguage} from '@/lib/locale';
import {Markdown} from '@/components/markdown';
import {resolveAboutDocument} from '@/lib/about-document';
export const dynamic='force-dynamic';
export async function generateMetadata(){return {title:(await getLanguage())==='en'?'About':'关于',alternates:{canonical:'/about'}};}
export default async function About(){const language=await getLanguage(),en=language==='en',s=getSettings(),document=resolveAboutDocument(s.about,s.aboutEn,language);
 return <div className="container notes-about about-document"><div className="about-writing"><h1 className="sr-only">{en?'About':language==='zh-Hant'?'關於':'关于'}</h1><section className="about-prose">{document.notice&&<p className="about-language-note" role="status">{document.notice}</p>}<Markdown content={document.markdown.replaceAll('{{email}}',s.email?.trim()||'upzxzkq@gmail.com').replaceAll('{{github}}',s.github?.trim()||'https://github.com')}/></section></div></div>;
}
