import {BlogContent} from '@/components/blog-content';
import {getPosts,getSettings} from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata={title:'手记'};
export default async function Blog({searchParams}:{searchParams:Promise<{category?:string|string[]}>}){const s=getSettings(),{category}=await searchParams;const section=category==='tech'||category==='life'?category:'all';return <BlogContent posts={getPosts()} email={s.email} github={s.github} initialSection={section}/>;}
