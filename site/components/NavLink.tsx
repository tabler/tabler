import Link from '@/components/Link';
import clsx from 'clsx';

function NavLink({ href, active = false, children, ...props }) {
  if (active) {
    props.className = clsx(props.className, 'active');
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export default NavLink;
