import {notFound,redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export const metadata={title:'手记'};
export default async function Category({params}:{params:Promise<{section:string}>}){const {section}=await params;if(section!=='tech'&&section!=='life')notFound();redirect('/blog');}
