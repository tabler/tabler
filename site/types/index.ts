import { type Session } from 'next-auth';
import { Prisma } from '@prisma/client'

export type IconType = {
  name: string
  tags: string[]
  svg: string
  version: string
  category: string
}

export type IconsType = IconType[]

export type DocsItem = {
  title: string
  items: {
    title: string
    href: string
    label?: string
  }[]
}

export type DocsConfigType = DocsItem[]

export type ExtendedSession = Session & { user?: { id?: string} }

const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { accounts: true, sessions: true, subscription: true },
})

export type User = Prisma.UserGetPayload<typeof userWithRelations>

const planWithRelations = Prisma.validator<Prisma.PlanDefaultArgs>()({
  include: { subscriptions: true },
})

export type Plan = Prisma.PlanGetPayload<typeof planWithRelations>

const subscriptionWithRelations = Prisma.validator<Prisma.SubscriptionDefaultArgs>()({
  include: { plan: true, user: true },
})

export type Subscription = Prisma.SubscriptionGetPayload<typeof subscriptionWithRelations>

export type SubscriptionState = {
  id?: number,
  planName?: string,
  planInterval?: string,
  productId?: number,
  variantId?: number,
  status?: string,
  renewalDate?: Date | null,
  trialEndDate?: Date | null,
  expiryDate?: Date | null,
  unpauseDate?: Date | null,
  price?: number,
} | undefined