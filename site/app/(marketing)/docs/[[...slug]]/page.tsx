
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import { name } from '@/config/site';

import Mdx from '@/components/MDX';
import TablerSponsorsBanner from '@/components/TablerSponsorsBanner';
import Link from 'next/link';


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

  // const toc = await getTableOfContents(doc.body.raw)

  return (
    <>
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

      <div className="pt-7">
        <div className="row">
          <div className="md:col">
            {/* {prev && (
            <Link href={prev.url} className="card">
              <div className="card-body p-3">
                <div className="row items-center g-3">
                  <div className="col-auto">
                    <div className="card-chevron card-chevron-left">
                      <Icon name="chevron-left" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="h-subheader mb-1">
                      {prev.category}
                    </div>
                    <div className="h5 m-0">{prev.title}</div>
                  </div>
                </div>
              </div>
            </Link>
          )} */}
          </div>
          <div className="md:col">
            {/* {next && (
            <Link href={next.url} className="card text-right">
              <div className="card-body p-3">
                <div className="row items-center g-3">
                  <div className="col">
                    <div className="h-subheader mb-1">
                      {next.category}
                    </div>
                    <div className="h5 m-0">{next.title}</div>
                  </div>
                  <div className="col-auto">
                    <div className="card-chevron">
                      <Icon name="chevron-right" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )} */}
          </div>
        </div>
      </div>
      {/* // <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
    //   <div className="mx-auto w-full min-w-0">
    //     {/* <DocsPageHeader heading={doc.title} text={doc.description} />
    //     <Mdx code={doc.body.code} />
    //     <hr className="my-4 md:my-6" />
    //     {/* <DocsPager doc={doc} />
    //   </div>
    //   <div className="hidden text-sm xl:block">
    //     <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
    //       {/* <DashboardTableOfContents toc={toc} />
    //     </div>
    //   </div>
    // </main> */}
    </>
  );
}
