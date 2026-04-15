'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { getZonesForBusinessType } from '@/lib/zones'
import { Shield, Check, Loader2, MapPin, Building2 } from 'lucide-react'

const BUSINESS_TYPES = [
  { value: 'bar', label: 'Bar', emoji: '🍺' },
  { value: 'nightclub', label: 'Nightclub', emoji: '🎵' },
  { value: 'lounge', label: 'Lounge', emoji: '🛋️' },
  { value: 'brewery', label: 'Brewery Taproom', emoji: '🍻' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'bar_and_restaurant', label: 'Bar & Restaurant', emoji: '🍸' },
  { value: 'salon', label: 'Salon / Barbershop', emoji: '✂️' },
  { value: 'spa', label: 'Spa / Nail Salon', emoji: '💅' },
  { value: 'retail', label: 'Retail Store', emoji: '🛍️' },
  { value: 'boutique', label: 'Boutique / Specialty', emoji: '👗' },
  { value: 'other', label: 'Other', emoji: '🏢' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationAddress, setLocationAddress] = useState('')
  const [enabledZones, setEnabledZones] = useState<Set<string>>(new Set())

  // Whenever the business type changes, reset the zone selection to the
  // recommended set for that type so users start from a sensible default.
  useEffect(() => {
    if (!businessType) return
    const zones = getZonesForBusinessType(businessType)
    setEnabledZones(new Set(zones.map(z => z.name)))
  }, [businessType])

  const totalSteps = 4
  const zonesForType = businessType ? getZonesForBusinessType(businessType) : []

  async function handleComplete() {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Upsert user record
      await supabase.from('shiftproof_users').upsert({
        id: user.id,
        email: user.email,
        subscription_status: 'trial',
        plan: 'free',
      })

      // Create location — store business_type alongside the legacy type field
      const { data: location, error: locError } = await supabase
        .from('shiftproof_locations')
        .insert({
          user_id: user.id,
          name: locationName || businessName,
          address: locationAddress,
          type: businessType,
          business_type: businessType,
        })
        .select()
        .single()
      if (locError) throw locError

      // Create zones — only the ones the user enabled
      const zones = zonesForType
        .filter(z => enabledZones.has(z.name))
        .map(z => ({
          location_id: location.id,
          name: z.name,
          sort_order: z.sort_order,
          checklist_items: z.checkpoints,
          is_active: true,
        }))
      const { error: zonesError } = await supabase.from('shiftproof_zones').insert(zones)
      if (zonesError) throw zonesError

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield className="w-7 h-7 text-amber-400" />
          <span className="text-xl font-bold">ShiftProof</span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${i + 1 <= step ? 'bg-amber-400' : 'bg-surface-border'}`}
            />
          ))}
        </div>

        <div className="bg-surface rounded-2xl border border-surface-border p-8">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to ShiftProof</h2>
              <p className="text-gray-400 mb-6">Let&apos;s get you set up in about 2 minutes. You&apos;ll tell us about your business, add your first location, and configure the zones you want to track.</p>
              <div className="space-y-3 mb-8">
                {['Set up your business profile', 'Add your first location', 'Configure inspection zones', 'Start your first walkthrough'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-xs font-bold">{i + 1}</div>
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          )}

          {/* Step 2: Business info */}
          {step === 2 && (
            <div>
              <Building2 className="w-8 h-8 text-amber-400 mb-3" />
              <h2 className="text-2xl font-bold mb-2">Your Business</h2>
              <p className="text-gray-400 mb-6">Tell us about what you&apos;re protecting.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Business name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="The Rusty Nail"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUSINESS_TYPES.map(bt => (
                      <button
                        key={bt.value}
                        type="button"
                        onClick={() => setBusinessType(bt.value)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${businessType === bt.value ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-surface-border bg-navy-700 text-gray-300 hover:border-gray-500'}`}
                      >
                        <span>{bt.emoji}</span> {bt.label}
                      </button>
                    ))}
                  </div>
                  {businessType && (
                    <p className="text-xs text-gray-500 mt-2">
                      {zonesForType.length} inspection zones pre-configured for this type
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg border border-surface-border text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!businessName || !businessType}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <MapPin className="w-8 h-8 text-amber-400 mb-3" />
              <h2 className="text-2xl font-bold mb-2">Add Your First Location</h2>
              <p className="text-gray-400 mb-6">If you have multiple locations, you can add more later.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Location name</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder={businessName || 'Main Location'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Address (optional)</label>
                  <input
                    type="text"
                    value={locationAddress}
                    onChange={e => setLocationAddress(e.target.value)}
                    className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="123 Main St, Portland, OR 97201"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-lg border border-surface-border text-gray-400 hover:text-white transition-colors text-sm">Back</button>
                <button onClick={() => setStep(4)} className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Zones */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Configure Inspection Zones</h2>
              <p className="text-gray-400 mb-4">
                We&apos;ve pre-selected the standard zones for a{' '}
                <span className="text-amber-400 font-medium">
                  {BUSINESS_TYPES.find(b => b.value === businessType)?.label}
                </span>. Uncheck anything you don&apos;t have.
              </p>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1 mb-6">
                {zonesForType.map(zone => (
                  <label
                    key={zone.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-navy-700 hover:bg-navy-600 cursor-pointer transition-colors border border-transparent hover:border-surface-border"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${enabledZones.has(zone.name) ? 'bg-amber-400 border-amber-400' : 'border-gray-500'}`}
                      onClick={() => {
                        const next = new Set(enabledZones)
                        if (next.has(zone.name)) next.delete(zone.name)
                        else next.add(zone.name)
                        setEnabledZones(next)
                      }}
                    >
                      {enabledZones.has(zone.name) && <Check className="w-3 h-3 text-navy-900" strokeWidth={3} />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{zone.name}</div>
                      <div className="text-xs text-gray-500">{zone.checkpoints.length} checkpoints</div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-4">{enabledZones.size} zones selected</p>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-lg border border-surface-border text-gray-400 hover:text-white transition-colors text-sm">Back</button>
                <button
                  onClick={handleComplete}
                  disabled={loading || enabledZones.size === 0}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
