'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Shield, Camera, Mic, FileText, CheckCircle, ChevronDown,
  AlertTriangle, DollarSign, Lock, CloudRain, ShoppingBag
} from 'lucide-react'

const faqs = [
  {
    q: 'How long does the opening walkthrough take?',
    a: 'Under 5 minutes for most retail stores with 8 zones. Walk your floor, snap photos, dictate what you see. The AI structures the report — flagging security camera issues, aisle hazards, and fixture damage at the right severity levels automatically.',
  },
  {
    q: 'How does this help with lease deposit disputes?',
    a: "Landlords love to charge retailers at lease end for damage to custom fixtures, display walls, built-in shelving, and specialty lighting. Daily photo documentation proves the exact condition of every surface on every date — making it impossible to claim something deteriorated on your watch when you have 365 days of photos showing it was already that way.",
  },
  {
    q: 'What does shrinkage documentation mean?',
    a: 'When you file an insurance claim for theft, your insurer asks for documentation showing your security measures were operational. Daily logs showing cameras on, display cases locked, and EAS systems functional strengthen every theft claim and reduce the chance of a denial.',
  },
  {
    q: 'How does it help with slip-and-fall claims?',
    a: "Your morning walkthrough documents aisle conditions, floor hazards, mat placement, and broken fixtures before a single customer walks in. When a plaintiff's attorney claims your store had a hazard 'for weeks,' your 90-day record of daily condition checks is your answer.",
  },
  {
    q: 'Does it work for a mall or strip center location?',
    a: 'Yes. The zone template works for any retail footprint. If you have a mall storefront without a parking lot, just disable the Parking Lot zone during onboarding. Add or rename zones to match your exact space.',
  },
  {
    q: 'Can I add custom zones for a specialty layout?',
    a: "Absolutely. The 8-zone retail template is a starting point. Add a Wine Cellar zone, a Back Bar zone, a Greenhouse zone — whatever your specific footprint requires. Every zone gets the same AI structuring and condition tracking.",
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
              ? <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 rotate-180" />
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
    range: '$5K – $60K',
    desc: "Custom fixtures, display walls, specialty lighting, built-in shelving. Your landlord will claim damage to all of it at lease end. Daily documentation proves what you built vs what deteriorated vs what was pre-existing. You have photos for every zone, every date.",
  },
  {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-900/20 border-red-700/30',
    title: 'Slip-and-Fall Defense',
    range: '$10K – $100K',
    desc: "Customers trip over displays, slip on wet floors near the entrance, injure themselves on broken fixtures. Average retail settlement: $10,000-100,000. Your morning walkthrough documenting 'aisles clear, mats in place, no hazards' is your defense. Without it, it's your word against their attorney.",
  },
  {
    icon: Lock,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20 border-purple-700/30',
    title: 'Shrinkage Documentation',
    range: 'Theft claims',
    desc: "Filing an insurance claim for theft? Documenting the condition of security measures daily — cameras operational, display cases locked, security tags in place — strengthens every claim and gives your insurer what they need to approve it instead of deny it.",
  },
  {
    icon: CloudRain,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20 border-amber-700/30',
    title: 'Insurance Claims',
    range: '$5K – $500K+',
    desc: "Water damage from roof leaks, break-ins, weather events, sprinkler discharges. Your insurer needs baseline documentation showing the condition before the event. Timestamped daily condition reports are exactly what adjusters require — and what most retailers don't have.",
  },
]

const zones = [
  { name: 'Storefront / Entrance', checkpoints: 8 },
  { name: 'Main Sales Floor', checkpoints: 9 },
  { name: 'Fitting Rooms', checkpoints: 7 },
  { name: 'Checkout / Register Area', checkpoints: 8 },
  { name: 'Restrooms', checkpoints: 9 },
  { name: 'Stockroom / Receiving', checkpoints: 8 },
  { name: 'Office / Break Room', checkpoints: 8 },
  { name: 'Parking Lot / Exterior', checkpoints: 8 },
]

