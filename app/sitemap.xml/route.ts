import {getPosts} from '@/lib/content';
export const dynamic='force-dynamic';
export function GET(){const root='https://lucian.me.uk';return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/blog','/archives','/tags','/explore','/links','/about',...getPosts().map(p=>'/posts/'+p.slug)].map(p=>`<url><loc>${root+p}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}})}
