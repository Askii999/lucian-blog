'use client';
import {useLanguage} from './language';
import {explorePhotos} from '@/lib/explore-photos';
import {PaperExperiments} from './paper-experiments';
export default function Explore(){
 const {language}=useLanguage(),en=language==='en';
 return <div className="explore-page almanac-explore container"><header className="explore-heading"><h1>{en?'Explore':'探索'}</h1><p>{en?'Photographs and small experiments.':'照片与一些小实验。'}</p></header>
 <section className="photo-collection photo-salon" aria-label={en?'Photograph collection':'照片集'}>{explorePhotos.map((photo,index)=><figure className={'photo photo-'+index} key={photo.id}><img src={'/images/explore/'+photo.file} width={photo.width} height={photo.height} alt={en?photo.altEn:photo.alt} loading={index?'lazy':'eager'} fetchPriority={index?undefined:'high'} draggable={false}/><figcaption><span>{en?photo.en:photo.zh}</span><a href={photo.url} target="_blank" rel="noopener noreferrer">{photo.credit}</a></figcaption></figure>)}</section>
 <PaperExperiments/>
 </div>;
}
