'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Shield, Camera, Mic, FileText, CheckCircle, ChevronDown, ChevronUp,
  AlertTriangle, DollarSign, ClipboardList, Droplets, Scissors
} from 'lucide-react'

const faqs = [
  {
    q: 'How long does the opening walkthrough take?',
    a: 'Under 5 minutes for most salons with 7-8 zones. The chemical storage zone takes an extra 30 seconds because there are more checkpoints — but those are the checkpoints that matter most for state board compliance.',
  },
  {
    q: 'How does this help with state board inspections?',
    a: 'Cosmetology board inspectors look at chemical labeling, ventilation, sanitation logs, and implement handling. When an inspector walks in, handing them 90 daily reports showing you check these things every morning is the difference between a warning and a fine. It also proves any deficiency was newly discovered — not an ongoing violation.',
  },
  {
    q: 'How does it protect against chemical damage claims at lease end?',
    a: "Hair color, bleach, and perm solutions cause accelerated surface wear. When your lease ends, landlords routinely charge $5,000-48,000 to restore counters, floors, and walls they claim were damaged by chemicals. Daily photo documentation proves which surfaces were already stained when you moved in — and documents any new damage the day it appears.",
  },
  {
    q: 'Is this useful for a barbershop without chemicals?',
    a: 'Yes. Barbershops still face lease deposit disputes, slip-and-fall claims near shampoo bowls, and OSHA bloodborne pathogen compliance for razor use. The zone template adjusts — the chemical storage zone becomes a simpler product storage zone.',
  },
  {
    q: 'Can I use this for a multi-location salon group?',
    a: 'The $99/month plan covers 2-5 locations. The $199/month plan covers unlimited. Each location has its own zone setup, walkthrough history, and damage log.',
  },
  {
    q: "What's in the Lease Defense Package?",
    a: 'All daily condition reports for your chosen date range, formatted as a professional document with your business name, location, and zone-by-zone condition history including photos. Specifically useful for salons: it shows the exact condition of counter surfaces, floors, and walls on every documented date — making it extremely difficult for landlords to claim chemical damage is your fault.',
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
    range: '$5K – $48K',
    desc: "Chemical damage to surfaces is the #1 landlord claim against salons at lease end. Hair color, bleach, and perm solutions cause accelerated wear that landlords charge $5,000-48,000 to restore. Daily photo documentation proves what was pre-existing on day one — and documents any new staining the exact day it appears.",
  },
  {
    icon: ClipboardList,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20 border-blue-700/30',
    title: 'State Board Inspection Readiness',
    range: 'Up to $2,500/violation',
    desc: "Cosmetology boards inspect sanitation, chemical storage, ventilation, and facility condition 1-4 times per year. Hand the inspector 90 daily reports showing proactive compliance — chemical labeling checked, ventilation documented, implements properly stored. It's the paper trail that turns a potential fine into a clean inspection.",
  },
  {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-900/20 border-red-700/30',
    title: 'Slip-and-Fall Defense',
    range: '$15K – $60K',
    desc: "Wet floors near shampoo bowls. Chemical spills in the color area. Water near pedicure stations. A documented morning walkthrough showing 'floors dry, anti-slip mats in place, no spills' is your defense. Without it, it's your word against the plaintiff's attorney's.",
  },
  {
    icon: Droplets,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20 border-amber-700/30',
    title: 'Insurance Claims',
    range: '$5K – $100K+',
    desc: "Water damage from shampoo bowl leaks. Chemical spills that damage adjacent tenant spaces. Break-ins. Your insurer needs baseline documentation showing you maintained the property properly. Daily condition reports create that proof — and establish exactly when damage first appeared.",
  },
]

const zones = [
  { name: 'Reception / Waiting Area', checkpoints: 8 },
  { name: 'Styling Stations', checkpoints: 9 },
  { name: 'Shampoo / Wash Area', checkpoints: 8 },
  { name: 'Color Mixing / Chemical Storage', checkpoints: 9 },
  { name: 'Restrooms', checkpoints: 9 },
  { name: 'Break Room / Storage', checkpoints: 8 },
  { name: 'Exterior / Signage', checkpoints: 8 },
]

