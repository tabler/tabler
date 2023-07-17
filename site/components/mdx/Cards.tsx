import Link from '@/components/Link';
import Icon from '@/components/Icon';

export function Cards({ children, ...props }) {
  return <div className="cards">{children}</div>;
}

export function Card({ children, title, icon, href, ...props }) {
  let Component: typeof Link | string = Link;

  if (!href) {
    Component = 'div';
  }

  return (
    <Component className="card" href={href}>
      <div className="card-body">
        <div className="row items-center">
          <div className="col">
            {icon && <Icon name={icon} className="card-icon" />}
            {title && <div className="card-title">{title}</div>}
            {children}
          </div>

          {href && (
            <div className="col-auto">
              <div className="card-chevron">
                <Icon name="chevron-right" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}
