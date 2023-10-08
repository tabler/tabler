import { z } from 'zod';

const SPagination = z.object({
  currentPage: z.number(),
  from: z.number(),
  lastPage: z.number(),
  perPage: z.number(),
  to: z.number(),
  total: z.number(),
});

const SMeta = z.object({
  page: SPagination,
});

const SJsonapi = z.object({
  version: z.string(),
});

const SLinks = z.object({
  first: z.string(),
  last: z.string(),
});

const SProductRelationships = z.object({
  links: z.object({
    related: z.string(),
    self: z.string(),
  }),
});

const SAttributes = z.object({
  product_id: z.number().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  is_subscription: z.boolean().optional(),
  interval: z.string().nullable().optional(),
  interval_count: z.number().nullable().optional(),
  has_free_trial: z.boolean().optional(),
  trial_interval: z.string().optional(),
  trial_interval_count: z.number().optional(),
  pay_what_you_want: z.boolean(),
  min_price: z.number().optional(),
  suggested_price: z.number().optional(),
  has_license_keys: z.boolean().optional(),
  license_activation_limit: z.number().optional(),
  is_license_limit_unlimited: z.boolean().optional(),
  license_length_value: z.number().optional(),
  license_length_unit: z.string().optional(),
  is_license_length_unlimited: z.boolean().optional(),
  sort: z.number().optional(),
  status: z.string(),
  status_formatted: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SVariants = z.object({
  type: z.string(),
  id: z.string(),
  attributes: SAttributes,
  relationships: z.object({
    product: SProductRelationships.optional(),
  }),
  links: z.object({
    self: z.string(),
  }),
});

export const SLemonSqueezyRequest = z.object({
  meta: SMeta,
  jsonapi: SJsonapi,
  links: SLinks,
  data: z.array(SVariants),
});

export type TLemonSqueezyRequest = z.infer<typeof SLemonSqueezyRequest>;