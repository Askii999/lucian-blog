import {getLanguage} from '@/lib/locale';
export default async function NotFound(){const en=(await getLanguage())==='en';return <section className="notes-page"><h1>404</h1><p>{en?'Page not found.':'页面不存在。'}</p><a href="/">← {en?'Notes':'手记'}</a></section>;}
