import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { plan } = await request.json()
    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      metadata: { user_id: user.id },
      subscription_data: {
        trial_period_days: 14,
        metadata: { user_id: user.id },
      },
      customer_email: user.email,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
