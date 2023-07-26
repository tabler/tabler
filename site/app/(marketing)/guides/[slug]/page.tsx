import { notFound, useRouter } from 'next/navigation';
import { useClipboard } from '@/hooks';
import clsx from 'clsx';
import { allGuides } from 'contentlayer/generated';
import { escapeHtml, uiUrl } from '@/config/site';
import { dateTemplate, distanceToNow, format } from '@/lib/date';
import CTABannerEmails from '@/components/CTABAnnerEmails';
import Icon from '@/components/Icon';
import TablerSponsorsBanner from '@/components/TablerSponsorsBanner';
import Mdx from '@/components/MDX';

interface GuidePageProps {
  params: {
    slug: string
  }
}

async function getGuideFromParams(params) {
  const slug = params.slug || '';
  const guide = allGuides.find((guide) => guide.slugAsParams === slug);

  if (!guide) {
    null;
  }

  return guide;
}

export async function generateStaticParams(): Promise<
  GuidePageProps['params'][]
> {
  return allGuides.map((guide) => ({
    slug: guide.slugAsParams,
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideFromParams(params);

  if (!guide) {
    notFound();
  }

  const url = `${uiUrl}${guide.slug}`;

  // const router = useRouter(),
  //   currentPath = router.pathname,
  //   url = `${uiUrl}${guide.slug}`
  // clipboard = useClipboard()

  return (
    <>
      <section
        className="section"
        itemScope={true}
        itemType="https://schema.org/NewsArticle"
      >
        <div className="container">
          {/* {meta.date && (
            <div
              className="text-muted mb-3 font-h6"
              itemProp="datePublished"
              content={format(meta.date, "yyyy-MM-dd")}
            >
              Published{" "}
              <time dateTime={dateTemplate(meta.date)} className="text-muted">
                {distanceToNow(meta.date)}
              </time>
            </div>
          )} */}
          <h1 className="h0 mb-3" itemProp="headline">
            {guide.title}
          </h1>

          <div className="row">
            <div className="md:col-9 text-muted font-h4">{guide.summary}</div>
          </div>

          <div className="mt-6">
            <div className="row">
              <div className="md:col-8">
                {guide.image && (
                  <div className="mb-6">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="border-light rounded"
                      // lazy={true}
                      itemProp="image"
                    />
                  </div>
                )}

                <article className="markdown">
                  <Mdx code={guide.body.code} />
                </article>

                <TablerSponsorsBanner className="mt-7" />
              </div>
              <div className="md:col-3 md:order-first">
                {guide.tags && (
                  <div className="tags-list mt-3">
                    {guide.tags.map((tag) => (
                      <div className="tag" key={tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  itemProp="author"
                  itemScope={true}
                  itemType="https://schema.org/Person"
                >
                  <div
                    className="avatar avatar-xl avatar-rounded mb-3"
                    style={{
                      backgroundImage: 'url(/img/authors/codecalm.jpg)',
                    }}
                  ></div>
                  <div className="h4" itemProp="name">
                    Paweł Kuna
                  </div>
                  <div className="text-muted">Founder of Tabler</div>
                  <meta itemProp="url" content={uiUrl} />
                </div>

                <div className="btn-list mt-6">
                  <button
                    type="button"
                    className={clsx(
                      'btn btn-icon btn-circle'
                      // clipboard.copied ? "btn-green" : ""
                    )}
                    aria-label="Copy the Canonical link"
                    // onClick={() => clipboard.copy(url)}
                  >
                    {/* {clipboard.copied ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="link" />
                    )} */}
                  </button>
                  <a
                    className="btn btn-icon btn-circle"
                    target="_blank"
                    rel="noopener"
                    href={`https://twitter.com/share?url=${escapeHtml(
                      url
                    )}&text=${escapeHtml(guide.title)}`}
                  >
                    <Icon name="brand-twitter" />
                  </a>
                  <a
                    className="btn btn-icon btn-circle"
                    target="_blank"
                    rel="noopener"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${escapeHtml(
                      url
                    )}`}
                  >
                    <Icon name="brand-facebook" />
                  </a>
                  <a
                    className="btn btn-icon btn-circle"
                    target="_blank"
                    rel="noopener"
                    href={`https://www.linkedin.com/share?url=${escapeHtml(
                      url
                    )}`}
                  >
                    <Icon name="brand-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-light">
        <div className="container">
          <CTABannerEmails />
        </div>
      </section>
    </>
  );
}
