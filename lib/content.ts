import content from './generated/content.json';
import type {Post,Settings,Friend} from './types';
import type {CopyDocument} from './site-copy';
export function getPosts(all=false):Post[]{return content.posts.filter(post=>all||post.published) as Post[];}
export function getPost(slug:string,all=false):Post|undefined{return getPosts(all).find(post=>post.slug===slug);}
export function getSettings():Settings{return content.settings as Settings;}
export function getSiteCopy():CopyDocument{return content.copy as CopyDocument;}
export function getFriends():Friend[]{return content.friends as Friend[];}
