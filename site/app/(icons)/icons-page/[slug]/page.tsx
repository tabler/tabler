'use client';

import { icons } from '@/config/tabler';
import { useClipboard } from '@/hooks';

export default function IconPreviewPage({ params }: { params: { slug: string } }) {
  const icon = Object.values(icons).find((i) => i.name == params.slug);
  const clipboard = useClipboard();

  if (!icon) {
    return (
      <>
        <section className="section section-light">
          <div className="container">
            <h1>Icon {params.slug} does not exist!</h1>
          </div>
        </section>
      </>
    );
  }

  const reactName = 'Icon' + icon.name.replaceAll('-', ''); // TODO How to get React name?
  const hex = '&#x' + icon.unicode + ';';
  const webfont = '<i class="ti ti-' + icon.name + '"></i>';

  return (
    <>
      <section className="section section-light">
        <div className="container">
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
                    <a
                      className="tooltip link-muted"
                      data-title="Copy React name"
                      onClick={() => clipboard.copy(reactName)}
                    >
                      {reactName}
                    </a>
                  </div>
                  <div>
                    <a
                      className="tooltip link-muted font-monospaced"
                      data-title="Copy hex"
                      onClick={() => clipboard.copy(hex)}
                    >
                      {hex}
                    </a>
                  </div>
                  <div>
                    <a
                      className="tooltip link-muted font-monospaced"
                      data-title="Copy HTML char"
                      onClick={() => clipboard.copy(icon.unicode)}
                    >
                      {icon.unicode}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
