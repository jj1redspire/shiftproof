'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CreditCard, ExternalLink, CheckCircle, Loader2 } from 'lucide-react'

const PLANS = [
  { key: 'single', name: 'Single Location', price: '$49/mo', locations: '1 location' },
  { key: 'multi', name: 'Multi Location', price: '$99/mo', locations: '2-5 locations' },
  { key: 'enterprise', name: 'Enterprise', price: '$199/mo', locations: '6+ locations' },
]

export default function BillingPage() {
  const [plan, setPlan] = useState('free')
  const [status, setStatus] = useState('trial')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('shiftproof_users').select('plan, subscription_status').eq('id', user.id).single()
      if (data) { setPlan(data.plan); setStatus(data.subscription_status) }
    }
    load()
  }, [])

  async function handleManageBilling() {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  async function handleUpgrade(planKey: string) {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planKey }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="w-6 h-6 text-amber-400" />
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      <div className="bg-surface border border-surface-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400 mb-1">Current plan</div>
            <div className="text-xl font-bold capitalize">{plan === 'free' ? '14-Day Free Trial' : plan}</div>
            <div className={`text-sm mt-1 ${status === 'active' ? 'text-green-400' : status === 'trial' ? 'text-amber-400' : 'text-red-400'}`}>
              {status === 'trial' ? 'Trial active' : status === 'active' ? 'Active subscription' : status}
            </div>
          </div>
          {plan !== 'free' && (
            <button
              onClick={handleManageBilling}
              disabled={loading}
              className="flex items-center gap-2 bg-surface-light hover:bg-surface-border border border-surface-border text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              Manage Billing
            </button>
          )}
        </div>
      </div>

      <h3 className="font-semibold mb-4">
        {plan === 'free' ? 'Choose a plan to continue after trial' : 'Available plans'}
      </h3>
      <div className="space-y-3">
        {PLANS.map(p => (
          <div key={p.key} className={`bg-surface border rounded-xl p-5 flex items-center justify-between ${plan === p.key ? 'border-amber-400 ring-1 ring-amber-400' : 'border-surface-border'}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{p.name}</span>
                {plan === p.key && <span className="bg-amber-400 text-navy-900 text-xs font-bold px-2 py-0.5 rounded-full">Current</span>}
              </div>
              <div className="text-gray-400 text-sm mt-0.5">{p.locations} · {p.price}</div>
            </div>
            {plan !== p.key && (
              <button
                onClick={() => handleUpgrade(p.key)}
                disabled={loading}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Select
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
