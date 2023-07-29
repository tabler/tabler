'use client';

import clsx from 'clsx';
import { Tab as HTab } from '@headlessui/react';
import { Fragment } from 'react';

export function Tabs({ items, children }) {
  return (
    <HTab.Group>
      <HTab.List className="tabs">
        {items.map((item, i) => (
          <HTab as={Fragment} key={item}>
            {({ selected }) => <div className={clsx('tab', selected && 'active')}>{item}</div>}
          </HTab>
        ))}
      </HTab.List>
      <HTab.Panels>{children}</HTab.Panels>
    </HTab.Group>
  );
}

export function Tab({ children }) {
  return <HTab.Panel className="tab-content">{children}</HTab.Panel>;
}

