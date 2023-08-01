import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';

import Mdx from '@/components/MDX';
import Ad from '@/components/Ad';
import Link from '@/components/Link';
import Icon from '@/components/Icon';
import { blogEnabled } from '@/config/site';

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

  if (!post || !blogEnabled) {
    notFound();
  }

  return (
    <>
      <section className="section pt-0">
        <div className="container">
          <div>
            {post && post.title && (
              <div className="py-7 text-center">
                {post.product && <div className="hero-subheader">{post.product}</div>}
                <div className="text-muted mb-2">July 25, 2023</div>
                <h1 className="hero-title">{post.title}</h1>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col">
              <div className="sticky-top">
                <Link href="/blog" className="link-muted">
                  <Icon name="chevron-left" />
                  Go back
                </Link>
              </div>
            </div>
            <div className="col-slim">
              <div className="markdown">
                {post.description && <p className="lead">{post.description}</p>}
                <Mdx code={post.body.code} />
              </div>
            </div>
            <div className="col">
              <div className="sticky-top">
                <div className="row justify-end">
                  <div className="col-side">
                    <Ad />
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
