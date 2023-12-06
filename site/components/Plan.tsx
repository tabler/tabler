'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import PlanButton from '@/components/PlanButton'
import { isPlanFeatured } from '@/helpers';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import type { Plan, SubscriptionState } from '@/types';

function formatPrice(price: number) {
  const priceString = price.toString()
  const dollars = priceString.substring(0, priceString.length-2)
  const cents = priceString.substring(priceString.length-2)
  if (cents === '00') return dollars
  return `${dollars}.${cents}`
}

const formatDescription = (description?: string) => {
  if (!description) return;
  const pricingFeatures = description
    .replaceAll('<p>','')
    .replaceAll('</p>','')
    .split('<br>')
  return <ul className="pricing-features">
    {
      pricingFeatures.map((pricingFeature) => (
        <li key={pricingFeature}>
          <Icon name="check" className="text-green mr-2" />
          {pricingFeature}
        </li>
      ))
    }
  </ul>
}

const IntervalSwitcher = ({ intervalValue, changeInterval }:
  { intervalValue: string, changeInterval: Dispatch<SetStateAction<string>> }
) => {
  return (
    <div className="text-center mb-5">
      <span className="mr-2">Monthly</span>
      <label className="form-switch">
        <input 
          className="form-switch-input" 
          type="checkbox" 
          checked={intervalValue == 'year'}
          onChange={(e) => changeInterval(e.target.checked ? 'year' : 'month')}
        />
        <span className="slider"/>
      </label>
      <span className="ml-2">Yearly</span>
    </div>
  )
}


const PlanCard = ({ plan, subscription, intervalValue, setSubscription }:
  { plan: Plan, subscription: SubscriptionState, intervalValue: string, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {
  return (
    <div
      className={clsx({
        'featured': isPlanFeatured(plan),
        'pricing-card': plan.interval === intervalValue,
        'visually-hidden': plan.interval !== intervalValue,
      })}
    >
      {
        isPlanFeatured(plan) &&
        <div className="pricing-label">
          <div className="label label-primary label-sm">Popular</div>
        </div>
      }

      <h4 className="pricing-title">{plan.variantName}</h4> 

      <div className="pricing-price">
        <span className="pricing-price-currency">$</span>
        { formatPrice(plan.price) }
        <div className="pricing-price-description">
          <div>per {plan.interval}</div>
        </div>
      </div>
      
      {formatDescription(plan.description || '')}

      <PlanButton plan={plan} subscription={subscription} setSubscription={setSubscription} />
    </div>
  )
}

const PlanCards = ({ plans, subscription, setSubscription }:
  { plans: Plan[], subscription?: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {  

  const [intervalValue, setIntervalValue] = useState('month')

  // Make sure Lemon.js is loaded
  useEffect(() => {
    window.createLemonSqueezy()
  }, [])

  return (
    <>
      <IntervalSwitcher intervalValue={intervalValue} changeInterval={setIntervalValue} />

      <div className="pricing">

        {plans.map(plan => (
          <PlanCard plan={plan} subscription={subscription} intervalValue={intervalValue} key={plan.variantId} setSubscription={setSubscription} />
        ))}

      </div>

      <p className="h-subheader mt-8 text-center">
        Payments are processed securely by Lemon Squeezy.
      </p>
    </>
  )
}

export default PlanCards