import { Pre } from '@/components/mdx/Code';
import { Tab, Tabs } from '@/components/mdx/Tabs';

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
