'use client'

import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import PlanCards from '@/components/Plan'
import { Plan, Subscription, SubscriptionState } from '@/types'
import clsx from 'clsx'

export const UpdateBillingLink = ({ subscription, elementType }:
  { subscription: SubscriptionState, elementType?: string }
) => {  
  
  const [isMutating, setIsMutating] = useState(false)

  async function openUpdateModal(e: MouseEvent<HTMLAnchorElement>) {

    e.preventDefault()
    
    setIsMutating(true)

    /* Send request */
    const res = await fetch(`/api/subscriptions/${subscription?.id}`)
    const result = await res.json()
    if (result.error) {
      alert(result.message)
      setIsMutating(false)

    } else {

      LemonSqueezy.Url.Open(result.subscription.update_billing_url)
      setIsMutating(false)

    }
  }

  if (elementType == 'button') {
    return (
      <a 
        href=""
        onClick={openUpdateModal}
        className={clsx('px-6 py-2 font-bold btn btn-block', {
          disabled: isMutating
        })}      
      >
        Update your payment method
      </a>
    )
  } else {
    return (
      <a 
        href=""
        onClick={openUpdateModal}
        className={clsx('mb-2', {
          disabled: isMutating
        })}      
      >
        Update your payment method
      </a>
    )
  }
}

export const CancelLink = ({ subscription, setSubscription }:
  { subscription: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {   
  
  const [isMutating, setIsMutating] = useState(false)

  async function handleCancel(e: MouseEvent<HTMLAnchorElement>) {

    e.preventDefault()

    if (confirm(`Please confirm you want to cancel your subscription.`)) {

      setIsMutating(true)

      /* Send request */
      const res = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'cancel'
        })
      })
      const result = await res.json()
      if (result.error) {
        alert(result.message)
        setIsMutating(false)

      } else {
        
        setSubscription({
          ...subscription,
          status: result['subscription']['status'],
          expiryDate: result['subscription']['ends_at'],
        })

        alert('Your subscription has been cancelled.')
      }
    }
  }

  return (
    <a 
      href=""
      onClick={handleCancel}
      className={clsx('mb-2', {
        disabled: isMutating
      })}    
    >
      Cancel
    </a>
  )
}

export const ResumeButton = ({ subscription, setSubscription }:
  { subscription: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {     

  const [isMutating, setIsMutating] = useState(false)

  const resumeSubscription = async (e: MouseEvent<HTMLAnchorElement>) => {
    
    e.preventDefault()

    if (confirm(`Please confirm you want to resume your subscription. You will be charged the regular subscription fee.`)) {

      setIsMutating(true)

      /* Send request */
      const res = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'resume'
        })
      })
      const result = await res.json()
      if (result.error) {
        alert(result.message)
        setIsMutating(false)
      } else {
        
        setSubscription({
          ...subscription,
          status: result['subscription']['status'],
          renewalDate: result['subscription']['renews_at'],
        })

        alert('Your subscription is now active again!.')
      }
    }
  }

  return (
    <a 
      href="" 
      onClick={resumeSubscription} 
      className={clsx('px-6 py-2 font-bold btn btn-block', {
        disabled: isMutating
      })}       
    >
      Resume your subscription
    </a>
  )
}

export const PauseLink = ({ subscription, setSubscription }:
  { subscription: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {   
  
  const [isMutating, setIsMutating] = useState(false)

  async function handlePause(e: MouseEvent<HTMLAnchorElement>) {

    e.preventDefault()

    if (confirm(`Please confirm you want to pause your subscription.`)) {

      setIsMutating(true)

      /* Send request */
      const res = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'pause'
        })
      })
      const result = await res.json()
      if (result.error) {
        alert(result.message)
        setIsMutating(false)

      } else {
        
        setSubscription({
          ...subscription,
          status: result['subscription']['status'],
          unpauseDate: result['subscription']['resumes_at'],
        })

        alert('Your subscription has been paused.')
      }
    }
  }

  return (
    <a 
      href="" 
      className={clsx('mb-2', {
        disabled: isMutating
      })}
      onClick={handlePause}
    >
      Pause payments
    </a>
  )
}

export const UnpauseButton = ({ subscription, setSubscription }:
  { subscription: SubscriptionState, setSubscription: Dispatch<SetStateAction<SubscriptionState>> }
) => {   

  const [isMutating, setIsMutating] = useState(false)

  const unpauseSubscription = async (e: MouseEvent<HTMLAnchorElement>) => {
    
    e.preventDefault()

    if (confirm(`Please confirm you want to unpause your subscription. Your payments will reactivate on their original schedule.`)) {

      setIsMutating(true)

      /* Send request */
      const res = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'unpause'
        })
      })
      const result = await res.json()
      if (result.error) {
        alert(result.message)
        setIsMutating(false)
      } else {
        
        setSubscription({
          ...subscription,
          status: result['subscription']['status'],
          renewalDate: result['subscription']['renews_at'],
        })

        alert('Your subscription is now active again!')
      }
    }
  }

  return (
    <a href="" 
      onClick={unpauseSubscription}
      className={clsx('px-6 py-2 font-bold btn btn-block', {
        disabled: isMutating
      })}
    >
      Unpause your subscription
    </a>
  )
}

export const PlansComponent = ({ plans, sub }:
  { plans: Plan[], sub: Subscription }
) => {  

  const [subscription, setSubscription] = useState<SubscriptionState>(() => {
    if (sub) {
      return {
        id: sub.lemonSqueezyId,
        planName: sub.plan?.variantName,
        planInterval: sub.plan?.interval,
        productId: sub.plan?.productId,
        variantId: sub.plan?.variantId,
        status: sub.status,
        renewalDate: sub.renewsAt,
        trialEndDate: sub.trialEndsAt,
        expiryDate: sub.endsAt,
      }
    } else {
      return undefined
    }
  })

  return (
    <PlanCards plans={plans} subscription={subscription} setSubscription={setSubscription} />
  )
}