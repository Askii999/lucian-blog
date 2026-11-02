import {loadPosts,loadProfile,loadSiteCopy,loadFriends} from './content-files.mjs';
import type {Post,Settings} from './types';
import type {CopyDocument} from './site-copy';
export function getPosts(all=false):Post[]{return loadPosts(undefined,all) as Post[];}
export function getPost(slug:string,all=false):Post|undefined{return getPosts(all).find(post=>post.slug===slug);}
export function getSettings():Settings{return loadProfile() as Settings;}
export function getSiteCopy():CopyDocument{return loadSiteCopy() as CopyDocument;}
export function getFriends(){return loadFriends();}
