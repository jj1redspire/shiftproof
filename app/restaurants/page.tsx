'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Shield, Camera, Mic, FileText, CheckCircle, ChevronDown, ChevronUp,
  AlertTriangle, DollarSign, ClipboardList, Flame
} from 'lucide-react'

const faqs = [
  {
    q: 'How long does the opening walkthrough take?',
    a: 'Under 5 minutes for most restaurants with 8-10 zones. You snap photos and dictate observations as you walk. The AI structures the report — you just review and move to the next zone.',
  },
  {
    q: 'How does this help with health inspections?',
    a: "Health inspectors look at documented maintenance history. If they find a loose floor tile or worn door seal, a 90-day record showing it was just discovered — not ignored for months — is the difference between a warning and a citation. ShiftProof gives you that paper trail automatically.",
  },
  {
    q: 'What if a customer claims they slipped and fell last Tuesday?',
    a: "Pull up last Tuesday's opening walkthrough. It shows floor condition, mat placement, and drainage status documented before service started. That timestamped report with photos is your defense. Without it, it's your word against theirs.",
  },
  {
    q: 'Can I use this for multiple locations?',
    a: 'The $99/month plan covers 2-5 locations. The $199/month plan covers unlimited. Each location has its own zone setup, walkthrough history, and damage log.',
  },
  {
    q: 'What happens after my 14-day trial?',
    a: "You'll be prompted to enter a credit card to continue. Your data stays intact regardless. If you cancel, you can export all reports as PDFs before access ends.",
  },
  {
    q: "What's in the Lease Defense Package?",
    a: 'All daily condition reports for your chosen date range, formatted as a single professional document with your business name, location, date range, and zone-by-zone condition history. Attorneys have confirmed this level of documentation strengthens lease deposit disputes significantly.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-surface-border rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-5 text-left bg-surface hover:bg-surface-light transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-white">{faq.q}</span>
            {open === i
              ? <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
              : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-5 bg-surface text-gray-300 text-sm leading-relaxed">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

const valueBlocks = [
  {
    icon: DollarSign,
    color: 'text-green-400',
    bg: 'bg-green-900/20 border-green-700/30',
    title: 'Lease Protection',
    range: '$5K – $90K',
    desc: 'Restaurant lease deposits are larger than most bars — often 3-6 months of rent on a $5K/month space. Without daily documentation showing pre-existing conditions, landlords keep every dollar. With ShiftProof, you have timestamped proof for every zone, every day.',
  },
  {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-900/20 border-red-700/30',
    title: 'Slip-and-Fall Defense',
    range: '$15K – $75K',
    desc: 'Restaurants are slip-and-fall targets. Wet floors, worn mats, uneven pavers — plaintiffs\' attorneys love them. Your daily opening walkthrough documents floor condition, mat placement, and drainage before a single customer walks in. That timestamped record is your defense.',
  },
  {
    icon: ClipboardList,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20 border-blue-700/30',
    title: 'Health Inspection Defense',
    range: 'Fines + closures',
    desc: 'When an inspector finds an issue, the question is always: did you know? A 90-day documented history showing you check grease traps, door seals, and floor drains every opening shift is the difference between a warning and a critical violation. ShiftProof builds that record automatically.',
  },
  {
    icon: Flame,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20 border-amber-700/30',
    title: 'Insurance Claims',
    range: '$10K – $500K+',
    desc: 'Equipment failures, fire suppression discharges, refrigeration losses, water damage — insurers deny claims when they can argue negligence. Daily documented checks of your hood system, fire suppression, walk-in seals, and kitchen equipment show you maintained the property properly.',
  },
]

const zones = [
  { name: 'Host / Entry / Vestibule', checkpoints: 8 },
  { name: 'Dining Room — Main', checkpoints: 8 },
  { name: 'Dining Room — Private / Event Space', checkpoints: 7 },
  { name: 'Bar Area', checkpoints: 9 },
  { name: 'Kitchen', checkpoints: 11 },
  { name: "Restrooms — Women's", checkpoints: 9 },
  { name: "Restrooms — Men's", checkpoints: 9 },
  { name: 'Patio / Outdoor Dining', checkpoints: 8 },
  { name: 'Parking Lot / Exterior', checkpoints: 8 },
  { name: 'Storage / Office / Break Room', checkpoints: 8 },
]

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-navy-800">
      {/* Nav */}
      <nav className="border-b border-surface-border bg-navy-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-bold text-white">ShiftProof</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-300 hover:text-white text-sm transition-colors">Sign in</Link>
            <Link href="/auth/signup?vertical=restaurant" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-sm py-2 px-5 rounded-lg transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-800" />
        <div className="relative max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-8">
            <ClipboardList className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Built for restaurants — opening walkthrough in under 5 minutes</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Restaurant Opens<br />
            Every Morning.<br />
            <span className="text-amber-400">What Condition Is It In?</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Document your facility&apos;s condition in 3 minutes at opening. Protect your lease deposit,
            win insurance claims, ace health inspections, and defend against slip-and-fall
            lawsuits with an irrefutable daily photo and AI report record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?vertical=restaurant"
              className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-lg py-4 px-8 rounded-xl inline-block transition-colors"
            >
              Start Your Free 14-Day Trial
            </Link>
            <a
              href="#how-it-works"
              className="bg-surface-light hover:bg-surface-border text-white font-medium text-lg py-4 px-8 rounded-xl inline-block border border-surface-border transition-colors"
            >
              See How It Works
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-navy-900 border-y border-surface-border py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          {[
            'Restaurant-specific zone templates',
            'Kitchen + grease trap checkpoints',
            'Health inspection defense documentation',
            'Opening walkthrough optimized',
          ].map(f => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Value blocks */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Four Ways ShiftProof Protects Your Restaurant</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          One 5-minute opening walkthrough per day creates documentation that defends you in four different liability scenarios.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {valueBlocks.map(block => (
            <div key={block.title} className={`border rounded-xl p-6 ${block.bg}`}>
              <div className="flex items-start gap-4">
                <block.icon className={`w-8 h-8 shrink-0 mt-0.5 ${block.color}`} />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white">{block.title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-navy-900/50 ${block.color}`}>
                      {block.range}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{block.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-navy-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Three Steps at Opening Time</h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            Done before your first server clocks in. No training required.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01', icon: Camera, title: 'Walk & Photograph',
                desc: 'Open the app, tap Start Walkthrough. Move zone to zone — dining room, kitchen, restrooms, patio — snapping 2-3 photos each.',
              },
              {
                step: '02', icon: Mic, title: 'Dictate What You See',
                desc: 'Tap Record and say what you see. "Kitchen floor clean, walk-in cooler seal looks worn on the right side." That\'s all it takes.',
              },
              {
                step: '03', icon: FileText, title: 'AI Builds Your Report',
                desc: 'ShiftProof structures your voice notes, flags new damage, notes maintenance items, and generates your Opening Condition Report automatically.',
              },
            ].map(item => (
              <div key={item.step} className="bg-surface rounded-xl border border-surface-border p-6">
                <div className="text-6xl font-black text-surface-border mb-4">{item.step}</div>
                <item.icon className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone list */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Restaurant Template</div>
            <h2 className="text-3xl font-bold mb-4">10 Pre-Built Zones, Restaurant-Specific Checkpoints</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The default restaurant template includes 10 zones with checkpoints written specifically for restaurant operations — not generic office building items.
              Kitchen checkpoints include grease traps, walk-in cooler door seals, and hood/ventilation. Entry includes the host stand and wait area.
            </p>
            <p className="text-gray-400 text-sm mb-4">Add, remove, or rename any zone. Add custom checkpoints. The template is a starting point, not a cage.</p>
            <Link
              href="/auth/signup?vertical=restaurant"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
          <div className="space-y-2">
            {zones.map((zone, i) => (
              <div key={zone.name} className="bg-surface border border-surface-border rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-white">{zone.name}</span>
                </div>
                <span className="text-gray-500 text-xs shrink-0">{zone.checkpoints} checkpoints</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health inspection callout */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ClipboardList className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">The Health Inspection Paper Trail You&apos;ve Never Had</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
            When a health inspector walks in and finds a worn door seal on your walk-in cooler,
            the follow-up question is: <strong className="text-white">how long has this been like this?</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
              <div className="text-red-400 font-semibold mb-2 text-sm">Without ShiftProof</div>
              <p className="text-gray-400 text-sm">&ldquo;I don&apos;t know exactly when it happened.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Inspector hears: this could have been a problem for months.</p>
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
              <div className="text-green-400 font-semibold mb-2 text-sm">With ShiftProof</div>
              <p className="text-gray-300 text-sm">&ldquo;This was documented as good condition at opening Tuesday. The damage appeared Wednesday morning — here&apos;s the timestamped report and photos.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Inspector hears: this was caught immediately and documented.</p>
            </div>
          </div>
          <Link
            href="/auth/signup?vertical=restaurant"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Documenting Tomorrow&apos;s Opening
          </Link>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">The Math Is Even More Obvious for Restaurants</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { value: '$30K+', label: 'Avg restaurant lease deposit', sub: 'at risk without documentation' },
            { value: '$35K', label: 'Avg slip-and-fall payout', sub: 'industry settlement average' },
            { value: '$5K+', label: 'Health citation + closure', sub: 'lost revenue + fines' },
            { value: '$588', label: 'ShiftProof for a year', sub: 'at $49/month' },
          ].map(item => (
            <div key={item.label} className="bg-surface rounded-xl border border-surface-border p-4 text-center">
              <div className="text-2xl font-black text-amber-400 mb-1">{item.value}</div>
              <div className="font-semibold text-xs mb-1 text-white">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sub}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          A single lease dispute, slip-and-fall claim, or health closure pays for decades of ShiftProof.
          The question is not whether you can afford it.
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-navy-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-center mb-12">14-day free trial on all plans. No credit card required.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Single Location', price: '$49', plan: 'single',
                features: ['1 location', 'Unlimited daily reports', 'Restaurant zone template', 'Damage log', 'AI voice structuring', 'PDF evidence packages'],
                highlight: false,
              },
              {
                name: 'Multi Location', price: '$99', plan: 'multi',
                features: ['2–5 locations', 'Everything in Single', 'Location comparison', 'Portfolio damage view', 'Priority support'],
                highlight: true,
              },
              {
                name: 'Enterprise', price: '$199', plan: 'enterprise',
                features: ['Unlimited locations', 'Everything in Multi', 'Multi-concept support', 'Team access (coming soon)', 'Custom export branding'],
                highlight: false,
              },
            ].map(plan => (
              <div key={plan.name} className={`bg-surface rounded-xl border p-6 flex flex-col relative ${plan.highlight ? 'border-amber-400 ring-1 ring-amber-400' : 'border-surface-border'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="font-bold text-lg mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-400 mb-1">/mo</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/auth/signup?plan=${plan.plan}&vertical=restaurant`}
                  className={`block text-center py-3 rounded-lg font-bold transition-colors ${plan.highlight ? 'bg-amber-400 hover:bg-amber-500 text-navy-900' : 'bg-surface-light hover:bg-surface-border text-white border border-surface-border'}`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <FAQ />
      </section>

      {/* Final CTA */}
      <section className="bg-navy-900 border-t border-surface-border py-20 text-center px-4">
        <h2 className="text-4xl font-extrabold mb-4">Start Documenting Tomorrow&apos;s Opening</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          First walkthrough takes 5 minutes. After 90 days you&apos;ll have documentation your landlord,
          your insurer, and the health department cannot argue with.
        </p>
        <Link
          href="/auth/signup?vertical=restaurant"
          className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-lg py-4 px-10 rounded-xl inline-block transition-colors"
        >
          Start Your Free 14-Day Trial
        </Link>
        <p className="text-gray-500 text-sm mt-4">No credit card required. Cancel anytime.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white">ShiftProof</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Bar &amp; Nightclub</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <a href="mailto:joel@helmport.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
