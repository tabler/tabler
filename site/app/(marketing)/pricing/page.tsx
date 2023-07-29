import { pricingPlansPersonal, pricingPlanTeam } from '@/config/pricing';
import clsx from 'clsx';
import Icon from '@/components/Icon';

export const metadata = {
  title: 'Tabler Pricing',
  description: 'Check out our pricing plans and choose the best option for your needs. Find affordable and flexible solutions for our products and services.',
};

const PricingCards = () => {
  return (
    <div className="pricing">
      {pricingPlansPersonal.map(plan => (
        <div
          key={plan.name}
          className={clsx('pricing-card', {
            featured: plan.featured
          })}
        >
          {plan.featured && (
            <div className="pricing-label">
              <div className="label label-primary">Popular</div>
            </div>
          )}

          <h4 className="pricing-title">{plan.name}</h4>

          <div className="pricing-price">
            <span className="pricing-price-currency">$</span>
            {plan.price}
            <div className="pricing-price-description">
              <div>per user</div>
              <div>per year</div>
            </div>
          </div>

          <ul className="pricing-features">
            {pricingPlanTeam.features.map(feature => (
              <li key={feature}>
                <Icon name="check" className="text-green mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pricing-btn">
            <a
              href="#"
              className={clsx('btn btn-block', {
                'btn-primary': plan.featured
              })}
            >
              Get started
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const PricingTeam = ({ className }) => {
  return (
    <div className={clsx('pricing-banner', className)}>
      <div className="row g items-center">
        <div className="lg:col">
          <h3>{pricingPlanTeam.name}</h3>
          <p className="m-0">{pricingPlanTeam.description}</p>
        </div>
        <div className="lg:col">
          <ul className="pricing-features m-0">
            {pricingPlanTeam.features.map(feature => (
              <li key={feature}>
                <Icon name="check" className="text-green mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-6 lg:col">
          <div className="pricing-price m-0">
            <span className="pricing-price-currency">$</span>
            {pricingPlanTeam.price}
            <div className="pricing-price-description">
              <div>per team</div>
              <div>per year</div>
            </div>
          </div>
        </div>
        <div className="sm:col-6 lg:col-auto">
          <a href="#" className="btn btn-primary btn-block">
            Get started
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="page-title">Simple, transparent pricing</h2>
            <p className="section-description">
              Get early access to 100+ components and free updates every month. Make it yours today!
            </p>
          </div>

          <PricingCards />

          <PricingTeam className="mt-5" />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="row gy">
            <div className="md:col-4 markdown">
              <h3>How is Tabler UI Pro different from Tabler UI?</h3>
              <p>
                Tabler UI provides the basic functional components you&apos;ll need to compose together to create your
                app or website. Pro components are assembled, building blocks and page templates you can drop-in your
                app to save time.
              </p>
            </div>
            <div className="md:col-4 markdown">
              <h3>Is this a yearly subscription?</h3>
              <p>
                No, you have a lifetime access to all our components. This means that you&apos;ll get new components and
                updates every month till we&apos;ve exhausted our component inspiration.
              </p>
            </div>
            <div className="md:col-4 markdown">
              <h3>I want to buy this but I can&apos;t afford it. Is there a discount?</h3>
              <p>
                If you&apos;re a student or if the price in your local currency is too high, kindly send an email to
                support@tabler.io stating your situation and we&apos;ll consider giving you a discount.
              </p>
            </div>
            <div className="md:col-4 markdown">
              <h3>What can I do with this license?</h3>
              <ul>
                <li>To build your websites or SaaS project that end-users need to pay</li>
                <li>To build an open-source tool or documentation website</li>
              </ul>
            </div>
            <div className="md:col-4 markdown">
              <h3>What version of Tabler UI is used?</h3>
              <p>
                The components in PRO are authored using Tabler UI v1.2+. If you&apos;re on v0.8, we recommend upgrading
                to the most recent version to use Pro components.
              </p>
            </div>
            <div className="md:col-4 markdown">
              <h3>What restrictions does this license have?</h3>
              <ul>
                <li>Create a clone of Tabler UI pro to sell</li>
                <li>
                  Create products like templates, themes, Figma or Sketch UI kits, page builders based on the PRO
                  components
                </li>
                <li>Recreate the components for other UI libraries or CSS frameworks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
