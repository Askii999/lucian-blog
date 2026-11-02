import {BlogContent} from '@/components/blog-content';
import {getPosts,getSettings} from '@/lib/content';
import {getLanguage} from '@/lib/locale';
export const dynamic='force-dynamic';
export async function generateMetadata(){return {title:(await getLanguage())==='en'?'Archives':'归档',alternates:{canonical:'/archives'}};}
export default function Archives(){const s=getSettings();return <BlogContent posts={getPosts()} email={s.email} github={s.github} view="archives"/>;}
