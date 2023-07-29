'use client';

import * as React from 'react';

import { TableOfContents } from '@/lib/toc';
import useMounted from '@/hooks/use-mounted';
import clsx from 'clsx';

interface TocProps {
  toc: TableOfContents;
}

export default function TOC({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items) {
    return null;
  }

  return mounted ? (
    <Tree tree={toc} activeItem={activeHeading} />
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' },
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={clsx('p-0 list-unstyled space-y-2', { 'pl-4': level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index}>
            <a href={item.url} className={clsx('link-muted', item.url === `#${activeItem}` ? 'font-medium text-headers' : '')}>
              {item.title}
            </a>
            {item.items?.length ? <Tree tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
