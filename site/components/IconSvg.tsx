import clsx from 'clsx';

export default function IconSvg({ svg, className }) {
  return <span className={clsx('icon-svg', className)} dangerouslySetInnerHTML={{ __html: svg }} />;
}
