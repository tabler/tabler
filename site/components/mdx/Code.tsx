import Example from '@/components/Example';
import CodeBlock from '@/components/CodeBlock';
import { iconsVersion, uiCdnUrl } from '@/config/site';

export function Code({ children, ...props }) {
  return <code {...props}>{children}</code>;
}

export function Pre({ children, ...props }) {
  const language = (children.props.className || '').replace(/^language-/, ''),
    html = ([...children.props.children].join('') || '')
      .replace(/\$TABLER_CDN/g, uiCdnUrl)
      .replace(/\$ICONS_VERSION/g, iconsVersion);

  if (props.example) {
    return (
      <>
        <Example html={html} {...props} />
        {props.code && <CodeBlock html={html} language={language} hideLinks />}
      </>
    );
  }

  return <CodeBlock html={html} language={language} />;
}
