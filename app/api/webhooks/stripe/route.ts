import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Use service role for webhook — no user session
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        if (!userId) break

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        const priceId = subscription.items.data[0].price.id

        let plan = 'single'
        if (priceId === process.env.STRIPE_PRICE_ID_MULTI) plan = 'multi'
        else if (priceId === process.env.STRIPE_PRICE_ID_ENTERPRISE) plan = 'enterprise'

        await supabaseAdmin.from('shiftproof_users').update({
          stripe_customer_id: session.customer as string,
          subscription_status: 'active',
          plan,
        }).eq('id', userId)

        await supabaseAdmin.from('shiftproof_subscriptions').upsert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          current_period_start: new Date(((subscription as unknown as {current_period_start: number}).current_period_start) * 1000).toISOString(),
          current_period_end: new Date(((subscription as unknown as {current_period_end: number; cancel_at?: number}).current_period_end) * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'stripe_subscription_id' })
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const { data: user } = await supabaseAdmin
          .from('shiftproof_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (user) {
          await supabaseAdmin.from('shiftproof_users').update({
            subscription_status: subscription.status,
          }).eq('id', user.user_id)

          await supabaseAdmin.from('shiftproof_subscriptions').update({
            status: subscription.status,
            current_period_start: new Date(((subscription as unknown as {current_period_start: number}).current_period_start) * 1000).toISOString(),
            current_period_end: new Date(((subscription as unknown as {current_period_end: number; cancel_at?: number}).current_period_end) * 1000).toISOString(),
            cancel_at: ((subscription as unknown as {cancel_at?: number}).cancel_at) ? new Date(((subscription as unknown as {cancel_at?: number}).cancel_at as number) * 1000).toISOString() : null,
            updated_at: new Date().toISOString(),
          }).eq('stripe_subscription_id', subscription.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { data: sub } = await supabaseAdmin
          .from('shiftproof_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (sub) {
          await supabaseAdmin.from('shiftproof_users').update({
            subscription_status: 'canceled',
            plan: 'free',
          }).eq('id', sub.user_id)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        await supabaseAdmin.from('shiftproof_users').update({
          subscription_status: 'past_due',
        }).eq('stripe_customer_id', customerId)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// App Router handles body parsing natively — no config needed
