import {BlogContent} from '@/components/blog-content';
import {getPosts,getSettings} from '@/lib/content';
import {getLanguage} from '@/lib/locale';
export const dynamic='force-dynamic';
export async function generateMetadata(){return {title:(await getLanguage())==='en'?'Tags':'标签',alternates:{canonical:'/tags'}};}
export default async function Tags({searchParams}:{searchParams:Promise<{tag?:string|string[]}>}){const s=getSettings(),{tag}=await searchParams;return <BlogContent posts={getPosts()} email={s.email} github={s.github} view="tags" selectedTag={typeof tag==='string'?tag:''}/>;}
