import { getSession } from '@/lib/auth'
import { getPlans, getSubscription } from '@/lib/data'
/* Full in-app billing component */
import { SubscriptionComponent } from '@/components/Subscription'

export const metadata = {
  title: 'Billing'
}

export default async function Page() {
  const session = await getSession()

  const plans = await getPlans()

  const sub = await getSubscription(session?.user?.id)

  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title text-center">Billing</h2>

        <SubscriptionComponent sub={sub} plans={plans} />

        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </div>
    </section>
  )
}