import Explore from '@/components/explore';
import {getLanguage} from '@/lib/locale';
export async function generateMetadata(){return {title:(await getLanguage())==='en'?'Explore':'探索',alternates:{canonical:'/explore'}};}
export default function ExplorePage(){return <Explore/>;}
