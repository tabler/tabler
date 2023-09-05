import { getHtmlChar, toPascalCase } from '@/helpers';
import { IconType } from '@/types';
import React from 'react';

export default function IconInfo({ icon, clipboard }: { icon: IconType; clipboard: any }) {
  const reactName = 'Icon' + toPascalCase(icon.name);
  const htmlChar = getHtmlChar(icon.unicode);
  const webfont = '<i class="ti ti-' + icon.name + '"></i>';

  return (
    <div className="mb-8">
      <div className="row g-4">
        <div className="col-auto">
          <h1 className="m-0 mb-2">
            <a className="tooltip" data-title="Copy name" onClick={() => clipboard.copy(icon.name)}>
              {icon.name}
            </a>
          </h1>
          <div className="list-inline-dots font-h5">
            <div>
              <a className="tooltip link-muted" data-title="Copy React name" onClick={() => clipboard.copy(reactName)}>
                {reactName}
              </a>
            </div>
            <div>
              <a
                className="tooltip link-muted font-monospaced"
                data-title="Copy hex"
                onClick={() => clipboard.copy(icon.unicode)}
              >
                {icon.unicode}
              </a>
            </div>
            <div>
              <a
                className="tooltip link-muted font-monospaced"
                data-title="Copy HTML char"
                onClick={() => clipboard.copy(htmlChar)}
              >
                {htmlChar}
              </a>
            </div>
            <div>
              <a
                className="tooltip link-muted font-monospaced"
                data-title="Copy webfont HTML"
                onClick={() => clipboard.copy(webfont)}
              >
                {'<i class="'}
                <span className="text-base">ti ti-{icon.name}</span>
                {'"></i>'}
              </a>
            </div>
          </div>
        </div>
        <div className="col-auto ml-auto text-right">
          <div className="list-inline-dots font-h5">
            <div>
              <span className="text-muted">Category:&nbsp;</span>
              {icon.category}
            </div>
            <div>
              <span className="text-muted">Added:&nbsp;</span>
              <a className="link-muted" href={'./changelog#' + icon.version}>
                {' '}
                {/* Add changelog site */}
                {icon.version}
              </a>
            </div>
          </div>
          <div className="mt-3">
            <div className="tags-list">
              {icon.tags.map((tag) => (
                <span key={tag} className="tag tag-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
