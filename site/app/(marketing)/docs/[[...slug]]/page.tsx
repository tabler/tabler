
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import { name } from '@/config/site';

import { getTableOfContents } from '@/lib/toc';
import Mdx from '@/components/MDX';
import TablerSponsorsBanner from '@/components/TablerSponsorsBanner';
import Link from 'next/link';
import TOC from '@/components/TOC';
import DocsMenu from '@/components/DocsMenu';
import Icon from '@/components/Icon';

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams(params) {
  const slug = params.slug?.join('/') || '';
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} - Documentation - ${name}`,
    description: doc.description,
    openGraph: {
      type: 'article',
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps['params'][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <div className="row g-0">
      <div className="md:col-auto docs-side">
        {/*<input type="search" className="form-control w-100 mb-5" placeholder="Search&hellip;" />*/}
        <DocsMenu />
      </div>
      <div className="md:col">
        <div className="py-6 md:pl-6">
          <nav aria-label="breadcrumbs" className="breadcrumb mb-6">
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/" className="breadcrumb-link">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/docs" className="breadcrumb-link">
                  Documentation
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/docs/${params.slug.join('/')}`} className="breadcrumb-link">
                  {doc.title}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="markdown">
            {/* {category && (
        <div className="h-subheader text-primary">{category}</div>
      )} */}
            {doc.title && <h1>{doc.title}</h1>}
            {doc.description && <p className="lead">{doc.description}</p>}

            <Mdx code={doc.body.code} />
          </div>

          <TablerSponsorsBanner className="mt-7" />
        </div>
      </div>
      <div className="docs-side-toc">
        <div className="pl-6 font-h6 pt-6">
          <div className="h6 mb-3">On this page</div>
          <div>
            <TOC toc={toc} />
          </div>
          <div className="mt-4 border-top pt-4">
            <a href={`https://github.com/tabler/tabler/blob/main/docs/${doc.slugAsParams.split(',').join('/')}.mdx`} className="link-muted">
              Improve this page
              <Icon name="edit" className="icon-inline ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
