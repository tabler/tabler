import prisma from '@/lib/prisma'
import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { SLemonSqueezyWebhookRequest } from './models'
  
export async function POST(request: Request) { 
  const secret = process.env.LEMON_SQUEEZY_SIGNING_SECRET
 
  if (!secret) {
    throw new Error('LEMON_SQUEEZY_SIGNING_SECRET is not set')
  }
 
  const rawBody = await request.text()
 
  if (!rawBody) {
    throw new Error('No body')
  }
 
  const xSignature = request.headers.get('X-Signature')
 
  const hmac = crypto.createHmac('sha256', secret)
 
  hmac.update(rawBody)
  const digest = hmac.digest('hex')
 
  if (
    !xSignature ||
    !crypto.timingSafeEqual(Buffer.from(digest, 'hex'), Buffer.from(xSignature, 'hex'))
  ) {
    throw new Error('Invalid signature.')
  }
 
  const body = JSON.parse(rawBody)
 
  const type = body.data.type
 
  if (type === 'subscriptions') {
    const parsedBody = SLemonSqueezyWebhookRequest.parse(body)

    if (parsedBody.meta.event_name === 'subscription_created') {
      const createdSubscription = await prisma.subscription.create({
        data: {
          id: parsedBody.data.id,
          ...parsedBody.data.attributes,
        },
        select: {
          id: true,
        },
      });
        
      console.log(`Inserted subscription with id ${createdSubscription.id}`)
 
      return NextResponse.json({
        status: 'ok',
      })
    }
 
    if (parsedBody.meta.event_name === 'subscription_updated') {
      const updatedSubscription = await prisma.subscription.update({
        where: {
          id: parsedBody.data.id,
        },
        data: {
          id: parsedBody.data.id,
          ...parsedBody.data.attributes,
        },
        select: {
          id: true,
        },
      });
        
      console.log(`Updated subscription with id: ${updatedSubscription.id}`)
 
      return NextResponse.json({
        status: 'ok',
      })
    }
  }
}