'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import { copyText } from '@/lib/clipboard';
import { useLanguage } from './language';
import { traditionalMarkdown } from '@/lib/traditional';
function CodeBlock({ children }: any) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-wrap">
      <button
        aria-label={t('复制代码')}
        onClick={async (e) => {
          const code =
            e.currentTarget.parentElement?.querySelector('pre')?.textContent ||
            '';
          try {
            await copyText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <pre>{children}</pre>
    </div>
  );
}
export function headingId(text: string) {
  return (
    'section-' +
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
  );
}
export function Markdown({ content }: { content: string }) {
  const { language } = useLanguage();
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={language === 'zh-Hant' ? [remarkGfm, traditionalMarkdown] : [remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 id={headingId(String(children))}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={headingId(String(children))}>{children}</h3>
          ),
          pre: CodeBlock,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({src,alt}) => <img src={src} alt={alt||''} loading="lazy" draggable={false}/>,
          table: ({ children }) => (
            <div className="table-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
