import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';

import Mdx from '@/components/MDX';

interface PageProps {
  params: {
    slug: string
  }
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
      {post && post.title && (
        <div className="hero">
          <div className="container container-narrow">
            <div className="hero-subheader">{post.product}</div>
            <h1 className="hero-title">{post.title}</h1>
          </div>
        </div>
      )}
      <section className="section pt-0">
        <div className="container container-narrow">
          <div className="markdown">
            {post.description && <p className="lead">{post.description}</p>}
            <Mdx code={post.body.code} />
          </div>
        </div>
      </section>
    </>
  );
}
