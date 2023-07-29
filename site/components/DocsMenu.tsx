'use client';

import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import { DocsConfigType } from '@/types';
import clsx from 'clsx';

import { docsConfig } from '@/config/docs';





export default function DocsMenu() {
  const pathname = usePathname();

  return (
    <ul role="list" className="docs-menu scrollbar">
      {docsConfig.map((item, index) => (
        <li className="docs-menu-group" key={index}>
          <span className="docs-menu-header">{item.title}</span>
          {item.items && (
            <div className="docs-menu-submenu">
              {item.items.map((page, j) => (
                <Link
                  href={page.href}
                  className={clsx(
                    'docs-menu-item',
                    pathname === page.href && 'active'
                  )}
                  exact
                  key={j}
                >
                  {page.title}
                  {page.label && (
                    <>
                      <span className="badge badge-primary ml-2">
                        {page.label}
                      </span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
