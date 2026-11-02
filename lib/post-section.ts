import type {Post} from './types';
// Existing CMS categories stay intact; group them only for reader navigation.
export function postSection(p:Post):'tech'|'life'{
 return /技术|创造|开发|编程|算法|tech|code/i.test(p.category)?'tech':'life';
}
