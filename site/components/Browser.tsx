import { uiDemoUrl } from '@/config/site';
import Icon from '@/components/Icon';
import ResponsiveImage from '@/components/ResponsiveImage';
import clsx from 'clsx';

export default function Browser({ icon = 'lock', url = uiDemoUrl, noresize = false, className, children, ...props }:{
  icon?: string,
  url?: string,
  noresize?: boolean,
  className?: string,
  children?: React.ReactNode
}) {
  return (
    <div className={clsx('browser', noresize && 'browser-noresize', className)} {...props}>
      <div className="browser-header">
        <div className="row items-center">
          <div className="col-auto md:col-2">
            <div className="browser-dots">
              <div className="browser-dot" />
              <div className="browser-dot" />
              <div className="browser-dot" />
            </div>
          </div>
          <div className="col-8">
            <div className="tooltip" data-title="Open preview of Tabler dashboard!">
              <a href={url} className="browser-input" target="_blank" rel="noopener noreferrer">
                <Icon name={icon} />
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="browser-image">{children}</div>
    </div>
  );
}
