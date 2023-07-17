'use client';

import clsx from 'clsx';
import { Tab as HTab } from '@headlessui/react';
import { Fragment } from 'react';
import { Pre } from '@/components/mdx/Code';

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

export function TabsPackage({ name }) {
  return (
    <Tabs items={['yarn', 'npm', 'pnpm']}>
      <Tab>
        <Pre>
          <code className="language-plaintext">yarn add {name}</code>
        </Pre>
      </Tab>
      <Tab>
        <Pre>
          <code className="language-plaintext">npm install {name}</code>
        </Pre>
      </Tab>
      <Tab>
        <Pre>
          <code className="language-plaintext">pnpm install {name}</code>
        </Pre>
      </Tab>
    </Tabs>
  );
}
