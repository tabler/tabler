import * as React from 'react';
import type { MDXComponents } from 'mdx';
import { useMDXComponent } from 'next-contentlayer/hooks';



import Link from '@/components/Link';
import TablerSponsorsBanner from '@/components/TablerSponsorsBanner';
import Callout from '@/components/mdx/Callout';
import { Card, Cards } from '@/components/mdx/Cards';
import { Code, Pre } from '@/components/mdx/Code';
import ColorsTable from '@/components/mdx/ColorsTable';
import EmailsCount from '@/components/mdx/EmailsCount';
import FlagsTable from '@/components/mdx/FlagsTable';
import GuideImage from '@/components/mdx/GuideImage';
import IconsCount from '@/components/mdx/IconsCount';
import Image from '@/components/mdx/Image';
import PaymentsTable from '@/components/mdx/PaymentsTable';
import TablerLogos from '@/components/mdx/TablerLogos';
import { Tab, Tabs } from '@/components/mdx/Tabs';
import { TabsPackage } from '@/components/mdx/TabsPackage';
import { TipBad, TipGood, TipChanges } from '@/components/mdx/Tips';
import { OptionDescription, OptionTitle, OptionsTable } from '@/components/mdx/OptionsTable';





const components: MDXComponents = {
  // h1: ({ className, ...props }) => (
  //   <h1
  //     className={cn(
  //       "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // h2: ({ className, ...props }) => (
  //   <h2
  //     className={cn(
  //       "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // h3: ({ className, ...props }) => (
  //   <h3
  //     className={cn(
  //       "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // h4: ({ className, ...props }) => (
  //   <h4
  //     className={cn(
  //       "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // h5: ({ className, ...props }) => (
  //   <h5
  //     className={cn(
  //       "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // h6: ({ className, ...props }) => (
  //   <h6
  //     className={cn(
  //       "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // a: ({ className, ...props }) => (
  //   <a
  //     className={cn("font-medium underline underline-offset-4", className)}
  //     {...props}
  //   />
  // ),
  // p: ({ className, ...props }) => (
  //   <p
  //     className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
  //     {...props}
  //   />
  // ),
  // ul: ({ className, ...props }) => (
  //   <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  // ),
  // ol: ({ className, ...props }) => (
  //   <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  // ),
  // li: ({ className, ...props }) => (
  //   <li className={cn("mt-2", className)} {...props} />
  // ),
  // blockquote: ({ className, ...props }) => (
  //   <blockquote
  //     className={cn(
  //       "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // img: ({
  //   className,
  //   alt,
  //   ...props
  // }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  //   // eslint-disable-next-line @next/next/no-img-element
  //   <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  // ),
  // hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  // table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  //   <div className="my-6 w-full overflow-y-auto">
  //     <table className={cn("w-full", className)} {...props} />
  //   </div>
  // ),
  // tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  //   <tr
  //     className={cn("m-0 border-t p-0 even:bg-muted", className)}
  //     {...props}
  //   />
  // ),
  // th: ({ className, ...props }) => (
  //   <th
  //     className={cn(
  //       "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // td: ({ className, ...props }) => (
  //   <td
  //     className={cn(
  //       "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // pre: ({ className, ...props }) => (
  //   <pre
  //     className={cn(
  //       "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // code: ({ className, ...props }) => (
  //   <code
  //     className={cn(
  //       "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  // Image,
  // Callout,
  // Card: MdxCard,
  Link,
  TablerLogos,
  PaymentsTable,
  FlagsTable,
  ColorsTable,
  EmailsCount,
  IconsCount,
  GuideImage,
  Callout,
  Tabs,
  TabsPackage,
  Tab,
  Card,
  Cards,
  TipGood,
  TipBad,
  TipChanges,
  pre: Pre,
  code: Code,
  a: (props) => {
    return <Link {...props} />;
  },
  img: Image,
  TablerSponsorsBanner,
  OptionDescription,
  OptionTitle,
  OptionsTable,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <>
      <Component components={components} />
    </>
  );
}
