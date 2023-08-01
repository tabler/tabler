import { allChangelogs } from '@/.contentlayer/generated';
import Mdx from '@/components/MDX';
import { changelogEnabled } from '@/config/site';
import { dateTemplate, distanceToNow, format } from '@/lib/date';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Changelog',
  description: 'Discover the latest Tabler app updates and enhancements on our Changelog page. Stay informed and experience the best features!',
};

export default function ChangelogPage() {
  if (!changelogEnabled) {
    notFound();
  }

  const changelogs = allChangelogs
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .reverse();

  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <div className="section-header mb-0">
            <h2 className="section-title section-title-lg">Changelog</h2>
            <p className="section-description">
              Most recent updates, bug fixes, and introduction of new features.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container container-narrow">
          <div className="timeline">
            {changelogs.map((changelog) => (
              <div className="row g-7 timeline-item" key={changelog.version}>
                <div className="col-3 timeline-summary">
                  <div className="font-medium font-h4">v{changelog.version}</div>
                  <div
                    className="text-muted mb-3 font-h6"
                    itemProp="datePublished"
                    content={format(changelog.date, 'yyyy-MM-dd')}
                  >
                    Published{' '}
                    <time
                      dateTime={dateTemplate(changelog.date)}
                      className="text-muted"
                    >
                      {distanceToNow(changelog.date)}
                    </time>
                  </div>
                </div>
                <div className="col-9 timeline-description">
                  {changelog.title && <h3 className="mb-3">{changelog.title}</h3>}
                  <div className="markdown">
                    <Mdx code={changelog.body.code} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
