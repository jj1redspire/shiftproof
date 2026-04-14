import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export const PLANS = {
  single: {
    name: 'Single Location',
    price: 49,
    priceId: process.env.STRIPE_PRICE_ID_SINGLE || '',
    locations: 1,
    description: '1 location',
  },
  multi: {
    name: 'Multi Location',
    price: 99,
    priceId: process.env.STRIPE_PRICE_ID_MULTI || '',
    locations: 5,
    description: '2-5 locations',
  },
  enterprise: {
    name: 'Enterprise',
    price: 199,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
    locations: 999,
    description: '6+ locations',
  },
} as const

export type PlanKey = keyof typeof PLANS
