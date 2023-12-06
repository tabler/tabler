import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { PlansComponent } from '@/components/Manage'
import { getPlans, getSubscription } from '@/lib/data'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Change plan'
}

export default async function Page() {
  const session = await getSession()

  const sub = await getSubscription(session?.user?.id)

  if (!sub) {
    redirect('/billing')
  }

  const plans = await getPlans()

  return (
    <section className="section">
      <div className="container">
        <h2 className="page-title text-center">Change plan</h2>

        <Link href="/billing/" className="mb-6">&larr; Back to billing</Link>

        {sub.status == 'on_trial' && (
          <div className="my-8 p-4 h-subheader">
            You are currently on a free trial. You will not be charged when changing plans during a trial.
          </div>
        )}

        <PlansComponent plans={plans} sub={sub} />

        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </div>
    </section>
  )
}