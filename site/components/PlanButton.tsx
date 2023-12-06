'use client'

import { Dispatch, SetStateAction, useState, MouseEvent } from 'react'
import clsx from 'clsx';
import { isPlanFeatured } from '@/helpers';
import { Plan, SubscriptionState } from '@/types';

const PlanButton = ({ plan, subscription, setSubscription }:
  { plan: Plan, subscription: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {
  
  const [isMutating, setIsMutating] = useState(false)

  const createCheckout = async (e: MouseEvent<HTMLAnchorElement>, variantId: number) => {
    e.preventDefault()

    if (isMutating) return
    
    setIsMutating(true)

    // Create a checkout
    const res = await fetch('/api/checkouts', {
      method: 'POST',
      body: JSON.stringify({
        variantId: variantId
      })
    })
    const checkout = await res.json()
    if (checkout.error) {
      alert(checkout.message)
    } else {
      LemonSqueezy.Url.Open(checkout['url'])
    }
    
    setIsMutating(false)
  }

  const changePlan = async (e: MouseEvent<HTMLAnchorElement>, subscription: SubscriptionState, plan: Plan) => {
    e.preventDefault()

    if (isMutating) return

    if (confirm(`Please confirm you want to change to the ${plan.variantName} ${plan.interval}ly plan. \
For upgrades you will be charged a prorated amount.`)) {

      setIsMutating(true)

      // Send request
      const res = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'POST',
        body: JSON.stringify({
          variantId: plan.variantId,
          productId: plan.productId
        })
      })
      const result = await res.json()
      if (result.error) {
        alert(result.message)
      } else {
        setSubscription({
          ...subscription,
          productId: result['subscription']['product_id'],
          variantId: result['subscription']['variant_id'],
          planName: result['subscription']['plan']['name'],
          planInterval: result['subscription']['plan']['interval'],
          status: result['subscription']['status'],
          renewalDate: result['subscription']['renews_at'],
          price: result['subscription']['price']
        })

        alert('Your subscription plan has changed!')

        // Webhooks will update the DB in the background
      }
      
      setIsMutating(false)

    }
  }

  return (
    <>
      {(!subscription || subscription.status == 'expired') ? (
        // Show a "Sign up" button to customers with no subscription

        <div className="pricing-btn">
          <a
            href="#"
            onClick={(e) => createCheckout(e, plan.variantId)}
            className={clsx('btn btn-block', {
              'btn-primary': isPlanFeatured(plan),
              disabled: isMutating
            })}
          >
            Sign up
          </a>
        </div>    
      ) : (
        <>
          {subscription?.variantId == plan.variantId ? (
            <div className="pricing-btn">
              <span className="font-bold select-none">Your current plan</span>
            </div>
          ) : (
            <div className="pricing-btn">
              <a
                href="#"
                onClick={(e) => changePlan(e, subscription, plan)}
                className={clsx('btn btn-block', {
                  'btn-primary': isPlanFeatured(plan),
                  disabled: isMutating
                })}
              >
                Change to this plan
              </a>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default PlanButton