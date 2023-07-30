import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';

import Mdx from '@/components/MDX';
import { Ad } from '@/components/Ad';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPageFromParams(params) {
  const slug = params?.slug,
    page = allPosts.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPosts.map((page) => ({
    slug: page.slugAsParams,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPageFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-side">
              <div className="sticky-top">
                <div className="py-7">back</div>
              </div>
            </div>
            <div className="col">
              <div className="row g-6">
                <div className="col-12">
                  <div className="row g-6">
                    <div className="col">
                      {post && post.title && (
                        <div className="py-7 text-center">
                          {post.product && <div className="hero-subheader">{post.product}</div>}
                          <div className="text-muted mb-2">July 25, 2023</div>
                          <h1 className="hero-title">{post.title}</h1>
                        </div>
                      )}
                    </div>
                    <div className="col-side"></div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row g-6">
                    <div className="col">
                      <div className="markdown">
                        {post.description && <p className="lead">{post.description}</p>}
                        <Mdx code={post.body.code} />
                      </div>
                    </div>
                    <div className="col-side">
                      <div className="sticky-top">
                        <Ad />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