export default function SalonsPage() {
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
            <Link href="/auth/signup?vertical=salon" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-sm py-2 px-5 rounded-lg transition-colors">
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
            <Scissors className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Built for salons — opening walkthrough in under 5 minutes</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Salon Opens<br />
            Every Morning.<br />
            <span className="text-amber-400">What Condition Is It In?</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Document your facility&apos;s condition in 3 minutes. Protect your lease deposit
            from chemical damage claims, ace state board inspections, and defend against
            slip-and-fall lawsuits with an irrefutable daily photo and AI report record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?vertical=salon"
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
            'Chemical storage compliance checkpoints',
            'State board inspection documentation',
            'OSHA bloodborne pathogen notes',
            'Lease deposit photo protection',
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
        <h2 className="text-3xl font-bold text-center mb-4">Four Ways ShiftProof Protects Your Salon</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          One 5-minute opening walkthrough per day creates documentation that defends you in four different liability scenarios salons face every year.
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
            Done before your first client walks in. No forms. No extra equipment.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01', icon: Camera, title: 'Walk & Photograph',
                desc: 'Open the app, tap Start Walkthrough. Move through each zone — reception, styling floor, shampoo area, chemical storage — snapping 2-3 photos each.',
              },
              {
                step: '02', icon: Mic, title: 'Dictate What You See',
                desc: 'Tap Record and say what you see. "Color area looks clean, one cabinet latch is loose." The AI flags the loose latch as a state board attention item automatically.',
              },
              {
                step: '03', icon: FileText, title: 'AI Builds Your Report',
                desc: 'ShiftProof structures your observations with salon-specific compliance context — flagging chemical storage issues, ventilation concerns, and bloodborne pathogen items at the right severity.',
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
            <div className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Salon Template</div>
            <h2 className="text-3xl font-bold mb-4">7 Pre-Built Zones, Salon-Specific Checkpoints</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The default salon template includes 7 zones with checkpoints written by people who understand what state boards actually inspect
              and what landlords actually claim at lease end.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              The <strong className="text-white">Color Mixing / Chemical Storage</strong> zone has 9 checkpoints specifically targeting chemical labeling,
              ventilation, SDS binder accessibility, and spill kit presence — the items most commonly cited in cosmetology board violations.
            </p>
            <p className="text-gray-400 text-sm mb-6">Add, remove, or rename any zone. Add custom checkpoints for your specific setup.</p>
            <Link
              href="/auth/signup?vertical=salon"
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
                  {zone.name.includes('Chemical') && (
                    <span className="text-xs bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded">board</span>
                  )}
                </div>
                <span className="text-gray-500 text-xs shrink-0">{zone.checkpoints} checkpoints</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State board callout */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ClipboardList className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">When the Inspector Walks In Unannounced</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
            Cosmetology board inspections are unannounced. When an inspector finds an unlabeled chemical container
            or a ventilation fan that&apos;s been running slow, the question is always the same:
            <strong className="text-white"> how long has this been like this?</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
              <div className="text-red-400 font-semibold mb-2 text-sm">Without ShiftProof</div>
              <p className="text-gray-400 text-sm">&ldquo;I&apos;m not sure when that happened.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Inspector hears: ongoing violation. Fine issued.</p>
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
              <div className="text-green-400 font-semibold mb-2 text-sm">With ShiftProof</div>
              <p className="text-gray-300 text-sm">&ldquo;That label was present Monday — here&apos;s the timestamped photo. I noticed it missing this morning and it&apos;s already on order.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Inspector hears: proactive compliance. Warning issued.</p>
            </div>
          </div>
          <Link
            href="/auth/signup?vertical=salon"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Documenting Tomorrow&apos;s Opening
          </Link>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">The Math for Salons</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { value: '$15,000', label: 'Average salon lease deposit', sub: 'at risk without documentation' },
            { value: '$2,500', label: 'State board fine per violation', sub: 'plus potential closure' },
            { value: '$49/mo', label: 'ShiftProof Single Location', sub: 'one prevented dispute = 25+ years' },
          ].map(item => (
            <div key={item.label} className="bg-surface rounded-xl border border-surface-border p-5 text-center">
              <div className="text-3xl font-black text-amber-400 mb-1">{item.value}</div>
              <div className="font-semibold text-sm mb-1 text-white">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sub}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Preventing one lease deposit dispute pays for 25+ years of ShiftProof.
          One state board violation prevented pays for 4 years. Both risks are real. The cost to address them isn&apos;t.
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
                features: ['1 location', 'Unlimited daily reports', 'Salon zone template', 'Chemical storage checkpoints', 'State board documentation', 'PDF evidence packages'],
                highlight: false,
              },
              {
                name: 'Multi Location', price: '$99', plan: 'multi',
                features: ['2–5 locations', 'Everything in Single', 'Location comparison', 'Portfolio damage view', 'Priority support'],
                highlight: true,
              },
              {
                name: 'Enterprise', price: '$199', plan: 'enterprise',
                features: ['Unlimited locations', 'Everything in Multi', 'Multi-brand support', 'Team access (coming soon)', 'Custom export branding'],
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
                  href={`/auth/signup?plan=${plan.plan}&vertical=salon`}
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
        <h2 className="text-4xl font-extrabold mb-4">Start Protecting Your Salon Tomorrow</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          5 minutes per morning. After 90 days you&apos;ll have documentation your landlord,
          your state board inspector, and your insurer cannot argue with.
        </p>
        <Link
          href="/auth/signup?vertical=salon"
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
            <Link href="/" className="hover:text-white transition-colors">Bars &amp; Nightclubs</Link>
            <Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <a href="mailto:joel@ashwardgroup.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
