import prisma from '@/lib/prisma'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'

const ls = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY as string)


async function processEvent(event) {

  let processingError = ''

  const customData = event.body['meta']['custom_data'] || null

  if (!customData || !customData['user_id']) {

    processingError = 'No user ID, can\'t process'

  } else {

    const obj = event.body['data']

    if (event.eventName.startsWith('subscription_payment_')) {
      // Save subscription invoices; obj is a "Subscription invoice"

      /* Not implemented */

    } else if (event.eventName.startsWith('subscription_')) {
      // Save subscriptions; obj is a "Subscription"

      const data = obj['attributes']

      // We assume the Plan table is up to date
      const plan = await prisma.plan.findUnique({
        where: {
          variantId: data['variant_id']
        },
      })

      if (!plan) {

        processingError = 'Plan not found in DB. Could not process webhook event.'

      } else {

        // Update the subscription

        const lemonSqueezyId = parseInt(obj['id'])

        // Get subscription's Price object
        // We save the Price value to the subscription so we can display it in the UI
        let priceData = await ls.getPrice({ id: data['first_subscription_item']['price_id'] })

        const updateData = {
          orderId: data['order_id'],
          name: data['user_name'],
          email: data['user_email'],
          status: data['status'],
          renewsAt: data['renews_at'],
          endsAt: data['ends_at'],
          trialEndsAt: data['trial_ends_at'],
          planId: plan['id'],
          userId: customData['user_id'],
          price: priceData['data']['attributes']['unit_price'],
          subscriptionItemId: data['first_subscription_item']['id'],
          // Save this for usage-based billing reporting; no need to if you use quantity-based billing
          isUsageBased: data['first_subscription_item']['is_usage_based'],
        }

        const createData = { ...updateData, lemonSqueezyId}
        createData.price = plan.price

        try {
          // Create/update subscription
          await prisma.subscription.upsert({
            where: {
              lemonSqueezyId: lemonSqueezyId
            },
            update: updateData,
            create: createData,
          })
        } catch (error) {
          processingError = error
          console.log(error)
        }

      }

    } else if (event.eventName.startsWith('order_')) {
      // Save orders; obj is a "Order"

      /* Not implemented */

    } else if (event.eventName.startsWith('license_')) {
      // Save license keys; obj is a "License key"

      /* Not implemented */

    }

    try {
      // Mark event as processed
      await prisma.webhookEvent.update({
        where: {
          id: event.id
        },
        data: {
          processed: true,
          processingError
        }
      })
    } catch (error) {
      console.log(error)
    }

  }
}


export async function POST(request: Request) {

  // Make sure request is from Lemon Squeezy
  
  const crypto = require('crypto')

  const rawBody = await request.text()

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(request.headers.get('X-Signature') || '', 'utf8')

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.')
  }

  // Now save the event

  const data = JSON.parse(rawBody)

  const event = await prisma.webhookEvent.create({
    data: {
      eventName: data['meta']['event_name'],
      body: data
    },
  })

  // Process the event
  // This could be done out of the main thread

  processEvent(event)
  
  return new Response('Done');
}