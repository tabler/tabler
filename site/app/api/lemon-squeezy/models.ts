import { z } from 'zod'
 
const Attributes = z
  .object({
    pause: z.any().optional(),
    status: z.enum(['ON_TRIAL',  'ACTIVE',  'PAUSED',  'PAST_DUE',  'UNPAID',  'CANCELLED',  'EXPIRED']),
    orderId: z.number(),
    storeId: z.number(),
    cancelled: z.date().nullable().optional(),
    userName: z.string(),
    cardBrand: z.enum(['VISA',  'MASTERCARD',  'AMERICAN_EXPRESS',  'DISCOVER',  'JCB',  'DINERS_CLUB']),
    productId: z.number(),
    variantId: z.number(),
    customerId: z.number(),
    productName: z.string(),
    variantName: z.string(),
    orderItemId: z.number(),
    cardLastFour: z.string(),
    statusFormatted: z.string(),
  })
 
const Links = z
  .object({
    self: z.string(),
    related: z.string().optional(),
  })
 
const Order = z
  .object({
    links: Links,
  })
 
const Relationships = z
  .object({
    order: Order,
    store: Order,
    product: Order,
    variant: Order,
    customer: Order,
    orderItem: Order,
    subscriptionInvoices: Order,
  })
 
const Data = z
  .object({
    id: z.coerce.number(),
    type: z.string(),
    links: Links,
    attributes: Attributes,
    relationships: Relationships,
  })
 
const Meta = z
  .object({
    testMode: z.boolean(),
    eventName: z.string(),
    customData: z
      .object({
        userId: z.string(),
      })
  })
 
export const SLemonSqueezyWebhookRequest = z
  .object({
    data: Data,
    meta: Meta,
  })