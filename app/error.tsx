'use client';
import { SiteText } from '@/components/site-text';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="not-found wrap">
      <h1>
        <SiteText text={'\u6682\u65F6\u6CA1\u80FD\u6253\u5F00\u8FD9\u4E00\u9875\u3002'} />
      </h1>
      <p>
        <SiteText text={'\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF0C\u4F60\u7684\u5185\u5BB9\u4ECD\u4FDD\u5B58\u5728\u670D\u52A1\u5668\u4E0A\u3002'} />
      </p>
      <button className="solid-button" onClick={reset}>
        <SiteText text={'\u91CD\u65B0\u52A0\u8F7D'} />
      </button>
    </div>
  );
}
