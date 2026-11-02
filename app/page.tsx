import {LucianHome} from '@/components/lucian-home';
import {getPosts} from '@/lib/content';
export const dynamic='force-dynamic';
export default function Home(){return <LucianHome posts={getPosts().sort((a,b)=>b.date.localeCompare(a.date))}/>}