export default function RetailPage() {
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
            <Link href="/auth/signup?vertical=retail" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-sm py-2 px-5 rounded-lg transition-colors">
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
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Built for retail — opening walkthrough in under 5 minutes</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Store Opens<br />
            Every Morning.<br />
            <span className="text-amber-400">What Condition Is It In?</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Document your facility&apos;s condition in 3 minutes. Protect your lease deposit,
            prevent shrinkage disputes, and defend against slip-and-fall lawsuits
            with an irrefutable daily photo and AI report record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?vertical=retail"
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
            'Security camera condition logging',
            'Retail-specific zone templates',
            'ADA compliance flagging',
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
        <h2 className="text-3xl font-bold text-center mb-4">Four Ways ShiftProof Protects Your Store</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          One 5-minute opening walkthrough per day builds documentation for four distinct liability exposures every retailer faces.
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
            Done before your first customer walks in. No training. No extra equipment.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01', icon: Camera, title: 'Walk & Photograph',
                desc: 'Open the app, tap Start Walkthrough. Storefront, sales floor, fitting rooms, checkout, stockroom — 2-3 photos each. Takes under 90 seconds of walking.',
              },
              {
                step: '02', icon: Mic, title: 'Dictate What You See',
                desc: "Tap Record and say what you see. \"Front cameras look good, display case on the left has a crack in the locking mechanism.\" That's all it takes.",
              },
              {
                step: '03', icon: FileText, title: 'AI Builds Your Report',
                desc: "ShiftProof structures your observations with retail-specific context — flagging security issues as urgent, ADA concerns as attention, and lease-protection items for documentation.",
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
            <div className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Retail Template</div>
            <h2 className="text-3xl font-bold mb-4">8 Pre-Built Zones, Retail-Specific Checkpoints</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The retail template covers every zone a standard store needs to document — from the storefront
              cameras to the stockroom back door. Checkpoints are written for what actually matters:
              security, safety, and lease protection.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Security camera status logged every opening',
                'Aisle and fixture hazards flagged before customers arrive',
                'Custom fixture and display wall damage noted the day it appears',
                'ADA path-of-travel issues flagged for attention',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/auth/signup?vertical=retail"
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
                  {(zone.name.includes('Sales Floor') || zone.name.includes('Stockroom') || zone.name.includes('Storefront')) && (
                    <span className="text-xs bg-purple-900 text-purple-300 px-1.5 py-0.5 rounded">security</span>
                  )}
                </div>
                <span className="text-gray-500 text-xs shrink-0">{zone.checkpoints} checkpoints</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security callout */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Lock className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">When You File That Theft Claim</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
            Your insurer&apos;s first question after a theft isn&apos;t &ldquo;what was stolen.&rdquo;
            It&apos;s <strong className="text-white">&ldquo;what security measures did you have in place, and were they operational?&rdquo;</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
              <div className="text-red-400 font-semibold mb-2 text-sm">Without ShiftProof</div>
              <p className="text-gray-400 text-sm">&ldquo;I believe the cameras were working. I think the display case was locked.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Adjuster notes: unverified. Claim reduced or denied.</p>
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
              <div className="text-green-400 font-semibold mb-2 text-sm">With ShiftProof</div>
              <p className="text-gray-300 text-sm">&ldquo;All cameras operational at opening that day — here&apos;s the timestamped photo. Display case locked — here&apos;s the documentation.&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">Adjuster notes: documented. Claim approved.</p>
            </div>
          </div>
          <Link
            href="/auth/signup?vertical=retail"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start Documenting Tomorrow&apos;s Opening
          </Link>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">You Do The Math</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { value: '$20,000', label: 'Average retail lease deposit', sub: 'at risk without documentation' },
            { value: '$25,000', label: 'Average slip-and-fall settlement', sub: 'industry average for retail' },
            { value: '$49/mo', label: 'ShiftProof Single Location', sub: 'one prevented dispute = 34+ years' },
          ].map(item => (
            <div key={item.label} className="bg-surface rounded-xl border border-surface-border p-5 text-center">
              <div className="text-3xl font-black text-amber-400 mb-1">{item.value}</div>
              <div className="font-semibold text-sm mb-1 text-white">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sub}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          $20,000 lease deposit ÷ $588/year = 34 years of ShiftProof paid for by one prevented dispute.
          A single defeated slip-and-fall claim covers 42 years. The math is obvious.
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
                features: ['1 location', 'Unlimited daily reports', 'Retail zone template', 'Security camera checkpoints', 'Damage log', 'PDF evidence packages'],
                highlight: false,
              },
              {
                name: 'Multi Location', price: '$99', plan: 'multi',
                features: ['2–5 locations', 'Everything in Single', 'Location comparison', 'Portfolio damage view', 'Priority support'],
                highlight: true,
              },
              {
                name: 'Enterprise', price: '$199', plan: 'enterprise',
                features: ['Unlimited locations', 'Everything in Multi', 'Multi-brand / franchise support', 'Team access (coming soon)', 'Custom export branding'],
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
                  href={`/auth/signup?plan=${plan.plan}&vertical=retail`}
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
        <h2 className="text-4xl font-extrabold mb-4">Start Protecting Your Store Tomorrow</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          5 minutes at opening. After 30 days you&apos;ll have documentation your landlord,
          your insurer, and any plaintiff&apos;s attorney cannot argue with.
        </p>
        <Link
          href="/auth/signup?vertical=retail"
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
          <div className="flex flex-wrap gap-6">
            <Link href="/" className="hover:text-white transition-colors">Bars &amp; Nightclubs</Link>
            <Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
            <Link href="/salons" className="hover:text-white transition-colors">Salons</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <a href="mailto:joel@helmport.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
