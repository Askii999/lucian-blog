import './coral/entry.css';
import type { Metadata } from 'next';
import {cookies} from 'next/headers';
import {themeBootstrap} from '@/lib/theme-bootstrap';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { LanguageProvider } from '@/components/language';
import {
  MotionProvider,
} from '@/components/atmosphere';
import { getSiteCopy } from '@/lib/content';
import { getLanguage } from '@/lib/locale';
export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage();
  return {
    metadataBase: new URL('https://lucian.me.uk'),
    title: { default: language === 'en' ? "Lucian’s Blog" : 'Lucian的博客', template: '%s · Lucian' },
    description: language === 'en' ? 'Articles, photographs and experiments.' : '文章、照片与小实验。',
    icons: { icon: '/favicon.svg?v=split-ring' },
    alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = await getLanguage();
  const theme=(await cookies()).get('still-theme')?.value==='dark'?'dark':'light';
  return (
    <html data-theme={theme} lang={language === 'en' ? 'en-US' : language === 'zh-Hant' ? 'zh-Hant' : 'zh-CN'} suppressHydrationWarning>
      <head><link rel="preload" href="/fonts/coral/general-sans-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script dangerouslySetInnerHTML={{__html:themeBootstrap}}/></head>
      <body className="almanac-site coral-site">
        <LanguageProvider language={language} copy={getSiteCopy()}>
          <MotionProvider>
            <SiteHeader author="Lucian" initialTheme={theme}/>
            <main id="main">{children}</main>
            <SiteFooter author="Lucian" />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}





