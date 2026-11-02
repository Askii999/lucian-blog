import {getPost,getPosts,getSettings} from '@/lib/content';
import {notFound} from 'next/navigation';
import {getGiscusConfig} from '@/lib/giscus';
import {Reader} from '@/components/reader';
import {getLanguage} from '@/lib/locale';
import {localPost} from '@/lib/translations';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params,language=await getLanguage(),source=getPost(slug),p=source?localPost(source,language):undefined;return p?{title:p.title,description:p.excerpt||p.content.replace(/[#*`>]/g,'').slice(0,150),alternates:{canonical:'/posts/'+p.slug},openGraph:{title:p.title,description:p.excerpt,type:'article',publishedTime:p.date}}:{title:language==='en'?'Article not found':'文章不存在'}}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params,p=getPost(slug);if(!p)notFound();const related: ReturnType<typeof getPosts>=[];return <Reader post={p} related={related} author={getSettings().author} giscus={getGiscusConfig()}/>}
