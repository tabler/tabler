import Icon from '@/components/Icon';
import { iconsUrl, blogEnabled } from '@/config/site';
import Link from 'components/Link';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Blog',
  description: 'Stay in the loop with all things Tabler. We provide regular updates on new features, changelogs, and news, ensuring you never miss any of our software developments.',
};

export default async function BlogPage() {
  if(! blogEnabled) {
    notFound();
  }

  return (
    <>
      <section className="section">
        <div className="page-header">
          <h2 className="page-title page-title-lg">Blog</h2>
          <p className="page-description">
            Stay in the loop with all things <Link href="/">Tabler</Link> and <a href={iconsUrl}>Tabler Icons</a>. Regular updates on new features, changelogs, and news, ensuring you never miss any of our software developments.
          </p>
        </div>
        <div className="container">
          <div className="row justify-center">
            <div className="col-slim">
              <div className="divider-y-8">
                {allPosts.map((post, i) => (
                  <div className="" key={post.slug} itemScope={true} itemType="https://schema.org/NewsArticle">
                    {post.image && (
                      <Link href={post.slug} className="d-block mb-4">
                        <div className="outline-light rounded lh-1">
                          <img src={`/img/blog/${post.image}`} width={660} height={361} className="rounded" alt={post.title} itemProp="image" />
                        </div>
                      </Link>
                    )}
                    <div>
                      {post.title && (
                        <h2>
                          <meta itemProp="headline" content={post?.title} />
                          <meta itemProp="url" content={post.slug} />
                          <Link href={post.slug}>{post?.title}</Link>
                        </h2>
                      )}

                      <div className="markdown text-muted">
                        <p itemProp="description">{post.description}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="row">
                        <div className="col">
                          <meta itemProp="datePublished" content={format(new Date(post.date), 'yyyy-MM-dd')} />
                          <div className="text-muted">{format(new Date(post.date), 'MMM d, Y')}</div>
                        </div>
                        <div className="col text-right">
                          <Link href={post.slug} aria-label={`Read more about "${post.title}"`}>
                            Read more <Icon name="arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis quibusdam quos est repellat rerum molestias, autem ullam, exercitationem magni non eos sunt, voluptates laboriosam dignissimos mollitia tempora ipsum illo
          adipisci.
        </div>
      </section>
    </>
  );
}
