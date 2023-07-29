'use client';

import React from 'react';
import { useClipboard } from '@/hooks';
import clsx from 'clsx';
import { html as beautifyHtml } from 'js-beautify';
import SyntaxHighlighter from 'react-syntax-highlighter';



import Icon from '@/components/Icon';





export default function CodeBlock({
  html,
  children,
  className,
  language = 'xml',
  copyable = true,
  beautify = false,
  hideLinks = false,
}:{
  html?: string,
  children?: React.ReactNode,
  className?: string,
  language?: string,
  copyable?: boolean,
  beautify?: boolean,
  hideLinks?: boolean,
}) {
  let code = html ?? (children || '').toString();
  const clipboard = useClipboard();

  if (hideLinks) {
    code = code
      .replace(/url\([^\)]+\)/g, 'url(...)')
      .replace(/img src="[^"]+"/g, 'img src="..."')
      .replace(
        /(\n?)(\s*)<svg[^>]+icon-tabler-([^"]+).*?<\/svg>/gms,
        '$1$2<!-- SVG icon from http://tabler-icons.io/i/$3 -->\n$2<svg>...</svg>'
      );
  }

  if (beautify) {
    code = beautifyHtml(code, {
      inline: 'strong',
      indent_size: 2,
    });
  }

  const languageNames = {
    js: 'JavaScript',
    ts: 'TypeScript',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    php: 'PHP',
    python: 'Python',
    ruby: 'Ruby',
    go: 'Go',
  };

  if (language === 'js') {
    language = 'javascript';
  } else if (language === 'html') {
    language = 'xml';
  }

  return (
    <div className="codeblock">
      {copyable && (
        <div className="codeblock-copy">
          <button
            className={clsx('btn btn-icon', clipboard.copied ? 'btn-green' : 'btn-dark')}
            onClick={() => clipboard.copy(html || '')}
          >
            {clipboard.copied ? <Icon name="check" /> : <Icon name="clipboard" />}
          </button>
        </div>
      )}

      <SyntaxHighlighter
        className={clsx(`language-${language}`, className)}
        language={language}
        useInlineStyles={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
