'use client';
import {createContext,useContext} from 'react';
import {localPost,type Language} from '@/lib/translations';
import {copyText,type CopyDocument,type CopyEntries} from '@/lib/site-copy';
import type {Post} from '@/lib/types';
const Context=createContext<{language:Language;entries:CopyEntries}>({language:'zh',entries:{}});
export function LanguageProvider({language,copy,children}:{language:Language;copy:CopyDocument;children:React.ReactNode}){return <Context.Provider value={{language,entries:copy.entries}}>{children}</Context.Provider>;}
export function useLanguage() {
  const { language, entries } = useContext(Context);
  const t = (text: string) => copyText(text, language, entries);
  return { language, t, localize: (p: Post) => ({ ...localPost(p, language), category: t(p.category), tags: p.tags.map(t) }) };
}
