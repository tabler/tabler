import Link from '@/components/Link';
import tinytime from 'tinytime';
import CTABannerEmails from '@/components/CTABAnnerEmails';

export default function News() {
  const changelogs = [];
  const dateTemplate = tinytime('{MM} {DD}, {YYYY}');

  return (
    <section className="section section-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Refreshing posts from our blog</h2>
        </div>

        <div className="row xl:g-5">
          {/* {changelogs.map(({ slug, module: { default: Component, meta } }, i) => (
            <div className="col-12 md:col-6 lg:col-4" key={i} data-aos="zoom-y-out" data-aos-delay={i * 150}>
              <Link href={`/changelog/${slug}`} className="d-block text-reset">
                <div
                  className="ratio-16x9 mb-4 border-light rounded-lg"
                  style={{
                    backgroundColor: '#fff',
                    backgroundImage: meta?.image && `url(/img/changelog/${meta.image})`
                  }}
                />
                <h3 className="mb-2">{meta?.title}</h3>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <div className="row g-3 items-center">
                  <div className="col-auto">
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(/img/authors/codecalm.jpg)`
                      }}
                    />
                  </div>
                  <div className="col">
                    Paweł Kuna
                    <span className="text-muted"> - {dateTemplate.render(new Date(meta?.date.replace(' ', 'T')))}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))} */}
        </div>

        <div className="mt-7">
          <CTABannerEmails />
        </div>
      </div>
    </section>
  );
}
