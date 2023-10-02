import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import IconSvg from '@/components/IconSvg';
import { download, toPascalCase } from '@/helpers';
import { useLocalStorage } from '@/hooks';
import { IconType } from '@/types';
import React, { useState } from 'react';

export default function IconCodes({ icon, clipboard }: { icon: IconType; clipboard: any }) {
  const [stroke, setStroke] = useState(2);
  const [selectedTabIndex, setSelectedTabIndex] = useLocalStorage<number>('icon-preview-selected-tab', 0);
  const tabs = ['SVG Code', 'JSX code', 'Data URI', 'React', 'Vue', 'Webfont', 'SCSS'];

  return (
    <div className="icon-code-grid mb-8">
      <div>
        <div className="icon-preview icon-preview-big mx-auto">
          <IconSvg svg={icon.svg} key={icon.name} className={'icon-demo-stroke-' + stroke * 100} />
          <label className="icon-preview-slider">
            <div className="row">
              <div className="col-6">
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="2"
                  step=".25"
                  onChange={(e) => setStroke(+e.target.value)}
                  defaultValue={stroke}
                />
              </div>
              <div className="col-auto">
                <code className="code-dark">
                  strokeWidth="<strong>{stroke}</strong>"
                </code>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>
          <div className="row g-2">
            <div className="col-12 lg:col-auto order-last lg:order-first">
              <a className="btn btn-primary w-100 lg:w-auto" onClick={() => clipboard.copy(icon.svg)}>
                <Icon name="copy" /> Copy SVG
              </a>
            </div>
            <div className="col-6 lg:col-auto">
              <a
                className="btn w-100 lg:w-auto"
                onClick={() => download(icon.svg, `${icon.name}.svg`, 'image/svg+xml')}
              >
                <Icon name="download" /> Download SVG
              </a>
            </div>
            <div className="col-6 lg:col-auto">
              <a
                className="btn w-100 lg:w-auto"
                href={'../api/icon-image/' + icon.name + '?withName=false&withTags=false&size=240'}
                download
              >
                <Icon name="download" /> Download PNG
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav className="tabs">
          {tabs.map((tab, index) => (
            <a
              className={'tab' + (selectedTabIndex === index ? ' active' : '')}
              onClick={() => setSelectedTabIndex(index)}
              key={tab}
            >
              {tab}
            </a>
          ))}
        </nav>
        <div className="row">
          <div className="col">{switchTab(selectedTabIndex, icon)}</div>
        </div>
      </div>
    </div>
  );
}

const switchTab = (tabIndex: number, icon: IconType) => {
  switch (tabIndex) {
    case 0:
      return <CodeBlock html={addEscapeCharsToSvg(icon.svg)} />;
    case 1:
      return (
        <CodeBlock
          html={addEscapeCharsToSvg(
            icon.svg
              .replaceAll('"24"', '{24}')
              .replace('class', 'className')
              .replace('stroke-width', 'strokeWidth')
              .replace('stroke-linecap', 'strokeLinecap')
              .replace('stroke-linejoin', 'strokeLinejoin'),
          )}
        />
      );
    case 2:
      return <div>URI</div>; // TODO
    case 3:
      return <ReactCode iconName={icon.name} />;
    case 4:
      return <VueCode iconName={icon.name} />;
    case 5:
      return <WebfontCode iconName={icon.name} iconUnicode={icon.unicode} />;
    default:
      return <ScssCode iconName={icon.name} />;
  }
};

const ReactCode = ({ iconName }: { iconName: string }) => (
  <div>
    <p className="mb-2">
      Install <code>@tabler/icons-react</code>:
    </p>
    <CodeBlock html="npm install @tabler/icons-react" />
    <p className="mb-2">Import icon:</p>
    <CodeBlock html={`import { Icon${toPascalCase(iconName)} } from '@tabler/icons-react';`} language="typescript" />
  </div>
);

const VueCode = ({ iconName }: { iconName: string }) => (
  <div>
    <p className="mb-2">
      Install <code>@tabler/icons-vue</code>:
    </p>
    <CodeBlock html="npm install @tabler/icons-vue" />
    <p className="mb-2">Import icon:</p>
    <CodeBlock html={`import { Icon${toPascalCase(iconName)} } from '@tabler/icons-vue';`} language="typescript" />
  </div>
);

const WebfontCode = ({ iconName, iconUnicode }: { iconName: string; iconUnicode: string }) => (
  <div>
    <p className="mb-2">Stylesheet url:</p>
    <CodeBlock
      html={
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">'
      }
    />
    <p className="mb-2">Usage in HTML:</p>
    <CodeBlock html={`<i class="ti ti-${iconName}"></i>`} />
    <p className="mb-2">Usage in CSS:</p>
    <CodeBlock html={`content: '\\${iconUnicode}';`} />
  </div>
);

const ScssCode = ({ iconName }: { iconName: string }) => (
  <div>
    <p className="mb-2">SCSS file:</p>
    <CodeBlock html="@import 'node_modules/@tabler/icons-webfont/tabler-icons.scss';" language="scss" />
    <p className="mb-2">Usage in SCSS:</p>
    <CodeBlock html={`content: $ti-icon-${iconName}`} />
  </div>
);

const addEscapeCharsToSvg = (svg: string) => svg.replaceAll('<path', '\n\t<path').replace('</svg>', '\n</svg>');
