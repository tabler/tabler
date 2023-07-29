import { pricingPlanTeam as plan } from '@/config/pricing';
import Icon from '@/components/Icon';
import clsx from 'clsx';

export default function PricingCardTeam({ className }) {
  return (
    <div className={clsx('pricing-banner', className)}>
      <div className="row g items-center">
        <div className="lg:col">
          <h3>{plan.name}</h3>
          <p className="m-0">{plan.description}</p>
        </div>
        <div className="lg:col">
          <ul className="pricing-features m-0">
            {plan.features.map(feature => (
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
            {plan.price}
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
}
