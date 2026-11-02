import { cookies } from 'next/headers';
import type { Language } from './translations';
export async function getLanguage(): Promise<Language> {
  const language = (await cookies()).get('still-language')?.value;
  return language === 'en' || language === 'zh-Hant' ? language : 'zh';
}
