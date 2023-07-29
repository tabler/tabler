import { allGuides } from 'contentlayer/generated';

import { format } from '@/lib/date';
import Link from '@/components/Link';

export const metadata = {
  title: 'Guides',
  description: 'Learn how to use Tabler effectively with our comprehensive guides. Master the app and streamline your workflow today.',
};

export default async function GuidesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title section-title-lg">Guides</h2>
          <p className="section-description">
            The most interesting articles to help you build better applications
          </p>
        </div>

        <div className="guides sm:gx-6 xl:gx-7">
          {allGuides.map((guide, i) => (
            <div
              className="guide"
              key={guide.slug}
              itemScope={true}
              itemType="https://schema.org/NewsArticle"
            >
              <div className="guide-date">
                <meta
                  itemProp="datePublished"
                  content={format(guide.date, 'yyyy-MM-dd')}
                />
                <div>{format(guide.date, 'd')}</div>
                <div>{format(guide.date, 'MMM')}</div>
              </div>
              <div className="box">
                {guide.image && (
                  <Link href={guide.slug} className="d-block mb-4">
                    <div className="border-light rounded lh-1">
                      <img
                        src={guide.image}
                        width={660}
                        height={361}
                        className="rounded"
                        alt={guide.title}
                        itemProp="image"
                      />
                    </div>
                  </Link>
                )}
                <div>
                  {guide.title && (
                    <h2>
                      <meta itemProp="headline" content={guide?.title} />
                      <meta itemProp="url" content={guide.slug} />
                      <Link href={guide.slug}>{guide?.title}</Link>
                    </h2>
                  )}

                  <div className="markdown text-muted">
                    <p itemProp="description">{guide.summary}</p>
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
                      <Link
                        href={guide.slug}
                        className="btn"
                        aria-label={`Read more about "${guide.title}"`}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// export async function getStaticProps() {
//   const guides = await getAllGuides(['slug', 'title', 'summary', 'date', 'image'])

//   return {
//     props: {
//       guides,
//       menu: 'guides',
//       meta: {
//         bodyClassName: 'bg-light',
//         title: 'Guides - The most interesting articles to help you build better applications',
//       },
//     },
//   }
// }
