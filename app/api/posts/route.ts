import { getPosts } from '@/lib/content';
export const dynamic='force-dynamic';
export function GET(){return Response.json(getPosts(),{headers:{'Cache-Control':'no-store'}})}
