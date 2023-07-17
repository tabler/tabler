import Link from 'components/Link';
import { allPosts } from 'contentlayer/generated';

export const metadata = {
  title: 'Blog - Tabler',
  description: 'Stay in the loop with all things Tabler. We provide regular updates on new features, changelogs, and news, ensuring you never miss any of our software developments.',
};

export default async function BlogPage() {

  return (
    <>
      <div className="sm:gx-6 xl:gx-7">
        {allPosts.map((post, i) => (
          <div
            className="guide"
            key={post.slug}
            itemScope={true}
            itemType="https://schema.org/NewsArticle"
          >
            <div className="guide-date">
              {/* <meta
                itemProp="datePublished"
                content={format(new Date(post.date), "yyyy-MM-dd")}
              />
              <div>{format(new Date(post.date), "d")}</div>
              <div>{format(new Date(post.date), "MMM")}</div> */}
            </div>
            <div className="box">
              {post.image && (
                <Link href={post.slug} className="d-block mb-4">
                  <div className="border-light rounded lh-1">
                    <img
                      src={post.image}
                      width={660}
                      height={361}
                      className="rounded"
                      alt={post.title}
                      itemProp="image"
                    />
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
                  <p itemProp="description">{post.summary}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="row items-center">
                  <div className="col">
                    <div
                      className="d-flex items-center"
                      itemProp="author"
                      itemScope={true}
                      itemType="https://schema.org/Person"
                    >
                      <div
                        className="avatar mr-3"
                        style={{
                          backgroundImage: 'url(/img/authors/codecalm.jpg)',
                        }}
                      />
                      <span itemProp="name">Paweł Kuna</span>
                      <meta itemProp="url" content="https://tabler.io" />
                    </div>
                  </div>
                  <div className="col-auto">
                    {/* <Link
                      href={post.slug}
                      className="btn"
                      aria-label={`Read more about "${post.title}"`}
                    >
                      Read more
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
