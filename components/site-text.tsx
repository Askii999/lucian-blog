'use client';
import {useLanguage} from './language';
export function SiteText({text}:{text:string}){return <>{useLanguage().t(text)}</>;}
