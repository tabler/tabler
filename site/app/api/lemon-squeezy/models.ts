import { z } from 'zod'
 
const Attributes = z
  .object({
    pause: z.any().optional(),
    status: z.enum(['on_trial', 'active', 'paused', 'past_due', 'unpaid', 'cancelled', 'expired']),
    order_id: z.number(),
    store_id: z.number(),
    cancelled: z.boolean().nullable().optional(),
    user_name: z.string(),
    card_brand: z.enum(['visa', 'mastercard', 'american_express', 'discover', 'jcb', 'diners_club']),
    product_id: z.number(),
    variant_id: z.number(),
    customer_id: z.number(),
    product_name: z.string(),
    variant_name: z.string(),
    order_item_id: z.number(),
    card_last_four: z.string(),
    status_formatted: z.string(),
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
    'order-item': Order,
    'subscription-invoices': Order,
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
    test_mode: z.boolean(),
    event_name: z.string(),
  })
 
export const SLemonSqueezyWebhookRequest = z
  .object({
    data: Data,
    meta: Meta,
  })