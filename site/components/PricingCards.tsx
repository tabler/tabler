import { pricingPlansPersonal as plans } from '@/config/pricing';
import clsx from 'clsx';
import Icon from '@/components/Icon';

export default function PricingCards() {
  return (
    <div className="pricing">
      {plans.map(plan => (
        <div key={plan.name} className={clsx('pricing-card', { featured: plan.featured })}>
          {plan.featured && (
            <div className="pricing-label">
              <div className="label label-primary label-sm">Popular</div>
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
            {plan.features.map(feature => (
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
}
