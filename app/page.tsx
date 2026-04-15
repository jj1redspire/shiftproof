'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Shield, Camera, Mic, FileText, TrendingUp, AlertTriangle, DollarSign, CheckCircle, ChevronDown, ChevronUp, Wine, Utensils, Scissors } from 'lucide-react'

const faqs = [
  {
    q: 'How long does a daily walkthrough actually take?',
    a: 'Under 5 minutes for most bars with 8-10 zones. You snap 2-3 photos per zone and dictate what you see out loud. The AI structures everything — you just review and hit Next.',
  },
  {
    q: 'Will this hold up in court or a lease dispute?',
    a: "ShiftProof generates timestamped reports stored in a tamper-evident database. Each report includes photo metadata and AI-structured observations. Multiple attorneys have confirmed this level of documentation strengthens lease defense and slip-and-fall cases significantly.",
  },
  {
    q: 'What happens after my 14-day trial?',
    a: "You'll be prompted to enter a credit card to continue. Your data stays intact whether you subscribe or not. If you cancel later, you can export all your reports as PDFs before your access ends.",
  },
  {
    q: 'Does it work on mobile?',
    a: "Yes — it's built mobile-first. The walkthrough flow is designed for a phone at closing time. iOS Safari and Android Chrome both work. Direct camera access for photo capture.",
  },
  {
    q: 'What if I have multiple locations?',
    a: 'The $99/month plan covers 2-5 locations. The $199/month plan is unlimited. Each location has its own zone setup, walkthrough history, and damage log.',
  },
  {
    q: "What's the difference between the export packages?",
    a: 'Lease Defense Package exports all reports for a date range as a single formatted document. Insurance Claim Evidence highlights condition before and after an incident. Slip-and-Fall Defense shows the exact facility condition on the date of an alleged incident.',
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
            {open === i ? <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-5 bg-surface text-gray-300 text-sm leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
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
            <Link href="/auth/signup" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-sm py-2 px-5 rounded-lg transition-colors">
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
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Bars lose $5K–$50K in lease deposits every year</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Bar Takes Damage<br />
            <span className="text-amber-400">Every Night.</span><br />
            Do You Have Proof?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Document your facility&apos;s condition in 3 minutes. Protect your lease deposit,
            win insurance claims, and defend against slip-and-fall lawsuits with an
            irrefutable daily photo and AI report record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-lg py-4 px-8 rounded-xl inline-block transition-colors">
              Start Your Free 14-Day Trial
            </Link>
            <a href="#how-it-works" className="bg-surface-light hover:bg-surface-border text-white font-medium text-lg py-4 px-8 rounded-xl inline-block border border-surface-border transition-colors">
              See How It Works
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-navy-900 border-y border-surface-border py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          {['Mobile-first walkthrough', 'AI-structured condition reports', 'Exportable PDF evidence packages', '365-day timestamped history'].map(f => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Three Steps at Closing Time</h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">No training. No complicated forms. Just walk your space like you already do.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', icon: Camera, title: 'Walk & Photograph', desc: "Open the app, tap Start Walkthrough. Move zone to zone snapping 2-3 photos each. Takes about 90 seconds." },
            { step: '02', icon: Mic, title: 'Dictate What You See', desc: "Tap Record and say what you see. \"Bar top looks fine, one stool has a crack in the vinyl.\" That's all you need." },
            { step: '03', icon: FileText, title: 'AI Builds Your Report', desc: 'ShiftProof structures your voice notes, tags severity, flags new damage, and generates your Daily Condition Report automatically.' },
          ].map(item => (
            <div key={item.step} className="bg-surface rounded-xl border border-surface-border p-6 relative">
              <div className="text-6xl font-black text-surface-border mb-4">{item.step}</div>
              <item.icon className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline feature */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">The Moat Feature</div>
              <h2 className="text-3xl font-bold mb-4">365 Days of Irrefutable Evidence</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                After 30 days, you have 30 consecutive timestamped reports with photos showing every zone of your bar.
                After a year, you have 365. That&apos;s data your landlord&apos;s attorney cannot refute.
              </p>
              <ul className="space-y-3">
                {[
                  'Chronological timeline — see every report at a glance',
                  'AI comparison — see exactly what changed between any two dates',
                  'Damage log — track every damage event from discovery to resolution',
                  'One-click export — Lease Defense, Insurance Claim, or Slip-and-Fall packages',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {[
                { date: 'Mon Apr 14', status: 'good', label: 'All clear' },
                { date: 'Sun Apr 13', status: 'poor', label: '1 new damage' },
                { date: 'Sat Apr 12', status: 'good', label: 'All clear' },
                { date: 'Fri Apr 11', status: 'fair', label: '2 maintenance items' },
              ].map(item => (
                <div key={item.date} className="bg-surface rounded-xl border border-surface-border flex items-center justify-between p-4 hover:border-amber-400/40 transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium text-sm">{item.date}</div>
                    <div className="text-gray-400 text-xs mt-0.5">Closing walkthrough · 10 zones</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={item.status === 'good' ? 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300' : item.status === 'fair' ? 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-900 text-yellow-300' : 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900 text-red-300'}>
                      {item.label}
                    </span>
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              ))}
              <div className="text-center text-gray-500 text-xs pt-2">+ 361 more reports</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-6">The Math Is Obvious</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Average bar lease deposit', value: '$25,000', sub: 'at risk without documentation' },
            { label: 'Average slip-and-fall settlement', value: '$30,000', sub: 'industry average payout' },
            { label: 'ShiftProof at $49/mo', value: '$588/yr', sub: 'one dispute = 42+ years covered' },
          ].map(item => (
            <div key={item.label} className="bg-surface rounded-xl border border-surface-border p-6 text-center">
              <div className="text-3xl font-black text-amber-400 mb-1">{item.value}</div>
              <div className="font-semibold text-sm mb-1">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Built for Every Hospitality Business</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            ShiftProof has vertical-specific zone templates and AI analysis tailored to each business type.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Wine,
                title: 'Bars & Nightclubs',
                href: '/',
                color: 'border-amber-400/40 bg-amber-400/5',
                iconColor: 'text-amber-400',
                badge: 'You\'re here',
                desc: 'Closing walkthroughs. Lease deposit protection. Slip-and-fall defense. 10 pre-built zones.',
                zones: ['Bar Area', 'Dance Floor', 'Seating', 'Restrooms', 'Kitchen', 'Patio'],
              },
              {
                icon: Utensils,
                title: 'Restaurants',
                href: '/restaurants',
                color: 'border-surface-border bg-surface hover:border-amber-400/40',
                iconColor: 'text-green-400',
                badge: null,
                desc: 'Opening walkthroughs. Health inspection defense. Kitchen + grease trap documentation. 10 zones.',
                zones: ['Kitchen', 'Dining Room', 'Bar Area', 'Patio', 'Host Stand', 'Parking'],
              },
              {
                icon: Scissors,
                title: 'Salons & Barbershops',
                href: '/salons',
                color: 'border-surface-border bg-surface hover:border-amber-400/40',
                iconColor: 'text-blue-400',
                badge: null,
                desc: 'Chemical damage protection. State board inspection docs. OSHA compliance notes. 7 zones.',
                zones: ['Styling Stations', 'Chemical Storage', 'Shampoo Area', 'Reception', 'Exterior'],
              },
            ].map(v => (
              <Link
                key={v.title}
                href={v.href}
                className={`block border rounded-xl p-6 transition-colors ${v.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <v.icon className={`w-8 h-8 ${v.iconColor}`} />
                  {v.badge && (
                    <span className="text-xs bg-amber-400 text-navy-900 font-bold px-2 py-0.5 rounded-full">{v.badge}</span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{v.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.zones.map(z => (
                    <span key={z} className="text-xs bg-navy-700 text-gray-400 px-2 py-1 rounded">{z}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
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
                features: ['1 location', 'Unlimited daily reports', 'All export packages', 'Damage log', 'AI voice structuring', 'PDF exports'],
                highlight: false,
              },
              {
                name: 'Multi Location', price: '$99', plan: 'multi',
                features: ['2–5 locations', 'Everything in Single', 'Location comparison', 'Portfolio damage view', 'Priority support'],
                highlight: true,
              },
              {
                name: 'Enterprise', price: '$199', plan: 'enterprise',
                features: ['Unlimited locations', 'Everything in Multi', 'Team access (coming soon)', 'API access (coming soon)', 'Custom export branding'],
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
                  href={`/auth/signup?plan=${plan.plan}`}
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
        <h2 className="text-4xl font-extrabold mb-4">Start Protecting Your Bar Tonight</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          First walkthrough takes 5 minutes. After 30 days you&apos;ll have documentation your landlord cannot argue with.
        </p>
        <Link href="/auth/signup" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-lg py-4 px-10 rounded-xl inline-block transition-colors">
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
            <Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
            <Link href="/salons" className="hover:text-white transition-colors">Salons</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <a href="mailto:joel@helmport.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
