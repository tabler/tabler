import { notFound } from 'next/navigation';
import { allPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import Mdx from '@/components/MDX';

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title}`,
    description: page.description,
    robots: page.robots,
  };
}

async function getPageFromParams(params) {
  const slug = params?.slug,
    page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams,
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <>
      {page && page.title && (
        <>
          <div className="section-header">
            <h1 className="section-title section-title-lg">{page.title}</h1>
          </div>
        </>
      )}
      <div className="markdown">
        {page.description && <p className="lead">{page.description}</p>}
        <Mdx code={page.body.code} />
      </div>
    </>
  );
}
