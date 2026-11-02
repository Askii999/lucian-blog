'use client';
import { useLanguage } from './language';
import { createElement } from 'react';
export function SiteText({ text }: { text: string }) {
  const { t } = useLanguage();
  return createElement('site-text', { className: 'site-copy-text', 'data-copy-key': text }, t(text));
}
