'use client';

import { default as NextLink } from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';





export default function Link({
  href,
  children,
  className,
  prefetch = false,
  exact = false,
  onClick = () => {},
  ...props
}: {
  href: string
  children?: React.ReactNode
  prefetch?: boolean
  className?: string
  exact?: boolean
  onClick?: (event: React.MouseEvent) => void
}): JSX.Element {
  const pathname = usePathname();

  return (
    <NextLink
      href={href}
      className={clsx(className, [
        (exact ? pathname === href : pathname.startsWith(href)) ? 'active' : '',
      ])}
      {...props}
    >
      {children}
    </NextLink>
  );
}
