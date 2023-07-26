import ResponsiveImage from '@/components/ResponsiveImage';
import features from '@/data/features';

export const metadata = {
  title: 'Tabler Features',
  description: 'Explore the powerful and versatile features of Tabler. Simplify tasks, boost productivity, and enhance your experience. Discover Tabler today!',
};

export default function FeaturesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title section-title-lg">Some examples built with Tabler</h2>
          <p className="section-description">Get everything you need for building amazing websites</p>
        </div>
        <div className="row g-3 md:g-4 xl:g-6" data-aos-id-blocks-features>
          {features.map(
            (feature, i) =>
              !feature.hide && (
                <div className="col-12 sm:col-6 md:col-4" key={i}>
                  <div data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks-features]" data-aos-delay={i * 100}>
                    <div className="mb-3 shadow-card rounded">
                      <ResponsiveImage
                        src={`/img/tabler/features-small/${feature.image}`}
                        width={368}
                        height={276}
                        className="rounded d-block"
                        alt={feature.title}
                      />
                    </div>
                    <h3 className="h4">{feature.title}</h3>
                    <p className="text-muted m-0">{feature.description}</p>
                  </div>
                </div>
              )
          )}
        </div>

        {/*<div className="mt-7">*/}
        {/*  <CTABannerEmails />*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
